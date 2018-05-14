Component({
  data: {
    autoplay: false,
    interval: 5000,
    duration: 1000,
    indicatorActiveColor: "#a5fafb"
  },
  properties: {
    list: {
      type: Object,
      value: {}
    },
    indicatorDots: {
      type: Boolean,
      value: true
    }
  },
  ready: function(){
    
  },
  methods: {
    goRoute: function(e){
      let id = e.currentTarget.dataset.id;
      let name = e.currentTarget.dataset.name;
      let url = '/pages/assort/index?id=' + id + '&name=' + name;
      wx.navigateTo({
        url: url
      })
    }
  }
})