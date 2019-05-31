
<?php
    $node = htmlspecialchars($_GET["nodeId"]);
     $product = htmlspecialchars($_GET["product"]);


    ?>

<?php
		 require_once "head.php";
		?>
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
			<div class="filterButton">
				<span class="glyphicon glyphicon-menu-hamburger filter-off"></span>
				<p>Фільтр</p>
			</div>	

			<div class="col-sm-3 filter">
			
				<form class="categoria">
			
			<div class="pdcatalog">
		
		 </div>


<br>	

				</form>
				

			</div>

			<div class="col-sm-9">


			<div class="col-sm-12">
				<div class="testList">
					<div class="zagolovokFilter col-sm-12">Пошук</div>	
					
					
			
				</div>
			</div>
			<div class="search">
			<div class="col-sm-12 filterOption">	
				Сортировка:
				   <select id="sortingOption">
				    <option value="name">По імені</option>
				    <!-- <option value="ask">Від дорогих до дешевих</option> -->
				    <option value="desk">Від дешевих до дорогих</option>
				   </select>
				   <div class="abzac"> </div>
				   <span id="pagesPagination">
					
					</span>
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
		

	</div>



</div>

	<footer>

	<?php
		 require_once "footer.php";
		?>

	</footer>
  <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

<script>
search();
</script>

</body>

