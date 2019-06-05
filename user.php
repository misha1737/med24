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
		<div class="col-sm-3" style="padding-left:0px;">
			<ul class="userNav">	
				<li id="CartButton" class="active">	
					Корзина
				</li>
				<li id="UserButton">	
					Замовлення
				</li>
			</ul>
		</div>
			<div class="col-sm-9" >
				
				<div class="row " id="cartList">
					<div class="cartList">
						
					</div>
					<div class="row">
					<a href="zamovlenya.php" id="zakaz" class="oformitZ">  Оформити замовлення</a>
					</div>
				</div>
				
				<div class="row">
					<div id="orders">
						


					</div>
				</div>


			</div>
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
	renderCartPage();
	getOrders();
</script>
	
</body>