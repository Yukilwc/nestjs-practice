function observer(data) {
    if(!data||typeof data!=="object")
    {
        //如果data是原始类型，空，函数，则不处理
        return;
    }
    //data是包含可枚举成员的对象

    //遍历data所有成员，让其成为订阅者
    Object.keys(data).forEach(key=> {
        defineReactive(data,key,data[key])
    })
}

function defineReactive(data, key, value) {
    observer(value);
    var dep = new Dep();
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            if(Dep.target)
            {
                dep.addSub(Dep.target)//添加当前的订阅者
            }
            return value;
        },
        set: function (newVal) {

            if(value!==newVal)
            {
                value = newVal;
                dep.notify();
               
            }
        }
    })
}

function Dep() {
    this.subs = [];
    var target = null;
}
Dep.prototype.notify = function () {
    this.subs.forEach(item=>{item.update()})
}
Dep.prototype.addSub = function (sub) {
    this.subs.push(sub);
}
