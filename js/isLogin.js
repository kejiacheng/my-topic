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

var xhr = createXMLHttpRequest();

xhr.open("post","isLogin.php",true);

xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
xhr.onreadystatechange = function(){
	if(xhr.readyState == 4 && xhr.status == 200){
		if(xhr.responseText == "没有登录"){
			location.href = "index.html";
		}else{
			var arr = JSON.parse(xhr.responseText);
			if(arr["login_way"] === "ordinaryuser"){
				location.href = "index.html";
			}else{
				var name = document.querySelector("#banner .wrapper .name");
				name.innerHTML = arr["name"];
			}
		}
	}
}
xhr.send();