<?php header('Content-type:text/html; charset=utf-8');
/**
 * 提交订单页面
 */
print_r($_GET);
exit();
$link = new mysqli('localhost', 'root', 'root', 'ticket_info');
$link ->set_charset('utf8');
// 执行查询操作
$sql = "select * from ticket_info where tid='$tid'";
$res = $link ->query($sql);
if (!$res) {
	die('错误信息: '. $link ->error);
	exit();
}
$row = $res ? $res ->fetch_assoc() : false; // 成功返回一维数组
echo json_encode($row);

// $name = $_GET['name']; // 前台穿过来的cook

// $sql = "insert into names(uid, name) values('$name', '手术')"
// $sql = "select * from names where uid='$name'"




?>