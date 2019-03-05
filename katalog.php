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

<?php
		 require_once "head.php";
		?>
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