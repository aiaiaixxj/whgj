// pages/Dynamicwork/Dynamicwork.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
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
    statusArry:[],
    dataResComplete:'',
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
  gotoOtherpages:function(options){
    var that = this;
    var id = options.currentTarget.dataset.id;
    console.log("options=>",options)
    console.log("id=>",id)
    if (1 == 1) {
      wx.navigateTo({
        url: '../AllcoursesDetail/AllcoursesDetail?index=' + id
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
      url: app.globalData.URi + '/applets/user-course-list.jspx',
      data: {
        pageNo:that.data.pageNo,
        userId:that.data.userId
      },
      method: 'GET', //方法分GET和POST，根据需要写
      header: { //定死的格式，不用改，照敲就好
        'Content-Type': 'application/json'
      },
      success: function (res) { //这里写调用接口成功之后所运行的函数
        console.log(res.data); //调出来的数据在控制台显示，方便查看
        var e = res.data.courses;
        console.log(e);
        that.setData({
         // resdata: e.courses,//res.data就是你调出来的所有数据（当然也可以在这里面自定义想要调用的数据），然后把值赋给resdata，之后对resdata进行处理即可，具体见wxml
          totalPage: res.data.totalPage,
            coursesList:e
        })
        var statusid = e.map((item) => {
          return item.status;
        })
        console.log("statusid=>", statusid)
        var statusArry = []
        for (var i = 0; i < statusid.length; i++) {
          if (statusid[i] == 1) {
            statusArry.push('已完成')
          }
          if (statusid[i] == 2) {
            statusArry.push('学习中')
          }
        }
        that.setData({
          statusArry: statusArry
        })
        console.log("statusArry=>", statusArry)
        var contentlistTem = that.data.resdata;
        if (that.data.pageNo == 1) {
          contentlistTem = []; 
        }
        var resdata = e;
        if (that.data.pageNo >= res.data.totalPage) {
          that.setData({
            resdata: contentlistTem.concat(resdata),
            hasMoreData: false
          })
          var statusid = that.data.resdata.map((item) => {
            return item.status;
          })
          var statusArry = []
          for (var i = 0; i < that.data.resdata.length; i++) {
            if (statusid[i] == 1) {
              statusArry.push('已开始')
            }
            if (statusid[i] == 2) {
              statusArry.push('已结束')
            }
          }
          that.setData({
            statusArry: statusArry
          })
          console.log("resdata=>",that.data.resdat)
          
        } else {
          that.setData({
            resdata: contentlistTem.concat(resdata),
            hasMoreData: true,
            pageNo: that.data.pageNo + 1,
          })
          var statusid = that.data.resdata.map((item) => {
            return item.status;
          })
          var statusArry = []
          for (var i = 0; i < that.data.resdata.length; i++) {
            if (statusid[i] == 1) {
              statusArry.push('已开始')
            }
            if (statusid[i] == 2) {
              statusArry.push('已结束')
            }
          }
          that.setData({
            statusArry: statusArry
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

  },
  // 隐藏搜索框样式
  hideInput: function(e) {
    this.setData({
      inputVal: "",
      viewShowed: false,
      canshowContent:true,
      canshowQuerryContent:false,
      searchCancle:false,
      pageNo:1
    });
    this.getData('正在刷新数据');
  },
  // 键盘抬起事件2
  inputTyping: function(e) {

    var that =this;
    that.setData({
      canshowContent:false,
      canshowQuerryContent:true
    })
    console.log("canshowContent=>",that.data.canshowContent)
    console.log("canshowQuerryContent=>",that.data.canshowQuerryContent)
    console.log("input-----",e)
    console.log("input-----eeeeeeee",e.detail.value)
    if(e.detail.value!=""){
      that.setData({
        searchCancle:true
      })
    }
    var value = e.detail.value
    wx.request({
      url: app.globalData.URi + '/applets/course-list.jspx',
      data: {
        name:value
      },
      method: 'GET', //方法分GET和POST，根据需要写
      header: { //定死的格式，不用改，照敲就好
        'Content-Type': 'application/json'
      },
      success: function (res) { //这里写调用接口成功之后所运行的函数
        console.log(res.data); //调出来的数据在控制台显示，方便查看
        var e = res.data.courses;
        console.log(e);
        that.setData({
         // resdata: e.courses,//res.data就是你调出来的所有数据（当然也可以在这里面自定义想要调用的数据），然后把值赋给resdata，之后对resdata进行处理即可，具体见wxml
          totalPage: res.data.totalPage,
          resdata:res.data.courses
        })
        var contentlistTem = that.data.resdata;
        if (that.data.pageNo == 1) {
          contentlistTem = []; 
        }
        var resdata = e;
        if (that.data.pageNo >= res.data.totalPage) {
          that.setData({
            resdata: contentlistTem.concat(resdata),
            hasMoreData: false
          })
        } else {
          that.setData({
            resdata: contentlistTem.concat(resdata),
            hasMoreData: true,
            pageNo: that.data.pageNo + 1,
          })
        }
      },
      fail: function (res) { //这里写调用接口失败之后所运行的函数
        console.log('.........fail..........');
      },
      complete: function () {
        wx.hideLoading();
        // complete
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }
    })
    // var that = this;
    // var list1 = that.data.list1
    // if (value == '') {
    //   that.setData({
    //     viewShowed: false,
    //   });
    // } else {
    // //“这里需要特别注意，不然在选中下拉框值的时候，下拉框又出现”
    //   if (e.detail.cursor) { //e.detail.cursor表示input值当前焦点所在的位置
    //     var arr = [];
    //     for (var i = 0; i < list1.length; i++) {
    //       if (list1[i].indexOf(value) >= 0) {
    //         arr.push(list1[i]);
    //       }
    //     }
    //     console.log(arr)
    //     that.setData({
    //       viewShowed: true,
    //       carList: arr
    //     });
    //   }
    // }
  },
  // 获取选中推荐列表中的值
  name: function(res) {
    console.log(res.currentTarget.dataset.index);
    var index = res.currentTarget.dataset.index
    var that = this;
    that.setData({
      inputVal: that.data.carList[index],
      viewShowed: false,
    })
  }

})