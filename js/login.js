
$(function(){
			$("#loginBtn").click(function(){
				login();
			})
			$("#username").keydown(function(event){
				var  e=event||window.event;
				if(e.keyCode==13){

					$("#password").focus();
				}

			});

			$("#password").keydown(function(event){
				var  e=event||window.event;
				if(e.keyCode==13){

					login();
				}

			});

		});	

function login(){
	localStorage.username=$("#username").val()
	var sendData={
		username:localStorage.username,
		password:$("#password").val(),
		
	};
	$.ajax({
		type:"post",
		dataType: "json",
		xhrFields: {
			withCredentials: true	//跨域名请求。XHR：XMLHttpRequest (XHR) ，基于XML技术的Http请求
        },
        crossDomain: true,
        contentType: "application/json",
        data: JSON.stringify(sendData),
		url:host+"/terminal/user/login",
		beforeSend:function(){
			$("#loginBtn").prop("disabled",true);
			$("#loginBtn").val("正在登录...");
		},
		success:function(json){
			
			if(json.code==2000){
				$("#loginSpan").text(localStorage.username);
				window.history.back();
			}else{
				alert(json.message);
			}			   							
		},
		error:function(){
			alert("交互异常");
		},
		complete:function(){
			$("#loginBtn").prop("disabled",false);
			$("#loginBtn").val("登录");
		}
	});
}
//获取购物车总数
function getList(){
	$.ajax({
		url:host+"/terminal/shoppingCart/list",
		success:function(json){
			if(json.code==2000){
				var listNum=json.data.shoppingCarts.length;
				$("#listNum").text(listNum);
			}else{
				alert(json.message);
			}			   							
		},
		error:function(){
			alert("交互异常");
		}
	})
}
