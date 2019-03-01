<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8" />
	<title>authorization - med24</title>
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
	<link rel="stylesheet" href="css/reset.css" />
	<link rel="stylesheet" href="libs/bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" href="scss/application.css" />
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.9/css/all.css" integrity="sha384-5SOiIsAziJl6AWe0HWRKTXlfcSHKmYV4RBF18PPJ173Kzn7jzMyFuTtk8JA7QQG1" crossorigin="anonymous">
	<script src="libs/jquery/jquery-2.1.4.min.js"></script>
</head>
<body id="Авторизація">

		<?php
		 require_once "header.php";
		?>
<div class="content">
	
<div class="container">
	<?php
		 require_once "breadcrumbs.php";
		?>
	<div class="row">	
		<div class="col-md-6 col-md-offset-3 authorization">
		<div id="registrationResults"> </div>
<form method="POST" id="authorizationForm" role="form" name="authorizationForm" action="javascript:void(null);">
		 <div class="form-group">
		  <label for="email">Ел. пошта</label>
		  <input type="email" class="form-control" id="email" placeholder="Ел. пошта">
		 </div>
		
		 <div class="form-group">
		  <label for="password">Пароль</label>
		  <input type="password" class="form-control" id="password" placeholder="Пароль:">
		 </div>
		 <input id="authorizationButton" value="Увійти" type="submit">
		 
</form>
<form action="registration.php">
    <input  id="registrationButton" value="Зареєструватися" type="submit">
</form>
	  

</div>

</div>
</div>
</div>
<footer>

	<?php
		 require_once "footer.php";
		?>

	</footer>

	
</body>
</html>
