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

function getOrders(){

			
 					
              $.ajax({
                                url:'https://web-store-sample-vs.herokuapp.com/web-store/orders/user/'+localStorage.getItem("username")
                                 , headers: {
                                                    Authorization : 'Bearer ' + localStorage.getItem("token")
                                                  },
                                 type:'GET',
                              contentType:"application/json",
                                 success: function(res) {
                                        console.log('замовлення Отримані');
                                    
                       					for (kay in res){ 
                       					    
                       						$('#orders').append('<div class="orderBlock '+res[kay].id+'"></div>');
 									   $('#orders .'+res[kay].id+'').append('<div class="adresBlock"></div>');
                                       $('#orders .'+res[kay].id+' .adresBlock').append('<div>Адреса: '+res[kay].address+'</div>');
                                       $('#orders .'+res[kay].id+' .adresBlock').append('<div>Номер: '+res[kay].phoneNumber+'</div>');
                                       $('#orders .'+res[kay].id+' .adresBlock').append('<div>Статус: '+res[kay].status+'</div>');

                                       //$('#orders .'+res[kay].id+'').append('<div class="'+res[kay].id+' "></div>');	
										var orderPrice=0;
                                       		for (product in res[kay].orderItems){  
                                       				
                                       	$('#orders .'+res[kay].id).append('<div class="'+res[kay].orderItems[product].product.id+' productBox"></div>'	)
                                       	$('#orders .'+res[kay].id+' .'+res[kay].orderItems[product].product.id).append('<img class="productImg" src="img/test.jpg" alt="">');
                                        $('#orders .'+res[kay].id+' .'+res[kay].orderItems[product].product.id).append('<a class="name" href="product.php?productId='+res[kay].orderItems[product].product.id +'">'+res[kay].orderItems[product].product.name+'</a>');
                                        $('#orders .'+res[kay].id+' .'+res[kay].orderItems[product].product.id).append('<div class="price">Ціна:'+res[kay].orderItems[product].product.priceWithVAT+'</div>');
                                        $('#orders .'+res[kay].id+' .'+res[kay].orderItems[product].product.id).append('<div class="count">Кількість:'+res[kay].orderItems[product].productCount+'</div>');
                                       var price=res[kay].orderItems[product].product.priceWithVAT;
                                       var count=res[kay].orderItems[product].productCount;
                                       var suma=+(price*count).toFixed(2);
                                       orderPrice=+(orderPrice+suma).toFixed(2);
                                        $('#orders .'+res[kay].id+' .'+res[kay].orderItems[product].product.id).append('<div class="suma">Сума:'+suma+'</div>');

                                   				}
                                   				$('#orders .'+res[kay].id+' .adresBlock').append('<div>Сума до сплати: '+orderPrice+'</div>');
                                   			}

              							
                              }, 
                              error: function (jqXHR, exception){
             
                               if (jqXHR.status == 401 && localStorage.getItem("token")==null) {
                                                     document.location.href = 'autorization.php';
                                                     }else
                                                     {
                                                      if (jqXHR.status == 401){
                                                        refreshToken();
                                                        getOrders();
                                                      }  
                              }
                                }
                               });                       
}
