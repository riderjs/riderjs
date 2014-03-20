/**
 * params {second}
 * params {url}
 * use example rider.use('jump', function(){ $.pageJupe(8, location.href+'#') });
**/
$(function () {
  $.extend({
    pageJupe: function (tim, url) {
      //创建节点
      var di = $("<div  style='width:200px; height:100px; background-color:#dbd2d2;text-align:center;line-height:80px; position:absolute; top:45%; left:45%;'><p>页面将在<span id='time' style='color:red;font-size:25px;'>" + tim + "</span>秒后自动跳转</p></div>");
      $('body').append(di);
      var ding = setInterval(function () {
        tim--;
        $('#time').html(tim);
        if (tim == 0) {
           clearTimeout(ding); //清空定时器
           di.remove();    //删除节点
           window.location =url;   //跳转页面
        }
      }, 1000);
    }
  });
 });
