$(function(){
  $.extend({
    getCookie: function(name) {
      var search = name + "="
      offset = document.cookie.indexOf(search) 
      if (offset != -1) {
        offset += search.length ;
        end = document.cookie.indexOf(";", offset) ;
        if (end == -1)
          end = document.cookie.length;
        return unescape(document.cookie.substring(offset, end));
      }
      else
        return "";
    }

    , setCookie: function(name, value, days){
      var str = name + "=" + escape(value);
      var date = new Date();
      var ms = days * 24 * 3600 * 1000;
      date.setTime(date.getTime() + ms);
      str += ";path=/;domain=" + host + "; expires=" + date.toGMTString();
      document.cookie = str;
    }
  });
});