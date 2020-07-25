/**
 * let zs = new Vue({
 *     el: '#app',
 *     data: {a: 1}
 * })
 */

/**
 *
 * @param options 参考vue实例化时传进的对象,代表我们存储的所有对象
 */
function demoVue(options = {}) {
    this.$options = options;  // 当前实例，存储存进的对象
    let data = this._data = this.$options.data;  // 当前实例，存储options.data 准备像vue一样观察数据
    observe(data);
    // 为了代理_data属性。可以直接在实例的时候取到data，再用define一次
    for (let key in data) {
        Object.defineProperty(this,key,{
            enumerable: true,
            get() {
                return this._data[key]; // 将this._data.key 通过定义对象的方式 赋给了 this.key，模拟vue
            },
            set(newVal) {
                this._data[key] = newVal;
            }
        })
    }
    let computed = this.$options.computed;
    operatedComputed.call(this)  // computedde 的操作需放在数据都已被观察完，并挂载到_data里
   
    new Compile(options.el, this);
}

function operatedComputed() { // computed 处理函数
    let vm = this
    let computedFn = this.$options.computed
    Object.keys(computedFn).forEach(function(key){
        // computed挂载到vm上
        Object.defineProperty(vm,key,{
            get: typeof computedFn[key] === 'function' ?  computedFn[key] : computedFn[key].get,
            set() {

            }
        })
    })
}

function observe(data) { // 数据劫持，增加Object.defineProperty
     if (typeof data !== 'object') return;
     return new Observe(data); // 方便递归
}

/**
 * 把数据编译到dom上，实现数据绑定
 * @param el 替换的dom
 * @param vm 实例
 * @constructor
 * note:
 * (1) 文档碎片
 * (2) regExp.$n: --[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/n]
 * (3)正则图形化 https://regexper.com/
 * (4)正则对照表：http://tool.oschina.net/uploads/apidocs/jquery/regexp.html
 */
function Compile(el, vm) {
    vm.$el = document.querySelector(el);
    let fragment = document.createDocumentFragment(); // 之所以用了文档碎片，是因为这样造成页面渲染回流的代价最低
    let child;
    // 此处用到了appendChild的一个特性：对于被添加的子节点，如果之前已经存在，则会销毁自己在dom树的节点，然后把自己添加到新的地方
    // 因此vm.$el.firstChild才会不停地切换成下一个子节点。
    // --[https://developer.mozilla.org/zh-CN/docs/Web/API/Node/appendChild]

    while (child = vm.$el.firstChild) {
        fragment.appendChild(child);
    }
    replace(fragment);
    /**
     * Array.from 将伪数组对象转为数组实例
      textContext: 节点内容
      节点类型 --[https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeType] nodeType为3时，是element或者属性中的字
      之所以抽离出方法，是因为想要重复调用，当子节点里还有子节点时，可以调用。
     */
    function replace(fragment) {
        Array.from(fragment.childNodes).forEach(function (node) {
            let text = node.textContent;
            let exp;
            let reg = /\{\{(.*)\}\}/;
            if (node.nodeType === 3 && reg.test(text)) {
               exp = text.replace(reg, '$1'); // 正则匹配中第一个括号所代表的内容
                let pointArr = exp.split('.'); // a.a b
                let existVal = vm;
                pointArr.forEach(function (key) { // vm.a.a  vm.b
                    existVal = existVal[key];
                });
                // 添加一个watcher事件 监听了值的变化
                new Watcher(vm,exp,function (newVal) {
                    node.textContent = text.replace(reg, newVal);
                });
                node.textContent = text.replace(reg, existVal); // @todo此处parser有待完善，只能兼容纯{{}}，带上其他字符会让existVal失效
            }
            if (node.nodeType === 1 ) { // v-model实现
                let attr = Array.from(node.attributes)
                let attr_value;
                attr.forEach(function(item){
                    if (item.name === 'v-model') {
                        attr_value = item.value
                        new Watcher(vm,attr_value, function(newVal) {
                            node.value = newVal
                        })
                        node.addEventListener('input',function(e){
                            vm[attr_value] = e.target.value
                        })  
                    }
                   
                })
            }
            if (node.childNodes) {
                replace(node);
            }
            vm.$el.appendChild(fragment); // 文档碎片的内容重新添加到原来挂载的元素里
        });
    }
}


/**
 * @param data
 * @returns {*}
 * @constructor
 */
function Observe(data) { // 实际观察方法,设置 Object.defineProperty
    let dep = new Dep();
    for (let key in data) {
        let val = data[key];
        observe(val); // 这里就已经可以递归了
        Object.defineProperty(data,key, {
            enumerable: true,
            get() {
                // 此时Dep.target是this
                if (Dep.target) {
                    dep.addSub(Dep.target); // 添加事件订阅（watcher 的 push）
                }
                return val;
            },
            set(newVal) {
                if (newVal ===  val) { // 值没发生变化
                    return; 
                } else {
                    val = newVal; // 更新值。get获取值时，也可以得到最新的值。
                    observe(newVal); // 这里是为了给新值也添上观察者
                    dep.notify(); // 添加事件的通知更新（watcher的update）
                }
            }
        })
    }
}

/**
 * 发布订阅函数
 * @Dep
 */
function Dep() {
    this.subs = []; // 事件池
}
Dep.prototype.addSub = function (sub) { // 订阅
    this.subs.push(sub);
};
Dep.prototype.notify = function () { // 通知
    this.subs.forEach(sub => {
        sub.update();
    })
};

/**
 * 事件池其中的一个
 * @param vm: 实例环境（总的数据来源）
 * @param 正则表达式的遍历对象exp (要更改的对象)
 * @param fn（处理的回调函数）
 * @constructor
 */
function Watcher(vm,exp,fn) { // fn是回调函数 new的时候传进来
    this.vm = vm;
    this.exp = exp;
    this.fn = fn;

    // 添加到订阅中
    // Dep.target ??? 扮演着一个watcher对象，也是Watcher的实例  它和 Object.defineProperty的get会有反应
    Dep.target = this;
    let val = vm;
    let arr = exp.split('.');
    arr.forEach(function (k) { // 这里获取 this.a.a时还是会触发到默认的getter
        val = val[k];
    });
    Dep.target = null;

}
Watcher.prototype.update = function () { // watcher的更新方法
    let val = this.vm;
    let arr = this.exp.split('.');
    arr.forEach(function (k) {
        val = val[k];
    });
    this.fn(val); // 把最新值传进callback
};

