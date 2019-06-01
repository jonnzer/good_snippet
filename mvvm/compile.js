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
                return this._data[key]; // 将this._data.key 通过定义对象的方式 赋给了 this.key，优雅的模拟了vue
            },
            set(newVal) {
                this._data[key] = newVal;
            }
        })
    }
    new Compile(options.el, this);
}

function observe(data) { // 观察对象，增加Object.defineProperty
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
 */
function Compile(el, vm) {
    vm.$el = document.querySelector(el);
    let fragment = document.createDocumentFragment();
    while (child = vm.$el.firstChild) {
        fragment.appendChild(child);
    }
    Array.from(fragment.childNodes).forEach(function (node) {
        let test = node.textContent;
        // let reg = ***;
    });
    vm.$el.appendChild(fragment);
}


/**
 * observe了两次
 * @param data
 * @returns {*}
 * @constructor
 */
function Observe(data) { // 实际观察方法,主要逻辑
    for (let key in data) {
        let val = data[key];
        // observe(val);
        Object.defineProperty(data,key, {
            enumerable: true,
            get() {
                return val;
            },
            set(newVal) {
                if (newVal ===  val) {
                    return; // data: {a: 1}
                } else {
                    val = newVal; // 这是为了获取值时，将最新的值通过get返回出去。
                    observe(newVal);
                }
            }
        })
    }
}

// test1
let little = new demoVue({
    el: "#app",
    data: {
        a: {a: "我是a.a"},
        b: "我是b"
    }
});
console.log(little);
window.little = little;