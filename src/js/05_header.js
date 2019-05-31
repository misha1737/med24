function setCartsCounter()
{
$("header .basket a .productCounter").text('');
if( localStorage.getItem("productCounter")==null){
	$("header .basket a .productCounter").append("0");
	var z= $('.oformitZ');
	console.log(z);
	$(z).css('display','none');
}else{

var z= $('.oformitZ');
	console.log(z);
	$(z).css('display','block');
$("header .basket a .productCounter").append(localStorage.getItem("productCounter"));}
}

function setTotalPrise(){
$(".basket #totalPrise").text('');
$("#endPrise").text('');

if( localStorage.getItem("totalPrise")==null){
	$(".basket #totalPrise").append("0");
	$("#endPrise").append("0");
}else{

$(".basket #totalPrise").append(localStorage.getItem("totalPrise"));
$("#endPrise").append(localStorage.getItem("totalPrise"));
}
}





setCartsCounter();
setTotalPrise();