<?php header('Content-type:text/html; charset=utf-8');

$link = new mysqli('localhost', 'root', 'root', 'ticket_info');
$link ->set_charset('utf8');
// 获取出发站, 到达站
$fromCity = $_POST['fromCity'] .'%';
$toCity = $_POST['toCity'] .'%';

// 执行查询操作(模糊查询)
$sql = "select * from ticket_info where fromCity like'$fromCity' and toCity like'$toCity'";
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