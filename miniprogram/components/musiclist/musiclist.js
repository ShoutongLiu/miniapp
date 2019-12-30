const app = getApp()

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        musicList: Array
    },

    /**
     * 组件的初始数据
     */
    data: {
        playingId: -1
    },
    // 页面声明周期函数
    pageLifetimes: {
        // 页面显示的时候获取当前播放的id
        show() {
            this.setData({
                playingId: app.getPlayingId()
            })
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        handleSelect(e) {
            let curent = e.currentTarget.dataset
            this.setData({ playingId: curent.musicid })
            wx.navigateTo({
                url: `../../pages/player/player?playerId=${curent.musicid}&index=${curent.index}`
            });
        }
    }
})
