$(function(){
	mall();
})

function mall(){
	$.ajax({
		url:host+"/terminal/goods/homePage",
		
	          success:function(data){
	          		if(data.code == 2000){
		          		var $cgLen = data.data.catagories.length;
		          		for (var $i = 0; $i < $cgLen; $i++) {
		          			var $cgs = data.data.catagories[$i];
		          			if($i == 0){
		          				$('.ChoiceGoods p').html($cgs.name);
		          				for (var $z = 0; $z < $cgs.goods.length; $z++) {
		          					var $cgsGoods = $cgs.goods[$z];
		          					var $cgsLi = $("<li id='"+$cgsGoods.code+"' class='"+$cgsGoods.stock+"'></li>");
		          					var $cgsImg = $("<img src='"+$cgsGoods.defaultImage+"' alt=''><b>8.0折</b><a href='javascript:void(0);'>"+$cgsGoods.title+"</a><span class='red'>￥<span>"+($cgsGoods.price/100).toFixed(2)+"</span></span><s class='old'>"+$cgsGoods.promotion+"</s><i></i>");
		          					$cgsLi.append($cgsImg);
		          					$('.choice ul').append($cgsLi);
		          					// $('.choice ul li i').click(function(){
					          		// 	addgood($(this).parent().attr('id'),1);
					          		// });
		          				};
		          			}else if($i == 1){
			          			$('.shang li:first-child').html($cgs.name);
		          				$('.shang li:last-child a').attr('id',$cgs.code);
		          				addtwo($('.frt div ul'));
		          				joincar();
		          			}else if($i == 2){
		          				$('.xia li:first-child').html($cgs.name);
		          				$('.xia li:last-child a').attr('id',$cgs.code);
		          				addtwo($('.farmt ul'));
		          				joincar();
		          			}
		          		};

		          		$('.all li img').click(function(){
					 localStorage.code1 = $(this).parent().attr('id');
					 window.location.href = 'detail.html';
				})
		          		$('.all li a').click(function(){
					 localStorage.code1 = $(this).parent().attr('id');
					 window.location.href = 'detail.html';
				});
		          		$('.all li i').click(function(){
		          			addgood($(this).parent().attr('id'),1);
		          		});
		          		$('.join').click(function(){
		          			addgood($(this).parent().attr('id'),1);
		          		});

		          		function addtwo($elem){
		          			for (var $b = 0; $b < $cgs.goods.length; $b++) {
			          			var $cgsGoods = $cgs.goods[$b];
	          					var $cgsLi = $("<li id='"+$cgsGoods.code+"'></li>");
	          					var $cgsImg = $("<img src='"+$cgsGoods.defaultImage+"' alt=''><div class='price'><p class='long'>"+$cgsGoods.title+"</p>"+
	          						             "<p>￥"+($cgsGoods.price/100).toFixed(2)+"</p></div><div class='join without'><i></i><p>加入购物车</p></div>");
	          					$cgsLi.append($cgsImg);
	          					$elem.append($cgsLi);
          					};
		          		}

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
	          },
	          error:function(){
	          		alert('NO');
	          }
	})
}

function joincar(){
	var $li = $('.littermore ul li');
	var $len = $li.length;
	for (var $i = 0; $i < $len; $i++) {
		(function($i){
			var $n = $li.eq($i);
			var $cName = $n.find('div').eq(0).attr('class');
			var $cName1 = $n.find('div').eq(1).attr('class');
			$n.mouseover(function(){
				var $a = $n.find('div').eq(1).attr('class').replace(/ without/,'');
				$n.find('div').eq(0).attr('class',$cName+' without');				
				$n.find('div').eq(1).attr('class',$a);
			}).mouseout(function(){
				var $b = $n.find('div').eq(0).attr('class').replace(/ without/,'');
				$n.find('div').eq(0).attr('class',$b);
				$n.find('div').eq(1).attr('class',$cName1);
			})
		})($i);
	};
}

$(function(){
	//限制字符个数
	$('.price p').each(function(){
		var maxwidth=18;
		if($(this).text().length>maxwidth){
			$(this).text($(this).html().substring(0,maxwidth));
			$(this).html($(this).html()+'...');
		}
	});
	
	$('.shang li:last-child a').click(function(){
		localStorage.code = $(this).attr('id');
	});
	$('.xia li:last-child a').click(function(){
		localStorage.code = $(this).attr('id');
	});
})