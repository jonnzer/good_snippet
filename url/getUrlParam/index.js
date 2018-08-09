function getQueryStringArgs (param) {
    var qs = (location.search.length > 0 ? location.search.substring(1) : ''),  // 取得查询字符串并去掉开头的问号
    // 保存数据的对象
    args = {},
    items = qs.length ? qs.split('&'): [],
    item = null,
    name = null,
    value = null,
    // for
    i = 0,
    len = items.length;

    // 逐一将每一项添加到args对象中
    for (i = 0;i< len; i++) {
        item = items[i].split('=');
        name = decodeURIComponent(item[0]);
        value =  decodeURIComponent(item[1]);
        if (name.length) {
            args[name] = value
        }
    }
    return args[param];
}