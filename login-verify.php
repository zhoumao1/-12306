<?php header('Content-type:text/html; charset=utf-8');
// print_r($_GET);
/**
 * 验证页面
 */
// 加密字符(arr ->获取到的用户数据(返回一维数组))
function ccode($arr, $str){
	return $str = md5($arr['salt'].$str);
}
$name = trim($_GET['name']);
$pwd = trim($_GET['pwd']);

$link = new mysqli('localhost', 'root', 'root', 'ticket_info');
$link ->set_charset('utf8');

$sql = "select * from login where name = '$name'";
$res = $link ->query($sql);
$row = $res ? $res ->fetch_assoc() : false; // 成功返回一维数组
if (!$row) {
	echo 'error'; // 登录失败
}

//拿用户名取出的密码,再把传递过来的密码加密过后和数据库的密码进行对比
if($row['pwd'] != md5($pwd.$row['salt'])){
	echo 'error'; // 登录失败
}

?>