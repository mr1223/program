
import { clearLink,ajax } from '../common/public.js';
import { dominImg, repalceImg,getAssortList } from '../common/path.js';
const getArrsort = () => {
  return new Promise(function (resolve, reject){
    ajax(getAssortList, 'get').then(data => {
      if (data.code == 1) {
        var indexs = 1;
        var list = [];
        var content = [];
        var getData = data.info;

        getData.forEach(function (element, index) {
          element['image'] = clearLink(repalceImg, element['image'], dominImg);
          content.push(element);
          list[indexs - 1] = {};
          list[indexs - 1]['id'] = indexs;
          list[indexs - 1]['content'] = [];
          list[indexs - 1]['content'] = content;

          if (content.length == 10) {
            indexs++;
            content = [];
          }

        })
        data.list = list;
        resolve(data);
        
      }else{
        reject(data);
      }
    })
    .catch(err => {
      
    })
  })
}



module.exports = {
  getArrsort: getArrsort
}








