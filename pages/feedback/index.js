
import { ajax, wxShowToast,wxShare } from '../../common/public.js';
import { addFeedback } from '../../common/path.js';


Page({

  /**
   * 页面的初始数据
   */
  data: {
    textarea: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  onShareAppMessage: (res) => {
    const share = wxShare();
    return share;
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
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  textareaChange: function(e){
    this.setData({
      textarea: e.detail.value
    })
  },
  save: function(e){
    let content = this.data.textarea;
    let data = {
      content: content
    }
    ajax(addFeedback, '', data)
    .then(data => {
        if(data.code == 1){
          wxShowToast('您的反馈我们已经收到，将会在24小时内联系您，感谢您宝贵的意见!');
          this.setData({
            textarea: ""
          })
        }else{
          wxShowToast('提交失败!');
        }
    })
    .catch(err => {
          wxShowToast('网络原因，提交失败!');
    })
  }
})

