function Compile(vm){
    this.vm=vm;
    this.el=vm.$el;
    this.fragment=null;
    this.init();
}
Compile.prototype={
    //构造时执行，将vm挂载的html dom截取到fragment中，通过遍历检索mustache语法的存在：
    //1 初始化fragment中的变量
    //2 将其中的变量，作为参数(data,key,callback)，构造watcher，也就是生成订阅者
    // 上述操作完成后，将fragment中的节点剪切到el挂载的node上 
    init:function(){
        //输入el节点，将其所有子节点剥离，来创造一个fragment进行处理，提高效率，一次性更新
        this.fragment=this.createFragmentWithNode(this.el);
        //遍历fragment中的节点，进行初始化和watcher实例化
        this.compileFragment(this.fragment);
        //将编译完成的fragment返还给el挂载的node
        this.el.appendChild(this.fragment);
    },

    //函数参数：node类型对象
    //函数过程：通过node对象，构造一个fragment对象
    //函数返回：构造完成的fragment对象
    createFragmentWithNode:function(elNode){
        const fragment=document.createDocumentFragment();
        let first=elNode.firstChild;
        while(first)
        {
            fragment.appendChild(first);
            first=elNode.firstChild;
        }
        return fragment;
    },
    //函数参数：已经截取挂载节点的fragment对象
    //函数过程：递归遍历所有的节点，对其初始化和构造watcher
    //节点类型：
    //1 text类型，nodeType==3，是最底层节点
    //2 div span类型，nodeType==1,其中还存在childNodes,需要继续深层遍历
    //3 input类型，nodeType==1，内部不再有childNodes,是最底层节点
    compileFragment:function(fragment){
        let childs=fragment.childNodes;
        [...childs].forEach(node=>{
            if(node.childNodes&&node.childNodes.length)
            {
                compileFragment(node);
            }
            if(node.nodeType===3)
            {
                let reg=/\{\{(.*)\}\}/;
                let textMus=node.textContent;
                if(reg.test(textMus))
                {
                    let arrMus=test.match(reg);
                    let arrProp=arrMus.map(item=>{
                        return item.replace(/\{/g,'').replace(/\}/g,'');
                    });
                    arrProp.forEach(prop=>{
                        new Watcher(this.vm.$data,prop,value=>{
                            let text=textMus;
                            let regp=new RegExp("\\{\\{"+prop+"\\}\\}","g");
                            updateContent=text.replace(regp,value)
                            node.textContent=updateContent;
                        });
                    })

                }
            }
            else
            {

            }
        })
    }
}