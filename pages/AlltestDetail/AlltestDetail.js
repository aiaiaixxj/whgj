// pages/AllTrainingCoursesList/AllTrainingCoursesList.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    trainingclassId: '',
    courseId: '',
    examId:'',
    detail: '',
    searchCancle: false,
    canshowContent: true,
    canshowQuerryContent: false,
    name: '',
    userId: '',
    resdata: [],
    coursesList: [],
    totalpage: '',
    pageno: 1,
    listLock: 1,
    pageSize: 20,
    hasMoreData: true,
    dataResComplete: '',
    height: '',
    videoCurrentTime: '',
    viewShowed: false, //显示结果view的状态
    inputVal: "", // 搜索框值
    catList: [], //搜索渲染推荐数据
    Loadingdata: '',
    sliderValue: 0, //控制进度条slider的值，
    updateState: false, //防止视频播放过程中导致的拖拽失效
    playStates: true, //控制播放 & 暂停按钮的显示
    fullScreen: '',
    coverView:true,
    examuserId:'',
    questionArray:''
  },
    /**
   * 
   * 上一题
   */
  BeforeStep() {
    var that = this;
    if (that.data.pageno == 1) {
      that.setData({
        pageno: 1
      })
      return  
    }
    that.setData({
      pageno: that.data.pageno - 1
    })
 
    if (that.data.pageno < that.data.totalpage) {
      that.getNewData();
    }

    console.log("that.data.pageno", that.data.pageno);
  },
  /**
   * 
   * 下一题 
   */
  NextStep() {

    // if (this.data.selectedQuestionList.length < this.data.requiredCount) {
    //   wx.showToast({
    //     title: '请完成所有必选项之后再进行下一步操作!',
    //     icon: 'none',
    //     duration: 2000
    //   })
    // } else {


      var that = this;

      if (that.data.pageno == that.data.totalpage) {
        that.setData({
          pageno: that.data.totalpage
        })
        console.log("当前页等于总页数", that.data.pageno, that.data.totalpage)
      } else {
        that.setData({
          pageno: that.data.pageno + 1
        })
        console.log("当前页小于总页数", that.data.pageno, that.data.totalpage)
        that.getNewData();
      }

      console.log("that.data.pageno", that.data.pageno);
    
    // }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log("options", options)
    this.setData({
      examuserId:options.examuserId
    })
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
    wx.request({
      url: app.globalData.URi + '/applets/exam/start.jspx', //自己的服务接口地址
      method: 'post',
      data: {
        examuserId: that.data.examuserId,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("res=>", res.data)
        that.setData({
          questionArray:res.data.array,
          totalpage:res.data.totalPage,
          resdata:res.data
        })
      },
      fail: function () {
        console.log('系统错误！')
      }
    })
  },
  getNewData: function (message) {
    // wx.showLoading({
    //   title: message,
    // })
    var that = this;
    wx.request({
      url: app.globalData.URi + '/applets/exam/pagination.jspx', //自己的服务接口地址
      method: 'post',
      data: {
        examuserId: that.data.examuserId,
        pageNo:that.data.pageno
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("res=>", res.data)
        that.setData({
          questionArray:res.data.array,
          totalpage:res.data.totalPage
        })
      },
      fail: function () {
        console.log('系统错误！')
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.videoContext = wx.createVideoContext('myVideo');
    this.setData({
      updateState: true
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("222")
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("111")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(this.data.Loadingdata)
    console.log("000")
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