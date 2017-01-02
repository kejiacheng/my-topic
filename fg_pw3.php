<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title>Examples</title>
<meta name="description" content="">
<meta name="keywords" content="">
<link href="css/reset.css" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="css/fg_pw2.css">
</head>
<body>
    <div id="header">
		<div class="wrapper">
			<div class="logo">
				<a href="index.html"></a>
				<span class="text">欢迎登陆</span>
			</div>
			<a class="back_index" href="index.html">返回首页</a>
		</div>
	</div>
	<div id="content">
		<div class="wrapper">
			<ul class="steps">
				<li>确认账号</li>
				<li>安全验证</li>
				<li class="now_steps">重置密码</li>
			</ul>
			<div class="confirm_user">
				<?php
					$username = $_POST["username"];
					echo "<input type='text' name='username' class='username' readonly value='$username'>";

				?>
				</br>
				<input type="password" name="password" class="password" placeholder="请您输入新的密码"></br>
				<input type="password" name="cf_pw" class="cf_pw" placeholder="请您再次输入新的密码"></br>
				<a class="confirm_user_bt">完成</a>
			</div>
		</div>
	</div>
	<div id="footer">
		<p>浙ICP备16039089号-1</p>
	</div>
	<script type="text/javascript" src="js/fg_pw3.js"></script>
</body>
</html>