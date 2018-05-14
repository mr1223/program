import { accountIndex } from './path.js';
import regeneratorRuntime from './regenerator-runtime.js'
import { openSetting, showModal, wxShowToast } from '../common/public.js'
import to from '../common/to.js';



const checkLogin = data => {
  return new Promise(function (resolve, reject) {
    try {
      let data = {};
      let token = wx.getStorageSync('token');
      let info = wx.getStorageSync('info');
      data['token'] = token;
      data['info'] = info;
      if (token) {
        resolve(data);
      } else {
        reject(data);
      }

    }catch(e) {

    }
  })
}


const Login =  data => {
  
  return new Promise(function (resolve, reject) {
    wx.login({
      success: res => {
        resolve(res);
      },
      fail: err => {
        reject(err);
      }
    })
  })
}
const getUserMessage = data => {
  return new Promise((resolve, reject) => {
  
    onTapSubmitButton(tests)
    
    function tests(err, suc) {
      
      if (err.status == 1) {
          
      } else
      if (err.status == 2) {
        
          
      } else
      if (err.status == 3) {
        err = {
          'status': 1
        }
      
        reject(err)
      }
      if (suc){
        resolve(suc);
      }
    }
  })
}

const onTapSubmitButton = async (cb,data) => {
    let err, user, savedTask,sendData;
    [err, user] = await to(Login());
    if (!user) return cb({ 'status': 1 });
    data['errMsg'] = '';
    data['code'] = user['code'];
    [err, sendData] = await to(sendCode(data));
    if(err) return cb({'status': 2});
    cb({ 'status': 3 }, sendData);
}


const sendCode = (data) => {
  return new Promise((resolve, reject) =>{
    wx.request({
      url: accountIndex,
      method: 'post',
      data: data,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data.code == 1) {
          wx.setStorage({
            key: "session_id",
            data: 'session_id=' + res.data.info.session_id
          })
          wx.setStorage({
            key: "token",
            data: res.data.info.token
          })
          wx.setStorage({
            key: "info",
            data: res.data.info
          })
          resolve(res.data);
        }else{
          reject(res);
        }
      },
      fail: err => {
       
        reject(err);
      }
    })
  })
}

const getUser = (data) => {
  if(data.status == 1){
    onTapSubmitButton(tests, data)

    function tests(err, suc) {

      if (err.status == 1) {

      } else
      if (err.status == 2) {

      } else
      if (err.status == 3) {
        
      }
      if (suc) {
        
      }
    }
  }else
  if(data.status == -1){
    wxShowToast('您已经拒绝授权，请重新点击获取授权信息');
  }
}







module.exports = {
  onTapSubmitButton: onTapSubmitButton,
  sendCode: sendCode,
  Login: Login,
  getUserMessage: getUserMessage,
  checkLogin: checkLogin,
  getUser: getUser
}










