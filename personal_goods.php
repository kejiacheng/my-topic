<?php
	$name = $_POST["name"];
	$arr_1 = [];
	$arr_2 = [];

	$conn = new mysqli("localhost","root","");

	$conn->set_charset("utf8");

	mysqli_select_db($conn,"intel_drink");

	$result = mysqli_query($conn,"SELECT * FROM $name order by reg_date DESC");

	while($row = mysqli_fetch_array($result)){
		global $arr_1,$arr_2;
		$arr_1 = [];

		array_push($arr_1,$row["id"],$row["goods"],$row["price"],substr($row["reg_date"],0,8));
		array_push($arr_2,$arr_1);
		if(count($arr_2)>1){
			break;
		}
	}

	$arr_2 = json_encode($arr_2,JSON_UNESCAPED_UNICODE);

	echo $arr_2;
?>