//获取xhr对象
function getXhr() {
    var xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHttp");
    }
    return xhr;
}



//1.获取xhr对象
var xhr = getXhr();
//2.打开连接
    xhr.open("post", "data/loaddata.php", true);
//3.设置回调函数
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        //1.加载左侧商店移入显示界面数据
        var RES=JSON.parse(xhr.responseText);

        var resultArr=RES[0];

        var outLi = document.getElementById("showContainer").getElementsByClassName("outLi");
        var yhcs = outLi[0].getElementsByClassName("show")[0];
        var xxls = yhcs.getElementsByClassName("xxls")[0].getElementsByClassName("kinds")[0];
        var shyp = yhcs.getElementsByClassName("shyp")[0].getElementsByClassName("kinds")[0];

        var grbc = outLi[1].getElementsByClassName("show")[0];
        var cjsg = grbc.getElementsByClassName("cjsg")[0].getElementsByClassName("kinds")[0];
        var xpss = grbc.getElementsByClassName("xpss")[0];

        for(var i=0;i<resultArr.length;i=i+2){
            var origin=resultArr[i];
            var originDetail=resultArr[i+1];
            // console.log(origin);
            for(var j=0;j<originDetail.length;j=j+2){
                var largeClass=originDetail[j];
                var largeDetail=originDetail[j+1];
                // console.log(largeClass);
                for(var k=0;k<largeDetail.length;k=k+3){

                    var middleClass=largeDetail[k];
                    var middlePic=largeDetail[k+1];
                    var middleDetail=largeDetail[k+2];
                    // console.log(middleClass);


                    if(largeClass=="休闲零食"||largeClass=="常见水果"){
                            var dl = document.createElement('dl');
                            dl.className = "product";
                            var dt = document.createElement("dt");
                            dt.className = "product-name";
                            dt.innerHTML = middleClass;
                            dl.appendChild(dt);
                            var img = document.createElement("img");
                            img.src = middlePic;
                            dl.appendChild(img);
                            for(var t=0;t<middleDetail.length;t++){
                                var dd = document.createElement("dd");
                                dd.innerHTML = middleDetail[t];
                                dl.appendChild(dd);
                            }
                            if(largeClass=="休闲零食"){
                                xxls.append(dl);
                            }else if(largeClass=="常见水果"){
                                cjsg.appendChild(dl);
                            }
                        }
                    else if(largeClass=="生活用品"){
                            var unit=document.createElement("div");
                            unit.className="unit";

                            var span=document.createElement("span");
                            span.innerHTML=middleClass+"：";
                            unit.append(span);

                            var img=document.createElement("img");
                            img.src=middlePic;
                            unit.appendChild(img);

                            var ul=document.createElement("ul");
                            ul.className="list";
                            for(var p=0;p<middleDetail.length;p++){
                                var li=document.createElement("li");
                                li.innerHTML=middleDetail[p];
                                ul.appendChild(li);
                            }
                            unit.appendChild(ul);

                            var clear=document.createElement("div");
                            clear.className="clear";
                            unit.appendChild(clear);

                            shyp.append(unit);
                        }
                    else if(largeClass=="新品上市"){
                        // console.log(middlePic);
                        // console.log(middleDetail);
                        for(var u=0;u<middleDetail.length;u++){
                            var xp=document.createElement("div");
                            xp.className="xp-content";

                            var img=document.createElement("img");
                            img.src=middlePic;
                            xp.appendChild(img);

                            var p=document.createElement("p");
                            p.innerHTML=middleDetail[u];
                            xp.appendChild(p);

                            xpss.appendChild(xp);
                        }



                    }


                }

            }



        }




        //加载热门商品轮播数据
        var hotSp = document.getElementsByClassName("hotSp")[0].getElementsByClassName("hotSp-list")[0];
        var resultArr = JSON.parse(xhr.responseText)[1];
        for (var i = 0; i < resultArr.length; i++) {
            var item = resultArr[i];
            var li = document.createElement("li");
            li.className = "commodity-msg";
            var divone = document.createElement("div");
            divone.className = "rank";
            divone.innerHTML = "Top " + (i + 1);
            li.appendChild(divone);
            var img = document.createElement("img");
            img.src = item.productimg;
            li.appendChild(img);
            var divtwo = document.createElement("div");
            divtwo.className = "commodity";
            var name = document.createElement("span");
            name.className = "commodity-name";
            name.innerHTML = item.tradename;
            divtwo.appendChild(name);
            var price = document.createElement("span");
            price.className = "commodity-price";
            price.innerHTML = "价格:" + item.nowpri;
            divtwo.appendChild(price);
            var num = document.createElement("span");
            num.className = "commodity-sales-value";
            num.innerHTML = "销量:" + item.salesvolume + "份";
            divtwo.appendChild(num);
            li.appendChild(divtwo);
            hotSp.appendChild(li);
        }

        //编写热门商品自动轮播函数
        var hotLis = hotSp.getElementsByTagName("li");
        var lbLength=Math.floor(hotLis.length/4);
        hotSp.index=0;

        function hotLunbo(){
            if(hotSp.index==lbLength-1){
                hotSp.index=0;
            }else{
                hotSp.index++;
            }
            // console.log(-hotSp.index*400);
            hotSp.style.top=-hotSp.index*400+"px";
        }
        var timer=setInterval(hotLunbo,3000);
        hotSp.onmouseover=function(){
            clearInterval(timer);
        }

        hotSp.onmouseout=function(){
            timer = setInterval(hotLunbo, 3000);
        }




        //3.读取当日活动商品信息
        //当日活动
        var resultArr = JSON.parse(xhr.responseText)[2];
        var daily = document.getElementById("recommend").getElementsByClassName("re-content")[0];
        var yhcs = daily.getElementsByClassName("yhcs")[0].getElementsByClassName("container")[0];
        var xxls = yhcs.getElementsByClassName("ls-kind")[0].getElementsByClassName("cx-content")[0];
        var shyp = yhcs.getElementsByClassName("shyp-kind")[0].getElementsByClassName("cx-content")[0];

        var grbc=daily.getElementsByClassName("grbc")[0].getElementsByClassName("container")[0];
        var thcx = grbc.getElementsByClassName("thcx-kind")[0].getElementsByClassName("cx-content")[0];
        var xpss = grbc.getElementsByClassName("xpss-kind")[0].getElementsByClassName("cx-content")[0];


        //
        for (var i = 0; i < resultArr.length; i++) {
            var item = resultArr[i];
            // if(item.origin=="yhcs"){
            var content = document.createElement("div");
            content.className = "content";
            var img = document.createElement("img");
            img.className = "sp-img";
            img.src = item.productimg;
            content.appendChild(img);

            var detail = document.createElement("div");
            detail.className = "detail";
            var de_name = document.createElement("div");
            de_name.className = "de-name"
            de_name.innerHTML = item.tradename;
            detail.appendChild(de_name);
            var actPrice = document.createElement("div");
            actPrice.className = "actPrice";
            var oldPrice = document.createElement("div");
            oldPrice.className = "oriPrice";

            if (item.origin == "永辉超市") {
                actPrice.innerHTML = "<i>￥</i><em>" + item.nowpri + "</em>";
                oldPrice.innerHTML = "<i>￥</i><em>" + item.oldpri + "</em>";
            } else{
                actPrice.innerHTML = "<i>￥</i><em>" + item.nowpri + "</em><i>/斤</i>";
                oldPrice.innerHTML = "<i>￥</i><em>" + item.oldpri + "</em><i>/斤</i>";
            }
            detail.appendChild(actPrice);
            detail.appendChild(oldPrice);

            var amount = document.createElement("div");
            amount.className = "amount";
            if (item.surplus < 0) {
                amount.innerHTML = "余量充足";
            } else {
                if (item.origin == "永辉超市") {
                    amount.innerHTML = "剩余<em>" + item.surplus + "</em>"+item.spec;
                } else if (item.origin == "grbc") {
                    amount.innerHTML = "剩余<em>" + item.surplus + "</em>"+item.spec;
                }
            }
            detail.appendChild(amount);

            var qBtn = document.createElement("button");
            qBtn.className = "qBtn";
            qBtn.innerHTML = "抢！"
            detail.appendChild(qBtn);

            content.appendChild(detail);


            if (item.origin=="永辉超市"&&item.largeclass == "休闲零食") {
                xxls.appendChild(content);
            } else if (item.origin=="永辉超市"&&item.largeclass == "生活用品") {
                shyp.appendChild(content);
            }else if(item.origin=="果然不错" &&item.largeclass=="常见水果"){
                thcx.appendChild(content);
            }else if(item.origin=="果然不错" &&item.largeclass=="新品上市"){
                xpss.appendChild(content);
            }
        }


        //特价促销模块事件
        !function tjcx(){
            //点击商家名，隐藏该商家的商品
            var recommend = document.getElementById('recommend');
            var sj = recommend.getElementsByClassName('sj-name');
            var reContainer = recommend.getElementsByClassName('container');
            var sjDispplay = recommend.getElementsByClassName('display-sj');

            for (var i = 0; i < sj.length; i++) {
                reContainer[i].style.height=window.getComputedStyle(reContainer[i]).height;
                reContainer[i].nowHeight=parseInt(window.getComputedStyle(reContainer[i]).height);
                reContainer[i].closed=false;
                reContainer[i].kindSum=reContainer[i].getElementsByClassName("kind").length;
                for(var j=0;j<i;j++){
                    reContainer[i].kindSum+=reContainer[j].getElementsByClassName("kind").length;
                }
            }
            for (var i = 0; i < sj.length; i++) {
                sj[i].index = i;
                sj[i].onclick = function () {
                    var trueNum=reContainer[this.index].nowHeight;
                    if (reContainer[this.index].closed) {
                        reContainer[this.index].style.height=trueNum+'px';
                        sjDispplay[this.index].src = "img/减号0.png";
                        reContainer[this.index].closed=false;
                    } else {
                        reContainer[this.index].style.height=0;
                        sjDispplay[this.index].src = "img/加号0.png";
                        reContainer[this.index].closed=true;

                    }
                }
            }



            //点击类别名，隐藏该类别商品
            var kinds = recommend.getElementsByClassName('lb-name');
            var cx_contents = recommend.getElementsByClassName('cx-content');
            var displayFlags = recommend.getElementsByClassName('display-flag');
            for (var i = 0; i < cx_contents.length; i++) {
                cx_contents[i].nowHeight=parseInt(window.getComputedStyle(cx_contents[i]).height);
                console.log(i+" "+cx_contents[i].nowHeight);
                cx_contents[i].style.height=cx_contents[i].nowHeight+"px";
                cx_contents[i].closed=false;
            }
            for (var i = 0; i < kinds.length; i++) {
                kinds[i].index = i;
                kinds[i].onclick = function () {
                    var trueNum=cx_contents[this.index].nowHeight;
                    if (cx_contents[this.index].closed) {
                        cx_contents[this.index].style.height=trueNum+"px";
                        cx_contents[this.index].closed=false;
                        var recommend = document.getElementById('recommend');
                        var reContainer = recommend.getElementsByClassName('container');
                        for(var j=0;j<reContainer.length;j++){
                            if(this.index<reContainer[j].kindSum){
                                reContainer[j].nowHeight=reContainer[j].nowHeight+trueNum;
                                reContainer[j].style.height=reContainer[j].nowHeight+"px";
                                break;
                            }
                        }
                        displayFlags[this.index].src = "img/减号.png";
                    } else {
                        cx_contents[this.index].style.height=0;
                        cx_contents[this.index].closed=true;
                        var recommend = document.getElementById('recommend');
                        var reContainer = recommend.getElementsByClassName('container');
                        for(var j=0;j<reContainer.length;j++){
                            if(this.index<reContainer[j].kindSum){
                                reContainer[j].nowHeight=reContainer[j].nowHeight-trueNum;
                                reContainer[j].style.height=reContainer[j].nowHeight+"px";
                                break;
                            }
                        }

                        displayFlags[this.index].src = "img/加号.png";
                    }
                }
            }
        }();
    }












}
//4.设置消息头
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//5.发送请求数据
xhr.send(null);






function changePage(index) {
    var register = document.getElementById("register");
    var login = document.getElementById("login");
    if (index == 0) {
        login.style.display = 'block';
        register.style.display = 'none';
    } else if (index == 1) {
        login.style.display = 'none';
        register.style.display = 'block';
    }
}

function $(id) {
    return document.getElementById(id);
}

function tip(index) {
    var value = $('register').getElementsByTagName('tr')[index].getElementsByTagName('input')[0].value;
    var tip_word = $('register').getElementsByClassName('tip')[index];
    var warn_word = $('register').getElementsByClassName('warning')[index];
    if (value == '') {
        if (index == 0) {
            tip_word.innerHTML = "用户名长度在6到9位之间";
        } else if (index == 1) {
            tip_word.innerHTML = "密码长度在6到12位之间";
        } else if (index == 2) {
            tip_word.innerHTML = "密码长度在6到12位之间";
        } else if (index == 3) {
            tip_word.innerHTML = "请输入合法的邮箱地址";
        } else {
            tip_word.innerHTML = "请输入合法的手机号"
        }
    }
    tip_word.style.display = 'block';
    warn_word.style.display = 'none';
}

function check(index) {
    var value = $('register').getElementsByTagName('tr')[index].getElementsByTagName('input')[0].value;
    var tip_word = $('register').getElementsByClassName('tip')[index];
    var warn_word = $('register').getElementsByClassName('warning')[index];
    if (value != '') {
        tip_word.style.display = 'none';
        if (index == 2) {
            var upwd = $('register').getElementsByClassName('upwd')[0].value;
            var cpwd = $('register').getElementsByClassName('cpwd')[0].value;
            if (upwd != cpwd) {
                warn_word.innerHTML = "两次密码不一致!";
                tip_word.style.display = "none";
                warn_word.style.display = 'block';
            }
        }
    } else {
        if (index == 0) {
            warn_word.innerHTML = "用户名不能为空";
        } else if (index == 1) {
            warn_word.innerHTML = "密码不能为空";
        } else if (index == 2) {
            warn_word.innerHTML = "密码不能为空";
        } else if (index == 3) {
            warn_word.innerHTML = "邮箱地址不能为空";
        } else {
            warn_word.innerHTML = "手机号不能为空";
        }
        tip_word.style.display = "none";
        warn_word.style.display = 'block';
    }
}


function register() {
    //接收数据
    var register = $('register');
    var uname = register.getElementsByClassName('uname')[0].value;
    var upwd = register.getElementsByClassName('upwd')[0].value;
    var email = $('email').value;
    var phone = $('phone').value;
    //通过AJAX发送请求数据
    if (uname != '' && uname != null && upwd != '' && upwd != null && email != '' && email != null && phone != '' && phone != null) {
        // var xhr=getXhr();
        // xhr.open('post','data/register.php',true);
        // xhr.onreadystatechange=function(){
        //     if(xhr.readyState==4&&xhr.status==200){
        //         alert(xhr.responseText);
        //     }
        // }
        // xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        // var msg="uname="+uname+"&upwd="+upwd+"&email="+email+"&phone="+phone;
        // xhr.send(msg);

    } else {
        alert("信息不全，提交失败！");
    }
}

//数据渲染完毕再进行操作
window.onload = function () {
    //设置header与wtContainer的宽度
    var header=document.getElementById("header");
    var wtContainer=document.getElementById("wtContainer")
    var htmlWidth=document.getElementsByTagName("html")[0].offsetWidth;
    var bodyWidth=document.body.offsetWidth;
    var needLeft=parseInt((htmlWidth-bodyWidth)/2);
    // console.log(bodyWidth);

    header.style.width=htmlWidth+"px";
    wtContainer.style.width=htmlWidth+"px";
    header.style.left=-needLeft+"px";
    wtContainer.style.left=-needLeft+"px";


    // alert("1");



    //入驻商家UL移入移出
    var showContainer = document.getElementById('showContainer');
    var merchants = showContainer.getElementsByClassName('merchantUl')[0].getElementsByClassName('outLi');
    var sjcontainer = showContainer.getElementsByClassName('container')[0];
    var showMerchants = showContainer.getElementsByClassName('show');
// console.log(showMerchants.length);
    for (var i = 0; i < merchants.length; i++) {
        merchants[i].index = i;
        merchants[i].onmouseover = function () {
            sjcontainer.style.display = 'block';
            for (var j = 0; j < showMerchants.length; j++) {
                showMerchants[j].style.display = 'none';
            }
            // console.log(this.index);

            showMerchants[this.index].style.display = 'block';

        }
        merchants[i].onmouseout = function () {
            // alert(window.getComputedStyle(container).display);
            // if(window.getComputedStyle(container).display)
            sjcontainer.style.display = 'none';
            for (var j = 0; j < showMerchants.length; j++) {
                showMerchants[j].style.display = 'none';
            }
            // showMerchants[this.index].style.display='block';
        }
    }



//轮播图事件
    var lbContainer = showContainer.getElementsByClassName("lbContainer")[0];
    var left = lbContainer.getElementsByClassName('left')[0].getElementsByTagName('img')[0];
    var right = lbContainer.getElementsByClassName('right')[0].getElementsByTagName('img')[0];
    var lbImgs = lbContainer.getElementsByClassName('lunboUl')[0].getElementsByTagName('img');
    var lbyqs = lbContainer.getElementsByClassName('lunbo-yq')[0].getElementsByTagName('span');
    var index = 0;
    var timer = null;


//向左轮播
    function handOverLeft() {
        startMove(lbImgs[index], {"opacity": 0});
        if (index == lbImgs.length - 1) {
            startMove(lbImgs[0], {"opacity": 100});
        } else {
            startMove(lbImgs[index + 1], {"opacity": 100});
        }
        for (var i = 0; i < lbImgs.length; i++) {
            lbyqs[i].className = '';
        }
        lbyqs[index].className = 'chosed';
        if (index == lbImgs.length - 1) {
            index = 0;
        } else {
            index++;
        }
    }

//向右轮播
    function handOverRight() {
        startMove(lbImgs[index], {"opacity": 0});
        if (index == 0) {
            startMove(lbImgs[lbImgs.length - 1], {"opacity": 100});
        } else {
            startMove(lbImgs[index - 1], {"opacity": 100});
        }
        for (var i = 0; i < lbImgs.length; i++) {
            lbyqs[i].className = '';
        }
        lbyqs[index].className = 'chosed';
        if (index == 0) {
            index = lbImgs.length - 1;
        } else {
            index--;
        }
    }

//自动轮播函数
    function startLunbo() {
        timer = setInterval(handOverRight, 2000);
    }

//启动自动轮播
    startLunbo();
//移入图片中，停止移动
    for (var i = 0; i < lbImgs.length; i++) {
        lbImgs[i].onmouseover = function () {
            clearInterval(timer);
        }
        lbImgs[i].onmouseout = function () {
            startLunbo();
        }
    }
//点击左右轮换标签
    right.onclick = function () {
        clearInterval(timer);
        handOverRight();
        startLunbo();
    }
    left.onclick = function () {
        clearInterval(timer);
        handOverLeft();
        startLunbo();
    }

    for (var i = 0; i < lbyqs.length; i++) {
        lbyqs[i].index = i;
        lbyqs[i].onmouseover = function () {
            clearInterval(timer);
            index = this.index;
            handOverRight();
        }
        lbyqs[i].onmouseout = function () {
            startLunbo();
        }
    }




//登陆注册事件
    var header = document.getElementById("header");

    var login = document.getElementById("login");
    var loginBtn = header.getElementsByClassName("noteLogin")[0];
    var loginClose = login.getElementsByClassName("closeImg")[0].getElementsByTagName("img")[0];
    var registerIn = header.getElementsByClassName("registerIn")[0];
    var registerClose = document.getElementById("register").getElementsByClassName("closeImg")[0].getElementsByTagName("img")[0];

    loginBtn.onclick = function () {
        var mask = document.getElementById("mask");
        var login = document.getElementById("login");
        mask.style.display = 'block';
        login.style.display = 'block';
    }
    loginClose.onclick = function () {
        var mask = document.getElementById("mask");
        var login = document.getElementById("login");
        mask.style.display = 'none';
        login.style.display = 'none';
    }
    registerIn.onclick = function () {
        var mask = document.getElementById("mask");
        var register = document.getElementById("register");
        mask.style.display = 'block';
        register.style.display = 'block';
    }
    registerClose.onclick = function () {
        var mask = document.getElementById("mask");
        var register = document.getElementById("register");
        mask.style.display = 'none';
        register.style.display = 'none';
    }

}














