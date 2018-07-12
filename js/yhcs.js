//商品架子
var commodityShelf = document.getElementById("commodityShelf");
var shelfs = commodityShelf.getElementsByClassName("shelf");
var shadows = commodityShelf.getElementsByClassName("shadow");
//左侧菜单列
var menuLists=document.getElementById("commodityShelf").getElementsByClassName("listUl")[0].getElementsByTagName("li");

//为轮播的每层准备需要变化的数据，封装在数组中
var scales = [0.5, 0.75, 1, 0.75, 0.5];
var lefts = [-187, -18, 150, 318, 478];
var zindexs = [7, 8, 9, 8, 7];
for (var i = 0; i < shelfs.length; i++) {
    shelfs[i].index = i;
    menuLists[i].index = i;
}




//返回下一次要跳转的位置
function returnIndex(dir,index) {
    if(dir==1){
        if (index == 0) {
            return shelfs.length - 1;
        } else {
            return index - 1;
        }
    }else if(dir==-1){
        if (index ==shelfs.length-1) {
            return 0;
        } else {
            return index +1;
        }
    }

}
//改变左侧list选中项
function changeChosed(index){
    var lists=document.getElementById("commodityShelf").getElementsByClassName("listUl")[0].getElementsByTagName("li");
    for(var i=0;i<lists.length;i++){
        lists[i].className="";
        lists[i].onmouseover="";
        lists[i].onmouseout="";
    }
    //添加class属性并添加移入移除事件
    lists[index].className="liChosed";
    lists[index].onmouseover = function () {
        clearInterval(timer);
        // console.log("inin");
    }
    lists[index].onmouseout = function () {
        timer = setInterval(function(){listMove(1,1)}, 2000);
        // console.log("out");
    }
}
//移动函数——向左/向右移动多少次
//1：向左   -1：向右
function listMove(dir,steps){
    var time=0;
    for(var j=0;j<steps;j++){
        setTimeout(function(){
            for (var i = 0; i < shelfs.length; i++) {
                //控制遮罩层的显示、消失、淡入
                if (returnIndex(dir,shelfs[i].index) == 2) {
                    // shadows[i].style.opacity = 0;
                    shadows[i].style.display = "none";
                } else {
                    shadows[i].style.opacity = 0.3;
                    shadows[i].style.display = "block";
                }
                shelfs[i].style.transform = "scale(" + scales[returnIndex(dir,shelfs[i].index)] + ")";
                shelfs[i].style.left = lefts[returnIndex(dir,shelfs[i].index)] + "px";
                shelfs[i].style.zIndex = zindexs[returnIndex(dir,shelfs[i].index)];
                shelfs[i].index = returnIndex(dir,shelfs[i].index);

                //对应正中间的一层，左侧列表对应的li被高亮
                if(shelfs[i].style.zIndex==9){
                    changeChosed(i);
                }
            }
        },time);
        time+=150;
    }
}


//启动定时器
var timer = setInterval(function(){listMove(1,1)}, 2000);


//给每个轮播页面添加鼠标移入移除、点击事件
for (var i = 0; i < shelfs.length; i++) {
    shelfs[i].onmouseover = function () {
        clearInterval(timer);
    }
    shelfs[i].onmouseout = function () {
        timer = setInterval(function(){listMove(1,1)}, 2000);
    }
    shelfs[i].onclick = function () {
        clearInterval(timer);
        //移动的步数
        var nums=this.index-2;
        listMove(nums>0?1:-1,nums>0?nums:-nums);
    }
}

//给左侧菜单列添加点击事件
for(var i=0;i<menuLists.length;i++){
    menuLists[i].onclick = function () {
        clearInterval(timer);
        var beforeIndex;
        for(var j=0;j<menuLists.length;j++){
            if(menuLists[j].className!=""){
                console.log("find");
                beforeIndex=j;
                break;
            }
        }

        //移动的步数
        var nums=this.index-beforeIndex;
        //使得移动的步数最少
        listMove(nums>0?(nums<=2?1:-1):(nums>=-2?-1:1),nums>0?(nums<=2?nums:5-nums):(nums>=-2?-nums:5+nums));
    }
}

