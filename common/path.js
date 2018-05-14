

const domin = '你的地址';
const dominImg = '你的地址/Uploads';
const repalceImg = /\/Uploads/g;
const dominImgPublic = '你的地址/Public';
const repalceImgPublic = /\/Public/g;
const accountIndex = domin + '/Home/Account/index';//用户信息
const getCarouselList = domin + '/Home/Index/getCarouselList';//获取-轮播图列表
const getAssortList = domin + '/Home/Index/getAssortList'; //获取-类型
const addStick = domin + '/Home/Stick/add'; //增加-帖子
const getIndexNewBar = domin + '/Home/Index/getIndexNewBar'; //获取-置顶帖子
const getIndexNewList = domin + '/Home/Index/getIndexNewList'; //获取-帖子列表
const getUserNewList = domin + '/Home/Stick/getUserNewList'; //获取-帖子列表-个人
const getdeatil = domin + '/Home/Stick/getdetail'; //获取-帖子详情
const assortNewList = domin + '/Home/Stick/assortNewList'; //获取-类目帖子
const assortBarList = domin + '/Home/Stick/assortBarList'; //获取-类目置顶帖子
const addComment = domin + '/Home/Comment/add'; //增加-评论
const addPraise = domin + '/Home/Praise/add'; //增加-赞 
const getMyComment = domin + '/Home/Comment/getMyComment'; //获取-我发出的评论 
const getToMyComment = domin + '/Home/Comment/getToMyComment'; //获取-我收到的评论 
const addFeedback = domin + '/Home/Feedback/add'; //增加-意见反馈 
const getMessage = domin + '/Home/Public/getMessage'; //获取-消息 
const aboutMessage = domin + '/Home/Message/about'; //关于我们
const uploadImg = domin + '/Home/Public/uploadImg'; //上传图片

module.exports =  {
   domin,
   dominImg,
   repalceImg,
   dominImgPublic,
   repalceImgPublic,
   accountIndex,
   getCarouselList,
   getAssortList,
   addStick,
   getIndexNewBar,
   getIndexNewList,
   getUserNewList,
   getdeatil,
   assortNewList,
   assortBarList,
   addComment,
   addPraise,
   getMyComment,
   getToMyComment,
   addFeedback,
   getMessage,
   aboutMessage,
   uploadImg,
}









