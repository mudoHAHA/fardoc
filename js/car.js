$(function(){
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
		smallsum($('.cartab tr').eq($oneP+1),$('td .ipt').eq($oneP).val());
	};

	$('.low2').click(function(){
		var $v2 = $(this).parent().find('.ipt').val();
		low($v2,$(this).parent().find('.ipt'));
		smallsum($(this).parent().parent(),$(this).parent().find('.ipt').val());
		summoney();
	});

	var $n1 = $('.stock span').html();
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
})