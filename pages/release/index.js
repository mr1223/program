

import { ARTICLEID } from '../../common/consts.js';
import { addStick } from '../../common/path.js';
import { getArrsort } from '../../common/getData.js';
import { wxPromisify, wxShowToast, wxGetLocation, ajax, wxUploadImg,wxShare } from '../../common/public.js';



Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    title: '',
    phone: '',
    indexs: 0,
    array: [
      {
        id: 1,
        name: "选择一"
      },
      {
        id: 2,
        name: "选择二"
      },
    ],
    imageList: [
      //'http://frozen.tigermai.cn/Uploads/2018-04-06/5ac77af270111.jpg'
      // {
      //   path: 'http://frozen.tigermai.cn/Uploads/2018-04-06/5ac77af270111.jpg'
      // }
    ],
    location: {
      latitude: '',
      longitude: '',
      name: '',
      address: '',
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getArrsort()
    .then(data => {
   
      this.setData({
        array: data.info
      })
      
    })
    .catch(data => {
      
    })
  },
  onShareAppMessage: (res) => {
    const share = wxShare();
    return share;
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }, 
  bindPickerChange: function(e){
    var vaule = e.detail.value;
      this.setData({
        indexs: vaule
      })
  },
  inputTitle: function(e){
    this.setData({
      title: e.detail.value
    })
  },
  inputPhone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  textareaChange: function(e){
    this.setData({
      textareaValue: e.detail.value
    })
  },
  addImages: function(e){
    let chooseImages = wxPromisify(wx.chooseImage);
    chooseImages()
    .then((res) => {
      let path = [];
      if (res.tempFilePaths){
        let tempFilePaths = res.tempFilePaths;
        this.setData({
          imageList: tempFilePaths
        })
      }else{
        wxShowToast('请选择要上传的图片');
      }

    })
    .catch(err => {
      wxShowToast('取消上传');
    })
  },
  getPosition: function(e){

    wxGetLocation()
    .then( res => {
      this.setData({
        location: res
      })
      
    })
    .catch( err => {
      this.getPosition.apply(this.getPosition);
    })
  },
  save: function(){

    if (this.data.imageList){
      wxUploadImg(this.data.imageList)
      .then( res => {
        var tid = this.data.array[this.data.indexs]['id'];
        var imgList = res.length > 0 ? res.join() : '';
        var data = {
            'id': this.data.id,
            'utype': 1,
            'tid': tid,
            'title': this.data.title,
            'phone': this.data.phone,
            'image': res[0],
            'content': this.data.textareaValue,
            'imagesList': imgList,
            'latitude': this.data.location.latitude,
            'longitude': this.data.location.longitude,
            'address_name': this.data.location.name,
            'address': this.data.location.address,
        }  
       
        ajax(addStick,'post',data)
        .then(data => {
         
            if (data.code == 1){
             this.setData({
               title: '',
               phone: '',
               textareaValue: '',
               'location.latitude': '',
               'location.longitude': '',
              'location. name': '',
               'location.address': '',
               imageList: ''
             })
              let id = data.info;
              try {
                wx.setStorageSync(ARTICLEID, id);
                wx.navigateTo({
                  url: '/pages/detail/index'
                })
              } catch (e) {
                
              }
            }
        })
        .catch( err => {
         
        })
        
      })
      .catch( err => {
        
      })
    }
  }
})




