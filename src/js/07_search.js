function startSearch(name, page){
 $.ajax({
             url:'https://web-store-sample-vs.herokuapp.com/web-store/catalog/search?name='+name+'&page='+page+'&size=12',
          contentType:"application/json",
              success: function(res) {
              	if (res.content.length==0){
         				console.log("Не знайдено")
         				$(".content .container .row .search").append("<h3>Нічого не знайдено</h3>")
         			}
         		
         	

				for(i=0;i<res.content.length;i++){
//test

 
               $(".content .container .row .search").append("<div class='col-md-4 col-lg-3 col-sm-6 catelogElemet'> <div class='product' id="+res.content[i].id+"></div></div>");

            //   $(" .content .container .row .search").append("<div class='col-md-4 col-lg-4 col-sm-6  catelogElemet'> <div class='product' id="+res.content[i].id+"></div></div>");
               
                $(".content .container .row .search #"+res.content[i].id+" ").prepend(" <h5>"+res.content[i].name+"</h5>");

                //картинка
                $(".content .container .row .search #"+res.content[i].id+" ").append(" <img src='img/test.jpg' >");
                //картинка

                //$(".content .container .row .search #"+res.content[i].id+" ").append(" <p class='manufacturer'>Производитель:"+res.content[i].product.manufacturer+"</p>");
                
                $(".content .container .row .search #"+res.content[i].id+" ").append(" <p class='price'>Цена:"+res.content[i].priceWithVAT+"</p>");

                $(".content .container .row .search #"+res.content[i].id+" ").append(" <button onclick='addProduct("+res.content[i].id+")' id="+res.content[i].id+">Добавить в корзину</button>");

              $(".content .container .row .search #"+res.content[i].id+" ").append(" <a href=catalog.php?nodeId="+res.content[i].catalogTreeNodeId+"&product=true>Перейти в каталог</button></a>");

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







//          function startSearch(name, page){
//  $.ajax({
//              url:'https://web-store-sample-vs.herokuapp.com/web-store/catalog/search?name='+name+'&page='+page+'&size=12'
//              , type:'GET',
//           contentType:"application/json",
//               success: function(res) {
//                 if (res.content.length==0){
//                 console.log("Не знайдено")
//                 $(".content .container .row .search").append("<h3>Нічого не знайдено</h3>")
//               }
            
          

//         for(i=0;i<res.content.length;i++){
// //test

//                $("#Пошук .content .container .row .search").append("<div class='col-md-4 col-lg-3 col-sm-6 catelogElemet'> <div class='product' id="+res.content[i].id+"></div></div>");

//                $("#Товар .content .container .row .search").append("<div class='col-md-4 col-lg-4 col-sm-6  catelogElemet'> <div class='product' id="+res.content[i].id+"></div></div>");
               
//                 $(".content .container .row .search #"+res.content[i].id+" ").prepend(" <h5>"+res.content[i].name+"</h5>");

//                 //картинка
//                 $(".content .container .row .search #"+res.content[i].id+" ").append(" <img src='img/test.jpg' >");
//                 //картинка

//                 $(".content .container .row .search #"+res.content[i].id+" ").append(" <p class='manufacturer'>Производитель:"+res.content[i].product.manufacturer+"</p>");
                
//                 $(".content .container .row .search #"+res.content[i].id+" ").append(" <p class='price'>Цена:"+res.content[i].product.priceWithVAT+"</p>");

//                 $(".content .container .row .search #"+res.content[i].id+" ").append(" <button onclick='addProduct("+res.content[i].product.id+")' id="+res.content[i].product.id+">Добавить в корзину</button>");
              
//                                          }
//                                             optionCatalog=localStorage.getItem("optionCatalogList");
//                                             if (optionCatalog=="true"){
//                                               setList();  
//                                               console.log("ser")

//                                             }else{
//                                               setNotList();
//                                               console.log("not ser")

//                                             }


//           if (res.content.length==12){
//                 console.log("Дуже багато")
//                 $(".content .container .row .search").append("<button id='searchMore'>Показати ще результати</button>")
//               }
//                 $(".content .container .row .search #searchMore").click(function() {
//                   $(".content .container .row .search #searchMore").remove();
//                   page++;
//                     startSearch(name, page);
//                 });


//                },

//          error: function (jqXHR, exception){
         
//          console.log("error");  
//             //   
//         return false;  
//            }

//         });

//   }

// function search()
// {
// var name = $(".search #name").text().replace(/\s+/g,'');
// name =name.replace(/\s+/g,'&nbsp');
// $(".search #name").remove();
// console.log(name);
// $("#Пошук .search").append("<h3>результат пошуку <span>"+ name+"</span>:</h3>")
// startSearch(name, 0)
//       //var name=$(".search #name");

        
//          };