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


  document.location.href = 'catalog.php';

 });

  $(".tovaryButton").click(function(){


  document.location.href = 'catalog.php';

 });

