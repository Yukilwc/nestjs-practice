function MyVue(options) {
    this.$options = options;
    this.$data = options.data;
    this.$el = document.querySelector(options.el);
    this.init();
}
MyVue.prototype.init = function () {
    //发布者进行监听
    observer(this.$data);
    new Compile(this);
}