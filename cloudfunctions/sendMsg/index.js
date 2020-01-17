// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    const { OPENID } = cloud.getWXContext()

    const result = await cloud.openapi.subscribeMessage.send({
        touser: OPENID,
        page: `/pages/blog-detail/blog-detail?blogId=${event.blogId}`,
        templateId: 'pqwTjt4wlaU8WZgNLLcTQv9gOQPa5lxOi1yitNOcxng',
        data: {
            name1: {
                value: event.name
            },
            thing2: {
                value: event.content
            },
            time3: {
                value: event.createTime
            }
        }
    })

    return result
}