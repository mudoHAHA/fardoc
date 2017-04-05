$(function(){
	goodslist(localStorage.code);
})

function goodslist(categoryCode){
	var sd = {
		categoryCode:categoryCode
	}

	$.ajax({
		type:'post',
		url:host+"/terminal/goods/list",
		async:true,
		dataType: "json",
	          contentType: "application/json",
	          data: JSON.stringify(sd),

	          success:function(data){
	          		if(data.code == 2000){
	          			// 商品
	          			// $('.gl ul li').remove();
          				var courLen = data.data.goods.length;
          				var $page = data.data.pager;
	          			goods();
	          			$clickhref();

	          			function goods(){
		          			for (var i = 0; i < courLen; i++) {
		          				var $cT = data.data.goods[i];
		          				if($cT.categoryCode == categoryCode){
				          			$('#father').html($cT.categoryName);
		          					var $glLi = $("<li id='"+$cT.code+"'></li>");
		          					var $ImgList = $("<img src='"+$cT.defaultImage+"' alt=''><b>8.0折</b><a href='javascript:void(0);'>"+$cT.title+"</a><span class='red'>￥<span>"+($cT.price/100).toFixed(2)+"</span></span><s class='old'>"+$cT.promotion+"</s><i></i>");
		          					$glLi.append($ImgList);
		          					$('.gl ul').append($glLi);
		          				}
		          			};
	          			}

	          			// 综合排序
	          			$('#zongsort').click(function(){
	          				$('#firsttext').val('');
					$('#lasttext').val('');
	          				$('.gl ul li').remove();
	          				goods();
	          				$clickhref();
	          			})

	          			function addLi($elem){
	          				var $glLi = $("<li id='"+$elem.code+"'></li>");
          					var $ImgList = $("<img src='"+$elem.defaultImage+"' alt=''><b>8.0折</b><a href='javascript:void(0);'>"+$elem.title+"</a><span class='red'>￥<span>"+($elem.price/100).toFixed(2)+"</span></span><s class='old'>"+$elem.promotion+"</s><i></i>");
          					$glLi.append($ImgList);
          					$('.gl ul').append($glLi);
	          			}

	          			// 销量
	          			$('#sales').click(function(){
	          				$('#firsttext').val('');
					$('#lasttext').val('');
	          				var $ok = true;
	          				$('.gl ul li').remove();
	          				for (var $j = 0; $j < courLen; $j++) {
	          					var $cT1 = data.data.goods[$j];
	          					for (var $k = $j+1; $k < courLen; $k++) {
	          						var $cT2 = data.data.goods[$k];
	          						if($cT1.sales < $cT2.sales){
	          							$ok = false;
	          							addLi($cT2);
			          					$j--;
			          					break;
	          						}
	          					};
	          					if($ok == true){
	          						addLi($cT1);
	          					}
	          				};
	          				$clickhref();
	          			});
				
				// 发布时间
				var count = 0;
				$('#time').click(function(){
					$('#firsttext').val('');
					$('#lasttext').val('');
					count++;
					var $cT1,$cT2;
					var $kMin;
					var $kMax
					if(count%2 != 0){
		          				$('.gl ul li').remove();
		          				for (var $j = 0; $j < courLen; $j++) {
		          					for (var $k = $j+1; $k < courLen; $k++) {
			          					$cT1 = data.data.goods[$j];
		          						$cT2 = data.data.goods[$k];
		          						if($cT1.createTime > $cT2.createTime){
		          							// $ok1 = false;
		          							$kMin = $k;
		          							$kMax = $j;
		          							$j = $k;
		          						}else{
		          							$kMax = $k;
		          							$kMin = $j;
		          						}
		          					};

		          					if($j == courLen-1){
		          						var $cTmax = data.data.goods[$kMax];
		          						addLi($cTmax);
		          					}else{
			          					var $cTmin = data.data.goods[$kMin];
			          					addLi($cTmin);
		          					}
		          				};
					}else{
						$('.gl ul li').remove();
		          				for (var $j = courLen-1; $j >= 0; $j--) {
		          					for (var $k = $j-1; $k >= 0; $k--) {
			          					$cT1 = data.data.goods[$j];
		          						$cT2 = data.data.goods[$k];
		          						if($cT1.createTime > $cT2.createTime){
		          							$kMax = $j;
		          							$kMin = $k;
		          						}else{
		          							$kMin = $j;
		          							$kMax = $k;
		          							$j = $k;
		          						}
		          					};

		          					if($j == 0){
		          						var $cTmin = data.data.goods[$kMin];
		          						addLi($cTmin);
		          					}else{
			          					var $cTmax = data.data.goods[$kMax];
			          					addLi($cTmax);
		          					}
		          				};
					}
					$clickhref();
				});

				// 价格
				$('#sure').click(function(){
					var $cT,$firsttext,$lasttext,$glLi,$ImgList;
					if($('#price1 #firsttext').val() && !$('#price1 #lasttext').val()){
						// compare($cT.price >= $firsttext);
						$('.gl ul li').remove();
						$firsttext = Number($('#price1 #firsttext').val())*100;
						for (var $l = 0; $l < courLen; $l++){
							$cT = data.data.goods[$l];
							if($cT.price >= $firsttext){
								addLi($cT);
							}
						}
					}else if($('#price1 #lasttext').val() && !$('#price1 #firsttext').val()){
						// compare($cT.price <= $lasttext);
						$('.gl ul li').remove();
						$lasttext = Number($('#price1 #lasttext').val())*100;
						for (var $m = 0; $m < courLen; $m++){
							$cT = data.data.goods[$m];
							if($cT.price <= $lasttext){
								addLi($cT);
							}
						}
					}else if($('#price1 #firsttext').val() && $('#price1 #lasttext').val()){
						// compare($cT.price <= $lasttext && $cT.price >= $firsttext)
						$('.gl ul li').remove();
						$firsttext = Number($('#price1 #firsttext').val())*100;
						$lasttext = Number($('#price1 #lasttext').val())*100;
						for (var $m = 0; $m < courLen; $m++){
							$cT = data.data.goods[$m];
							if($cT.price <= $lasttext && $cT.price >= $firsttext){
								addLi($cT);
							}
						}
					}else{
						$('.gl ul li').remove();
		          				goods();
					}
					$clickhref();
				});
				
				function $clickhref(){
					$('.choice ul li img').click(function(){
						window.location.href = 'detail.html';
						localStorage.code1 = $(this).parent().attr('id');
					});
					$('.choice ul li a').click(function(){
						window.location.href = 'detail.html';
						localStorage.code1 = $(this).parent().attr('id');
					});
					$('.choice ul li i').click(function(){
			          			addgood($(this).parent().attr('id'),1);
			          		});
					function addgood(goodcode,num){
						var sd = {
							goodsCode:goodcode,
							num:num,
						};

						$.ajax({
							type:'post',
							url:host+"/terminal/shoppingCart/add",
							xhrFields: {
								withCredentials: true	//跨域名请求。XHR：XMLHttpRequest (XHR) ，基于XML技术的Http请求
						          },
						          crossDomain: true,
							async:true,
							dataType: "json",
						          contentType: "application/json",
						          data: JSON.stringify(sd),

						          success:function(data){
						          		if(data.code == 2000){
						          			alert(data.message);
						          			
						          		}else if(data.code == 5000){
						          			alert(data.message);
						          		}
						          },
						          error:function(){
						          		alert('交互失败');
						          }
						});
						$('#top').load('top.html');
					}
				}

	          			// 分页
	          			if($page.empty){
	          				$('.morenum ul li').remove();
	          			}
          				var $pageIndex = $("<li class='pageli pagenum'><a href='javascript:void(0);'>"+$page.pageNum+"</a></li>");
          				$('.morenum ul').prepend($pageIndex);
          				var $pageCount = $("<li class='pageli'><a href='javascript:void(0);'>"+$page.pageCount+"</a></li>");
          				$('.morenum ul').append($pageCount);
	          			var $n =$('.morenum ul li').length;
				var $liWidth = parseInt($(".morenum ul li").css('width'));
				var $liRight = parseInt($(".pagination li").css('marginRight'));
				var $sum = $liRight + $liWidth;
				$('.morenum').css('width',$sum*$n+'px');
				$('.morenum ul').css('width',$sum*$n+'px');
				var $liClass = $('.morenum ul li').attr('class');
				for (var $d = 0; $d < $n; $d++) {
					$('.morenum ul li').eq(data.data.pager.pageNum-1).attr('class',$liClass+' on');
					// console.log($('.morenum ul li').eq($d));
					$('.morenum ul li').eq($d).click(function(){
						// alert($d+1);
						$('.morenum ul li').attr('class',$liClass);
						$(this).attr('class',$liClass+' on');
					})
				};

				// 点击向左/右滚动
	          			var $li_h = parseInt($('.choice ul li').css('height'))+parseInt($('.gl ul li').css('margin-bottom'));
	          			var $pagetr = Math.ceil($page.pageSize/4);
	          			var $fix_h = $li_h*$pagetr;
	          			$('div.gl').css('height',$fix_h+"px");

				var $leftli = $('.left').parent('li');
				var $rightli = $('.right').parent('li');
				var $rightnum = 0;
				if($page.last){
					$rightli.css('backgroundColor','#F2F2F2');
					$rightli.unbind('click');
				}
				if($page.first){
					$leftli.css('backgroundColor','#F2F2F2');
					$leftli.unbind('click');
				}
				$rightli.bind('click',function(){
					$rightnum++;
					$('.gl ul').css('margin-top',-($rightnum*$fix_h)+'px');
					$('.pagenum').html($page.pageNum);
				});
				$leftli.bind('click',function(){
					$('.pagenum').html($page.pageNum);
				});
	          		}
	          },
	          error:function(){
	          		alert('交互失败');
	          }
	})
}

$(function(){
	var $len1 = $('.down li').length;
	for (var $z = 0; $z < $len1; $z++) {
		(function($z){
			$('.down li').eq($z).click(function(){
				var $h = $('.down li').eq($z).html();
				$('.place input').val($h);
			});
		})($z);
	};
})