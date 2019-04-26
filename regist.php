<?php header('Content-type:text/html; charset=utf-8');
// print_r($_GET);
/**
 * 注册页面
 */
$name = trim($_GET['name']);
$pwd = md5(trim($_GET['pwd']).'jrZm'); // 加密密码
$password = trim($_GET['pwd']);
$link = new mysqli('localhost', 'root', 'root', 'ticket_info');
$link ->set_charset('utf8');

// 添加账号信息
$sql = "insert into login(name, pwd, salt, password) values('$name', '$pwd', 'jrZm', '$password')";
$res = $link ->query($sql);
if (!$res) {
	die('错误信息: '. $link ->error);
	exit();
}else {
	echo 'ok';
}

// 成功创建表

$sql = "CREATE TABLE ".$name."_admin ( `id` int(11) NOT NULL AUTO_INCREMENT, `tid` varchar(255) DEFAULT NULL, `uid` varchar(255) DEFAULT NULL, `num` varchar(255) DEFAULT NULL, `fromCity` varchar(255) DEFAULT NULL, `toCity` varchar(255) DEFAULT NULL, `fromTime` varchar(255) DEFAULT NULL, `price` varchar(255) DEFAULT NULL, `names` varchar(255) DEFAULT NULL, `date` varchar(255) DEFAULT NULL, `dingdNum` varchar(255) DEFAULT NULL, `zuo` varchar(255) DEFAULT NULL, `zuoNum` varchar(255) DEFAULT NULL , `zuoEng` varchar(255) DEFAULT NULL, PRIMARY KEY (`id`) ) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;";
 $res = $link ->query($sql);
if (!$res) {
	die('错误信息: '. $link ->error);
	exit();
}

?>