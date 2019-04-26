<?php header('Content-type:text/html; charset=utf-8');
/**
 * 后台添加联系人页面
 */

// 获取前台参数
$name = $_GET['name'];
$cid = $_GET['cid'];
$phoneNum = $_GET['phoneNum'];
$uid = $_GET['uid'];

$link = new mysqli('localhost', 'root', 'root', 'ticket_info');
$link ->set_charset('utf8');

$sql = "insert into names(uid, name, idCard, phoneNum) values('$uid', '$name', '$cid', '$phoneNum')";
$res = $link ->query($sql);
if (!$res) {
	die('错误信息: '. $link ->error);
	exit();
}
?>