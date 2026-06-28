$(function() {
	userInfo();
	menuCss();
	ajax({
		cache : false ,
		async : false,
		type: 'get',
		dataType: 'JSON',
		url: '/zyb/list',
		success: function (res) {
			$("#card_c").empty();
			if(res.length ==0 ){
			  $("#card_c").html('<p style="text-align:center">暂无志愿填报</p>');
			}else{
				$.each(res, function(index, list) {
					$("#card_c").append('<div class="card" style="border-radius:20px;margin: 20px 45px 0px 0px; width: 20rem;float:left">'
					  +'<div class="card-header">志愿表</div>'
					  +'<div class="card-body">'
					   +'<h3 class="card-title">'+list.zybmc+'</h3>'
					   +'<p class="card-text">'+list.kssj+" 至 "+list.jssj+'</p>'
					   +'<a href="/zhiyuan/zhiyuantianbao.html?zybdm='+list.zybdm+'" class="btn btn-primary" data-index='+list.zybdm+'>开始填报</a>'
					+'</div>'
					+'</div>')
				})
			}
		},error: function (result) {
			layer.msg(result);
		}
    });
	
	
	
});


