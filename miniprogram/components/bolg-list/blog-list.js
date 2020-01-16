import format from '../../utils/formatTime'
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        blog: Object
    },

    observers: {
        ['blog.createTime'](val) {
            this.setData({ _createTime: format(new Date(val)) })
        }
    },
    /**
     * 组件的初始数据
     */
    data: {
        _createTime: ''
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onPreviewImage(event) {
            const ds = event.target.dataset
            wx.previewImage({
                urls: ds.imgs,
                current: ds.imgsrc,
            })
        }
    }
})
