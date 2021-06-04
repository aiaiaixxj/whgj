// pages/AllTrainingCoursesList/AllTrainingCoursesList.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    canshowallquestionsData: true,
    disableBeforeStep: true,
    getrtime: '',
    time: 30 * 60 * 60 * 1000,
    timeData: {},
    datika: true,
    questionType: '',
    hiddenBeforeStep: false,
    hiddenNextStep: false,
    hiddenComplete: true,
    trainingclassId: '',
    courseId: '',
    examId: '',
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
    coverView: true,
    examuserId: '',
    questionArray: '',
    canshowAllquestions: false,
    allquestionsData: '',
    questionId: '',
    fieldQuestionId: '',
    optionId: '',
    focus: false,
    flag: false,
    fieldContentArry: [],
    percentage: '',
    // question: {
    //   content: '坚定文化自信，是事关国运兴衰，事关文化安全、事关民族精神独立性的大问题。坚定中国特色社会主义_、_、_，说到底就是要坚定文化自信。讲文化自信，我们有充足的理由和充足的底气，因为中国特色社会主义文化_、_、_、_',
    //   title: '填空题',
    //   score: 10,
    //   answer: '道路自信;理论自信;制度自信;源自于博大精深的中华优秀传统文化;承继于激昂向上的革命文化;熔铸于生机勃勃的社会主义先进文化;植根于中国特色社会主义伟大实践',
    //   id:1
    // }, // 从后台获取的题目信息
    question: [],
    testData: {
      id: 1,
      content: '因为中国特@色社会@主义文化,源自于博大精深的中华@优秀传统文化'
    },
    isBtnActive: false,
    answer: '', // 回答的答案
    isShowNext: false // 确定按钮和下一题按钮的显示隐藏控制
  },
  jumpTosomeoneQuestion(options) {
    var that = this;
    console.log("options", options)
    wx.request({
      url: app.globalData.URi + '/applets/exam/pagination.jspx', //自己的服务接口地址
      method: 'post',
      data: {
        examuserId: that.data.examuserId,
        pageNo: options.currentTarget.dataset.index,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("res=>", res.data)
        let questionarray = []
        questionarray.push(res.data.array[0].name)
        questionarray.push(res.data.array[0].answer)
        console.log("questionarray=>", questionarray)
        that.setData({
          questionArray: res.data.array,
          questionType: res.data.array[0].type,
          totalpage: res.data.totalPage,
          pageno: options.currentTarget.dataset.index,
          percentage: parseInt(options.currentTarget.dataset.index / res.data.totalPage * 100),
          question: questionarray,
          time: res.data.getrtime
        })


        console.log("question=>", that.data.question)
      },
      fail: function () {
        console.log('系统错误！')
      }
    })
    that.CloseAllquestionspanel();
    if (options.currentTarget.dataset.index == 1) {
      that.setData({
        disableBeforeStep: true
      })
    }
    if(options.currentTarget.dataset.index>1&&options.currentTarget.dataset.index<that.data.totalpage){
      that.setData({
        disableBeforeStep: false
      })
    }
    if (options.currentTarget.dataset.index == that.data.totalpage) {
      that.setData({
        disableBeforeStep: false,
        hiddenNextStep: true,
        hiddenComplete: false
      })
    }
  },

  /**
   * 
   * 答题卡
   */
  getAllquestions() {
    var that = this;
    that.setData({
      canshowAllquestions: true,
      canshowallquestionsData: true
    })
    wx.request({
      url: app.globalData.URi + '/applets/exam/all.jspx', //自己的服务接口地址
      method: 'post',
      data: {
        examuserId: that.data.examuserId,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("res=>", res)
        that.setData({
          allquestionsData: res.data.array,
          percentage: parseInt(that.data.pageno / that.data.totalpage * 100)
        })
      },
      fail: function () {
        console.log('系统错误！')
      }
    })
  },
  /**
   * 
   * 关闭答题卡
   */
  CloseAllquestionspanel() {
    var that = this;
    that.setData({
      canshowallquestionsData: false,
      canshowAllquestions: false,
      percentage: parseInt(that.data.pageno / that.data.totalpage * 100)
    })
  },
  /**
   * 
   * 单项选择
   */
  radiochange: function (e) {

    var item = e.detail.value //  

    console.log('radio发生change事件，携带的value值为：', e.detail.value);

    //循环选中的数组，取出对应的数据进行数组拼接 
    // for (var i = 0; i < item.length; i++) {
    var row = item.split(",")

    console.log("row=>", row)
    //将数组进行分割 
    var questionId = row[0] //数组下表的第一个
    var optionId = row[1].concat(',')
    this.setData({
      optionId: optionId,
      questionId: questionId
    })

    wx.request({
      url: app.globalData.URi + '/applets/exam/option_save.jspx', //自己的服务接口地址
      method: 'post',
      data: {
        userId: wx.getStorageSync('userId'),
        options: this.data.optionId,
        themeId: this.data.questionId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        console.log(res.data);

      }
    })
  },
  /**
   * 
   * 多项选择
   */
  check(e) {
    let questionId = e.currentTarget.dataset.id;
    console.log("当前checkBox事件：", e.currentTarget.dataset.id);
    this.setData({
      questionId: questionId
    })
    if (this.data.flag == true) {
      this.setData({
        questionId: questionId,
        optionId: '',
      })
      wx.request({
        url: app.globalData.URi + '/applets/exam/option_save.jspx', //自己的服务接口地址
        method: 'post',
        data: {
          userId: wx.getStorageSync('userId'),
          options: this.data.optionId,
          themeId: this.data.questionId
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res.data);

        }

      })
    }
  },
  checkboxChange(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail)
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)

    var item = e.detail.value //

    var questionId = [];

    var optionId = []; //  选中的NAME

    //循环选中的数组，取出对应的数据进行数组拼接 
    for (var i = 0; i < item.length; i++) {
      var row = item[i].split(",")
      //将数组进行分割 
      questionId = questionId.concat(row[0]) //数组下表的第一个为
      optionId = optionId.concat(row[1])
      //数组下表的第二个为name 
    }
    console.log("多选事件", questionId);
    console.log("多选事件", optionId);
    if (optionId.length > 0) {
      var questionId = row[0] //数组下表的第一个为
      var optionId = optionId
      this.setData({
        questionId: questionId,
        optionId: optionId,
        flag: false
      })
      wx.request({
        url: app.globalData.URi + '/applets/exam/option_save.jspx', //自己的服务接口地址
        method: 'post',
        data: {
          userId: wx.getStorageSync('userId'),
          options: this.data.optionId,
          themeId: this.data.questionId
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res.data);

        }
      })
    } else {
      this.setData({
        flag: true
      })
      console.log("数组为空，多选数组为空");
    }
  },
  /**
   * 
   * textarea绑定事件
   */
  handleJumpPage(e) {
    var that = this;
    let questionId = e.currentTarget.dataset.id;
    console.log("当前handleJumpPage事件：", e.currentTarget.dataset.id);
    that.setData({
      questionId: e.currentTarget.dataset.id
    })
  },
  /**
   * 
   * textarea
   */
  bindTextAreaBlur: function (e) {
    var that = this;
    console.log("okok");
    console.log(e.detail.value);
    this.setData({
      remark: e.detail.value
    })
    console.log("remark类型：", typeof (that.data.remark))
    wx.request({
      url: app.globalData.URL + '/app/member-option-save.jspx', //自己的服务接口地址
      method: 'post',
      data: {
        accountId: that.data.accountId,
        optionIds: that.data.optionIds,
        questionId: that.data.questionId,
        remark: that.data.remark
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data);

      }
    })
  },
  onChangeinput(e) {
    //console.log("e=>",e)
  },
  onChangeinputclick() {},
  onChangeinputblur(e) {
    console.log("e=>", e)
    this.data.fieldContentArry.push(e.detail.value)
    console.log("this.data.fieldContentArry=>", this.data.fieldContentArry)
  },
  /**
   * 
   * 上一题
   */
  BeforeStep() {
    var that = this;
    if (that.data.pageno == 2) {
      that.setData({
        //  pageno: 1,
        hiddenNextStep: false,
        hiddenBeforeStep: false,
        hiddenComplete: true,
        disableBeforeStep: true
      })

    }
    that.setData({
      pageno: that.data.pageno - 1,
      hiddenNextStep: false,
      hiddenBeforeStep: false,
      hiddenComplete: true
    })

    if (that.data.pageno < that.data.totalpage) {

      that.getNewData();

      console.log("that.data.pageno", that.data.pageno);
    }
    setTimeout(() => {
      console.log("questionType=>", that.data.questionType)
    }, 200)

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
        pageno: that.data.totalpage,
        hiddenNextStep: true,
        hiddenBeforeStep: false,
        hiddenComplete: false,
        disableBeforeStep: false
      })
      console.log("当前页等于总页数", that.data.pageno, that.data.totalpage)
    } else {
      that.setData({
        pageno: that.data.pageno + 1,
        hiddenNextStep: false,
        hiddenBeforeStep: false,
        hiddenComplete: true,
        disableBeforeStep: false
      })
      console.log("当前页小于总页数", that.data.pageno, that.data.totalpage)
      that.getNewData();

      console.log("当前页数", that.data.pageno)

    }

    if (that.data.pageno == that.data.totalpage) {
      that.setData({
        hiddenNextStep: true,
        hiddenBeforeStep: false,
        hiddenComplete: false,
        disableBeforeStep: false
      })
    }
    console.log("that.data.pageno", that.data.pageno);
    that.setData({
      a: ''
    })
    setTimeout(() => {
      console.log("questionType=>", that.data.questionType)
      console.log("that.data.answer", that.data.answer)
      console.log("that.data.answer!=',,,,'", that.data.answer != ',,,,')
      if (that.data.questionType == 4) {
        wx.request({
          url: app.globalData.URi + '/applets/exam/option_save.jspx', //自己的服务接口地址
          method: 'post',
          data: {
            userId: wx.getStorageSync('userId'),
            options: that.data.answer,
            themeId: that.data.fieldQuestionId
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            console.log(res.data);
            that.setData({
              answer: ''
            })
          }
        })
      }

    }, 200)

    // }
  },
  /**
   * 完成考试
   */
  Complete() {

    var that = this
    that.setData({
      hiddenComplete: true,
      hiddenBeforeStep: true,
      hiddenNextStep: true,
      datika: false
    })
    console.log("当前页数", that.data.pageno)
    wx.request({
      url: app.globalData.URi + '/applets/exam/option_save.jspx', //自己的服务接口地址
      method: 'post',
      data: {
        userId: wx.getStorageSync('userId'),
        options: that.data.answer,
        themeId: that.data.fieldQuestionId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          answer: ''
        })
      }
    })
    setTimeout(() => {
      wx.request({
        url: app.globalData.URi + '/applets/exam/finish.jspx', //自己的服务接口地址
        method: 'post',
        data: {
          // userId: wx.getStorageSync('userId'),
          // options: that.data.answer,
          // themeId: that.data.fieldQuestionId
          examuserId: that.data.examuserId
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res.data);
        }
      })
    }, 100)
    setTimeout(() => {
      wx.redirectTo({
        url: '../finishTest/finishTest?examuserId=' + that.data.examuserId
      })
    }, 100)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log("options", options)
    this.setData({
      examuserId: options.examuserId
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
        if (res.data.status == -1) {
          wx.redirectTo({
            url: '../finishTest/finishTest?examuserId=' + res.data.examuserId
          })
        } else {
          that.setData({
            questionArray: res.data.array,
            questionType: res.data.array[0].type,
            totalpage: res.data.totalPage,
            resdata: res.data,
            percentage: parseInt(that.data.pageno / res.data.totalPage * 100),
            time: res.data.getrtime
          })
        }

        // console.log("questionType=>",that.data.questionType)

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
        pageNo: that.data.pageno
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("res=>", res.data)
        var questionarray = []
        questionarray.push(res.data.array[0].name)
        questionarray.push(res.data.array[0].answer)
        that.setData({
          questionArray: res.data.array,
          question: questionarray,
          questionType: res.data.array[0].type,
          totalpage: res.data.totalPage,
          percentage: parseInt(that.data.pageno / res.data.totalPage * 100),
          time: res.data.getrtime
        })
        console.log("question=>", that.data.question)
        console.log("questionType=>", that.data.questionType)
        console.log('Math.floor(that.data.pageno/res.data.totalPage) ', that.data.pageno / res.data.totalPage * 100)
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
  onShareAppMessage: function () {},
  /**
   * 接收填空题组件的值来控制按钮isactive
   * @param {*} e 
   */
  fnGetChildParamEvent: function (e) {
    console.log("e=>", e)
    // isBtnActive 为true，按钮激活； answer为用户输入的答案
    const {
      isBtnActive,
      answer
    } = e.detail;
    this.setData({
      isBtnActive,
      answer,
      fieldQuestionId: e.currentTarget.dataset.id
    });
    console.log("isBtnActive=>", this.data.isBtnActive)
    console.log("answer=>", this.data.answer)
  },
  /**
   * 点击确定，调后台接口保存用户答题的答案
   * @param {*} e 
   */
  fnSave: function (e) {
    if (!this.data.isBtnActive) {
      return false;
    }
    const that = this;
    const params = { 
      answer: this.data.answer
    };
    wx.request({
      url: 'xxxxx/xxxxx/',
      method: 'POST',
      data: params,
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        // 保存成功之后的处理逻辑
      }
    })
  },
  fnToNext: function () {},
  onChange(e) {
    this.setData({
      timeData: e.detail,
    });
    // console.log("this.data.timeData=>",this.data.timeData)
  }
})