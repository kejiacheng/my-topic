<?php
session_start();

$tableName = $_POST["tableName"];
$usernameValue = $_POST["usernameValue"];
$passwordValue = $_POST["passwordValue"];

$conn = new mysqli("localhost","root","");

$conn->set_charset("utf8");
mysqli_select_db($conn,"intel_drink");

$result = mysqli_query($conn , "SELECT * FROM $tableName WHERE username='$usernameValue'");

if($row = mysqli_fetch_array($result)){
	if($passwordValue === $row["pw"]){
		$_SESSION['name']=$row["name"];
        $_SESSION['login_way']=$tableName;
		if($tableName === "ordinaryuser"){
			// echo $row["name"];
		}else if($tableName === "staffuser"){
			// echo "<staff>" . $row["name"];
		}
	}else{
		echo "密码错误";
	}
}else{
	echo "账号不存在";
}

$conn->close();
?>