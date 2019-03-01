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
<body id="Замовлення">

		<?php
		 require_once "header.php";
		?>
<div class="content">

	<div class="container">
		<?php
		 require_once "breadcrumbs.php";
		?>
		<div class="row zamovPage">

			<div class="col-sm-6">
			<div class="cartList zamovlenyaList">
				
			</div>
			</div>


			<div class="col-sm-6 zamovlenya">
				<label for="phone" >Номер телефона</label>
				<input type="text" id="phone">
			
				<label for="">Адреса</label>
				<input type="text" id="adres">
				<input type="checkbox" id="umovi" name="scales">
				<label for="umovi">Погоджуюсь з умовами</label>
				<h3>
					<p>До сплати:<span id="endPrise"></span> грн</p>
				</h3>
				<div class="error"> <h6>ok</h6></div>

				<button id="oformitZ">Оформити замовлення</button>
			</div>
			

			
		</div>

	</div>



	</div>

	<footer>

	<?php
		 require_once "footer.php";
		?>

	</footer>

<script>
	renderCartPage()
</script>
		<script>$("#phone").mask("+38(999) 999-9999");</script>
		<script src="js/zamovlenya.js"></script>
</body>