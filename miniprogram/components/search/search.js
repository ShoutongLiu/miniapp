let keyWord = ''

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        placeholder: {
            type: String,
            value: '请输入关键字'
        }
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
        onInput(e) {
            keyWord = e.detail.value
        },
        onSearch() {
            this.triggerEvent('search', { keyWord })
        }
    }
})
