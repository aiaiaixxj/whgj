// pages/finishTest/finishTest.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resArraylist: '',
    resData: '',
    canshowAllquestions:false,
    examuserId:'',
    questionArray:'',
    pageno:'',
    question:'',
  },
  jumpTosomeoneQuestion(options) {
    var that=this
    that.setData({
      canshowAllquestions: true,
    })
    console.log("options=>", options)
    var id =  options.currentTarget.dataset.index;
    wx.request({
      url: app.globalData.URi + '/applets/exam/answer.jspx', //自己的服务接口地址
      method: 'post',
      data: {
        // userId: wx.getStorageSync('userId'),
        // options: that.data.answer,
        // themeId: that.data.fieldQuestionId
        pageNo: id,
        examuserId:that.data.examuserId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          questionArray:res.data.array,
          pageno:id,
          question:res.data.array[0].name,
        })
      }
    })
  },
    /**
   * 
   * 关闭答题回顾
   */
  CloseAllquestionspanel() {
    var that = this;
    that.setData({
      canshowAllquestions: false,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log("options=>", options)
    wx.request({
      url: app.globalData.URi + '/applets/exam/score.jspx', //自己的服务接口地址
      method: 'post',
      data: {
        // userId: wx.getStorageSync('userId'),
        // options: that.data.answer,
        // themeId: that.data.fieldQuestionId
        examuserId: options.examuserId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          resArraylist: res.data.array,
          resData: res.data,
          examuserId:options.examuserId
        })
      }
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