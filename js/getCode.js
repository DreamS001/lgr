// 返回页面是否需要跳转
function login(){
	// console.log('登录页面')
	var url = encodeURI(window.location.href);
	// console.log('url', url);
	var code = getCodeParam();
	// console.log('code', code);
	var openId = sessionStorage.getItem('openId');
	// console.log('openId', openId);
	var loginSuccess = sessionStorage.getItem('loginSuccess');
	// console.log('loginSuccess', loginSuccess);

	if (loginSuccess == null) {
		if (openId == null) {
			if (code == null) {//
				window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize'
					+ '?appid=wxeb9096b4e805d685'
					+ '&redirect_uri=' + url
					+ '&response_type=code'
					+ '&scope=snsapi_base'
					+ '&state=STATE'
					+ '#wechat_redirect';
				return true;
			} else {
				$.ajax({
				    url: '//https://api.weixin.qq.com/sns/oauth2/access_token?appid=wxeb9096b4e805d685&secret=427954e293876188eafccf29e3d4e5de&code='+code+'&grant_type=authorization_code',
				    type: 'get',
				    dataType: 'jsonp',
				    async: false,
				    success: function(response){
				    	console.log(response)
						// console.log('获取openId返回数据',response)
				    	// console.log('获取openId返回status', response.status);
		                // console.log('获取openId返回data', response.data);
		                if (response.status === 0) {
		                	openId = response.data;
		                	sessionStorage.setItem('openId', openId);
		                	console.log(openId)
		                } else {
		                	return false;
		                }
				    },
				    error: function() {
				    	return false;
				    }
				});
				// console.log('方法执行后openId', openId);
		    }
		}
		// console.log('发送的请求的参数',openId)
		// $.ajax({
		// 	url: '/wechat/user/login',
		// 	type: 'post',
		// 	contentType: 'text/plain',
		// 	async: false,
		// 	data: openId,
		// 	success: function(response) {
		// 		// console.log('登录返回status', response.status);
	 //            // console.log('登录返回data', response.data);
	 //            // console.log('登录返回msg', response.msg);
		// 		if (response.status === 0) {
		// 			sessionStorage.setItem('userId',response.data.id)
		// 			sessionStorage.setItem('headImg',response.data.headImg)
		// 			sessionStorage.setItem('user',response.data.nickName)
		// 			sessionStorage.setItem('loginSuccess', true);
		// 		} else {
		// 			sessionStorage.setItem('loginSuccess', false);
		// 		}
		// 	},
		//     error: function() {
		//     	return false;
		//     }
		// });
		// console.log('方法执行后loginSuccess', sessionStorage.getItem('loginSuccess'));
	}
	return false;
}

function getCodeParam(){
	var url = window.location.href;
	var parse = url.substr(url.indexOf('?')+1);
	var params = parse.split('&');
	for(var i = 0; i < params.length; i++){
		var param = params[i].split('=');
		if(param[0] == 'code'){
			return param[1];
		}
	}
	return null;
}
 