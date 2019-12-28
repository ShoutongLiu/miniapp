// components/musiclist/musiclist.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        musicList: Array
    },

    /**
     * 组件的初始数据
     */
    data: {
        playingId: -1
    },

    /**
     * 组件的方法列表
     */
    methods: {
        handleSelect(e) {
            let curent = e.currentTarget.dataset
            this.setData({ playingId: curent.musicid })
            wx.navigateTo({
                url: `../../pages/player/player?playerId=${curent.musicid}&index=${curent.index}`
            });
        }
    }
})
