<?php
		 require_once "head.php";
		?>
<body id="Особистий кабінет">

		<?php
		 require_once "header.php";
		?>
		<script>
			$('.modal_addProduct').remove();
		</script>
<div class="content">

	<div class="container">
		<?php
		 require_once "breadcrumbs.php";
		?>
		<div class="row">
			<div class="user">
				<span class="access"></span>

			</div>
		</div>	
		<div class="row">
			<div class="cartList">
				
			</div>
			
		</div>
		<div class="row">
			<a href="zamovlenya.php" id="zakaz" class="oformitZ">  Оформити замовлення</a>
		</div>

	</div>



	</div>

	<footer>

	<?php
		 require_once "footer.php";
		?>

	</footer>
<script>
	renderCartPage();
</script>
	
</body>