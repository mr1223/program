import { accountIndex } from './path.js';
import regeneratorRuntime from './regenerator-runtime.js'
import { openSetting,showModal } from '../common/public.js'
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
        getUserMessage()
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        })
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
          showModal()
            .then(res => {
              openSetting('scope.userInfo')
              .then(res => {
                reject(res);
              })
            })
            .catch( err => {
            })
            
        } else
        if (err.status == 3) {
          err = {
            'status': 1
          }
          reject(res)
        }
      if (suc){
        resolve(suc);
      }
    }
  })
}

const onTapSubmitButton = async (cb) => {
    let err, user, savedTask,sendData;
    [err, user] = await to(Login());
    if (!user) return cb({ 'status': 1 });
    [err, savedTask] = await to(getUserInfos());
    if (!savedTask) return cb({ 'status': 2 });
    savedTask['code'] = user['code'];
    [err, sendData] = await to(sendCode(savedTask));
    if(err) return cb({'status': 3});
    cb({ 'status': 0 }, sendData);
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

const getUserInfos = (data) => {
  return new Promise(function (resolve, reject) {
    
    wx.getUserInfo({
      withCredentials: true,
      lang: "zh_CN",
      success: res => {
        resolve(res);
      },
      fail: err => {
        reject(err);
      }
    })
  })
  
}







module.exports = {
  onTapSubmitButton: onTapSubmitButton,
  sendCode: sendCode,
  Login: Login,
  getUserMessage: getUserMessage,
  checkLogin: checkLogin
}










