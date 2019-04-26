/**
 * 首页获取数据脚本
 */
var fromVal, toVal, trainDate;
function train(from, to, trainData) {
	$.ajax({
		type: 'post',
		url: 'http://127.0.0.1:8088//demo/12306/index-select.php?fromCity='+ from +'&toCity='+ to +'',
		dataType: 'json',
		data: {
			"fromCity": from,
			"toCity": to,
			// "trainDate": trainData
		},
		error: function (error) {
			console.log(error);
		},
		success: function (result) {
			if (result != undefined) {
				$('.show').hide();
				console.log(1);
			}
			// 判断页面是否有cookie 没有无法进入此页面
			if (!getCookie('name')) {
				location.assign('http://127.0.0.1:8088//demo/12306/view/login.html')
			}else {
				open('http://127.0.0.1:8088//demo/12306/view/trainlist.html?fromCity='+ from +'&toCity='+ to +' ' ,"_blank");
			}
		}
	});
}
// 提交
$('#indexSelect').submit(function () {
	fromVal = $('#stationValueText').val();
	toVal = $('#toValueText').val();
	// trainDate = $('#train_date').val()
	fromVal == '' ?
	$('#stationValueText').addClass('input-error').parent().next().fadeIn() : 
	$('#stationValueText').removeClass('input-error').parent().next().fadeOut();
	toVal == '' ? 
	$('#toValueText').addClass('input-error').parent().next().fadeIn() : 
	$('#toValueText').removeClass('input-error').parent().next().fadeOut();
	(fromVal && toVal) != '' ? $('.show').show() && train(fromVal, toVal) : false;
	return false;
})