<?php header('Content-type:text/html; charset=utf-8');
/**
 * 后台添加联系人页面
 */

// 获取前台参数
$id = $_POST['funId'];
$uid = $_POST['uid'];
$name = $_POST['name'];
$idCard = $_POST['idCard'];
$phoneNum = $_POST['phoneNum'];
$link = new mysqli('localhost', 'root', 'root', 'ticket_info');
$link ->set_charset('utf8');

$sql = "update names set name='$name', idCard='$idCard', phoneNum='$phoneNum' where id='$id' and uid='$uid'";
$res = $link ->query($sql);
!$res ? die('错误信息: '. $link ->error) : false;
?>