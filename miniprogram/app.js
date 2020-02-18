//app.js
App({

    globalData: {
        playingId: -1,
        openid: -1
    },

    onLaunch: function () {

        if (!wx.cloud) {
            console.error('请使用 2.2.3 或以上的基础库以使用云能力')
        } else {
            wx.cloud.init({
                // env 参数说明：
                //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
                env: 'text-wlq50',
                traceUser: true,
            })
        }
        this.getOpenId()
    },
    setPlayingId(musicId) {
        this.globalData.playingId = musicId
    },
    getPlayingId() {
        return this.globalData.playingId
    },
    getOpenId() {
        wx.cloud.callFunction({
            name: 'login'
        }).then(res => {
            const openid = res.result.openid
            this.globalData.openid = openid
            if (wx.getStorageSync(openid) === '') {
                wx.setStorageSync(openid, []);
            }
        })
    }
})
