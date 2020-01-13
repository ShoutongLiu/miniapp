// components/login/login.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        modalShow: Boolean
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        getUserInfo(e) {
            console.log(e);
            let userInfo = e.detail.userInfo
            if (userInfo) {
                this.setData({ modalShow: false })
                this.triggerEvent('loginSuccess', userInfo)
            } else {
                this.triggerEvent('loginFail')
            }
        }
    }
})
