<?php

$conn = new mysqli("localhost","root","");

$conn->set_charset("utf8");

mysqli_select_db($conn,"intel_drink");

$start = $_POST["start"];
$end = $_POST["end"];

// 调整起始时间和结尾时间与数据库中的时间对应
$start = str_replace("-","",$start)*10000;
$end = str_replace("-","",$end)*10000+2359;

$arr_2 = [];//二维数组
$arr_1 = [];//一维数组

$result = mysqli_query($conn,"SELECT * FROM allgoodssale WHERE reg_date>='$start' AND reg_date<='$end'");

while($row = mysqli_fetch_array($result)){
	global $arr_2,$arr_1;
	$arr_1=[];
	array_push($arr_1,$row["goods"],substr($row["reg_date"],0,8));
	array_push($arr_2,$arr_1);
}

$arr_2 = json_encode($arr_2,JSON_UNESCAPED_UNICODE);

echo $arr_2;


// $time = "2015-08-16";

// $time = str_replace("-","",$time)*10000+2359;

// echo $time;

// $arr = [["10.28",120],["10.29",20],["10.30",53],["10.31",22],["11.01",13],["11.02",34],["11.03",32],["11.04",49],["11.05",62],["11.06",20],["11.07",120],["11.08",230],["11.09",211],["11.10",135],["11.11",333]];
// $arr = json_encode($arr,JSON_UNESCAPED_UNICODE);

//  echo $arr;
?>