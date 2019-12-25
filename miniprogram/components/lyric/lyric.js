// components/lyric/lyric.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        isLyricShow: {
            type: Boolean,
            value: false
        },
        lyric: String
    },
    observers: {
        lyric(lyric) {
            this.parseLyric(lyric)
        }
    },
    /**
     * 组件的初始数据
     */
    data: {
        lrcList: []
    },

    /**
     * 组件的方法列表
     */
    methods: {
        parseLyric(lyric) {
            let line = lyric.split('\n')
            let lrcList = []
            line.forEach(item => {
                let rpx = /\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g  // 匹配时间的正则
                let rpxT = /(\d{2,}):(\d{2})(?:\.(\d{2,3}))?/  // 第二次匹配时间
                let time = item.match(rpx)
                if (time !== null) {
                    let lrc = item.split(time)[1]
                    let timeReg = time[0].match(rpxT)
                    // 把时间转换为妙
                    let timeSec = parseInt(timeReg[1]) * 60 + parseInt(timeReg[2]) + parseInt(timeReg[3]) / 1000
                    lrcList.push({
                        lrc,
                        time: timeSec
                    })
                }
            })
            this.setData({
                lrcList
            })
        }
    }
})
