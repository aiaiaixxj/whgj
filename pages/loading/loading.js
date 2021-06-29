// pages/loading/loading.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    height:'',
    width:'',
    isConnecte:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getNetworkType({
      success: function (res) {
        console.log(res.networkType)
        wx.setStorageSync('networkType', res.networkType)
      }
    })
    let networkTypearray =['3g','4g','5g','wifi'];
     let a=networkTypearray.includes(wx.getStorageSync('networkType'),0)
     console.log('wx.get=>>>',wx.getStorageSync('networkType'))
     console.log('a=>>>',a)
    if(1){
      if(wx.getStorageSync('openId'))
      {
        wx.redirectTo({
          url: '../index/index',
        })
      }
      else{
        wx.redirectTo({
          url: '../login/login',
        })
      }
    }
    else{

    }
    
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