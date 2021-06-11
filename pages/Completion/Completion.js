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
        let myarray = []
        let myanswerData = []
        let inputMap = new Map(); // 新建map
        let index = 0;
        if (typeof (news[1]) != 'object'){

       
        let myanswer = news[1].split(''); // 将题目分割为数组
        for (let i = 0; i < myanswer.length; i++) {
          if (myanswer[i] !== ",") {
            myanswerData.push(myanswer[i])
          }
        }
        console.log("myanswer=>>>", myanswer)
       
        for (let i = 0; i < titleArr.length; i++) {
          if (titleArr[i] !== '@') {
            myarray.push(
              ''
            )
          }
          if (titleArr[i] === '@') {
            myarray.push(
              ''
            )
          }
        }
        for (let i = 0; i < titleArr.length; i++) { // 遍历分割的数组
          if (titleArr[i] === '@') {
            inputMap.set(i, ''); // 如果遇到下划线，就set进map里
            if(myarray[i]===" "){
              myarray.splice(i, 1,"")
            }
            else{
              myarray.splice(i, 1, myanswerData[index])
            }
            index++;
          }
        }
        console.log("myarray=>", myarray)

      }


        // console.log("typeof(news[1])=>>>>", typeof (news[1]))
        // if (typeof (news[1]) != 'object') {
        //   let myanswer = news[1].split(''); // 将题目分割为数组
        //   let NewMyanswer = [];
        //   for (let i = 0; i < myanswer.length; i++) {
        //     if (myanswer[i] === '-') {
        //       NewMyanswer.push(myanswer[i])
        //     } else if (myanswer[i] === ',') {

        //     } else if (myanswer[i] !== ',' && myanswer[i] !== '-') {
        //       NewMyanswer.push(myanswer[i])
        //     }
        //   }
        //   console.log("NewMyanswer=>>>>", NewMyanswer)
        //   this.setData({
        //     NewMyanswer
        //   })
        //   for (let i = 0; i < myarray.length; i++) {
        //     if (myarray[i] === '') {
        //       console.log("i", i)
        //       for (let j = 0; j < NewMyanswer.length; j++) {
        //         // console.log("i++", i++)
        //         console.log("j", j)
        //         console.log("NewMyanswer[j]", NewMyanswer[j])
        //         myarray.splice(i++, 1, NewMyanswer[j])
        //         // myarray[i] = NewMyanswer[j]
        //         // console.log("myarray=>", myarray)
        //       }
        //     }
        //   }
        //   console.log("myarray=>", myarray)
        // }
        this.setData({
          myarray,
          titleArr,
          inputMap,
          rightAnswerArray: news[1],
        })
        var rightAnswer = []
        if (typeof (news[1]) == 'object') {
          for (let i = 0; i < news[1].length; i++) {
            rightAnswer.push(news[1][i].name);
          }
          this.setData({
            rightAnswer,
            canshowAnswer: true
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
    canshowAnswer: false,
    myarray: '',
    NewMyanswer: []
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
      console.log("inputMap=>>>>", this.data.inputMap)
      if (value === '') {
        this.data.myarray.splice(index, 1, "-")
      } else if (value) {
        this.data.myarray.splice(index, 1, value)
      } else {
        this.data.myarray.splice(index, 1, "-")
      }

      console.log("this.data.myarray=>-----", this.data.myarray)
      // this.data.inputMap.forEach((value, key) => {
      //   if (value == '') {
      //     console.log("NewMyanswer=>-----", this.data.NewMyanswer)
      //     // for(let i = 0; i < this.data.NewMyanswer.length; i++){
      //     //     console.log("this.data.NewMyanswer=>",this.data.NewMyanswer[i])
      //     // }
      //     answerRes += "-" + ','
      //   } else {
      //     answerRes += value + ','
      //   }
      // })
      let answerArray = []
      for (let i = 0; i < this.data.myarray.length; i++) {
        if (this.data.myarray[i] !== "" && this.data.myarray[i] !== undefined) {
          answerArray.splice(i,1,this.data.myarray[i])
        }
        else if (this.data.myarray[i] === undefined||this.data.myarray[i] === "-") {
          console.log("没填")
          answerArray.splice(i, 1, "@")
        }
        // else if (this.data.myarray[i] === "-") {
        //   console.log("没填")
        //   answerArray.splice(i, 1, "")
        // }
      }
      console.log("answerArray=>", answerArray)
      let handleAnswerArray =[]
      for(let i = 0; i < answerArray.length; i++){
            if(answerArray[i]==='-'){
              handleAnswerArray.push(" ")
            }
            if(answerArray[i]==='@'){
              handleAnswerArray.push(" ")
            }
            else{
              handleAnswerArray.push(answerArray[i])
            }
      }
      for (let i = 0; i < handleAnswerArray.length; i++) {
        answerRes += handleAnswerArray[i] + ','
      }
      // answerRes = answerRes.substring(0, answerRes.length);
      console.log("answerRes=>", answerRes)
      // let a = answerRes.split('')
      // console.log("a===>", a)
      let btnActive = {
        isBtnActive: true,
        answer: answerRes
      }
      this.triggerEvent('CompletionEvent', btnActive)
    }
  }
})