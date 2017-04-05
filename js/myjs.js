$(function(){
	var $onePlen = $('.oneprice').length;
	for (var $oneP = 0; $oneP < $onePlen; $oneP++) {
		smallsum($('.cartab tr').eq($oneP+1),$('td .ipt').eq($oneP).val());
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

	// var $onePlen = $('oneprice').length;
	// for (var $oneP = 0; $oneP < $onePlen; $oneP++) {
	// 	var $oneprice = parseFloat($('.oneprice').eq($oneP).find('span').html());
	// 	var $moreprice = $oneprice*($('td .ipt').val());
	// 	$('.redprice').eq($oneP).find('span').html($moreprice);
	// };

	
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