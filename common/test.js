import regeneratorRuntime from './regenerator-runtime.js';

const authorize = (setting) => () => {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: (response) => {
        if (response.authSetting[setting]) {
          resolve(true)
        }

        wx.authorize({
          scope: setting,
          success: () => {
            resolve(true)
          },
          fail: () => {
            reject(false)
          }
        })
      }
    })
  })
}


async function test() {
  console.log('eee');
  try {
    await authUserInfo()
    console.log('yes')
  } catch (error) {
    console.log('no')
  }
}

const tg = data => {
  
    console.log('ddd');
 
}
