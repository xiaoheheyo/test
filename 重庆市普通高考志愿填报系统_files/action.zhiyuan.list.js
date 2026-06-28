$(function() {
	userInfo2();
	list();
});	


var zybdm ='';
var kllist =[];
var kl=[];
var zhiyResults = [];
var zyxhcount = 1;
var ksh='';
function list() {
	zybdm = GetQueryString("zybdm");
	ajax({
		type : "GET",
		url : "/zyb/view/"+zybdm+'?_'+Math.random(),
		success : function(data) {
			 $("#table").empty();
			$("#title").html(data.zybmc);
            // 遍历数组
            var myDivStr = "";
            zhiyResults=[];
            $(data.pcs).each(function (index, e) {
                var tableStr = '<table class="layui-table" id="pc_'+e.pcdm+'">';
                // 批次
                var batch = e.pcmc;
                // 赋值渲染 
                var datas = {
                	 "data":e.zhiyResults,
                	 "pc":e.pcdm,
                	 "zhuanys":e.zhuanys,
                	 "zhiys":e.zhiys,
                	 "zytjxs":e.zytjxs 
                }
                zhiyResults.push(datas);
                zys = e.zhiys;
                // 获取科类
                var sectionClass = "";
                var kl_count=0;
                kl=[];
                $(e.kls).each(function (klIdx, klElement) {
                	    
                		if (sectionClass == "") {
                			sectionClass += "<select class='form-control'>";
	                    }
                		//与个人信息中科类取交集
	                    if($.inArray(klElement.kldm, kllist) != -1){
	                    	 kl_count++;
	                    	 sectionClass += '<option value ="' + klElement.kldm + '">' + klElement.klmc + '</option>';
	                    	 kl.push(klElement.kldm);
	                    }
                });

	                 
            	  
                if (sectionClass != "") {
                    sectionClass += "</select>";
                }

                // 专业代号 len
                var majorNoLen = e.zhuanys;
                // 处理志愿序号
                var subArrLen = e.zhiys;

                for (var i = 0; i < subArrLen; i++) {
                    // alert(String.fromCharCode(97))
                    // 志愿序号 && i <= 26
                    var code = e.zybhfsdm == 1 ? i + 1 : String.fromCharCode(i + 65);
                    var volunteerNo = e.zysxmc + code;
                    for (var k = 0; k < majorNoLen; k++) {
                        var batchColspanNum = subArrLen * majorNoLen +1;
                        var trHtml = "";
                        if (i == 0 && k == 0) {
                            // 批次  这里为了方便排序，批次默认为tr第一行
                            trHtml += "<tr><td rowspan='" + batchColspanNum + "'>" + batch + "</td></tr>";
                        }
                        trHtml +="<tr id=pc_"+e.pcdm+"_zhiy_"+(i+1)+"_zy_"+(k+1)+">";
                        if (k == 0) {
                            var colspanStr = majorNoLen > 1 ? " rowspan='" + (majorNoLen) + "'" : "";
                            // 志愿序号
                            trHtml += "<td" + colspanStr + ">" + volunteerNo + "</td>";
                            // 科类
                            if(kl_count > 1){
                            	 trHtml += "<td class='kldm'" + colspanStr + ">" + sectionClass + "</td>";
                            }
                            // 院校代号
                            	trHtml += "<td class='yxdh'" + colspanStr + "><input type='text' class='layui-input' value='' maxlength='4' /></td>";
                            	trHtml += "<td class='yx'" + colspanStr + "></td>";
                            // 办学性质
                            	trHtml += "<td class='bx'" + colspanStr + "></td>";
	                        
                          } 
                           //专业序号
	                        if (majorNoLen > 1) {
                              trHtml += "<td>" + (k + 1) + "</td>";
	                        } 
	                        //专业代号
	                        trHtml += "<td class='zydh'><input type='text' class='layui-input' value='' maxlength='3' /></td>";
	                        // 专业名称
	                        trHtml += "<td class='zymc'></td>";
	                        // 专业备注
	                        trHtml += "<td class='zybz'></td>";
	                        var myTheadStr = "";
	                        if (i == 0 && k == 0) {
	                            myTheadStr = "<thead><tr>";
	                            myTheadStr = myTheadStr + "<th width='130px'>批次</th>"
	                            myTheadStr = myTheadStr + "<th width='95px'>志愿编号</th>"
	                            if(kl_count > 1){
	                            	myTheadStr = myTheadStr + "<th width='160px'>科类</th>"
	                            }
	                            myTheadStr = myTheadStr + "<th width='90px'>院校代号</th>"
	                            myTheadStr = myTheadStr + "<th width='120px'>院校名称</th>"
	                            myTheadStr = myTheadStr + "<th width='90px'>办学性质</th>"
	                            if (majorNoLen > 1) {
	                            	myTheadStr = myTheadStr + "<th width='70px'>专业序号</th>"
	                            } 	
	                            myTheadStr = myTheadStr + "<th width='90px'>专业代号</th>"
	                            myTheadStr = myTheadStr + "<th width='145px'>专业名称</th>"
	                            myTheadStr = myTheadStr + "<th width='145px'>专业备注</th>"
	                        }
	                        // 是否显示调剂
	                        // "zytjxs": 0, // 0不显示，1为是 显示调剂
	                        if (e.zytjxs == 1) {
	                            if (i == 0 && k == 0) {
	                                myTheadStr = myTheadStr + "<th width='120px'>愿否服从专业调剂</th>"
	                            }
	                            if(k==0){
	                            	var tjStr = "<select class='form-control'><option value=''>请选择</option><option value='1'>是</option><option value='0'>否</option></select>"
	                            		trHtml += "<td class='zytp'"+colspanStr+">" + tjStr + "</td>";
	                            }
	                        }
                        myTheadStr = myTheadStr + "<th width='120px'>操作</th>"
                        if(k == 0){
                        	trHtml += "<td rowspan='" + (majorNoLen) + "'><button class='btn btn-success' onclick='saveContent(this)' zybdm='"+data.zybdm+"' pcdm='"+e.pcdm+"' zjxh='"+e.zjxh+"' zhiyxh='"+(i+1)+"' zyxh='"+(k+1)+"'  zhuanys='"+majorNoLen+"' kl="+kl+">保存</button><button class='btn btn-danger' onclick='delContent(this)' zybdm='"+data.zybdm+"' pcdm='"+e.pcdm+"' zjxh='"+e.zjxh+"' zhiyxh='"+(i+1)+"' zyxh='"+(k+1)+"'>删除</button>";
                        	//判断专业数单个追加排序
                        	if(k== 0 &&　majorNoLen == 1){
                        		trHtml += "<button class='btn btn-info' onclick='up(this)' zybdm='"+data.zybdm+"' pcdm='"+e.pcdm+"' zjxh='"+e.zjxh+"' zhiyxh='"+(i+1)+"' zyxh='"+(k+1)+"' bhfs='"+code+"'>排序</button>";
                        	}
                        	trHtml +='</td>';
                        }
                        if (i == 0 && k == 0) {
                            myTheadStr += "</tr></thead>";
                            tableStr = tableStr + myTheadStr;
                        }
                        trHtml += "</tr>";
                        tableStr = tableStr + trHtml;
                    }
                }
                tableStr += '</table>';
                myDivStr += tableStr;
            });
            $("#table").html(myDivStr);
            randemo();
		},error:function(){}
 });
}

/*
 * 渲染志愿结果
 */
function randemo(){
	if(zhiyResults.length !=0){
		$(zhiyResults).each(function (m, pcElement) {
			$(pcElement.data).each(function (m, zyElement) {
				$(zyElement.zhuanys).each(function (m, zhuanyElement) {
					var yxdh = zyElement.yxdh == null ? '' : zyElement.yxdh;
					var yxmc = zyElement.yxmc == null ? '' : zyElement.yxmc;
					var bxxz = zyElement.bxxz == null ? '' : zyElement.bxxz;
					var zytj = zyElement.zytj == null ? '' : zyElement.zytj;
					var kldm = zyElement.kldm == null ? '' : zyElement.kldm;
					var zydh = zhuanyElement.zydh == null ? '' : zhuanyElement.zydh;
					var zymc = zhuanyElement.zymc == null ? '' : zhuanyElement.zymc;
					var zybz = zhuanyElement.zybz == null ? '' : zhuanyElement.zybz;
					
					//非合并
					var node = $("#pc_"+pcElement.pc+"_zhiy_"+zyElement.zhiyxh+"_zy_"+zhuanyElement.zhuanyxh)
					if(pcElement.zhuanys == 1){
						$(node).find("td.yxdh input").val(yxdh);
						$(node).find("td.yx").text(yxmc);
						$(node).find("td.bx").text(bxxz);
						$(node).find("td.zydh input").val(zydh);
						$(node).find("td.zymc").text(zymc);
						$(node).find("td.zybz").text(zybz);
						if(pcElement.zytjxs == 1){
							$(node).find("td.zytp select").val(zytj);
						}
						if($(node).find("td.kldm select").length != 0){
							$(node).find("td.kldm select").val(kldm)
						}
					}else{
					//合并
						//合并第一行
						if(zhuanyElement.zhuanyxh == 1){
							$(node).find("td.yxdh input").val(yxdh);
							$(node).find("td.yx").text(yxmc);
							$(node).find("td.bx").text(bxxz);
							if($(node).find("td.kldm select").length != 0){
								$(node).find("td.kldm select").val(kldm)
							}
						}
						$(node).find("td.zydh input").val(zydh);
						$(node).find("td.zymc").text(zymc);
						$(node).find("td.zybz").text(zybz);
						if(pcElement.zytjxs == 1){
							$(node).find("td.zytp select").val(zytj);
						}
					}
				})
			})
		})
	}
}
/*
 * 保存志愿
 */
function saveContent(obj){
	if(ksh==''){
		layer.msg("考生号不能为空");
		return false;
	}
	var fromData = {
	    "ksh":ksh,		
	};
	var zybdm = $(obj).attr('zybdm');
	var pcdm = $(obj).attr('pcdm');
	var zjxh = $(obj).attr('zjxh');
	var zhiyxh = $(obj).attr('zhiyxh');
	var zyxh = $(obj).attr('zyxh');
	var zhuanys = $(obj).attr('zhuanys');
	var yxdh='';
	var zydh=[];
	var zytj=undefined;
	var kldm='';
	var kldata = $(obj).attr('kl');
	 if(kldata.length == 1){
		 kldm = kldata;	
	 }else if(newData(kl).length == 0){
		 layer.msg("科类不能为空");
		 return false;
	 }else{		 
		 kldm = $(obj).parent().parent().find("td.kldm select").val();	
	 }
	 yxdh = $(obj).parent().parent().find("td.yxdh input").val();
	 if(yxdh == ''){
		   layer.msg("请输入院校代号");
		   return false;
	}
	 yxdh = yxdh.toUpperCase()
	var zydh_first=$(obj).parent().parent().find("td.zydh input").val();
    if (zhuanys == 1){
     //专业非合并  
    	 zydh.push({
    	    	"zhuanyxh":1,
    	    	"zydh":zydh_first.toUpperCase()
    	    });
    }else{
    //专业合并
    	if(zydh_first == ''){
    		layer.msg('请按照顺序填写专业代号');
    		return false;
    	}
   	    zydh.push({
   	    	"zhuanyxh":1,
   	    	"zydh":zydh_first.toUpperCase()
   	    	});
    	var str = "$(obj).parent().parent()";
    	for(var i=1;i < zhuanys;i++){
    		str+=".next()";
    		var zydn_val = eval(str).find('td.zydh input').val();
    		if(zydn_val !='' ){
    			zydh.push({
    	   	    	"zhuanyxh":i+1,
    	   	    	"zydh":zydn_val.toUpperCase()
    	   	    });
    		} 
    	}
    	//判断顺序 
    /*	for(var n=0;n <zydh.length;n++){
    		if(zydh[n].zhuanyxh != n+1){
    			layer.msg("请按照顺序填写专业代号");
    			zydh = [];
    			return false;
    		}
    	}*/
    }
    if(zydh.length == 0){
	   layer.msg("请输入专业代号");
	   return false;
    }
   zytj = $(obj).parent().parent().find("td.zytp select").val();
	 //专业调剂是否存在
	if(zytj != undefined){
		if (zytj == ''){
			layer.msg("请选择愿否服从专业调剂");
			return false;
		}else{
			fromData.zytj = $.trim(zytj);
		}
	}
	fromData.zybdm = $.trim(zybdm);
	fromData.pcdm = $.trim(pcdm);
	fromData.zjxh = $.trim(zjxh);
	fromData.zhiyxh = $.trim(zhiyxh);
	fromData.zhuanys = zydh;
	fromData.yxdh = $.trim(yxdh);
	fromData.kldm = $.trim(kldm);
	console.log(fromData)
	ajax({
		type : "POST",
		url : "/zhiy",
		async:true,
		cache:false,
		data:fromData,
		success : function(data) {
			var str = '';
			if(data.tsxxs !=undefined || data.tsxxs != null){
				$(data.tsxxs).each(function (index, xx) {
					str+= '<p class="font_14 color_0">'+xx+'</p>';
				})
				layer.open({
					"title":'保存成功',
					"content":str
				});
			}else{
				layer.msg('保存成功');
				
			}
			list();
		},error:function(err){
			layer.open({
				"title":'提示',
				"content":err
			});
		}
	})
}

/*
 * 刪除
 */
function delContent(obj){
	if(ksh==''){
		layer.msg("考生号不能为空");
		return false;
	}
     layer.confirm('是否删除该志愿的填报数据',function(index) {
    	 var zybdm = $(obj).attr('zybdm');
    	 var pcdm = $(obj).attr('pcdm');
    	 var zjxh = $(obj).attr('zjxh');
    	 var zhiyxh = $(obj).attr('zhiyxh');
    	 var fromData = {
    			 "ksh":ksh,	
    	 };
    	 fromData.zybdm = $.trim(zybdm);
    	 fromData.pcdm = $.trim(pcdm);
    	 fromData.zjxh = $.trim(zjxh);
    	 fromData.zhiyxh = $.trim(zhiyxh);
    	 ajax({
    		 type : "post",
    		 url : "/zhiy/del",
    		 async:true,
    		 cache:false,
    		 data:fromData,
    		 success : function(data) {
//			delData(obj);
    			 list();
    			 layer.msg('删除成功');
    		 },error:function(err){
    			 layer.msg(err);
    		 }
    	 })
	})
}



/*
 *排序
 */
function up(obj){
	layer.open({
		   type : 1
		  ,title: '提示'
		  , area: ['250px', '160px']
		  ,content: '<p style="margin:10px 15px;color:#000">移动到志愿  <input type="number" class="form-control" min=1 max=2000 id="upval" style="width:90px;display:inline-block;"/></p>'
		  ,btn: ['确认', '取消'] 
	      ,yes: function(index){
	    	var zybTo = $.trim($("#upval").val());
	        var zybdm = $.trim($(obj).attr('zybdm'));
			var pcdm = $.trim($(obj).attr('pcdm'));
			var zjxh = $.trim($(obj).attr('zjxh'));
			var zhiyxh = $.trim($(obj).attr('zhiyxh'));
			var rel = /^(0+)|[^\d]+/g;
			if(zybTo==''){
				layer.msg("请输入排序值");
				return false;
			}
			if(rel.test(zybTo)){
				layer.msg("请输入大于0的正整数");
				return false;
			}
			var fromData = {
			    "ksh":ksh,		
			};
			fromData.zybdm = zybdm;
			fromData.pcdm = pcdm;
			fromData.zjxh = zjxh;
			fromData.zhiyxhFrom = zhiyxh;
			fromData.zhiyxhTo = zybTo;
			ajax({
				type : "post",
				url : "/zhiyxh",
				async:true,
				cache:false,
				data:fromData,
				success : function(data) {
					layer.msg('操作成功');
					list(); 
//					assign(obj);
					layer.close(index);
				},error:function(err){
					layer.msg(err);
				}
			})
	      }
	     ,btn2: function(index){
	        layer.close(index);
	     }
	}); 
}
/*
 * 去重数组
 */
function newData(data) {
    var nData = new Array();
    for (var i = 0; i < data.length; i++) {
        if (nData.indexOf(data[i]) == -1) {
            nData.push(data[i]);
        }
    }
    return nData;
}

/*
 * 获取个人信息及状态
 */
function userInfo2(m){
	ajax({
		cache : false ,
		async : false,
		type: 'get',
		dataType: 'JSON',
		url: '/me',
		success: function (res) {
			$("#username_home").text(res.ksh+"  "+res.xm);
			if(res.zhzt == 'init' &&　m !=1){
				window.location.href="/mianze/first_mianze.html"
			}
			kllist = res.kldms;
			ksh = res.ksh;
		},error: function (res) {
			layer.msg(res)
		}
   })
}

//指定位置
function assign(obj) {
  var num = parseInt($.trim($("#upval").val()));
  var currentOrderno;  //插入的tr第一个td值
  var tempOrderno; //被插入的tr第一个td值
  var current = $(obj).parent().parent();
  var rcurrentlen = $(obj).parent().parent().parent().children('tr').length-1;
  var rcurrent = $(obj).parent().parent().parent().children('tr').eq(num);
  currentOrderno = current.find('td:eq(0)').text();
 
  var ins = parseInt($(obj).attr('bhfs'));
  //判断是否是个数字  ins-2,否ins- 1
  if(isNaN(ins) == true){
	  ins = 2;
  }else{
	  ins = 1;
  }
  //大于0表示后面还有行，没有到底
  if (num < rcurrentlen) {
       tempOrderno = rcurrent.find('td:eq(0)').text(); 
       //删除字符，只留数字
       var v = parseInt(currentOrderno.replace(/[^0-9]/ig,""));
       var n = parseInt(tempOrderno.replace(/[^0-9]/ig,""));
       // 是否就是下一个元素
       if(n == v+1){
        	rcurrent.after(current);
        	var str = deleteNum(rcurrent.find('td:eq(0)').text());
  		    updata(obj,str,rcurrentlen,ins);
  		 //同一元素    
       }else if(tempOrderno == currentOrderno){
		    layer.msg('排序为同一元素')
	   }else{
		   //把选中行插入到下一行的后面
			rcurrent.before(current);
			/* 获取指定行的第一个td文字 */
		    var str = deleteNum(rcurrent.find('td:eq(0)').text());
		    updata(obj,str,rcurrentlen,ins);
	   }             
  }else if(num == rcurrentlen){
		$(obj).parent().parent().parent().append(current); 
		/*获取指定行的第一个td文字*/
		var str = deleteNum(rcurrent.find('td:eq(0)').text());
		updata(obj,str,rcurrentlen,ins);
  }else{
	    layer.msg('超出范围');
  }
	
}
/*
 *遍历志愿 code => 1 数字排序 2 字母排序
 */ 
function updata(obj,str,len,code){
  if(code == 1){
		for(var i=0;i<len;i++){
		  var str1 = str + (i+1);
		  $(obj).parent().parent().parent().children('tr').eq(i+1).find('td:eq(0)').text(str1);
		}
	}else if (code == 2){
		for(var i=0;i<len;i++){
		  var str1 = str + String.fromCharCode((65 + i));
		  $(obj).parent().parent().parent().children('tr').eq(i+1).find('td:eq(0)').text(str1);
		}
	}
}
/*
 * 删除数字 
 */ 
function deleteNum(str){
	let reg = /[^\u4e00-\u9fa5]/gi;
	let str1 = str.replace(reg,"");
	return str1;
}