<?php
	session_start();

	if(isset($_SESSION['name'])){
		
	}else{
		echo "您还未登录<br>";
		echo "<a href='index.html'>返回首页</a>";
		die();
	}
?>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title>Examples</title>
<meta name="description" content="">
<meta name="keywords" content="">
<link href="css/reset.css" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="css/personal_zone.css">
<script src="isLogin"></script>
</head>
<body>
    <div id="header">
		<div class="wrapper">
			<div class="logo">
				<a href="index.html"></a>
				<span class="text">个人中心</span>
			</div>
			<a class="back_index" href="index.html">返回首页</a>
		</div>
	</div>
	<div id="content">
		<div class="wrapper">
			<div class="buy_list">
				<p class="word"></p>
				<div class="item_list">
					<table>
						<tr>
							<th class="goods_id">订单编号</th>
							<th class="goods_name">物品</th>
							<th class="goods_price">价格</th>
							<th class="goods_time">时间</th>
						</tr>
						<?php
							$name = $_SESSION['name'];

							$conn = new mysqli("localhost","root","");

							$conn->set_charset("utf8");

							mysqli_select_db($conn,"intel_drink");

							//获取当前页数
							$page_now = @$_GET['page_now']?$_GET['page_now']:1;
							//根据当前页数计算得到该获取的数据内容的起始页
							$startposit = ($page_now-1)*10;

							//获取该页面的内容
							$result = mysqli_query($conn , "SELECT * FROM $name order by id DESC limit $startposit,10");

							//获取总的内容
							$result1 = mysqli_query($conn , "SELECT * FROM $name order by id DESC");

							//计算得到内容的长度
							$row1 = $result1->num_rows;

							//根据长度计算有多少页
							$totalPage = ceil($row1/10);
							
							while($row = mysqli_fetch_array($result)){
								echo "<tr><td>" .$row['id'] . "</td><td>";
								$array = stringToArray($row["goods"]);
								for($i=0;$i<count($array);$i += 2){
									$j = $i + 1;
									if($i+2 == count($array)){
										echo "$array[$i]*$array[$j]";
									}else{
										echo "$array[$i]*$array[$j],";
									}
									// echo "$array[" . $i++ . "]*$array[".$i++."],"; 
								}
								echo "</td><td>" . $row['price'] . "</td><td>" . $row['reg_date'] . "</td></tr>";
							}
							//将数据库中的字符串数据转为数组
							function stringToArray($dataString){
								return explode('|',$dataString);
							}

							


						?>
						<!-- <tr>
							<td>1</td>
							<td>芒果汁*1,椰果*2,蜂蜜*3,果葡糖浆*2</td>
							<td>10.5</td>
							<td>20161114</td>
						</tr> -->
					</table>
					<div class="page_box">
						<?php
							$str = '';
							$prevPage = $page_now - 1;
							$nextPage = $page_now + 1;

							if($page_now == 1){
								$str .= "<a class='first_page set_page disable' href='javascript:void(0)'>首页</a><a class='prev_page set_page disable' href='javascript:void(0)'>上一页</a>";
							}else{
								$str .= "<a class='first_page set_page' href='" . $_SERVER['PHP_SELF'] . "?page_now=1'>首页</a><a class='prev_page set_page' href='" . $_SERVER['PHP_SELF'] . "?page_now=$prevPage'>上一页</a>";
							}
							
							//在页码栏要显示的总页数
							$show_page = 9;

							//左右偏移量
							$page_offset = ($show_page - 1) / 2;

							//页码栏起始页设置默认值为1,尾页为总页数
							$start = 1;
							$end = $totalPage;

							if($totalPage > $show_page){
								if($page_now > $page_offset+1){
									$str .= "...";
								}
							}

							if($page_now > $page_offset){
								$start = $page_now - $page_offset;
								$end = $page_now+$page_offset>$totalPage?$totalPage:$page_now+$page_offset;
							}else{
								$end = $totalPage>$show_page?$show_page:$totalPage;
							}

							for($i = $start;$i<=$end;$i++){
								if($page_now == $i){
									$str .="<a class='set_page now_page' href='" . $_SERVER['PHP_SELF'] . "?page_now=$i'>$i</a>";
								}else{
									$str .= "<a class='set_page' href='" . $_SERVER['PHP_SELF'] . "?page_now=$i'>$i</a>";
								}
								
							}
							if($totalPage > $show_page){
								if($page_now+$page_offset<$totalPage){
									$str .= "...";
								}
							}
							if($page_now == $totalPage){
								$str .= "<a class='next_page set_page disable' href='javascript:void(0)'>下一页</a><a class='last_page set_page disable' href='javascript:void(0)'>尾页</a>";
							}else{
								$str .= "<a class='next_page set_page' href='" . $_SERVER['PHP_SELF'] . "?page_now=$nextPage'>下一页</a><a class='last_page set_page' href='" . $_SERVER['PHP_SELF'] . "?page_now=$totalPage'>尾页</a>";
							}
							echo $str;
						?>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div id="footer">
		<p>浙ICP备16039089号-1</p>
	</div>
	<script type="text/javascript" src="js/personal_zone.js"></script>
</body>
</html>