// pages/Dynamicwork/Dynamicwork.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    topscore:'',
    showWxcDialog:false,
    searchCancle: false,
    canshowContent: true,
    canshowQuerryContent: false,
    name: '',
    userId: '',
    dataResComplete: '',
    resdata: [],
    coursesList: [],
    totalpage: '',
    pageNo: 1,
    listLock: 1,
    pageSize: 20,
    hasMoreData: true,

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
  gotoOtherpages: function (options) {
    var that = this;
    var id = options.currentTarget.dataset.id;
    console.log("id=>", id)
    console.log("options=>", options)
    wx.request({
      url: app.globalData.URi + '/applets/exam/status.jspx',
      data: {
        examId: id,
        userId: wx.getStorageSync("userId")
      },
      method: 'GET', //方法分GET和POST，根据需要写
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) { //这里写调用接口成功之后所运行的函数
        console.log(res)
        console.log(res.data); //调出来的数据在控制台显示，方便查看
        that.setData({
          detail: res.data,
        })
        if (res.data.status == 1) {
          wx.request({
            url: app.globalData.URi + '/applets/exam/start.jspx', //自己的服务接口地址
            method: 'post',
            data: {
              examuserId: that.data.detail.examuserId,
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              console.log("res=>", res.data)
              wx.navigateTo({
                url: '../AlltestDetail/AlltestDetail?examuserId=' + that.data.detail.examuserId
              })
            },
            fail: function () {
              console.log('系统错误！')
            }
          })

        }
        if (res.data.status == 2) {
          wx.request({
            url: app.globalData.URi + '/applets/exam/start.jspx', //自己的服务接口地址
            method: 'post',
            data: {
              examuserId: that.data.detail.examuserId,
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              console.log("res=>", res)
            },
            fail: function () {
              console.log('系统错误！')
            }
          })
        }
        if (res.data.status == 3) {
          // wx.navigateTo({
          //   url: '../finishTest/finishTest?examuserId=' + res.data.examuserId
          //  })
          that.setData({
          topscore:  res.data.topscore
          })
          that.showDialog()
          wx.request({
            url: app.globalData.URi + '/exam/inner_member/o_clear_option.jspx', //自己的服务接口地址
            method: 'post',
            data: {
              examuserId: that.data.detail.examuserId,
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              console.log("res=>", res)
            },
            fail: function () {
              console.log('系统错误！')
            }
          })
        }
        if (res.data.status == -1) {
          Toast('已超出最大限制');

        }
        if (res.data.status == -2) {
          Toast('培训班未完成');

        }
        if (res.data.status == -3) {
          Toast('未加入培训班');

        }
        if (res.data.status == -5) {
          Toast('考试已结束');

        }
        if (res.data.status == -6) {
          Toast('考试未开始');

        } else {

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
    // if (1 == 1) {
    //   wx.navigateTo({
    //     url: '../AlltestDetail/AlltestDetail?index=' + id
    //   });
    // }
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
    // that.setData({
    //   userId: wx.getStorageSync("userId"),

    // })
    wx.request({
      url: app.globalData.URi + '/applets/exam-list.jspx',
      data: {
        pageNo: that.data.pageNo
      },
      method: 'GET', //方法分GET和POST，根据需要写
      header: { //定死的格式，不用改，照敲就好
        'Content-Type': 'application/json'
      },
      success: function (res) { //这里写调用接口成功之后所运行的函数
        console.log(res.data); //调出来的数据在控制台显示，方便查看
        var e = res.data.exams;
        console.log(e);
        that.setData({
          // resdata: e.courses,//res.data就是你调出来的所有数据（当然也可以在这里面自定义想要调用的数据），然后把值赋给resdata，之后对resdata进行处理即可，具体见wxml
          totalPage: res.data.totalPage,
          coursesList: e
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
  showDialog() {
    let dialogComponent = this.selectComponent('.wxc-dialog')
    dialogComponent && dialogComponent.show();
  },
  hideDialog() {
    let dialogComponent = this.selectComponent('.wxc-dialog')
    dialogComponent && dialogComponent.hide();
  },
  onConfirm () {
    var that =this
    console.log('点击了确认按钮')
    wx.request({
      url: app.globalData.URi + '/applets/exam/option_clear.jspx', //自己的服务接口地址
      method: 'post',
      data: {
        examuserId: that.data.detail.examuserId,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("res=>", res.data)
        wx.request({
          url: app.globalData.URi + '/applets/exam/status.jspx',
          data: {
            examId:  res.data.examId,
            userId: res.data.userId
          },
          method: 'GET', //方法分GET和POST，根据需要写
          header: {
            'Content-Type': 'application/json'
          },
          success: function (res) { //这里写调用接口成功之后所运行的函数
            console.log(res)
            console.log(res.data); //调出来的数据在控制台显示，方便查看
            that.setData({
              detail: res.data,
            })
            if (res.data.status == 1) {
              wx.request({
                url: app.globalData.URi + '/applets/exam/start.jspx', //自己的服务接口地址
                method: 'post',
                data: {
                  examuserId: that.data.detail.examuserId,
                },
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                success: function (res) {
                  console.log("res=>", res.data)
                  wx.navigateTo({
                    url: '../AlltestDetail/AlltestDetail?examuserId=' + that.data.detail.examuserId
                  })
                },
                fail: function () {
                  console.log('系统错误！')
                }
              })
    
            }
            if (res.data.status == 2) {
              wx.request({
                url: app.globalData.URi + '/applets/exam/start.jspx', //自己的服务接口地址
                method: 'post',
                data: {
                  examuserId: that.data.detail.examuserId,
                },
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                success: function (res) {
                  console.log("res=>", res)
                },
                fail: function () {
                  console.log('系统错误！')
                }
              })
            }
            if (res.data.status == 3) {
              // wx.navigateTo({
              //   url: '../finishTest/finishTest?examuserId=' + res.data.examuserId
              //  })
              that.setData({
              topscore:  res.data.topscore
              })
              that.showDialog()
              wx.request({
                url: app.globalData.URi + '/exam/inner_member/o_clear_option.jspx', //自己的服务接口地址
                method: 'post',
                data: {
                  examuserId: that.data.detail.examuserId,
                },
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                success: function (res) {
                  console.log("res=>", res)
                },
                fail: function () {
                  console.log('系统错误！')
                }
              })
            }
            if (res.data.status == -1) {
              Toast('已超出最大限制');
    
            }
            if (res.data.status == -2) {
              Toast('培训班未完成');
    
            }
            if (res.data.status == -3) {
              Toast('未加入培训班');
    
            }
            if (res.data.status == -5) {
              Toast('考试已结束');
    
            }
            if (res.data.status == -6) {
              Toast('考试未开始');
    
            } else {
    
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
      fail: function () {
        console.log('系统错误！')
      }
    })
    this.hideDialog()
  },
  onCancel () {
    console.log('点击了取消按钮')
    this.hideDialog()
  }

})