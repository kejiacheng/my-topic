<?php

$username = $_POST['username'];
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
$url='http://utf8.sms.webchinese.cn/?Uid=柯嘉诚93&Key=kejiacheng1111&smsMob=' . $username . '&smsText=验证码：' . $vertify;

if(Get($url) == 1){
    echo $vertify;
}

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