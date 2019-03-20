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
   };





function refreshToken(id){
                                                 

                                                 formData ={
                                                  "refreshToken" :  localStorage.getItem("refresh_token")
                                                
                                                }
                                                formData=JSON.stringify(formData);

                                               // formData=JSON.parse(formData);
                                                  console.log(formData);
                                                  $.ajax({
                                          
                                                  
                                                    url:'https://web-store-sample-vs.herokuapp.com/web-store/auth/refresh-token'
                                                    , type:'POST',
                                                    contentType:"application/json",
                                                  data:formData,
                                                    success: function(res) {
                                                           var token = res.access_token;
                                                            var refresh_token = res.refresh_token;
                                                             localStorage.setItem('token', token);
                                                              localStorage.setItem('refresh_token', refresh_token);                                              
                                                        console.log("refreshToken ok");

                                                    }, error: function (jqXHR, exception){console.log("error refreshToken"); 
                                                                           document.location.href = 'autorization.php';
                                                  }
                                                    });


}
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
                                                      formData.version=cart.version+1;

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
                                                            if(cart.orderItems[i].productCount==1){
                                                                //видалення продукта
                                                              
                                                               deleteElement=i;
                                                              $('.content .cartList #'+cart.orderItems[i].product.id+'').remove();

                                                            }else{
                                                              formData.orderItems[i]={
                                                                "productCount": cart.orderItems[i].productCount-1,
                                                               "productId": cart.orderItems[i].product.id
                                                               }
                                                                $('.content .cartList #'+cart.orderItems[i].product.id+' .productCount' ).text(' x'+formData.orderItems[i].productCount+''); 
                                                            }

                                                                  }
                                                                   
                                                                  
                                                                }
                                                                if (deleteElement!=null && cart.orderItems.length==1){
                                                                
                                                                  deleteCart();
                                                                }
                                                                if (deleteElement!=null){
                                                      formData.orderItems.splice(deleteElement, 1);}



                                                      formData.version=cart.version+1;

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

} 




//catalog

$(" document").ready(function() {

function headerMenuCatalogRender(){

function eventHover(){

  $('.tovaryMenu .catalogMenu h5').hover(function(){
    $('.tovaryMenu .catalogMenu h5').removeClass('active');
    $('.tovaryMenu .catalog .categoria').removeClass('active');
      $(this).addClass('active');
      
              $('.tovaryMenu .catalog .id'+this.id+'').addClass('active');
    });

}



 function eventClick(node){
  $.ajax({
            url:'https://web-store-sample-vs.herokuapp.com/web-store/catalog/'+node+'/products'
            , type:'GET',
          contentType:"application/json",
             success: function(res) {
              $('.products').empty();
                   for(i=0;i<res.length;i++){
              $('.products').append("<p>id="+res[i].id+"<p>");
        $('.products').append("<p>externalId="+res[i].externalId+"<p>");
        $('.products').append("<p>name="+res[i].name+"<p>");
        $('.products').append("<p>price="+res[i].priceWithVAT+"<p>");
           }
       }
   
     });

}

 function getPodPodcategoria(idCategoria,idPodCategoria, node){
     $.ajax({
                url:'https://web-store-sample-vs.herokuapp.com/web-store/catalog/'+node
                , type:'GET',
      
              contentType:"application/json",
                 success: function(res) {
                   for(i=0;i<res.length;i++){
                   $(".tovaryMenu .catalog .podcatalog."+idCategoria+" .podpodcatalog."+idPodCategoria+" ").prepend("<h6 id="+res[i].nodeId+">"+res[i].name+"</h6>");
            if(res[i].hasLinkedProducts){
                 $(".tovaryMenu .catalog .podcatalog."+idCategoria+" .podpodcatalog."+idPodCategoria+" h6#"+res[i].nodeId+" ").addClass('hasProducts');
                  $(".tovaryMenu .catalog .podcatalog."+idCategoria+" .podpodcatalog."+idPodCategoria+" h6#"+res[i].nodeId+" ").on("click", function() {
                  
                    eventClick(this.id);
                      });

              }
             }
             
           },
           error: function (jqXHR, exception){  
              console.log(jqXHR);
           }
         });
          return true;
}

 function  getPodcategoria(idCategoria, node){
     $.ajax({
                url:'https://web-store-sample-vs.herokuapp.com/web-store/catalog/'+node
                , type:'GET',
              contentType:"application/json",
                 success: function(res) {

                   for(i=0;i<res.length;i++){
                   $(".tovaryMenu .catalog .podcatalog."+idCategoria+"").prepend("<div class='podcategoria'><h5 id="+i+">"+res[i].name+"</h5><div class='podpodcatalog "+i+"'></div></div>");
                  
                getPodPodcategoria(idCategoria,i, res[i].nodeId);      
            if(res[i].hasLinkedProducts){
                 $(".tovaryMenu .catalog .podcatalog."+idCategoria+" h5#"+i+" ").addClass('hasProducts');

              }   

             }

           },
           error: function (jqXHR, exception){  
              console.log(jqXHR);
           }

       
         });
          return true;
 }

 function getCategoria(){
   $.ajax({
            url:'https://web-store-sample-vs.herokuapp.com/web-store/catalog/'
            , type:'GET',
          contentType:"application/json",
             success: function(res) {
               for(i=0;i<res.length;i++){
               $(".tovaryMenu .catalog").prepend("<div class='categoria id"+i+"'><h4>"+res[i].name+"</h4><div class='podcatalog "+i+"'></div></div>");
               $(".tovaryMenu .catalogMenu").prepend("<h5 id="+i+">"+res[i].name+"</h5>");
               getPodcategoria(i, res[i].nodeId);
         }
          eventHover();
       }
   
     });

      return true;

 }

getCategoria();


 }




function MenuCatalogRender(){


function renderCategoriya(){
     $(".sliderBox").css("display","none");

  $(".catalogPoslugi").css("display","none");
}















function eventHover(){

  $('.topBlock .catalogMenu h5').hover(function(){
    $('.topBlock  .catalogMenu h5').removeClass('active');
    $('.topBlock .catalogBlock .categoria').removeClass('active');
      $(this).addClass('active');
              $('.topBlock .catalogBlock .id'+this.id+'').addClass('active');
              renderCategoriya();
               $(".catalogBlock .ktg").css("display","none");
              $(".catalogBlock").css("display","inline-block");
              $( ".topBlock" ).mouseleave(function() {
              $(".sliderBox").css("display","inline-block");
             $(".catalogBlock").css("display","none");
              $(".catalogPoslugi").css("display","inline-block");

            });


    });

}



 function eventClick(node){
  $.ajax({
            url:'https://web-store-sample-vs.herokuapp.com/web-store/catalog/'+node+'/products'
            , type:'GET',
          contentType:"application/json",
             success: function(res) {
              $('.products').empty();
                   for(i=0;i<res.length;i++){
              $('.products').append("<p>id="+res[i].id+"<p>");
        $('.products').append("<p>externalId="+res[i].externalId+"<p>");
        $('.products').append("<p>name="+res[i].name+"<p>");
        $('.products').append("<p>price="+res[i].priceWithVAT+"<p>");
           }
       }
   
     });

}

 function getPodPodcategoria(idCategoria,idPodCategoria, node){
     $.ajax({
                url:'https://web-store-sample-vs.herokuapp.com/web-store/catalog/'+node
                , type:'GET',
      
              contentType:"application/json",
                 success: function(res) {
                   for(i=0;i<res.length;i++){
                   $(".topBlock .catalogBlock .podcatalog."+idCategoria+" .podpodcatalog."+idPodCategoria+" ").prepend("<h6 id="+res[i].nodeId+">"+res[i].name+"</h6>");
            if(res[i].hasLinkedProducts){
                 $(".topBlock .catalogBlock .podcatalog."+idCategoria+" .podpodcatalog."+idPodCategoria+" h6#"+res[i].nodeId+" ").addClass('hasProducts');
                  $(".topBlock .catalogBlock .podcatalog."+idCategoria+" .podpodcatalog."+idPodCategoria+" h6#"+res[i].nodeId+" ").on("click", function() {
                  
                    eventClick(this.id);
                      });

              }
             }
             
           },
           error: function (jqXHR, exception){  
              console.log(jqXHR);
           }
         });
          return true;
}

  function  getPodcategoria(idCategoria, node){
     $.ajax({
                url:'https://web-store-sample-vs.herokuapp.com/web-store/catalog/'+node
                , type:'GET',
              contentType:"application/json",
                 success: function(res) {

                   for(i=0;i<res.length;i++){
                   $(".topBlock .catalogBlock .podcatalog."+idCategoria+"").prepend("<div class='podcategoria'><h5 id="+i+">"+res[i].name+"</h5><div class='podpodcatalog "+i+"'></div></div>");
                  
                getPodPodcategoria(idCategoria,i, res[i].nodeId);      
            if(res[i].hasLinkedProducts){
                 $(".topBlock .catalogBlock .podcatalog."+idCategoria+" h5#"+i+" ").addClass('hasProducts');

              }   

             }

           },
           error: function (jqXHR, exception){  
              console.log(jqXHR);
           }

       
         });
          return true;
 }

 function getCategoria(){
   $.ajax({
            url:'https://web-store-sample-vs.herokuapp.com/web-store/catalog/'
            , type:'GET',
          contentType:"application/json",
             success: function(res) {
               for(i=0;i<res.length;i++){
               $(".topBlock .catalogBlock").prepend("<div class='categoria id"+i+"'><h4>"+res[i].name+"</h4><div class='podcatalog "+i+"'></div></div>");
               $(".topBlock  .catalogMenu .menuBlock").prepend("<h5 id="+i+">"+res[i].name+"</h5>");
               getPodcategoria(i, res[i].nodeId);
         }
          eventHover();
       }
   
     });

      return true;

 }

getCategoria();


 }




   headerMenuCatalogRender();
   MenuCatalogRender();

 

 


 $(".menuBlock li").click(function() {
                console.log("h5");
                console.log("id="+this.id);
          $.ajax({
             url:'https://web-store-sample-vs.herokuapp.com/web-store/catalog/'+this.id
             , type:'GET',
           contentType:"application/json",
             success: function(res) {

               $(".content .container .row").empty();

                for(i=0;i<res.length;i++){

                $(".content .container .row").prepend("<div class='productBlock'> <div class='product' id="+res[i].name+">"+res[i].name+"</div></div>");
       
                                         }

                                       }

                });

  


                 });

        









$( "header .tovaryButton" ).hover(function() {
  $(".tovaryMenu").css("display","inline-block");
  $(".arrow").css("display","inline-block");
  $(".content").css("opacity", "0.3");
  $(".poslugiMenu").css("display","none");
  $(".arrowP").css("display","none");
  $(".content").css("opacity", "1");
});

$( ".tovaryMenu" ).mouseleave(function() {
  $(".tovaryMenu").css("display","none");
  $(".arrow").css("display","none");
  $(".content").css("opacity", "1");
});

$( "header .poslugiButton" ).hover(function() {
  console.log("poslugi")
  $(".poslugiMenu").css("display","inline-block");
  $(".arrowP").css("display","inline-block");
  $(".content").css("opacity", "0.3");
  $(".tovaryMenu").css("display","none");
  $(".arrow").css("display","none");
  $(".content").css("opacity", "1");
});

$( ".poslugiMenu" ).mouseleave(function() {
  $(".poslugiMenu").css("display","none");
  $(".arrowP").css("display","none");
  $(".content").css("opacity", "1");


});

$(document).mouseup(function (e) {
    var container = $(".tovaryMenu");
    if (container.has(e.target).length === 0){
        $(".tovaryMenu").css("display","none");
        $(".arrow").css("display","none");
        $(".content").css("opacity", "1");
    }
});

 $.ajax({
            url:'https://web-store-sample-vs.herokuapp.com/web-store/catalog/'
            , type:'GET',
          contentType:"application/json",
             success: function(res) {
               for(i=0;i<res.length;i++){
               $(".preparaty").prepend("<h5 id="+res[i].id+">"+res[i].name+"</h5>");
         }
       }
     });




































//дві точки

$( "lecarstveniPreparati" ).hover(function() {
  $(".catalogBlock").empty();

  $.ajax({
            url:'https://web-store-sample-vs.herokuapp.com/web-store/catalog/'
            , type:'GET',
          contentType:"application/json",
             success: function(res) {
               for(i=0;i<res.length;i++){
               $(".catalogBlock").prepend("<h5 id="+res[i].id+">"+res[i].name+"</h5>");

              
            
         }

 $(".catalogBlock h5").click(function() {
                console.log("h5");

          $.ajax({
             url:'https://web-store-sample-vs.herokuapp.com/web-store/catalog/'+this.id
             , type:'GET',
           contentType:"application/json",
             success: function(res) {
               $(".content .container .row").empty();
               for(i=0;i<res.length;i++){

               $(".content .container .row").prepend("<div class='col-md-4 col-lg-3 col-sm-6 productBlock '> <div class='product' id="+res[i].id+"></div></div>");
                $(".content .container .row #"+res[i].id+" ").prepend(" <h5>"+res[i].name+"</h5>");

                //картинка
                $(".content .container .row #"+res[i].id+" ").append(" <img src='img/test.jpg' >");
                //картинка

                $(".content .container .row #"+res[i].id+" ").append(" <p class='manufacturer'>Производитель:"+res[i].product.manufacturer+"</p>");
                
                $(".content .container .row #"+res[i].id+" ").append(" <p class='price'>Цена:"+res[i].product.priceWithVAT+"</p>");

                $(".content .container .row #"+res[i].id+" ").append(" <button onclick='addProduct("+res[i].product.id+")' id="+res[i].product.id+">Добавить в корзину</button>");
              
                                         }
//--------------------------------------------------------
                                            // $(".content button").click(catalog() );
//--------------------------------------------------------

                                       }



                });

  


                 });

        





        }
     });


});


});



//перевірка і вивід імя користувача
function username(){
  name= localStorage.getItem("username");
  if(typeof(localStorage.getItem("username"))==="object"){
     $("header .access ").append("<a href='autorization.php'><i class='far fa-user'></i><span>Увійти / Зареєструватись</span></a>");
   }else{
    $("header .access ").append("<i class='far fa-user'></i><span>"+name+"</span><span class='exit'> Вийти</span>");
  }
}
username();

$("span.exit").click(function() {
  localStorage.removeItem("username");
  localStorage.removeItem("token");
  localStorage.removeItem("cartId");
  localStorage.removeItem("cartVersion");
  localStorage.removeItem("cart");
  localStorage.removeItem("productCounter");
  localStorage.removeItem("totalPrise");
  localStorage.removeItem("refresh_token")
  
  
  document.location.href = 'index.php';
});
//форма регистрации
 $("#registrationform").submit(function() {
 		if($("#password").val()!=$("#password2").val()){
 			$("#password").css("background-color", "#f77");
 			$("#password2").css("background-color", "#f77");
 			$("#registrationResults").text("Паролі не співпадають");
 			 return false;
 		}
 		if(isNaN($("#phone").val())){
 				$("#phone").css("background-color", "#f77");
 				$("#registrationResults").text("невірний номер");
 			 return false;	
 		}

        var formData = {
            "firstName":$("#firstName").val()
            , "lastName":$("#lastName").val()
            , "email":$("#email").val().toLowerCase()
            , "password":$("#password").val()
            , "phone":$("#phone").val()
        };
        formData=JSON.stringify(formData);
        $.ajax({
 
            url:'https://web-store-sample-vs.herokuapp.com/web-store/users'
            , type:'POST',
          contentType:"application/json",
           data:formData,
             success: function(res) {
                console.log(res);

                       
                  $(".authorization form").css("display","none");
                  $(".authorization").append("<h5>Вітаю! Ви успішно зареєструвлись</h5>");
               // alert("Вітаю! Ви успішно зареєструвлись");
 				      setTimeout(redirect, 3000);
              
               function redirect() {
                     document.location.href = 'index.php';
                }
          

            },
             error: function (jqXHR, exception){	
            if (jqXHR.status == 500) {
	            	$("#email").css("background-color", "#f77");
 					$("#registrationResults").text("користувач з таким Email уже зареєстрований");
 			 return false;	
	        }}
        });
        return false;
    });
//форма авторизации
 $("#authorizationForm").submit(function() {
        var formData = {
            "username":$("#email").val(),
			"password":$("#password").val()
    
        };
        formData=JSON.stringify(formData);
        $.ajax({
 
            url:'https://web-store-sample-vs.herokuapp.com/web-store/auth/signin'
            , type:'POST',
          contentType:"application/json",
           data:formData,
             success: function(res) {

               

   
                var token = res.access_token;
                var refresh_token = res.refresh_token;
                localStorage.setItem('token', token);
                 localStorage.setItem('refresh_token', refresh_token);
                var decoded = jwt_decode(token);
                
                localStorage.setItem('username', decoded.user_name);
                  username();
                  getCart(); 
              //  отримання корзини

                    $.ajax({
                           headers: {
                                                Authorization : 'Bearer ' + localStorage.getItem("token")
                                             },
                        url:'https://web-store-sample-vs.herokuapp.com/web-store/shopping-carts/'+localStorage.getItem("username")
                        , type:'GET',
                      contentType:"application/json",
                         success: function(res) {
                          
         

                          document.location.href = 'index.php';

                    },

        error: function (jqXHR, exception){  
              document.location.href = 'index.php';
       return false;  
          }
 
        });
    
   


            },
             error: function (jqXHR, exception){	
              alert("невірний логин або пароль");
 			 return false;	
	        }
        });
        return false;
    });


 $(".poslugiButton").click(function(){


  document.location.href = 'filter.php';

 });

  $(".tovaryButton").click(function(){


  document.location.href = 'filter.php';

 });




var filter=false;

$(" .filter-off").click(function() {

if(filter){
	filter=false;

	$(" .filter").css("display","none")


}
	else{

	filter=true;

	$(" .filter").css("display","block")
} 


//$(" .filter-off").addClass("filter-on");
//$(" .filter-off").removeClass("filter-off");
//console.log("123");

});

$(" .filterSend").click(function() {
filter=false;

	$(" .filter").css("display","none");

});


var optionCatalog=localStorage.getItem("optionCatalogList");
if (optionCatalog===null){
	localStorage.setItem("optionCatalogList",'false');
}else{
	
	
}

function setList(){
$(" .catelogElemet").addClass("productBlockList");
$(".catelogElemet").removeClass("productBlock");
$(" .glyphicon-th").removeClass("selected");
$(" .glyphicon-th-list").addClass("selected");
//
}

function setNotList(){
$(" .catelogElemet").addClass("productBlock");
$(" .catelogElemet").removeClass("productBlockList");
$(" .glyphicon-th-list").removeClass("selected");
$(" .glyphicon-th ").addClass("selected");
//localStorage.setItem("optionCatalogList",false);
}

$(" .glyphicon-th-list").click(function() {
setList();
localStorage.setItem("optionCatalogList",'true');
});

$(" .glyphicon-th").click(function() {
setNotList();
localStorage.setItem("optionCatalogList",'false');

});



function setCartsCounter()
{
$("header .basket a .productCounter").text('');
if( localStorage.getItem("productCounter")==null){
	$("header .basket a .productCounter").append("0");
}else{

$("header .basket a .productCounter").append(localStorage.getItem("productCounter"));}
}

function setTotalPrise(){
$(".basket #totalPrise").text('');
$("#endPrise").text('');

if( localStorage.getItem("totalPrise")==null){
	$(".basket #totalPrise").append("0");
	$("#endPrise").append("0");
}else{

$(".basket #totalPrise").append(localStorage.getItem("totalPrise"));
$("#endPrise").append(localStorage.getItem("totalPrise"));
}
}





setCartsCounter();
setTotalPrise();
/*  
    http://www.dailycoding.com/ 
*/
(function ($) {
    $.fn.imageLens = function (options) {

        var defaults = {
            lensSize: 100,
            borderSize: 4,
            borderColor: "#888"
        };
        var options = $.extend(defaults, options);
        var lensStyle = "background-position: 0px 0px;width: " + String(options.lensSize) + "px;height: " + String(options.lensSize)
            + "px;float: left;display: none;border-radius: " + String(options.lensSize / 2 + options.borderSize)
            + "px;border: " + String(options.borderSize) + "px solid " + options.borderColor 
            + ";background-repeat: no-repeat;position: absolute;";

        return this.each(function () {
            obj = $(this);

            var offset = $(this).offset();

            // Creating lens
            var target = $("<div style='" + lensStyle + "' class='" + options.lensCss + "'>&nbsp;</div>").appendTo($(this).parent());
            var targetSize = target.size();

            // Calculating actual size of image
            var imageSrc = options.imageSrc ? options.imageSrc : $(this).attr("src");
            var imageTag = "<img style='display:none;' src='" + imageSrc + "' />";

            var widthRatio = 0;
            var heightRatio = 0;

            $(imageTag).load(function () {
                widthRatio = $(this).width() / obj.width();
                heightRatio = $(this).height() / obj.height();
            }).appendTo($(this).parent());

            target.css({ backgroundImage: "url('" + imageSrc + "')" });

            target.mousemove(setPosition);
            $(this).mousemove(setPosition);

            function setPosition(e) {

                var leftPos = parseInt(e.pageX - offset.left);
                var topPos = parseInt(e.pageY - offset.top);

                if (leftPos < 0 || topPos < 0 || leftPos > obj.width() || topPos > obj.height()) {
                    target.hide();
                }
                else {
                    target.show();

                    leftPos = String(((e.pageX - offset.left) * widthRatio - target.width() / 2) * (-1));
                    topPos = String(((e.pageY - offset.top) * heightRatio - target.height() / 2) * (-1));
                    target.css({ backgroundPosition: leftPos + 'px ' + topPos + 'px' });

                    leftPos = String(e.pageX - target.width() / 2);
                    topPos = String(e.pageY - target.height() / 2);
                    target.css({ left: leftPos + 'px', top: topPos + 'px' });
                }
            }
        });
    };
})(jQuery);
/*
    jQuery Masked Input Plugin
    Copyright (c) 2007 - 2015 Josh Bush (digitalbush.com)
    Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license)
    Version: 1.4.1
*/
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):jQuery)}(function(a){var b,c=navigator.userAgent,d=/iphone/i.test(c),e=/chrome/i.test(c),f=/android/i.test(c);a.mask={definitions:{9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},autoclear:!0,dataName:"rawMaskFn",placeholder:"_"},a.fn.extend({caret:function(a,b){var c;if(0!==this.length&&!this.is(":hidden"))return"number"==typeof a?(b="number"==typeof b?b:a,this.each(function(){this.setSelectionRange?this.setSelectionRange(a,b):this.createTextRange&&(c=this.createTextRange(),c.collapse(!0),c.moveEnd("character",b),c.moveStart("character",a),c.select())})):(this[0].setSelectionRange?(a=this[0].selectionStart,b=this[0].selectionEnd):document.selection&&document.selection.createRange&&(c=document.selection.createRange(),a=0-c.duplicate().moveStart("character",-1e5),b=a+c.text.length),{begin:a,end:b})},unmask:function(){return this.trigger("unmask")},mask:function(c,g){var h,i,j,k,l,m,n,o;if(!c&&this.length>0){h=a(this[0]);var p=h.data(a.mask.dataName);return p?p():void 0}return g=a.extend({autoclear:a.mask.autoclear,placeholder:a.mask.placeholder,completed:null},g),i=a.mask.definitions,j=[],k=n=c.length,l=null,a.each(c.split(""),function(a,b){"?"==b?(n--,k=a):i[b]?(j.push(new RegExp(i[b])),null===l&&(l=j.length-1),k>a&&(m=j.length-1)):j.push(null)}),this.trigger("unmask").each(function(){function h(){if(g.completed){for(var a=l;m>=a;a++)if(j[a]&&C[a]===p(a))return;g.completed.call(B)}}function p(a){return g.placeholder.charAt(a<g.placeholder.length?a:0)}function q(a){for(;++a<n&&!j[a];);return a}function r(a){for(;--a>=0&&!j[a];);return a}function s(a,b){var c,d;if(!(0>a)){for(c=a,d=q(b);n>c;c++)if(j[c]){if(!(n>d&&j[c].test(C[d])))break;C[c]=C[d],C[d]=p(d),d=q(d)}z(),B.caret(Math.max(l,a))}}function t(a){var b,c,d,e;for(b=a,c=p(a);n>b;b++)if(j[b]){if(d=q(b),e=C[b],C[b]=c,!(n>d&&j[d].test(e)))break;c=e}}function u(){var a=B.val(),b=B.caret();if(o&&o.length&&o.length>a.length){for(A(!0);b.begin>0&&!j[b.begin-1];)b.begin--;if(0===b.begin)for(;b.begin<l&&!j[b.begin];)b.begin++;B.caret(b.begin,b.begin)}else{for(A(!0);b.begin<n&&!j[b.begin];)b.begin++;B.caret(b.begin,b.begin)}h()}function v(){A(),B.val()!=E&&B.change()}function w(a){if(!B.prop("readonly")){var b,c,e,f=a.which||a.keyCode;o=B.val(),8===f||46===f||d&&127===f?(b=B.caret(),c=b.begin,e=b.end,e-c===0&&(c=46!==f?r(c):e=q(c-1),e=46===f?q(e):e),y(c,e),s(c,e-1),a.preventDefault()):13===f?v.call(this,a):27===f&&(B.val(E),B.caret(0,A()),a.preventDefault())}}function x(b){if(!B.prop("readonly")){var c,d,e,g=b.which||b.keyCode,i=B.caret();if(!(b.ctrlKey||b.altKey||b.metaKey||32>g)&&g&&13!==g){if(i.end-i.begin!==0&&(y(i.begin,i.end),s(i.begin,i.end-1)),c=q(i.begin-1),n>c&&(d=String.fromCharCode(g),j[c].test(d))){if(t(c),C[c]=d,z(),e=q(c),f){var k=function(){a.proxy(a.fn.caret,B,e)()};setTimeout(k,0)}else B.caret(e);i.begin<=m&&h()}b.preventDefault()}}}function y(a,b){var c;for(c=a;b>c&&n>c;c++)j[c]&&(C[c]=p(c))}function z(){B.val(C.join(""))}function A(a){var b,c,d,e=B.val(),f=-1;for(b=0,d=0;n>b;b++)if(j[b]){for(C[b]=p(b);d++<e.length;)if(c=e.charAt(d-1),j[b].test(c)){C[b]=c,f=b;break}if(d>e.length){y(b+1,n);break}}else C[b]===e.charAt(d)&&d++,k>b&&(f=b);return a?z():k>f+1?g.autoclear||C.join("")===D?(B.val()&&B.val(""),y(0,n)):z():(z(),B.val(B.val().substring(0,f+1))),k?b:l}var B=a(this),C=a.map(c.split(""),function(a,b){return"?"!=a?i[a]?p(b):a:void 0}),D=C.join(""),E=B.val();B.data(a.mask.dataName,function(){return a.map(C,function(a,b){return j[b]&&a!=p(b)?a:null}).join("")}),B.one("unmask",function(){B.off(".mask").removeData(a.mask.dataName)}).on("focus.mask",function(){if(!B.prop("readonly")){clearTimeout(b);var a;E=B.val(),a=A(),b=setTimeout(function(){B.get(0)===document.activeElement&&(z(),a==c.replace("?","").length?B.caret(0,a):B.caret(a))},10)}}).on("blur.mask",v).on("keydown.mask",w).on("keypress.mask",x).on("input.mask paste.mask",function(){B.prop("readonly")||setTimeout(function(){var a=A(!0);B.caret(a),h()},0)}),e&&f&&B.off("input.mask").on("input.mask",u),A()})}})});

/*!
 * jQuery UI 1.8.13
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI
 */
(function($,undefined){$.ui=$.ui||{};if($.ui.version){return}$.extend($.ui,{version:"1.8.13",keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91}});$.fn.extend({_focus:$.fn.focus,focus:function(delay,fn){return typeof delay==="number"?this.each(function(){var elem=this;setTimeout(function(){$(elem).focus();if(fn){fn.call(elem)}},delay)}):this._focus.apply(this,arguments)},scrollParent:function(){var scrollParent;if(($.browser.msie&&(/(static|relative)/).test(this.css('position')))||(/absolute/).test(this.css('position'))){scrollParent=this.parents().filter(function(){return(/(relative|absolute|fixed)/).test($.curCSS(this,'position',1))&&(/(auto|scroll)/).test($.curCSS(this,'overflow',1)+$.curCSS(this,'overflow-y',1)+$.curCSS(this,'overflow-x',1))}).eq(0)}else{scrollParent=this.parents().filter(function(){return(/(auto|scroll)/).test($.curCSS(this,'overflow',1)+$.curCSS(this,'overflow-y',1)+$.curCSS(this,'overflow-x',1))}).eq(0)}return(/fixed/).test(this.css('position'))||!scrollParent.length?$(document):scrollParent},zIndex:function(zIndex){if(zIndex!==undefined){return this.css("zIndex",zIndex)}if(this.length){var elem=$(this[0]),position,value;while(elem.length&&elem[0]!==document){position=elem.css("position");if(position==="absolute"||position==="relative"||position==="fixed"){value=parseInt(elem.css("zIndex"),10);if(!isNaN(value)&&value!==0){return value}}elem=elem.parent()}}return 0},disableSelection:function(){return this.bind(($.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(event){event.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}});$.each(["Width","Height"],function(i,name){var side=name==="Width"?["Left","Right"]:["Top","Bottom"],type=name.toLowerCase(),orig={innerWidth:$.fn.innerWidth,innerHeight:$.fn.innerHeight,outerWidth:$.fn.outerWidth,outerHeight:$.fn.outerHeight};function reduce(elem,size,border,margin){$.each(side,function(){size-=parseFloat($.curCSS(elem,"padding"+this,true))||0;if(border){size-=parseFloat($.curCSS(elem,"border"+this+"Width",true))||0}if(margin){size-=parseFloat($.curCSS(elem,"margin"+this,true))||0}});return size}$.fn["inner"+name]=function(size){if(size===undefined){return orig["inner"+name].call(this)}return this.each(function(){$(this).css(type,reduce(this,size)+"px")})};$.fn["outer"+name]=function(size,margin){if(typeof size!=="number"){return orig["outer"+name].call(this,size)}return this.each(function(){$(this).css(type,reduce(this,size,true,margin)+"px")})}});function focusable(element,isTabIndexNotNaN){var nodeName=element.nodeName.toLowerCase();if("area"===nodeName){var map=element.parentNode,mapName=map.name,img;if(!element.href||!mapName||map.nodeName.toLowerCase()!=="map"){return false}img=$("img[usemap=#"+mapName+"]")[0];return!!img&&visible(img)}return(/input|select|textarea|button|object/.test(nodeName)?!element.disabled:"a"==nodeName?element.href||isTabIndexNotNaN:isTabIndexNotNaN)&&visible(element)}function visible(element){return!$(element).parents().andSelf().filter(function(){return $.curCSS(this,"visibility")==="hidden"||$.expr.filters.hidden(this)}).length}$.extend($.expr[":"],{data:function(elem,i,match){return!!$.data(elem,match[3])},focusable:function(element){return focusable(element,!isNaN($.attr(element,"tabindex")))},tabbable:function(element){var tabIndex=$.attr(element,"tabindex"),isTabIndexNaN=isNaN(tabIndex);return(isTabIndexNaN||tabIndex>=0)&&focusable(element,!isTabIndexNaN)}});$(function(){var body=document.body,div=body.appendChild(div=document.createElement("div"));$.extend(div.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0});$.support.minHeight=div.offsetHeight===100;$.support.selectstart="onselectstart"in div;body.removeChild(div).style.display="none"});$.extend($.ui,{plugin:{add:function(module,option,set){var proto=$.ui[module].prototype;for(var i in set){proto.plugins[i]=proto.plugins[i]||[];proto.plugins[i].push([option,set[i]])}},call:function(instance,name,args){var set=instance.plugins[name];if(!set||!instance.element[0].parentNode){return}for(var i=0;i<set.length;i++){if(instance.options[set[i][0]]){set[i][1].apply(instance.element,args)}}}},contains:function(a,b){return document.compareDocumentPosition?a.compareDocumentPosition(b)&16:a!==b&&a.contains(b)},hasScroll:function(el,a){if($(el).css("overflow")==="hidden"){return false}var scroll=(a&&a==="left")?"scrollLeft":"scrollTop",has=false;if(el[scroll]>0){return true}el[scroll]=1;has=(el[scroll]>0);el[scroll]=0;return has},isOverAxis:function(x,reference,size){return(x>reference)&&(x<(reference+size))},isOver:function(y,x,top,left,height,width){return $.ui.isOverAxis(y,top,height)&&$.ui.isOverAxis(x,left,width)}})})(jQuery);(function($,undefined){if($.cleanData){var _cleanData=$.cleanData;$.cleanData=function(elems){for(var i=0,elem;(elem=elems[i])!=null;i++){$(elem).triggerHandler("remove")}_cleanData(elems)}}else{var _remove=$.fn.remove;$.fn.remove=function(selector,keepData){return this.each(function(){if(!keepData){if(!selector||$.filter(selector,[this]).length){$("*",this).add([this]).each(function(){$(this).triggerHandler("remove")})}}return _remove.call($(this),selector,keepData)})}}$.widget=function(name,base,prototype){var namespace=name.split(".")[0],fullName;name=name.split(".")[1];fullName=namespace+"-"+name;if(!prototype){prototype=base;base=$.Widget}$.expr[":"][fullName]=function(elem){return!!$.data(elem,name)};$[namespace]=$[namespace]||{};$[namespace][name]=function(options,element){if(arguments.length){this._createWidget(options,element)}};var basePrototype=new base();basePrototype.options=$.extend(true,{},basePrototype.options);$[namespace][name].prototype=$.extend(true,basePrototype,{namespace:namespace,widgetName:name,widgetEventPrefix:$[namespace][name].prototype.widgetEventPrefix||name,widgetBaseClass:fullName},prototype);$.widget.bridge(name,$[namespace][name])};$.widget.bridge=function(name,object){$.fn[name]=function(options){var isMethodCall=typeof options==="string",args=Array.prototype.slice.call(arguments,1),returnValue=this;options=!isMethodCall&&args.length?$.extend.apply(null,[true,options].concat(args)):options;if(isMethodCall&&options.charAt(0)==="_"){return returnValue}if(isMethodCall){this.each(function(){var instance=$.data(this,name),methodValue=instance&&$.isFunction(instance[options])?instance[options].apply(instance,args):instance;if(methodValue!==instance&&methodValue!==undefined){returnValue=methodValue;return false}})}else{this.each(function(){var instance=$.data(this,name);if(instance){instance.option(options||{})._init()}else{$.data(this,name,new object(options,this))}})}return returnValue}};$.Widget=function(options,element){if(arguments.length){this._createWidget(options,element)}};$.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",options:{disabled:false},_createWidget:function(options,element){$.data(element,this.widgetName,this);this.element=$(element);this.options=$.extend(true,{},this.options,this._getCreateOptions(),options);var self=this;this.element.bind("remove."+this.widgetName,function(){self.destroy()});this._create();this._trigger("create");this._init()},_getCreateOptions:function(){return $.metadata&&$.metadata.get(this.element[0])[this.widgetName]},_create:function(){},_init:function(){},destroy:function(){this.element.unbind("."+this.widgetName).removeData(this.widgetName);this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+"-disabled "+"ui-state-disabled")},widget:function(){return this.element},option:function(key,value){var options=key;if(arguments.length===0){return $.extend({},this.options)}if(typeof key==="string"){if(value===undefined){return this.options[key]}options={};options[key]=value}this._setOptions(options);return this},_setOptions:function(options){var self=this;$.each(options,function(key,value){self._setOption(key,value)});return this},_setOption:function(key,value){this.options[key]=value;if(key==="disabled"){this.widget()[value?"addClass":"removeClass"](this.widgetBaseClass+"-disabled"+" "+"ui-state-disabled").attr("aria-disabled",value)}return this},enable:function(){return this._setOption("disabled",false)},disable:function(){return this._setOption("disabled",true)},_trigger:function(type,event,data){var callback=this.options[type];event=$.Event(event);event.type=(type===this.widgetEventPrefix?type:this.widgetEventPrefix+type).toLowerCase();data=data||{};if(event.originalEvent){for(var i=$.event.props.length,prop;i;){prop=$.event.props[--i];event[prop]=event.originalEvent[prop]}}this.element.trigger(event,data);return!($.isFunction(callback)&&callback.call(this.element[0],event,data)===false||event.isDefaultPrevented())}}})(jQuery);(function($,undefined){var mouseHandled=false;$(document).mousedown(function(e){mouseHandled=false});$.widget("ui.mouse",{options:{cancel:':input,option',distance:1,delay:0},_mouseInit:function(){var self=this;this.element.bind('mousedown.'+this.widgetName,function(event){return self._mouseDown(event)}).bind('click.'+this.widgetName,function(event){if(true===$.data(event.target,self.widgetName+'.preventClickEvent')){$.removeData(event.target,self.widgetName+'.preventClickEvent');event.stopImmediatePropagation();return false}});this.started=false},_mouseDestroy:function(){this.element.unbind('.'+this.widgetName)},_mouseDown:function(event){if(mouseHandled){return};(this._mouseStarted&&this._mouseUp(event));this._mouseDownEvent=event;var self=this,btnIsLeft=(event.which==1),elIsCancel=(typeof this.options.cancel=="string"?$(event.target).parents().add(event.target).filter(this.options.cancel).length:false);if(!btnIsLeft||elIsCancel||!this._mouseCapture(event)){return true}this.mouseDelayMet=!this.options.delay;if(!this.mouseDelayMet){this._mouseDelayTimer=setTimeout(function(){self.mouseDelayMet=true},this.options.delay)}if(this._mouseDistanceMet(event)&&this._mouseDelayMet(event)){this._mouseStarted=(this._mouseStart(event)!==false);if(!this._mouseStarted){event.preventDefault();return true}}if(true===$.data(event.target,this.widgetName+'.preventClickEvent')){$.removeData(event.target,this.widgetName+'.preventClickEvent')}this._mouseMoveDelegate=function(event){return self._mouseMove(event)};this._mouseUpDelegate=function(event){return self._mouseUp(event)};$(document).bind('mousemove.'+this.widgetName,this._mouseMoveDelegate).bind('mouseup.'+this.widgetName,this._mouseUpDelegate);event.preventDefault();mouseHandled=true;return true},_mouseMove:function(event){if($.browser.msie&&!(document.documentMode>=9)&&!event.button){return this._mouseUp(event)}if(this._mouseStarted){this._mouseDrag(event);return event.preventDefault()}if(this._mouseDistanceMet(event)&&this._mouseDelayMet(event)){this._mouseStarted=(this._mouseStart(this._mouseDownEvent,event)!==false);(this._mouseStarted?this._mouseDrag(event):this._mouseUp(event))}return!this._mouseStarted},_mouseUp:function(event){$(document).unbind('mousemove.'+this.widgetName,this._mouseMoveDelegate).unbind('mouseup.'+this.widgetName,this._mouseUpDelegate);if(this._mouseStarted){this._mouseStarted=false;if(event.target==this._mouseDownEvent.target){$.data(event.target,this.widgetName+'.preventClickEvent',true)}this._mouseStop(event)}return false},_mouseDistanceMet:function(event){return(Math.max(Math.abs(this._mouseDownEvent.pageX-event.pageX),Math.abs(this._mouseDownEvent.pageY-event.pageY))>=this.options.distance)},_mouseDelayMet:function(event){return this.mouseDelayMet},_mouseStart:function(event){},_mouseDrag:function(event){},_mouseStop:function(event){},_mouseCapture:function(event){return true}})})(jQuery);(function($,undefined){var numPages=5;$.widget("ui.slider",$.ui.mouse,{widgetEventPrefix:"slide",options:{animate:false,distance:0,max:100,min:0,orientation:"horizontal",range:false,step:1,value:0,values:null},_create:function(){var self=this,o=this.options,existingHandles=this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),handle="<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",handleCount=(o.values&&o.values.length)||1,handles=[];this._keySliding=false;this._mouseSliding=false;this._animateOff=true;this._handleIndex=null;this._detectOrientation();this._mouseInit();this.element.addClass("ui-slider"+" ui-slider-"+this.orientation+" ui-widget"+" ui-widget-content"+" ui-corner-all"+(o.disabled?" ui-slider-disabled ui-disabled":""));this.range=$([]);if(o.range){if(o.range===true){if(!o.values){o.values=[this._valueMin(),this._valueMin()]}if(o.values.length&&o.values.length!==2){o.values=[o.values[0],o.values[0]]}}this.range=$("<div></div>").appendTo(this.element).addClass("ui-slider-range"+" ui-widget-header"+((o.range==="min"||o.range==="max")?" ui-slider-range-"+o.range:""))}for(var i=existingHandles.length;i<handleCount;i+=1){handles.push(handle)}this.handles=existingHandles.add($(handles.join("")).appendTo(self.element));this.handle=this.handles.eq(0);this.handles.add(this.range).filter("a").click(function(event){event.preventDefault()}).hover(function(){if(!o.disabled){$(this).addClass("ui-state-hover")}},function(){$(this).removeClass("ui-state-hover")}).focus(function(){if(!o.disabled){$(".ui-slider .ui-state-focus").removeClass("ui-state-focus");$(this).addClass("ui-state-focus")}else{$(this).blur()}}).blur(function(){$(this).removeClass("ui-state-focus")});this.handles.each(function(i){$(this).data("index.ui-slider-handle",i)});this.handles.keydown(function(event){var ret=true,index=$(this).data("index.ui-slider-handle"),allowed,curVal,newVal,step;if(self.options.disabled){return}switch(event.keyCode){case $.ui.keyCode.HOME:case $.ui.keyCode.END:case $.ui.keyCode.PAGE_UP:case $.ui.keyCode.PAGE_DOWN:case $.ui.keyCode.UP:case $.ui.keyCode.RIGHT:case $.ui.keyCode.DOWN:case $.ui.keyCode.LEFT:ret=false;if(!self._keySliding){self._keySliding=true;$(this).addClass("ui-state-active");allowed=self._start(event,index);if(allowed===false){return}}break}step=self.options.step;if(self.options.values&&self.options.values.length){curVal=newVal=self.values(index)}else{curVal=newVal=self.value()}switch(event.keyCode){case $.ui.keyCode.HOME:newVal=self._valueMin();break;case $.ui.keyCode.END:newVal=self._valueMax();break;case $.ui.keyCode.PAGE_UP:newVal=self._trimAlignValue(curVal+((self._valueMax()-self._valueMin())/numPages));break;case $.ui.keyCode.PAGE_DOWN:newVal=self._trimAlignValue(curVal-((self._valueMax()-self._valueMin())/numPages));break;case $.ui.keyCode.UP:case $.ui.keyCode.RIGHT:if(curVal===self._valueMax()){return}newVal=self._trimAlignValue(curVal+step);break;case $.ui.keyCode.DOWN:case $.ui.keyCode.LEFT:if(curVal===self._valueMin()){return}newVal=self._trimAlignValue(curVal-step);break}self._slide(event,index,newVal);return ret}).keyup(function(event){var index=$(this).data("index.ui-slider-handle");if(self._keySliding){self._keySliding=false;self._stop(event,index);self._change(event,index);$(this).removeClass("ui-state-active")}});this._refreshValue();this._animateOff=false},destroy:function(){this.handles.remove();this.range.remove();this.element.removeClass("ui-slider"+" ui-slider-horizontal"+" ui-slider-vertical"+" ui-slider-disabled"+" ui-widget"+" ui-widget-content"+" ui-corner-all").removeData("slider").unbind(".slider");this._mouseDestroy();return this},_mouseCapture:function(event){var o=this.options,position,normValue,distance,closestHandle,self,index,allowed,offset,mouseOverHandle;if(o.disabled){return false}this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()};this.elementOffset=this.element.offset();position={x:event.pageX,y:event.pageY};normValue=this._normValueFromMouse(position);distance=this._valueMax()-this._valueMin()+1;self=this;this.handles.each(function(i){var thisDistance=Math.abs(normValue-self.values(i));if(distance>thisDistance){distance=thisDistance;closestHandle=$(this);index=i}});if(o.range===true&&this.values(1)===o.min){index+=1;closestHandle=$(this.handles[index])}allowed=this._start(event,index);if(allowed===false){return false}this._mouseSliding=true;self._handleIndex=index;closestHandle.addClass("ui-state-active").focus();offset=closestHandle.offset();mouseOverHandle=!$(event.target).parents().andSelf().is(".ui-slider-handle");this._clickOffset=mouseOverHandle?{left:0,top:0}:{left:event.pageX-offset.left-(closestHandle.width()/2),top:event.pageY-offset.top-(closestHandle.height()/2)-(parseInt(closestHandle.css("borderTopWidth"),10)||0)-(parseInt(closestHandle.css("borderBottomWidth"),10)||0)+(parseInt(closestHandle.css("marginTop"),10)||0)};if(!this.handles.hasClass("ui-state-hover")){this._slide(event,index,normValue)}this._animateOff=true;return true},_mouseStart:function(event){return true},_mouseDrag:function(event){var position={x:event.pageX,y:event.pageY},normValue=this._normValueFromMouse(position);this._slide(event,this._handleIndex,normValue);return false},_mouseStop:function(event){this.handles.removeClass("ui-state-active");this._mouseSliding=false;this._stop(event,this._handleIndex);this._change(event,this._handleIndex);this._handleIndex=null;this._clickOffset=null;this._animateOff=false;return false},_detectOrientation:function(){this.orientation=(this.options.orientation==="vertical")?"vertical":"horizontal"},_normValueFromMouse:function(position){var pixelTotal,pixelMouse,percentMouse,valueTotal,valueMouse;if(this.orientation==="horizontal"){pixelTotal=this.elementSize.width;pixelMouse=position.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)}else{pixelTotal=this.elementSize.height;pixelMouse=position.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)}percentMouse=(pixelMouse/pixelTotal);if(percentMouse>1){percentMouse=1}if(percentMouse<0){percentMouse=0}if(this.orientation==="vertical"){percentMouse=1-percentMouse}valueTotal=this._valueMax()-this._valueMin();valueMouse=this._valueMin()+percentMouse*valueTotal;return this._trimAlignValue(valueMouse)},_start:function(event,index){var uiHash={handle:this.handles[index],value:this.value()};if(this.options.values&&this.options.values.length){uiHash.value=this.values(index);uiHash.values=this.values()}return this._trigger("start",event,uiHash)},_slide:function(event,index,newVal){var otherVal,newValues,allowed;if(this.options.values&&this.options.values.length){otherVal=this.values(index?0:1);if((this.options.values.length===2&&this.options.range===true)&&((index===0&&newVal>otherVal)||(index===1&&newVal<otherVal))){newVal=otherVal}if(newVal!==this.values(index)){newValues=this.values();newValues[index]=newVal;allowed=this._trigger("slide",event,{handle:this.handles[index],value:newVal,values:newValues});otherVal=this.values(index?0:1);if(allowed!==false){this.values(index,newVal,true)}}}else{if(newVal!==this.value()){allowed=this._trigger("slide",event,{handle:this.handles[index],value:newVal});if(allowed!==false){this.value(newVal)}}}},_stop:function(event,index){var uiHash={handle:this.handles[index],value:this.value()};if(this.options.values&&this.options.values.length){uiHash.value=this.values(index);uiHash.values=this.values()}this._trigger("stop",event,uiHash)},_change:function(event,index){if(!this._keySliding&&!this._mouseSliding){var uiHash={handle:this.handles[index],value:this.value()};if(this.options.values&&this.options.values.length){uiHash.value=this.values(index);uiHash.values=this.values()}this._trigger("change",event,uiHash)}},value:function(newValue){if(arguments.length){this.options.value=this._trimAlignValue(newValue);this._refreshValue();this._change(null,0);return}return this._value()},values:function(index,newValue){var vals,newValues,i;if(arguments.length>1){this.options.values[index]=this._trimAlignValue(newValue);this._refreshValue();this._change(null,index);return}if(arguments.length){if($.isArray(arguments[0])){vals=this.options.values;newValues=arguments[0];for(i=0;i<vals.length;i+=1){vals[i]=this._trimAlignValue(newValues[i]);this._change(null,i)}this._refreshValue()}else{if(this.options.values&&this.options.values.length){return this._values(index)}else{return this.value()}}}else{return this._values()}},_setOption:function(key,value){var i,valsLength=0;if($.isArray(this.options.values)){valsLength=this.options.values.length}$.Widget.prototype._setOption.apply(this,arguments);switch(key){case"disabled":if(value){this.handles.filter(".ui-state-focus").blur();this.handles.removeClass("ui-state-hover");this.handles.attr("disabled","disabled");this.element.addClass("ui-disabled")}else{this.handles.removeAttr("disabled");this.element.removeClass("ui-disabled")}break;case"orientation":this._detectOrientation();this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation);this._refreshValue();break;case"value":this._animateOff=true;this._refreshValue();this._change(null,0);this._animateOff=false;break;case"values":this._animateOff=true;this._refreshValue();for(i=0;i<valsLength;i+=1){this._change(null,i)}this._animateOff=false;break}},_value:function(){var val=this.options.value;val=this._trimAlignValue(val);return val},_values:function(index){var val,vals,i;if(arguments.length){val=this.options.values[index];val=this._trimAlignValue(val);return val}else{vals=this.options.values.slice();for(i=0;i<vals.length;i+=1){vals[i]=this._trimAlignValue(vals[i])}return vals}},_trimAlignValue:function(val){if(val<=this._valueMin()){return this._valueMin()}if(val>=this._valueMax()){return this._valueMax()}var step=(this.options.step>0)?this.options.step:1,valModStep=(val-this._valueMin())%step;alignValue=val-valModStep;if(Math.abs(valModStep)*2>=step){alignValue+=(valModStep>0)?step:(-step)}return parseFloat(alignValue.toFixed(5))},_valueMin:function(){return this.options.min},_valueMax:function(){return this.options.max},_refreshValue:function(){var oRange=this.options.range,o=this.options,self=this,animate=(!this._animateOff)?o.animate:false,valPercent,_set={},lastValPercent,value,valueMin,valueMax;if(this.options.values&&this.options.values.length){this.handles.each(function(i,j){valPercent=(self.values(i)-self._valueMin())/(self._valueMax()-self._valueMin())*100;_set[self.orientation==="horizontal"?"left":"bottom"]=valPercent+"%";$(this).stop(1,1)[animate?"animate":"css"](_set,o.animate);if(self.options.range===true){if(self.orientation==="horizontal"){if(i===0){self.range.stop(1,1)[animate?"animate":"css"]({left:valPercent+"%"},o.animate)}if(i===1){self.range[animate?"animate":"css"]({width:(valPercent-lastValPercent)+"%"},{queue:false,duration:o.animate})}}else{if(i===0){self.range.stop(1,1)[animate?"animate":"css"]({bottom:(valPercent)+"%"},o.animate)}if(i===1){self.range[animate?"animate":"css"]({height:(valPercent-lastValPercent)+"%"},{queue:false,duration:o.animate})}}}lastValPercent=valPercent})}else{value=this.value();valueMin=this._valueMin();valueMax=this._valueMax();valPercent=(valueMax!==valueMin)?(value-valueMin)/(valueMax-valueMin)*100:0;_set[self.orientation==="horizontal"?"left":"bottom"]=valPercent+"%";this.handle.stop(1,1)[animate?"animate":"css"](_set,o.animate);if(oRange==="min"&&this.orientation==="horizontal"){this.range.stop(1,1)[animate?"animate":"css"]({width:valPercent+"%"},o.animate)}if(oRange==="max"&&this.orientation==="horizontal"){this.range[animate?"animate":"css"]({width:(100-valPercent)+"%"},{queue:false,duration:o.animate})}if(oRange==="min"&&this.orientation==="vertical"){this.range.stop(1,1)[animate?"animate":"css"]({height:valPercent+"%"},o.animate)}if(oRange==="max"&&this.orientation==="vertical"){this.range[animate?"animate":"css"]({height:(100-valPercent)+"%"},{queue:false,duration:o.animate})}}}});$.extend($.ui.slider,{version:"1.8.13"})}(jQuery));
!function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){function d(a){this.message=a}function e(a){var b=String(a).replace(/=+$/,"");if(b.length%4==1)throw new d("'atob' failed: The string to be decoded is not correctly encoded.");for(var c,e,g=0,h=0,i="";e=b.charAt(h++);~e&&(c=g%4?64*c+e:e,g++%4)?i+=String.fromCharCode(255&c>>(-2*g&6)):0)e=f.indexOf(e);return i}var f="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";d.prototype=new Error,d.prototype.name="InvalidCharacterError",b.exports="undefined"!=typeof window&&window.atob&&window.atob.bind(window)||e},{}],2:[function(a,b,c){function d(a){return decodeURIComponent(e(a).replace(/(.)/g,function(a,b){var c=b.charCodeAt(0).toString(16).toUpperCase();return c.length<2&&(c="0"+c),"%"+c}))}var e=a("./atob");b.exports=function(a){var b=a.replace(/-/g,"+").replace(/_/g,"/");switch(b.length%4){case 0:break;case 2:b+="==";break;case 3:b+="=";break;default:throw"Illegal base64url string!"}try{return d(b)}catch(c){return e(b)}}},{"./atob":1}],3:[function(a,b,c){"use strict";function d(a){this.message=a}var e=a("./base64_url_decode");d.prototype=new Error,d.prototype.name="InvalidTokenError",b.exports=function(a,b){if("string"!=typeof a)throw new d("Invalid token specified");b=b||{};var c=b.header===!0?0:1;try{return JSON.parse(e(a.split(".")[c]))}catch(f){throw new d("Invalid token specified: "+f.message)}},b.exports.InvalidTokenError=d},{"./base64_url_decode":2}],4:[function(a,b,c){(function(b){var c=a("./lib/index");"function"==typeof b.window.define&&b.window.define.amd?b.window.define("jwt_decode",function(){return c}):b.window&&(b.window.jwt_decode=c)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./lib/index":3}]},{},[4]);
// $("span.exit").click(function() {
function menuFunction(){
	
 if (triger==1){
 	triger=0;
 	console.log(777);
 	 $("header .container.headerTop").css("display","none");
 //$("header .tovaryButtonBlock").css("display","none");
 // $("header .poslugiButton").css("display","none");
 // $("header .logo").css("display","none");
  //$("header .access").css("display","none");
 // $("header .phoneNumber").css("display","none");
  $("header .mobileMenu").css("display","none");
 }else{
 $("header .container.headerTop").css("display","inline-block");
// $("header .tovaryButtonBlock").css("display","inline-block");
 // $("header .poslugiButton").css("display","inline-block");
 // $("header .logo").css("display","inline-block");
 // $("header .access").css("display","inline-block");
 // $("header .phoneNumber").css("display","inline-block");
  $("header .mobileMenu").css("display","inline-block");

 	triger=1;
 	console.log(888);





 }
};
var triger;
$(".menuMob").click(function() {
menuFunction();
});




// });
console.log("ok");

var voting= function(elem)	{
	      var stars=	$('.votingBox .votingBox__voting');
		  	var starsG=	$('.votingBox .votingBox__votingG');
		switch (elem.id) {
		  case 'p5':
		  	$(stars[4]).css("background","orange");
		     $(starsG[4]).css("background","orange"); 
		  case 'p4':

		 	 $(stars[3]).css("background","orange");
		 	 $(starsG[3]).css("background","orange");  
		  case 'p3':

		    $(stars[2]).css("background","orange"); 
		     $(starsG[2]).css("background","orange"); 
		  case 'p2':

		    $(stars[1]).css("background","orange");
		     $(starsG[1]).css("background","orange");  

		  case 'p1': 

 			$(stars[0]).css("background","orange"); 
 			 $(starsG[0]).css("background","orange"); 
		  break;
		  default:
		  console.log("eror voting");
		
		    break;
		}
}


   $('.votingBox__voting').mouseenter( function() {
   		voting(this);
    });
$('.votingBox__votingG').mouseenter( function() {
   		voting(this);
    });

  
 $('.votingBox__voting').mouseleave( function() {

$('.votingBox__voting').css("background","none");
$('.votingBox__votingG').css("background","none");
	 });


  $('.votingBox__votingG').mouseleave( function() {

$('.votingBox__votingG').css("background","none");
$('.votingBox__voting').css("background","none");
	 });


$('.productView__mainPhoto img').imageLens({ lensSize: 200 });

$('.productPhotoGalery__preview').click(function() {
$('.productPhotoGalery__preview').removeClass('active');
$(this).addClass('active');
src= $('.productPhotoGalery .active img').attr( "src" );
console.log(src);
$('.productView__mainPhoto').empty();
$('.productView__mainPhoto').append('<img id="img" src='+src+' alt="">');
$('.productView__mainPhoto img').imageLens({ lensSize: 200 });
});

//timer


   timerH= $('#timerH').text();
 timerM= $('#timerM').text();
 timerS= $('#timerS').text();
timerH=23-timerH;
timerM=59-timerM;
timerS=59-timerS;
$('#timerH').text(timerH);
$('#timerM').text(timerM);
$('#timerS').text(timerS);

function timerAkcia() {

timerS--;
if (timerS==0){
	
	
	$('#timerH').text(timerH);
	$('#timerM').text(timerM);
	$('#timerS').text(timerS);
	timerM--;
	timerS=60;
	if(timerM<0){
		timerM==59;
		timerH--;
	}
}
else{
$('#timerH').text(timerH);
$('#timerM').text(timerM);
$('#timerS').text(timerS);
}

}

setInterval(timerAkcia, 1000);

$('.moreCharacteristic__Button').click(function(){
	var element=$(this).parent().parent();
	if ($(element).hasClass('characteristicBox_open')){
	$(element).removeClass('characteristicBox_open');
	$(element).css("max-height","200px");
	//$(this).parent().parent().css("height","200px");
	$(this).html('Больше⯆');

	}else{
	$(element).addClass('characteristicBox_open');
	$(element).css("max-height","1000px");
	//$(this).parent().parent().css("height","auto");
	$(this).html('Менше⯅');
	}

});
var characteristicBox=$('.characteristicBox');
for (var i=0; i<characteristicBox.length;  i++ ) {
	if($(characteristicBox[i]).height()<150){
		$(characteristicBox[i]).find('.moreCharacteristic__Button').css('display','none');
	//	$((characteristicBox[i]) + ' .moreCharacteristic__Button ').css("display","none");	
	}

}

$('#shareButton').click(function(){
	$('.productView__shareBox').addClass('open');
	$('#shareButton').addClass('active');

});

$('#addToCart').click(function(){
$('#addToCart').attr('id', 'toOrder');
$('#toOrder').text('Оформити замовлення');

});


$('#mobileBottomBlockOptions').click(function(){
$('.mobileBottomBlock').css('bottom','-48px');
$('.mobileBottomBlockBig').css('bottom','0');
	});

$('.mobileBottomBlock__close').click(function(){
$('.mobileBottomBlockBig').css('bottom','-128px');
$('.mobileBottomBlock ').css('bottom','0');
	});

$('#mainCha-cs').click(function(){
	$('.productShortCha-cs__Main').removeClass('active');
	$('#mainCha-cs').addClass('active');
	$('.productMainCha-cs').removeClass('active');
	$('#mainCha-csBox').addClass('active');
});

$('#allCha-cs').click(function(){
$('.productShortCha-cs__Main').removeClass('active');
	$('#allCha-cs').addClass('active');
	$('.productMainCha-cs').removeClass('active');
	$('#allCha-csBox').addClass('active');
});

$('#prodavec').click(function(){

$('.productSellersBox__Sellers').removeClass('active');
	$('#prodavec').addClass('active');
	$('.mainSellers').removeClass('active');
	$('#prodavecBox').addClass('active');
});

$('#OtherProdavec').click(function(){
	$('.productSellersBox__Sellers').removeClass('active');
	$('#OtherProdavec').addClass('active');
	$('.mainSellers').removeClass('active');
	$('#OtherProdavecBox').addClass('active');

});

$('#OnMap').click(function(){
	$('.productSellersBox__Sellers').removeClass('active');
	$('#OnMap').addClass('active');
	$('.mainSellers').removeClass('active');
	$('#OnMapBox').addClass('active');

});
// var initialPoint;
// var finalPoint;
// sliderBlock.addEventListener('touchstart', function(event)   {

// //event.preventDefault();
// //event.stopPropagation();
// initialPoint=event.changedTouches[0];
// }, false);
// sliderBlock.addEventListener('touchend', function(event) {
// event.preventDefault();
// event.stopPropagation();
// finalPoint=event.changedTouches[0];
// var xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
// var yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
// if (xAbs > 20 || yAbs > 20) {
// if (xAbs > yAbs) {
// if (finalPoint.pageX < initialPoint.pageX){
// 	console.log("vlevo"+xAbs);
	 
	
	 
// 	}
// else{
// /*СВАЙП ВПРАВО*/

// console.log("vpravo"+xAbs);

// }
// }
// else {
// if (finalPoint.pageY < initialPoint.pageY){
// /*СВАЙП ВВЕРХ*/
// console.log("up");
// }
// else{
// 	console.log("down");
// /*СВАЙП ВНИЗ*/}
// }
// }
// }, false);





// $("#scrollPage2").on('touchstart', function() {
//    $("#main").css("transform","translate(-100%)");
// 	$("#page2").css("transform","translate(0%)");

// 	$("#toNext").removeClass("littleBtn")
// 	$("#toNext").addClass("bigBtn")
// 	$("#toMain").removeClass("bigBtn")
// 	$("#toMain").addClass("littleBtn")

// });

// $("#scrollMain").on('touchstart', function() {
// 	$("#main").css("transform","translate(0)");
// 	$("#page2").css("transform","translate(100%)");


// 		$("#toNext").removeClass("")
// 	$("#toNext").addClass("littleBtn")
// 	$("#toMain").removeClass("littleBtn")
// 	$("#toMain").addClass("bigBtn")

// });


// $("#scrollPage2").click(function(){
// $("#main").css("transform","translate(-100%)")
// 	$("#page2").css("transform","translate(0%)")

// 		$("#toNext").removeClass("littleBtn")
// 	$("#toNext").addClass("bigBtn")
// 	$("#toMain").removeClass("bigBtn")
// 	$("#toMain").addClass("littleBtn")
// })

// $("#scrollMain").click(function(){
// $("#main").css("transform","translate(0)");
// 	$("#page2").css("transform","translate(100%)");
// 	$("#toNext").removeClass("")
// 	$("#toNext").addClass("littleBtn")
// 	$("#toMain").removeClass("littleBtn")
// 	$("#toMain").addClass("bigBtn")
// })



// $("#toNext").click(function(){
// $("#main").css("transform","translate(-100%)")
// 	$("#page2").css("transform","translate(0%)")

// 		$("#toNext").removeClass("littleBtn")
// 	$("#toNext").addClass("bigBtn")
// 	$("#toMain").removeClass("bigBtn")
// 	$("#toMain").addClass("littleBtn")
// })

// $("#toMain").click(function(){
// $("#main").css("transform","translate(0)");
// 	$("#page2").css("transform","translate(100%)");
// 	$("#toNext").removeClass("")
// 	$("#toNext").addClass("littleBtn")
// 	$("#toMain").removeClass("littleBtn")
// 	$("#toMain").addClass("bigBtn")
// })

// $("#toNext").on('touchstart', function() {
//    $("#main").css("transform","translate(-100%)");
// 	$("#page2").css("transform","translate(0%)");

// 	$("#toNext").removeClass("littleBtn")
// 	$("#toNext").addClass("bigBtn")
// 	$("#toMain").removeClass("bigBtn")
// 	$("#toMain").addClass("littleBtn")

// });

// $("#toMain").on('touchstart', function() {
// 	$("#main").css("transform","translate(0)");
// 	$("#page2").css("transform","translate(100%)");


// 		$("#toNext").removeClass("")
// 	$("#toNext").addClass("littleBtn")
// 	$("#toMain").removeClass("littleBtn")
// 	$("#toMain").addClass("bigBtn")

// });

// $("a").on('touchstart', function() {
// 	location.href = $(this).attr('href');
// });
function startSearch(name, page){
 $.ajax({
             url:'https://web-store-sample-vs.herokuapp.com/web-store/catalog/search?name='+name+'&page='+page+'&size=12'
             , type:'GET',
          contentType:"application/json",
              success: function(res) {
              	if (res.content.length==0){
         				console.log("Не знайдено")
         				$(".content .container .row .search").append("<h3>Нічого не знайдено</h3>")
         			}
         		
         	

				for(i=0;i<res.content.length;i++){
//test

               $("#Пошук .content .container .row .search").append("<div class='col-md-4 col-lg-3 col-sm-6 catelogElemet'> <div class='product' id="+res.content[i].id+"></div></div>");

               $("#Товар .content .container .row .search").append("<div class='col-md-4 col-lg-4 col-sm-6  catelogElemet'> <div class='product' id="+res.content[i].id+"></div></div>");
               
                $(".content .container .row .search #"+res.content[i].id+" ").prepend(" <h5>"+res.content[i].name+"</h5>");

                //картинка
                $(".content .container .row .search #"+res.content[i].id+" ").append(" <img src='img/test.jpg' >");
                //картинка

                $(".content .container .row .search #"+res.content[i].id+" ").append(" <p class='manufacturer'>Производитель:"+res.content[i].product.manufacturer+"</p>");
                
                $(".content .container .row .search #"+res.content[i].id+" ").append(" <p class='price'>Цена:"+res.content[i].product.priceWithVAT+"</p>");

                $(".content .container .row .search #"+res.content[i].id+" ").append(" <button onclick='addProduct("+res.content[i].product.id+")' id="+res.content[i].product.id+">Добавить в корзину</button>");
              
                                         }
                                            optionCatalog=localStorage.getItem("optionCatalogList");
                                            if (optionCatalog=="true"){
                                              setList();  
                                              console.log("ser")

                                            }else{
                                              setNotList();
                                              console.log("not ser")

                                            }


					if (res.content.length==12){
         				console.log("Дуже багато")
         				$(".content .container .row .search").append("<button id='searchMore'>Показати ще результати</button>")
         			}
         				$(".content .container .row .search #searchMore").click(function() {
         					$(".content .container .row .search #searchMore").remove();
         					page++;
         						startSearch(name, page);
         				});


               },

         error: function (jqXHR, exception){
         
         console.log("error");  
            //   
        return false;  
           }

        });

  }

function search()
{
var name = $(".search #name").text().replace(/\s+/g,'');
name =name.replace(/\s+/g,'&nbsp');
$(".search #name").remove();
console.log(name);
$("#Пошук .search").append("<h3>результат пошуку <span>"+ name+"</span>:</h3>")
startSearch(name, 0)
			//var name=$(".search #name");

        
         };

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