// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const TcbRouter = require('tcb-router')
const db = cloud.database()
// 获取云数据库集合
const blogCollection = db.collection('blog')

const MAX_LIMIT = 100

// 云函数入口函数
exports.main = async (event, context) => {
    const app = new TcbRouter({ event })

    app.router('blog-list', async (ctx, next) => {
        const keyWord = event.keyWord
        let s = {}
        if (keyWord.trim() !== '') {
            s = {
                content: new db.RegExp({
                    regexp: keyWord,
                    options: 'i'
                })
            }
        }

        let blogData = await blogCollection.where(s).skip(event.start)
            .limit(event.count)
            .orderBy('createTime', 'desc').get()

        ctx.body = blogData
    })

    app.router('detail', async (ctx, next) => {
        let blogId = event.blogId
        // 详情查询
        let detail = await blogCollection.where({ _id: blogId }).get()
            .then(res => {
                return res.data
            })
        // 评论查询
        const countResult = await blogCollection.count()
        const total = countResult.total
        let commentList = {
            data: []
        }
        if (total > 0) {
            const batchTimes = Math.ceil(total / MAX_LIMIT)
            let tasks = []
            for (let i = 0; i < batchTimes; i++) {
                let promise = db.collection('comment').skip(i * MAX_LIMIT).limit(MAX_LIMIT)
                    .where({ blogId }).orderBy('createTime', 'desc').get()
                tasks.push(promise)
            }
            if (tasks.length > 0) {
                commentList = (await Promise.all(tasks)).reduce((acc, cur) => {
                    return {
                        data: acc.data.concat(cur.data)
                    }
                })
            }
        }
        ctx.body = {
            detail,
            commentList,
        }
    })
    return app.serve()
}