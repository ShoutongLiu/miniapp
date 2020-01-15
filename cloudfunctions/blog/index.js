// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const TcbRouter = require('tcb-router')
const db = cloud.database()
// 获取云数据库集合
const blogCollection = db.collection('blog')


// 云函数入口函数
exports.main = async (event, context) => {
    const app = new TcbRouter({ event })

    app.router('blog-list', async (ctx, next) => {
        let blogData = await blogCollection.skip(event.start)
            .limit(event.count)
            .orderBy('createTime', 'desc').get()

        ctx.body = blogData
    })
    return app.serve()
}