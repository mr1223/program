
import { wxShowToast, trigSpace,ajax } from '../../common/public.js';
import { addComment, addPraise } from '../../common/path.js';



Component({
  data: {
    content: '',
    name: '',
    pid: ''
  },
  properties: {
    list: {
      type: Object,
      value: {}
    },
    comment: {
      type: Array,
      value: []
    },
    article: {
      type: Object,
      value: {}
    }
  },
  methods: {
    inputTitle: function (e) {
      let value = e.detail.value;
      if (!value){
        this.setData({
          name: '',
          pid: ''
        })
      }
      this.setData({
        content: e.detail.value
      })
    },
    contact(e){
      let phone = e.currentTarget.dataset.phone;
      wx.makePhoneCall({
        phoneNumber: phone, //仅为示例，并非真实的电话号码
        success: function(data){
          
        },
        fail: function(err){
          wxShowToast('取消拨打');
        }
      })
    },
    replys(e){
      let name = e.currentTarget.dataset.name;
      let pid = e.currentTarget.dataset.pid;
      let content = '@' + name + ':  '; 
      this.setData({
        content: content,
        name: name,
        pid: pid
      })
    },
    commentSub(e){
  
      let name = '@' + this.data.name + ':'; 
      let pid = this.data.pid ? this.data.pid : 0;
      let content = this.data.content;
      let aid = e.currentTarget.dataset.id;
      if(pid != 0){
        if (content.indexOf(name) < 0){
          wxShowToast('请选择要回复的评论');
          return;
        }
        content = content.replace(name, '');
        content = trigSpace(content);
      }
      let data = {
        aid: aid,
        pid: pid,
        content: content,
      }
      ajax(addComment,'',data)
      .then(data => {
        
        if(data.code == 1){
          let comment = this.data.comment;
          
          wxShowToast('评论成功');
          this.setData({
            'content': '',
            'name': '',
            'pid': 0
          })
          data.comments.praisenum = 0;
          comment.push(data.comments);
          this.setData({
            'comment': comment
          })
        }else{
          wxShowToast('评论失败');
        }
      })
      .catch(err => {
        console.log(err);
      })
    },
    addArtPraise(e){
      //addPraise
      var status = '';
      let pid = this.data.list.id;
      let utype = 1;
      let tid = 1;
      if (this.data.list.praise > -1){
        status = -1
      }else{
        status = 1
      }
      let data = {
        pid: pid,
        utype: utype,
        tid: tid,
        status: status,
      }
      ajax(addPraise, '', data)
      .then(data => {

        if (data.code == 1) {
          if (status > -1){
              wxShowToast('点赞成功');
          }else{
              wxShowToast('取消点赞');
          }
          
          this.setData({
            'list.praise': status,
          })
         
        } else {
          wxShowToast('点赞失败');
        }
      })
      .catch(err => {
        console.log(err);
      })
    },
    addCommentPraise(e){
      var status = '';
      let pid = e.currentTarget.dataset.pid;
      let utype = 1;
      let tid = 2;
      if (e.currentTarget.dataset.praise > -1) {
        status = -1
      } else {
        status = 1
      }
      let data = {
        pid: pid,
        utype: utype,
        tid: tid,
        status: status,
      }
      ajax(addPraise, '', data)
      .then(data => {

        if (data.code == 1) {
          let index = e.currentTarget.dataset.index;
          let praise = "comment[" + index + "].praise";
          let com = "comment[" + index + "].praisenum";
          let num = this.data.comment[index]['praisenum'];

          if (status > -1) {
            num = parseInt(num) + 1;
            wxShowToast('点赞成功');
          } else {
            num = parseInt(num) - 1;
            wxShowToast('取消点赞');
          }
          
          
          
              
          this.setData({
            [praise]: status,
            [com]: num,
          })

        } else {
          wxShowToast('点赞失败');
        }
      })
      .catch(err => {
        console.log(err);
      })
    }
  }
})