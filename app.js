//app.js
// var aldstat = require('./utils/ald-stat.js');
const consts = require('/common/consts.js');

App({
  onLaunch: function () {
    wx.setStorage({
      key: consts.NAVINDEX,
      data: 0
    })


    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    
    

    
    // 获取用户信息
    
  },
  globalData: {
    userInfo: null,
    loginStatus: true
  },
 
  sendCode: (data) =>{
    console.log(data);
  }
})