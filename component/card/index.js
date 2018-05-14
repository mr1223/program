


import { ARTICLEID } from '../../common/consts.js';
Component({
  data: {

  },
  properties: {
    list: {
      type: Object,
      value: {}
    }
  },
  methods: {
    goRoute(e){
      let id = e.currentTarget.dataset.id;
      
      try {
        wx.setStorageSync(ARTICLEID, id);
        
        wx.navigateTo({
          url: '/pages/detail/index'
        })
      } catch (e) {
        
      }
      
    }
  }

})