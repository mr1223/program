

//import { ajax } from './public.js';
import { accountIndex } from './path.js';

var WXcode = '';






const login = data => {
	
	
	return new Promise(function(resolve, reject){
		
		try {
			let data = {};
		  	let token = wx.getStorageSync('token');
		  	let info = wx.getStorageSync('info');
		  	data['token'] = token;
		  	data['info'] = info;
		  if (token) {
		     resolve(data);
		  }else{
		  	let getUserMessage = getUser();
			getUserMessage
			.then( res => {
				var options = {
		          code: WXcode,
		          iv: res.iv,
		          signature: res.signature,
		          encryptedData: res.encryptedData,
		          rawData: res.rawData,
		          userInfo: res.userInfo
		        }
            wx.request({
              url: accountIndex,
              method: 'post',
              data: options,
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success: function(res){
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
		          	}
              }
            })
		       
			})
			.catch( err => {
				
			})
		  }
		} catch (e) {
		  // Do something when catch error
		}
		
		
		
	})
	
}

const getUser = (data) => {
 	
 	let test = checkLogin();
	return new Promise(function (resolve, reject) {
		test
		.then( re => {
			checkScope({scope: 'scope.userInfo'})
			.then( res => {
				getLogin()
				.then(user)
				.then( ress => {
					resolve(ress);
				})
				.catch( errs => {
					reject(errs);
				})
			})
			.catch( err => {
				
        openSetting()
				.then(getLogin)
				.then(user)
				.then( ress => {
          
					resolve(ress);
				})
				.catch( errs => {
          
					reject(errs);
				})
			})
		})
		.catch( er => {
			
			getLogin()
			.then(user)
			.then( res => {
				resolve(res);
			})
			.catch( err => {
				showModal()
        .then(openSetting())
				.then(user)
				.then( ress => {
					resolve(ress);
				})
				.catch( errs => {
					reject(errs);
				})
			})
			
		})
		

	})
	
}



const checkLogin = data => {
	return new Promise(function (resolve, reject) {
		wx.checkSession({
	        success: res => {
	          resolve(res);
	        },
	        fail: err => {
	        	reject(err);
	        }
	  	})
	})
}
const getLogin = data => {
	return new Promise(function (resolve, reject) {
	    wx.login({
	      success: res => {
          
	      	WXcode = res['code']; 
	        resolve(res);
	      },
	      fail: err => {
         
	        reject(err);
	      }
	    })
	
	})
}
const checkScope = (data) => {
	
	return new Promise(function(resolve, reject){
		wx.getSetting({
		  	success: (res) => {
		  		
		  		if(res.authSetting[data.scope]){
		  			resolve(res);
		  		}else{
		  			reject(res);
		  		}
		   
		  	},
		  	fail: (err) => {
		  		
		  	}
		})
	})
	
}
const user = data => {
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
const showModal = (title, content) => {
  	var title = '提示';
  	var content = '请先去设置授权信息登录后再次尝试';

 
  	return new Promise(function (resolve, reject) {
	    wx.showModal({
	      	title: title,
	      	content: content,
	      	success: res => {
		        if (res.confirm) {
		          resolve(res);
		        }else{
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


const openSetting = () => {
  	return new Promise(function (resolve, reject) {
	    wx.openSetting({
	      	success: (res) => {
            
		        if (res.authSetting['scope.userInfo']){
		          resolve(res)
		        }else{
		          wx.showToast({
		            title: '您已了拒绝授权，暂时无法使用此功能',
		            icon: 'none',
		            duration: 2000
		          })
		        }
	      	},
	      	fail : err => {
		        wx.showToast({
		          title: '错误，请稍候或者退出小程序重试',
		          icon: 'none',
		          duration: 2000
		        })
	      	}
	    })
  	})
}




module.exports = {
	login: login,
	getUser: getUser,
	checkLogin: checkLogin,
	getLogin: getLogin,
	checkScope: checkScope,
	user: user,
	showModal: showModal,
	openSetting: openSetting
}









