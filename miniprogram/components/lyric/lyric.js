let lrcHeight = 0
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
            if (lyric === '暂无歌词') {
                this.setData({
                    lrcList: [{
                        lrc: lyric,
                        time: 0
                    }]
                })
            } else {
                this.parseLyric(lyric)
            }
        }
    },
    /**
     * 组件的初始数据
     */
    data: {
        lrcList: [],
        currentIndex: 0,    // 当前歌词选中的索引 
        scrollTop: 0    // 歌词滚动的高度
    },
    // 组件声明周期函数
    lifetimes: {
        ready() {
            // 获取设备信息
            wx.getSystemInfo({
                success: (result) => {
                    // 求出1rpx大小
                    lrcHeight = result.screenWidth / 750 * 64
                }
            });
        }
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
        },
        // 通过事件获取当前播放时间
        update(currentTime) {
            let lrcList = this.data.lrcList
            if (lrcList.length === 0) {
                return
            }
            if (currentTime > lrcList[lrcList.length - 1].time) {
                this.setData({
                    currentIndex: -1,
                    scrollTop: lrcList.length * lrcHeight
                })
            }

            for (let i = 0; i < lrcList.length; i++) {
                if (currentTime <= lrcList[i].time) {
                    this.setData({
                        currentIndex: i - 1,
                        scrollTop: i * lrcHeight
                    })
                    break
                }
            }
        }
    }
})
