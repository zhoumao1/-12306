<?php header('Content-type:text/html; charset=utf-8');
// 获取出发站, 到达站
$fromCity = $_GET['fromCity'] .'%';
$toCity = $_GET['toCity'] .'%';

$link = new mysqli('localhost', 'root', 'root', 'ticket_info');
$link ->set_charset('utf8');

// 执行查询操作(模糊查询)
$sql = "select * from ticket_info where fromCity like'$fromCity' and toCity like'$toCity'";
$res = $link ->query($sql);
if (!$res) {
	die('错误信息: '. $link ->error);
	exit();
}
static $data = array();
while ($arr = $res ->fetch_assoc()) {
	array_push($data, $arr);
}
// echo $data;
echo json_encode($data);
?>