

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





 function getPodPodcategoria(idCategoria,idPodCategoria, node){
     $.ajax({
                url:'https://web-store-sample-vs.herokuapp.com/web-store/catalog/'+node+'/sub-categories'
                , type:'GET',
      
              contentType:"application/json",
                 success: function(res) {
                   for(i=0;i<res.length;i++){
                  
            if(res[i].hasLinkedProducts){
              $(".tovaryMenu .catalog .podcatalog."+idCategoria+" .podpodcatalog."+idPodCategoria+" ").prepend("<a href=catalog.php?nodeId="+res[i].nodeId+"&product=true><h6 id="+res[i].nodeId+">"+res[i].name+"</h6></a>");
                 

              }else{
                $(".tovaryMenu .catalog .podcatalog."+idCategoria+" .podpodcatalog."+idPodCategoria+" ").prepend("<a href=catalog.php?nodeId="+res[i].nodeId+"&product=false><h6 id="+res[i].nodeId+">"+res[i].name+"</h6></a>");
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
                url:'https://web-store-sample-vs.herokuapp.com/web-store/catalog/'+node+'/sub-categories'
                , type:'GET',
              contentType:"application/json",
                 success: function(res) {

                   for(i=0;i<res.length;i++){
                   
                  
                getPodPodcategoria(idCategoria,i, res[i].nodeId);      
            if(res[i].hasLinkedProducts){
               $(".tovaryMenu .catalog .podcatalog."+idCategoria+"").prepend("<div class='podcategoria'><a href=catalog.php?nodeId="+res[i].nodeId+"&product=true><h5 id="+i+">"+res[i].name+"</h5></a><div class='podpodcatalog "+i+"'></div></div>");

              }else{
              $(".tovaryMenu .catalog .podcatalog."+idCategoria+"").prepend("<div class='podcategoria'><a href=catalog.php?nodeId="+res[i].nodeId+"&product=false><h5 id="+i+">"+res[i].name+"</h5></a><div class='podpodcatalog "+i+"'></div></div>");

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
               $(".tovaryMenu .catalog").prepend("<div class='categoria id"+i+"'><a href=catalog.php?nodeId="+res[i].nodeId+"&product=false><h4>"+res[i].name+"</h4></a><div class='podcatalog "+i+"'></div></div>");
               $(".tovaryMenu .catalogMenu").prepend("<a href=catalog.php?nodeId="+res[i].nodeId+"&product=false><h5 id="+i+">"+res[i].name+"</h5></a>");
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



 function getPodPodcategoria(idCategoria,idPodCategoria, node){
     $.ajax({
                url:'https://web-store-sample-vs.herokuapp.com/web-store/catalog/'+node+'/sub-categories'
                , type:'GET',
      
              contentType:"application/json",
                 success: function(res) {
                   for(i=0;i<res.length;i++){
                  
            if(res[i].hasLinkedProducts){
                    $(".topBlock .catalogBlock .podcatalog."+idCategoria+" .podpodcatalog."+idPodCategoria+" ").prepend("<a href=catalog.php?nodeId="+res[i].nodeId+"&product=true><h6 id="+res[i].nodeId+">"+res[i].name+"</h6></a>");
                  }else{
                     $(".topBlock .catalogBlock .podcatalog."+idCategoria+" .podpodcatalog."+idPodCategoria+" ").prepend("<a href=catalog.php?nodeId="+res[i].nodeId+"&product=false><h6 id="+res[i].nodeId+">"+res[i].name+"</h6></a>");
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
                url:'https://web-store-sample-vs.herokuapp.com/web-store/catalog/'+node+'/sub-categories'
                , type:'GET',
              contentType:"application/json",
                 success: function(res) {

                   for(i=0;i<res.length;i++){
                   
                  
                
            if(res[i].hasLinkedProducts){
                 $(".topBlock .catalogBlock .podcatalog."+idCategoria+"").prepend("<div class='podcategoria'><a href=catalog.php?nodeId="+res[i].nodeId+"&product=true><h5 id="+i+">"+res[i].name+"</h5></a><div class='podpodcatalog "+i+"'></div></div>");

              }else{
                $(".topBlock .catalogBlock .podcatalog."+idCategoria+"").prepend("<div class='podcategoria'><a href=catalog.php?nodeId="+res[i].nodeId+"&product=false><h5 id="+i+">"+res[i].name+"</h5></a><div class='podpodcatalog "+i+"'></div></div>");
                  
              }
              getPodPodcategoria(idCategoria,i, res[i].nodeId);      
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
               $(".topBlock .catalogBlock").prepend("<div class='categoria id"+i+"'><a href=catalog.php?nodeId="+res[i].nodeId+"&product=false><h4>"+res[i].name+"</h4></a><div class='podcatalog "+i+"'></div></div>");
               $(".topBlock  .catalogMenu .menuBlock").prepend("<a href=catalog.php?nodeId="+res[i].nodeId+"&product=false><h5 id="+i+">"+res[i].name+"</h5></a>");
               getPodcategoria(i, res[i].nodeId);
               preloaderOff();
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


 // $(".menuBlock li").click(function() {
 //                console.log("h5");
 //                console.log("id="+this.id);
 //          $.ajax({
 //             url:'https://web-store-sample-vs.herokuapp.com/web-store/catalog/'+this.id
 //             , type:'GET',
 //           contentType:"application/json",
 //             success: function(res) {

 //               $(".content .container .row").empty();

 //                for(i=0;i<res.length;i++){

 //                $(".content .container .row").prepend("<div class='productBlock'> <div class='product' id="+res[i].name+">"+res[i].name+"</div></div>");
       
 //                                         }

 //                                       }

 //                });

  


 //                 });

        









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

//catalog.content[i].catalogCategory.parentNodes[j].name

function breadcrumbsRenderForProducts(catalog){

    var nodes = [];
    console.log('catalog');
    
   for (var i=0 ; i<catalog.content.length; i++) {
 nextInput:
     for (var j=0 ; j<catalog.content[i].catalogCategory.parentNodes.length; j++){

                   var str = catalog.content[i].catalogCategory.parentNodes[j].nodeId;
                  
                   for (var q = 0; q < nodes.length; q++){
                      if(nodes[q]==str){
                     continue nextInput;
                      console.log(str);
                      console.log(nodes[q]);
                     }
                   }
              nodes.push(catalog.content[i].catalogCategory.parentNodes[j].nodeId);

             if (j==0){
                  $('.filter .categoria ').append("<a href=catalog.php?nodeId=all&product=false><label for='subCategory1'>"+ catalog.content[i].catalogCategory.parentNodes[j].name+" <span>x</span></label></a>");
              } else{

         $('.filter .categoria ').append("<a href=catalog.php?nodeId="+catalog.content[i].catalogCategory.parentNodes[j-1].nodeId+"&product=false><label for='subCategory1'>"+ catalog.content[i].catalogCategory.parentNodes[j].name+" <span>x</span></label></a>");
         }

        if (j==catalog.content[i].catalogCategory.parentNodes.length-1){
           $('.zagolovokFilter').empty();
           $('.zagolovokFilter').text(catalog.content[i].catalogCategory.name);
           $('.filter .categoria ').append("<a href=catalog.php?nodeId="+catalog.content[i].catalogCategory.nodeId+"&product=false><label for='subCategory1'>"+ catalog.content[i].catalogCategory.name+" <span>x</span></label></a>"); 

         }

     }
    
   }



}



function breadcrumbsRender(catalog, products){
  if (catalog.length==0){
      breadcrumbsRenderForProducts(products);
  }else{

    var nodes = [];
  for (var i=0 ; i<catalog.length; i++) {
nextInput:
    for (var j=0 ; j<catalog[i].parentNodes.length; j++){

                  var str = catalog[i].parentNodes[j].nodeId;
                  
                  for (var q = 0; q < nodes.length; q++){
                     if(nodes[q]==str){
                    continue nextInput;
                   }
                  }
             nodes.push(catalog[i].parentNodes[j].nodeId);

             if (j==0){
                 $('.filter .categoria ').append("<a href=catalog.php?nodeId=all&product=false><label for='subCategory1'>"+ catalog[i].parentNodes[j].name+" <span>x</span></label></a>");
             } else{

        $('.filter .categoria ').append("<a href=catalog.php?nodeId="+catalog[i].parentNodes[j-1].nodeId+"&product=false><label for='subCategory1'>"+ catalog[i].parentNodes[j].name+" <span>x</span></label></a>");
        }

        if (j==catalog[i].parentNodes.length-1){
          $('.zagolovokFilter').empty();
          $('.zagolovokFilter').text(catalog[i].parentNodes[j].name);
        }

    }
    
  }
}

}

  function renderProducts(){


    var catalog= $('.productsList').text();
    if(!catalog){
      return 0;
    }
    catalog=catalog.slice(0, -1);

    $('.productsList').empty();
     catalog= JSON.parse(catalog);
    
     


      for (var i=0 ; i<catalog.length; i++) {

         
        // breadcrumbs= catalog[i].path;
      //console.log(catalog[i].parentNodes[0].name)
       if(catalog[i].hasLinkedProducts){


        

        $(' .productsList').append("<a class='categoriaBlock' href=catalog.php?nodeId="+catalog[i].nodeId+"&product=ture><img class='img-responsive' src='img/test.jpg'><h4>"+catalog[i].name+"</h4></a>");
      }else
      {
       $(' .productsList').append("<a class='categoriaBlock' href=catalog.php?nodeId="+catalog[i].nodeId+"&product=false><img class='img-responsive' src='img/test.jpg'><h4>"+catalog[i].name+"</h4></a>");
      }

   // console.log(products[1].nodeId);
  } 
  if (catalog.length<1){
  $('.productsList').css('display','none');
  }

   var products= $('.products').text();
   

    products=products.slice(0, -1);
    $('.products').empty();
     products= JSON.parse(products);
     console.log(products.content);
      if(!products.content){
      return 0;
    }else{

        for (var i=0 ; i<products.content.length; i++) {

          //  alert( products.length);
           $('.products').append("<div class='catelogElemet'><div class='product' id="+products.content[i].id+"><img src='img/test.jpg'><h5>"+products.content[i].name+"</h5><p class='price'>Ціна ="+products.content[i].priceWithVAT+ "</p></div></div>");
            $('.products  #'+products.content[i].id).append(" <button onclick='addProduct("+products.content[i].id+")' id="+products.content[i].id+">Добавить в корзину</button>");
        $('.products #'+products.content[i].id).append(" <a href=product.php?productId="+products.content[i].id+">Детальніше</a>");
 }
     if (products.content.length>0){
      // $('.products').css('display','block');   
      }
    }
    //  console.log(products.length);
     // console.log(catalog.length);
      // if (products.length==0 && catalog.length==0){
      //     alert("ffff");
      //   $('.productsList').css('display','block');
      //   $(' .productsList').append("<h5>В цій категорії товарів немає</h5>");
      //  }
   // return 1;
  

//$('.breadcrumbs .thisPage').empty();
//$('.breadcrumbs .thisPage').append(breadcrumbs);
   breadcrumbsRender(catalog, products);


  $('.products').removeClass('load'); 
  $('.productsList').removeClass('load');
  }  
 
renderProducts();
         var linkstoProducts=$('.productsList a');
         var linkstoCatalog=$('.products a');
        if((linkstoProducts.length+linkstoCatalog.length)>0){
        }else{
           $('.productsList').css('display','block');
           $(' .testList .productsList').append("<h5>В цій категорії товарів немає</h5>");
        }