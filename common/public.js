

import regeneratorRuntime from './regenerator-runtime.js'
import { login } from './user.js';
import { accountIndex, uploadImg } from './path.js';
import { img_select } from './reg.js'; 
/*
 ajax
 * */
const ajax = (url,method,data) => {
  return new Promise(function (resolve, reject){
    var session_id = '';
    let WXajax = wxPromisify(wx.request);
    session_id = wx.getStorageSync('session_id');
      WXajax({
        url: url,
        method: method,
        data: data,
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'Cookie': session_id
        },
      })
      .then(res => {

        if (res.data.code == 3) {

          wx.setStorage({
            key: "token",
            data: ''
          })
          login().then(res => {

            console.log(res);
          })
        .catch(err => {
          console.log(err);

        })
        } else {
          resolve(res.data);
        }

      })
      .catch(err => {
        reject(err);
      })
    
    
  })
}

/*
 加上链接
 * */

const clearLink = (link, content, deep) => {
  var str = '';
  if (deep) {
    str = content.replace(link, deep);
  } else {
    str = content.replace(link, '');
  }
  return str;
}
/*
 图片设置width样式
 * */
const addStyleImage = (content) => {
  var str = content.replace(img_select, '<img style="max-width:100%;"');
  return str;
}

/*
 promise解决wechat小程序异步回调
 * */
const wxPromisify = (Fn) => {
  return function (obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function (res) {
        resolve(res)
      }
      obj.fail = function (err) {
        reject(err)
      }
      Fn(obj)//执行函数，obj为传入函数的参数
    })
  }
}
/*
 提示
 * */
const wxShowToast = (title,icon) => {
  var icon = icon ? icon : 'none';
  wx.showToast({
    title: title,
    icon: icon
  })
}
/*
 微信权限验证
 * */

const checkScope = async data => {

  try{
    let scope = await getScope();
  
    return scope;
  }catch(e){

  }

}
/*
 微信权限验证
 * */
const getSett = (scope) => {
  return new Promise((resolve, reject) => {
    if (!data[scope]) {
      wx.authorize({
        scope: scope,
        success: res => {
          resolve(res)
        },
        fail: err => {
          reject(err);
        }
      })
    }
  })
  
}
/*
 微信权限设置-获取  
 如果权限设置获取成功  并存在某个权限  则直接让用户发起授权   
 * */
const getScope = data => {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: res => {
        resolve(res);
      },
      fail: err => {

      }
    })
  })
}
/*
 打开权限设置
 * */
const openSetting = (scope) => {
  return new Promise(function (resolve, reject) {
    wx.openSetting({
      success: (res) => {
        console.log();
        if (res.authSetting[scope]) {
          resolve(res)
        } else {
          wx.showToast({
            title: '您已了拒绝授权，暂时无法使用此功能',
            icon: 'none',
            duration: 2000
          })

        }

      },
      fail: err => {
        wx.showToast({
          title: '错误，请稍候或者退出小程序重试',
          icon: 'none',
          duration: 2000
        })
      }
    })
  })
}

/*
 confim 
 * */
const showModal = (title, content) => {
  var title = title ? title : '提示';
  var content = content ? content : '请先去设置授权信息登录后再次尝试';


  return new Promise(function (resolve, reject) {
    wx.showModal({
      title: title,
      content: content,
      success: res => {

        if (res.confirm) {
          resolve(res);
        } else {
          reject(res);
        }
      },
      fail: err => {
        wx.showToast({
          title: '错误，请稍候或者退出小程序重试',
          icon: 'none',
          duration: 2000
        })
      }
    })
  })

}
/*
  获取地理位置的api
*/
const wxGetLocation = data => {
  return new Promise((resolve, reject) => {
    wx.chooseLocation({
      type: 'wgs84', //返回可以用于wx.openLocation的经纬度
      success: res => {
        resolve(res);
      },
      fail: err => {
        openSetting('scope.userLocation')
        .then(res => {
          reject(res);
        })
        .catch( err => {

        })
        
      }
    })
  })
}
//图片上传
const wxUploadImg = data => {
  let count = 0;
  let imgLength = data.length;
  let arr = [];
  return new Promise((resolve, reject) => {
    if (data.length < 1){
      resolve(arr);
      return;
    }
    function upload(){
      wxUploadFile(data[count])
      .then(res => {
        let resData = JSON.parse(res.data);
        if (resData.code == 1) {
          imgLength--;
          count++;
          arr.push(resData.path);
          if (imgLength != 0){
            upload(data[count]);
          }else{
            resolve(arr);
          }
          
        }
      })
      .catch(err => {

      })
    }
    upload();
  })
  
  
}

const wxUploadFile = (path,url,name) => {
  var url = url ? url : uploadImg;
  var name = name ? name : 'files';
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: url, //仅为示例，非真实的接口地址
      filePath: path,
      name: name,
      success: res => {
        resolve(res);
      },
      fail: err => {
        reject(err);
      }
    })
  })
}


const wxShare = (title,path,imageUrl) => {
  
  var title = title ? title : '天通圈子';
  var path = path ? path : '/pages/index/index';
  var imageUrl = imageUrl ? imageUrl : '';
  return {
    title: title,
    path: path,
    imageUrl: imageUrl,
    success: function (res) {
      // 转发成功
      if (res.errMsg == 'shareAppMessage:ok'){
        wxShowToast('分享成功');
      }
      console.log(res);
      
    },
    fail: function (err) {
      // 转发失败
      if (err.errMsg == 'shareAppMessage:fail cancel'){
        wxShowToast('取消分享');
      }else
        if (err.errMsg == 'shareAppMessage:fail') {
        wxShowToast('分享失败');
      }
    }
  }
  
}
const trigSpace = (str) => {
  return str.replace(/^\s+|\s+$/gi, "");
}
module.exports = {
  clearLink: clearLink,
  ajax: ajax,
  addStyleImage: addStyleImage,
  wxPromisify: wxPromisify,
  wxShowToast: wxShowToast,
  openSetting: openSetting,
  showModal: showModal,
  getScope: getScope,
  checkScope: checkScope,
  wxGetLocation: wxGetLocation,
  wxUploadFile: wxUploadFile,
  wxUploadImg: wxUploadImg,
  wxShare: wxShare,
  trigSpace: trigSpace,
}

