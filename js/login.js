$(function () {
	var $li = $('.login-hd >li');
	var $loginName = $('#login-name'); // 登录用户名
	var $loginPwd = $('#login-pwd'); // 登录密码
	var $registName = $('#regist-name'); // 注册用户名
	var $registPwd = $('#regist-pwd'); // 注册密码
	var reg = /^[z-z0-9_-]{3,5}$/ // 用户名正则
	var $regist = $('#regist'); // 注册
	var $login = $("#login"); // 登录
	$li.click(function () {
		var index = $(this).index();
		$(this).addClass('active').siblings('li').removeClass('active');
		$('.login-bd').eq(index).show().siblings('.login-bd').hide();
	})
	$('.login-item input').focus(function () {
		$(this).addClass('input-action').parent('.login-item').siblings('.login-item').children('input').removeClass('input-action')
	})
	
	// 注册验证
	function regVerify(name, pwd) {
		$.ajax({
			url: 'http://127.0.0.1:8088//demo/12306/reg-verify.php',
			data: {
				name: name,
				pwd: pwd
			},
			error: function (error) {
				console.log(error);
			},
			success: function (res) {
				console.log(res);
				if (res == 'error') {
					$("#reg-msg").fadeIn().next('#reg-msg2').fadeOut();
					$("#regist >.login-btn >input").attr('type', 'button');
				}else {
					$("#reg-msg").fadeOut();
					$("#regist >.login-btn >input").attr('type', 'submit');
				}
			}
		})
	}
	$registName.blur(function () {
		var nameVal = $.trim($registName.val());
		if (!reg.test(nameVal)) {
			$("#reg-msg2").fadeIn().prev('#reg-msg').fadeOut()
		}else {
			$("#reg-msg2").fadeOut()
		}
		regVerify($registName.val(), $registPwd.val());
	})
	// 注册
	function regist(name, pwd) {
		$.ajax({
			url: 'http://127.0.0.1:8088//demo/12306/regist.php',
			data: {
				name: name,
				pwd: pwd
			},
			error: function (error) {
				console.log(error);
			},
			success: function (res) {
				console.log(res);
				if (res == 'ok') {
					location.reload(true); // 刷新
				}
			}
		})
	}
	$regist.submit(function () {
		var nameVal, pwdVal
		nameVal = $.trim($registName.val());
		pwdVal = $.trim($registPwd.val());
		if (!reg.test(nameVal)) {
			$("#reg-msg2").fadeIn().prev('#reg-msg').fadeOut()
		}else {
			$("#reg-msg2").fadeOut()
		}
		if ((nameVal != '' || pwdVal != '') && reg.test(nameVal)) {
			regist($registName.val(), $registPwd.val());
		}
		return false;
	})

	// 登录
	function loginV(name, pwd) {
		$.ajax({
			url: 'http://127.0.0.1:8088//demo/12306/login-verify.php',
			data: {
				name: name,
				pwd: pwd
			},
			error: function (error) {
				console.log(error);
			},
			success: function (res) {
				console.log(res);
				if (res == 'error') {
					alert('用户名或密码错误')
				}else {
					// 设置cookie
					setCookie('name', name);
					location.assign('http://127.0.0.1:8088//demo/12306/view/admin.html');
				}
			}
		})
	}
	// 登录
	$login.submit(function () {
		loginV($loginName.val(), $loginPwd.val());
		return false;
	})
})