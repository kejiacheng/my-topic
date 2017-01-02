// //ajax
// var xhr = createXMLHttpRequest();

// xhr.open("post","personal_zone.php",true);
// xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
// xhr.onreadystatechange = function(){
//     if(xhr.readyState == 4 && xhr.status == 200){
//         tip_phone.innerHTML = xhr.responseText;
//         if("通过！" == xhr.responseText){
//             r_x_phone.style.background = "url('img/r.png')";
//             pass_phone = 1;
//         }else if("该手机号已存在"){
//             error(phone,"phone");
//             pass_phone = 0;
//         }
//     }
// };
// xhr.send("phone="+phoneValue+"&index="+"0");


// //创建XMLHttpRequest对象
// function createXMLHttpRequest(){
//     var xhr;
//     try{
//         xhr = new XMLHttpRequest();
//     }
//     catch(e){
//         xhr = new ActiveXObject("Microsoft.XMLHTTP");
//     }
//     return xhr;
// }