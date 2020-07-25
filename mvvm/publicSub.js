// 发布订阅模式 先订阅再发布

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
function Watcher(fn) { // fn是事件
    this.fn = fn;
}
Watcher.prototype.update = function () {
    this.fn();
};
let watcher = new Watcher(function () {
    console.log(1);
});
let dep = new Dep();
dep.addSub(watcher);
dep.addSub(watcher);
console.log(dep.subs);
dep.notify();
