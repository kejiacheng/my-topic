<?php
    $index = $_POST['index'];

    $conn = new mysqli("localhost","root","");

    if($conn->connect_error){
        die("连接失败：" . $conn->connect_error);
    }

    $conn->set_charset("utf8");
    mysqli_select_db($conn,"intel_drink");
    if($index == 0){
        $phone = $_POST['phone'];

        $result = mysqli_query($conn , "SELECT * FROM ordinaryuser WHERE username='$phone'");

        if(mysqli_fetch_array($result)){
            echo "该手机号已存在";  
        }else{
            echo "通过！";
        }
       
    }
    if($index == 1){
        $name = $_POST['name'];

        $result = mysqli_query($conn , "SELECT * FROM ordinaryuser WHERE name = '$name'");

        if(mysqli_fetch_array($result)){
            echo "该用户名已存在";
        }else{
            echo "通过！";
        }
    }
    if($index == 3){
        $phone = $_POST["phone"];
        $username = $_POST["username"];
        $password = $_POST["password"];

        $sql = "INSERT INTO ordinaryuser(username,pw,name)
                VALUES('$phone','$password','$username')";

        $conn->query($sql);

        if($conn->query("CREATE TABLE $username(
            id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            goods VARCHAR(30) NOT NULL,
            price DECIMAL(10,1) NOT NULL,
            reg_date DECIMAL(16,0) NOT NULL
            )") === TRUE){
            // echo "<br />Table usergoodssale created successfully";
        }

        session_start();
        $_SESSION['name']=$username;
        $_SESSION['login_way']='ordinaryuser';
    }
?>
<?php
if($index == 2){
    $phoneValue = $_POST['phone'];
    $vertify = "";
    //创建验证码函数
    function createVertify(){
        for($i=0;$i<4;){
            global $vertify;
            $vertical = rand(48,122);
            if(($vertical>=48&&$vertical<=57)||($vertical>=65&&$vertical<=90)||($vertical>=97&&$vertical<=122)){
                $vertical = chr($vertical);//指定的 ASCII 值返回字符。
                $vertical = strval($vertical);//将数组及类之外的变量类型转换成字符串类型。
                $vertify .=$vertical;
                $i++;
            }
        }
    };

    createVertify();

    $qq = URLEncode("验证码:8888");
    $url='http://utf8.sms.webchinese.cn/?Uid=柯嘉诚93&Key=kejiacheng1111&smsMob=' . $phoneValue . '&smsText=验证码：' . $vertify;

    if(Get($url) == 1){
        echo $vertify;
    }

}

$conn->close();

function Get($url)
{
    if(function_exists('file_get_contents'))
    {
        $file_contents = file_get_contents($url);
    }
    else
    {
        $ch = curl_init();
        $timeout = 5;
        curl_setopt ($ch, CURLOPT_URL, $url);
        curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
        $file_contents = curl_exec($ch);
        curl_close($ch);
    }
    return $file_contents;
}
?>
