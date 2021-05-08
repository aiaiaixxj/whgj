// pages/AllTrainingCoursesList/AllTrainingCoursesList.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    trainingclassId:'',
    courseId:'',
    detail:'',
    searchCancle:false,
    canshowContent:true,
    canshowQuerryContent:false,
    name:'',
    userId: '',
    resdata: [],
    coursesList:[],
    totalpage: '',
    pageNo: 1,
    listLock: 1,
    pageSize: 20,
    hasMoreData: true,
    dataResComplete:'',
    height:'',
    videoCurrentTime:'',
    viewShowed: false, //显示结果view的状态
    inputVal: "", // 搜索框值
    catList: [], //搜索渲染推荐数据

    TrainingCourses: [{
      url: '../../images/block1.png',
      title: "全部课程全部课程全部课程全部",
      des: "All courses",
      id: 1
    }, ],
  },
  timeUpdate(e) {
    var that = this;
    that.setData({
      videoCurrentTime: e.detail.currentTime
    })
    console.log(e.detail.currentTime);
  },
  videoErrorCallback: function (e) {

    console.log('视频错误信息:'+e.detail.errMsg);
  
   },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      height: wx.getSystemInfoSync().windowHeight-50,
     // width: wx.getSystemInfoSync().windowWidth,
    })
    this.setData({
      courseId:options.index
    })
   console.log("options",options)
   // this.getData('正在加载数据...');
    this.getData();
  },
  /*
  获取数据
  */
  getData: function (message) {
    // wx.showLoading({
    //   title: message,
    // })
    var that = this;
    that.setData({
      userId: wx.getStorageSync("userId"),
     
    })
    wx.request({
      url: app.globalData.URi + '/applets/course.jspx',
      data: {
        userId:that.data.userId,
        courseId:that.data.courseId
      },
      method: 'GET', //方法分GET和POST，根据需要写
      header: { //定死的格式，不用改，照敲就好
        'Content-Type': 'application/json'
      },
      success: function (res) { //这里写调用接口成功之后所运行的函数
        console.log(res)
        console.log(res.data); //调出来的数据在控制台显示，方便查看
        that.setData({
          detail:res.data
        })
      },
      fail: function (res) { //这里写调用接口失败之后所运行的函数
        console.log('.........fail..........');
      },
      complete: function () {
        wx.hideLoading();
        // complete
        that.setData({
          dataResComplete:true 
          })
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
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
    console.log('下拉');
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.data.pageNo = 1
    this.getData('正在刷新数据')

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.hasMoreData) {
      this.getData('加载更多数据')
    } else {
      // wx.showToast({
      //   title: '没有更多数据',
      // })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})