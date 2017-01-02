<?php

session_start();

if(isset($_SERVER['HTTP_REFERER'])) {

	if(isset($_SESSION['ingredients_name'])){
		$conn = new mysqli("localhost","root","");

		$conn->set_charset("utf8");

		mysqli_select_db($conn,"intel_drink");

		$ingredients_name = $_SESSION['ingredients_name'];
		$ingredients_price = floatval($_SESSION['ingredients_price']);
		$accessories_name = $_SESSION['accessories_name'];
		$accessories_price = $_SESSION['accessories_price'];
		$accessories_num = $_SESSION['accessories_num'];
		$name = isset($_SESSION['name']) ? $_SESSION['name'] : "";
		$totle = 0;
		$str = '';
		$per_ingredients = 350;//每份主料350ml
		$per_accessories = 50;//每份辅料50ml
		@date_default_timezone_set(PRC);//设置为北京时间
		$time = date('YmdHi',time());//获取当前时间
		//扣除主料
		mysqli_query($conn,"UPDATE goods_num SET rel_num=rel_num-$per_ingredients WHERE goodsname = '$ingredients_name'");

		function getTotleMoney(){
			global $totle,$ingredients_price,$accessories_num;

			$totle += $ingredients_price;
			for($i=0;$i<count($accessories_num);$i++){
				if($accessories_num[$i] > 0){
					global $totle,$accessories_price,$accessories_num,$accessories_name;

					$totle += (floatval($accessories_price[$i])*floatval($accessories_num[$i]));
				}
			}
		}
		getTotleMoney();
		
		$str .= $ingredients_name . "|1";

		for($i = 0;$i<count($accessories_num);$i++){
			if($accessories_num[$i]>0){
				global $str,$accessories_num,$accessories_price,$accessories_name,$per_accessories;

				//扣除辅料
				mysqli_query($conn,"UPDATE goods_num SET rel_num=rel_num-($per_accessories*$accessories_num[$i]) WHERE goodsname = '$accessories_name[$i]'");

				$str .= "|" . $accessories_name[$i] . "|" . $accessories_num[$i];
			}
		}
		
		$conn -> query("INSERT INTO allgoodssale(name,goods,price,reg_date)
						VALUES('$name','$str','$totle','$time')");

		if(!($name === "")){
			$conn -> query("INSERT INTO $name(goods,price,reg_date)
							VALUES('$str','$totle','$time')");
		}
		unset($_SESSION['ingredients_name']);
		unset($_SESSION['ingredients_price']);
		unset($_SESSION['accessories_name']);
		unset($_SESSION['accessories_price']);
		unset($_SESSION['accessories_num']);
		echo "<script>window.location = 'index.html'</script>";
	}
}else{
	echo "没有这个页面！";
}

?>