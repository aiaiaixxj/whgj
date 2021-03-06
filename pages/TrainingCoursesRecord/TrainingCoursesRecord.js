// pages/TrainingCoursesRecord/TrainingCoursesRecord.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    statusArry: [],
    userId: '',
    resdata: [],
    totalpage: '',
    pageNo: 1,
    listLock: 1,
    pageSize: 20,
    dataResComplete:'',
    hasMoreData: true,
    status: '',
    jumpid: '',
    statusid: '',
    TrainingCourses: [{
      url: '../../images/block1.png',
      title: "全部课程全部课程全部课程全部",
      des: "All courses",
      id: 1
    }, ],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //this.getData('正在加载数据...');
    this.getData();
  },
  // 跳转页面
  gotoOtherpages: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    console.log("id=>",id)
      wx.navigateTo({
        url: '../AllTrainingCoursesList/AllTrainingCoursesList?index=' + id
      });
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
      url: app.globalData.URi + '/applets/trainingclass-user-list.jspx',
      data: {
        userId:that.data.userId,
        pageNo: that.data.pageNo
      },
      method: 'GET', //方法分GET和POST，根据需要写
      header: { //定死的格式，不用改，照敲就好
        'Content-Type': 'application/json'
      },
      success: function (res) { //这里写调用接口成功之后所运行的函数
        console.log(res.data); //调出来的数据在控制台显示，方便查看
        var e = res.data.trainingclassusers;
        let arryData = e;
        console.log(" e=>", e)
        var jumpid = arryData.map((item) => {
          return item.id;
        })
        console.log("jumpid=>", jumpid)
        that.setData({
          jumpid: jumpid
        });
        console.log("that.data.jumpid=>", that.data.jumpid)

        var statusid = arryData.map((item) => {
          return item.status;
        })
        console.log("statusid=>", statusid)
        var statusArry = []
        for (var i = 0; i < statusid.length; i++) {
          if (statusid[i] == 0) {
            statusArry.push('已加入')
          }
          if (statusid[i] == 1) {
            statusArry.push('已开始')
          }
          if (statusid[i] == 2) {
            statusArry.push('课程完成')
          }
          if (statusid[i] == 3) {
            statusArry.push('未通过')
          }
          if (statusid[i] == 4) {
            statusArry.push('通过')
          }
        }
        that.setData({
          statusArry: statusArry
        })
        console.log("statusArry=>", statusArry)

        // that.setData({
        //   resdata: e.trainingclassusers,//res.data就是你调出来的所有数据（当然也可以在这里面自定义想要调用的数据），然后把值赋给resdata，之后对resdata进行处理即可，具体见wxml
        //   totalPage: e.totalPage,
        // })
        var contentlistTem = that.data.resdata;
        if (that.data.pageNo == 1) {
          contentlistTem = []
        }
        var resdata = e;
        if (that.data.pageNo >= res.data.totalPage) {
          console.log("000000")
          that.setData({
            resdata: contentlistTem.concat(resdata),
            hasMoreData: false
          })
          var statusid = that.data.resdata.map((item) => {
            return item.status;
          })
          var statusArry = []
          for (var i = 0; i < that.data.resdata.length; i++) {
            if (statusid[i] == 0) {
              statusArry.push('已加入')
            }
            if (statusid[i] == 1) {
              statusArry.push('已开始')
            }
            if (statusid[i] == 2) {
              statusArry.push('课程完成')
            }
            if (statusid[i] == 3) {
              statusArry.push('未通过')
            }
            if (statusid[i] == 4) {
              statusArry.push('通过')
            }
          }
          that.setData({
            statusArry: statusArry
          })
          console.log("resdata",that.data.resdata)

        } else {
          console.log("that.data.pageNo=>",that.data.pageNo)
          console.log("res.data.totalpage=>",res.data.totalPage)
          console.log("that.data.pageNo >= res.data.totalpage=>",that.data.pageNo >= res.data.totalPage)
          that.setData({
            resdata: contentlistTem.concat(resdata),
            hasMoreData: true,
            pageNo: that.data.pageNo + 1
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
    console.log("this.data.hasMoreData",this.data.hasMoreData);
    console.log("this.data.pageNo",this.data.pageNo);
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