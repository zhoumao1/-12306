$(function () {
	// 判断页面是否有cookie 没有无法进入此页面
	if (!getCookie('name')) {
		location.assign('http://127.0.0.1:8088//demo/12306/view/index.html')
	}
	var url = parseUrl(window.location.search);
	var unames = getCookie('name'); // 用户cookie
	var oldTid, oldZuoEng, ydCache, oldFromCity, oldToCity, newFromCity, newToCity; // 预订缓存, 原始出发站及到达站
	
	/**
	 * 获取地址栏参数
	 * @param 	{string} url 带有参数的路径
	 * @return	{object} 	返回一个对象
	 */
	function parseUrl(url){
		if(url.indexOf("?") == -1) {
			return {};
		}
		var query = url.split("?")[1];
		var queryArr = query.split("&");
		var obj = {};
		queryArr.forEach(function(item){
			var key = item.split("=")[0];
			var value = item.split("=")[1];
			obj[key] = decodeURIComponent(value);
		});
		return obj;
	}

	/**
	 * listFun()隔行变色, 更新数据
	 * @param	{res}	result	后台传入的数据
	 * @param	{str}	from	出发站
	 * @param	{str}	to	到达站
	 */
	function listFun(result, from, to) {
		// 隔行变色
		var evenTr = $('table tbody >tr:even');
		evenTr.css('background', '#eef1f8').next('tr').css('background', '#eef1f8')
		var trBgcPrice = $('table tbody >tr.bgc-price:odd');
		trBgcPrice.prev('tr').css('background', '#fff')

		// 更改查询信息以及总共车次
		$('.sear-result').find('strong').eq(0).html(from +' --> '+ to);
		var sumTrain = result.length;
		$("#trainum").html(sumTrain);
	}
	// 事件委托(切换显示价钱)
	$('table tbody').delegate('b', 'click',function () {
		$(this).toggleClass('open')
		$(this).parents('tr.bgc').next('.bgc-price').toggle()
	})
	// 时间控件
	lay('#version').html('-v' + laydate.v);
	//执行一个laydate实例
	laydate.render({
		elem: '#train_date' //指定元素
	});
	// 预定
	function ydTicket(tid) {
		$.ajax({
			url: 'http://127.0.0.1:8088//demo/12306/yd-ticket.php',
			data: {tid: tid},
			error: function (error) {
				console.log(error);
			},
			success: function (res) {
				console.log(res);
				if (res != undefined) {
					$('.show').hide();
				}
				location.assign('http://127.0.0.1:8088//demo/12306/view/confirmpage.html?tid='+ tid +'')
			}
		})
	}
	// 当前页面查询
	function train(from, to, trainData) {
		// $('.show').show();
		// 是否进入查询
		if (oldFromCity != newFromCity || oldToCity != newToCity) {
			$('.show').show()
			$.ajax({
				type: 'post',
				url: '../trainlist.php',
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
					oldFromCity = from;
					oldToCity = to;
					ydCache = result
					// 加载gif
					ydCache != undefined ? $('.show').hide() : false
					var tempCont = $('#train-list-temp').html();
					var htmlText = _.template(tempCont);
					var NewHtml = htmlText({result: result});
					$("#queryLeftTable").html(NewHtml);
					listFun(result, fromVal, toVal)
				}
			});
		}

	}
	if (url.fromCity != undefined && url.toCity != undefined) {
		// 保存上一查查询的结果
		ydCache == undefined ? $('.show').show() : false;
		$.ajax({
			method: "post",
			async: true,
			url: "http://127.0.0.1:8088//demo/12306/index-select.php?fromCity="+ url.fromCity +"&toCity="+ url.toCity +"", // 远程地址
			success: function (res) {
				var res = JSON.parse(res);
				ydCache = res;
				// 加载gif
				if (ydCache != undefined) {
					$('.show').hide();
				}
				$('#fromStationText').val(url.fromCity);
				$('#toStationText').val(url.toCity);
				var tempCont = $('#train-list-temp').html();
				var htmlText = _.template(tempCont);
				var NewHtml = htmlText({result: ydCache});
				$("#queryLeftTable").html(NewHtml);
				listFun(ydCache, url.fromCity, url.toCity);
			},
			error: function (error) {
				console.log(error.responseText);
			}
		});
		// 当前页面查询重置
		$('#selectFrom').submit(function () {
			fromVal = $.trim($('#fromStationText').val());
			toVal = $.trim($('#toStationText').val());
			ydCache != undefined ? $('.show').hide() : false
			train(fromVal, toVal);
			return false
		})
		$('#fromStationText').blur(function () {
			newFromCity = $(this).val()
		})
		$('#toStationText').blur(function () {
			newToCity = $(this).val()
		})
		// 预定按钮
		$('#queryLeftTable').delegate('.scheduled', 'click', function () {
			$('.show').show();
			var tid = $(this).parents('tr').attr('data-tid');
			// 获取id
			$("#hid").val(tid);
			var unames = getCookie('name');
			ydTicket(tid)
		})
	}else if (window.location.search == '') { // 如果参数为空 ->首页
		location.assign("http://127.0.0.1:8088//demo/12306/view/index.html")
	}
	// 改签
	if($.trim(url.msg) == 'resginTrain' && $.trim(url.id) != undefined){
		// 无法修改地址
		// readonly="readonly"
		$('#fromStationText').attr({
			readonly: 'readonly',
			title: '不可修改出发地址'
		})
		$('#toStationText').attr({
			readonly: 'readonly',
			title: '不可修改出发地址'
		})
		var id = url.id; // 订单id
		$('#queryLeftTable').delegate('.scheduled', 'click', function () {
			console.log(1);
			$('.show').show();
			oldTid = url.oldTid; // 原来的车票
			oldZuoEng = url.oldZuoEng; // 原来的车票
			var tid = $(this).parents('tr').attr('data-tid');
			// 获取id
			$("#hid").val(tid);
			location.assign('http://127.0.0.1:8088//demo/12306/view/confirmpage.html?tid='+ tid +'&oldTid='+ oldTid +'&id='+ id +'&oldZuoEng='+ oldZuoEng +'');
		})
	}
})
