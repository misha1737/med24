<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8" />
	<title>med24</title>
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
	<link rel="stylesheet" href="css/reset.css" />
	<link rel="stylesheet" href="libs/bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" href="scss/application.css" />
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.9/css/all.css" integrity="sha384-5SOiIsAziJl6AWe0HWRKTXlfcSHKmYV4RBF18PPJ173Kzn7jzMyFuTtk8JA7QQG1" crossorigin="anonymous">
	<script src="libs/jquery/jquery-2.1.4.min.js"></script>
</head>
<body>
	<header>
		<div class="container-fluid">
			<div class="row">
				<div class="col-md-12 gLine">
					<div class="container">
						<div class="row">
							<div class="language">
								<a href="#">UA</a> <span>|</span> <a href="#">RU </a>
							</div>
							<div class="city">
							<span>Місто:</span>
								<select>
								  <option>Вінниця</option>
								  <option>Київ</option>
								  <option>Чернігів</option>
								  <option>Одеса</option>
								</select>
							</div>
							
						
							
							
							
							<div class="percent">
							<a href="#"><i class="fas fa-newspaper"></i> Новини статті та огляди</a>
							</div>
							<div class="percent">
							<a href="#"><i class="fas fa-map-marker-alt"></i> Відстежити замовлення</a>
							</div>
							<div class="percent">
							<a href="#"><i class="fas fa-phone-volume"></i> Контакти</a>
							</div>
							<div class="percent">
							<a href="#"><i class="fas fa-thumbs-up"></i> Гарантія</a>
							</div>
								<div class="percent">
							<a href="#"><i class="fas fa-truck"></i> Доставка та оплата</a>
							</div>
							<div class="percent">
							<a href="#"><i class="fas fa-percent"></i> Акції та знижки</a>
							</div>



						
					</div>
				</div>
			</div>	
		<div class="container">
			<div class="row">
				
				<div class="col-md-4 blockP">
				<div class="col-md-4">
				<img src="img/med24logo.svg" class="img-responsive" alt="logo">
				</div>
					<div class="col-md-4">
					<button class="tovaryButton">Товари <i class="fas fa-angle-down"></i></button>
					</div>
					<div class="col-md-4">
					<button class="poslugiButton">Послуги <i class="fas fa-angle-down"></i></button>
					</div>	
				</div>
				<div class="col-md-4">
					<form class="searchForm">
					<input class="search" type="search" name="q" placeholder="Пошук">
					<button class="searchButton" type="submit"> <i class="fas fa-search"></i></button>
					</form>	
				</div>
				<div class="col-md-4 blockP HederLeftPanel">
					<div class="col-md-4 ">
						<span class="phoneNumber"><i class="fas fa-mobile-alt"></i><p><br>0 800 750 700</p></span>
					</div>
					<div class="col-md-4">
						<span class="access"><i class="far fa-user"></i><p>Увійти/<br>Зареєструватись</p></span>
					</div>
					<div class="col-md-4">
						<span class="basket"><i class="fas fa-shopping-cart"></i><p>Товарів: 0 <br> на 0 грн</p></span>
					</div>
				</div>
			</div>
		</div>
	</header>
<div class="container">
	<div class="row">	
		<div class="col-md-6 col-md-offset-3 authorization">
		<form method="POST" id="formx" role="form" name="form1" action="javascript:void(null);">
		 <div class="form-group">
		  <label for="email">Логин</label>
		  <input type="text" class="form-control" id="username" placeholder="Ведіть імя:">
		 </div>
		 <div class="form-group">
		  <label for="pass">Пароль</label>
		  <input type="password" class="form-control" id="password" placeholder="Пароль:">
		 </div>
		 <div class="checkbox">
		  <label><input type="checkbox"> Чекбокс</label>
		 </div>
		 <input value="Send" type="submit">
		</form>
		</div>
		<div id="results">вывод</div>
	</div>
</div>

	<?php
		 require_once "footer.php";
		?>


</body>
</html>
