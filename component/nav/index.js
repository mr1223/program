Component({
  data: {
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    indicatorActiveColor: "#a5fafb"
  },
  properties: {
    list: {
      type: Object,
      value: {}
    }
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