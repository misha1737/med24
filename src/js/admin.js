function getOrders(){

	$.ajax({
                                url:'https://web-store-sample-vs.herokuapp.com/web-store/orders'
                                 , headers: {
                                                    Authorization : 'Bearer ' + localStorage.getItem("token")
                                                  },
                                 type:'GET',
                              contentType:"application/json",
                                 success: function(res) {
                                 	$('.adminInfoBlock').empty();
                                        console.log('Замовлення Отримані');
                                       
                                       for(var i=0;i<res.length; i++){
                                       	 console.log(res[i].address);
                                       $('.adminInfoBlock').append('<div class="order" id='+res[i].id+'></div>');
                                       $('.adminInfoBlock #'+res[i].id).append('<div class="buttonOrder" id='+res[i].id+'><span class="glyphicon glyphicon-download"></span></div>');
                                       	$('.adminInfoBlock #'+res[i].id).append('<div class="addres">Адреса: '+ res[i].address +'</div>');
                                       	$('.adminInfoBlock #'+res[i].id).append('<div class="phoneNumber">Телефон: '+ res[i].phoneNumber +'</div>');
                                   		$('.adminInfoBlock #'+res[i].id).append('<div class="status">Статус замовлення: '+ res[i].status +'</div>');
                                   		$('.adminInfoBlock #'+res[i].id).append('<div class="productsOrder disabled"></div>');
                                      


                                      	for(var j=0;j<res[i].orderItems.length; j++){
                                      			console.log(res[i].orderItems[j]);

                                      			$('.adminInfoBlock #'+res[i].id+' .productsOrder').append('<div class="productOrder" id='+res[i].orderItems[j].id+'></div>');
                                      			$('.adminInfoBlock #'+res[i].orderItems[j].id).append('<div class="name">'+ res[i].orderItems[j].product.name +'</div>');
                                           
                                      			$('.adminInfoBlock #'+res[i].orderItems[j].id).append('<div class="priceAndCount">'+res[i].orderItems[j].productCount+'шт '+ '<span class="price">'+(res[i].orderItems[j].productCount * res[i].orderItems[j].product.priceWithVAT) +'</span>грн</div>');
                                   }
                                          var totalPrice=0
                                        var priceMas =  $('.adminInfoBlock #'+res[i].id+" .price");
                                          for( q=0;q<priceMas.length; q++){
                                             totalPrice+= +$(priceMas[q]).text();

                                          }

                                          $('.adminInfoBlock #'+res[i].id+' .productsOrder').append('<div class="totalPrice">Загальна сума = '+  totalPrice +'</div>');
                                 }


                              

                                  $('.admin .buttonOrder').click(function(){
                              
                                if($('.adminInfoBlock #'+this.id+" .productsOrder").hasClass('disabled')){
                                    $('.adminInfoBlock #'+this.id+" .productsOrder").removeClass('disabled');

                                }else{
                                  $('.adminInfoBlock #'+this.id+" .productsOrder").addClass('disabled');
                                }


                                });

                              }, error: function (jqXHR, exception){
                       				  console.log('Замовлення не Отримані');	
                       				  console.log(jqXHR.status);
                       				     if (jqXHR.status == 401){
                                                       document.location.href = 'autorization.php';
                                                      }
                                }
                 });




}

function getUsers(){

$.ajax({
                                url:'https://web-store-sample-vs.herokuapp.com/web-store/users'
                                 , headers: {
                                                    Authorization : 'Bearer ' + localStorage.getItem("token")
                                                  },
                                 type:'GET',
                              contentType:"application/json",
                                 success: function(res) {
                                 	$('.adminInfoBlock').empty();
                                        console.log('Користувачі Отримані');
                                       
                                 for(var i=0;i<res.length; i++){
                                	console.log(res[i].firstName);
                                       $('.adminInfoBlock').append('<div class="order" id=user'+res[i].id+'></div>');
                                       	$('.adminInfoBlock #user'+res[i].id).append('<div class="firstName">'+ res[i].firstName +'</div>');
                                       	$('.adminInfoBlock #user'+res[i].id).append('<div class="lastName">'+ res[i].lastName +'</div>');
                                   		$('.adminInfoBlock #user'+res[i].id).append('<div class="email">'+ res[i].email +'</div>');
                                   		$('.adminInfoBlock #user'+res[i].id).append('<div class="phone">'+ res[i].phone +'</div>');
                                   	
                                   	}

                                


                              }, error: function (jqXHR, exception){
                       				  console.log('Користувачі не Отримані');	
                       				  console.log(jqXHR.status);
                       				     if (jqXHR.status == 401){
                                                       document.location.href = 'autorization.php';
                                                      }
                                }
                 });


}





$('.adminNav #zamovlenya').click(function(){
getOrders();
})

$('.adminNav #users').click(function(){
getUsers();
})

