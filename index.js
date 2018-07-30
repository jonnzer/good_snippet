
function setHTMLSIZE (pageWidth=750) {
    !(function(win, doc){
        function setFontSize() {
            // 获取window 宽度
            // zepto实现 $(window).width()就是这么干的
            var winWidth =  window.innerWidth;
            // doc.documentElement.style.fontSize = (winWidth / 640) * 100 + 'px' ;

            // 2016-01-13 订正
            // 640宽度以上进行限制 需要css进行配合
            console.log('winWidth',winWidth);
            var size = (winWidth / pageWidth) * 100;
            //doc.documentElement.style.fontSize = (size < 100 ? size : 100) + 'px' ; //为了适应pc版进行布局 这里大于100的话直接隐藏 而pc版的字体是大于100的
            doc.documentElement.style.fontSize = size + 'px' ;
        }
        var evt = 'onorientationchange' in win ? 'orientationchange' : 'resize';
        // 常见支持于移动端的window对象
        var timer = null;

        win.addEventListener(evt, function () {
            clearTimeout(timer);

            timer = setTimeout(setFontSize, 300);
        }, false);

        win.addEventListener("pageshow", function(e) {
            // onpageshow 事件在用户浏览网页时触发。
            // onpageshow 事件类似于 onload 事件，onload 事件在页面第一次加载时触发， onpageshow 事件在每次加载页面时触发，即 onload 事件在页面从浏览器缓存中读取时不触发。
            // 为了查看页面是直接从服务器上载入还是从缓存中读取，你可以使用 PageTransitionEvent 对象的 persisted 属性来判断。 如果页面从浏览器的缓存中读取该属性返回 ture，否则返回 false 
            if (e.persisted) {
                clearTimeout(timer);

                timer = setTimeout(setFontSize, 300);
            }
        }, false);

        // 初始化
        setFontSize();

    }(window, document));
}