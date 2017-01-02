var login_way = document.getElementsByClassName("login_way"),
	way = "user_way";
//点击事件
for(var i=0;i<login_way.length;i++){
	login_way[i].onclick = function(){
		addClass(this,"selected");
		var otherObj = this.siblings();
		//获取对象的data-way的值
		way = this.dataset.way;
		for(var j=0;j<otherObj.length;j++){
			removeClass(otherObj[j],"selected");
		}
	}
}
//点击登录事件
var login_bt = document.getElementsByClassName("login_bt")[0],
	tableName = "ordinaryuser",
	username = document.getElementsByClassName("username")[0],
	password = document.getElementsByClassName("password")[0],
	wrong = document.getElementsByClassName("wrong")[0];

login_bt.onclick = function(){
	//先确定用户登录方式并决定使用数据库中的表
	if(way == "user_way"){
		tableName = "ordinaryuser";
	}else{
		tableName = "staffuser";
	}

	//获得账号密码的值
	var usernameValue = username.value,
		passwordValue = password.value;

	//ajax
    var xhr = createXMLHttpRequest();

    xhr.open("post","login.php",true);
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            if(xhr.responseText === "密码错误"){
            	wrong.innerHTML = xhr.responseText;
            	wrong.style.display = "inline";
            }else if(xhr.responseText === "账号不存在"){
            	wrong.innerHTML = xhr.responseText;
            	wrong.style.display = "inline";
            }else{
            	window.location = "index.html";
            	// alert(xhr.responseText);
     //        	window.name = xhr.responseText;
     //        	if(xhr.responseText.match(new RegExp("<staff>"))){
					// window.location = "index.html";
					// // window.location = "shopping_trolley.html";
     //        	}else{
     //        		window.location = "index.html";
     //        	}
            }
        }
    };
    xhr.send("tableName="+tableName+"&usernameValue="+usernameValue+"&passwordValue="+passwordValue);
}




//判断对象是否有这个class函数
function hasClass(obj,cls){
	return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
};
//给对象添加class函数
function addClass(obj,cls){
	if(!hasClass(obj,cls)) obj.className += " " + cls; 
};
//给对象删除class函数  
function removeClass(obj,cls){
	if(hasClass(obj,cls)){
		var reg = new RegExp('(\\s|^)' + cls +'(\\s|$)');
		obj.className = obj.className.replace(reg," ");
	}
};
//对象toggleClass事件函数  
function toggleClass(obj,cls){
	if(hasClass(obj,cls)){
		removeClass(obj,cls);
	}else{
		addClass(obj,cls);
	}
};
//对对象添加siblings方法
Object.prototype.siblings = function(){
	var _nodes = [],
        elem = this,
        _elem = this;
    while((_elem = _elem.previousSibling)){
    	if(_elem.nodeType === 1){
    		_nodes.push(_elem);
    	}
    }
    while((elem = elem.nextSibling)){
    	if(elem.nodeType === 1){
    		_nodes.push(elem);
    	}
    }
    return _nodes;
}

//创建XMLHttpRequest对象
function createXMLHttpRequest(){
    var xhr;
    try{
        xhr = new XMLHttpRequest();
    }
    catch(e){
        xhr = new ActiveXObject("Microsoft.XMLHTTP");//兼容ie
    }
    return xhr;
}
