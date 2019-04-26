<?php header('Content-type:text/html; charset=utf-8');
// print_r($_GET);
/**
 * 验证页面
 */
$name = trim($_GET['name']);
$pwd = trim($_GET['pwd']);

$link = new mysqli('localhost', 'root', 'root', 'ticket_info');
$link ->set_charset('utf8');

// 判断是否有该账号
$sql = "select count(*) from login where name='$name'";
$res = $link ->query($sql);
$row = $res ->fetch_row();
$count = current($row); // 获取第一个键值
/**
 * $count
 *		如果返回值是 <=0 说明该用户没有注册
 *		如果返回值是 >0 说明该用户已注册
 */
if ($count > 0) {
	echo 'error';
	exit();
}
?>