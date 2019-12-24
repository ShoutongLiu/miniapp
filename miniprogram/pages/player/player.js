// 存储歌曲列表
let musiclist = []
// 正在播放歌曲的索引
let playingIndex = 0
// 全局唯一背景音频管理器
let backAudioManager = wx.getBackgroundAudioManager();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        picUrl: '',
        isPlaying: false, // false表示不播放，true表示正在播放
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
        playingIndex = options.index
        musiclist = wx.getStorageSync('musiclist');
        this.loadMusicDetail(options.playerId)
    },

    loadMusicDetail(musicId) {
        // 播放前前先停止歌曲
        backAudioManager.stop()
        let music = musiclist[playingIndex]
        wx.setNavigationBarTitle({
            title: music.name,
        });

        this.setData({
            picUrl: music.al.picUrl,
            isPlaying: false
        })

        wx.showLoading()

        // 获取歌曲的url链接
        wx.cloud.callFunction({
            name: 'music',
            data: {
                $url: 'musicUrl',
                musicId: musicId
            }
        }).then(res => {
            console.log(res);
            let songData = JSON.parse(res.result)
            backAudioManager.title = music.name
            backAudioManager.src = songData.data[0].url
            backAudioManager.coverImgUrl = music.al.picUrl
            backAudioManager.singer = music.ar[0].name
            this.setData({ isPlaying: true })
            wx.hideLoading()
        })
    },
    // 暂停播放事件
    togglePlaying() {
        if (this.data.isPlaying) {
            backAudioManager.pause()
        } else {
            backAudioManager.play()
        }
        this.setData({ isPlaying: !this.data.isPlaying })
    },
    // 上一首
    onPrev() {
        playingIndex--
        if (playingIndex < 0) {
            playingIndex = musiclist.length - 1
        }
        let prevSongId = musiclist[playingIndex].id
        this.loadMusicDetail(prevSongId)
    },
    // 下一首
    onNext() {
        playingIndex++
        if (playingIndex === musiclist.length) {
            playingIndex = 0
        }
        let prevSongId = musiclist[playingIndex].id
        this.loadMusicDetail(prevSongId)
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