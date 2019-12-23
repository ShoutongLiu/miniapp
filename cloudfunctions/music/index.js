// 云函数入口文件
const cloud = require('wx-server-sdk')
const tcbRouter = require('tcb-router')
const rp = require('request-promise')
const BASE_URL = 'http://wutom.club:3000'

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    const app = new tcbRouter({ event })
    app.router('playlist', async (ctx, next) => {
        ctx.body = await cloud.database().collection('playlist')
            .skip(event.start)
            .limit(event.count)
            .orderBy('createTime', 'desc')
            .get()
            .then(res => {
                return res
            })
    })

    app.router('musiclist', async (ctx, next) => {
        const ID = parseInt(event.playlistId)
        ctx.body = await rp(BASE_URL + `/playlist/detail?id=${ID}`)
            .then(res => {
                return JSON.parse(res)
            })
    })

    return app.serve()
}