//订阅者
//每当一个订阅者生成时，Dep.target就指向这个订阅者
//订阅者主动触发get函数，注册到指定发布者中，等待发布通知notify
function Watcher(obj,key,callback) {
    Dep.target = this;
    this.obj=obj;
    this.key = key;
    this.callback = callback;
    this.value = obj[key];//自身作为订阅者，注册到发布者中


}
Watcher.prototype.update = function() {
    this.value = this.obj[this.key];
    this.callback(this.value);
}