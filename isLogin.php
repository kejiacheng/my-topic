<?php

session_start();
if(isset($_SESSION['name'])){
	$arr = array('name'=>$_SESSION['name'],'login_way'=>$_SESSION['login_way']);
	
	$arr = json_encode($arr);
	echo $arr;
}else{
	echo "没有登录";
}

?>