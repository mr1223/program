

import { checkLogin,getUser } from '../../common/login.js'; 

Component({
  properties: {
    status: {
      type: Boolean,
      value: false
    }
  },
  ready: function(){
    checkLogin()
    .then(data => {

    })
    .catch(err => {
      this.setData({
        status: true
      })
    })
  },
  methods: {
    checkloginHide: function(){
      this.setData({
        status: false
      })
    },
    getUserInfo: function(res){
      var data = res.detail;
      if (res.detail.errMsg == "getUserInfo:ok") {
        this.setData({
          status: false
        })
        data['status'] = 1
      } else
        if (res.detail.errMsg == "getUserInfo:fail auth deny") {
          data['status'] = -1
        }
      getUser(data);
     
    },
    sure: function (e) {
      
    },
    cancel: function(e){
      this.setData({
        status: false
      })
    }
  }
})










