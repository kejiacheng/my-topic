<?php

session_start();
if(isset($_SESSION['name'])){
	unset($_SESSION['name']);
	unset($_SESSION['login_way']);
}
?>