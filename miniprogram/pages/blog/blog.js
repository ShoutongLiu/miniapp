let keyWord = ''

Page({

    /**
 * 页面的初始数据
 */
    data: {
        modalShow: false,       // 控制底部弹出层
        blogList: []
    }

    ,

    /**
 * 生命周期函数--监听页面加载
 */
    onLoad: function () {
        this.getBlogList()
    },

    getBlogList(start = 0) {
        wx.showLoading({
            title: '加载中',
        });
        wx.cloud.callFunction({
            name: 'blog',
            data: {
                keyWord,
                start,
                $url: 'blog-list',
                count: 10
            }
        }).then(res => {
            this.setData({ blogList: this.data.blogList.concat(res.result.data) })
            wx.hideLoading();
            wx.stopPullDownRefresh()
        })
    },

    onPublish() {
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: res => {
                            this.loginSuccess({ detail: res.userInfo })
                        },
                        fail: (err) => {
                            console.log(err);
                        },
                    });
                } else {
                    this.setData({ modalShow: true })
                }
            }
        });

    },
    loginSuccess(e) {
        let detail = e.detail
        wx.navigateTo({
            url: `/pages/blogedit/blogedit?name=${detail.nickName}&avatar=${detail.avatarUrl}`,
        });
    },
    loginFail() {
        wx.showToast({
            title: '授权才能发布',
            icon: 'none'
        });
    },

    goDetail(e) {
        let id = e.target.dataset.blogid
        wx.navigateTo({
            url: `/pages/blog-comment/blog-comment?blogId=${id}`
        });
    },

    // 搜索事件
    onSearch(e) {
        keyWord = e.detail.keyWord
        this.setData({ blogList: [] })
        this.getBlogList(0)
    },

    /**
 * 生命周期函数--监听页面初次渲染完成
 */
    onReady: function () { }

    ,

    /**
 * 生命周期函数--监听页面显示
 */
    onShow: function () { },

    /**
 * 生命周期函数--监听页面隐藏
 */
    onHide: function () { },

    /**
 * 生命周期函数--监听页面卸载
 */
    onUnload: function () { }

    ,

    /**
 * 页面相关事件处理函数--监听用户下拉动作
 */
    onPullDownRefresh: function () {
        this.setData({ blogList: [] })
        this.getBlogList(0)
    },

    /**
 * 页面上拉触底事件的处理函数
 */
    onReachBottom: function () {
        this.getBlogList(this.data.blogList.length)
    },

    /**
 * 用户点击右上角分享
 */
    onShareAppMessage: function (e) {
        let blogObj = e.target.dataset.blog
        return {
            title: blogObj.content,
            path: `/pages/blog-comment/blog-comment?blogId=${blogObj._id}`,
            imageUrl: blogObj.imgs[0]
        }
    }
})