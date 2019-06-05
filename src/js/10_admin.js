function getAllOrders(){

	$.ajax({
                                url:'https://web-store-sample-vs.herokuapp.com/web-store/orders'
                                 , headers: {
                                                    Authorization : 'Bearer ' + localStorage.getItem("token")
                                                  },
                                 type:'GET',
                              contentType:"application/json",
                                 success: function(res) {
                                 	//$('.adminInfoBlock').empty();
                                        console.log('Замовлення Отримані');
                                       
                                       for(var i=0;i<res.length; i++){
                                       	 console.log(res[i].address);
                                       $('#AllOrders').append('<div class="order" id='+res[i].id+'></div>');
                                       $('#AllOrders  #'+res[i].id).append('<div class="buttonOrder" id='+res[i].id+'><span class="glyphicon glyphicon-download"></span></div>');
                                       	$('#AllOrders .order#'+res[i].id).append('<div class="addres">Адреса: '+ res[i].address +'</div>');
                                       	$('#AllOrders .order#'+res[i].id).append('<div class="phoneNumber">Телефон: '+ res[i].phoneNumber +'</div>');
                                   		$('#AllOrders .order#'+res[i].id).append('<div class="status">Статус замовлення: '+ res[i].status +'</div>');
                                   		$('#AllOrders .order#'+res[i].id).append('<div class="productsOrder disabled"></div>');
                                      


                                      	for(var j=0;j<res[i].orderItems.length; j++){
                                      			console.log(res[i].orderItems[j]);

                                      			$('#AllOrders #'+res[i].id+' .productsOrder').append('<div class="productOrder" id='+res[i].orderItems[j].id+'></div>');
                                      			$('#AllOrders #'+res[i].orderItems[j].id).append('<div class="name">'+ res[i].orderItems[j].product.name +'</div>');
                                           
                                      			$('#AllOrders #'+res[i].orderItems[j].id).append('<div class="priceAndCount">'+res[i].orderItems[j].productCount+'шт '+ '<span class="price">'+(res[i].orderItems[j].productCount * res[i].orderItems[j].product.priceWithVAT) +'</span>грн</div>');
                                   }
                                          var totalPrice=0
                                        var priceMas =  $('#AllOrders #'+res[i].id+" .price");
                                          for( q=0;q<priceMas.length; q++){
                                             totalPrice+= +$(priceMas[q]).text();

                                          }

                                          $('#AllOrders #'+res[i].id+' .productsOrder').append('<div class="totalPrice">Загальна сума = '+  totalPrice +'</div>');
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
                                 	//$('.adminInfoBlock').empty();
                                        console.log('Користувачі Отримані');
                                       
                                 for(var i=0;i<res.length; i++){
                                	console.log(res[i].firstName);
                                       $('#users').append('<div class="user" id=user'+res[i].id+'></div>');
                                       	$('#users #user'+res[i].id).append('<div class="firstName">'+ res[i].firstName +'</div>');
                                       	$('#users #user'+res[i].id).append('<div class="lastName">'+ res[i].lastName +'</div>');
                                   		$('#users #user'+res[i].id).append('<div class="email">'+ res[i].email +'</div>');
                                   		$('#users #user'+res[i].id).append('<div class="phone">'+ res[i].phone +'</div>');
                                   	
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

})

$('.adminNav #users').click(function(){

})



$("#zamovlenyaButton").click(function(){

$("#AllOrders").css("display","block");
$("#users").css("display","none");
$(".adminNav li").removeClass('active');
$("#zamovlenyaButton").addClass('active');
});


$("#usersButton").click(function(){

$("#AllOrders").css("display","none");
$("#users").css("display","block");
$(".adminNav li").removeClass('active');
$("#usersButton").addClass('active');
});