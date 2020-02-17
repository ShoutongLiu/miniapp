let userInfo = {}
const db = wx.cloud.database()
import format from '../../utils/formatTime'

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        blogId: String,
        blog: Object
    },

    /**
     * 组件的初始数据
     */
    data: {
        loginShow: false,
        modalShow: false,
        content: ''
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onComment() {
            // 判断授权
            wx.getSetting({
                success: (res) => {
                    if (res.authSetting['scope.userInfo']) {
                        wx.getUserInfo({
                            success: (res) => {
                                userInfo = res.userInfo
                                this.setData({ modalShow: true })
                            }
                        });
                    } else {
                        this.setData({ loginShow: true })
                    }
                },
                fail: (err) => {
                    console.log(err);
                }
            });
        },
        onLoginSuccess(e) {
            userInfo = e.detail
            this.setData({ loginShow: false }, () => {
                this.setData({ modalShow: true })
            })
        },
        onLoginFile() {
            wx.showModal({
                title: '授权后才能评论',
                showCancel: false,
            });
        },
        onInput(e) {
            this.setData({ content: e.detail.value })
        },
        onSend() {
            let tmplId = 'pqwTjt4wlaU8WZgNLLcTQv9gOQPa5lxOi1yitNOcxng'
            let content = this.data.content
            this.setData({ content })
            if (content.trim() === '') {
                wx.showModal({
                    title: '评论内容不能为空',
                    showCancel: false,
                });
                return
            }
            // 订阅消息
            wx.requestSubscribeMessage({
                tmplIds: [tmplId],
                complete: (res) => {
                    let value = content.length > 20 ? content.substring(0, 20) : content
                    let time = format(new Date())
                    if (res.pqwTjt4wlaU8WZgNLLcTQv9gOQPa5lxOi1yitNOcxng === 'accept') {
                        // 推送订阅消息
                        wx.cloud.callFunction({
                            name: 'sendMsg',
                            data: {
                                content: value,
                                blogId: this.properties.blogId,
                                createTime: time,
                                name: userInfo.nickName,
                            }
                        }).then(res => {
                            console.log(res);
                        })
                    }
                    // 发表评论
                    wx.showLoading({
                        title: '发表中...',
                        mask: true
                    });

                    db.collection('comment').add({
                        data: {
                            content,
                            createTime: db.serverDate(),
                            blogId: this.properties.blogId,
                            nickname: userInfo.nickName,
                            avatar: userInfo.avatarUrl
                        }
                    }).then(res => {
                        if (res._id) {
                            wx.hideLoading();
                            this.setData({ modalShow: false, content: '' })
                            wx.showToast({
                                title: '发表成功'
                            });
                            // 父元素刷新页面评论
                            this.triggerEvent('refreshComment')
                        }
                    })
                }
            })
        }
    }
})
