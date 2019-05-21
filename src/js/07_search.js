function startSearch(name, page=0, sortParam='name', param='asc'){



 $.ajax({

             url:'https://web-store-sample-vs.herokuapp.com/web-store/catalog/search?name='+name+'&page='+page+'&size=12'+'&sort='+sortParam,
          contentType:"application/json",
              success: function(res) {
              
              	if (res.content.length==0){
         				console.log("Не знайдено")
         				$(".content .container .row .search").append("<h3>Нічого не знайдено</h3>")
         			}
         		
         	

				for(i=0;i<res.content.length;i++){
//test

             // $(".content .container .row .search").remove();
               $(".content .container .row .search").append("<div class='col-md-4 col-lg-3 col-sm-6 catelogElemet'> <div class='product' id="+res.content[i].id+"></div></div>");

            //   $(" .content .container .row .search").append("<div class='col-md-4 col-lg-4 col-sm-6  catelogElemet'> <div class='product' id="+res.content[i].id+"></div></div>");
               
                $(".content .container .row .search #"+res.content[i].id+" ").prepend(" <h5>"+res.content[i].name+"</h5>");

                //картинка
                $(".content .container .row .search #"+res.content[i].id+" ").append(" <img src='img/test.jpg' >");
                //картинка

                //$(".content .container .row .search #"+res.content[i].id+" ").append(" <p class='manufacturer'>Производитель:"+res.content[i].product.manufacturer+"</p>");
                
                $(".content .container .row .search #"+res.content[i].id+" ").append(" <p class='price'>Цена:"+res.content[i].priceWithVAT+"</p>");

                $(".content .container .row .search #"+res.content[i].id+" ").append(" <button onclick='modalAddProduct("+res.content[i].id+")' id="+res.content[i].id+">Добавить в корзину</button>");

              $(".content .container .row .search #"+res.content[i].id+" ").append(" <a href=catalog.php?nodeId="+res.content[i].catalogTreeNodeId+"&product=true>Перейти в каталог</button></a>");

                                         }
                                         //alert(res.totalPages);

                                         for(var i=0; i<res.totalPages;i++){
                                            

                                            if(page==i){

                                               $('.filterOption #pagesPagination').append('<span class="paginationO thisPage" onclick=search('+i+',true)>'+(i+1)+' </span>');
                                            }else{
                                          $('.filterOption #pagesPagination').append('<span class="paginationO" onclick=search('+i+',true)>'+(i+1)+' </span>');
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

function search(page=0,dell)
{
  localStorage.setItem("page", page);
  if(dell){


    $('.search .catelogElemet').remove();
    $('.search  h3').remove();
       $('.search  #searchMore').remove();
       $('.search  #pagesPagination .paginationO').remove();
       
  };

var param='asc';
  var sorting=$("#sortingOption option:selected").val();
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


var name = $(".search #name").text().replace(/\s+/g,'');
name =name.replace(/\s+/g,'&nbsp');
//$(".search #name").emty();
console.log(name);
$("#Пошук .search").append("<h3>результат пошуку <span>"+ name+"</span>:</h3>");
startSearch(name, page, sorting, param);

			//var name=$(".search #name");

        
         };



$('#sortingOption').change(function() {
    $('.search .catelogElemet').remove();
    $('.search  h3').remove();
       $('.search  #searchMore').remove();
       $('.search  #pagesPagination .paginationO').remove();
       
var param='asc';
  var sorting=$("#sortingOption option:selected").val();
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


var name = $(".search #name").text().replace(/\s+/g,'');
name =name.replace(/\s+/g,'&nbsp');


page=localStorage.getItem("page");


//alert(name+page+sorting);

startSearch(name, page, sorting, param);
  });
