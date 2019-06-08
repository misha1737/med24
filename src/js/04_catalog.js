

function refreshToken(id){
                                                 
                                                if ($('body').hasClass('autoron')){
                                                  return 0
                                                }
                                                 formData ={
                                                  "refreshToken" :  localStorage.getItem("refresh_token")
                                                
                                                }
                                                formData=JSON.stringify(formData);

                                               // formData=JSON.parse(formData);
                                                 // console.log(formData);
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

                $(".content .container .row #"+res[i].id+" ").append(" <button onclick='modalAddProduct("+res[i].product.id+")' id="+res[i].product.id+">Добавить в корзину</button>");
              
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
    $('#breadcrumbs').empty();
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

             

         $('#breadcrumbs ').append("<a href=catalog.php?nodeId="+catalog.content[i].catalogCategory.parentNodes[j].nodeId+"&product=false><label for='subCategory1'>"+ catalog.content[i].catalogCategory.parentNodes[j].name+" </label></a><span> > </span>");
         

        if (j==catalog.content[i].catalogCategory.parentNodes.length-1){
           $('.zagolovokFilter').empty();
           $('.zagolovokFilter').text(catalog.content[i].catalogCategory.name);
           $('#breadcrumbs ').append("<a href=catalog.php?nodeId="+catalog.content[i].catalogCategory.parentNodes[j].nodeId+"&product=false><label for='subCategory1'>"+ catalog.content[i].catalogCategory.name+" </label></a><span></span>"); 

         }

     }
    
   }



}



function breadcrumbsRender(catalog, products){
  if (catalog.length==0){
      breadcrumbsRenderForProducts(products);
  }else{


      $('#breadcrumbs').empty();


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

             

        $('#breadcrumbs').append("<a href=catalog.php?nodeId="+catalog[i].parentNodes[j].nodeId+"&product=false><label for='subCategory1'>"+ catalog[i].parentNodes[j].name+" </label></a><span> > </span>");
        

        if (j==catalog[i].parentNodes.length-1){
          $('.zagolovokFilter').empty();
          $('.zagolovokFilter').text(catalog[i].parentNodes[j].name);
        }

    }
    
  }
}

}


function getProducts(node, page=0, catalog,  sortParam='name'){
console.log('this funk');
                //console.log(res);
               console.log(node);


  $.ajax({

             url:'https://web-store-sample-vs.herokuapp.com/web-store/catalog/'+node+'/products?page='+page+'&size=12'+'&sort='+sortParam,
          contentType:"application/json",
              success: function(res) {
              
      if(!res.content){
          
      return 0;
    }else{

        for (var i=0 ; i<res.content.length; i++) {

          //  alert( products.length);
           $('.products').append("<div class='catelogElemet'><div class='product' id="+res.content[i].id+"><img src='img/test.jpg'><a class='name' href=product.php?productId="+res.content[i].id+">"+res.content[i].name+"</a><p class='price'>Ціна ="+res.content[i].priceWithVAT+ "</p></div></div>");
            $('.products  #'+res.content[i].id).append(" <button onclick='modalAddProduct("+res.content[i].id+")' id="+res.content[i].id+">Добавить в корзину</button>");
        $('.products #'+res.content[i].id).append(" <a class='info' href=product.php?productId="+res.content[i].id+">Детальніше</a>");
 }

     if (res.content.length>0){
      $('.filterOption').css('display','block'); 
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
  
      breadcrumbsRender(catalog, res);
  optionCatalog=localStorage.getItem("optionCatalogList");
                                            // if (optionCatalog=="true"){
                                            //   setList();  
                                            //   console.log("ser")

                                            // }else{
                                            //   setNotList();
                                            //   console.log("not ser")

                                            // }

  $('.products').removeClass('load'); 
  $('.productsList').removeClass('load'); 

          

                                

                                         for(var i=0; i<res.totalPages;i++){
                                            

                                            if(page==i){

                                               $('.filterOption #pagesPagination').append('<span class="paginationO thisPage" onclick="getProductsNext('+i+',true,\''+node+'\')">'+(i+1)+' </span>');
                                            }else{
                                          $('.filterOption #pagesPagination').append('<span class="paginationO" onclick="getProductsNext('+i+',true,\''+node+'\')">'+(i+1)+' </span>');
                                             }
                                         }
                                         // $(".search ").append("<div id='name'>"+ name+"<div>");
                                           

                                            optionCatalog=localStorage.getItem("optionCatalogList");
                                            if (optionCatalog=="true"){
                                              setList();  
                                              console.log("ser")

                                            }else{
                                              setNotList();
                                              console.log("not ser")

                                            }



          if (!res.last){
                console.log("Дуже багато")
                $(".content .container .row .search").append("<button id='searchMore'>Показати ще результати</button>")
              }
                $(".content .container .row .search #searchMore").click(function() {
                  $('.search  #pagesPagination .paginationO').remove();
                  $(".content .container .row .search #searchMore").remove();
               
                  page++;
                    getProducts(name, page);
                });


               },

         error: function (jqXHR, exception){
         
         console.log("error");  
            //   
        return false;  
           }

        });
}

function getProductsNext(page=0,dell, node)
{
   if(dell){
    $('  #searchMore').remove();
    $(' #pagesPagination .paginationO').remove();
    $('.products .catelogElemet').remove();
    $('.products  h3').remove();
       
       
  };
var catalog=[];



var sorting='name';
  var sorting=$(" .prosort#sortingOption option:selected").val();
  if(sorting=='name'){
     sorting='name'; 
  }else
    if(sorting=='ask'){
    sorting='priceWithVAT'; 
    param="ask";
  }else
    if(sorting=='desk'){
      sorting='priceWithVAT'; 
      param="desk";

    }


getProducts(node, page, catalog, sorting);
}
$('.prosort#sortingOption').change(function() {
    $(' #searchMore').remove();
    $(' #pagesPagination .paginationO').remove();
    $('.products .catelogElemet').remove();
    $('.products  h3').remove();
       
var param='asc';
  var sorting=$(".prosort#sortingOption option:selected").val();
  if(sorting=='name'){
     sorting='name'; 
  }else
    if(sorting=='ask'){
    sorting='priceWithVAT'; 
    param="ask";
  }else
    if(sorting=='desk'){
      sorting='priceWithVAT'; 
      param="desk";

    }

page=localStorage.getItem("page");


//alert(name+page+sorting);

node=$('.allCatalog .node').text();
catalog=[];
getProducts(node, page, catalog, sorting);
  });










  function renderProducts(){


    var catalog= $('.productsList').text();
    if(!catalog){
      return 0;
    }
    catalog=catalog.slice(0, -1);

    $('.productsList').empty();
     catalog= JSON.parse(catalog);
    
     

//alert(catalog[0].parentNodes.length);
function get2pageCatalog(node, page){
    $.ajax({

             url:'https://web-store-sample-vs.herokuapp.com/web-store/catalog/'+node+'/sub-categories',
          contentType:"application/json",
           async:false,
              success: function(res) {
                
                console.log(res);
                for(var i=0; i<res.length; i++){
                  console.log(page);
                  console.log(page);
                  $('.productsList2 #'+page+' ' ).append("<a href='catalog.php?nodeId="+res[i].nodeId+"&product=false' class='podcategoria' <h4>"+res[i].name+"</h4> </a>")
                  $('.catalogLeftMenu #c'+page+' ' ).append("<a href='catalog.php?nodeId="+res[i].nodeId+"&product=false' class='podcategoria2' <h4>"+res[i].name+"</h4> </a>")

                }
                 $('.catalogLeftMenu #c'+page+' ' ).prepend("<button class='catalogButton'><i class='fa fa-chevron-circle-down' aria-hidden='true'></i></button>")
                  $('.catalogLeftMenu #c'+page+' button').click(function(){
                    if($('.catalogLeftMenu #c'+page+' button').hasClass('off')){
                        $('.catalogLeftMenu #c'+page+' button').removeClass('off');
                        var selector = $(this).siblings(".podcategoria2");
                        $(selector).css('display','none');

                    }else{
                        $('.catalogLeftMenu #c'+page+' button').addClass('off');
                        var selector = $(this).siblings(".podcategoria2");
                         $(selector).css('display','block');
                   }
                  })
              }
            });

function getButton() {

  }
}
if(!!catalog.length){
if (catalog[0].parentNodes.length>2){
      for (var i=0 ; i<catalog.length; i++) {
       if(catalog[i].hasLinkedProducts){

        $(' .productsList').append("<a class='categoriaBlock' href=catalog.php?nodeId="+catalog[i].nodeId+"&product=ture><img class='img-responsive' src='img/test.jpg'><h4>"+catalog[i].name+"</h4></a>");
        $(' .catalogLeftMenu').append("<a class='categoriaBlock' href=catalog.php?nodeId="+catalog[i].nodeId+"&product=ture><h4>"+catalog[i].name+"</h4></a>");
      }else
      {
       $(' .productsList').append("<a class='categoriaBlock' href=catalog.php?nodeId="+catalog[i].nodeId+"&product=false><img class='img-responsive' src='img/test.jpg'><h4>"+catalog[i].name+"</h4></a>");
       $(' .catalogLeftMenu').append("<a class='categoriaBlock' href=catalog.php?nodeId="+catalog[i].nodeId+"&product=false><h4>"+catalog[i].name+"</h4></a>");
      }

  } 
}else if (catalog[0].parentNodes.length==1){

  for (var i=0 ; i<catalog.length; i++) {
    
        $(' .productsList2').append("<div  id="+i+"  class='catalogLinksBlock' ><a href='catalog.php?nodeId="+catalog[i].nodeId+"&product=ture' class='categoriaBlock'><img class='img-responsive' src='img/test.jpg'><h4>"+catalog[i].name+"</h4></a></div>");
        $(' .catalogLeftMenu').append("<div  id=c"+i+"  class='catalogLinksBlock2' ><a href='catalog.php?nodeId="+catalog[i].nodeId+"&product=ture' class='categoriaBlock'><h4>"+catalog[i].name+"</h4></a></div>");
           get2pageCatalog(catalog[i].nodeId, i);

        

  }
  $(' .productsList').css('display','none');
}else if (catalog[0].parentNodes.length==2){
  
  for (var i=0 ; i<catalog.length; i++) {
       

        $(' .productsList3').append("<a class='categoriaBlock' href=catalog.php?nodeId="+catalog[i].nodeId+"&product=ture><img class='img-responsive' src='img/test.jpg'><h4>"+catalog[i].name+"</h4></a>");
        $(' .catalogLeftMenu').append("<a class='categoriaBlock' href=catalog.php?nodeId="+catalog[i].nodeId+"&product=ture><h4>"+catalog[i].name+"</h4></a>");
  }
  $(' .productsList').css('display','none');
}

}

  if (catalog.length<1){
  $('.productsList').css('display','none');
  }

   var products= $('.products').text();
   

   // products=products.slice(0, -1);
    $('.products').empty();
  

   products=getProducts(products, 0,catalog);



   
    // products= JSON.parse(products);
  
  }  
 
renderProducts();
         var linkstoProducts=$('.productsList a');
         var linkstoCatalog=$('.products a');
        if((linkstoProducts.length+linkstoCatalog.length)>0){
        }else{
           $('.productsList').css('display','block');
           $('.productsList').css('overflow','hidden');
           $(' .testList .productsList').append("<h5>В цій категорії товарів немає</h5>");
        }