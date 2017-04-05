
  //图片验证码
 /* function createCode(){    
    var code = "";
    var codeLength = 4;   
    var checkCode = $(".pic_code");   
    var selectChar = new Array(0,1,2,3,4,5,6,7,8,9); 
    for(var i=0;i<codeLength;i++){   
      var charIndex = Math.floor(Math.random()*10);   
      code +=selectChar[charIndex];   
    }   
    if(checkCode){      
      checkCode.html(code) ;
    }   
 }
  //验证验证码

    function telCode() {
       var validCode = true;
       $(".tel_code").click(function() {
         var time = 30;
         var codes = $(this);
         if (validCode) {
          validCode = false ;
          codes.addClass('tel_code1');     
         var t = setInterval(function(){
           time--;
           codes.html(time+"秒");
           if(time==0){
            clearInterval(t);
            codes.html("重新获取");
            validCode = true ;
            codes.removeClass('tel_code1');
           }
         },1000)
         }
       })
    }
    telCode();*/

   $(function () {
    
    //注册验证
    $(".register_table input").blur(function(){
      //用户名验证
          if($(this).is("#name")){
            if(!/^[a-zA-Z0-9_\-$]{6,20}$/.test(this.value)){
              $(this).next().text("*用户名为6~20位的字母或数字");
            }
            else{
              $(this).next().text('').end().next().append("<img style='width: 18px;' src='img/勾 (1).png' />");        
            	sessionStorage.name=$(this).val();
            }
          }
      //手机号码验证
          if($(this).is("#cellphone")){     
            if(!/^1[3|4|5|7|8][0-9]\d{8}$/.test(this.value)){ 
              $(this).next().text("*请输入正确的手机号码");
            }
            else{
              $(this).next().text('').end().next().append("<img style='width: 18px;' src='img/勾 (1).png' />");  
              sessionStorage.mobile=$(this).val();
            } 
          }
          //邮箱验证
         if($(this).is("#email")){ 		
						var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/; 
						//var $email = $("#inputMail").val(); 
						if(!reg.test(this.value)){ 
							$(this).next().text("*邮箱不合法");
						}
						else{							
							$(this).next().text('').end().next().append("<img style='width: 18px;' src='img/勾 (1).png' />");
							sessionStorage.email=$(this).val();
						} 
					} 
        //密码验证
         if($(this).is("#password")){
            if(!/^[a-zA-Z0-9_\-$]{6,18}$/.test(this.value)){
              $(this).next().text("*密码格式错误");
            }
            else{
              $(this).next().text('').end().next().append("<img style='width: 18px;' src='img/勾 (1).png' />");  
              sessionStorage.password=$(this).val();
            }
         }
         //确认密码验证
         if ($('#repassword').val() != "") {
           if ($('#repassword').val() != $('#password').val()) {
               $('#repassword').next().text('*输入的密码不匹配');  
           }
           else {
              $('#repassword').next().text('').end().next().append("<img style='width: 18px;' src='img/勾 (1).png' />");   
           }
         }   
    })
  })
//发送验证码
$(function(){ 
  $(".tel_code").click(function(){
  	var sendData={mobile:sessionStorage.mobile};
    $.ajax({
    	url:host+"/terminal/verificationCode/getVerificationCode",
      type:"post",
			dataType: "json",
        contentType: "application/x-www-form-urlencoded",//表单提交
        data:sendData,//json对象
        xhrFields: {withCredentials: true},
        crossDomain: true,
      beforeSend:function(){
      	$(".tel_code").text('发送中...');
      },
      success:function(json){
        	if(json.code=2000){
        		$(".tel_code").text('成功发送到您手机');
        	}else{
        		alert(json.message);
        	}
      },
      error:function(){
        	alert("交互异常");
      },
      complete:function(){
      	$(".tel_code").text('发送验证码');
      }
    })
  })
})


$(function(){
			$(".register_btn").click(function(){
			//	alert(1);
				register();
			})
			$("#repassword").keydown(function(event){
		
				var  e=event||window.event;
				if(e.keyCode==13){
				//			alert(2);
					register();
				}

			});

		});	

function register(){
	var sendData={
		username:sessionStorage.name,
		password:sessionStorage.password,
		mobile:sessionStorage.mobile,
		email:sessionStorage.email,
		verificationCode:$("#telCode").val()
		
	};
	$.ajax({
		type:"post",
		dataType: "json",
        contentType: "application/x-www-form-urlencoded",//表单提交
        data:sendData,//json字符串
        xhrFields: {withCredentials: true},
        crossDomain: true,
		url:host+"/terminal/user/register",
		beforeSend:function(){
			$(".register_btn").prop("disabled",true);
			$(".register_btn").val("正在注册...");
		},
		success:function(json){
			alert(json.message);
			if(json.code==2000){
				$(".register_btn").val("注册成功！");
			}		   							
		},
		error:function(){
			alert("交互异常");
		},
		complete:function(){
			$(".register_btn").prop("disabled",false);
			$(".register_btn").val("注册");
		}
	});
}
