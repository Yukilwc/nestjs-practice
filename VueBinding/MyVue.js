function MVue(options) {
    this.options = options;
    this.data = options.data;
    this.el = document.querySelector(options.el);
}
MVue.prototype.init = function () {
    observer(this.data);
    this.el.textContent = this.data["array"][0];
    new Watcher(this.data, "array", value=> {
        this.el.textContent = value;
    })
}