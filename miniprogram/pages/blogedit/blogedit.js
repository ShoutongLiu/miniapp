const MAX_NUM = 140         // 最大输入字数
const MAX_IMG_NUM = 9       // 最大上传图片
const db = wx.cloud.database()

let content = ''
let userInfo = {}

Page({

    /**
     * 页面的初始数据
     */
    data: {
        wordsNum: 0,       // 输入字数
        buttomVal: 0,       // footer距离底部的距离
        images: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options);
        userInfo = options
    },

    onInput(e) {
        let wordsNum = e.detail.value.length
        if (wordsNum >= MAX_NUM) {
            wordsNum = `最大输入字数${MAX_NUM}`
        }
        this.setData({ wordsNum })
        content = e.detail.value
    },
    // 获取焦点
    onFocus(e) {
        this.setData({ buttomVal: e.detail.height })
    },
    // 失去焦点
    onBlur() {
        this.setData({ buttomVal: 0 })
    },

    // 选择图片
    onChooseImg() {
        // 还能选几张图
        let num = MAX_IMG_NUM - this.data.images.length
        wx.chooseImage({
            count: num,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: (res) => {
                console.log(res);
                let imgArr = []
                res.tempFiles.forEach(v => {
                    imgArr.push(v.path)
                })
                this.setData({ images: this.data.images.concat(imgArr) })
            },
            fail: (err) => {
                console.log(err);
            },
        });
    },

    // 删除图片
    onDelete(e) {
        let index = e.target.dataset.index
        this.data.images.splice(index, 1)
        this.setData({ images: this.data.images })
    },

    // 点击预览
    onPriview(e) {
        let url = e.target.dataset.src
        wx.previewImage({
            current: url,
            urls: this.data.images
        });
    },
    // 发布事件
    send() {
        if (content.trim() === '') {
            wx.showToast({
                title: '请输入内容',
                icon: 'none'
            });
            return
        }
        wx.showLoading({
            title: '发布中...',
            mask: true
        });
        let promiseArr = []
        let fileds = []
        // 图片上传到云存储
        for (let i = 0; i < this.data.images.length; i++) {
            let p = new Promise((resolve, reject) => {
                let item = this.data.images[i]
                // 获取文件拓展名
                let suffix = /\.\w+$/.exec(item)[0]
                // 调用上传云存储函数(异步)
                wx.cloud.uploadFile({
                    cloudPath: 'blog/' + Date.now() + '-' + Math.random() * 10000000 + suffix,
                    filePath: item,
                    success(res) {
                        fileds = fileds.concat(res.fileID)
                        resolve()
                    },
                    file(err) {
                        console.log(err);
                        reject()
                    }
                })
            })
            promiseArr.push(p)
        }
        // 所有图片上传完后存入数据库
        Promise.all(promiseArr).then(res => {
            db.collection('blog').add({
                data: {
                    ...userInfo,
                    content,
                    imgs: fileds,
                    createTime: db.serverDate()  // 服务端时间
                }
            }).then(res => {
                console.log(res);
                wx.showToast({
                    title: '发布成功'
                });
                wx.hideLoading();
                // 返回上一页面, 并刷新
                wx.navigateBack();
                let pages = getCurrentPages();
                const prevPage = pages[pages.length - 2]
                prevPage.onPullDownRefresh()

            }).catch(err => {
                wx.showToast({
                    title: err.errMsg,
                    icon: 'none',
                });
                wx.hideLoading();
            })
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