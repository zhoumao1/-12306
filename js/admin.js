$(function () {
	// 判断页面是否有cookie 没有无法进入此页面
	if (!getCookie('name')) {
		location.assign('http://127.0.0.1:8088//demo/12306/view/index.html')
	}
	var uid = getCookie('name');
	var url = parseUrl(location.search);
	var lianxirenCache = ''; // 联系人缓存
	var orderCache; // 订单缓存
	var $li = $('.center-menu >li >h2').click(function () {
		$(this).next('ul').stop().slideToggle()
		$(this).children('i').toggleClass('deg')
	})
	$('.center-menu >li >ul').hide()
	// 火车票信息
	$('#chepiaodingdan').click(function () {
		$('.subway-order').show().siblings().hide()
		
	})
	// 常用联系人
	$('#cylianxiren').click(function () {
		$('#js-minHeight-ren').show().siblings().hide()
	})
	// 个人信息
	$('#gerenxinxi').click(function () {
		$('.form').show().siblings().hide()
	})
	// 编辑按钮
	$('#relation_way_edit').click(function () {
		$(this).hide().siblings('a').show().parents('.center-tit').nextAll('.form-list-edit').show().siblings('.form-list-view').hide()
	})
	// 保存按钮
	$('#relation_way_save').click(function () {
		$(this).hide().siblings('a').show().parents('.center-tit').nextAll('.form-list-view').show().siblings('.form-list-edit').hide()
	})

	// 添加修改
	$("#edit_contact").click(function () {
		$(".addWrap").css('display', 'block').children('#update-form').css('display', 'none').prev('#add-form').show()
		$('.msg-success').hide();
		$('.msg-error').hide();
	})
	// 获取修改/删除id
	var funId; // 通过id删除或者修改
	// 编辑联系人按钮
	$('.order-item-bd').delegate('#update-line', 'click', function () {
		$(".addWrap").css('display', 'block').children('#add-form').css('display', 'none').next('#update-form').show()
		var name = $.trim($(this).parents('tr').find('.name-yichu').html());
		var idCard = $.trim($(this).parents('tr').find('.idCard-yichu').html());
		var phoneNum = $.trim($(this).parents('tr').find('.phoneNum-yichu').html());
		funId = $.trim($(this).parents('table').prev('.funId').val());
		$('#up-name').val(name);
		$('#up-idCard').val(idCard);
		$('#up-phoneNum').val(phoneNum);
	})
	// 后退取消
	$(".list-operation .exit").click(function () {
		$(".addWrap").css('display', 'none')
		$('.msg-success').hide();
		$('.msg-error').hide();
		$('#js-minHeight-ren').fadeIn()
		if (lianxirenCache == '') {
			$('#lianxirenNull').fadeIn()
		}
	})
	
	// 批量删除单选多选按钮
	$('.order-item-table').delegate('div.icheckbox', 'click', function () {
		// $(this).toggleClass('.checked')
		console.log($(this));
	})
	$('#batch_del').click(function () {
		var flag = true;
		if (flag == true) {
			$('.order-item-bd :input:checkbox ').prop('checked', false)
		}
	})
	
	
	if (orderCache == undefined) {
		$('.show').show()
	}
	// 展示订单
	var clickFlag = false;// 点击监控
	var index = 0;
	function paging(num, uid) {
		$.ajax({
			url: 'http://127.0.0.1:8088//demo/12306/admin-showDingdan.php',
			method: 'post',
			data: {uid: uid},
			error: function (error) {
				console.log(error);
			},
			success: function (res) {
				var res = JSON.parse(res);
				orderCache = res
				// console.log(orderCache);
				orderCache != undefined ? $('.show').hide() : false;
				orderCache == '' ? $("#orderNull").fadeIn() : $("#orderNull").fadeOut()
				// $('.msg-success').fadeIn().siblings('.msg-error').hide();
				var tmpArr, pagNum;
				pagNum = res.length // 文章数

				// 判断是否有该页数
				if (num > Math.ceil(pagNum/3)) {
					num = Math.ceil(pagNum/3)
					pagVal = $("#page_jump").prev('.page-skip').children('input').val(num)
				}
				// num > Math.ceil(pagNum/3) ? num = Math.ceil(pagNum/3) : false;
				console.log(pagNum/3);

				// 判断是否点击页码数
				if (clickFlag == false && num == 0) {
					tmpArr = orderCache.slice(num*3, (num+1)*3);
				}else if (clickFlag == true) { // 点击时
					tmpArr = orderCache.slice((num-1)*3, ((num-1)+1)*3);
				}
				var tempCont = $('#dingdan-temp').html();
				var htmlText = _.template(tempCont);
				var NewHtml = htmlText({data: tmpArr});
				$("#not_travel >.order-item").html(NewHtml);

				// paging
				var pagArr = getPage(pagNum, num, 3); //页码数数组
				var pTmpCont = $('#page_temp').html();
				var pUndeCont = _.template(pTmpCont);
				var pCont = pUndeCont({pagData: pagArr});
				$("#page_mod").html(pCont); // 生成页码数
				$(".page-all").children('strong').html(Math.ceil(pagNum/3));
				/**
				 * TODO:
				 * 	点击页码获取该页码在数组中的位置, 根据该下标给页码添加背景
				 */
				if ($('#page_mod').find('a').html() == index) {
					$('#page_mod').find('a').parent('li').addClass('active').siblings('li').removeClass('active')
				}
				//  $('#page_mod').find('li').eq(index).addClass('active').siblings('li').removeClass('active')
			}
		})
	}
	// 默认调用
	paging(0, uid)
	$('#page_mod').delegate('li>a', 'click', function () {
		$('.show').show()
		// index = $(this).parent('li').index();
		index = $(this).html();
		var pageNum = $(this).attr('data-pageNum');
		clickFlag = true
		paging(pageNum, uid);
		// $(this).parent('li').addClass('active').siblings('li').removeClass('active')

	})

	// 跳转页码
	$("#page_jump").click(function () {
		clickFlag = true
		var pagVal = $(this).prev('.page-skip').children('input').val();
		paging(pagVal, uid)
	})
	
	// 改签
	function resginTrain(id, oldTid, uid, oldZuoEng, fromCity, toCity) {
		fromCity = getStr(fromCity);
		toCity = getStr(toCity);
		open('http://127.0.0.1:8088//demo/12306/view/trainlist.html?oldTid='+ oldTid +'&id='+ id +'&uid='+ uid +'&oldZuoEng='+ oldZuoEng +'&toCity='+ toCity +'&fromCity='+ fromCity +'&msg=resginTrain ')
	}
	
	// 改签
	$('.order-item').delegate('.resignTrain', 'click', function () {
		var id = $(this).attr('date-id');
		var oldTid = $(this).attr('date-tid');
		var oldZuoEng = $(this).attr('date-oldZuoEng');
		var fromCity = $(this).attr('date-fromCity');
		var toCity = $(this).attr('date-toCity');
		resginTrain(id, oldTid, uid, oldZuoEng, fromCity, toCity);
	})

	// 展示联系人
	
	function showLianxiren() {
		$.ajax({
			method: 'post',
			url: 'http://127.0.0.1:8088//demo/12306/admin-showPerson.php',
			data: {uid: uid},
			error: function (error) {
				console.log(error);
			},
			success: function (res) {
				var res = JSON.parse(res);
				lianxirenCache = res
				lianxirenCache != undefined ? $('.show').hide() : false;
				// $('.msg-success').fadeIn().siblings('.msg-error').hide();
				// 如果联系人为空
				lianxirenCache == '' ? $("#lianxirenNull").fadeIn() : $("#lianxirenNull").fadeOut()
				var tempCont = $('#showPonse-temp').html();
				var htmlText = _.template(tempCont);
				var NewHtml = htmlText({data: res});
				$(".showPonse").html(NewHtml);
			}
		})
	}
	$('#cylianxiren').click(function () {
		lianxirenCache == '' ? $('.show').show() : false
		showLianxiren()
	})

	// 添加联系人
	function addPerson(name, cid, phoneNum, uid) {
		$.ajax({
			url: 'http://127.0.0.1:8088//demo/12306/admin-add.php',
			data: {
				name: name,
				cid: cid,
				phoneNum: phoneNum,
				uid: uid
			},
			error: function (error) {
				console.log(error);
				$('.msg-error').fadeIn().siblings('.msg-success').hide();
			},
			success: function (res) {
				console.log(res);
				location.assign('http://127.0.0.1:8088//demo/12306/view/admin.html?view=lianxiren')
				if (res != undefined) {
					$('.show').hide();
					$('.msg-success').fadeIn().siblings('.msg-error').hide();
				}
				$("#lianxirenNull").fadeOut()
			}
		})
	}
	$("#add-form").submit(function () {
		var name = $.trim($('#add-name').val());
		var cid = $.trim($("#add-CID").val());
		var phoneNum = $.trim($('#add-phoneNum').val());
		// 不可提交为空
		if (name != '' || cid != '' || phoneNum != '' ) {
			$('.show').show();
			addPerson(name, cid, phoneNum, uid);
		}
		return false;
	})
	
	// 修改联系人
	function update(funId, uid, name, idCard, phoneNum) {
		$.ajax({
			type: 'post',
			url: 'http://127.0.0.1:8088//demo/12306/admin-update.php',
			data: {
				funId: funId,
				uid: uid,
				name: name,
				idCard: idCard,
				phoneNum: phoneNum
			},
			error: function (error) {
				console.log(error);
			},
			success: function (res) {
				console.log(res);
				location.assign('http://127.0.0.1:8088//demo/12306/view/admin.html?view=lianxiren')
			}
		})
	}
	$('#update-form').submit(function () {
		var name = $('#up-name').val();
		var idCard = $('#up-idCard').val();
		var phoneNum = $('#up-phoneNum').val();
		update(funId, uid, name, idCard, phoneNum)
		return false;
	})

	// 优化页面显示
	// http://127.0.0.1:8088//demo/12306/view/admin.html?view=order
	// 直接进入后台
	if (window.location.search == '' || url.view == 'order') {
		$('.subway-order').fadeIn()
		$('#js-minHeight-ren').hide()
		$('.center-menu >li >ul').eq(0).slideDown()
		orderCache != undefined ? $('.show').hide() : false;
	}
	// 联系人跳转
	if (url.view == 'lianxiren') {
		lianxirenCache == '' ? $('.show').show() : false;
		$('#js-minHeight-ren').fadeIn();
		$('.subway-order').hide();
		$('.center-menu >li >ul').eq(1).slideDown()
		showLianxiren()
	}
	// 添加联系人跳转
	if (url.view == 'add_lianxiren') {
		$('.show').hide();
		$('#js-addRen').show() // 联系人展示
		$('.addWrap').show().children('#add-form').fadeIn().siblings().hide()
		$('.subway-order').hide();
		$('.center-menu >li >ul').eq(1).slideDown()
		$('#add-btn').click(function () {
			history.go(-1);
		})
		// 如果当前页面是跳转来的添加页面 则更改地址
		$('#cylianxiren').click(function () {
			location.assign('http://127.0.0.1:8088//demo/12306/view/admin.html?view=lianxiren')
			$('#lianxirenNull').fadeIn()
		})
		// showLianxiren()
	}
})