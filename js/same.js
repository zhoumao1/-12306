/**
 * 网站的页眉、底部
 */
$(function () {
	
	/**
	 * [AutoTemp temp模板生成]
	 * @param   {[Object]}  tempEle  [传入模板节点]
	 * @param   {[Object]}  data     [传入数据]
	 * @param   {[Object]}  domEle   [传入页面DOM节点]
	 */
	function AutoTemp(tempEle, data, domEle) {
		this.temp = $(tempEle).html();
		this.text = _.template(this.temp);
		this.newData = this.text({data: data});
		$(domEle).html(this.newData);
	}
	// 右侧菜单
	$('#slide-menu').hover(function () {
		$(this).children('ul').stop(true, true).slideDown();
	}, function () {
		$(this).children('ul').stop(true, true).slideUp();
	})
	// 通过模板传数据
	var navData = [
		{
			"h3": "购买",
			"linkContent": {
				"one": '单程',
				"two": '往返',
				"three": '连续换乘'
			}
		},
		{
			"h3": '变更',
			"linkContent": {
				"one": '退票',
				"two": '改签',
				"three": '变更到站'
			},
		},
		{
			"h3": '更多',
			"linkContent": {
				"one": '中铁银通卡',
				"two": '广九直通车',
				"three": '市郊快速铁路',
				"four": "国际列车"
			},
		}
		
	]
	var tempCont = $('#nav-temp').html();
	var htmlText = _.template(tempCont);
	var NewHtml = htmlText({navData: navData});
	$("#nav-hd").html(NewHtml);

	// 导航栏菜单出现
	$('.nav > li:eq(1)').hover(function () {
		$(this).children('div').stop().slideDown(200)
	}, function () {
		$(this).children('div').stop().slideUp(200)
	})
	
	// 底部数据
	var footData = [
		{'h2': '中国铁路官方微信', 'img': 'foot-code-01.png'},
		{'h2': '中国铁路官方微博', 'img': 'foot-code-02.png'},
		{'h2': '12306 公众号', 'img': 'foot-code-03.png'},
		{'h2': '铁路12306', 'img': 'foot-code-04.png'}
	]
	var serviceLg = new AutoTemp('#foot-code-temp', footData, '.foot-code')

	$('section').css('minHeight', '439px') // 439

	// 判断页面是否有cookie
	if (getCookie('name')) {
		var name = getCookie('name');
		$("#loginOut-line").show() // 分割线显示
		$("#loginOut").show() // 退出显示
		$('#Cookflag').show(); // 显示用户信息
		$('#Cookflag').prev('li').hide();
		$("#user-name").html(name)
	}

	// 退出
	$('#loginOut').click(function () {
		if (confirm('是否退出登录')) {
			delCookie()
			location.assign('http://127.0.0.1:8088//demo/12306/view/login.html');
		}
	})
	
})

