<?php header('Content-type:text/html; charset=utf-8');
/**
 * 删除联系人
 */

// 获取前台参数
$id = $_GET['id'];
$link = new mysqli('localhost', 'root', 'root', 'ticket_info');
$link ->set_charset('utf8');

$sql = "delete from names where id='$id'";
$res = $link ->query($sql);
!$res ? die('错误信息: '. $link ->error) : header('location: http://127.0.0.1:8088//demo/12306/view/admin.html?view=lianxiren');
?>