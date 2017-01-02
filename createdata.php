<?php
$conn = new mysqli("localhost","root","");

if($conn->connect_error){
    die("连接失败：" . $conn->connect_error);
}

$conn->set_charset("utf8");

if($conn->query("CREATE DATABASE intel_drink CHARSET utf8") === TRUE){
    echo "<br />数据库创建成功";
}else{
    echo "<br />Error creating database:" . $conn->error;
}

mysqli_select_db($conn,"intel_drink");

//员工用户数据表
if($conn->query("CREATE TABLE staffuser(
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(30) NOT NULL,
    pw VARCHAR(30) NOT NULL,
    name VARCHAR(30) NOT NULL,
    reg_date TIMESTAMP
)") === TRUE){
    echo "<br /> Table staffuser created successfully";
}else{
    echo "<br />创建数据表错误：" . $conn ->error;
}

//普通用户数据表
if($conn->query("CREATE TABLE ordinaryuser(
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(30) NOT NULL,
    pw VARCHAR(30) NOT NULL,
    name VARCHAR(30) NOT NULL,
    reg_date TIMESTAMP
)") === TRUE){
    echo "<br />Table ordinaryuser created successfully";
}else{
    echo "<br />创建数据表错误：" . $conn -> error;
}

//物品总销售数据表
if($conn->query("CREATE TABLE allgoodssale(
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    goods VARCHAR(30) NOT NULL,
    price DECIMAL(10,1) NOT NULL,
    reg_date DECIMAL(16,0) NOT NULL
)") === TRUE){
    echo "<br />Table allgoodssale created successfully";
}else{
    echo "<br />创建数据表错误：" . $conn -> error;
}

//物品库存
if($conn->query("CREATE TABLE goods_num(
    goodsname VARCHAR(30) PRIMARY KEY,
    rel_num DECIMAL NOT NULL,
    reg_date TIMESTAMP
)") === TRUE){
    echo "<br />Table goods_num created successfully";
}else{
    echo "<br />创建数据表错误：" . $conn -> error;
}

// 这个表单在用户注册用户时根据用户的用户名创建
// //各个用户物品购买数据表
// if($conn->query("CREATE TABLE usergoodssale(
//     id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
//     goods VARCHAR(30) NOT NULL,
//     price VARCHAR(30) NOT NULL,
//     reg_date TIMESTAMP
// )") === TRUE){
//     echo "<br />Table usergoodssale created successfully";
// }else{
//     echo "<br />创建数据表错误：" . $conn -> error;
// }

$conn->close();
?>