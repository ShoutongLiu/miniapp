// components/playlist/playlist.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        itemObj: {
            type: Object
        }
    },
    // 监听器
    observers: {
        ['itemObj.playCount'](count) {
            this.setData({
                playCount: this.tranNum(count, 2)
            })
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        playCount: 0
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 跳转歌曲列表页
        goMusicList() {
            wx.navigateTo(
                {
                    url: `../../pages/musiclist/musiclist?playlistId=${this.properties.itemObj.id}`
                }
            )
        },
        // 转化数字的方法
        tranNum(count, num) {
            let numStr = count.toString().split('.')[0]
            if (numStr.length < 6) {
                return numStr
            } else if (numStr.length >= 6 && numStr.length <= 8) {
                let decimal = numStr.substring(numStr.length - 4, numStr.length - 4 + num)
                let lastNum = parseInt(count / 10000) + '.' + decimal
                return parseFloat(lastNum) + '万'
            } else if (numStr.length > 8) {
                let decimal = numStr.substring(numStr.length - 8, numStr.length - 8 + num)
                let lastNum = parseInt(count / 100000000) + '.' + decimal
                return parseFloat(lastNum) + '亿'
            }
        }
    }
})
