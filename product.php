<?php
   
     $product = htmlspecialchars($_GET["productId"]);
 ?>

<?php
		 require_once "head.php";
		?>
<body id="product">

		<?php
		 require_once "header.php";
		?>
<div class="content">
<div id="preloader">
		<img src="img/preloader.svg" alt="">
		
	</div>
	<div class="container">
		<?php
		 require_once "breadcrumbs.php";
		?>
			<div class="topBlockProduct">
		<div class="row">
		<div class="col-sm-12 staticBlock">
				<div class="productName">
					<p id="proguctId" style="display:none">
						<?php
						echo $product;
						?>

   					 </p>
					
   					 <img src="img/test.jpg" alt="">
   					 <h1 class="productName__title"></h1>
   					 <p class="price"></p>
   					 <button  onclick='modalAddProduct(
   					 	<?php
						echo $product;
						?>
						)'>Добавити в корзину</button>
				</div>
			</div>

		</div>		

		</div>				
</div>					
			



<div class="mobileBottomBlock">
	<div class="mobileBottomBlock__Buy" id="addToCart" onclick='modalAddProduct(
   					 	<?php
						echo $product;
						?>
						)'>Добавити в корзину</div>
	<div class="mobileBottomBlock__options" id="mobileBottomBlockOptions"><i class="fa fa-ellipsis-v" aria-hidden="true"></i></div>
</div>

<div class="mobileBottomBlockBig">
	<div class="mobileBottomBlock__close" id="addToCart"><i class="fas fa-angle-down"></i></div>
	<div class="mobileBottomBlock__option" id="mobileBottomBlockOptions"><i  class="fa fa-share-alt" aria-hidden="true"></i>Добавити в закладки</div>
	<div class="mobileBottomBlock__option" id="mobileBottomBlockOptions"><i  class="fa fa-share-alt" aria-hidden="true"></i>Поділитись</div>
	<div class="mobileBottomBlock__option" id="mobileBottomBlockOptions"><i  class="fa fa-share-alt" aria-hidden="true"></i>Задати запитання</div>
</div>


	</div>
</div>


	<footer>

	<?php
		 require_once "footer.php";
		?>

	</footer>

	

	<!-- <script src="js/jquery.imageLens.js"></script>
	<script src="js/product.js"></script>
 -->
	
</body>