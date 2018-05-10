import { clearLink, ajax, addStyleImage } from '../../common/public.js';
import { dominImg, getdeatil, dominImgPublic } from '../../common/path.js';
import { ARTICLEID } from '../../common/consts.js'; 
import { repalceUploads, repalcePublic, img_selects} from '../../common/reg.js'
Page({
  
  data: {
    id: 1,
    list: {},
    barList: {
      content: []
    },
    comment: [],
    article: {}
  },
  onLoad: function(){
    this.getList();
  },
  getList: function(){
    try {
      let articleId = wx.getStorageSync(ARTICLEID);
      let data = {
        'id': articleId
      }
      this.setData({
        id: articleId
      })

      ajax(getdeatil, 'post', data)
      .then(data => {
        if (data.code == 1) {

          var getData = data.info;
          var comment = data.comment;
          var article = data.article;

          if (getData['utype'] ==2){
            getData['avatarurl'] = clearLink(repalcePublic, getData['userimage'], dominImgPublic);
          }else{
            getData['username'] = getData['nickname'];
          }
          getData['image'] = clearLink(repalceUploads, getData['image'], dominImg);
          getData['content'] = clearLink(repalceUploads, getData['content'], dominImg);
          getData['content'] = addStyleImage(getData['content']);
          if (getData['imageslist']){
            getData['imageslist'] = clearLink(repalceUploads, getData['imageslist'], dominImg);
            getData['imageslist'] = getData['imageslist'].split(',');
          }
         
          article.forEach(function (element) {
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
            "list": getData,
            "comment": comment,
            "article.content": article
          })
        }
      })
      .catch(err => {

      })

    } catch (e) {
      console.log(e);
    }

    
    
  }
})


