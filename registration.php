<?php
		 require_once "head.php";
		?>
<body id="Рєстрація">
		<?php
		 require_once "header.php";
		?>
<div class="content">		
<div class="container">
	<div class="row">	
		<div class="col-md-6 col-md-offset-3 authorization">
		<div id="registrationResults"> </div>
		<form method="POST" id="registrationform" role="form" name="form1" action="javascript:void(null);">
		 <div class="form-group">
		  <label for="email">Ел. пошта</label>
		  <input type="email" class="form-control" id="email" placeholder="Ел. пошта">
		 </div>
		 <div class="form-group">
		  <label for="firstName">Імя</label>
		  <input type="text" class="form-control" id="firstName" placeholder="Ведіть імя">
		 </div>
		
		 <div class="form-group">
		  <label for="lastName">Прізвище</label>
		  <input type="text" class="form-control" id="lastName" placeholder="Ведіть Прізвище">
		 </div>
		  <div class="form-group">
		  <label for="phone">Телефон</label>
		  <input type="tel" class="form-control" id="phone" placeholder="Ваш телефон">
		 </div>
		 <div class="form-group">
		  <label for="password">Пароль</label>
		  <input type="password" class="form-control" id="password" placeholder="Пароль:">
		 </div>
		  <div class="form-group">
		  <label for="password">Підтвердіть пароль</label>
		  <input type="password" class="form-control" id="password2" placeholder="Пароль ще раз:">
		 </div>
		 <input id="registrationButton" value="Зареєструватися" type="submit">
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
