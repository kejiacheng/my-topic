<?php

$conn = new mysqli("localhost","root","");

$conn->set_charset("utf8");

mysqli_select_db($conn,"intel_drink");

$index = $_POST["index"];


if($index == 1){

	$time = $_POST["time"];
	$arr = [];

	$gettime = getTime($time);

	$result = mysqli_query($conn,"SELECT * FROM allgoodssale WHERE reg_date>='$gettime'");

	while($row = mysqli_fetch_array($result)){
		global $arr;
		array_push($arr,$row["goods"]);
	}

	$arr = array_count_values($arr);

	arsort($arr);

	$arr = json_encode($arr,JSON_UNESCAPED_UNICODE);
	echo $arr;
}else if($index == 2){
	$time=$_POST["time"];
	$arr_2 = [];//二维数组
	$arr_1 = [];//一维数组

	$gettime = getTime($time);

	$result = mysqli_query($conn,"SELECT * FROM allgoodssale WHERE reg_date>='$gettime' order by reg_date DESC");

	while($row = mysqli_fetch_array($result)){
		global $arr_2,$arr_1;
		$arr_1=[];
		array_push($arr_1,$row["goods"],$row["price"],$row["name"],$row["reg_date"]);
		array_push($arr_2,$arr_1);
	}

	$arr_2 = json_encode($arr_2,JSON_UNESCAPED_UNICODE);

	echo $arr_2;
}else if($index == 3){
	$result = mysqli_query($conn,"SELECT * FROM goods_num");
	$arr_2 = [];
	$arr_1 = [];

	while($row = mysqli_fetch_array($result)){
		global $arr_2,$arr_1;
		$arr_1=[];
		array_push($arr_1,$row["goodsname"],$row["rel_num"]);
		array_push($arr_2,$arr_1);
	}

	$arr_2 = json_encode($arr_2,JSON_UNESCAPED_UNICODE);

	echo $arr_2;
}else if($index == 4){
	$name = $_POST["name"];
	$num = $_POST["num"];

	mysqli_query($conn,"UPDATE goods_num SET rel_num = '$num' WHERE goodsname = '$name'");
}

//根据POST来的时间获取起始时间
function getTime($time){
	@date_default_timezone_set(PRC);//设置为北京时间
	$now_time = date('Ymd',time());//获取当前时间

	$now_year = date('Y',time());//获取当前年份

	$now_month = date('m',time());//获取当前月份

	$now_day = date('d',time());//获取当前日份

	$year_num = 0;//计算年份

	$month_num = floor($time/30);//计算月份

	$day_num = $time%30;//计算日份

	if($now_day-$day_num>=0){
		$get_day = $now_day-$day_num;
	}else{
		$get_day = 30-($day_num-$now_day);
		$month_num++;
	}

	if($now_month-$month_num>=0){
		$get_month = $now_month-$month_num;
	}else{
		$get_month = 12-($month_num-$now_month);
		$year_num++;
	}

	$get_year = $now_year-$year_num;

	return ($get_year*10000+$get_month*100+$get_day)*10000;
}
?>