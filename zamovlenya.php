<?php
		 require_once "head.php";
		?>
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
		<!-- <script src="js/zamovlenya.js"></script> -->
</body>