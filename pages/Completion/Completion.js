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
       if(news.length==3){
        var answerNumArr = news[2].split(''); // 将答案个数提示分割为数组
        console.log("answerNumArr=>", answerNumArr)
       }
       
      
       
        const titleArr = news[0].split(''); // 将题目分割为数组
        let myarray = []
        let myanswerData = []
        let inputMap = new Map(); // 新建map
       
        let index = 0;
        if (typeof (news[1]) != 'object' && news.length==3) {
          let myanswer = news[1].split(''); // 将题目分割为数组
          for (let i = 0; i < myanswer.length; i++) {
            if (myanswer[i] !== ",") {
              myanswerData.push(myanswer[i])
            }
          }
          console.log("myanswerData=>>>", myanswerData)
          console.log("myanswer=>>>", myanswer)
          for (let i = 0; i < answerNumArr.length; i++) {
            if (answerNumArr[i] !== "@") {
              if(news[1]===""){
                 myanswerData =[]
              }
              else{
                myanswerData.splice(i, 0, answerNumArr[i])
              }                   
            }
            else{           
            }
          }
          console.log("myanswerData=>>>", myanswerData)
         // console.log("answerNumArr=>", answerNumArr)
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
              if (myarray[i] === " ") {
                myarray.splice(i, 1, "")
              } else {
                myarray.splice(i, 1, myanswerData[index])
              }
              index++;
              this.setData({
                inputs: index
              })
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
          myanswerData,
          answerNumArr,
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
    myanswerData: [],
    answerNumArr: [], //答案提示分割数组
    titleArr: [], // 题目分割的数组
    inputMap: new Map(), // 新建map 存放用户输入的答案
    testData: [],
    rightAnswerArray: [],
    rightAnswer: [],
    canshowAnswer: false,
    myarray: '',
    NewMyanswer: [],
    // 是否获取焦点
    focus: false,
    // 需要获取焦点的序号
    focusIndex: 0,
    inputs: 0
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
    // 输入完成事件
    confirmListener(event) {
      console.log("输入完成事件")
      let currentIndex = event.currentTarget.dataset.categoryIndex
      if (currentIndex < this.data.inputs - 1) {
        this.setData({
          focus: true,
          focusIndex: currentIndex + 1
        })
      } else {
        this.setData({
          focus: false
        })
      }
    },
    fnInput(e) {
      console.log("e=>", e)
      const value = e.detail.value;
      const index = e.currentTarget.dataset.value;
      let currentIndex = e.currentTarget.dataset.categoryIndex
      // if (this.focusIndex != currentIndex) {
      //   this.setData({
      //     focusIndex: currentIndex
      //   })
      // }
      let answerRes = "";
      this.data.inputMap.set(index, value);
      console.log("inputMap=>>>>", this.data.inputMap)
      if (value === "") {
        console.log("没有内容")
        this.data.answerNumArr.splice(index, 1, " ")
        console.log("  this.data.answerNumArr=>>>>",   this.data.answerNumArr)
      }
      if (value) {
        console.log("有内容")
        this.data.answerNumArr.splice(index, 1, value)
      } else {
        this.data.answerNumArr.splice(index, 1, "")
      }

      console.log("this.data.answerNumArr=>-----", this.data.answerNumArr)
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
      for (let i = 0; i < this.data.answerNumArr.length; i++) {
        // if (this.data.answerNumArr[i] !== "" && this.data.answerNumArr[i] !== undefined) {
        //   answerArray.push(this.data.answerNumArr[i])
        // } else if (this.data.answerNumArr[i] === undefined || this.data.answerNumArr[i] === "-") {
        //   console.log("没填")
        //   answerArray.splice(i, 1, "@")
        // }

        if(this.data.answerNumArr[i]==="@"){
          answerArray.push(" ")
        }
        
        else if (this.data.answerNumArr[i] === undefined){
          answerArray.push(" ")
        }
        else{
          answerArray.push(this.data.answerNumArr[i])
        }
      }
      console.log("answerArray=>", answerArray)
      let handleAnswerArray = []
      for (let i = 0; i < answerArray.length; i++) {
        if (answerArray[i] === '、') {
          answerArray.splice(i, 1)
        }
        if (answerArray[i] === '@') {
          handleAnswerArray.push(" ")
        } else {
          handleAnswerArray.push(answerArray[i])
        }
      }
      console.log("handleAnswerArray=>", handleAnswerArray)
      console.log("myanswerData=>>>",this.data.myanswerData)
      let handleMyanswerData =[]
      for(let i = 0; i < this.data.myanswerData.length; i++){
            if(this.data.myanswerData[i]!=="、"){
              handleMyanswerData.push(this.data.myanswerData[i])
            }
      }
      for(let i = 0; i < handleAnswerArray.length; i++){
              if(handleAnswerArray[i]==" "){
                if(handleMyanswerData.length!=0){
                  handleAnswerArray.splice(i,1,handleMyanswerData[i])
                }
               
              }
              else{
                // handleAnswerArray.splice(i,1," ")
              }
      }
      console.log("handleMyanswerData=>",handleMyanswerData)
      console.log("handleAnswerArray=>",handleAnswerArray)
      for (let i = 0; i < handleAnswerArray.length; i++) {
        if(handleAnswerArray[i]===""){
          handleAnswerArray.splice(i,1," ")
        }
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

      if (currentIndex < 999) {
        console.log("this.data.inputs=>", this.data.inputs)
        this.setData({
          focus: true,
          focusIndex: currentIndex + 1
        })
      } else {
        console.log("this.data.inputs=>", this.data.inputs)
        this.setData({
          focus: false
        })
      }
      this.triggerEvent('CompletionEvent', btnActive)

    }
  }
})