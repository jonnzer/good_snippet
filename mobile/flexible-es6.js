// 添加屏幕旋转、pageShow等H5属性事件监听，设置font-size；
export default function (pageWidth=750) {
    !(function(win, doc){
        function setFontSize() {
            // 获取window 宽度
            // zepto实现 $(window).width()就是这么干的
            var winWidth =  window.innerWidth;
            // doc.documentElement.style.fontSize = (winWidth / 640) * 100 + 'px' ;

            // 2016-01-13 订正
            // 640宽度以上进行限制 需要css进行配合
            // console.log('winWidth',winWidth);
            var size = (winWidth / pageWidth) * 100;
            //doc.documentElement.style.fontSize = (size < 100 ? size : 100) + 'px' ; //为了适应pc版进行布局 这里大于100的话直接隐藏 而pc版的字体是大于100的
            doc.documentElement.style.fontSize = size + 'px' ;
        }
        var evt = 'onorientationchange' in win ? 'orientationchange' : 'resize'; //  onorientationchange 是h5的旋转事件

        var timer = null;

        win.addEventListener(evt, function () {
            clearTimeout(timer);

            timer = setTimeout(setFontSize, 300);
        }, false);

        win.addEventListener("pageshow", function(e) { // 将会在控制台打印由前进/后退按钮以及load事件触发后引起的pageshow事件
            if (e.persisted) { // 如果页面从浏览器的缓存中读取该属性返回 ture，否则返回 false。然后在根据true或false在执行相应的页面刷新动作或者直接ajax请求接口更新数据。
                clearTimeout(timer);

                timer = setTimeout(setFontSize, 300);
            }
        }, false);

        // 初始化
        setFontSize();

    }(window, document));
}