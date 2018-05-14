
import { clearLink, addStyleImage, ajax,wxShare } from '../../common/public.js';
import { dominImg, aboutMessage } from '../../common/path.js';
import { repalceUploads } from '../../common/reg.js';

Page({
  data: {
    nodes: ''
  },
  onLoad: function(){
    this.getData();
  },
  onShareAppMessage: (res) => {
    const share = wxShare();
    return share;
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
        
    })
    .catch( err => {

    })
  }
})
