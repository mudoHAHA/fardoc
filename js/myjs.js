$(function(){
	//限制字符个数
	$('.price p').each(function(){
		var maxwidth=18;
		if($(this).text().length>maxwidth){
			$(this).text($(this).html().substring(0,maxwidth));
			$(this).html($(this).html()+'...');
		}
	});

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

	$('#dropdown').click(function(){
		var $reg = / without/;
		var $downClass = $('.down').attr('class');
		var $c = $downClass.replace($reg,'');
		$('.down').attr('class',$c);

		var $have = $reg.test($downClass);
		if(!$have){
			$('.down').attr('class',$downClass+' without');
		}
	});

	var $len1 = $('.down li').length;
	for (var $z = 0; $z < $len1; $z++) {
		(function($z){
			$('.down li').eq($z).click(function(){
				var $h = $('.down li').eq($z).html();
				$('.place input').val($h);
			});
		})($z);
	};

	var $n =$('.morenum ul li').length;
	var $liWidth = parseInt($(".morenum ul li").css('width'));
	var $liRight = parseInt($(".pagination li").css('marginRight'));
	var $sum = $liRight + $liWidth;
	$('.morenum').css('width',$sum*6+'px');
	$('.morenum ul').css('width',$sum*$n+'px');
	$('.morenum ul li:first-child').attr('class','on');
	for (var $d = 0; $d < $n; $d++) {
		// console.log($('.morenum ul li').eq($d));
		$('.morenum ul li').eq($d).click(function(){
			// alert($d+1);
			$('.morenum ul li').attr('class','');
			$(this).attr('class','on');
			// 分页省略
			var $c=$(".morenum ul li").index($('.morenum ul li.on'));

			if($c < 3){
				$('.morenum ul').css('marginLeft','0px');
			}else if($c >= 3 && $c < $n-3){
				$('.morenum ul').css('marginLeft',-($sum*($c-2))+'px');
			}else if($c+2 >= $n-1){
				$('.morenum ul').css('marginLeft',-($sum*($n-6))+'px');
			}
			if($n>6){
				if($c>=2){
					if($c+2 < $n-2){
						$(".morenum ul li").eq($c+2).text('...');				
					}
					for (var $i = $c; $i < $n-4; $i++) {
						if($c+3 < $n-1){
							$(".morenum ul li").eq($i+3).hide();					
						}
					};
				}else{
					$(".morenum ul li").eq(4).text('...');
					for (var $j = 5; $j < $n-1; $j++) {
						$(".morenum ul li").eq($j).hide();					
					};
				}
			}
		})
	};


	// 点击向左滚动
	var $leftli = $('.left').parent('li');
	var $rightli = $('.right').parent('li');
	if(parseInt($('.morenum ul').css('marginLeft')) == 0){
		$leftli.css('backgroundColor','#F2F2F2');
		$rightli.css('backgroundColor','#fff');
		$leftli.unbind('click');
	}
	if(parseInt($('.morenum ul').css('marginLeft')) == -($sum*($n-6))){
		$rightli.css('backgroundColor','#F2F2F2');
		$leftli.css('backgroundColor','#fff');
		$rightli.unbind('click');
	}
	
	var $num = 0;
	$rightli.bind('click',function(){
		$num++;
		if($num <= $n-6){
			$('.morenum ul').css('marginLeft',-($sum*$num)+'px');
			if($num+4 < $n-2){
				$(".morenum ul li").eq($num+4).text('...');				
				for (var $a = $num+5; $a < $n-1; $a++) {
					$(".morenum ul li").eq($a).hide();
				};			
			}
		}else{
			$num = $n-6;
		}
	});
	$leftli.bind('click',function(){
		$num--;
		if($num >= 0){
			$('.morenum ul').css('marginLeft',-($sum*$num)+'px');
			$(".morenum ul li").eq(-4-$num).text('...');				
			for (var $b = -5-$num; $b < $n-1; $b++) {
				$(".morenum ul li").eq($b).hide();
			}			
		}else{
			$num = 0;
		}
	});

	// 商品详情页数量
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
	function smallsum($elem,$iptval){
		var $oneprice = parseFloat($elem.find('.oneprice').find('span').html());
		var $moreprice = ($oneprice*$iptval).toFixed(2);
		var $moreprice1 = $moreprice+'';
		$elem.find('.redprice span').html($moreprice1);
	}
	function summoney(){
		var $sump1 = 0;
            	var $checklen = $("input[name='ch']:checked").length;
            	$('#count span').html($checklen);
            	for (var $checkp = 0; $checkp < $checklen; $checkp++) {
			var $arr = $("input[name='ch']:checked").eq($checkp).parent().parent().find('.redprice span').html().split('.');
			if($arr[1] != '00'){
				var $trprice = parseFloat($("input[name='ch']:checked").eq($checkp).parent().parent().find('.redprice span').html());
			}else{
				var $trprice = parseInt($("input[name='ch']:checked").eq($checkp).parent().parent().find('.redprice span').html());
			}
			$sump1=$sump1+$trprice;
		};
		$('#money span').html($sump1+'元');
	}

	var $onePlen = $('.oneprice').length;
	for (var $oneP = 0; $oneP < $onePlen; $oneP++) {
		var $oneprice = parseFloat($('.oneprice').eq($oneP).find('span').html());
		var $moreprice = $oneprice*($('td .ipt').eq($oneP).val())+'';
		if(!/\./.test($moreprice)){
			var $moreprice1 = $moreprice+'.00';
		}else{
			var $morearr = $moreprice.split('.');
			// var $morestr = $morearr[1].join('');
			if( $morearr[1].length == 1){
				var $moreprice1 = $moreprice+'0';
			}else{
				var $moreprice1 = $moreprice;
			}
		}
		$('.redprice').eq($oneP).find('span').html($moreprice1);
	};
	var $n1 = $('.stock span').html();
	$('.low1').bind('click',function(){
		var $v1 = $('#add input').val();
		low($v1,$('#add input'));
	})
	$('.add1').bind('click',function(){
		var $v1 = $('#add input').val();
		add($v1,$n1,$('#add input'));
	});

	$('.popup').popup({ifDrag: false, dragLimit: true});

	$('.low2').click(function(){
		var $v2 = $(this).parent().find('.ipt').val();
		low($v2,$(this).parent().find('.ipt'));
		smallsum($(this).parent().parent(),$(this).parent().find('.ipt').val());
		summoney();
	});

	$('.add2').bind('click',function(){
		var $v2 = $(this).parent().find('.ipt').val();
		add($v2,$n1,$(this).parent().find('.ipt'));
		smallsum($(this).parent().parent(),$(this).parent().find('.ipt').val());
		summoney();
	});

	$('#count span').html(0);
	var $trlen = $('.cartab tr').length;
	$('#checkAll').click(function(){
                $('input[name="ch"]').prop("checked",this.checked); 
                if(this.checked &&  $('input[name="ch"]')){
                	$('#count span').html($trlen-1);
                	summoney();
                }else if(!this.checked){
                	$('#count span').html(0);
                	$('#money span').html(0+'元');
                }
            });

            var $ch = $("input[name='ch']");
            $ch.click(function(){
	      summoney();
	      var $ch = $("input[name='ch']");
	      var $checklen = $("input[name='ch']:checked").length;
                $('#checkAll').prop("checked",$ch.length==$checklen ? true:false);
            });

	var $onePlen = $('oneprice').length;
	for (var $oneP = 0; $oneP < $onePlen; $oneP++) {
		var $oneprice = parseFloat($('.oneprice').eq($oneP).find('span').html());
		var $moreprice = $oneprice*($('td .ipt').val());
		$('.redprice').eq($oneP).find('span').html($moreprice);
	};

	$('.clearcar ul li:first-child').css('cursor','pointer');
	$('td.btn1').css('cursor','pointer');
	$('#money span').html(0+'元');
	// $('#count span').html($("input[name='ch']:checked").length);
	$('.clearcar ul li:first-child').click(function(){
		$('#checkAll').prop("checked",false);
		$('#count span').html(0);
		$('#money span').html(0+'元');
		var $trlen = $('.cartab tr').length;
		for (var $tr = $trlen-1; $tr > 0; $tr--) {
			$('.cartab tr').eq($tr).remove();
		};
	});

	$('.balance').click(function(){
		$(this).parents('tr').remove();
		var $ch = $("input[name='ch']");
		if($ch.length == 0){
			$('#checkAll').prop('checked',false);
		}
		summoney();
	});
});