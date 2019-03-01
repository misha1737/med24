<?php 
$kategoria = $_GET["kat"];
$sub = $_GET["subkat"];
$sub = $_GET["tovar"];
if ($kat){
	echo "ok";
} else{
	echo "no kategory";
}
if ($subkat){
?>

<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8" />
	<title>tovar - med24</title>
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
	<link rel="stylesheet" href="css/reset.css" />
	<link rel="stylesheet" href="libs/bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" href="scss/application.css" />
	 <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.9/css/all.css" integrity="sha384-5SOiIsAziJl6AWe0HWRKTXlfcSHKmYV4RBF18PPJ173Kzn7jzMyFuTtk8JA7QQG1" crossorigin="anonymous">
	<script src="libs/jquery/jquery-2.1.4.min.js"></script>
</head>
<body id="Товар">

	<?php
		 require_once "header.php";
		?>
<div class="content">

	<div class="container">
		<?php
		 require_once "breadcrumbs.php";
		?>
		</div>
	</div>
	<footer>

	<?php
		 require_once "footer.php";
		?>

	</footer>
<script>search();</script>
  <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
  <script>
  $( function() {
    $( "#slider-range" ).slider({
      range: true,
      min: 0,
      max: 10000,
      values: [ 75, 10000 ],
      slide: function( event, ui ) {
        $( "#amount" ).val(   ui.values[ 0 ] + " грн - " + ui.values[ 1 ] + " грн" );
      }
    });
    $( "#amount" ).val( + $( "#slider-range" ).slider( "values", 0 ) + " грн - " + 
       $( "#slider-range" ).slider( "values", 1 )  + " грн"  );
  } );
  </script>
</body>

<script src="js/filter.js"></script>