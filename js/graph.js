// var arr=[["10.28",120],["10.29",20],["10.30",53],["10.31",22],["11.01",13],["11.02",34],["11.03",32],["11.04",49],["11.05",62],["11.06",20],["11.07",120],["11.08",230],["11.09",211],["11.10",135],["11.11",333]];

var arr = [];

var chart_type = document.getElementsByClassName("chart_type")[0],
	goods = document.getElementsByClassName("goods")[0],
	start = document.getElementsByClassName("start")[0],
	end = document.getElementsByClassName("end")[0],
	select_goods = document.getElementsByClassName("select_goods")[0],
	items = null,
	bar_chart1 = null,
	line_chart1 = null,
	end_time,
	start_time;

//初始化函数
(function ini(){

	//将目前时间赋值给end_time,start_time
	end_time = new Date();

	start_time = new Date();

	//将起始时间设置为前15天
	start_time.setDate(start_time.getDate() - 15);

	//格式化结尾时间
	end_time = format_time(end_time);

	//格式化初始时间
	start_time = format_time(start_time);
	
	//将起始时间和结尾时间和货物名称写入input
	start.value = start_time;
	end.value = end_time;
	goods.value = "全部";

	ajax(start_time,end_time);
	
})();

var filter_bt = document.getElementsByClassName("filter_bt")[0];

filter_bt.onclick = function(){
	start_time = start.value;
	end_time = end.value;
	//计算起始时间与结尾时间的间隔天数
	var day_num = (new Date(end_time).getTime() - new Date(start_time).getTime())/1000/60/60/24;
	//若间隔天数小于等于15天，则进行ajax,否则不
	if(day_num <= 15){
		ajax(start_time,end_time);
	}else{
		alert("最大天数为15,你有" + day_num + "天！");
	}
	

}

//当图的类型发生改变时
chart_type.onchange = function(){
	if(chart_type.value === "柱状图"){

    	bar_chart1.draw();

	}else if(chart_type.value === "折线图"){
		
    	line_chart1.draw();

	}
}

var mode_choice_item = document.querySelectorAll("#content .wrapper .mode_choice ul li"),
	item_box_list = document.getElementsByClassName("item_box_list");

//给mode_choice_item对象设置index;
setIndex(mode_choice_item);

//mode_choice_item 点击发生效果的函数
var func = function(){
	//mode_choice_item对象的特效
	var rel_mode_choice_item = siblings(this);

	for(var j=0;j<rel_mode_choice_item.length;j++){
		removeClass(rel_mode_choice_item[j],"active");
	}
	addClass(this,"active");

	//item_box_list对象的特效
	var this_item_box_list = item_box_list[this.index],
		rel_item_box_list = siblings(this_item_box_list);

	for(var z=0;z<rel_item_box_list.length;z++){
		addClass(rel_item_box_list[z],"hidden");
	}
	removeClass(this_item_box_list,'hidden');
}

//循环绑定点击事件
for(var i=0;i<mode_choice_item.length;i++){
	addEvents(mode_choice_item[i],"click",func);	
}


//格式化时间，变成XXXX-XX-XX的格式
function format_time(time){
	year = time.getFullYear();
	month = time.getMonth()+1;
	day = time.getDate();
	if(month < 10){
		month = "0" + month;
	}
	if(day < 10){
		day = "0" + day;
	}
	return end_time_value = year + "-" + month + "-" + day;
}

//ajax
function ajax(start_time,end_time){
	var xhr = createXMLHttpRequest();

	xhr.open("post","graph.php",true);

	xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");

	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status == 200){
			arr = JSON.parse(xhr.responseText);

			//从ajxa得到的数据获得物品名称并去重
			var goods_name = get_goods_name(arr);

			//将物品名称写入html中
			goods_name_to_html(goods_name);

			items = document.querySelectorAll(".select_goods .item");

			//goods input的特效
			goods.onclick = function(e){
				select_goods.style.display = "block";

				//给select_goods里的每个item添加点击事件
				for(var i=0;i<items.length;i++){
					items[i].onclick = function(){
						//将该item里的值写入goods对象中
						goods.value = this.innerHTML;
						arr2 = get_arr2();

						//创建已个柱状图对象，一个折线图对象
						bar_chart1 = new bar_chart(arr2);
						line_chart1 = new line_chart(arr2);
						//判断当前的形状类型
						if(chart_type.value === "柱状图"){
							bar_chart1.draw();
						}else if(chart_type.value === "折线图"){
							line_chart1.draw();
						}
						//调用柱状图中的draw方法,既画出柱状图图形
						
						select_goods.style.display = "none";
					}
				}

				select_goods.onclick = function(e){
					//阻止冒泡
					e.stopPropagation();
				}
				//当点击网页body中任意部分select_goods隐藏
				document.body.onclick = function(){
					select_goods.style.display = "none";
				}
				//阻止冒泡
				e.stopPropagation();
			}

			var arr2 = get_arr2();
			
			//创建已个柱状图对象，一个折线图对象
			bar_chart1 = new bar_chart(arr2);

			line_chart1 = new line_chart(arr2);

			//调用柱状图中的draw方法,既画出柱状图图形
			//判断当前的形状类型
			if(chart_type.value === "柱状图"){
				bar_chart1.draw();
			}else if(chart_type.value === "折线图"){
				line_chart1.draw();
			}
			
			
			//将ajxa得到的数据转换为json对象
			function toJson(arr){
				var json = {};

				for(var i=0;i<arr.length;i++){
					//判断该第一维下标是否存在
					var sub = arr[i][1].substring(4,8);
					if(!json[sub]){
						//不存在则设置二维，并将该二维下标赋值为1
						json[sub] = {};
						json[sub][arr[i][0]] = 1;
					}else{
						//判断该二维下标是否存在，存在则加1，不存在则将该二维下标赋值为1
						if(json[sub][arr[i][0]]){
							json[sub][arr[i][0]] += 1;
						}else{
							json[sub][arr[i][0]] = 1;
						}
						
					}
				}
				return json;
			}
			
			//补充json里面没有的日期
			function supply_json(json){
				//起始时间
				a = new Date(start_time);
				//取消-
				b = start_time.replace(/-/g,"").substring(4,8);
				// 循环判断json是否有这个对象
				while(!(b == end_time.replace(/-/g,"").substring(4,8))){
					b = (a.getMonth()+1)*100+a.getDate();
					if(!json[b]){
						json[b] = {};
					}
					a.setDate(a.getDate()+1);
				}
			}

			//从ajxa得到的数据获得物品名称并去重
			function get_goods_name(arr){
				var json = {};
				for(var i=0;i<arr.length;i++){
					new_arr_1 = [];
					if(!json[arr[i][0]]){
						json[arr[i][0]] = true;
					}
				}
				return json;
			}

			//将物品名称写入html中
			function goods_name_to_html(json){
				var str = "<div class='item'>全部</div>";

				for(var key in json){
					str += "<div class='item'>" + key + "</div>";
				}
				select_goods.innerHTML = str;
			}

			//具体物品的销量
			function goods_name_chart(arr,goods_name){
				var json = {};

				for(var i=0;i<arr.length;i++){
					if(arr[i][0] === goods_name){
						if(!json[arr[i][1].substring(4,8)]){
							json[arr[i][1].substring(4,8)] = 1;
						}else{
							json[arr[i][1].substring(4,8)] += 1;
						}
					}	
				}
				return json;
			}

			//得到最终的二维数组
			function get_arr2(){
				var arr1 = [],
					arr2 = [],
					json;
				if(goods.value === "全部"){
					//将ajxa得到的数据转换为json对象
					json = toJson(arr);
					//补充json对象中没有的日期
					supply_json(json);
					
					//将json对象先写入arr1中，在吧arr1 push到arr2中
					for(var a in json){
						var num = 0;
						for(var b in json[a]){
							num += json[a][b];
						}
						arr1 = [a,num];
						arr2.push(arr1);
					}
				}else{
					json = goods_name_chart(arr,goods.value);

					supply_json(json);
	
					for(var a in json){
						//在补充json时，没有设置对象，所以要判断是补充的还是原有的
						arr1 = [a,json[a] instanceof Object ? 0:json[a]];
						arr2.push(arr1);
					}
				}
				return arr2;
			}
		}
	}

	xhr.send("&start="+start.value+"&end="+end.value);
}

//给对象设置index函数
function setIndex(obj){
    for(var i = 0;i<obj.length;i++){
        obj[i].index = i;
    }
}

//对对象添加siblings方法
function siblings(obj){
    var _nodes = [],
        elem = obj,
        _elem = obj;
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
}

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

//事件绑定事件
function addEvents(target,type,func){
	if(target.addEventListener){
		target.addEventListener(type,func,false);
	}else if(target.attachEvent){
		target.attachEvent("on",type,func);
	}
}

//事件取消绑定事件
function removeEvents(target,type,func){
	if(target.removeEventListener){
		target.removeEventListener(type,func,false);
	}else if(target.detachEvent){
		target.detachEvent("on",type,func);
	}
}
