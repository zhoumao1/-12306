<?php header('Content-type:text/html; charset=utf-8');
/**
 * 展示联系人
 */
$uid = $_POST['uid'];

$link = new mysqli('localhost', 'root', 'root', 'ticket_info');
$link ->set_charset('utf8');
// 执行查询操作
$sql = "select * from ". $uid ."_admin where uid='$uid' order by id desc";
$res = $link ->query($sql);
if (!$res) {
	die('错误信息: '. $link ->error);
	exit();
}
$data = array();
while ($arr = $res ->fetch_assoc()) {
	array_push($data, $arr);
}
echo json_encode($data);
?>