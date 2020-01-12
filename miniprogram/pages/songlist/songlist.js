const MAX_LIMIT = 15

Page({

    /**
     * 页面的初始数据
     */
    data: {
        playList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getPlayList()
    },

    getPlayList() {
        wx.showLoading()
        wx.cloud.callFunction({
            name: 'music',
            data: {
                start: this.data.playList.length,
                count: MAX_LIMIT,
                $url: 'playlist'
            }
        }).then(res => {
            this.setData({
                playList: this.data.playList.concat(res.result.data)
            })
            wx.stopPullDownRefresh()
            wx.hideLoading()
        })
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
        this.getPlayList()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})