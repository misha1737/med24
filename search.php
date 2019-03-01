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
<body id="Пошук">

		<?php
		 require_once "header.php";
		?>
<div class="content">

	<div class="container">
		<?php
		 require_once "breadcrumbs.php";
		?>
		<div class="row">
			<div class="search">
				<div class="col-sm-12 filterOption">	
				Сортировка:
				   <select>
				    <option value="">Популярні</option>
				    <option value="">Від дорогих до дешевих</option>
				    <option value="">Від дешевих до дорогих</option>
				    <option value="">По рейтингу</option>
				   </select>
					<span class="paginationO">1</span>
					<span class="paginationO">2</span>
					<span class="paginationO">3</span>
					<span class="paginationO">4</span>
					<span class="glyphicon 	glyphicon glyphicon-th blockOption "></span>
					<span class="glyphicon glyphicon glyphicon-th-list listOption"></span>
			</div>
				<p id="name">
				<?php

					echo htmlspecialchars($_GET["name"]);

?>
				</p>
				
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
search();
</script>
	
</body>