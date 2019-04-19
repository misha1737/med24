function getCart(){
             
                            $.ajax({
                                url:'https://web-store-sample-vs.herokuapp.com/web-store/shopping-carts/'+localStorage.getItem("username")
                                 , headers: {
                                                    Authorization : 'Bearer ' + localStorage.getItem("token")
                                                  },
                                 type:'GET',
                              contentType:"application/json",
                                 success: function(res) {
                                        console.log('Корзина Отримана');

                                        localStorage.setItem("cartId", res.id);
                                            var productCounter=0;
                                            var totalPrise=0;
                                           for(var i=0; i<res.orderItems.length;i++){
                                             productCounter+= res.orderItems[i].productCount;
                                            totalPrise+=res.orderItems[i].product.priceWithVAT*res.orderItems[i].productCount;
                                           }
                                           localStorage.setItem("productCounter", productCounter);
                                           localStorage.setItem("totalPrise", totalPrise.toFixed(2));
                                          
                                       var cart=JSON.stringify(res);
                                        localStorage.setItem("cart", cart);
                                        setCartsCounter();
                                        setTotalPrise();
              
                              }, error: function (jqXHR, exception){
             
                                 if (jqXHR.status == 401 && localStorage.getItem("token")==null) {
                                                     document.location.href = 'autorization.php';
                                                     }else
                                                     {
                                                      if (jqXHR.status == 401){
                                                        refreshToken();
                                                        getCart();
                                                      }  
                              }
                              if (jqXHR.status == 400) {
                                                     //document.location.href = 'autorization.php';
                                                    //  alert('error400');
                                                      var productCounter=0;
                                                      var totalPrise=0;
                                                      setCartsCounter();
                                                       setTotalPrise();
                                                     }
                                                   

                                }
                               });

}


function deleteCart(){
        console.log("deleteCart");   
                                          
                            $.ajax({
                                url:'https://web-store-sample-vs.herokuapp.com/web-store/shopping-carts/'+localStorage.getItem("cartId")
                                 , headers: {
                                                    Authorization : 'Bearer ' + localStorage.getItem("token")
                                                  },
                                 type:'DELETE',
                              contentType:"application/json",
                                 success: function(res) {
                                        console.log('Корзина видаленна');
                                         localStorage.removeItem("cartId");
                                          localStorage.removeItem("cart");   
                                           localStorage.removeItem("totalPrise");
                                          localStorage.removeItem("productCounter");
                                           setCartsCounter();
                                                       setTotalPrise();   

                              }, error: function (jqXHR, exception){
             
                                console.log("error корзина не видаленна");  
                //   
                                return false;  
                              }

                               });

}

function renderCartPage(){
	console.log("script");
	$('.content .cartList').text('');

				getCart();
        var cart=localStorage.getItem("cart");
        if (cart===null){}else{
          cart=JSON.parse(cart);           
                            for(var i=0; i<cart.orderItems.length;i++){
                            	$('.content .cartList').append('<div class="productCart" id="'+cart.orderItems[i].product.id+'"></div>');
                            	$('.content .cartList #'+cart.orderItems[i].product.id+'').append('<span class="name">'+cart.orderItems[i].product.name+'</span>');
                              $('.content .cartList #'+cart.orderItems[i].product.id+'').append('<span class="productCount"> x'+cart.orderItems[i].productCount+'</span>');
                            	$('.content .cartList #'+cart.orderItems[i].product.id+'').append('<span class="price">'+(cart.orderItems[i].product.priceWithVAT*cart.orderItems[i].productCount).toFixed(2)+'</span>');
                            	$('.content .cartList #'+cart.orderItems[i].product.id+'').append('<button class="removeProduct" id="'+cart.orderItems[i].product.id+'">X</Button>');
                            }
                              $(".content .cartList button").click(function() {
                                 var productItem=this;
                      
                                         
                                deleteProduct(this.id);
           
                         });  
        
        }
   };
