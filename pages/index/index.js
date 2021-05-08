// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    netWorkType: '',
    times: '',
    realname: '',
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    imageURL: [],
    MyCourses: [{
        url: '../../images/block1.png',
        title: "通知公告",
        des: "",
        id: 1
      },
      {
        url: '../../images/block2.png',
        title: "工作动态",
        des: "",
        id: 2
      },
      {
        url: '../../images/block3.png',
        title: "干教资讯",
        des: "",
        id: 3
      },
      {
        url: '../../images/block4.png',
        title: "全部课程",
        des: "",
        id: 4
      },
      {
        url: '../../images/block5.png',
        title: "所有培训班",
        des: "",
        id: 5
      },
      {
        url: '../../images/block6.png',
        title: "全部考试",
        des: "",
        id: 6
      },
      {
        url: '../../images/block4.png',
        title: "课程记录",
        des: "",
        id: 7
      },
      {
        url: '../../images/block5.png',
        title: "培训班记录",
        des: "",
        id: 8
      },
      {
        url: '../../images/block6.png',
        title: "考试记录",
        des: "",
        id: 9
      },
    ]
  },

  gotoOtherPages: function (e) {
    let aimtext = e.currentTarget.dataset.text; //获取点击目标文本title
    let index = e.currentTarget.dataset.index;
    console.log(index);
    console.log(aimtext);
    if ("通知公告" == aimtext) {
      wx.navigateTo({
        url: '../Announcements/Announcements'
      });
    }
    if ("工作动态" == aimtext) {
      wx.navigateTo({
        url: '../Dynamicwork/Dynamicwork'
      });
    }
    if ("干教资讯" == aimtext) {
      wx.navigateTo({
        url: '../Dryteachinginformation/Dryteachinginformation'
      });
    }
    if ("全部课程" == aimtext) {
      wx.navigateTo({
        url: '../Allcourses/Allcourses'
      });
    }
    if ("所有培训班" == aimtext) {
      wx.navigateTo({
        url: '../AllTrainingCourses/AllTrainingCourses'
      });
    }
    if ("全部考试" == aimtext) {
      wx.navigateTo({
        url: '../Alltest/Alltest'
      });
    }
    if ("课程记录" == aimtext) {
      wx.navigateTo({
        url: '../CourseRecord/CourseRecord'
      });
    }
    if ("培训班记录" == aimtext) {
      wx.navigateTo({
        url: '../TrainingCoursesRecord/TrainingCoursesRecord'
      });
    }
    if ("考试记录" == aimtext) {
      wx.navigateTo({
        url: '../TestRecord/TestRecord'
      });
    }

  },
  onLoad() {

    console.log("wx.getUserProfile=>", wx.getUserProfile);
    console.log("this.data.canIUseOpenData", this.data.canIUseOpenData);
    console.log("this.data.hasUserInfo", this.data.hasUserInfo);
    console.log("realname", wx.getStorageSync('realname'))
    this.setData({
      realname: wx.getStorageSync('realname'),
      times: wx.getStorageSync('times'),
    })

    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
      console.log("canIUseGetUserProfile=>", this.data.canIUseGetUserProfile)
    }
  },
  gotoPersonalInfo() {
    wx.navigateTo({
      url: '../personalInfo/personalInfo'
    });
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  login() {
    wx.login({
      success: function (res) {
        console.log(res)
      }
    })
  }

})