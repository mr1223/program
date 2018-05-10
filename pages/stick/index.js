import { clearLink,ajax } from '../../common/public.js';
import { dominImg, getUserNewList } from '../../common/path.js';
import { repalceUploads, img_selects } from '../../common/reg.js';
Page({
  data: {
    cardList: {
      content: []
    },
    page: 1,
    num: 10
  },
  onLoad: function(){
    this.getList();
  },
  onReachBottom: function () {
    this.getList();
  },
  getList: function(){
    let data ={
      page: this.data.page,
      num: this.data.num
    }
    ajax(getUserNewList, 'post', data)
    .then( data => {
      if (data.code == 1){
        
        var getData = data.info;
    
        getData.forEach(function (element) {
          if (parseInt(element['utype']) == 1) {
            element['userimage'] = element['avatarurl'];
            element['user'] = element['nickname'];
          }
          
          element['image'] = clearLink(repalceUploads, element['image'], dominImg);
          element['content'] = clearLink(repalceUploads, element['content'], dominImg);
          element['content'] = clearLink(img_selects, element['content'], '');
          // element['image'] = clearLink(repalceUploads, element['image'], dominImg);
          // element['content'] = clearLink(repalceUploads, element['content'], dominImg);
          // element['content'] = clearLink(img_selects, element['content'], '');
          // element['user'] =  element['nickName'];
        })
        var lists = getData;
        if (this.data.page > 1){
          lists = this.data.cardList.content.concat(getData);
        }
        let page = this.data.page + 1;
        this.setData({
          "page": page,
          "cardList.content": lists
        })
      }
    })
    .catch( err => {

    })
  }
})


