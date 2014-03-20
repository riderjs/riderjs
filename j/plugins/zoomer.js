/*
*
* JQUERY 简洁无极放大镜插件-zoomer
* Author:盛世游侠
* QQ:418873053
* Date:2013-11-22
*
*/
(function($) {
$.fn.zoomer = function(o){
    o = $.extend({
        pic:null,//原图img的容器
        leftImg:null,//原图img本身
        drag:null,//原图img选看区
        bigpic:null,//大图img的容器
        box:null,//大图img本身
        //img_zoom参数是指放大的倍数，取值范围从1到无穷大，可以取小数。
        //img_zoom参数决定了大图长和宽，以及大图显示区域的长和宽。该参数可以自己设置,也可以默认,如果大图与原图不是同一张图，建议默认。
        img_zoom:o.box.innerWidth()/o.leftImg.innerWidth()  
    }, o || {});

    o.pic.mouseout(function(){
        o.drag.hide();
        o.bigpic.hide();
    });
    //重置大图宽和高，使其与原图成一定比例
    o.box.width(o.leftImg.width()*o.img_zoom);
    o.box.height(o.leftImg.height()*o.img_zoom);
    //原图选看区移动事件函数
    o.pic.mousemove(function(e){
        o.drag.show();
        o.bigpic.show();
        
        //重置大图显示区长和宽与原图的选看区长和宽成一定比例
        o.bigpic.width(o.drag.width()*o.img_zoom);
        o.bigpic.height(o.drag.height()*o.img_zoom);
        
        //原图选看区的实时位置（原图选看区在HTML文档中的实时left和实时top）
        var drag_x=e.pageX - o.pic.offset().left-o.drag.innerWidth()/2;
        var drag_y=e.pageY -o.pic.offset().top-o.drag.innerHeight()/2;
        
        //使原图选看区的实时位置不超出原图的边界
        if (drag_x<0){drag_x=0;}
        if (drag_x>o.pic.width()-o.drag.width()) {drag_x=o.pic.width()-o.drag.width()};
        if (drag_y<0){drag_y=0;}
        if (drag_y>o.pic.height()-o.drag.height()) {drag_y=o.pic.height()-o.drag.height()};
        
        //实时设置原图选看区在原图中的位置,这里将jQuery对象转换为了Dom对象然后赋值，所以需要注意drag.style.left要有‘px’单位。
        o.drag.get(0).style.left=drag_x+'px';
        o.drag.get(0).style.top=drag_y+'px';
        
        //实时设置大图在大图显示区域中的卷动值scrollLeft和scrollTop
        o.bigpic.scrollLeft(drag_x*o.img_zoom);
        o.bigpic.scrollTop(drag_y*o.img_zoom);    
    });
};
})(jQuery);