// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

const rp = require('request-promise')

const URL = 'http://wutom.club:3000/personalized'

const playlistCollection = db.collection('playlist')
const MAX_LIMIT = 100
// 云函数入口函数
exports.main = async (event, context) => {
    // 微信小程序一次请求最多只能请求100条数据，超出100条的数据要多次请求
    const countResult = await playlistCollection.count()
    const total = countResult.total
    const batchTimes = Math.ceil(total / MAX_LIMIT)
    const tasks = []
    for (let i = 0; i < batchTimes; i++) {
        let promiseData = playlistCollection.skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
        tasks.push(promiseData)
    }

    let list = {
        data: []
    }
    // 合并请求到的数据
    if (tasks.length > 0) {
        list = (await Promise.all(tasks)).reduce((acc, cur) => {
            return {
                data: acc.data.concat(cur.data)
            }
        })
    }

    const playList = await rp(URL).then(res => {
        return JSON.parse(res).result
    })
    // console.log(playList);

    // 去重，只插入不一样的数据
    const newData = []
    for (let i = 0; i < playList.length; i++) {
        let flag = true
        for (let j = 0; j < list.data.length; j++) {
            if (playList[i].id === list.data[j].id) {
                flag = false
                break
            }
        }
        if (flag) {
            newData.push(playList[i])
        }
    }
    // 遍历插入云数据库
    for (let i = 0; i < newData.length; i++) {
        await playlistCollection.add({
            data: {
                ...newData[i],
                createTime: db.serverDate()
            }
        }).then(res => {
            console.log(res, '插入成功');
        }).catch(err => {
            console.log(err, '插入失败');
        })
    }

    return newData.length
}