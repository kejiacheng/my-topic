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



//创建XMLHttpRequest对象
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
window.onload =function(){
    //pass_x 判断各个input是否正确
    var pass_phone = 0;
    var pass_username = 0;
    var pass_password = 0;
    var pass_cf_pw = 0;
    var pass_vertify = 0;
    var phone = document.getElementsByClassName("phone")[0];
    var username = document.getElementsByClassName("username")[0];
    var password = document.getElementsByClassName("password")[0];
    var confirm_password = document.getElementsByClassName("confirm-password")[0];
    var vertify = document.getElementsByClassName("vertify")[0];
    var tip_phone = document.getElementsByClassName("tip-phone")[0];
    var tip_username = document.getElementsByClassName("tip-username")[0];
    var tip_password = document.getElementsByClassName("tip-password")[0];
    var tip_cf_pw = document.getElementsByClassName("tip-cf-pw")[0];
    var tip_vertify = document.getElementsByClassName("tip-vertify")[0];
    var r_x_phone = document.getElementsByClassName("r-x-phone")[0];
    var r_x_username = document.getElementsByClassName("r-x-username")[0];
    var r_x_password = document.getElementsByClassName("r-x-password")[0];
    var r_x_cf_pw = document.getElementsByClassName("r-x-cf-pw")[0];
    var r_x_vertify = document.getElementsByClassName("r-x-vertify")[0];

    //手机号获取焦点事件
    phone.onfocus =function(){
        tip_phone.innerHTML = "手机号可用于登录、找回密码等服务";
        origin(phone,"phone");
    };

    //手机号失去焦点事件
    phone.onblur = function(){
        var reg = /^1[3|4|5|7|8]\d{9}$/g;
        var phoneValue = phone.value;

        //当手机号为空时
        if(phoneValue == ""){
            tip_phone.innerHTML = "手机号可用于登录、找回密码等服务";
            tip_phone.style.color = "black";
            pass_phone = 0;
            return;
        }

        //判断手机号格式是否正确
        if(!reg.test(phoneValue)){
            tip_phone.innerHTML = "手机格式不正确，请重新输入";
            error(phone,"phone");
            pass_phone = 0;
            return;
        }
        //ajax
        var xhr = createXMLHttpRequest();

        xhr.open("post","giveit.php",true);
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
                tip_phone.innerHTML = xhr.responseText;
                if("通过！" == xhr.responseText){
                    r_x_phone.style.background = "url('img/r.png')";
                    pass_phone = 1;
                }else if("该手机号已存在"){
                    error(phone,"phone");
                    pass_phone = 0;
                }
            }
        };
        xhr.send("phone="+phoneValue+"&index="+"0");
    };
    //账户名获得焦点事件
    username.onfocus = function(){
        tip_username.innerHTML = "请输入2-8位账号名";
        origin(username,"username");
    };
    //账户名失去焦点事件
    username.onblur = function(){
        var reg = /^[A-Za-z0-9\u4E00-\u9FA5-]{2,8}$/g;
        var reg1 = /^\d{2,8}$/g;
        var userValue = username.value;

        //账户名为空时
        if(userValue == ""){
            tip_username.innerHTML = "请输入2-8位账号名";
            tip_username.style.color = "black";
            pass_username = 0;
            return;
        }

        //账户名为纯数字
        if(reg1.test(userValue)){
            tip_username.innerHTML = "账号名不能纯数字";
            error(username,"username");
            pass_username = 0;
            return;
        }

        //判断账户名格式是否正确
        if(!reg.test(userValue)){
            tip_username.innerHTML = "用户名格式不正确";
            error(username,"username");
            pass_username = 0;
            return;
        }

        //ajax
        var xhr = createXMLHttpRequest();

        xhr.open("post","giveit.php",true);
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
                tip_username.innerHTML = xhr.responseText;
                if("通过！" == xhr.responseText){
                    r_x_username.style.background = "url('img/r.png')";
                    pass_username = 1;
                }else if("该用户名已存在"){
                    error(username,"username");
                    pass_username = 0;
                }
            }
        };
        xhr.send("name="+userValue+"&index="+"1");
    };

    //密码获取焦点事件
    password.onfocus = function(){
        tip_password.innerHTML = "请输入6-10位登录密码";
        origin(password,"password");
    };

    //密码失去焦点事件
    password.onblur = function(){
        var reg = /^\w{6,10}$/g;
        var pwValue = password.value,
            cf_pwValue = confirm_password.value;
        //密码为空时
        if(pwValue == ""){
            tip_password.innerHTML = "请输入6-10位登录密码";
            tip_password.style.color = "black";
            pass_password = 0;
            return;
        }

        //判断密码格式是否正确
        if(!reg.test(pwValue)){
            tip_password.innerHTML = "密码由6-10位字母，数字，下划线组成";
            error(password,"password");
            pass_password = 0;
            return;
        }else{
            if(cf_pwValue === ""){
                pass_password = 1;
                tip_password.innerHTML = "通过";
                r_x_password.style.background = "url('img/r.png')";
                origin(password,"password");
            }else if(cf_pwValue !== ""){
                if(pwValue === cf_pwValue){
                    pass_password = 1;
                    pass_cf_pw = 1;
                    origin(password,"password");
                    origin(confirm_password,"cf-pw");
                    tip_password.innerHTML = "通过";
                    r_x_password.style.background = "url('img/r.png')";
                    tip_cf_pw.innerHTML = "通过";
                    r_x_cf_pw.style.background = "url('img/r.png')";
                }else{
                    pass_cf_pw = 0;
                    error(confirm_password,"cf-pw");
                    tip_cf_pw.innerHTML = "密码不一致";
                    r_x_cf_pw.style.background = "url('img/r.png')";
                }
            }
            tip_password.innerHTML = "通过";
            r_x_password.style.background = "url('img/r.png')";
            pass_password = 1;
        }
    };

    //确认密码获取焦点事件
    confirm_password.onfocus = function(){
        tip_cf_pw.innerHTML = "请确认密码";
        origin(confirm_password,"cf-pw");
    };

    //确认密码失去焦点事件
    confirm_password.onblur = function(){
        var cf_pwValue = confirm_password.value;
        var pwValue = password.value;

        //确认密码为空时
        if(cf_pwValue == ""){
            tip_cf_pw.innerHTML = "请确认密码";
            tip_cf_pw.style.color = "black";
            pass_cf_pw = 0;
            return;
        }

        //确认密码与密码不一致
        if(cf_pwValue == pwValue){
            tip_cf_pw.innerHTML = "通过";
            r_x_cf_pw.style.background = "url('img/r.png')";
            pass_cf_pw = 1;
        }else{
            tip_cf_pw.innerHTML = "密码不一致";
            error(confirm_password,"cf-pw");
            pass_cf_pw = 0;
        }
    };

    var get_vertify = document.getElementsByClassName("get-vertify")[0];

    // 该变量为手机上收到的的验证码
    var real_vertify;

(function(){
    var outTime = CookieUtil.get("date1"),//获取过期时间ms
        nowTime = new Date(),
        nowTime = nowTime.getTime();//获取当前时间ms

    if(outTime){
        var time = Math.floor((outTime - nowTime)/1000);//得到剩余时间s

        //写入时间
        get_vertify.innerHTML = time--;
        //定时器事件
        var timing = setInterval(function(){
                //将时间写入vertify_text
                get_vertify.innerHTML = time--;

                //当时间小于0时，清楚定时器，并改变vertify_text的值
                if(time <= 0){
                    clearInterval(timing);
                    get_vertify.innerHTML = "获取验证码";
                }
            },1000)
    }
    
})();

    //点击发送验证码，使用中国网建短信平台
    get_vertify.onclick = function(){
        get_vertifyValue = get_vertify.innerHTML;
        if(pass_phone == 1 && get_vertifyValue ===  "获取验证码"){
            var phoneValue = phone.value;

            var date = new Date(),//获取当前时间
            expires = 60, //过期时间为60s
            time = expires //将expires的值赋给time

            date  = date.getTime() + expires*1000;//过期时间

            //将到期时间写入cookie
            CookieUtil.set("date1",date,expires);

            //写入时间
            get_vertify.innerHTML = time--;
            //定时器事件
            var timing = setInterval(function(){
                //将时间写入vertify_text
                get_vertify.innerHTML = time--;

                //当时间小于0时，清楚定时器，并改变vertify_text的值
                if(time <= 0){
                    clearInterval(timing);
                    get_vertify.innerHTML = "获取验证码";
                }
            },1000)

            var xhr = createXMLHttpRequest();

            xhr.open("post","giveit.php",true);
            xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4 && xhr.status == 200){
                    tip_vertify.innerHTML = "查收手机验证码，并验证";
                    real_vertify = xhr.responseText;
                }
            };
            xhr.send("phone="+phoneValue+"&index="+"2");
        }
    };

    //验证码获得焦点事件
    vertify.onfocus = function(){
        tip_vertify.innerHTML = "请输入验证码";
        origin(vertify,"vertify");
    };

    //验证码失去焦点事件
    vertify.onblur = function(){
        var vertifyValue = vertify.value;

        if(vertifyValue == ""){
            tip_vertify.innerHTML = "请输入验证码";
            tip_vertify.style.color = "black";
            pass_vertify = 0;
            return;
        }

        vertifyValue = vertifyValue.toLowerCase();
        real_vertify = real_vertify.toLowerCase();

        if(vertifyValue == real_vertify){
            tip_vertify.innerHTML = "通过";
            tip_vertify.style.color = "black";
            r_x_vertify.style.background = "url('img/r.png')";
            pass_vertify = 1;
        }else{
            tip_vertify.innerHTML = "验证错误";
            error(vertify,"vertify");
            pass_vertify = 0;
        }

    }

    var register_bt = document.getElementsByClassName("register-bt")[0],
        isclick = 1;

    //注册按钮事件
    register_bt.onclick = function(){

        // if(pass_phone == 1 && pass_username == 1 && pass_password == 1 && pass_cf_pw == 1 && pass_vertify == 1 && isclick == 1){
        if(pass_phone == 1 && pass_username == 1 && pass_password == 1 && pass_cf_pw == 1 && isclick == 1 && pass_vertify == 1){
            //使注册按钮只能点击一次
            isclick = 0;
            var xhr = createXMLHttpRequest(),
                phoneValue = phone.value,
                usernameValue = username.value,
                passwordValue = password.value;

            xhr.open("post","giveit.php",true);
            xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4 && xhr.status == 200){
                    window.location = "index.html";
                }
            };
            xhr.send("phone="+phoneValue+"&username="+usernameValue+"&password="+passwordValue+"&index="+"3");
        }
    }
};


//错误特效
function error(obj , string){
    var tip = document.getElementsByClassName("tip-" + string)[0];
    var r_x = document.getElementsByClassName("r-x-" + string)[0];

    tip.style.color = "rgb(204, 0, 0)";
    r_x.style.background = "url('img/xx.png')";
    obj.style.borderColor = "#cc0000";
    obj.style.borderStyle = "solid";
    obj.style.background = "#fef0ef";
    obj.style.color = "#cc0000";
}

//原始特效
function origin(obj , string){
    var tip = document.getElementsByClassName("tip-" + string)[0];
    var r_x = document.getElementsByClassName("r-x-" + string)[0];
    var pass = document.getElementsByClassName("pass-" + string)[0];

    r_x.style.background = "";
    tip.style.color = "black";
    obj.style.borderColor = "";
    obj.style.borderStyle = "";
    obj.style.background = "";
    obj.style.color= "black";
}
