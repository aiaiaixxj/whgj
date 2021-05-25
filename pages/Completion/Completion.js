Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 父组件传过来的题目数据
    questiondata: {
      type: Array,
      observer: function (news, old, path) {
        console.log("news=>", news)
        const titleArr = news[0].split(''); // 将题目分割为数组
        let inputMap = new Map(); // 新建map
        for (let i = 0; i < titleArr.length; i++) { // 遍历分割的数组
          if (titleArr[i] === '@') {
            inputMap.set(i, ''); // 如果遇到下划线，就set进map里
          }
        }
        this.setData({
          titleArr,
          inputMap,
          rightAnswerArray: news[1],

        })
        var rightAnswer = []
        if(news[1]){
          for (let i = 0; i < news[1].length; i++) {  
            rightAnswer.push(news[1][i].name); 
        }
        this.setData({
          rightAnswer,
          canshowAnswer:true
        })
        }
      
        console.log("rightAnswer==>", rightAnswer)
        console.log("titleArr=>", this.data.titleArr)
        console.log("inputMap=>", this.data.inputMap)
      }
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    titleArr: [], // 题目分割的数组
    inputMap: new Map(), // 新建map 存放用户输入的答案
    testData: [],
    rightAnswerArray: [],
    rightAnswer: [],
    canshowAnswer:false
  },
  observers: {
    // '**' (val) {
    //   console.log('**所有的setData变化：', val) // 此时返回的 val 值是一个包含所有data变量的对象
    // },
    // // 监听 properties 接收的值的变化
    // 'question' (val) {
    //   console.log('observers-question', val)
    // },
    // // 监听对象
    // 'question' (val) {
    //   console.log('observers-question', val)
    // }
  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {},
    moved: function () {},
    detached: function () {},
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {},
    hide: function () {},
    resize: function () {},
  },
  /**
   * 组件的方法列表
   */
  methods: {
    showData() {
      for (let i = 0; i < this.data.titleArr.length; i++) { // 遍历分割的数组
        for (let j = 0; j < this.data.rightAnswerArray.length; j++) {
          if (this.data.titleArr[i] === '_') {
            this.data.inputMap.set(i, this.data.rightAnswerArray[j].name);
          }
        }
      }
      console.log("inputMap===========>", this.data.inputMap)
    },
    fnInput(e) {
      console.log("e=>", e)
      const value = e.detail.value;
      const index = e.currentTarget.dataset.value;
      let answerRes = '';
      this.data.inputMap.set(index, value);
      this.data.inputMap.forEach((value, key) => {
        answerRes += value + ','
      })
      answerRes = answerRes.substring(0, answerRes.length);
      let btnActive = {
        isBtnActive: true,
        answer: answerRes
      }
      this.triggerEvent('CompletionEvent', btnActive)
    }
  }
})