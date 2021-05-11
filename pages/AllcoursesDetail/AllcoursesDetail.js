// pages/AllTrainingCoursesList/AllTrainingCoursesList.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    trainingclassId: '',
    courseId: '',
    detail: '',
    searchCancle: false,
    canshowContent: true,
    canshowQuerryContent: false,
    name: '',
    userId: '',
    resdata: [],
    coursesList: [],
    totalpage: '',
    pageNo: 1,
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
    TrainingCourses: [{
      url: '../../images/block1.png',
      title: "全部课程全部课程全部课程全部",
      des: "All courses",
      id: 1
    }, ],
  },
  videoUpdate(e) {
    // console.log("e=>",e)
    // console.log("e.detail.currentTime=>",e.detail.currentTime)
    if (this.data.updateState) { //判断拖拽完成后才触发更新，避免拖拽失效
      let sliderValue = e.detail.currentTime / e.detail.duration * 100;
      this.setData({
        sliderValue,
        duration: e.detail.duration
      })

    }
  },
  sliderChanging(e) {
    this.setData({
      updateState: true //拖拽过程中，不允许更新进度条
    })
  },
  sliderChange(e) {
    if (this.data.duration) {
      this.videoContext.seek(e.detail.value / 100 * this.data.duration); //完成拖动后，计算对应时间并跳转到指定位置
      this.setData({
        sliderValue: e.detail.value,
        updateState: false //完成拖动后允许更新滚动条
      })
    }
  },
  videoOpreation() {
    this.data.playStates ? this.videoContext.pause() : this.videoContext.play();
    this.setData({
      playStates: !this.data.playStates
    })
  },
  timeUpdate(e) {
    var that = this;
    that.setData({
      videoCurrentTime: e.detail.currentTime
    })
    // console.log(e.detail.currentTime);
  },
  videoErrorCallback: function (e) {

    console.log('视频错误信息:' + e.detail.errMsg);

  },
  /**播放视屏 */
  play(e) {
    //执行全屏方法  
    var videoContext = wx.createVideoContext('myVideo', this);
    videoContext.requestFullScreen();
    this.setData({
      fullScreen: true
    })
  },
  /**关闭视屏 */
  closeVideo() {
    //执行退出全屏方法
    var videoContext = wx.createVideoContext('myVideo', this);
    videoContext.exitFullScreen();
  },
  /**视屏进入、退出全屏 */
  fullScreen(e) {
    var isFull = e.detail.fullScreen;
    //视屏全屏时显示加载video，非全屏时，不显示加载video
    this.setData({
      fullScreen: isFull
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log("options.index=>", options.index)
    console.log("this.data.courseId=>", this.data.courseId)
    // console.log("页面加载")
    this.setData({
      height: wx.getSystemInfoSync().windowHeight - 50,
      // width: wx.getSystemInfoSync().windowWidth,
    })

    this.setData({
      courseId: options.index
    })
    console.log("options", options)
    // this.getData('正在加载数据...');

    var that = this;
    that.getData();
    console.log("that.data.courseId", that.data.courseId)
    that.setData({
      Loadingdata: setInterval(() => {
        setTimeout(() => {
          wx.request({
            url: app.globalData.URi + '/applets/course/join.jspx',
            data: {
              courseId: that.data.courseId,
              userId: wx.getStorageSync("userId"),
              times: Math.floor(that.data.videoCurrentTime)
            },
            method: 'GET', //方法分GET和POST，根据需要写
            header: { //定死的格式，不用改，照敲就好
              'Content-Type': 'application/json'
            },
            success: function (res) { //这里写调用接口成功之后所运行的函数
              console.log(res); //调出来的数据在控制台显示，方便查看
              console.log("看视频当前进度接口调用成功！")
              that.getData();
              that.setData({
                // detail: e, //res.data就是你调出来的所有数据（当然也可以在这里面自定义想要调用的数据），然后把值赋给resdata，之后对resdata进行处理即可，具体见wxml

              })
            },
            fail: function (res) { //这里写调用接口失败之后所运行的函数
              console.log('.........fail..........');
            },
            complete: function () {

            }
          })
        }, 0)
        console.log("options.index=>", options.index)
        console.log("that.data.courseId=>", that.data.courseId)
      }, 60 * 1000)
    })

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
        userId: that.data.userId,
        courseId: that.data.courseId
      },
      method: 'GET', //方法分GET和POST，根据需要写
      header: { //定死的格式，不用改，照敲就好
        'Content-Type': 'application/json'
      },
      success: function (res) { //这里写调用接口成功之后所运行的函数
        console.log(res)
        console.log(res.data); //调出来的数据在控制台显示，方便查看
        that.setData({
          detail: res.data
        })

        if (that.data.detail.progress == '100%') {
             that.setData({
              coverView:false 
             })
        }
      },
      fail: function (res) { //这里写调用接口失败之后所运行的函数
        console.log('.........fail..........');
      },
      complete: function () {
        wx.hideLoading();
        // complete
        that.setData({
          dataResComplete: true
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