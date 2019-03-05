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