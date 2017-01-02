var username = document.getElementsByClassName("username")[0],
	vertify = document.getElementsByClassName("vertify")[0],
	vertify_text = document.getElementsByClassName("vertify_text")[0],
	real_vertify = createVertify(),//产生一个随机数
	pass_username = 0,
	pass_vertify = 0;

//将随机产生的随机数写入变量vertify_text中
vertify_text.innerHTML = real_vertify;


//username获取焦点事件
username.onfocus = function(){
	origin(username);
}
//username失去焦点事件
username.onblur = function(){
	var reg = /^1[3|4|5|7|8]\d{9}$/g,
        usernameValue = username.value;

    //判断手机号格式是否正确
    if(!reg.test(usernameValue)){
        error(username);
        pass_username = 0;
    }else{
    	pass_username = 1;
    }
}

//vertify获取焦点事件
vertify.onfocus = function(){
	origin(vertify);
}


//vertify失去焦点事件
vertify.onblur = function(){
	var real_vertify = vertify_text.innerHTML,//产生的验证码
		vertifyValue = vertify.value;//输入的验证码

		if(real_vertify.toLowerCase() === vertifyValue.toLowerCase()){
			origin(vertify);
			pass_vertify = 1;
		}else{
			error(vertify);
			pass_vertify = 0;
		}
}

//点击换验证码事件
vertify_text.onclick = function(){
	real_vertify = createVertify();
	vertify_text.innerHTML = real_vertify;
}

//表单提交
var confirm_user_bt = document.getElementsByClassName("confirm_user_bt")[0],
	myForm = document.getElementById("myForm");

confirm_user_bt.onclick = function(){
	if(pass_username == 1 && pass_vertify ==1){
		myForm.submit();
	}else{
		alert("请输入正确的信息");
	}
	
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

//产生一个4位的验证码
function createVertify(){
	var vertify = "",
		randomNum = 0;

	
	for(var i=0;i<4;){
		//产生一个范围在48-122的随机数
		randomNum = Math.floor(Math.random()*75+48);
		//判断随机数的范围
		if((randomNum>=48&&randomNum<=57)||(randomNum>=65&&randomNum<=90)||(randomNum>=97&&randomNum<=122)){
			//将随机数的unicode码转为字符并写入变量vertify
			vertify += String.fromCharCode(randomNum);
			i++;
		}
	}
	return vertify;
}
