//index.js
//获取应用实例
const app = getApp()
import { wxShare } from '../../common/public.js';
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgUrls: [
    'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    indicatorActiveColor: "#fff",
    list: {
      content: [
        {
          id: 1,
          title: "管道",
          icon: "",
          chren: [
            {
              id: 1,
              name: "列表列表列表",
            },
            {
              id: 2,
              name: "列表2",
            },
            {
              id: 3,
              name: "列表3",
            },
            {
              id: 4,
              name: "列表4",
            },
            {
              id: 5,
              name: "列表5",
            },
            {
              id: 6,
              name: "列表6",
            },
          ]
        },
        {
          id: 2,
          title: "管道1",
          icon: "",
          chren: [
            {
              id: 1,
              name: "列表3",
            },
            {
              id: 2,
              name: "列表4",
            },
          ]
        },
      ]
    }
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onShareAppMessage: (res) => {
    const share = wxShare();
    return share;
  },
  getUserInfo: function(e) {
  
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
