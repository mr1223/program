//index.js
//获取应用实例
const app = getApp()
console.log(app);
import { dominImg, accountIndex, getCarouselList, getIndexNewBar, getIndexNewList, repalceImgPublic, dominImgPublic, getMessage} from '../../common/path.js';
import { clearLink, ajax, wxPromisify, checkScope, wxShare  } from '../../common/public.js';
import { getUserMessage, getUser} from '../../common/login.js' //
import { getArrsort } from '../../common/getData.js'
import { repalceUploads, img_selects } from '../../common/reg.js'
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    page: 1,
    num: 10,
    statusPullDowan: true,
    place: "输入要搜索内容",
    searchActive: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgUrls: [ ],
    cardList: {
      content: []
    },
    comment: [],
    barList: {
      content: []
    },
    navList: [

    ],
    trumpet: '',
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    indicatorActiveColor: "#fff"
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {

    this.getCarousList();
    this.getArrost();
    this.getNewBar();
    this.getNewList();
    this.getTrumpet();
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
  onPullDownRefresh: function () {
    wx.startPullDownRefresh({
      success: () => {
          if(this.data.statusPullDowan){
            this.NewList();
            this.setData({
              statusPullDowan: false
            })
          }
      },
      fail: ()  => {
        wx.stopPullDownRefresh()
      }
    })
    wx.stopPullDownRefresh()
  },
  onReachBottom: function () {
    this.NewList();
  },
  getCarousList: function(){

    ajax(getCarouselList, 'get').then(data => {
      if (data.code == 1) {
        var imgUrls = [];
        var getData = data.info;
        getData.forEach(function (element) {
          element['image_src'] = clearLink(repalceUploads, element['image_src'], dominImg);
          imgUrls.push(element['image_src']);
        })
        this.setData({
          imgUrls: imgUrls
        })
      }
    })
    .catch(err => {
      console.log(err);
    })
    
  },
  getArrost: function(){
    getArrsort()
    .then( data => {
     
        this.setData({
          navList: data.list
        })
    })
    .catch( data => {
      console.log(data);
    })
  },
  getNewBar: function(){
    let data = {
      'page': 1,
      'num': 10
    }
    ajax(getIndexNewBar,'get',data).then( data => {
        if(data.code == 1){
          var getData = data.info;
          getData.forEach(function (element) {
            if (parseInt(element['utype']) == 1) {
              element['userimage'] = element['avatarurl'];
              element['user'] = element['nickname'];
            }else
            if (parseInt(element['utype']) == 2){
              element['userimage'] = clearLink(repalceImgPublic, element['userimage'], dominImgPublic);
              element['user'] = element['username'];
            }
            element['image'] = clearLink(repalceUploads, element['image'], dominImg);
            element['content'] = clearLink(repalceUploads, element['content'], dominImg);
            element['content'] = clearLink(img_selects, element['content'], '');
           
          })
          
          this.setData({
            "barList.content": getData
          })
          
        }
    })
    .catch( err => {
        console.log(err);
    })
    
  },
  getNewList: function () {
    this.NewList();
  },
  NewList: function(){
    let data = {
      'page': this.data.page,
      'num': this.data.num
    }
    ajax(getIndexNewList, 'post', data).then(data => {
      if (!this.data.statusPullDowan){
          this.setData({
            statusPullDowan: true
          })
      }
      if (data.code == 1) {
        var getData = data.info;
        getData.forEach(function (element) {
          if (parseInt(element['utype']) == 1) {
            element['userimage'] = element['avatarurl'];
            element['user'] = element['nickname'];
          } else
          if (parseInt(element['utype']) == 2) {
            element['userimage'] = clearLink(repalceImgPublic, element['userimage'], dominImgPublic);
            element['user'] = element['username'];
          }
          element['image'] = clearLink(repalceUploads, element['image'], dominImg);
          element['content'] = clearLink(repalceUploads, element['content'], dominImg);
          element['content'] = clearLink(img_selects, element['content'], '');
         
        })
        var lists = getData;
        if (this.data.page > 1) {
          lists = this.data.cardList.content.concat(getData);
        }
        let page = this.data.page + 1;
        this.setData({
          "page": page,
          "cardList.content": lists
        })

      }
    })
    .catch(err => {
      console.log(err);
    })
  },
  getUserMessage: function(){
    // checkScope('scope.userLocation')
    // .then(res => {
    //     console.log(res);
    // })
    // .catch(err => {
    //   console.log(err);
    // })
    // return;
    getUserMessage()
    .then(res => {
     
      // if (res.status == -1){
      //     this.getUserMessage.apply(this.getUserMessage);
      //   }else{
      //     console.log(res);
      //   }
    })
    .catch(err => {
      
      this.getUserMessage.apply(this.getUserMessage);
    })
  
  },
  getUserInfo: function(e) {
 
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getTrumpet: function(e){
    ajax(getMessage)
    .then(data => {
        if(data.code == 1){
          this.setData({
            trumpet: data.info.content
          })
        }
    })
    .catch(err => {

    })
  }
  // onPageScroll: function(e){
  //   if (e.scrollTop > 110){
  //     this.setData({
  //       searchActive: true
  //     })
  //   }else{
  //     this.setData({
  //       searchActive: false
  //     })
  //   }
    
  // }
})
