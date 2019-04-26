<?php header('Content-type:text/html; charset=utf-8');
function randStr($length=6){
	$str = 'ABCDEF';
	$str = str_shuffle($str); //随机打乱
	return substr($str, 0,$length);
}
$num1 = floor(rand(0, 9));
$num2 = floor(rand(10, 100));
$num3 = randStr(1);
echo $zuoNum = '0'. $num1 .'车'. $num2 .$num3.'号';
?>