// pages/login/login.js
const app = getApp();
Page({
  data: {
    username: '',
    password: '',
    userId: '',
    code: '',
    realname: ''
  },
  // 获取输入账号 
  phoneInput: function (e) {
    this.setData({
      username: e.detail.value
    })
  },
  // 获取输入密码 
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //页面加载时，从微信缓存读取账号密码
    var _this = this;
    _this.setData({
      username: wx.getStorageSync("username"),
      password: wx.getStorageSync("password"),
    })
    wx.request({
      url: app.globalData.URi + '/applets/openid/login.jspx', //自己的服务接口地址
      method: 'post',
      data: {
        openId:wx.getStorageSync("openId"),
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("res=>", res)
        if(res.data.status==1){
          wx.redirectTo({
            url: '../index/index',
          })
        }
       
      },
      fail: function () {
        console.log('系统错误！')
      }
    })
  },
  login: function (e) {
    var that = this;
    wx.setStorageSync("username", that.data.username);
    wx.setStorageSync("password", that.data.password);
    console.log(app.globalData.URL);
    if (that.data.username.length == 0 || that.data.password.length == 0) {
      wx.showToast({
        title: '用户名和密码不能为空',
        icon: 'none',
        duration: 2000
      })
    }
    console.log("this.data.username:", that.data.username)
    wx.login({
      success(res) {

        console.log("res.code=>", res.code);
        that.setData({
          code: res.code
        })
        //发起网络请求
        wx.request({
          url: app.globalData.URi + '/applets/login.jspx', //自己的服务接口地址
          method: 'post',
          data: {
            username: that.data.username,
            password: that.data.password
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            console.log("this.data.username:", that.data.username);
            console.log(res);
            console.log(res.data);
            console.log(res.data.username);
            wx.setStorageSync("times", res.data.times);
            wx.setStorageSync("realname", res.data.realname);
            wx.setStorageSync("userId", res.data.userId);
            wx.setStorageSync("ranking", res.data.ranking);
            //4.解密成功后 获取自己服务器返回的结果
            if (res.data.status == 1) {
              wx.request({
                url: app.globalData.URi + '/applets/code.jspx', //自己的服务接口地址
                method: 'post',
                data: {
                  code: that.data.code,
                  userId: wx.getStorageSync('userId')
                },
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                success: function (res) {
                  console.log("res=>", res);
                  wx.setStorageSync("openId", res.data.openId);
                },
                fail: function () {
                  console.log('系统错误！')
                }
              })
              wx.navigateTo({
                url: '../index/index',
              })
            } else if (res.data.status == -1) {
              console.log('用户被禁用！')
              wx.showToast({
                title: '用户被禁用！',
                icon: 'none',
                duration: 1000
              })
            } else if (res.data.status == -2) {
              console.log('用户名错误！')
              wx.showToast({
                title: '用户名错误！',
                icon: 'none',
                duration: 1000
              })
            } else if (res.data.status == 0) {
              console.log('密码错误！')
              wx.showToast({
                title: '密码错误！',
                icon: 'none',
                duration: 1000
              })
            } else {
              console.log('请重新核对账号或密码！')
              wx.showToast({
                title: '请重新核对账号或密码！',
                icon: 'none',
                duration: 1000
              })
            }
          },
          fail: function () {
            console.log('系统错误！')
          }
        })
      }
    })
    // var that = this;
    // wx.setStorageSync("username",that.data.username);
    // wx.setStorageSync("password",that.data.password);
    // console.log(app.globalData.URL);
    // if (that.data.username.length == 0 || that.data.password.length == 0) {
    //   wx.showToast({
    //     title: '用户名和密码不能为空',
    //     icon: 'none',
    //     duration: 2000
    //   })
    // }
    // console.log("this.data.username:", that.data.username)
    // wx.request({
    //   url:app.globalData.URi+'/applets/login.jspx', //自己的服务接口地址
    //   method: 'post',
    //   data: {
    //     username: that.data.username,
    //     password: that.data.password
    //   },
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded'
    //   },
    //   success: function (res) {
    //     console.log("this.data.username:", that.data.username);
    //     console.log(res);
    //     console.log(res.data);
    //     console.log(res.data.username);
    //   wx.setStorageSync("times",res.data.times);
    //    wx.setStorageSync("realname",res.data.realname);
    //    wx.setStorageSync("userId",res.data.userId);
    //    wx.setStorageSync("ranking",res.data.ranking);
    //     //4.解密成功后 获取自己服务器返回的结果
    //     if (res.data.status == 1) {

    //         wx.navigateTo({
    //             url: '../index/index',
    //           })
    //     } 
    //     else if(res.data.status == -1){
    //       console.log('用户被禁用！')
    //       wx.showToast({
    //         title: '用户被禁用！',
    //         icon: 'none',
    //         duration: 1000
    //       })
    //     }
    //     else if(res.data.status == -2){
    //       console.log('用户名错误！')
    //       wx.showToast({
    //         title: '用户名错误！',
    //         icon: 'none',
    //         duration: 1000
    //       })
    //     }
    //     else if(res.data.status == 0){
    //       console.log('密码错误！')
    //       wx.showToast({
    //         title: '密码错误！',
    //         icon: 'none',
    //         duration: 1000
    //       })
    //     }
    //     else {
    //       console.log('请重新核对账号或密码！')
    //       wx.showToast({
    //         title: '请重新核对账号或密码！',
    //         icon: 'none',
    //         duration: 1000
    //       })
    //     }
    //   },
    //   fail: function () {
    //     console.log('系统错误！')
    //   }
    // })
    // wx.getUserProfile({
    //   desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
    //   success: (res) => {
    //     console.log(res)
    //     this.setData({
    //       // userInfo: res.userInfo,
    //       // hasUserInfo: true
    //     })
    //   }
    // })

  },
  // copyCode: function () {
  //   wx.setClipboardData({
  //     data: code,
  //     success: function () {
  //       wx.showToast({
  //         title: '复制成功',
  //       })
  //     }
  //   })
  // },
})