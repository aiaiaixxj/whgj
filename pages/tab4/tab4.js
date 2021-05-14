Page({

  /**
     * 页面的初始数据
     */
    data: {
      question: {
        content: '坚定文化自信，是事关国运兴衰，事关文化安全、事关民族精神独立性的大问题。坚定中国特色社会主义_、_、_，说到底就是要坚定文化自信。讲文化自信，我们有充足的理由和充足的底气，因为中国特色社会主义文化_、_、_、_',
        title: '填空题',
        score: 10,
        answer: '道路自信;理论自信;制度自信;源自于博大精深的中华优秀传统文化;承继于激昂向上的革命文化;熔铸于生机勃勃的社会主义先进文化;植根于中国特色社会主义伟大实践'
      }, // 从后台获取的题目信息
      isBtnActive: false,
      answer: '', // 回答的答案
      isShowNext: false // 确定按钮和下一题按钮的显示隐藏控制
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
     console.log("options=>",options)
    },
    /**
     * 接收填空题组件的值来控制按钮isactive
     * @param {*} e 
     */
    fnGetChildParamEvent: function(e) {
      console.log("e=>",e)
      // isBtnActive 为true，按钮激活； answer为用户输入的答案
      const {isBtnActive,answer} = e.detail;
      this.setData({
        isBtnActive,
        answer
      });
    } ,
     /**
     * 点击确定，调后台接口保存用户答题的答案
     * @param {*} e 
     */
    fnSave: function(e) {
      if(!this.data.isBtnActive) { return false;}
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
    fnToNext: function() {}
    
  })