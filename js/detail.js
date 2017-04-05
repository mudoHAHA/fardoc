var host = 'http://dr.promontory7.cn/DrAgriculture-0.1/';
$(function(){
	detail(localStorage.code1);
});

function detail(code){
	var sd = {
		code:code
	}
	$.ajax({
		type:'post',
		url:host+'terminal/goods/details',
		async:true,
		dataType: "json",
	          contentType: "application/json",
	          data: JSON.stringify(sd),

		success:function(data){
			if(data.code == 2000){
				$('#joinsuccess').click(function(){
					console.log($('#add input').val());
		          			var sd = {
						goodsCode:localStorage.code1,
						num:$('#add input').val(),
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
					          			// alert(data.message);
					          			
					          		}else if(data.code == 5000){
					          			alert(data.message);
					          		}
					          },
					          error:function(){
					          		alert('交互失败');
					          }
					});
					$('#top').load('top.html');
		          		});

				var $cTc = data.data.courseTopic;
				$('#father').html($cTc.categoryName);
				if($cTc.code == code){
					// 大图&小图
					var $BigImg = $("<img src='"+$cTc.defaultImage+"' alt=''>");
					$('#pro_img dl dt').append($BigImg);
					for (var $i = 0; $i < $('#pro_img dl dd li').length; $i++) {
						$('#pro_img dl dd li').eq($i).append($("<img src='"+$cTc.imageList+"' alt=''>"));							
					};

					$('#pro_img dl dd li').mouseover(function() {
						$('#pro_img dl dt').html($(this).html());
					});

					// 品牌:华为
					for(pai in JSON.parse($cTc.specifications)){
						// console.log(pai);
						var secondLi = $("<li>"+pai+" : "+JSON.parse($cTc.specifications)[pai]+"</li>");
						$('.second div ul').append(secondLi);
					}

					$('.tit p').html($cTc.title);
					$('.postfee').html($cTc.postFee);
					$('.sales').html($cTc.sales);
					$('#selected>span').html("￥"+($cTc.price/100).toFixed(2));
					$('.stock span').html($cTc.stock);
					$('.intro p').html($cTc.descriptions);
					$('#selected s span').html($cTc.promotion);

					function low($v,$elem) {
						if($v > 1){
							$v--;
							$elem.val($v);
						}
					}
					function add($v,$n,$elem){
						if($v >= $n){
							$v == $n;
						}else{
							$v++;
						}
						$elem.val($v);
					}
					
					var $n1 = $('.stock span').html();
					$('.low1').bind('click',function(){
						var $v1 = $('#add input').val();
						low($v1,$('#add input'));
					})
					$('.add1').bind('click',function(){
						var $v1 = $('#add input').val();
						add($v1,$n1,$('#add input'));
					});
				}
			}
		},
		error:function(){
			alert('交互失败');
		}
	});
}

$(function(){
	$('.payway ul li').mouseover(function() {
		$(this).css('cursor','pointer');
	});

	$('.balance').click(function(){
		window.location.href='car.html';
	});

	$('.continue').click(function(){
		history.back();
	});
})