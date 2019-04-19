
	width=document.body.clientWidth;
console.log(width);




if (width<768){
var step=360;

}else{
var step=600;
}
	$("body").mouseup(function () {

		//	clearInterval(timerId);

		//	$("#search-results-live").animate({scrollLeft: leftPos }, 100, "linear");
	});

$(".slider1ArowRight").mousedown(function () {
		 function func() {
		 		 var leftPos = $('.akciyniTovari').scrollLeft();
				$(".akciyniTovari").animate({scrollLeft: leftPos + 255}, 100, "linear");
				var pointer=(leftPos /step).toFixed(0); 
			
				

			//	
			}
		//	clearInterval(timerId);
			func();
		//	 timerId =setInterval(func, 100);	 		
	});

$(".slider1ArowRight").mouseleave(function () {

clearInterval(timerId);
});



	$(".slider1ArowLeft").mousedown(function () {
		 function func2() {
		 		 var rightPos = $('.akciyniTovari').scrollLeft();
				$(".akciyniTovari").animate({scrollLeft: rightPos - 255}, 100, "linear");
				var pointer=(rightPos /step).toFixed(0); 
				

			}
		//	clearInterval(timerId);
			func2();

		//	 timerId =setInterval(func2, 100);	
			
			
	});
$(".slider1ArowLeft").mouseleave(function () {

//clearInterval(timerId);
});



	var timerId;
	width=document.body.clientWidth;
console.log(width);

if (width<768){
var step=360;

}else{
var step=600;
}

$(".slider2ArowRight").mousedown(function () {
		 function func() {
		 		 var leftPos = $('.recomendTovari').scrollLeft();
				$(".recomendTovari").animate({scrollLeft: leftPos + 255}, 100, "linear");
				var pointer=(leftPos /step).toFixed(0); 
			
				

			//	
			}
		//	clearInterval(timerId);
			func();
			// timerId =setInterval(func, 100);	 		
	});

//$(".slider2ArowRight").mouseleave(function () {

//learInterval(timerId);
//});



//	$("body").mouseup(function () {

		//	clearInterval(timerId);
		
		//	$("#search-results-live").animate({scrollLeft: leftPos }, 100, "linear");
//	});


	$(".slider2ArowLeft").mousedown(function () {
		 function func2() {
		 		 var rightPos = $('.recomendTovari').scrollLeft();
				$(".recomendTovari").animate({scrollLeft: rightPos - 255}, 100, "linear");
				var pointer=(rightPos /step).toFixed(0); 
				

			}
		//	clearInterval(timerId);
			func2();

			// timerId =setInterval(func2, 100);	
			
			
	});
	//$(".slider2ArowLeft").mouseleave(function () {

//clearInterval(timerId);
//});

