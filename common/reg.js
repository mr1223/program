


const img_select = /<img/gi;
const img_selects = /<img.*?(?:>|\/>)/gi;
const repalceUploads = /\/Uploads/g;
const repalcePublic = /\/Public/g;

module.exports = {
  img_select,
  img_selects,
  repalceUploads,
  repalcePublic
}






