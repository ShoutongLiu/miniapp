const MAX_LIMIT = 9

Page({
    /**
     * 页面的初始数据
     */
    data: {
        banner: [],
        swiper: {
            indicatorDots: true,
            autoplay: true,
            interval: 4000,
            duration: 500,
            color: '#eee',
            activeColor: '#d43c33'
        },
        playList: [],
        options: [
            { text: '每日推荐', class: 'icon-rili1' },
            { text: '歌单', class: 'icon-gedan' },
            { text: '排行榜', class: 'icon-paihangbangxuanzhong' },
            { text: '电台', class: 'icon-diantai' },
            { text: '直播', class: 'icon-shexiangtou' }
        ],
        date: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getPlayList()
        this.getBanner()
        this.setData({ date: new Date().getDate() })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        this.setData({ playList: [] })
        this.getPlayList()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    // 获取banner图
    getBanner() {
        wx.cloud.callFunction({
            name: 'music',
            data: {
                $url: 'banner'
            }
        }).then(res => {
            this.setData({ banner: res.result.banners })
        })
    },
    // 获取歌单
    getPlayList() {
        wx.showLoading()
        wx.cloud.callFunction({
            name: 'music',
            data: {
                start: 0,
                count: MAX_LIMIT,
                $url: 'playlist'
            }
        }).then(res => {
            this.setData({
                playList: res.result.data
            })
            wx.stopPullDownRefresh()
            wx.hideLoading()
        })
    },
    goMore() {
        wx.navigateTo({ url: '../songlist/songlist' });
    }
})