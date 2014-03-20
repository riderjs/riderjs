/**
 * param cont {string}
 * param type {'account', 'password', 'passwordagain', 'captcha', 'mobile', 'cardid', 'nickname', 'realname', 'txt'}
 * param require {boolen}
 * use example: rider.use('formCheck', function(){ var res = $.formCheck({cont: '18767126180', type: 'mobile'}); console.log(res) }); 
 * this return {isok: true, tip: tips[2]}
**/
// 校验
// (function(global) { 
$(function() {
  $.extend({
    formCheck: function(options) {
      var defaultOptions = {
        cont: ''
      , type: ''
      , require: true
      };
      var format;
      options = $.extend({}, defaultOptions, options);

      if(options.type == 'account') {
        format = verifyAccount(options);
      } else if(options.type == 'password') {
        format = verifyPassword(options);
      } else if(options.type == 'passwordagain') {
        format = verifyPasswordAgain(options);
      } else if(options.type == 'captcha'){
        format = verifyCaptcha(options);
      } else if(options.type == 'mobile'){
        format = verifyMobile(options);
      } else if(options.type == 'cardid') {
        format = verifyIdCard(options);
      } else if(options.type == 'nickname') {
        format = verifyNickname(options);
      } else if(options.type == 'realname') {
        format = verifyRealName(options);
      } else if(options.type == 'txt') {
        format = verifyTxt(options);
      }

      return format;

    }
  });

  //验证验证码4-6位
  function verifyCaptcha(options){
    var tips = ['请输入验证码', '验证码格式错误', ''],
        cont = options.cont,
        reg = /^[0-9a-z]{4,6}$/i;
    if(verifyIsNull(cont)) {
      return {isok: false, tip: tips[0]};
    }
    if(reg.test(cont)) {
      return {isok: true, tip: tips[2]};
    } else {
      return {isok: false, tip: tips[1]};
    }
  }

  //验证手机号码, 11位
  function verifyMobile(options) {
    var tips = ['请输入手机号码', '手机号码格式错误', ''],
        cont = options.cont,
        reg = /^[0-9]{11}$/;
    if(verifyIsNull(cont)) {
      //验证电话为空
      return {isok: false, tip: tips[0]};
    }
    if(reg.test(cont)) {
      return {isok: true, tip: tips[2]};
    } else {
      return {isok: false, tip: tips[1]};
    }
  };

  // 验证文本
  function verifyTxt(options) {
    var tips = ['请输入内容', ''],
        cont = options.cont;
    if(verifyIsNull(cont)) {
      return {isok: false, tip: tips[0]};
    } else {
      return {isok: true, tip: tips[1]};
    }
  }

  // 验证身份证
  function verifyIdCard(options){ 
    var area = {11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"}
    var idcard,Y,JYM;
    var S,M;
    var thisid = idcard;
    var idcard_array = new Array();
    var tips = ['请输入身份证', '身份证格式错误', ''];
    var cont = options.cont;
     
    //取值
    idcard = cont;
    var idcard= TrimStr(idcard);
    
    //验证空
    // if(idcard == ''){
    //  return {isok: false, tip: tips[0]};
    // }
    if(!idcard.length && options.require) {
      return {isok: false, tip: tips[0]};
    }
    
    idcard_array = idcard.split("");
    //地区检验
    if(area[parseInt(idcard.substr(0,2))]== null) {
      return {isok: false, tip: tips[1]};
    }
    if (idcard.substr(0,6) == "000000" || idcard.substr(0,6) == "111111" || idcard.substr(0,6) == "222222" || idcard.substr(0,6) == "333333" || idcard.substr(0,6) == "444444" || idcard.substr(0,6) == "555555" || idcard.substr(0,6) == "666666" || idcard.substr(0,6) == "777777" || idcard.substr(0,6) == "888888" || idcard.substr(0,6) == "999999")  {return {isok: false, tip: tips[0]};}
    if (idcard.substr(0,6) == "123456" || idcard.substr(0,6) == "234567" || idcard.substr(0,6) == "345678" || idcard.substr(0,6) == "456789" || idcard.substr(0,6) == "567890" || idcard.substr(0,6) == "012345" || idcard.substr(0,6) == "543210" || idcard.substr(0,6) == "432109" || idcard.substr(0,6) == "321098" || idcard.substr(0,6) == "210987" || idcard.substr(0,6) == "109876" || idcard.substr(0,6) == "098765" || idcard.substr(0,6) == "987654" || idcard.substr(0,6) == "876543" || idcard.substr(0,6) == "765432")  {return {isok: false, tip: tips[0]};}
    if (idcard.substr(0,6) == "121212" || idcard.substr(0,6) == "131313" || idcard.substr(0,6) == "141414" || idcard.substr(0,6) == "151515" || idcard.substr(0,6) == "161616" || idcard.substr(0,6) == "171717" || idcard.substr(0,6) == "181818" || idcard.substr(0,6) == "191919" || idcard.substr(0,6) == "101010")  {return {isok: false, tip: tips[0]};}
    if (idcard.substr(0,6) == "212121" || idcard.substr(0,6) == "232323" || idcard.substr(0,6) == "242424" || idcard.substr(0,6) == "252525" || idcard.substr(0,6) == "262626" || idcard.substr(0,6) == "272727" || idcard.substr(0,6) == "282828" || idcard.substr(0,6) == "292929" || idcard.substr(0,6) == "202020")  {return {isok: false, tip: tips[0]};}
    if (idcard.substr(0,6) == "313131" || idcard.substr(0,6) == "323232" || idcard.substr(0,6) == "343434" || idcard.substr(0,6) == "353535" || idcard.substr(0,6) == "363636" || idcard.substr(0,6) == "373737" || idcard.substr(0,6) == "383838" || idcard.substr(0,6) == "393939" || idcard.substr(0,6) == "303030")  {return {isok: false, tip: tips[0]};}
    if (idcard.substr(0,6) == "414141" || idcard.substr(0,6) == "424242" || idcard.substr(0,6) == "434343" || idcard.substr(0,6) == "454545" || idcard.substr(0,6) == "464646" || idcard.substr(0,6) == "474747" || idcard.substr(0,6) == "484848" || idcard.substr(0,6) == "494949" || idcard.substr(0,6) == "404040")  {return {isok: false, tip: tips[0]};}
    if (idcard.substr(0,6) == "515151" || idcard.substr(0,6) == "525252" || idcard.substr(0,6) == "535353" || idcard.substr(0,6) == "545454" || idcard.substr(0,6) == "565656" || idcard.substr(0,6) == "575757" || idcard.substr(0,6) == "585858" || idcard.substr(0,6) == "595959" || idcard.substr(0,6) == "505050")  {return {isok: false, tip: tips[0]};}
    if (idcard.substr(0,6) == "616161" || idcard.substr(0,6) == "626262" || idcard.substr(0,6) == "636363" || idcard.substr(0,6) == "646464" || idcard.substr(0,6) == "656565" || idcard.substr(0,6) == "676767" || idcard.substr(0,6) == "686868" || idcard.substr(0,6) == "696969" || idcard.substr(0,6) == "606060")  {return {isok: false, tip: tips[0]};}
    if (idcard.substr(0,6) == "717171" || idcard.substr(0,6) == "727272" || idcard.substr(0,6) == "737373" || idcard.substr(0,6) == "747474" || idcard.substr(0,6) == "757575" || idcard.substr(0,6) == "767676" || idcard.substr(0,6) == "787878" || idcard.substr(0,6) == "797979" || idcard.substr(0,6) == "707070")  {return {isok: false, tip: tips[0]};}
    if (idcard.substr(0,6) == "818181" || idcard.substr(0,6) == "828282" || idcard.substr(0,6) == "838383" || idcard.substr(0,6) == "848484" || idcard.substr(0,6) == "858585" || idcard.substr(0,6) == "868686" || idcard.substr(0,6) == "878787" || idcard.substr(0,6) == "898989" || idcard.substr(0,6) == "808080")  {return {isok: false, tip: tips[0]};}
    if (idcard.substr(0,6) == "919191" || idcard.substr(0,6) == "929292" || idcard.substr(0,6) == "939393" || idcard.substr(0,6) == "949494" || idcard.substr(0,6) == "959595" || idcard.substr(0,6) == "969696" || idcard.substr(0,6) == "979797" || idcard.substr(0,6) == "989898" || idcard.substr(0,6) == "909090")  {return {isok: false, tip: tips[0]};}
    //身份号码位数及格式检验
    switch(idcard.length){
      case 15:
        if ( (parseInt(idcard.substr(6,2))+1900) % 4 == 0 || ((parseInt(idcard.substr(6,2))+1900) % 100 == 0 && (parseInt(idcard.substr(6,2))+1900) % 4 == 0 )){
          ereg=/^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;//测试出生日期的合法性
        } else {
          ereg=/^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;//测试出生日期的合法性
        }
        if(ereg.test(idcard)) {
          return {isok: true, tip: tips[2]};
        } else {
          return {isok: false, tip: tips[1]};
        }
        break;
      case 18:
        //18位身份号码检测
        //出生日期的合法性检查
        //闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
        //平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
        if ( parseInt(idcard.substr(6,4)) % 4 == 0 || (parseInt(idcard.substr(6,4)) % 100 == 0 && parseInt(idcard.substr(6,4))%4 == 0 )){
          ereg=/^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;//闰年出生日期的合法性正则表达式
        } else {
          ereg=/^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;//平年出生日期的合法性正则表达式
        }
        if(ereg.test(idcard)){//测试出生日期的合法性
        //计算校验位
          S =   (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7
            + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9
            + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10
            + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5
            + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8
            + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4
            + (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2
            + parseInt(idcard_array[7]) * 1
            + parseInt(idcard_array[8]) * 6
            + parseInt(idcard_array[9]) * 3 ;
          Y = S % 11;
          M = "F";
          JYM = "10X98765432";
          M = JYM.substr(Y,1);//判断校验位
          if(M == idcard_array[17] || (M == 'X' && idcard_array[17] == 'x')) { //检测ID的校验位
            return {isok: true, tip: tips[2]};
          }else {
            return {isok: false, tip: tips[1]};
          }
        }else {
          return {isok: false, tip: tips[1]};
        }
        break;
      default:
        return {isok: false, tip: tips[1]};
        break;
    }
  }

  // 验证账号 (允许中文、字母、数字、下划线，长度在8-16个字符 )
  function verifyAccount(options) {
    var reg = /^[_a-zA-Z0-9\u4E00-\u9FA5]+$/,
        tips = ['请输入8-16位长度的游戏账号', '仅限使用中文、字母、数字和下划线作为游戏账号', ''],
        cont = options.cont;
    if(!cont.length && options.require) {
      return {isok: false, tip: tips[0]};
    } 
    if(cont.length){
      if(8 > getLen(cont) || 16 < getLen(cont)) {
        return {isok: false, tip: tips[0]};
      }
      if(reg.test(cont)) {
        return {isok: true, tip: tips[2]};
      } else {
        return {isok: false, tip: tips[1]};
      }
    }

    // if(undefined != originId && 0 < $("#" + originId).length && val == $("#" + originId).val()){
    //   showValidResult(id, 'error', '昵称与账号不能同名');
    //   return false;
    // }
  }

  // 验证游戏昵称 (4-16位)
  function verifyNickname(options) {
    var reg = /^[a-zA-Z0-9\u4E00-\u9FA5]+$/,
        cont = options.cont;
    if(undefined != options.original && 0 < $(options.original).length && cont == $(options.original).val()){
      return {isok: false, tip: '昵称与账号不能同名'};
    }

    if(verifyIsNull(cont)) {
      return {isok: false, tip: '昵称不能为空'};;
    }
    if(4 > getLen(cont) || 16 < getLen(cont)){
      return {isok: false, tip: '昵称长度仅限4-16个字符'};
    }
    if(reg.test(cont)) {
      return {isok: true, tip: ''};  
    } else {
      return {isok: false, tip: '昵称仅限中文、英文、数字'};
    }
  }

  // 验证真实姓名(只能是中文)
  function verifyRealName(options){
    var tips = new Array(
        "姓名不能为空",
        "请输入您的中文姓名",
        "姓名输入错误",
        ""
        );
    var sn = TrimStr(options.cont);
    if(!sn.length && options.require){
      return {isok: false, tip: tips[0]};
    }
    //在JavaScript中,正则表达式只能使用"/"开头和结束,不能使用双引号
    var Expression = /[^\u4E00-\u9FA5]/; 
    var objExp = new RegExp(Expression);
    if(objExp.test(sn) == true){
      return {isok: false, tip: tips[1]};;
    }else if(sn.length < 2 || sn.length > 8){
      return {isok: false, tip: tips[2]};;
    }else{
      return {isok: true, tip: tips[3]};;
    }
  }

  // 验证密码 (8-40位)
  function verifyPassword(options) {
    var tips = ['请输入密码', '密码格式不正确', ''],
        cont = options.cont,
        reg = /^[0-9a-zA-Z]{8,40}$/;
    if(!cont.length) {
      return {isok: false, tip: tips[0]};
    } else if(reg.test(cont)) {
      return {isok: true, tip: tips[2]};
    } else{
      return {isok: false, tip: tips[1]};
    }
  }

  // 确认密码
  function verifyPasswordAgain(options) {
    var tips = ['请输入确认密码', '两次输入的密码不一致', ''];
    if(!options.cont.length) {
      return {isok: false, tip: tips[0]};
    } else if(undefined != options.original && 0 < $(options.original).length && options.cont != $(options.original).val()) {
      return {isok: false, tip: tips[1]};
    } else{
      return {isok: true, tip: tips[2]};
    }
  }

  //去除空格
  function TrimStr(cont){
    if (cont == null) {
      return cont
    }
    return cont = cont.replace(/^\s+|\s+$/g,"");
  }

  //验证是否为空
  function verifyIsNull(cont) {
    var flag = false;
    cont = TrimStr(cont);//去掉空格
    if(cont == '') {
      flag = true;
    }
    return flag;
  }

  // 获得字符长度
  function getLen(s){
    var l = 0;
    var a = s.split("");
    for (var i=0;i<a.length;i++) {
      if (a[i].charCodeAt(0)<299) {
        l++;
      } else {
        l+=2;
      }
    }
    return l;
  }
});


