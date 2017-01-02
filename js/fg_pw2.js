     //创建cookie对象
var CookieUtil = {
    get: function(name){
        var cookieName = encodeURIComponent(name) + "=",
            cookieStart = document.cookie.indexOf(cookieName),
            cookieValue;
        if(cookieStart > -1){
            var cookieEnd = document.cookie.indexOf(";" , cookieStart);
            if(cookieEnd == -1){
                cookieEnd = document.cookie.length;
            }
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length , cookieEnd));
        }
        return cookieValue;
    },

    set: function(name , value , expires , path , domain , secure){
        var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);


        var date = new Date();
        date.setTime(date.getTime() + expires*1000);
        cookieText += "; expires=" + date.toGMTString();

        if(path){
            cookieText += "; path=" + path;
        }
        if(domain){
            cookieText += "; domain=" + domain;
        }
        if(secure){
            cookieText += "; secure";
        }
        document.cookie = cookieText;
    },

    unset: function(name , path , domain , secure){
        this.set(name , "" , new Date(0) , path , domain , secure);
    }
};


var vertify_text = document.getElementsByClassName("vertify_text")[0],
    username = document.getElementsByClassName("username")[0],
    vertify = document.getElementsByClassName("vertify")[0],
    pass_vertify = 0;

//获取cookie里的过期时间，并写入
(function(){
    var outTime = CookieUtil.get("date"),//获取过期时间ms
        nowTime = new Date(),
        nowTime = nowTime.getTime();//获取当前时间ms

    if(outTime){
        var time = Math.floor((outTime - nowTime)/1000);//得到剩余时间s

        //写入时间
        vertify_text.innerHTML = time--;
        //定时器事件
        var timing = setInterval(function(){
                //将时间写入vertify_text
                vertify_text.innerHTML = time--;

                //当时间小于0时，清楚定时器，并改变vertify_text的值
                if(time <= 0){
                    clearInterval(timing);
                    vertify_text.innerHTML = "获取验证码";
                }
            },1000)
    }
    
})();


// 该变量为手机上收到的的验证码
var real_vertify = "";

//点击发送验证码，使用中国网建短信平台
//cookie事件，60s内无法再次点击发送短信
vertify_text.onclick = function(){
    var vertify_textValue = vertify_text.innerHTML;

    if(vertify_textValue === "获取验证码"){

        var date = new Date(),//获取当前时间
            expires = 60, //过期时间为60s
            time = expires //将expires的值赋给time

        date  = date.getTime() + expires*1000;//过期时间

        //将到期时间写入cookie
        CookieUtil.set("date",date,expires);


        //写入时间
        vertify_text.innerHTML = time--;
        //定时器事件
        var timing = setInterval(function(){
            //将时间写入vertify_text
            vertify_text.innerHTML = time--;

            //当时间小于0时，清楚定时器，并改变vertify_text的值
            if(time <= 0){
                clearInterval(timing);
                vertify_text.innerHTML = "获取验证码";
            }
        },1000)

        //创建ajax并向php发送post请求并从php返回一个验证码
        var usernameValue = username.value;

        var xhr = createXMLHttpRequest();

        xhr.open("post","message.php",true);
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
                real_vertify = xhr.responseText;
            }
        };
        xhr.send("username="+usernameValue);
    }
    
};

//vertify获取焦点事件
vertify.onfocus = function(){
    origin(vertify);
}


//vertify失去焦点事件
vertify.onblur = function(){
    var vertifyValue = vertify.value;//输入的验证码
    
        if(vertifyValue == ""){
            error(vertify);
            pass_vertify = 0;
            return;
        }
        if(real_vertify.toLowerCase() === vertifyValue.toLowerCase()){
            origin(vertify);
            pass_vertify = 1;
        }else{
            error(vertify);
            pass_vertify = 0;
        }
}


//表单模拟事件
var confirm_user_bt = document.getElementsByClassName("confirm_user_bt")[0],
    myForm = document.getElementById("myForm");

confirm_user_bt.onclick = function(){
    if(pass_vertify == 1){
        myForm.submit();
    }else{
        alert("输入验证码错误");
    }
}







//创建XMLHttpRequest
function createXMLHttpRequest(){
    var xhr;
    try{
        xhr = new XMLHttpRequest();
    }
    catch(e){
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return xhr;
}

    //错误特效
function error(obj){

    obj.style.borderColor = "#cc0000";
    obj.style.borderStyle = "solid";
    obj.style.background = "#fef0ef";
    obj.style.color = "#cc0000";
}

//原始特效
function origin(obj){

    obj.style.borderColor = "";
    obj.style.borderStyle = "";
    obj.style.background = "";
    obj.style.color= "black";
}
