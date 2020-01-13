const MAX_NUM = 140
Page({

    /**
     * 页面的初始数据
     */
    data: {
        wordsNum: 0,       // 输入字数
        buttomVal: 0       // footer距离底部的距离
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options);
    },

    onInput(e) {
        let wordsNum = e.detail.value.length
        if (wordsNum >= MAX_NUM) {
            wordsNum = `最大输入字数${MAX_NUM}`
        }
        this.setData({ wordsNum })
    },
    // 获取焦点
    onFocus(e) {
        this.setData({ buttomVal: e.detail.height })
    },
    // 失去焦点
    onBlur() {
        this.setData({ buttomVal: 0 })
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