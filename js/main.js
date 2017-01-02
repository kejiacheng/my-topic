var bodyHeight = document.body.clientHeight;

//判断是否登录事件
(function(){
	var prev_login = document.getElementsByClassName("prev_login"),
		after_login = document.getElementsByClassName("after_login")[0],
		personal_wrapper_box_list = document.getElementsByClassName("personal_wrapper_box_list")[0];
		// name = window.name;

	var xhr = createXMLHttpRequest();

    xhr.open("post","isLogin.php",true);

    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            if(xhr.responseText === "没有登录"){
            	// console.log("没有登录");
            }else{
            	var arr = JSON.parse(xhr.responseText);

            	for(var i=0;i<prev_login.length;i++){
		 			prev_login[i].style.display = "none";
		 		}
		 		//判断是普通账号还是员工账号
		 		if(arr["login_way"] === "ordinaryuser"){
		 			personal_wrapper_box_list.innerHTML = "<a href='personal_zone.php'><li>个人中心</li></a><a><li  class='exit_login'>退出</li></a>";
		 		}else if(arr["login_way"] === "staffuser"){
		 			personal_wrapper_box_list.innerHTML = "<a href='personal_zone.php'><li>个人中心</li></a><a href='backstage.html'><li>员工后台</li></a><a class='exit_login'><li>退出</li></a>";
		 		}
		 		after_login.innerHTML = arr["name"];
		 		after_login.style.display = "block";
		 		exit_login();
		 		prev_goods();
		 		//添加用户以往购物清单到购物车
		 		function prev_goods(){
		 			var xhr = createXMLHttpRequest();

		 			xhr.open("post","personal_goods.php",true);

		 			xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");

		 			xhr.onreadystatechange = function(){
		 				if(xhr.readyState == 4 && xhr.status == 200){
		 					var arr = JSON.parse(xhr.responseText),
		 						goods_arr
		 						str = "";
		 					//用户没有购物经历
		 					if(arr.length == 0){
		 						return;
		 					}
		 					//最后购物经历在最前
		 					arr.reverse();
		 					var have_content = document.getElementsByClassName("have_content")[0],
		 						not_content = document.getElementsByClassName("not_content")[0];
		 					//循环将购物经历的详细情况拼装成字符串形式
		 					for(var i=0;i<arr.length;i++){
		 						goods_arr = arr[i][1].split("|");
		 						str += '<div class="buy_items"><div class="order_number">订单编号：<span>' + arr[i][0]+ '</span></div><div class="buy_items_ingredients_accessories"><p class="buy_items_ingredients">主料：<span class="buy_items_ingredients_content">' + goods_arr[0] + '</span></p><p class="buy_items_accessories">辅料：<span class="buy_items_ingredients">'
		 						//改变辅料显示方式
		 						for(var j=2;j<goods_arr.length;j=j+2){
		 							//判断是否为最后一个辅料
		 							if(j == goods_arr.length-2){
		 								str += goods_arr[j] + "*" + goods_arr[j+1];
		 							}else{
		 								str += goods_arr[j] + "*" + goods_arr[j+1] + "+";
		 							}
		 						}

		 						str += '</span></p></div><div class="price_data"><p class="price">¥<span>' + arr[i][2] + '</span></p><p class="time">' + arr[i][3] + '</p></div></div>'
		 					}
		 					//将not_content对象不显示
		 					not_content.style.display = "none";
		 					//下面2行为将str写入have_content对象中并显示
		 					have_content.innerHTML = str;
		 					have_content.style.display = "block";
		 				}
		 			}

		 			xhr.send("name="+arr["name"]);
		 		}

            }
            
        }
        //用户退出函数
        function exit_login(){
        	var exit_login = document.getElementsByClassName("exit_login")[0];

        	exit_login.onclick = function(){
        		var xhr = createXMLHttpRequest();

		        xhr.open("post","exit_login.php",true);
		        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		        xhr.onreadystatechange = function(){
		        	if(xhr.readyState == 4 && xhr.status == 200){
		        		history.go(0);
		        	}
		    //         for(var j=0;j<prev_login.length;j++){
			 		// 	prev_login[j].style.display = "block";
			 		// }
			 		// after_login.innerHTML = "";
			 		// personal_wrapper_box_list.innerHTML= "";
		 			// after_login.style.display = "none";
		 			// arr = {};
		        };
		        xhr.send();
        	}
        }
    };
    xhr.send();
	// if(name){

	// 	//头部显示
	// 	(function(){
	// 		for(var i=0;i<prev_login.length;i++){
	// 			prev_login[i].style.display = "none";
	// 		}
	// 			if(name.match(RegExp("<staff>"))){
	// 				name = name.replace(RegExp("<staff>"),"");
	// 				after_login.innerHTML = name;
	// 			}else{
	// 				after_login.innerHTML = name;
	// 			}
				
	// 			after_login.style.display = "block";
	// 	})();	
	// }else{
		
	// }
})();

//个人栏事件
(function(){

	var username = document.getElementsByClassName("username")[0],
		personal_wrapper_box = document.getElementsByClassName("personal_wrapper_box")[0],
		personal_wrapper = document.getElementsByClassName("personal_wrapper")[0];

		username.onmouseover = function(){
			personal_wrapper_box.style.display = "block";
		}

		personal_wrapper.onmousemove = function(){
			personal_wrapper_box.style.display = "block";
			username.style.background = "#86ffec";
			username.style.color = "#ff0068";
		}
		personal_wrapper.onmouseleave = function(){
			personal_wrapper_box.style.display = "none";
			username.style.background = "";
			username.style.color = "";
		}
})();
//购物车事件
(function(){
	//购物车对象
	var shopping_trolley_wrapper = document.getElementsByClassName("shopping_trolley_wrapper")[0];
	var shopping_trolley = shopping_trolley_wrapper.getElementsByClassName("shopping_trolley")[0];
	var shopping_trolley_box = shopping_trolley_wrapper.getElementsByClassName("shopping_trolley_box")[0];

	//购物车onmouseover事件
	shopping_trolley.onmouseover = function(){
		shopping_trolley_box.style.display = "block";
	}
	//购物车onmousemove事件
	shopping_trolley_wrapper.onmousemove = function(){
		shopping_trolley_box.style.display = "block";
		shopping_trolley.style.background = "#86ffec";
		shopping_trolley.style.color = "#ff0068";
	}
	//购物车onmouseleave事件
	shopping_trolley_wrapper.onmouseleave = function(){
		shopping_trolley_box.style.display = "none";
		shopping_trolley.style.background = "";
		shopping_trolley.style.color = "";
	}
})();



/*
	1.用立即执行函数来添加块级作用域。
	2.循环给ingredients_items对象添加点击事件。
*/
var ingredients_name,ingredients_price;
(function(){
	var ingredients_items = document.getElementsByClassName("ingredients_items"),
	    add_items = document.getElementsByClassName("add_items"),
	    items_name = document.querySelectorAll(".ingredients_items .items_name"),
	    items_price = document.querySelectorAll(".ingredients_items .items_price span");
	for(var i=0;i<add_items.length;i++){
		//这里使用立即执行函数，防止函数里面的i都是数组的长度
		add_items[i].onclick = function(x){
			return  function(){
						var ing = ingredients_items[x];
						var array = ing.siblings();
						
						for(var j=0;j<array.length;j++){
							removeClass(array[j],"selected");
						}

						addClass(ing,"selected");

						ingredients_name = items_name[x].innerHTML;
						ingredients_price = items_price[x].innerHTML;
					}
		}(i)
	}

})();


	

/*
	1.用立即执行函数来添加块级作用域。
	2.添加add,sub鼠标按下抬起事件。
*/
var accessories_price = [],//辅料每份价格
	accessories_name = [],//辅料名字
	accessories_num = [],//辅料数量
	items_name_accessories = document.querySelectorAll(".accessories_items .items_name"),
	items_num_accessories = document.querySelectorAll(".accessories_items .items_num span"),
	items_price_accessories = document.querySelectorAll(".accessories_items .items_price .num"),
	totol_price = document.querySelectorAll(".totol_price span"),
	num = [];

(function(){
	var add = document.getElementsByClassName("add"),
		sub = document.getElementsByClassName("sub");

	// console.log(toString.apply(accessories_price) === '[object Array]');
	// console.log(Object.prototype.toString.call(accessories_price) === '[object Array]');   


	//因为add、sub成对出现，因此只需一个循环
	for(var i=0;i<add.length;i++){
		//添加add鼠标按下事件
		add[i].onmousedown = function(x){
			return function(){
				num[x] = items_num_accessories[x].innerHTML;
				if(num[x] < 3){
					items_num_accessories[x].innerHTML++;
					num[x]++;
					
					totol_price[x].innerHTML = (items_price_accessories[x].innerHTML * num[x]).toFixed(1);

					//将已选辅料加进数组
					accessories_price[x] = parseFloat(items_price_accessories[x].innerHTML);
					accessories_name[x] = items_name_accessories[x].innerHTML;
					accessories_num[x] = parseFloat(num[x]);
				}
				add[x].style.color = "#2E2D2D";
			}
		}(i)
		//添加add鼠标抬起事件
		add[i].onmouseup = function(x){
			return function(){
				add[x].style.color = "#545050";
			}
		}(i)

		sub[i].onmousedown = function(x){
			return function(){
				num[x] = items_num_accessories[x].innerHTML;
				if(num[x] > 0){
					items_num_accessories[x].innerHTML--;
					num[x]--;

					totol_price[x].innerHTML = (items_price_accessories[x].innerHTML * num[x]).toFixed(1);

					//更新已选辅料数量
					accessories_num[x] = num[x];
				}
				sub[x].style.color = "#2E2D2D";
			}
		}(i)

		sub[i].onmouseup = function(x){
			return function(){
				sub[x].style.color = "#545050";
			}
		}(i)
	}

})();


var price_num = document.getElementsByClassName("price_num")[0];
//选购完成事件
(function(){
	var complete_bt_text = document.getElementsByClassName("complete_bt_text")[0],
		complete_box = document.getElementsByClassName("complete_box")[0],	
		complete_bt = document.getElementsByClassName("complete_bt")[0],
		complete_btHeight = complete_bt.offsetHeight,
		shade = document.getElementsByClassName("shade")[0],
		have_goods = document.getElementsByClassName("have_goods")[0],
		not_have = document.getElementsByClassName("not_have")[0],
		selected_items_name = document.getElementsByClassName("selected_items_name")[0],
		selected_items_price = document.getElementsByClassName("selected_items_price")[0],
		selected_items_num = document.getElementsByClassName("selected_items_num")[0],
		all_items = document.getElementsByClassName("all_items")[0],
		str = "",
		haveStyle = have_goods.style,
		notStyle = not_have.style,
		body = document.body,
		ele = complete_box.style,
		shadeStyle = shade.style;

	complete_bt_text.onclick = function(e){
		
		// console.log(accessories_price,accessories_name,accessories_num);
		// console.log(accessories_price.length);
		// console.log("22" + accessories_price[2]);
		// console.log(ingredients_name,ingredients_price);
		// console.log(all_items.innerHTML);
		//每次点击清空str变量
		
		str = "";
		if(ingredients_name){
			haveStyle.display = "block";
			notStyle.display = "none";

			//将选中配料放入str变量中
			//主料写入str变量中
			str += '<div class="selected_items"><span class="selected_items_name">'+ingredients_name+'</span><div class="selected_items_right"><span class="selected_items_price">'+ parseFloat(ingredients_price) +'</span><div class="num_box"><img class="minus_num" src="img/minus.png"/><span class="selected_items_num">'+ 1 +'</span><img class="add_num" src="img/add.png"/></div></div></div>' 
			
			for(var i=0;i<accessories_num.length;i++){

				if(accessories_num[i] > 0){
					//辅料写入str变量中
					str += '<div class="selected_items"><span class="selected_items_name">'+accessories_name[i]+'</span><div class="selected_items_right"><span class="selected_items_price">'+ (accessories_price[i]*accessories_num[i]).toFixed(1) +'</span><div class="num_box"><img class="minus_num" src="img/minus.png" onclick="minus(this)"/><span class="selected_items_num">'+ accessories_num[i] +'</span><img class="add_num" src="img/add.png" onclick="add(this)"/></div></div></div>'
				}

			}
			//将str变量写入all_items盒子里
			all_items.innerHTML = str;

			//确认支付事件
			var confirm_bt = document.getElementsByClassName("confirm_bt")[0];

			confirm_bt.onclick = function(){
				var xhr = createXMLHttpRequest();

		        xhr.open("post","payment.php",true);
		        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		        xhr.onreadystatechange = function(){
		            if(xhr.readyState == 4 && xhr.status == 200){
		                // console.log(xhr.responseText);
		                window.location = "payment.php";
		            }
		        };
		        xhr.send("ingredients_name="+ingredients_name+"&ingredients_price="+ingredients_price+"&accessories_name="+accessories_name+"&accessories_price="+accessories_price+"&accessories_num="+accessories_num);
			}
		}else{
			haveStyle.display = "none";
			notStyle.display = "block";
		}
		//计算总价
		calc_total_price(ingredients_price,accessories_price,accessories_num);

		//根据complete_box盒子与complete_bt盒子的高度设置complete_box的position中top的值
		ele.top = -complete_box.offsetHeight + complete_btHeight + "px";
		//遮罩层的高度设置成为body的内容高度
		shadeStyle.height = bodyHeight + "px";
		shadeStyle.display = "block";

		e.stopPropagation();

		//点击除了complete_bt盒子的其他地方complete_box盒子动画消失
		body.onclick = function(){
			ele.top =complete_btHeight + "px";
			shadeStyle.display = "none";
			body.onclick = null;
		}
		complete_bt.onclick = function(e){
			e.stopPropagation();
		}
	}

	var clear_goods = document.getElementsByClassName("clear_goods")[0];

	clear_goods.onclick = function(){
		//获取class有selected的对象
		var selected = document.getElementsByClassName("selected")[0];
		//将主料移除selected
		if(selected){
			removeClass(selected,"selected");
		}
		
		//清空辅料的值
		for(var i=0;i<items_num_accessories.length;i++){
			items_num_accessories[i].innerHTML = 0;
			totol_price[i].innerHTML = 0.0;
		}
		//将变量初始化
		ingredients_name = "";
		ingredients_price = 0;
		accessories_name = [];
		accessories_price = [];
		accessories_num = [];
		//改变显示内容
		haveStyle.display = "none";
		notStyle.display = "block";
		//根据complete_box盒子与complete_bt盒子的高度设置complete_box的position中top的值
		ele.top = -complete_box.offsetHeight + complete_btHeight + "px";
	}
})();

//购物清单里的add函数
function add(obj){

	//获得该配料对象的数量
	var obj_num = obj.previousSibling.innerHTML;
	//获得该配料对象的总价
	var obj_totle_price = obj.parentNode.previousSibling.innerHTML;
	//获得该配料对象的单价
	var obj_price = obj_totle_price/obj_num;

	var obj_name = obj.parentNode.parentNode.previousSibling.innerHTML;

	var complete_box = document.getElementsByClassName("complete_box")[0];

	if(obj_num < 3){
		obj_num++;
		obj.previousSibling.innerHTML++;
		obj.parentNode.previousSibling.innerHTML = (obj_price * obj_num).toFixed(1);
	}

	for(var i=0;i<items_name_accessories.length;i++){
		
		if(items_name_accessories[i].innerHTML == obj_name){
			
			var ele = items_name_accessories[i].parentNode.nextSibling;
			//加个if语句，判断有无空格
			if(ele.nodeType === 1){
				ele.children[0].children[1].children[0].innerHTML = obj_num;
				ele.children[0].children[3].children[0].innerHTML = (obj_price * obj_num).toFixed(1);
				if(accessories_num[i]||accessories_num[i] == 0){
					accessories_num[i] = obj_num;
					accessories_price[i] = obj_price;
				}
			}else{
				ele.nextSibling.children[0].children[1].children[0].innerHTML = obj_num;
				ele.nextSibling.children[0].children[3].children[0].innerHTML = (obj_price * obj_num).toFixed(1);
				if(accessories_num[i]||accessories_num[i] == 0){
					accessories_num[i] = obj_num;
					accessories_price[i] = obj_price;
				}
			}
		}
	}
	//计算总价
	calc_total_price(ingredients_price,accessories_price,accessories_num);
}

//购物清单里的minus函数
function minus(obj){

	//获得该配料对象的数量
	var obj_num = obj.nextSibling.innerHTML;
	//获得该配料对象的总价
	var obj_totle_price = obj.parentNode.previousSibling.innerHTML;
	//获得该配料对象的单价
	var obj_price = obj_totle_price/obj_num;

	var obj_name = obj.parentNode.parentNode.previousSibling.innerHTML;

	var complete_box = document.getElementsByClassName("complete_box")[0];

	//获取complete_box的top值并且去掉px
	var now_top = parseFloat(complete_box.style.top);

	if(obj_num >0){
		obj_num--;
		obj.nextSibling.innerHTML--;
		obj.parentNode.previousSibling.innerHTML = (obj_price * obj_num).toFixed(1);
		//当减到数量为0时将该物品在该盒子中删除
		if(obj_num == 0){
			//一个辅料盒子高度为45px所以增加45px
			now_top += 45;

			complete_box.style.top = now_top + "px";

			setTimeout(function(){
				obj.parentNode.parentNode.parentNode.style.display = "none";
			},220)
		}
	}
	for(var i=0;i<items_name_accessories.length;i++){
		
		if(items_name_accessories[i].innerHTML == obj_name){
			
			var ele = items_name_accessories[i].parentNode.nextSibling;
			//加个if语句，判断有无空格
			if(ele.nodeType === 1){
				ele.children[0].children[1].children[0].innerHTML = obj_num;
				ele.children[0].children[3].children[0].innerHTML = (obj_price * obj_num).toFixed(1);
				if(accessories_num[i]||accessories_num[i] == 0){
					accessories_num[i] = obj_num;
					accessories_price[i] = obj_price;
				}
			}else{
				ele.nextSibling.children[0].children[1].children[0].innerHTML = obj_num;
				ele.nextSibling.children[0].children[3].children[0].innerHTML = (obj_price * obj_num).toFixed(1);
				if(accessories_num[i]||accessories_num[i] == 0){
					accessories_num[i] = obj_num;
					accessories_price[i] = obj_price;
				}
			}
		}
	}
	//计算总价
	calc_total_price(ingredients_price,accessories_price,accessories_num);
}

//计算总价函数
function calc_total_price(ingredients_price,accessories_price,accessories_num){
	var total_price = 0;
	total_price += parseFloat(ingredients_price);

	for(var i=0;i<accessories_price.length;i++){
		
		if(typeof(accessories_price[i]) == "number"){
			total_price += parseFloat((accessories_price[i] * accessories_num[i]).toFixed(1));
		}
		
		// console.log(parseFloat((accessories_price[i] * accessories_num[i]).toFixed(1)));
	}
	
	price_num.innerHTML = total_price;
}

//给对象设置index函数
function setIndex(obj){
    for(var i = 0;i<obj.length;i++){
        obj[i].index = i;
    }
}


//判断对象是否有这个class函数
function hasClass(obj,cls) {  
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));  
};  
//给对象添加class函数
function addClass(obj,cls) {  
    if (!hasClass(obj,cls)) obj.className += " " + cls;  
}  
//给对象删除class函数  
function removeClass(obj, cls) {  
	if (hasClass(obj, cls)) {  
	    var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');  
	    obj.className = obj.className.replace(reg, ' ');  
	}  
}  
//对象toggleClass事件函数  
function toggleClass(obj,cls){  
    if(hasClass(obj,cls)){  
        removeClass(obj, cls);  
    }else{  
        addClass(obj, cls);  
    }  
}   
//对对象添加siblings方法
Object.prototype.siblings = function(){
    var _nodes = [],
        elem = this,
        _elem = this;
    while ((_elem = _elem.previousSibling)){
        if(_elem.nodeType === 1){
            _nodes.push(_elem);
        }
    }
    while ((elem = elem.nextSibling)){
        if(elem.nodeType === 1){
            _nodes.push(elem);

        }
    }

    return _nodes;
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
