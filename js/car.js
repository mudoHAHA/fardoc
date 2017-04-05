$(function(){
	car();
})

function car(){
	$.ajax({
		url:host+'/terminal/shoppingCart/list',
		xhrFields: {
			withCredentials: true	//跨域名请求。XHR：XMLHttpRequest (XHR) ，基于XML技术的Http请求
	          },
	          crossDomain: true,

		success:function(data){
			if(data.code == 2000){
				var $len = data.data.shoppingCarts.length;
				for (var $i = 0; $i < $len; $i++) {
					var $scs = data.data.shoppingCarts[$i];
					var $scsg = data.data.shoppingCarts[$i].goods;
					var $sumprice = ($scsg.price*$scs.num/100).toFixed(2);
					var $tr = $("<tr id='"+$scs.code+"' class='"+$scsg.stock+"' name='"+$scsg.code+"'><td><input type='checkbox' name='ch'></td><td class='td1'><img src='"+$scsg.defaultImage+"' alt=''></td>"+
							"<td class='td2 tdd'>"+$scsg.title+"</td><td class='oneprice'>￥<span>"+($scsg.price/100).toFixed(2)+"</span></td>"+
							"<td class='td3'><i class='low2'></i><input readonly='readonly' class='ipt' type='text' value='"+$scs.num+"'><i class='add2'></i></td>"+
							"<td class='redprice'>￥"+$sumprice+"</td><td class='td4 btn1'>删除<div class='popup'><div class='title'>"+
							"<span>x</span></div><div class='cont'><p>操作提醒</p><i></i><p>您确定要删除此产品吗？</p>"+
							"<a href='javascript:void(0);'><input class='balance' type='button' value='确定'></a><a href='javascript:void(0);'>"+
							"<input class='continue' type='button' value='取消'></a></div></div><div class='mask_shadow'></div></td></tr>");
					$('.cartab').append($tr);
				};
				$('.balance').mouseover(function() {
					$(this).css('cursor','pointer');
				});
				$('.continue').mouseover(function() {
					$(this).css('cursor','pointer');
				});

				// 修改数量
				$('.low2').click(function(){
					var $v2 = $(this).parent().find('.ipt').val();
					var $v3 = Number($v2)-1;
					var $price2 = Number($(this).parents('tr').find('.oneprice span').html());
					low($v2,$(this).parent().find('.ipt'));
					if($v3<=0){
						$(this).parents('tr').find('.redprice').html("￥"+($price2).toFixed(2));
					}else{
						$(this).parents('tr').find('.redprice').html("￥"+($v3*$price2).toFixed(2));						
						addgood($(this).parents('tr').attr('id'),$v3);
					}
				});

				$('.add2').click(function(){
					var $n1 = $(this).parents('tr').attr('class');
					var $v2 = $(this).parent().find('.ipt').val();
					var $v3 = Number($v2)+1;
					var $price2 = Number($(this).parents('tr').find('.oneprice span').html());
					add($v2,$n1,$(this).parent().find('.ipt'));
					if($v3 > $n1){
						$(this).parents('tr').find('.redprice').html("￥"+(Number($n1)*$price2).toFixed(2));
					}else{
						$(this).parents('tr').find('.redprice').html("￥"+($v3*$price2).toFixed(2));						
						addgood($(this).parents('tr').attr('id'),$v3);
					}
				});

				function addgood(code,num){
					var sd = {
						code:code,
						num:num,
					};

					$.ajax({
						type:'post',
						url:host+"/terminal/shoppingCart/update",
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
					})
				}

				$('.mask_shadow').css('cursor','default');

				// 弹出框
				!(function ($, window, document, undefined) {

					  var Plugin = function (elem, options) {
					    this.$elem = elem;
					    this.$btn = $('.btn1');
					    this.$oMask = $('.mask_shadow');
					    this.$oTitle = this.$elem.find('.title');
					    this.$oCont = this.$elem.find('.cont');
					    this.$title_text = this.$oTitle.find('p');
					    this.$close = this.$oTitle.find('span');
					    this.$close1 = this.$oCont.find('input');

					    this.b_stop = true; // 防止重复点击
					    this.page_w = $(window).width();
					    this.page_h = $(window).height();
					    this.scroll_h = $(document).scrollTop();

					    this.defaults = {
					      ifDrag: false,
					      dragLimit: false
					    };

					    this.opts = $.extend({}, this.defaults, options);
					  };

					  Plugin.prototype = {
					    inital: function () { // 初始化
					      var self = this;

					      this.$title_text.text(this.$title_text.attr('data-title'));
					      this.$elem.css({left: (this.page_w - this.$elem.width()) / 2});

					      this.$elem.on('click', function () {
					        return false;
					      });

					      this.$btn.click(function () {
					        self.popbox($(this).find('.popup'));

					          self.b_stop = false;

					          return false;
					      });

					      this.$close.on('click', function () {
					        self.closePopbox();

					        return false;
					      });
					      this.$close1.on('click', function () {
					        self.closePopbox();

					        return false;
					      });

					      $(document.body).on('click', function () {
					        self.closePopbox();
					      });
					      $('.mask_shadow').on('click', function () {
					        self.closePopbox();
					      });

					      // 拖拽事件
					      this.$oTitle.on('mousedown', function (ev) {
					        if (self.opts.ifDrag) {
					          self.drag(ev);
					        }

					        return false;
					      });
					    },
					    popbox: function ($e) { // 显示弹窗
					      var self = this;
					      $e.parent().find('.mask_shadow').show().animate({opacity: 1});
					      $e.show().animate({opacity: 1,top:($(window).height() - self.$elem.height()) / 2 + $(document).scrollTop()}, function () {
					        self.b_stop = true;
					      });
					    },

					    closePopbox: function () { // 关闭弹窗
					      var self = this;

					      if (this.b_stop) {
					        this.$oMask.animate({opacity: 0}, function () {
					          $(this).hide();
					        });;
					        this.$elem.animate({opacity: 0, top: 150}, function () {
					          $(this).hide();
					        });
					      }
					    },

					    drag: function (ev) { // 拖拽事件
					      var self = this;
					      var oEvent = ev || window.event;
					      var disX = oEvent.clientX - this.$elem.offset().left;
					      var disY = oEvent.clientY - this.$elem.offset().top;
					      var _move = true;

					      $(document).mousemove(function (ev) {
					        if (_move) {
					          var oEvent = ev || window.event;
					          var offset_l = oEvent.clientX - disX;
					          var offset_t = oEvent.clientY - disY;

					          if (self.opts.dragLimit) {
					            if (offset_l <= 0) {
					              offset_l = 0;
					            } else if (offset_l >= self.page_w - self.$elem.width()) {
					              offset_l = self.page_w - self.$elem.width();
					            }

					            if (offset_t <= 0) {
					              offset_t = 0;
					            } else if (offset_t >= self.page_h - self.$elem.height()) {
					              offset_t = self.page_h - self.$elem.height();
					            }
					          }

					          self.$elem.css({left: offset_l, top: offset_t});
					        }
					      }).mouseup(function () {
					        _move = false;
					      });
					    },

					    constructor: Plugin
					  };

					  $.fn.popup = function (options) {
					    var plugin = new Plugin(this, options);

					    return plugin.inital();
					  };

				})(window.jQuery, window, document);

				$('.popup').popup({ifDrag: false, dragLimit: true});

				$('.td1').mouseover(function() {
					$(this).css('cursor','pointer');
				}).click(function(){
					localStorage.code1 = $(this).parent().attr('name');
					window.location.href = 'detail.html';
				});
				$('.td2').mouseover(function() {
					$(this).css('cursor','pointer');
				}).click(function(){
					localStorage.code1 = $(this).parent().attr('name');
					window.location.href = 'detail.html';
				});

				var $page = data.data.pager;
          				var $pageIndex = $("<li class='pageli'><a href='javascript:void(0);'>"+$page.pageNum+"</a></li>");
          				$('.morenum ul').prepend($pageIndex);
          				var $pageCount = $("<li class='pageli'><a href='javascript:void(0);'>"+$page.pageCount+"</a></li>");
          				$('.morenum ul').append($pageCount);
          				var $n =$('.morenum ul li').length;
          				var $liClass = $('.morenum ul li').attr('class');
          				for (var $d = 0; $d < $n; $d++) {
					$('.morenum ul li').eq(data.data.pager.pageNum-1).attr('class',$liClass+' on');
					// console.log($('.morenum ul li').eq($d));
					$('.morenum ul li').eq($d).click(function(){
						// alert($d+1);
						$('.morenum ul li').attr('class',$liClass);
						$(this).attr('class',$liClass+' on');
					});
				}
				
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

				$('#count span').html(0);
				var $trlen = $('.cartab tr').length;
			            var $sumJson;
			            var $sumArr = [];
				$('#checkAll').click(function(){
					$sumArr = [];
			                $('input[name="ch"]').prop("checked",this.checked); 
			                if(this.checked &&  $('input[name="ch"]')){
			                	$('#count span').html($trlen-1);
			                	for (var i = 1; i < $trlen; i++) {
			                		$sumJson = {"goodsCode":$('tr').eq(i).attr('name'),"num":$('tr').eq(i).find('.ipt').val()};
					      	$sumArr.push($sumJson);
			                	};
			                	$sumAllPrice();
			                }else if(!this.checked){
			                	$('#count span').html(0);
			                	$('#money span').html(0+'元');
			                }
			            });

			            var $ch = $("input[name='ch']");
			            $ch.click(function(){
				      var $checklen = $("input[name='ch']:checked").length;
				      $('#count span').html($checklen);
				      if($(this).prop('checked')){
			            	var $v = $(this).parents('tr').find('.ipt').val();
				      	$sumJson = {"goodsCode":$(this).parents('tr').attr('name'),"num":$v};
				      	$sumArr.push($sumJson);
				      	var $v2;
			                     $('.low2').click(function(){
			                          $la($(this).parent().find('.ipt'),$(this).parents('tr'));
					});
					$('.add2').click(function(){
						$la($(this).parent().find('.ipt'),$(this).parents('tr'));
					});
					$sumAllPrice();
				      }else{
				      	var $sumAlen = $sumArr.length;
				      	for (var $sl = 0; $sl < $sumAlen; $sl++) {
				      		for(var $gc in $sumArr[$sl]){
				      			if($gc == "goodsCode" && $sumArr[$sl][$gc] == $(this).parents('tr').attr('name')){
				      				$sumArr.splice($sl,1);
				      			}
				      		}
				      	};
				      	if($checklen == 0){
					      	$('#money span').html(0+'元');
					}else{
						$sumAllPrice();
					}
				      }
			                     $('#checkAll').prop("checked",$ch.length==$checklen ? true:false);
			            });

				// 确定删除
				$('.balance').click(function(){
					var sd = {
						code:$(this).parents('tr').attr('id')
					};
					$.ajax({
						type:'post',
						url:host+"/terminal/shoppingCart/delete",
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
					          		}
					          },
					          error:function(){
					          		alert('交互失败');
					          }
					});

					$(this).parents('tr').remove();
					var $ch = $("input[name='ch']");
					var $sumAlen = $sumArr.length;
				      	for (var $sl = 0; $sl < $sumAlen; $sl++) {
				      		for(var $gc in $sumArr[$sl]){
				      			if($gc == "goodsCode" && $sumArr[$sl][$gc] == $(this).parents('tr').attr('name')){
				      				$sumArr.splice($sl,1);
				      				$sumAlen = $sumArr.length;
				      			}
				      		}
				      	};
				      	$('#count span').html($sumAlen);
					if($ch.length == 0){
						$('#checkAll').prop('checked',false);
						$('#money span').html(0+'元');
					}else{
						$sumAllPrice();
					}
					$('#top').load('top.html');

				});

				function $la($v,$n){
					var $sumAlen = $sumArr.length;
					     $v2 = $v.val();
					     for (var $sl = 0; $sl < $sumAlen; $sl++) {
				      		for(var $gc in $sumArr[$sl]){
				      			if($gc == "goodsCode" && $sumArr[$sl][$gc] == $n.attr('name')){
				      				$sumArr[$sl]['num'] = $v2;
				      			}
				      		}
				      	     };
			                     $sumAllPrice();
				}

				function $sumAllPrice(){
					var sd = {
				      		goodsJson:JSON.stringify($sumArr)
				      	}
				      	$.ajax({
				      		type:'post',
						url:host+"/terminal/orderItem/account",
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
					          			var $allprice = (((data.data.account.payment-data.data.account.postFee)/100)+data.data.account.postFee).toFixed(2);
					          			$('#money span').html($allprice+'元');
					          		}
					          },
					          error:function(){
					          		alert('交互失败');
					          }
				      	})	
				}

			            $('.clearcar ul li:first-child').css('cursor','pointer');
				$('td.btn1').css('cursor','pointer');
				$('#money span').html(0+'元');
				// $('#count span').html($("input[name='ch']:checked").length);
				$('.clearcar ul li:first-child').click(function(){
					$('#checkAll').prop("checked",false);
					$('#count span').html(0);
					$('#money span').html(0+'元');
					var $trlen = $('.cartab tr').length;

					var $codeStr = '';
					var $codeArr = [];
					for (var $tr = $trlen-1; $tr > 0; $tr--) {
						$('.cartab tr').eq($tr).remove();
						$codeStr = $('.cartab tr').attr('id');
						$codeArr.push($codeStr);
					};
					var sd = {
						code:$codeArr.join()
					};
					$.ajax({
						type:'post',
						url:host+"/terminal/shoppingCart/delete",
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
					          		}
					          },
					          error:function(){
					          		alert('交互失败');
					          }
					});
					$('#top').load('top.html');
				});

				$('.buttons input:last-child').click(function(){
					history.back();
				});

				$('.buttons input').mouseover(function() {
					$(this).css('cursor','pointer');
				});

			}else if(data.code == 4003){
				alert(data.message);
			}
		},
		error:function(){
			alert('交互失败');
		}
	})
}