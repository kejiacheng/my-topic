(function(){

	var goods_ranking_li = document.getElementsByClassName("goods_ranking_li")[0],
		goods_sale_li = document.getElementsByClassName("goods_sale_li")[0],
		goods_rel_li = document.getElementsByClassName("goods_rel_li")[0];

	//设置isFirst属性为true,用于判断是否第一次点击。
	// goods_ranking_li.isFirst = true;
	// goods_sale_li.isFirst = true;
	// goods_rel_li.isFirst = true;

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

	//mode_choice_item 第一次点击发生的ajax事件
	var index = 0,//该变量传递给php，判断调取并返回哪些数据
		defalut_ranking_time = 30;//销量排行默认取30天的数据
	goods_ranking_li.ajax = function(){
			index = 1;
			var xhr = createXMLHttpRequest();
				tbable = document.querySelector(".goods_ranking table");
			xhr.open("post","getData.php",true);
			xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4 && xhr.status == 200){
					var arr = JSON.parse(xhr.responseText),
						i=0;
					var str = '<tr><th class="ranking">销量排名</th><th class="name">货物名称</th><th class="num">销量数目</th></tr>';
					//用for in 循环json对象
					for(var o in arr){
						//只取前10个
						if(i++<10){
							//用|分割成数组
							var new_arr = o.split("|");
							str += "<tr><td>" + i + "</td><td>";
							//修改货物名称变得更易读
							for(var j=0;j<new_arr.length;j+=2){
								if(j == new_arr.length-2){
									str += new_arr[j] + "*" + new_arr[j+1];
								}else{
									str += new_arr[j] + "*" + new_arr[j+1]+",";
								}
								
							}
							str += "</td><td>" + arr[o] + "</td></tr>";
						}
					tbable.innerHTML = str;
					}
					removeEvents(goods_ranking_li,"click",goods_ranking_li.ajax);
					// console.log(1);
				}
			}

			xhr.send("index="+index+"&time="+defalut_ranking_time);
			
	}

	var defalut_sale_time = 5;//销售记录默认取5天的数据
	goods_sale_li.ajax = function(){
		var now_page = 1;
		index = 2;
		var xhr = createXMLHttpRequest(),
			tbable = document.querySelector(".goods_sale table");

		xhr.open("post","getData.php",true);

		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");

		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4 && xhr.status == 200){
				var arr = JSON.parse(xhr.responseText);
				var page_num = Math.ceil(arr.length/10);//需要的页数

				function update(){
					var start_item = (now_page-1)*10;//数据起始显示位置
					var str = '<tr><th class="name">销售物品</th><th class="price">销售价格</th><th class="people">购买者</th><th class="time">销售时间</th></tr>';
					for(var i=start_item;i<(start_item+10>arr.length?arr.length:start_item+10);i++){
						var goodsName = arr[i][0],
							//用|分割成数组
							new_arr = goodsName.split("|"),
							name_str = "";//货物名字
						//修改货物名称变得更易读
						for(var j=0;j<new_arr.length;j+=2){
							if(j == new_arr.length-2){
								name_str += new_arr[j] + "*" + new_arr[j+1];
							}else{
								name_str += new_arr[j] + "*" + new_arr[j+1]+",";
							}
						}
						str += '<tr><td>' + name_str + '</td><td>' + arr[i][1] + '</td><td>' + arr[i][2] + '</td><td>' + arr[i][3].substring(0,8) + '</td></tr>'
					}
					tbable.innerHTML = str;
				}
				update();
				removeEvents(goods_sale_li,"click",goods_sale_li.ajax);
				// console.log(2);
				// console.log(arr.length);
				//销售记录里添加跳转页数
				(function setPage(){
					var page_box = document.getElementsByClassName("page_box")[0],
						str = "",
						show_page = 5,//显示的页数
						page_offset = (show_page-1)/2,//左右偏移2页
						start_page = 1,
						end_page = page_num;

						str += '<a class="fitst_page disable set_page">首页</a><a class="prev_page disable set_page">上一页</a>';
						
						str += '<strong class="former_point hidden">...</strong>';

						// if(now_page > page_offset){
						// 	start_page = now_page-page_offset;
						// 	end_page = now_page+page_offset>page_num?page_num:now_page+page_offset;
						// }else{
						// 	end_page = page_num>show_page?show_page:page_num;
						// }

						// for(var i=start_page;i<=end_page;i++){
						// 	str += '<a class="num_page set_page">'+i+'</a>';
						// }

						for(var i=1;i<=page_num;i++){
							if(i<=show_page){
								if(i==1){
									str += '<a class="num_page set_page active">'+i+'</a>';
								}else{
									str += '<a class="num_page set_page">'+i+'</a>';
								}
								
							}else{
								str += '<a class="num_page set_page hidden">'+i+'</a>';
							}
							
						}

						if(page_num>show_page){
							str += '<strong class="latter_point">...</strong>';
						}else{
							str += '<strong class="latter_point hidden">...</strong>';
						}

						str += '<a class="next_page set_page">下一页</a><a class="last_page set_page">尾页</a>';


						page_box.innerHTML = str;
				})();
				//给跳转页添加点击效果
				(function(){
					var set_page = document.getElementsByClassName("set_page");	
					
					//改变当前页数
					function changeNowPage(that){
						switch(that.innerHTML){
							case "首页":
								now_page = 1;
								break;
							case "上一页":
								if(now_page > 1){
									now_page -= 1;
								}							
								break;
							case "下一页":
								if(now_page < page_num){
									now_page += 1;
								}
								break;
							case "尾页":
								now_page = page_num;
								break;
							default:
								now_page = parseInt(that.innerHTML);
						}
					}

					//跳转目标页数
					var to_new_page = function toNewPage(){
						var that = this;
						changeNowPage(that);
						update();
					}
					var click_result = 
					function clickResult(){
								for(var i=0;i<set_page.length;i++){
									if(now_page == 1){
										//当前页为第一页时，首页和上一页点击失效
										addClass(set_page[0],"disable");
										addClass(set_page[1],"disable");
										removeClass(set_page[page_num+2],"disable");
										removeClass(set_page[page_num+3],"disable");
										addEvents(set_page[i],"click",to_new_page);
									}else if(now_page == page_num){
										//当前页为最后一页时，尾页和下一页点击失效
										removeClass(set_page[0],"disable");
										removeClass(set_page[1],"disable");
										addClass(set_page[page_num+2],"disable");
										addClass(set_page[page_num+3],"disable");
										addEvents(set_page[i],"click",to_new_page);
									}else if(now_page !== 1 && now_page !==page_num){
										//当前页为中间页时，所有按钮都可点击
										removeClass(set_page[0],"disable");
										removeClass(set_page[1],"disable");
										removeClass(set_page[page_num+2],"disable");
										removeClass(set_page[page_num+3],"disable");
										addEvents(set_page[i],"click",to_new_page);
									}
								}

								//当前页添加active样式，其他页移除active样式
								var num_page = document.getElementsByClassName("num_page"),
									arr = siblings(num_page[now_page-1]);

								addClass(num_page[now_page-1],"active");

								for(var j=0;j<arr.length;j++){
									removeClass(arr[j],"active");
								}

								//页码显示的显示，隐藏的隐藏
								var show_page = 5,//显示的页数
									page_offset = (show_page-1)/2,//左右偏移2页
									start_page = 1,
									end_page = page_num,
									former_point = document.getElementsByClassName("former_point")[0],
									latter_point = document.getElementsByClassName("latter_point")[0];

								//判断显示页码的起始页和尾页
								if(now_page > page_offset){
									start_page = now_page-page_offset;
									end_page = now_page+page_offset>page_num?page_num:now_page+page_offset;
								}else{
									end_page = page_num>show_page?show_page:page_num;
								}

								//判断前后两个省略号的显示和隐藏
								if(now_page>page_offset+1){
									removeClass(former_point,"hidden");
								}else{
									addClass(former_point,"hidden");
								}
								if(page_num > show_page){
									if(now_page+page_offset<page_num){
										removeClass(latter_point,"hidden");
									}else{
										addClass(latter_point,"hidden");
									}
								}
								//将得到的起始页和尾页显示，其他页数隐藏
								for(var z=1;z<=num_page.length;z++){
									if(z>=start_page&&z<=end_page){
										removeClass(num_page[z-1],"hidden");
									}else{
										addClass(num_page[z-1],"hidden");
									}
								}
							}
					click_result();

					for(var j=0;j<set_page.length;j++){
						addEvents(set_page[j],"click",click_result);
					}
				})();
			}
			
		}

		xhr.send("index="+index+"&time="+defalut_sale_time);
	}
	goods_rel_li.ajax = function(){
		index = 3;

		var xhr = createXMLHttpRequest(),
			tbable = document.querySelector(".goods_rel table");

		xhr.open("post","getData.php",true);

		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");

		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4 && xhr.status == 200){
				var arr = JSON.parse(xhr.responseText),

					str = '<tr><th class="name">货物名称</th><th class="rel_num">货物余量</th></tr>';

				for(var i=0;i<arr.length;i++){
					str += '<tr class="' + arr[i][0] + '"><td>' + arr[i][0] + '</td><td class="rel_num">' + arr[i][1] + '</td></tr>';
				}

				tbable.innerHTML = str;

				removeEvents(goods_rel_li,"click",goods_rel_li.ajax);
			}
		}

		xhr.send("index="+index);
	}
	//将3个对象属性置入数组中，方便进行绑定
	var ajax_arr = [goods_ranking_li.ajax,goods_sale_li.ajax,goods_rel_li.ajax];

	//循环绑定点击事件
	for(var i=0;i<mode_choice_item.length;i++){
		addEvents(mode_choice_item[i],"click",func);
		//因为后台首页没有ajax所以只有在i=1才执行
		if(i > 0){
			addEvents(mode_choice_item[i],"click",ajax_arr[i-1]);
		}
		
	}

	//销量排行里的select值改变时间
	var select_ranking_time = document.getElementsByClassName("select_time")[0];

	//时间改变函数
	var time_ranking_change = function time_ranking_change(){
		defalut_ranking_time = select_ranking_time.value;
		goods_ranking_li.ajax();
	}
	addEvents(select_ranking_time,"change",time_ranking_change);

	//销售记录里的select值改变时间
	var select_sale_time = document.getElementsByClassName("select_time")[1];

	//时间改变函数
	var time_sale_change = function time_sale_change(){
		defalut_sale_time = select_sale_time.value;
		goods_sale_li.ajax();
	}
	addEvents(select_sale_time,"change",time_sale_change);
	
	//货物余量里面的更新数据
	(function(){
		var name = document.querySelector(".update_num .name"),
			num = document.querySelector(".update_num .num"),
			update_bt = document.getElementsByClassName("update_bt")[0];
			
			update_bt.onclick = function(){
				index = 4;

				var xhr = createXMLHttpRequest(),
					name_value = name.value,
					num_value = num.value;

				//当货物名称为空时
				if(name_value == ""){
					alert("您没输入货物名称！");
					return;
				}else{
					//根据获取的name_value,得到goods_num_td对象;
					goods_num_td = document.querySelector("." + name_value + " .rel_num");
				}

				//判断goods_num_td是否存在
				if(!goods_num_td){
					alert("您输入的货物名称有误！");
					return;
				}

				//判断货物数量的格式是否有误
				var reg = /^\d+$/g;
				if(!reg.test(num_value)){
					alert("您输入的货物数量有误！");
					return;
				}
				xhr.open("post","getData.php",true);

				xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");

				xhr.onreadystatechange = function(){
					if(xhr.readyState == 4 && xhr.status == 200){
						
						//将更改后的数值写入goods_num_td中
						goods_num_td.innerHTML = num_value;

						//将input里的值清空
						name.value = "";
						num.value = "";

						alert("数据更新完成");
					}
				}

				xhr.send("index="+index+"&name="+name_value+"&num="+num_value);
			}
	})();
})();






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