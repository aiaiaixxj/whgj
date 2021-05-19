Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 父组件传过来的题目数据
    question: {
      type: String,
      observer: function (news, old, path) {
        const titleArr = news.split(''); // 将题目分割为数组
        let inputMap = new Map(); // 新建map
        for (let i = 0; i < titleArr.length; i++) { // 遍历分割的数组
          if (titleArr[i] === '@') {
            inputMap.set(i, ''); // 如果遇到下划线，就set进map里
          }
        }
        this.setData({
          titleArr,
          inputMap
        })
        // console.log("titleArr=>", this.data.titleArr)
        // console.log("inputMap=>", this.data.inputMap)
      }
    },
    testData: {
      type: Object,
      observer: function (news, old, path) {
        const titleArr = news.content.split(''); // 将题目分割为数组
        let inputMap = new Map(); // 新建map
        for (let i = 0; i < titleArr.length; i++) { // 遍历分割的数组
          if (titleArr[i] === '@') {
            inputMap.set(i, ''); // 如果遇到下划线，就set进map里
          }
        }
        this.setData({
          titleArr,
          inputMap
        })
        // console.log("titleArr=>", this.data.titleArr)
        // console.log("inputMap=>", this.data.inputMap)
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    titleArr: [], // 题目分割的数组
    inputMap: new Map(), // 新建map 存放用户输入的答案
    testData: []
  },
  observers:{
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

  /**
   * 组件的方法列表
   */
  methods: {
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