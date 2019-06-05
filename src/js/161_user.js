
$("#CartButton").click(function(){

$("#orders").css("display","none");
$("#cartList").css("display","block");
$(".userNav li").removeClass('active');
$("#CartButton").addClass('active');
});


$("#UserButton").click(function(){

$("#orders").css("display","block");
$("#cartList").css("display","none");
$(".userNav li").removeClass('active');
$("#UserButton").addClass('active');
});