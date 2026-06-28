/*
 * ajax StatusCode请求
 * type 请求方法
 * url 请求地址
 * callBack 回调方法
 * data 参数
 * async  同步：false，异步：true 
 * */
function ajax2(options){
    var xhr = null;
    var params = options.data;
    if(options.type == "GET" || options.type == "get"){
    	params = formsParams(options.data);
    }
    //创建对象
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest()
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    // 连接
    if(options.type == "GET" || options.type == "get"){
        xhr.open(options.type,options.url + "?"+ params,options.async);
        xhr.send(null)
    } else if(options.type == "POST" || options.type == "post"){
            xhr.open(options.type,options.url,options.async);
            xhr.setRequestHeader('dataType','json');
        
	        if(options.request != 'param' ){
	        	 xhr.setRequestHeader('Content-type','application/json');
	        	 xhr.send(JSON.stringify(params));
	        }else{
	        	 var pars = formsParams(options.data);
	        	 xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	        	 xhr.open(options.type,options.url + "?"+ pars,options.async);
	             xhr.send()
	        }
    
    }
    xhr.onreadystatechange = function(){
//    	请求状态等于4，代表响应内容解析完成。
        if(xhr.readyState == 4 ){
        	if(xhr.status == 200){
        		var res = JSON.parse(xhr.responseText);
        		if(res.code == 'ok'){
	        		options.success(res.data);
        		}else{
        			options.error(res); 
        		}		
        	}else{
        		options.error(xhr.responseText); 
        	}
        	options.complete();
        }else if(xhr.status == 0 && xhr == 'timeout'){
     	   layer.alert('请求超时');
        }else{
           
       	}
    }
  
}


/*
 * 拼接字符
 */
function formsParams(data){
    var arr = [];
    for(var prop in data){
        arr.push(prop + "=" + data[prop]);
    }
    return arr.join("&");
}


/*
 * ajax statusCode请求
 * type 请求方法
 * url 请求地址
 * success,warn,error,complete 回调方法
 * data 参数
 * async  同步：false，异步：true 
 * */
function ajax(options){

	if(options.url == ''){
		return false
	}else{
		var url = options.url;
	}
	var params = options.data == undefined ? '' : options.data;
	var type = options.type == undefined ? 'GET' : options.type;
	var request = options.request == undefined ? 'body' : options.request;
	var async = options.async == undefined ? true : options.async;
	var dataType = options.dataType == undefined ? 'json' : options.dataType;
	var complete = options.complete == undefined ? '' : options.complete;
	if(type == "GET" || type == "get"){
	    	params = formsParams(options.data);
	}
	var load = layer.load(2, {
	    shade: [0.1, '#fff'],//0.1透明度的白色背景
	    offset: ['50%','50%']
	  });
 	if (request == 'param'){
		$.ajax({
		    cache: false,
		    url: url,
		    type: type,
		    async:async,
		    timeout:20000,
		    headers: {'ksh': window.sessionStorage.getItem("ksh")},
		    dataType: dataType,
		    data: params,
		    beforeSend: function (xhr) {},
		    error: function (oResult, textStatus, errorThrown) {
		       if(oResult.status == 0 && textStatus == 'timeout'){
		    	   options.error('请求超时');
		        }else if(oResult.status == 401){
		        	logoutTo(oResult.responseJSON.msg);
		    	}else{
		    		options.error(oResult.responseJSON.msg);
		    	}
		    },
		    complete:function(){
		    	layer.close(load);
		    	if(complete != ''){
		    		options.complete();
		    	}
		    },
		    success: function(result,status,xhr) {
		    	if(xhr.status != 200){
		    		options.error(xhr.responseText); 
				}else{
					var msg = result.msg == null?"":result.msg;
					if(result.code == 'ok'){
						options.success(result.data);
	        		}else if(result.code == 'warn'){
	        			options.error(msg);
	        		}else if(result.code == 'unauthorized'){	
	        			logoutTo(msg);
	        		}else{
	        			options.error(msg);
	        		}
				}
		    }
		});
	}else{
		$.ajax({
		    cache: false,
		    url: url,
		    type: type,
		    async:async,
		    timeout:20000,
		    headers: {'ksh': window.sessionStorage.getItem("ksh")},
		    contentType: "application/json",
		    dataType: dataType,
		    data: JSON.stringify(params),
		    beforeSend: function (xhr) {},
		    error: function (oResult, textStatus, errorThrown) {
		    	 if(oResult.status == 0 && textStatus == 'timeout'){
			    	   options.error('请求超时');
			        }else if(oResult.status == 401){
			        	logoutTo(oResult.responseJSON.msg);
			    	}else{
			    		options.error(oResult.responseJSON.msg);
			    	}
		    },complete:function(){
		    	layer.close(load);
		    	if(complete != ''){
		    		options.complete();
		    	}
		    },
		    success: function(result,status,xhr) {
		    	if(xhr.status != 200){
		    		options.error(xhr.responseText); 
				}else{
					var msg = result.msg == null? "" : result.msg;
					if(result.code == 'ok'){
						options.success(result.data);
	        		}else if(result.code == 'warn'){
	        			options.error(msg);
	        		}else if(result.code == 'unauthorized'){	
	        			logoutTo(msg);
	        		}else{
	        			options.error(msg);
	        		}
				}
		       
		    }
		});
	}
}