function proguctSort(cart){
console.log('SORT')
console.log(cart); 

function compare( a, b ) {
 // console.log(a.id);
  if ( a.product.name < b.product.name ){
    return -1;
  }
  if ( a.product.name > b.product.name ){
    return 1;
  }
  return 0;
}

cart.orderItems.sort( compare );

console.log(cart); 
return cart;
}



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
                                       
                                        res=proguctSort(res);
                                
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
                                        $('.modal_addProduct').removeClass('off');
                                                       renderCartPage(); 
                                                     
                                                       
                                                       
              
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

				//getCart();
        var cart=localStorage.getItem("cart");
        if (cart===null){}else{
          cart=JSON.parse(cart); 

                            for(var i=0; i<cart.orderItems.length;i++){
                              var price= (cart.orderItems[i].product.priceWithVAT).toFixed(2);
                               var counter= cart.orderItems[i].productCount;
                            	$('.content .cartList').append('<div class="productCart" id="'+cart.orderItems[i].product.id+'"><div class="priceAndCount"></div>');
                              $('.content .cartList #'+cart.orderItems[i].product.id+'').prepend('<a href="product.php?productId='+cart.orderItems[i].product.id+'" class="name">'+cart.orderItems[i].product.name+'</a>');
                              $('.content .cartList #'+cart.orderItems[i].product.id+'').prepend('<img src="img/test.jpg" class="productImg">');
                              $('.content .cartList #'+cart.orderItems[i].product.id+' .priceAndCount').append('<span class="price">'+price+'</span>');
                              $('.content .cartList #'+cart.orderItems[i].product.id+' .priceAndCount').append('<span id="decrement"><i class="fa fa-minus" aria-hidden="true"></i></span><input class="productCount"type="number" value="'+counter+'"><span id="increment"><i class="fa fa-plus" aria-hidden="true"></i></span></span>');
                              $('.content .cartList #'+cart.orderItems[i].product.id+' .priceAndCount').append('<span class="totalPrice">'+(price*counter).toFixed(2)+'</span>');
                            	$('.content .cartList #'+cart.orderItems[i].product.id+'').append('<button class="removeProduct" id="'+cart.orderItems[i].product.id+'">X</Button>');
                                
                               activeDecrement(counter,cart.orderItems[i].product.id);
                            }
                              $(".content .cartList button").click(function() {
                                 var productItem=this;
                      
                                         
                                deleteProduct(this.id);
           
                         });  
                          console.log($(".cartList input"));
                          $(".cartList input").change(function(){
                                  //selectorId=this
                                 
                                selectorId=$(this).parent().parent()[0].id;
                                 counter= this.value;
                                  timerId = setTimeout(changeCart, 1000, selectorId, counter);
                          

                          });
        }
   
 function changeCart(id,counter){

     console.log('changeCart '+id+' '+counter);
                                                     formData ={
                                                  "orderItems":
                                                 [ {
                                                
                                                  
                                                }]
                                                }
                                                
                                                        cart=localStorage.getItem("cart");
                                                    cart=JSON.parse(cart);
                                                    console.log(cart);
                                                      for(var i=0; i<cart.orderItems.length; i++ )    {  
                                                        if(cart.orderItems[i].product.id==id){
                                                       formData.orderItems[i]={
                                                   "productCount": counter,
                                                   "productId": cart.orderItems[i].product.id
                                                    }   
                                                      }else{
                                                      formData.orderItems[i]={
                                                   "productCount": cart.orderItems[i].productCount,
                                                   "productId": cart.orderItems[i].product.id
                                                      }


                                                  }
                                                }
                                                      formData.version=cart.version;
                                                formData=JSON.stringify(formData);
                                                   console.log(formData);


                                                     $.ajax({
                                          
                                                    headers: {
                                                       Authorization : 'Bearer ' + localStorage.getItem("token")
                                                     },
                                                     url:'https://web-store-sample-vs.herokuapp.com/web-store/shopping-carts/'+ localStorage.getItem("cartId")
                                                    , type:'PUT',
                                                     contentType:"application/json",
                                                   data:formData,
                                                    success: function(res) {

                                                     console.log("change ok");
                                             
                                     
                                                      getCart();
                                                      
                                                  },
                                                  error: function (jqXHR, exception){  
                                                     if (jqXHR.status == 401 && localStorage.getItem("token")==null) {
                                                     document.location.href = 'autorization.php';
                                                     }else
                                                     {
                                                      if (jqXHR.status == 401){
                                                        refreshToken();
                                                        addProduct(id);
                                                      }
                                                     }
                              
                                                   }
                                                 });
                                                  


}

   function activeDecrement(counter, id){
  if (counter>1){
    var button=$('.cartList  #'+id+' span .fa-minus');
  
    $(button).removeClass('disabled');
   
      return false
  }else{
    var button=$('.cartList  #'+id+' span .fa-minus');
    $(button).addClass('disabled');
    return true
  }
}

$('.cartList #decrement').click(function(){
 





var selectorId=($(this).parent().parent()[0].id);
var counter=$('.cartList #'+selectorId+' .priceAndCount .productCount').val();
if (activeDecrement(counter,selectorId)){
}else{
$('.cartList #'+selectorId+' .priceAndCount .productCount').val(--counter);
clearTimeout(timerId);
timerId = setTimeout(changeCart, 500, selectorId, counter);
}
});


$('.cartList #increment').click(function(){

  var selectorId=($(this).parent().parent()[0].id);
var counter=$('.cartList #'+selectorId+' .priceAndCount .productCount').val();
$('.cartList #'+selectorId+' .priceAndCount .productCount').val(++counter);
clearTimeout(timerId);
timerId = setTimeout(changeCart, 500, selectorId, counter);
activeDecrement(counter,selectorId);
});

};
