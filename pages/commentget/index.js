

import { ajax, clearLink } from '../../common/public.js';
import { dominImg, getToMyComment } from '../../common/path.js';
import { repalceUploads } from '../../common/reg.js'




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
  created: function () {
    ajax(getToMyComment, '')
      .then(data => {
        if (data.code == 1) {
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
  }
})







