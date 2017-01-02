var password = document.getElementsByClassName("password")[0],
	cf_pw = document.getElementsByClassName("cf_pw")[0],
	pass_password = 0,
	pass_cf_pw = 0;

//密码获取焦点事件
password.onfocus = function(){
	origin(password);
}

//密码失去焦点事件
password.onblur = function(){
	var reg = /^\w{6,10}$/g,
		passwordValue = password.value,
		cf_pwValue = cf_pw.value;

	if(!reg.test(passwordValue)){
		pass_password = 0;
		error(password);
		return;
	}else{
		if(cf_pwValue === ""){
			pass_password = 1;
			origin(password);
		}else if(cf_pwValue !== ""){
			if(passwordValue === cf_pwValue){
				pass_password = 1;
				pass_cf_pw = 1;
				origin(password);
				origin(cf_pw);
			}else{
				pass_cf_pw = 0;
				error(cf_pw);
			}
			
		}
		
	}
}

//确认密码获取焦点事件
cf_pw.onfocus = function(){
	origin(cf_pw);
}

//确认密码失去焦点事件
cf_pw.onblur = function(){
	var cf_pwValue = cf_pw.value,
		passwordValue = password.value;

	if((cf_pwValue === passwordValue) && (cf_pwValue !== "")){
		pass_cf_pw = 1;
		// pass_password = 1;
		origin(cf_pw);
		// origin(password);
	}else{
		pass_cf_pw = 0;
		error(cf_pw);
	}
}

var confirm_user_bt = document.getElementsByClassName("confirm_user_bt")[0];

//点击事件触发ajax
confirm_user_bt.onclick = function(){
	if(pass_password == 1 && pass_cf_pw == 1){
		alert("触发ajax");
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