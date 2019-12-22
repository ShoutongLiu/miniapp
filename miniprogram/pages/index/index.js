const MAX_LIMIT = 12

Page({
    /**
     * 页面的初始数据
     */
    data: {
        banner: [
            {
                url: 'http://p1.music.126.net/uCDEWxc7VlFruj8whr7Qvg==/109951164567869837.jpg',
                id: 1,
            },
            {
                url: 'http://p1.music.126.net/i9TIO_h2tJrX75y1qGadEw==/109951164568148355.jpg',
                id: 2,
            },
            {
                url: 'http://p1.music.126.net/Hj7v410EbtcbynSqKuEfOQ==/109951164568090756.jpg',
                id: 3,
            },
            {
                url: 'http://p1.music.126.net/mKgAjIRhSMeTuKdBhAhQrw==/109951164568087464.jpg',
                id: 4,
            },
            {
                url: 'http://p1.music.126.net/3xHJw1WjLomtv5bofQqIbA==/109951164568157618.jpg',
                id: 5,
            },
            {
                url: 'http://p1.music.126.net/bOu63UH-RzfHThs8YRKdxg==/109951164568097693.jpg',
                id: 6,
            },
            {
                url: 'http://p1.music.126.net/koF-9bVY-ZYVMCpGtumJBg==/109951164568097821.jpg',
                id: 7
            }
        ],
        swiper: {
            indicatorDots: true,
            autoplay: true,
            interval: 3000,
            duration: 500,
            color: '#eee',
            activeColor: '#d43c33'
        },
        playList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getPlayList()
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

    },
    getPlayList() {
        wx.showLoading()
        wx.cloud.callFunction({
            name: 'music',
            data: {
                start: this.data.playList.length,
                count: MAX_LIMIT
            }
        }).then(res => {
            this.setData({
                playList: this.data.playList.concat(res.result.data)
            })
            wx.hideLoading()
        })
    }
})