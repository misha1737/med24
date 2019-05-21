
function modalAddProduct(id){
 addProduct(id);
  //getCart();

  //$('.modal_addProduct').removeClass('off');
 // renderCartPage(); 
  
}

$('.basket').click(function(e){
     $('.modal_addProduct').removeClass('off');
      renderCartPage(); 
   });


 $('.modal_addProduct').click(function(e){
  if (e.target == this){
     $('.modal_addProduct').addClass('off');
    return;
  }
   

   });
 $('.modal_addProduct .addProductBlock').click(function(){

  

   });

 $('.closeModal').click(function(){
$('.modal_addProduct').addClass('off');
  

   });



function addProduct(id) {

                                               var cartVersion=0;
                                               var productCounter=0;
                                               var formData=0;
                                               if (localStorage.getItem("cart")==null){
                                                 formData ={
                                                  "orderItems":
                                                 [{
                                                   "productCount": 1,
                                                    "productId": id
                                                }]
                                                }
                                                formData=JSON.stringify(formData);

                                               // formData=JSON.parse(formData);
                                                  console.log(formData);
                                                  $.ajax({
                                          
                                                    headers: {
                                                      Authorization : 'Bearer ' + localStorage.getItem("token")
                                                    },
                                                    url:'https://web-store-sample-vs.herokuapp.com/web-store/shopping-carts'
                                                    , type:'POST',
                                                    contentType:"application/json",
                                                  data:formData,
                                                    success: function(res) {
                                                   localStorage.setItem('cartId', res.id);     
                                                     console.log("!!!");
                                                   
                                                formData=JSON.stringify(formData);
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

                                                  }else{

                                                     formData ={
                                                  "orderItems":
                                                 [ {
                                                
                                                   
                                                }]
                                                }
                                                var newProduct=true;
                                                        cart=localStorage.getItem("cart");
                                                    cart=JSON.parse(cart);
                                                  for(var i=0; i<cart.orderItems.length; i++ )    {  
                                                     if(cart.orderItems[i].product.id==id) {

                                                       formData.orderItems[i]={
                                                   "productCount": cart.orderItems[i].productCount+1,
                                                   "productId": cart.orderItems[i].product.id
                                                      
                                                    }   
                                                        newProduct=false;
                                                     }else{

                                                   formData.orderItems[i]={
                                                   "productCount": cart.orderItems[i].productCount,
                                                   "productId": cart.orderItems[i].product.id
                                                    }
                                                    }
                                                  }
                                                      if (newProduct){
                                                           formData.orderItems[cart.orderItems.length]={
                                                          "productCount": 1,
                                                          "productId": id
                                                           }
                                                      }
                                                      formData.version=cart.version;

                                                formData=JSON.stringify(formData);

                                                      //  for(i=0;i<formData.orderItems.lenght)

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

                                                     console.log("add ok");
                                             
                                                   
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
                                             }
function deleteProduct(id){




 var cart=localStorage.getItem("cart");
          cart=JSON.parse(cart); 

console.log(id);

                                                 var deleteElement=null;
                                                   formData ={
                                                  "orderItems":
                                                 [ {  }]
                                                }
                                               
                                                  for(var i=0; i<cart.orderItems.length; i++ )    {  
                                                     formData.orderItems[i]={
                                                                "productCount": cart.orderItems[i].productCount,
                                                               "productId": cart.orderItems[i].product.id
                                                               } 
                                                     if(cart.orderItems[i].product.id==id) {
                                                           
                                                             
                                                              
                                                               deleteElement=i;
                                                              $('.content .cartList #'+cart.orderItems[i].product.id+'').remove();

                                                            
                                                                  }
                                                                   
                                                                  
                                                                }
                                                                if (deleteElement!=null && cart.orderItems.length==1){
                                                                
                                                                  deleteCart();
                                                                }
                                                                if (deleteElement!=null){
                                                      formData.orderItems.splice(deleteElement, 1);}



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
                                                     console.log("delete ok");
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



//фунція де видаляється 1 товар а не всі
//  var cart=localStorage.getItem("cart");
//           cart=JSON.parse(cart); 

// console.log(id);

//                                                  var deleteElement=null;
//                                                    formData ={
//                                                   "orderItems":
//                                                  [ {  }]
//                                                 }
                                               
//                                                   for(var i=0; i<cart.orderItems.length; i++ )    {  
//                                                      formData.orderItems[i]={
//                                                                 "productCount": cart.orderItems[i].productCount,
//                                                                "productId": cart.orderItems[i].product.id
//                                                                } 
//                                                      if(cart.orderItems[i].product.id==id) {
//                                                             if(cart.orderItems[i].productCount==1){
//                                                                 //видалення продукта
                                                              
//                                                                deleteElement=i;
//                                                               $('.content .cartList #'+cart.orderItems[i].product.id+'').remove();

//                                                             }else{
//                                                               formData.orderItems[i]={
//                                                                 "productCount": cart.orderItems[i].productCount-1,
//                                                                "productId": cart.orderItems[i].product.id
//                                                                }
//                                                                 $('.content .cartList #'+cart.orderItems[i].product.id+' .productCount' ).text(' x'+formData.orderItems[i].productCount+''); 
//                                                             }

//                                                                   }
                                                                   
                                                                  
//                                                                 }
//                                                                 if (deleteElement!=null && cart.orderItems.length==1){
                                                                
//                                                                   deleteCart();
//                                                                 }
//                                                                 if (deleteElement!=null){
//                                                       formData.orderItems.splice(deleteElement, 1);}



//                                                       formData.version=cart.version;

//                                                formData=JSON.stringify(formData);

                                               

//                                                    console.log(formData);

//                                                         $.ajax({
                                          
//                                                     headers: {
//                                                       Authorization : 'Bearer ' + localStorage.getItem("token")
//                                                      },
//                                                     url:'https://web-store-sample-vs.herokuapp.com/web-store/shopping-carts/'+ localStorage.getItem("cartId")
//                                                     , type:'PUT',
//                                                     contentType:"application/json",
//                                                   data:formData,
//                                                     success: function(res) {
//                                                      console.log("delete ok");
//                                                       getCart();  

//                                                   },
//                                                   error: function (jqXHR, exception){  
//                                                      if (jqXHR.status == 401 && localStorage.getItem("token")==null) {
//                                                      document.location.href = 'autorization.php';
//                                                      }else
//                                                      {
//                                                       if (jqXHR.status == 401){
//                                                         refreshToken();
//                                                         addProduct(id);
//                                                       }
//                                                      }
                              
//                                                    }
//                                                  });

} 