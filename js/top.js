$(document).ready(function () {
  //导航栏下拉菜单
  var num;
  $(".nav-wrap>.w>ul>li").hover(function(){
  /*下拉框出现*/
    num = $(this).index();
    $('#box-'+num).slideDown(300);
  },function(){
    /*下拉框消失*/
    $('#box-'+num).hide();
  });
$(".hidden-box").hover(function(){
  $(this).show();
},function(){
  $(this).slideUp(200);
  });
})