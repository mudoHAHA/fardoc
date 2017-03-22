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
	
	var $n1 = $('.stock span').html();
	$('.low1').bind('click',function(){
		var $v1 = $('#add input').val();
		low($v1,$('#add input'));
	})
	$('.add1').bind('click',function(){
		var $v1 = $('#add input').val();
		add($v1,$n1,$('#add input'));
	});
})