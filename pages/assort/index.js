
import { clearLink,ajax, repalceImgPublic, dominImgPublic } from '../../common/public.js';
import { dominImg, assortNewList, assortBarList }  from '../../common/path.js';
import { repalceUploads, img_selects } from '../../common/reg.js'

Page({
  data: {
    id: '',
    page: 1,
    num: 100,
    assortList: {
      content: []
    },
    assortBarLists: {
      content: []
    },
    table: [
      {
        id: 1,
        method: 'create_time',
        name: '最新',
        active: true,
      },
      {
        id: 1,
        method: 'count',
        name: '最火',
        active: false,
      }
    ],
    index: 0,
    method: 'create_time',
  },
  onLoad: function(options){
    let id = options.id;
    let name = options.name;
    wx.setNavigationBarTitle({
      title: name//页面标题为路由参数
    })
    this.created(id, this.data.method);
    this.getBarList(id);
    this.setData({
      'id': id
    })
  },
  onReachBottom: function () {
    this.created(this.data.id, this.data.method);
  },
  created: function(id,t){
    let data = {
      id: id,
      methods: t,
      page: this.data.page,
      num: this.data.num
    }
    ajax(assortNewList,'',data)
    .then(data => {
      console.log(data);
      if (data.code == 1){
        var getData = data.info;
        
        
        getData.forEach(function (element) {
          if (parseInt(element['utype']) == 1) {
            element['userimage'] = element['avatarurl'];
            element['user'] = element['nickname'];
          } else
          if (parseInt(element['utype']) == 2) {
            element['userimage'] = clearLink(repalceImgPublic, element['userimage'], dominImgPublic);
            element['user'] = element['username'];
          }
          element['image'] = clearLink(repalceUploads, element['image'], dominImg);
          element['content'] = clearLink(repalceUploads, element['content'], dominImg);
          element['content'] = clearLink(img_selects, element['content'], '');

        })
        var lists = getData;
        if (this.data.page > 1) {
          lists = this.data.cardList.content.concat(getData);
        }
        let page = this.data.page + 1;
        this.setData({
          "page": page,
          "assortList.content": lists
        })
        
      }
    })
    .catch(err => {

    })
  },
  getData(e){
    wx.pageScrollTo({
      scrollTop: 0
    })
    this.setData({
      "page": 1,
    })
    let index = e.currentTarget.dataset.index;
    let method = e.currentTarget.dataset.method;
    let methodsLast = "table[" + this.data.index + "].active";
    let methods = "table[" + index + "].active";
    this.created(this.data.id, method);
    
    this.setData({
      [methodsLast]: false,
      [methods]: true,
      index: index,
      method: method
    })
  },
  getBarList: function(id){
   
    let data = {
      id: id,
      page: this.data.page,
      num: this.data.num
    }
    ajax(assortBarList, '', data)
    .then(data => {
    
      if (data.code == 1) {
        var getData = data.info;


        getData.forEach(function (element) {
          if (parseInt(element['utype']) == 1) {
            element['userimage'] = element['avatarurl'];
            element['user'] = element['nickname'];
          } else
            if (parseInt(element['utype']) == 2) {
              element['userimage'] = clearLink(repalceImgPublic, element['userimage'], dominImgPublic);
              element['user'] = element['username'];
            }
          element['image'] = clearLink(repalceUploads, element['image'], dominImg);
          element['content'] = clearLink(repalceUploads, element['content'], dominImg);
          element['content'] = clearLink(img_selects, element['content'], '');

        })
        this.setData({
          "assortBarLists.content": getData
        })

      }
    })
    .catch(err => {

    })
  }
})






















