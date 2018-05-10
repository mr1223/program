
import { clearLink, addStyleImage, ajax } from '../../common/public.js';
import { dominImg, aboutMessage } from '../../common/path.js';
import { repalceUploads } from '../../common/reg.js';

Page({
  data: {
    nodes: ''
  },
  onLoad: function(){
    this.getData();
  },
  getData: function(){
    ajax(aboutMessage)
    .then( data => {
      let content = data.info.content
      content = clearLink(repalceUploads, content, dominImg);
      content = addStyleImage(content);
        this.setData({
          nodes: content
        })
        console.log(content);
    })
    .catch( err => {

    })
  }
})
