<!-- 
		<div class="catalog">
			<div class="catalogMenu col-md-4">
		</div>-->
	

<div class="container">
	<div class="row topBlock">

	<div class="col-md-3 catalogMenu">
	<i class="fa fa-bars" aria-hidden="true"></i><h3>Топ категорії</h3>
 		<?php include 'menu_catalog.php'; ?>
</div>

<div class="col-md-6 sliderBox">
<div class="sliderMenu">
	<ul>
		<li>Топ Акції</li>
		<li>З подарунками</li>
		<li>Зі знижками</li>
		<li>Розіграш призів</li>
		<li>Товар дня</li>
	</ul>
</div>


		<?php
		 require_once "libs/rslider/rslider.html";
		?>
<!-- <iframe src="libs/rslider/rslider.html" width="100%" height="600px" align="left">
    Ваш браузер не поддерживает плавающие фреймы!
 </iframe> -->
</div>

<div class="catalogBlock col-md-9 ">
	
	<!-- 	<div class="ktg kategoria1">	<?php include 'categoriya1.php'; ?></div>
		<div class="ktg kategoria2">	<?php include 'categoriya2.php'; ?></div>
		<div class="ktg kategoria3">	<?php include 'categoriya3.php'; ?></div>
		<div class="ktg kategoria4">	<?php include 'categoriya4.php'; ?></div>
		<div class="ktg kategoria5">	<?php include 'categoriya5.php'; ?></div>
		<div class="ktg kategoria6">	<?php include 'categoriya6.php'; ?></div>
		<div class="ktg kategoria7">	<?php include 'categoriya7.php'; ?></div>
		<div class="ktg kategoria8">	<?php include 'categoriya8.php'; ?></div> -->
		 <?php include 'categorii.php'; ?>
		

	</div>


<div class="col-md-3 catalogPoslugi">

<button class="medPoslugi">Популярні медичні послуги</button>
<div class="row medPosluga">
	<div class="col-xs-6">
	<h4>Медична консультація</h4>
	<button class="zapButton">записатися</button>
	</div>
	<div class="col-xs-6">
	<img class="img-responsive" src="img/poslugi1.jpg" alt="">	
	</div>
</div>
<div class="row medPosluga">
	<div class="col-xs-6">
	<h4>Діагностика захворювань</h4>
	<button class="zapButton">записатися</button>
	</div>
	<div class="col-xs-6">
	<img class="img-responsive" src="img/poslugi2.jpg" alt="">	
	</div>
</div>
<div class="row medPosluga">
	<div class="col-xs-6">
	<h4>Лабораторні аналізи</h4>
	<button class="zapButton">записатися</button>
	</div>
	<div class="col-xs-6">
	<img class="img-responsive" src="img/poslugi3.jpg" alt="">	
	</div>
</div>

</div>


</div>

</div> 

<div class="container sliderProducts">	
<div class="row">
	<h3>Акційні товари</h3>
	  <?php include 'sliderA.php'; ?>

</div>
</div>	

<div class="container sliderProducts">	
<div class="row">
	<h3>Рекомендовані товари</h3>
	  <?php include 'sliderR.php'; ?>

</div>
</div>	



</div>	
<div class="container">
	<div class="row">
		<div class="oProekte col-sm-12">
		<h2>
			Про проект
		</h2>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique laudantium, laborum officiis repellat non delectus error animi quia magni corporis, ipsam architecto fuga repudiandae quo doloribus dolorum cum, ea quam.
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam atque quia debitis qui repellendus voluptatem adipisci! Vel non minima nobis. Quos minima aspernatur modi, tenetur quasi perspiciatis architecto blanditiis hic.
			</p>
		<p>	Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque veritatis, debitis consequuntur praesentium unde. Consequatur cumque tempore cupiditate minima autem velit alias impedit perspiciatis fugit, totam a ad suscipit pariatur.
		</p>
			<p>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique laudantium, laborum officiis repellat non delectus error animi quia magni corporis, ipsam architecto fuga repudiandae quo doloribus dolorum cum, ea quam.
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam atque quia debitis qui repellendus voluptatem adipisci! Vel non minima nobis. Quos minima aspernatur modi, tenetur quasi perspiciatis architecto blanditiis hic.
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident delectus ducimus sapiente explicabo, suscipit ratione quod cum, quaerat iste rem a voluptatibus corporis aperiam aliquam quia. Illum placeat neque, quibusdam.
			</p>

		</div>
	</div>
</div>