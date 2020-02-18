const MAX_LIMIT = 10
const db = wx.cloud.database()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        blogList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getListByminiProgram()
    },

    // 通过小程序端获取数据库的数据
    getListByminiProgram() {
        wx.showLoading({
            title: '加载中',
            mask: true,
        });
        db.collection('blog').skip(this.data.blogList.length).limit(MAX_LIMIT)
            .orderBy('createTime', 'desc').get().then(res => {
                console.log(res);
                let _blogList = res.data
                for (let i = 0; i < _blogList.length; i++) {
                    _blogList[i].createTime = _blogList[i].createTime.toString()
                }
                this.setData({ blogList: this.data.blogList.concat(_blogList) })
                wx.hideLoading();
            })
    },
    // 跳转到详情
    goDetail(e) {
        wx.navigateTo({
            url: `../blog-comment/blog-comment?blogId=${e.target.dataset.blogid}`,
        });
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
        this.getListByminiProgram()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function (e) {
        const blog = e.target.dataset.blog
        return {
            title: blog.conent,
            path: `/pages/blog-comment/blog-comment?blogId=${blog._id}`,
            imageUrl: blog.imgs[0]
        }
    }
})