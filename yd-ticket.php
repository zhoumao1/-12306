<?php header('Content-type:text/html; charset=utf-8');
/**
 * 车次列表 预定
 */
// 获取前台数据 -->预定
$tid = $_GET['tid'];

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


// 获取地址栏参数 -->用户
$uid = $_GET['uid'];

$link = new mysqli('localhost', 'root', 'root', 'ticket_info');
$link ->set_charset('utf8');
// 执行查询操作
$sql = "select * from names where uid='$uid'";
$res = $link ->query($sql);
if (!$res) {
	die('错误信息: '. $link ->error);
	exit();
}
$data = array();
while ($arr = $res ->fetch_assoc()) {
	array_push($data, $arr);
}
// 将所有信息合成一块
$allData = array();
array_push($allData, $row);
array_push($allData, $data);
echo json_encode($allData);
?>
