// app.js
App({
  onLaunch() {
    wx.getNetworkType({
      success: function(res) {
        console.log(res.networkType)
      }
    })
    wx.onNetworkStatusChange(function (res) {
      console.log(res.isConnected)
      console.log(res.networkType)
    })
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    URL:'http://www.whce.gov.cn/',
    URi:'http://192.168.0.107:8080/whce_new/'
  }
})
