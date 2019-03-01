// $("span.exit").click(function() {
function menuFunction(){
	
 if (triger==1){
 	triger=0;
 	console.log(777);
 	 $("header .container.headerTop").css("display","none");
 //$("header .tovaryButtonBlock").css("display","none");
 // $("header .poslugiButton").css("display","none");
 // $("header .logo").css("display","none");
  //$("header .access").css("display","none");
 // $("header .phoneNumber").css("display","none");
  $("header .mobileMenu").css("display","none");
 }else{
 $("header .container.headerTop").css("display","inline-block");
// $("header .tovaryButtonBlock").css("display","inline-block");
 // $("header .poslugiButton").css("display","inline-block");
 // $("header .logo").css("display","inline-block");
 // $("header .access").css("display","inline-block");
 // $("header .phoneNumber").css("display","inline-block");
  $("header .mobileMenu").css("display","inline-block");

 	triger=1;
 	console.log(888);





 }
};
var triger;
$(".menuMob").click(function() {
menuFunction();
});




// });