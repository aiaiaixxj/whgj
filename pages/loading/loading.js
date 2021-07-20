// pages/loading/loading.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    height: '',
    width: '',
    isConnecte: '',
    isConnecteTimer:''
  },
  refresh(){},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this
    wx.getNetworkType({
      success(res) {
        const networkType = res.networkType
        console.log(res);
        if ("none" == networkType) {
          // wx.showLoading({
          //   title: '网络连接失败',
          //   mask: true
          // })
          that.setData({
            isConnecte:false
          })
          // judgeNetworkStatus(callback);
        } else {
          // wx.hideLoading()
          that.setData({
            isConnecte:true
          })
        }
      },
      fail(err) {
        console.log(err)
      },
      complete(cpe) {
        console.log(cpe)
      }
    })
   that.setData({
    isConnecteTimer: setTimeout(()=>{
      console.log("that.data.isConnecte=>",that.data.isConnecte)
      if (that.data.isConnecte) {
        if (wx.getStorageSync('openId')) {
          wx.redirectTo({
            url: '../index/index',
          })
        } else {
          wx.redirectTo({
            url: '../login/login',
          })
        }
      } else {
      }
      console.log("isConnecteTimer=>",that.data.isConnecteTimer)
    },
    200)
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
    clearTimeout(this.data.isConnecteTimer) 
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