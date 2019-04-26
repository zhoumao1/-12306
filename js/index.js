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
	var $li = $('.sowingMap >li');
	var timer = null;
	var index = 0;
	
	// 切换
	function onChange() {
		timer = setInterval(function () {
			index++
			index %= 4
			$li.eq(index).fadeIn(800).siblings('li').fadeOut(800)
		}, 3000);
	}
	onChange()
	// 鼠标划入划出
	$('.sowingMap').hover(function () {
		clearInterval(timer);
	}, function () {
		setInterval(onChange(), 3000)
	})

	// 查询
	$('.search-side >li').click(function () {
		$(this).addClass('active').siblings('li').removeClass('active')
	})
	
	var searchTabBd = $('.search-tab-bd >div');
	// 查询右侧内容  // 正晚点切换 
	$('.search-tab-hd >ul >li').click(function () {
		var index = $(this).index();
		$(this).addClass('active').siblings('li').removeClass('active');
		searchTabBd.eq(index).fadeIn(600).siblings('div').fadeOut(600)
	})
	// 选项按钮
	$('.radio-list >li').click(function () {
		$(this).addClass('active').siblings('li').removeClass('active')
	})
	
	// 服务板块
	var serviceData = ['重点旅客预约', '遗失物品查找', '共享汽车', '便民托运', '车站引导', '站车风采', '用户反馈'];
	var serviceList = new AutoTemp('#service-temp', serviceData, '.service-list')

	// 服务板块 大图
	var serviceLgData = ['service-lg-01.jpg', 'service-lg-02.jpg', 'service-lg-03.jpg', 'service-lg-04.jpg']
	var serviceLg = new AutoTemp('#service-lg-temp', serviceLgData, '.service-lg')
	
	// 旅游板块
	var travelTrainData = [
		{
			'img': 'travel-pic-01.jpg',
			'title': '“环西部火车游” 高品质旅游版专线列车',
			'rmb': '￥',
			'price': '2560'
		},
		{
			'img': 'travel-pic-02.jpg',
			'title': '“环西部火车游” 陇上江南·行摄山>水陇南三日游',
			'rmb': '￥',
			'price': '930'
		},
		{
			'img': 'travel-pic-03.jpg',
			'title': '““环西部火车游”华夏寻根·人文始祖天水两日游',
			'rmb': '￥',
			'price': '980'
		},
		{
			'img': 'travel-pic-04.jpg',
			'title': '“环西部火车游”精品旅游线路',
			'rmb': '￥',
			'price': '3380'
		},
		{
			'img': 'travel-pic-05.jpg',
			'title': '“环西部火车游”美丽甘南三日游',
			'rmb': '￥',
			'price': '880'
		},
		{
			'img': 'travel-pic-06.jpg',
			'title': '“环西部火车游” 青海湖、茶卡2日>游',
			'rmb': '￥',
			'price': '880'
		},
		{
			'img': 'travel-pic-07.jpg',
			'title': '“环西部火车游”嘉敦5日游',
			'rmb': '￥',
			'price': '2260'
		},
		{
			'img': 'travel-pic-08.jpg',
			'title': '“环西部火车游” 敦煌一地三日游',
			'rmb': '￥',
			'price': '1380'
		}
	]
	var serviceLg = new AutoTemp('#travel-train-temp', travelTrainData, '.travel-train')

	// 底部数据
	var footData = [
		{'h2': '中国铁路官方微信', 'img': 'foot-code-01.png'},
		{'h2': '中国铁路官方微博', 'img': 'foot-code-02.png'},
		{'h2': '12306 公众号', 'img': 'foot-code-03.png'},
		{'h2': '铁路12306', 'img': 'foot-code-04.png'}
	]
	var serviceLg = new AutoTemp('#foot-code-temp', footData, '.foot-code')
	
	lay('#version').html('-v' + laydate.v);
	//执行一个laydate实例
	laydate.render({
		elem: '#numberValue' //指定元素
	});
	/* $('#bie_button').click(function () {
		console.log($('#numberValue').val());
	}) */
	$('#stationValueText').blur(function () {
		$(this).val() == '' ? 
		$(this).addClass('input-error').parent().next().fadeIn() : 
		$(this).removeClass('input-error').parent().next().fadeOut();
	})
	$('#toValueText').blur(function () {
		$(this).val() == '' ? 
		$(this).addClass('input-error').parent().next().fadeIn() : 
		$(this).removeClass('input-error').parent().next().fadeOut();
	})
	// 后台
})
