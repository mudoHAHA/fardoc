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
})