
		<?php
		 require_once "head.php";
		?>
<body id="Авторизація" class="autoron">

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
<script>

</script>