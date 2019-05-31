function getProduct(id){
   $.ajax({
            url:'https://web-store-sample-vs.herokuapp.com/web-store/catalog/products/'+id
            , type:'GET',
          contentType:"application/json",
             success: function(res) {


             		  $('#breadcrumbs').empty();
             		console.log("product");
					console.log(res);
					//breadcrumbsRenderForProducts(res.catalogCategory);
					var nodes=[];


 					nextInput:
					 for (var j=0 ; j<res.catalogCategory.parentNodes.length; j++){

		                   var str = res.catalogCategory.parentNodes[j].nodeId;
		                  
		                   for (var q = 0; q < nodes.length; q++){
		                      if(nodes[q]==str){
		                     continue nextInput;
		                      console.log(str);
		                      console.log(nodes[q]);
		                     }
		                   }
		              nodes.push(res.catalogCategory.parentNodes[j].nodeId);

		             

		         $('#breadcrumbs ').append("<a href=catalog.php?nodeId="+ res.catalogCategory.parentNodes[j].nodeId+"&product=false><label for='subCategory1'>"+ res.catalogCategory.parentNodes[j].name+" </label></a><span> > </span>");
		         


 					}
 				 $('#breadcrumbs ').append("<a href=catalog.php?nodeId="+ res.catalogCategory.nodeId+"&product=false><label for='subCategory1'>"+ res.catalogCategory.name+" </label></a><span> > </span>");
					$('#breadcrumbs ').append("<a href=proguct.php?productId="+res.id+"><label for='subCategory1'>"+ res.name+" </label></a><span> > </span>");


					$('.productName__title').append(res.name);
					$('.price').append(res.priceWithVAT+" грн");
     		  }
     });

      return true;

 }



var productId=0;
if(productId=$('#product #proguctId').text()){
	getProduct(+productId);

}








































// console.log("ok");

// var voting= function(elem)	{
// 	      var stars=	$('.votingBox .votingBox__voting');
// 		  	var starsG=	$('.votingBox .votingBox__votingG');
// 		switch (elem.id) {
// 		  case 'p5':
// 		  	$(stars[4]).css("background","orange");
// 		     $(starsG[4]).css("background","orange"); 
// 		  case 'p4':

// 		 	 $(stars[3]).css("background","orange");
// 		 	 $(starsG[3]).css("background","orange");  
// 		  case 'p3':

// 		    $(stars[2]).css("background","orange"); 
// 		     $(starsG[2]).css("background","orange"); 
// 		  case 'p2':

// 		    $(stars[1]).css("background","orange");
// 		     $(starsG[1]).css("background","orange");  

// 		  case 'p1': 

//  			$(stars[0]).css("background","orange"); 
//  			 $(starsG[0]).css("background","orange"); 
// 		  break;
// 		  default:
// 		  console.log("eror voting");
		
// 		    break;
// 		}
// }


//    $('.votingBox__voting').mouseenter( function() {
//    		voting(this);
//     });
// $('.votingBox__votingG').mouseenter( function() {
//    		voting(this);
//     });

  
//  $('.votingBox__voting').mouseleave( function() {

// $('.votingBox__voting').css("background","none");
// $('.votingBox__votingG').css("background","none");
// 	 });


//   $('.votingBox__votingG').mouseleave( function() {

// $('.votingBox__votingG').css("background","none");
// $('.votingBox__voting').css("background","none");
// 	 });


// $('.productView__mainPhoto img').imageLens({ lensSize: 200 });

// $('.productPhotoGalery__preview').click(function() {
// $('.productPhotoGalery__preview').removeClass('active');
// $(this).addClass('active');
// src= $('.productPhotoGalery .active img').attr( "src" );
// console.log(src);
// $('.productView__mainPhoto').empty();
// $('.productView__mainPhoto').append('<img id="img" src='+src+' alt="">');
// $('.productView__mainPhoto img').imageLens({ lensSize: 200 });
// });

// //timer


//    timerH= $('#timerH').text();
//  timerM= $('#timerM').text();
//  timerS= $('#timerS').text();
// timerH=23-timerH;
// timerM=59-timerM;
// timerS=59-timerS;
// $('#timerH').text(timerH);
// $('#timerM').text(timerM);
// $('#timerS').text(timerS);

// function timerAkcia() {

// timerS--;
// if (timerS==0){
	
	
// 	$('#timerH').text(timerH);
// 	$('#timerM').text(timerM);
// 	$('#timerS').text(timerS);
// 	timerM--;
// 	timerS=60;
// 	if(timerM<0){
// 		timerM==59;
// 		timerH--;
// 	}
// }
// else{
// $('#timerH').text(timerH);
// $('#timerM').text(timerM);
// $('#timerS').text(timerS);
// }

// }

// setInterval(timerAkcia, 1000);

// $('.moreCharacteristic__Button').click(function(){
// 	var element=$(this).parent().parent();
// 	if ($(element).hasClass('characteristicBox_open')){
// 	$(element).removeClass('characteristicBox_open');
// 	$(element).css("max-height","200px");
// 	//$(this).parent().parent().css("height","200px");
// 	$(this).html('Больше⯆');

// 	}else{
// 	$(element).addClass('characteristicBox_open');
// 	$(element).css("max-height","1000px");
// 	//$(this).parent().parent().css("height","auto");
// 	$(this).html('Менше⯅');
// 	}

// });
// var characteristicBox=$('.characteristicBox');
// for (var i=0; i<characteristicBox.length;  i++ ) {
// 	if($(characteristicBox[i]).height()<150){
// 		$(characteristicBox[i]).find('.moreCharacteristic__Button').css('display','none');
// 	//	$((characteristicBox[i]) + ' .moreCharacteristic__Button ').css("display","none");	
// 	}

// }

// $('#shareButton').click(function(){
// 	$('.productView__shareBox').addClass('open');
// 	$('#shareButton').addClass('active');

// });

// $('#addToCart').click(function(){
// $('#addToCart').attr('id', 'toOrder');
// $('#toOrder').text('Оформити замовлення');

// });


// $('#mobileBottomBlockOptions').click(function(){
// $('.mobileBottomBlock').css('bottom','-48px');
// $('.mobileBottomBlockBig').css('bottom','0');
// 	});

// $('.mobileBottomBlock__close').click(function(){
// $('.mobileBottomBlockBig').css('bottom','-128px');
// $('.mobileBottomBlock ').css('bottom','0');
// 	});

// $('#mainCha-cs').click(function(){
// 	$('.productShortCha-cs__Main').removeClass('active');
// 	$('#mainCha-cs').addClass('active');
// 	$('.productMainCha-cs').removeClass('active');
// 	$('#mainCha-csBox').addClass('active');
// });

// $('#allCha-cs').click(function(){
// $('.productShortCha-cs__Main').removeClass('active');
// 	$('#allCha-cs').addClass('active');
// 	$('.productMainCha-cs').removeClass('active');
// 	$('#allCha-csBox').addClass('active');
// });

// $('#prodavec').click(function(){

// $('.productSellersBox__Sellers').removeClass('active');
// 	$('#prodavec').addClass('active');
// 	$('.mainSellers').removeClass('active');
// 	$('#prodavecBox').addClass('active');
// });

// $('#OtherProdavec').click(function(){
// 	$('.productSellersBox__Sellers').removeClass('active');
// 	$('#OtherProdavec').addClass('active');
// 	$('.mainSellers').removeClass('active');
// 	$('#OtherProdavecBox').addClass('active');

// });

// $('#OnMap').click(function(){
// 	$('.productSellersBox__Sellers').removeClass('active');
// 	$('#OnMap').addClass('active');
// 	$('.mainSellers').removeClass('active');
// 	$('#OnMapBox').addClass('active');

// });