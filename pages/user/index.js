

import { wxPromisify,wxShare } from '../../common/public.js';

Page({
  data: {
    userInfo: {},
    defaultSize: 'default',
    primarySize: 'default',
    warnSize: 'default',
    disabled: false,
    plain: false,
    loading: false,
    list: [
      {
        name: "我的帖子",
        status: true,
        active: '',
        path: '/pages/stick/index'       
      },
      {
        name: "我发出的评论",
        status: true,
        active: '',
        path: '/pages/commentsend/index'
      },
      {
        name: "我收到的评论",
        status: true,
        active: '',
        path: '/pages/commentget/index'
      },
      {
        name: "关于我们",
        status: true,
        active: '',
        path: '/pages/myInfo/index'
      },
      {
        name: "意见反馈",
        status: true,
        active: 'myInfo-active',
        path: '/pages/feedback/index'
      }
    ]
  },
  onLoad: function () {
  
    let getStorage = wxPromisify(wx.getStorage);
    getStorage({ key: 'info' })
    .then( res => {
      let userInfo = res.data;
      this.setData({
        userInfo: userInfo
      })
    })
    .catch( err => {
      wx.showToast({
        title: '获取个人信息失败',
        icon: 'none',
        duration: 2000
      })
    })

  },
  onShareAppMessage: (res) => {
    const share = wxShare();
    return share;
  },
  goRoute: function(e){
    const index = e.currentTarget.dataset.index;
    const urls = this.data.list[index]['path'];
    wx.navigateTo({
      url: urls,
    })
  }
})