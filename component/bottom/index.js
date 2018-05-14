

const app = getApp();

const consts = require('../../common/consts.js');
import { ajax, wxPromisify } from '../../common/public.js';
import { checkLogin, getUserMessage } from '../../common/login.js'

Component({
  data: {
    list: [
      {
        name: "首页",
        url: "/pages/index/index",
        icon: "icon-home",
        active: false,
        openStatus: true,
        checkLogin: false,
      },
      // {
      //   name: "附近",
      //   url: "/pages/nearby/index",
      //   icon: "icon-nearby",
      //   active: false,
      //   openStatus: false,
      //   checkLogin: true,
      // },
      {
        name: "发布",
        url: "/pages/release/index",
        icon: "icon-release",
        center: true,
        active: false,
        openStatus: true,
        checkLogin: true,
      },
      // {
      //   name: "邻居",
      //   url: "/pages/index/index",
      //   icon: "icon-linju",
      //   active: false,
      //   openStatus: false,
      //   checkLogin: true,
      // },
      {
        name: "我的",
        url: "/pages/user/index",
        icon: "icon-user",
        active: false,
        openStatus: true,
        checkLogin: true,
      }
    ]
  },
  attached: function () {
   
    try {
      var value = wx.getStorageSync(consts.NAVINDEX);
      
      if (value == '') {
        value = 0;
        wx.setStorage({
          key: consts.NAVINDEX,
          data: 0
        })
        // Do something with return value
      }
      
      var changData = "list[" + value + "].active";
     
      this.setData({
        [changData]: true
      })
     // this.data.list[value]['active'] = true;
    } catch (e) {
      // Do something when catch error
    }

  },
  methods: {
    goRoute: function(e){
      this.setData({
        checkStatus: true
      })
      var title = '此类目暂未开放，我们正在努力中哦....';
      
      const index = e.currentTarget.dataset.index;
      const urls = this.data.list[index]['url'];
     
      if (this.data.list[index]['openStatus']){

        
        checkLogin().then(res => {
         
          this.route(urls, index);
        })
        .catch(err => {
      
          this.goRoute.apply(checkLogin);

        })


        

      }else{
        wx.showToast({
          title: title,
          icon: 'none',
          duration: 2000
        })
      }

    },
    route(urls, index) {
      wx.setStorage({
        key: consts.NAVINDEX,
        data: index
      })
      wx.reLaunch({
        url: urls,
      })
    },
  }
  
})



