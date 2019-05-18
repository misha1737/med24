console.log("zamovlenya");

$("#oformitZ").click(function(){

		var adres = $("#adres").val();
		var phone = $("#phone").val();
		 phone=  phone.replace('(','');
		  phone=  phone.replace(')','');
		    phone=  phone.replace(' ','');
		      phone=  phone.replace('+','');
		       phone=  phone.replace('-','');

		console.log(adres+" "+ phone);
			$(".zamovlenya .error").css("opacity","0");
			$(".zamovlenya .error h6").text("");	

		

		if (phone.length<3){
			$(".zamovlenya .error").css("opacity","1");
			$(".zamovlenya .error h6").append("Введіть номер телефону");	
		}else

		if (adres.length<3){
			$(".zamovlenya .error").css("opacity","1");
			$(".zamovlenya .error h6").append("Введіть адресу");	
		}else

			if ( !$("#umovi").prop('checked')){
				$(".zamovlenya .error").css("opacity","1");
				$(".zamovlenya .error h6").append("Ви не погодились з правилами");			
			}else
			{

			$(".zamovlenya .error").css("opacity","0");
			$(".zamovlenya .error h6").text("ok");

var orderItems=[];
zamovlenya=localStorage.getItem("cart");
zamovlenya=JSON.parse(zamovlenya);
 for(var i=0; i<zamovlenya.orderItems.length; i++ )    {
 orderItems[i]={
                                                   "productCount": zamovlenya.orderItems[i].productCount,
                                                    "productId": zamovlenya.orderItems[i].product.id
                                                }
 }





				formData={
					"address": adres,
					"phoneNumber" : phone,

					 "orderItems": orderItems
				}

				formData=JSON.stringify(formData);
				console.log(formData);
 					 $.ajax({
                                          
                                                    headers: {
                                                      Authorization : 'Bearer ' + localStorage.getItem("token")
                                                     },
                                                    url:'https://web-store-sample-vs.herokuapp.com/web-store/orders'
                                                    , type:'POST',
                                                    contentType:"application/json",
                                                  data:formData,
                                                    success: function(res) {

                                                     console.log("order ok");
                                                       localStorage.removeItem("cartId");
														  localStorage.removeItem("cartVersion");
														  localStorage.removeItem("cart");
														  localStorage.removeItem("productCounter");
														  localStorage.removeItem("totalPrise");
                                             			 $(".content .zamovPage").remove();
											                  $(".content ").append("<h5>Дякуємо! Ваше замовлення оформлено!</h5>");
											               // alert("Вітаю! Ви успішно зареєструвлись");
											 				      setTimeout(redirect, 5000);
											 				       document.location.href = '#';
											               function redirect() {
											                     document.location.href = 'index.php';
											                }
                                     
                                                     // getCart();
                                                      
                                                  },
                                                  error: function (jqXHR, exception){  
                                                  
                                                    console.log("order error ");
                                                      
                                                     
                              
                                                   }
                                                 });

  


				


			}



});