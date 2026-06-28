$(function(){
	menu();
})

/**
 * 判断功能微信是否开启
 * @returns true=开启 
 */
function isopenweixin(){
	var option = false;
	ajax({
		cache : false,
		async:false,
		type: 'get',
		dataType: 'JSON',
		url: ' /bind/isopen',
		success: function (res) {
			option = res
		},error: function (res) {
			option = false
		}
   });
   return option
}


/*
 * 共享菜单
 */
function menu(){
	$("#menu").empty();
	$("#footer").empty();
	//控制征集计划菜单显示
	var zjjhHtml = '';
	var wxHtml = '';
	ajax({
		cache : false,
		async:false,
		type: 'get',
		dataType: 'JSON',
		url: '/zjjh/visible',
		success: function (res) {
			if(res == 1){				
				zjjhHtml += '<li class="nav-item"><a class="nav-link" href="/zjjh/zhengji_jihua_list.html">征集计划查询</a></li>'
			}
		},error: function (res) {
			
		}
   });
	ajax({
		cache : false,
		async:false,
		type: 'get',
		dataType: 'JSON',
		url: '/zyfj/isopen',
		success: function (res) {
			if(res == 1){				
				zjjhHtml += '<li class="nav-item"><a class="nav-link" href="/fj/fj_up.html">志愿附件上传</a></li>'
			}
		},error: function (res) {
			
		}
   });
	var word = isopenweixin() 
	console.log(word)
	if(word){
		wxHtml += '<li class="nav-item"><a class="nav-link" href="/bind/detail_list.html">绑定微信</a></li>'
	}
	$("#menu").html('<div class="container">'
        +'<div class="row">'
            +'<div class="col-md-12">'
                +'<nav class="navbar navbar-expand-md">'
                    +'<a class="navbar-brand" href="/index.html">'
                        +'<img src="/image/logo3.jpg" alt="" width="" height="">'
                    +'</a>'
                    +'<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">'
                       +'<span class="tf-ion-android-menu"></span>'
                    +'</button>'
                    +'<div class="collapse navbar-collapse" id="navbarSupportedContent">'
                           +'<ul class="navbar-nav ml-auto">'
                            +'<li class="nav-item">'
                                +'<a class="nav-link" href="/index.html">志愿填报</a>'
                            +'</li>'
                            +zjjhHtml
                            +'<li class="nav-item">'
                               +'<a class="nav-link" href="/update/password_updateform.html">修改密码</a>'
                            +'</li>'
                            +'<li class="nav-item dropdown">'
                              +'<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
                              +'信息查看'
                              +'</a>'
                              +'<div class="dropdown-menu" aria-labelledby="navbarDropdown">'
                          		   +'<a class="dropdown-item" href="/infomation/zhiyuan/zhiyuan_list.html">志愿信息</a>'
                                   +'<a class="dropdown-item" href="/infomation/grade/grade_info.html">成绩信息</a>'
                                   +'<a class="dropdown-item" href="/infomation/basic/basic_info.html">基本信息</a>'
                                   +'<a class="dropdown-item" href="/infomation/tijian/tijian_list.html">体检信息</a>'
                                   +'<a class="dropdown-item" href="/infomation/tezheng/tezheng_list.html">照顾特征信息</a>'
                                   +'<a class="dropdown-item" href="/infomation/log/log_list.html">登录及修改密码日志</a>'
                             +'</div>'
                          +'</li>'
                          + wxHtml
                      +'</ul>'
                   +'</div>'
               +'</nav>'
            +'</div>'
        +'</div>'
    +'</div>');
	//$("#footer").html('<div class="footer-bottom"><h5>© 2014-2020 cqksy</h5></div>')
}


function menuCss(){
	$(document).ready(function(){
		var local=window.location.href;
		var tda=$('.navbar-nav li a');
		var cd=tda.length
		for(i=0;i<tda.length;i++){
			if(local.toLowerCase()==tda[i].href.toLowerCase()){
				//下拉菜单
				if($('.navbar-nav li a').eq(i).attr("class")=='dropdown-item'){
					$('.navbar-nav li a').eq(i).parent().parent().addClass("active");
					$('.navbar-nav li a').eq(i).addClass("active");
				}else if($('.navbar-nav li a').eq(i).attr("class")=='dropdown-toggle'){
					
				}else{
				//无子菜单	
					$('.navbar-nav li a').eq(i).parent().addClass("active");
				}
		   }
		}
	})	
}


/*
 * 获取个人信息及状态
 */
function userInfo(m){
	var ksh = ''; 
	ajax({
		cache : false,
		async:false,
		type: 'get',
		dataType: 'JSON',
		url: '/me',
		success: function (res) {
			$("#username_home").text(res.ksh+" "+res.xm);
			if(res.zhzt == 'init' &&　m !=1){
				window.location.href="/mianze/first_mianze.html"
			};
			ksh = res.ksh;
		},error: function (res) {
			layer.msg(res)
		}
   });
	return ksh;
}



function loginCheck() {
	var xk_cookie = window.sessionStorage["xk"];
	if(jQuery.isEmptyObject(xk_cookie)){
		logoutTo('');
	}
}

/*
 * 退出
 */
function logout(msg) {
	var outMsg = "是否退出登录";
	layer.confirm(outMsg, {
		title:'提示',
		skin : 'layui-layer-molv', //样式类名
//		closeBtn : 0
	}, function() {
		$.ajax({ 
			async:true,
			cache : false ,
			type: 'GET',
			url: '/logout',
			headers: {'ksh': window.sessionStorage.getItem("ksh")},
			success: function (result) {
				 sessionStorage.clear();
				 window.top.location.href = "/login.html";
			},error:function(res){
				if(res.status == 401){	
					logoutTo();
        		}else{
        			layer.alert(res.responseJSON.msg)
        		} 
			}
	    });
	})	
}

/*
 * token失效，强制退出
 */
function logoutTo(msg) {
	var outMsg = "";
	if (!jQuery.isEmptyObject(msg)) {
		outMsg = msg;
	} else {
		outMsg = '登录已经过期，请重新登录';
	}
	layer.alert(outMsg, {
		skin : 'layui-layer-molv', //样式类名
		closeBtn : 0
	}, function() {
		  sessionStorage.clear();
		  window.top.location.href = "/login.html";
	});
}

/*
 * 截取名称
 * */
function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}

/*
 *照片展示 
 */
function photoShow(ksh){
	if(ksh != ""){
		ajax({ 
			cache : false ,
			type: 'GET',
			dataType: 'JSON',
			url: '/photo?number='+Math.random(),
			success: function (res) {
				$("#imgshow").attr("src",res);
			},error:function (res) {
				
			}
	    })
	}
}

/*
 * 图片加载失败
 */
function errorphoto(){
	var img = event.srcElement;
	img.src = "/image/photo_new.jpg";
	img.onerror = null;
}