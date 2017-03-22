$(function(){
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
})