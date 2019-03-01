var initialPoint;
var finalPoint;
sliderBlock.addEventListener('touchstart', function(event)   {

//event.preventDefault();
//event.stopPropagation();
initialPoint=event.changedTouches[0];
}, false);
sliderBlock.addEventListener('touchend', function(event) {
event.preventDefault();
event.stopPropagation();
finalPoint=event.changedTouches[0];
var xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
var yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
if (xAbs > 20 || yAbs > 20) {
if (xAbs > yAbs) {
if (finalPoint.pageX < initialPoint.pageX){
	console.log("vlevo"+xAbs);
	 
	
	 
	}
else{
/*СВАЙП ВПРАВО*/

console.log("vpravo"+xAbs);

}
}
else {
if (finalPoint.pageY < initialPoint.pageY){
/*СВАЙП ВВЕРХ*/
console.log("up");
}
else{
	console.log("down");
/*СВАЙП ВНИЗ*/}
}
}
}, false);





$("#scrollPage2").on('touchstart', function() {
   $("#main").css("transform","translate(-100%)");
	$("#page2").css("transform","translate(0%)");

	$("#toNext").removeClass("littleBtn")
	$("#toNext").addClass("bigBtn")
	$("#toMain").removeClass("bigBtn")
	$("#toMain").addClass("littleBtn")

});

$("#scrollMain").on('touchstart', function() {
	$("#main").css("transform","translate(0)");
	$("#page2").css("transform","translate(100%)");


		$("#toNext").removeClass("")
	$("#toNext").addClass("littleBtn")
	$("#toMain").removeClass("littleBtn")
	$("#toMain").addClass("bigBtn")

});


$("#scrollPage2").click(function(){
$("#main").css("transform","translate(-100%)")
	$("#page2").css("transform","translate(0%)")

		$("#toNext").removeClass("littleBtn")
	$("#toNext").addClass("bigBtn")
	$("#toMain").removeClass("bigBtn")
	$("#toMain").addClass("littleBtn")
})

$("#scrollMain").click(function(){
$("#main").css("transform","translate(0)");
	$("#page2").css("transform","translate(100%)");
	$("#toNext").removeClass("")
	$("#toNext").addClass("littleBtn")
	$("#toMain").removeClass("littleBtn")
	$("#toMain").addClass("bigBtn")
})



$("#toNext").click(function(){
$("#main").css("transform","translate(-100%)")
	$("#page2").css("transform","translate(0%)")

		$("#toNext").removeClass("littleBtn")
	$("#toNext").addClass("bigBtn")
	$("#toMain").removeClass("bigBtn")
	$("#toMain").addClass("littleBtn")
})

$("#toMain").click(function(){
$("#main").css("transform","translate(0)");
	$("#page2").css("transform","translate(100%)");
	$("#toNext").removeClass("")
	$("#toNext").addClass("littleBtn")
	$("#toMain").removeClass("littleBtn")
	$("#toMain").addClass("bigBtn")
})

$("#toNext").on('touchstart', function() {
   $("#main").css("transform","translate(-100%)");
	$("#page2").css("transform","translate(0%)");

	$("#toNext").removeClass("littleBtn")
	$("#toNext").addClass("bigBtn")
	$("#toMain").removeClass("bigBtn")
	$("#toMain").addClass("littleBtn")

});

$("#toMain").on('touchstart', function() {
	$("#main").css("transform","translate(0)");
	$("#page2").css("transform","translate(100%)");


		$("#toNext").removeClass("")
	$("#toNext").addClass("littleBtn")
	$("#toMain").removeClass("littleBtn")
	$("#toMain").addClass("bigBtn")

});

$("a").on('touchstart', function() {
	location.href = $(this).attr('href');
});