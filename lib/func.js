/**
 * 设置cookie
 */
function setCookie(name, value, time) {
	document.cookie = name +'='+ encodeURIComponent(value) +';max-age='+ time*24*60*60
	// document.cookie = name + '=' + value + ';max-age=' + time * 24 * 60 * 60
}
/**
 * 取cookie
 */
function getCookie(name) {
	// 用分号分割成数组
	var arr = document.cookie.split(';')
	for (var i = 0; i < arr.length; i++) {
		// 遍历后用等号继续分割
		var arrCook = arr[i].split('=')
		// 清除空格, 如果第一个等于用户输入的属性返回 对应的值
		if (arrCook[0].trim() == name) {
			return decodeURIComponent(arrCook[1])
		}
	}
	return false;
}

/**
 * 删cookie
 */
function delCookie() {
	var arr = document.cookie.split(';')
	// 原理: 将生命周期为空, 或者为空
	for (var i = 0; i < arr.length; i++) {
		var arrCook = arr[i].split('=')[0]
		document.cookie = arrCook + '=; max-age=-1'
	}
}
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
 * 获取车站名
 * @param {string} str 需要获取的车站
 */
function getStr(str) {
	var reg = /[东南西北]/;
	var index = str.length - 1;
	var regStr = str.charAt(index);
	var flag = reg.test(regStr); // 是否进入判断进行截取
	if (flag) {
		return str.slice(0, index)
	}else {
		return str.slice(0)
	}
}

/**
 * 获取页码数, 固定显示 5 个页码数
 * @param 	{int} 	num 总文章数
 * @param 	{int} 	cnt 每页显示几篇文章
 * @param 	{int} 	curr 当前页面的页码数
 * @return  {array}  pages获取到的页码数
 */
function getPage(num, curr, cnt = 2) {
	// 总页码数
	var pagenum = Math.ceil(num / cnt);
	// 确定最左边的页码数
	var left = Math.max(curr - 2, 1);
	// 最右边的页码数
	var right = Math.min(left + 4, pagenum);
	// 确定最左边的页码数
	left = Math.max(right - 4, 1);
	var page = [];
	for (var i=left; i <= right; i++) { 
		page.push(i);
	}
	return page;
}
