// components/prograss-bar/prograass-bar.js
let movableAreaWidth = 0
let movableViewWidth = 0

let backAudioManager = wx.getBackgroundAudioManager()
let currentSec = -1
let duration = 0 // 当前歌曲的总时长
let isMoving = false  // 解决拖动的时候与updateTime事件的冲突

Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },
    // 生命周期函数
    lifetimes: {
        ready() {
            this.getMovableDis()
            this.bindBgmEvent()
        }
    },
    /**
     * 组件的初始数据
     */
    data: {
        showTime: {
            currentTime: '00:00',
            totalTime: '00:00'
        },
        movableDis: 0,
        progress: 0
    },

    /**
     * 组件的方法列表
     */
    methods: {
        getMovableDis() {
            // 获取进度条和移动圆点的宽度
            const query = this.createSelectorQuery()
            query.select('.movable-area').boundingClientRect()
            query.select('.movable-view').boundingClientRect()
            query.exec(rect => {
                movableAreaWidth = rect[0].width
                movableViewWidth = rect[1].width
                console.log(movableAreaWidth, movableViewWidth);
            })
        },
        bindBgmEvent() {
            backAudioManager.onPlay(() => {
                isMoving = false
            })

            backAudioManager.onStop(() => {

            })

            backAudioManager.onPause(() => {

            })
            // 监听音频加载事件
            backAudioManager.onWaiting(() => {

            })
            // 监听背景音乐可以播放的状态
            backAudioManager.onCanplay(() => {
                if (typeof backAudioManager.duration != 'undefined') {
                    this.setTime()
                } else {
                    setTimeout(() => {
                        this.setTime()
                    }, 1000)
                }
            })

            backAudioManager.onTimeUpdate(() => {
                if (!isMoving) {
                    // 当前播放时间
                    const currentTime = backAudioManager.currentTime
                    // 总时间
                    duration = backAudioManager.duration
                    let curr_sec = currentTime.toString().split('.')[0]
                    if (curr_sec != currentSec) {
                        const currentFmt = this.timeFormat(currentTime)
                        this.setData({
                            movableDis: (movableAreaWidth - movableViewWidth) * currentTime / duration,
                            progress: currentTime / duration * 100,
                            ['showTime.currentTime']: `${currentFmt.min}:${currentFmt.sec}`
                        })
                        currentSec = curr_sec
                        // 联动歌词
                        this.triggerEvent('timeUpdate', { currentTime })
                    }
                }
            })

            backAudioManager.onEnded(() => {
                // 抛出事件自动播放下一首
                this.triggerEvent('musicEnd')
            })

            backAudioManager.onError((err) => {
                console.log(err);
                wx.showToast({
                    title: '错误：' + err.errCode
                });
            })
        },
        setTime() {
            duration = backAudioManager.duration
            const durationFmt = this.timeFormat(duration)
            this.setData({
                ['showTime.totalTime']: `${durationFmt.min}:${durationFmt.sec}`
            })
        },
        // 时间转换为妙
        timeFormat(time) {
            const min = Math.floor(time / 60)
            const sec = Math.floor(time % 60)
            return {
                'min': this.parse0(min),
                'sec': this.parse0(sec)
            }
        },
        // 给时间的个位补0
        parse0(sec) {
            return sec < 10 ? '0' + sec : sec
        },
        // 滑动事件
        handleChange(e) {
            // 判断是是否是拖动事件
            if (e.detail.source == 'touch') {
                this.data.progress = e.detail.x / (movableAreaWidth - movableViewWidth) * 100
                this.data.movableDis = e.detail.x
                isMoving = true
            }
        },
        // 触摸结束事件
        onTouchEnd() {
            let currentTime = Math.floor(backAudioManager.currentTime)
            let currentFmt = this.timeFormat(currentTime)
            this.setData({
                progress: this.data.progress,
                movableDis: this.data.movableDis,
                ['showTime.currentTime']: `${currentFmt.min}:${currentFmt.sec}`
            })
            backAudioManager.seek(duration * this.data.progress / 100)
            isMoving = false
        }
    }
})
