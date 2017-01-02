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
				<li class="now_steps">安全验证</li>
				<li>重置密码</li>
			</ul>
			<form action="fg_pw3.php" method="post" id="myForm">
				<div class="confirm_user">
					<?php
						$username = $_POST["username"];
						echo "<input type='text' name='username' class='username' readonly value='$username'>";

					?>
					</br>
					<input type="text" name="vertify" placeholder="请输入验证码" class="vertify">
					<span class="vertify_text">获取验证码</span>
					<a class="confirm_user_bt">下一步</a>
				</div>
			</form>
		</div>
	</div>
	<div id="footer">
		<p>浙ICP备16039089号-1</p>
	</div>
	<script type="text/javascript" src="js/fg_pw2.js"></script>
</body>
</html>