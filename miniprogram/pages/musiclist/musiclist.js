// pages/musiclist/musiclist.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        musicList: [],
        listInfo: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.showLoading();
        wx.cloud.callFunction({
            name: 'music',
            data: {
                playlistId: options.playlistId,
                $url: 'musiclist'
            }
        }).then(res => {
            let musicDetail = res.result.playlist
            this.setData({
                musicList: musicDetail.tracks,
                listInfo: {
                    nickName: musicDetail.creator.nickname,
                    name: musicDetail.name,
                    backgroundImg: musicDetail.coverImgUrl,
                    avatar: musicDetail.creator.avatarUrl,
                    desc: musicDetail.description
                }
            })
            wx.hideLoading();
            this.setMusicList()
        })
    },

    setMusicList() {
        wx.setStorageSync('musiclist', this.data.musicList);
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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})