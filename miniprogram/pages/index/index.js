// miniprogram/pages/playlist/playlist.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        banner: [
            {
                url: 'http://p1.music.126.net/uCDEWxc7VlFruj8whr7Qvg==/109951164567869837.jpg',
                id: 1,
            },
            {
                url: 'http://p1.music.126.net/i9TIO_h2tJrX75y1qGadEw==/109951164568148355.jpg',
                id: 2,
            },
            {
                url: 'http://p1.music.126.net/Hj7v410EbtcbynSqKuEfOQ==/109951164568090756.jpg',
                id: 3,
            },
            {
                url: 'http://p1.music.126.net/mKgAjIRhSMeTuKdBhAhQrw==/109951164568087464.jpg',
                id: 4,
            },
            {
                url: 'http://p1.music.126.net/3xHJw1WjLomtv5bofQqIbA==/109951164568157618.jpg',
                id: 5,
            },
            {
                url: 'http://p1.music.126.net/bOu63UH-RzfHThs8YRKdxg==/109951164568097693.jpg',
                id: 6,
            },
            {
                url: 'http://p1.music.126.net/koF-9bVY-ZYVMCpGtumJBg==/109951164568097821.jpg',
                id: 7
            }
        ],
        swiper: {
            indicatorDots: true,
            autoplay: true,
            interval: 3000,
            duration: 500,
            color: '#eee',
            activeColor: '#d43c33'
        },
        playList: [
            {
                "id": 3023534021,
                "type": 0,
                "name": "请再稍稍加点油，你一定可以成为更好的自己",
                "copywriter": "编辑推荐：再争口气 一切都会好的",
                "picUrl": "https://p2.music.126.net/hVzHvlj0FYfF3ICVxqDYfg==/109951164547710123.jpg",
                "canDislike": false,
                "trackNumberUpdateTime": 1576658280434,
                "playCount": 2552834,
                "trackCount": 78,
                "highQuality": false,
                "alg": "featured"
            },
            {
                "id": 3066461681,
                "type": 0,
                "name": "快乐小镇♪愿我们永怀童真 笑对生活",
                "copywriter": "编辑推荐：要做个可爱的人！",
                "picUrl": "https://p2.music.126.net/AQSWeEiq60adWw5u2UVrBw==/109951164479567489.jpg",
                "canDislike": false,
                "trackNumberUpdateTime": 1573882458649,
                "playCount": 376717,
                "trackCount": 24,
                "highQuality": false,
                "alg": "featured"
            },
            {
                "id": 3051369560,
                "type": 0,
                "name": "虚化了的浪漫，旧故事里隐藏的诗篇",
                "copywriter": "热门推荐",
                "picUrl": "https://p2.music.126.net/AgMwPcjUzDcrdg_VN2isBw==/109951164530329593.jpg",
                "canDislike": true,
                "trackNumberUpdateTime": 1576389497619,
                "playCount": 4451223,
                "trackCount": 40,
                "highQuality": false,
                "alg": "cityLevel_unknow"
            },
            {
                "id": 310970433,
                "type": 0,
                "name": "【旋律控】超级好听的欧美良曲",
                "copywriter": "热门推荐",
                "picUrl": "https://p2.music.126.net/2MsstS-M9w5-li0aRy3sUQ==/1380986606815861.jpg",
                "canDislike": true,
                "trackNumberUpdateTime": 1554649190002,
                "playCount": 328000992,
                "trackCount": 363,
                "highQuality": false,
                "alg": "cityLevel_unknow"
            },
            {
                "id": 3116652568,
                "type": 0,
                "name": "暗恋歌词本：抄了很多首，每一首都关于你",
                "copywriter": "热门推荐",
                "picUrl": "https://p2.music.126.net/crxsiIl-qUfJjj2J-m08YQ==/109951164546421468.jpg",
                "canDislike": true,
                "trackNumberUpdateTime": 1576227304945,
                "playCount": 4227561,
                "trackCount": 30,
                "highQuality": false,
                "alg": "cityLevel_unknow"
            },
            {
                "id": 3112856048,
                "type": 0,
                "name": "怀旧经典丨行走的华语金曲留声机",
                "copywriter": "热门推荐",
                "picUrl": "https://p2.music.126.net/82GkSApuzIOg9CM1HJEM0Q==/109951164542791193.jpg",
                "canDislike": true,
                "trackNumberUpdateTime": 1576470527830,
                "playCount": 4865597,
                "trackCount": 115,
                "highQuality": false,
                "alg": "cityLevel_unknow"
            },
            {
                "id": 2993015219,
                "type": 0,
                "name": "「欧美」听了这些歌，我就是街上最酷的崽",
                "copywriter": "热门推荐",
                "picUrl": "https://p2.music.126.net/FBFfvR2s_kzhYsLAe4dX9A==/109951164376888184.jpg",
                "canDislike": true,
                "trackNumberUpdateTime": 1576459935842,
                "playCount": 772542,
                "trackCount": 22,
                "highQuality": false,
                "alg": "cityLevel_unknow"
            },
            {
                "id": 863744119,
                "type": 0,
                "name": "100首好听的翻唱",
                "copywriter": "热门推荐",
                "picUrl": "https://p2.music.126.net/p8UsKXA-qjfYuicFEZ_bbw==/109951163822176249.jpg",
                "canDislike": true,
                "trackNumberUpdateTime": 1576768756763,
                "playCount": 82585272,
                "trackCount": 151,
                "highQuality": false,
                "alg": "cityLevel_unknow"
            },
            {
                "id": 2981553054,
                "type": 0,
                "name": "如果当初没分开，现在会是几周年的纪念",
                "copywriter": "热门推荐",
                "picUrl": "https://p2.music.126.net/LmTLZgOKDME7yzzwlUfxig==/109951164517027367.jpg",
                "canDislike": true,
                "trackNumberUpdateTime": 1575769040232,
                "playCount": 2026658,
                "trackCount": 30,
                "highQuality": false,
                "alg": "cityLevel_unknow"
            }
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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