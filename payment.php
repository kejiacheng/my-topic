<?php
session_start();
if(isset($_SERVER['HTTP_REFERER'])) {


	if(isset($_POST["ingredients_name"])){
		$ingredients_name = $_POST["ingredients_name"];
		$ingredients_price = $_POST["ingredients_price"];
		$accessories_name = $_POST["accessories_name"];
		$accessories_price = $_POST["accessories_price"];
		$accessories_num = $_POST["accessories_num"];


		$_SESSION['ingredients_name'] = $ingredients_name;
        $_SESSION['ingredients_price'] = $ingredients_price;
        $_SESSION['accessories_name'] = explode(',',$accessories_name);
        $_SESSION['accessories_price'] = explode(',',$accessories_price);
        $_SESSION['accessories_num'] = explode(',',$accessories_num);
		//   
	}else{
		if(isset($_SESSION["ingredients_name"])){
			$ingredients_name = $_SESSION['ingredients_name'];
		$ingredients_price = floatval($_SESSION['ingredients_price']);
		// $ingredients_price = floatval($ingredients_price);
		// $ingredients_price = str_replace("元","",$ingredients_price);
		$accessories_name = $_SESSION['accessories_name'];
		$accessories_price = $_SESSION['accessories_price'];
		$accessories_num = $_SESSION['accessories_num'];
		$totle = 0;
		function getTotleMoney(){
			global $totle,$ingredients_price,$accessories_num;

			$totle += $ingredients_price;
			for($i=0;$i<count($accessories_num);$i++){
				if($accessories_num[$i] > 0){
					global $totle,$accessories_price;

					$totle += (floatval($accessories_price[$i])*floatval($accessories_num[$i]));
				}
			}
		}
		getTotleMoney();
		echo '<!DOCTYPE html><html><head><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"><title>Examples</title><meta name="description" content=""><meta name="keywords" content=""><link href="css/reset.css" rel="stylesheet"><link rel="stylesheet" type="text/css" href="css/payment.css"></head><body><div id="header"><div class="wrapper"><div class="logo"><a href="index.html"></a><span class="text">支付页面</span></div><a class="back_index" href="index.html">返回首页</a></div></div><div id="content"><div class="wrapper"><p class="content_text">以下为您所购买的产品!</p><div class="selected_goods"><table class="list_name"><tr><th class="goods_name">物品名称</th><th class="goods_num same_width">数量</th><th class="goods_price same_width">单价</th><th class="goods__totle_price same_width">总价</th></tr>';
	   	echo "<tr><td class='goods_name'>$ingredients_name</td><td class='goods_num same_width'>1</td><td class='goods_price same_width'>$ingredients_price</td><td class='goods__totle_price same_width'>$ingredients_price</td></tr>";
		for($j=0;$j<count($accessories_num);$j++){
			if($accessories_num[$j]>0){
				global $accessories_price,$accessories_num,$accessories_name;
				$totle_price = $accessories_price[$j] * $accessories_num[$j];
				echo "<tr><td class='goods_name'>$accessories_name[$j]</td><td class='goods_num same_width'>$accessories_num[$j]</td><td class='goods_price same_width'>$accessories_price[$j]</td><td class='goods__totle_price same_width'>$totle_price</td></tr>";
			}
			
		}
					
		echo "<tr><td class='goods_name all_money' colspan='4'>总计:<span>$totle</span>元</td></tr>";
		echo '</table></div><a class="payment_bt">提交支付</a></div></div><div id="footer"><p>浙ICP备16039089号-1</p></div><script src="js/payment.js"></script></body></html>';
		}
	}

}else{
   echo "没有这个页面！";
}

?>


