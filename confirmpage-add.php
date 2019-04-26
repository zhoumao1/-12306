<?php header('Content-type:text/html; charset=utf-8');
/**
 * 提交订单
 */
/**
*生成随机字符串
*
*@param  $length 随机字符串的长度
*@return $str 生成的随机字符串
*/

function randStr($length=6){
	$str = 'ABCDEF';
	$str = str_shuffle($str); //随机打乱
	return substr($str, 0,$length);
}
// 获取前台参数
// tid, uid, num, fromCity, toCity, fromTime, price, names, date, dingdNum, zuo, zuoEng
// print_r($_POST);
// exit();
$tid = $_POST['tid'];
$uid = $_POST['uid'];
$num = $_POST['num'];
$fromCity = $_POST['fromCity'];
$toCity = $_POST['toCity'];
$fromTime = $_POST['fromTime'];
$price = $_POST['price'];
$names = $_POST['names'];
$date = $_POST['date'];
$dingdNum = $_POST['dingdNum'];
$zuo = $_POST['zuo'];
$zuoEng = $_POST['zuoEng'];
// 座位号
$num1 = floor(rand(0, 9));
$num2 = floor(rand(10, 100));
$num3 = randStr(1);
$zuoNum = '0'. $num1 .'车'. $num2 .$num3.'号';
$link = new mysqli('localhost', 'root', 'root', 'ticket_info');
$link ->set_charset('utf8');

// 添加订单
$sql = "insert into ".$uid."_admin(tid, uid, num, fromCity, toCity, fromTime, price, names, date, dingdNum, zuo, zuoNum, zuoEng) values($tid, '$uid', '$num', '$fromCity', '$toCity', '$fromTime', '$price', '$names', '$date', '$dingdNum', '$zuo', '$zuoNum', '$zuoEng')";
$res = $link ->query($sql);
if (!$res) {
	die('错误信息: '. $link ->error);
	exit();
}else {
	// 减少车票
	// 需要获取座位名(数据库的字段名)
	$sql = "update ticket_info set $zuoEng=$zuoEng-1 where tid=$tid";
	$res = $link ->query($sql);
	!$res ? die('错误信息: '.$link ->error) : false;
}

?>