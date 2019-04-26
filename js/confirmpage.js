$(function () {
	// 判断页面是否有cookie 没有无法进入此页面
	if (!getCookie('name')) {
		location.assign('http://127.0.0.1:8088//demo/12306/view/index.html')
	}
	
	$('.show').show();
	// 选中联系人的信息
	var name, idCard, phoneNum;
	// 车次信息
	var trips = {}
	// 获取预定车票信息以及地址栏参数
	var url = parseUrl(location.search);
	var uid = getCookie('name'); // 该账户
	// 显示出预定的信息
	// 直接预订
	$.ajax({
		url: "http://127.0.0.1:8088//demo/12306/yd-ticket.php?tid="+ url.tid +"&uid="+ uid +"",
		error: function (error) {
			console.log(error.responseText);
		},
		success: function (res) {
			var res = JSON.parse(res);
			trips = res[0]
			if (res != undefined) {
				$('.show').hide();
			}
			var tempCont = $('#xinxi-temp').html();
			var htmlText = _.template(tempCont);
			var NewHtml = htmlText({data: res});
			// 防止添加多个
			if ($("#wrap-cont").html() == '') {
				$("#wrap-cont").html(NewHtml);
				if (res[1] == '') {
					// alert('msg');
					$('#lianxirenP').show();
				}
			}
		}
	})
	// 提交订单
	function submit(tid, uid, num, fromCity, toCity, fromTime, price, names, date, dingdNum, zuo, zuoEng) {
		$.ajax({
			method:'post',
			data: {
				tid: tid,
				uid: uid,
				num: num,
				fromCity: fromCity,
				toCity: toCity,
				fromTime: fromTime,
				price: price,
				names: names,
				date: date,
				dingdNum: dingdNum,
				zuo: zuo,
				zuoEng: zuoEng
			},
			url: 'http://127.0.0.1:8088//demo/12306/confirmpage-add.php',
			error: function (error) {
				console.log(error);
			},
			success: function (res) {
				console.log(res);
				if (res != undefined) {
					$('.show').hide();
					$('.msg-success').fadeIn().siblings('.msg-error').hide();
				}
				location.assign('http://127.0.0.1:8088//demo/12306/view/admin.html?view=order')
			}
		})
	}
	// 修改订单
	function updateSub(oldTid, tid, id, uid, num, fromCity, toCity, fromTime, price, names, date, dingdNum, zuo, zuoEng, oldZuoEng) {
		$.ajax({
			method:'post',
			data: {
				oldTid: oldTid,
				tid: tid,
				id: id,
				uid: uid,
				num: num,
				fromCity: fromCity,
				toCity: toCity,
				fromTime: fromTime,
				price: price,
				names: names,
				date: date,
				dingdNum: dingdNum,
				zuo: zuo,
				zuoEng: zuoEng,
				oldZuoEng: oldZuoEng
			},
			url: 'http://127.0.0.1:8088//demo/12306/admin-resginTrain-one.php',
			error: function (error) {
				console.log(error);
			},
			success: function (res) {
				console.log(res);
				if (res != undefined) {
					$('.show').hide();
					$('.msg-success').fadeIn().siblings('.msg-error').hide();
				}
				//TODO:12306修改订单
				location.assign('http://127.0.0.1:8088//demo/12306/view/admin.html?view=order')
			}
		})
	}
	if (url.id == undefined) { // 是否进入预订
		$('#submitOrder_id').click(function () {
			// 是否有信息提交
			if ($('#normal_passenger_id :checkbox').is(':checked')) {
				$('.show').show();
				var d=new Date()
				var day=d.getDate()
				var month=d.getMonth() + 1
				var year=d.getFullYear()
				
				trips.date = (year + "-" + month + "-" + day) ; // 日期
				trips.price = ($(".seatType_1").val()).split(',')[0] // 票价
				trips.names = name // 购票人
				trips.zuo = ($(".seatType_1").val()).split(',')[1] // 座位
				trips.zuoEng = ($(".seatType_1").val()).split(',')[2] // 座位(字段名)
				var time = (trips.date.split('-')).join('');
				var str = Math.floor(Math.random()*1000) + '';
				trips.dingdNum = Math.floor(2019420+str);
				console.log(trips);
				// submit(trips.tid, uid, trips.num, trips.fromCity, trips.toCity, trips.fromTime, trips.price, trips.names, trips.date, trips.dingdNum, trips.zuo, trips.zuoEng);
			}
		})
	}
	if (url.id != undefined) { // 是否进入修改提交
		var id = url.id;
		$('#submitOrder_id').click(function () {
			// 是否有信息提交
			if ($('#normal_passenger_id :checkbox').is(':checked')) {
				$('.show').show();
				var d=new Date()
				var day=d.getDate()
				var month=d.getMonth() + 1
				var year=d.getFullYear()
				trips.oldTid = url.oldTid // 原始车票id
				trips.date = (year + "-" + month + "-" + day) ; // 日期
				trips.price = ($(".seatType_1").val()).split(',')[0] // 票价
				trips.names = name // 购票人
				trips.zuo = ($(".seatType_1").val()).split(',')[1] // 座位
				trips.zuoEng = ($(".seatType_1").val()).split(',')[2] // 座位(字段名)
				trips.oldZuoEng = url.oldZuoEng;
				var time = (trips.date.split('-')).join('');
				var str = Math.floor(Math.random()*1000) + '';
				trips.dingdNum = Math.floor(2019420+str);
				console.log(trips);
				updateSub(trips.oldTid, trips.tid, id,uid, trips.num, trips.fromCity, trips.toCity, trips.fromTime, trips.price, trips.names, trips.date, trips.dingdNum, trips.zuo, trips.zuoEng, trips.oldZuoEng);
			}
		})
	}
	
	$("#wrap-cont").delegate('#normal_passenger_id :checkbox', 'click', function () {
		// 是否选中
		/* if ($(this).prop('checked')) {
			name = $(this).attr('data-name');
			idCard = $(this).attr('data-idcard');
			phoneNum = $(this).attr('data-phone');
			
			// $('#ticketInfo_id').children('.tr_id_1').eq(0).clone().appendTo('#ticketInfo_id').find('.pos-rel').children('input').val(name)
			$(".passenger_name_1").val(name);
			$("#passenger_id_no_1").val(idCard);
			$("#phone_no_1").val(phoneNum);
		}else {
			$(".passenger_name_1").val('');
			$("#passenger_id_no_1").val('');
			$("#phone_no_1").val('');
		} */

		/**
		 * TODO: 实现购买多张票
		 */

		var flag = $(this).prop('checked');
		if (flag) {
			console.log($(this).is(':checked'));
			name = $(this).attr('data-name');
			idCard = $(this).attr('data-idcard');
			phoneNum = $(this).attr('data-phone');
			
			console.log($("#normal_passenger_id :checkbox").length);
			// 3 5 6
			// 第一步克隆
			$("#ticketInfo_id").children('.tr_id_1').eq(0).clone()
				.attr('name', name).appendTo('#ticketInfo_id')
			// 接着修改value
			$("#ticketInfo_id").find('tr[name='+ name +']')
				.children('td').eq(3).find('input').val(name)
				.parents('tr').children('td').eq(5).find('input').val(idCard)
				.parents('tr').children('td').eq(6).find('input').val(phoneNum)
			
		}else{
			name = $(this).attr('data-name');
			$('#ticketInfo_id tr').remove('tr[name= '+ name +']')
		}
		
		

	})
	
	
	// 上一步
	$("#preStep_id").click(function () {
		var fromCity, toCity;
		fromCity = getStr(trips.fromCity)
		toCity = getStr(trips.toCity)
		location.assign('http://127.0.0.1:8088//demo/12306/view/trainlist.html?fromCity='+ fromCity +'&toCity='+ toCity +'');
	})
})

/*

$('#ticketInfo_id').append(
	'<tr id="tr_id_1" name='+ name +'>'+
		'<td align="center">1</td>'+
		'<td>'+
			'<select id="ticketType_1" name="confirmTicketType" onchange="javascript:updateSeatTypeByeTickeType(this);">'+
				'<option name="ticket_type_option" value="1" selected="selected">成人票</option>'+
				'<option value="2">儿童票 </option>'+
				'<option value="3">学生票 </option>'+
				'<option value="4">残军票 </option>'+
			'</select>'+
		'</td>'+
		'<td>'+
			'<select onclick="javascript:stepFirValidatorTicketInfo(true);" id="seatType_1">'+
				'<option value="${ticketInfo2.p10}" selected="selected">无座 ${ticketInfo2.p10}</option>'+
				'<option value="${ticketInfo2.p1}" >商务座 ${ticketInfo2.p1}</option>'+
				'<option value="${ticketInfo2.p2}" >一等座 ${ticketInfo2.p2}</option>'+
				'<option value="${ticketInfo2.p3}" >二等座 ${ticketInfo2.p3}</option>'+
				'<option value="${ticketInfo2.p5}" >软卧 ${ticketInfo2.p5}</option>'+
				'<option value="${ticketInfo2.p7}" >硬卧 ${ticketInfo2.p7}</option>'+
				'<option value="${ticketInfo2.p9}" >硬座 ${ticketInfo2.p9}</option>'+
			'</select>'+
		'</td>'+
		'<td>'+
			'<div class="pos-rel">'+
			'<input id="passenger_name_1" value="'+ name +'" name="name" class="inptxt w110" size="12" maxlength="20" readonly="readonly" style="color: rgb(153, 153, 153); border: 1px solid rgb(207, 205, 199);" title="不允许修改乘车人信息">'+
			'<div class="w110-focus" id="passenger_name_1_notice" style="display: none;"></div>'+
		'</div>'+
	'</td>'+
	'<td>'+
		'<select id="passenger_id_type_1" readonly="readonly" style="color:#999999" title="不允许修改乘车人信息">'+
			'<option value="1" selected="selected"> 中国居民身份证 </option>'+
			'<option value="C">港澳居民来往内地通行证</option>'+
			'<option value="G">台湾居民来往大陆通行证</option>'+
			'<option value="B">护照</option>'+
			'<option value="H">外国人永久居留身份证</option>'+
		'</select>'+
	'</td>'+
	'<td>'+
		'<div class="pos-rel">'+
			'<input type="hidden" value="idcard" name="idcard"/>'+
			'<input id="passenger_id_no_1" class="inptxt w160" value="'+ idcard +'" name="idcard" size="20" maxlength="35" readonly="readonly" style="color: rgb(153, 153, 153); border: 1px solid rgb(207, 205, 199);" title="不允许修改乘车人信息">'+
			'<div class="w160-focus" id="passenger_id_no_1_notice" style="display: none;"></div>'+
		'</div>'+
	'</td>'+
	'<td>'+
		'<div class="pos-rel"><input id="phone_no_1" class="inptxt w110" value="'+ phonenum +'" name="phonenum" size="11" maxlength="20" readonly="readonly" style="color: rgb(153, 153, 153); border: 1px solid rgb(207, 205, 199);" title="不允许修改乘车人信息">'+
			'<div class="w160-focus" id="phone_no_1_notice" style="display: none;"></div>'+
		'</div>'+
	'</td>'+
	'<td style="width:40;">'+
		'<a href="javascript:" id="addchild_1" name="addchild_default_0"></a>'+
	'</td>'+
	'<td title="删除常用联系人">'+
		'<span class="i-del" onclick="javascript:delPassengerInfo(this);" id="del_1_default_0"></span>'+
	'</td>'+
'</tr>')

 */