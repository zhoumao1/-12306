<?php header('Content-type:text/html; charset=utf-8');
/**
 * 退票
 */

// 获取前台参数
$id = $_GET['id'];
$uid = $_GET['uid'];
$tid = $_GET['tid'];
$zuoEng = $_GET['zuoEng'];
$link = new mysqli('localhost', 'root', 'root', 'ticket_info');
$link ->set_charset('utf8');

$sql = "delete from ". $uid ."_admin where id='$id'";
$res = $link ->query($sql);
if (!$res) {
	die('错误信息: '. $link ->error);
	exit();
}else {
	// 删除成功恢复原始的票数
	$sql = "update ticket_info set $zuoEng=$zuoEng+1 where tid=$tid";
	$res = $link ->query($sql);
	!$res ? die('错误信息: '.$link ->error) : header('location: http://127.0.0.1:8088//demo/12306/view/admin.html?view=order');
}
?>