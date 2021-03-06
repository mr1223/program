

import { ajax, clearLink,wxShare } from '../../common/public.js';
import { dominImg,getMyComment } from '../../common/path.js';
import { repalceUploads } from '../../common/reg.js'
import { ARTICLEID } from '../../common/consts.js';



  Page({
  
    /**
     * 页面的初始数据
     */
    data: {
      list: []
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.created();
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
    created: function(){
      ajax(getMyComment,'')
      .then(data => {
        if(data.code == 1){
          var getData = data.info;
            getData.forEach(function (element) {
            
              element['image'] = clearLink(repalceUploads, element['image'], dominImg);

            })
          this.setData({
            'list': getData
          })
        }
      })
      .catch(err => {

      })
    },
    goroute(e){
      let id = e.currentTarget.dataset.id;
      wx.setStorageSync(ARTICLEID, id);

      wx.navigateTo({
        url: '/pages/detail/index'
      })
    }
  })







