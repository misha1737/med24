
<?php
    $node = htmlspecialchars($_GET["nodeId"]);
     $product = htmlspecialchars($_GET["product"]);


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
		<div class="row">
			<div class="filterButton">
				<span class="glyphicon glyphicon-menu-hamburger filter-off"></span>
				<p>Фільтр</p>
			</div>	

			<div class="col-sm-3 filter">
				<h4>Категорія</h4>	
				<form class="categoria">
			
			<div class="pdcatalog">
		
		 </div>


<br>	

				</form>
				<h4>Бренд</h4>	
				<form>
				    <input type="checkbox" id="brand1" name="subscribe">
				    <label for="brand1">Бренд1</label>
<br>
				   	<input type="checkbox" id="brand2" name="subscribe">
				    <label for="brand2">Бренд2</label>
<br>
				    <input type="checkbox" id="brand3" name="subscribe">
				    <label for="brand3">Бренд3</label>
<br>
				    <input type="checkbox" id="brand4" name="subscribe">
				    <label for="brand4">Бренд4</label>
<br>
				    <input type="checkbox" id="brand5" name="subscribe">
				    <label for="brand5">Бренд5</label>
<br>
					<input type="checkbox" id="brand6" name="subscribe">
				    <label for="brand6">Бренд6</label>
<br>
				    <input type="checkbox" id="brand7" name="subscribe">
				    <label for="brand7">Бренд7</label>
				</form>
				<h4>Призначення</h4>	
				<form>
				    <input type="checkbox" id="preznachenya1" name="subscribe">
				    <label for="preznachenya1">Призначення1</label>
<br>
				   	<input type="checkbox" id="preznachenya2" name="subscribe">
				    <label for="preznachenya2">Призначення2</label>
<br>
				    <input type="checkbox" id="preznachenya3" name="subscribe">
				    <label for="preznachenya3">Призначення3</label>
<br>
				    <input type="checkbox" id="preznachenya4" name="subscribe">
				    <label for="preznachenya4">Призначення4</label>
<br>
				    <input type="checkbox" id="preznachenya5" name="subscribe">
				    <label for="preznachenya5">Призначення5</label>
<br>
					<input type="checkbox" id="preznachenya6" name="subscribe">
				    <label for="preznachenya6">Призначення6</label>
<br>
				    <input type="checkbox" id="preznachenya7" name="subscribe">
				    <label for="preznachenya7">Призначення7</label>
<br>
				     <input type="checkbox" id="preznachenya8" name="subscribe">
				    <label for="preznachenya8">Призначення8</label>
<br>
				     <input type="checkbox" id="preznachenya9" name="subscribe">
				    <label for="preznachenya9">Призначення9</label>
<br>
				     <input type="checkbox" id="preznachenya10" name="subscribe">
				    <label for="preznachenya10">Призначення10</label>
<br>
				     <input type="checkbox" id="preznachenya11" name="subscribe">
				    <label for="preznachenya11">Призначення11</label>
<br>
				     <input type="checkbox" id="preznachenya12" name="subscribe">
				    <label for="preznachenya12">Призначення12</label>
				</form>
<br>		
<p>
  <label for="amount">Діапазон ціни:</label>
  <input type="text" id="amount" readonly style="border:0;">
</p>
 
<div id="slider-range"></div>

<button class="filterSend">Прийняти</button>

			</div>

			<div class="col-sm-9">


			<div class="col-sm-12">
				<div class="testList">
					<div class="zagolovokFilter col-sm-12">Категорія4</div>	
					<div class="col-sm-2 dodatkovaKategoria">
						<a href="filter.php"><img class="img-responsive" src="img/test.jpg" alt="">	
						 Додаткова категорія 1</a>	
					</div>
					<div class="col-sm-2 dodatkovaKategoria">
						<a href="filter.php"><img class="img-responsive" src="img/test.jpg" alt="">	
						 Додаткова категорія 2</a>	
					</div>
					<div class="col-sm-2 dodatkovaKategoria">
						<a href="filter.php"> <img class="img-responsive" src="img/test.jpg" alt="">	
						Додаткова категорія 3</a>	
					</div>
					<div class="col-sm-2 dodatkovaKategoria">
						<a href="filter.php"><img class="img-responsive" src="img/test.jpg" alt="">	
						 Додаткова категорія 4</a>	
					</div>
					<div class="col-sm-2 dodatkovaKategoria">
						<a href="filter.php"><img class="img-responsive" src="img/test.jpg" alt="">	
						 Додаткова категорія 5</a>	
					</div>
					<div class="col-sm-2 dodatkovaKategoria">
						<a href="filter.php"><img class="img-responsive" src="img/test.jpg" alt="">	
						 Додаткова категорія 6</a>	
					</div>
					
			
				</div>
			</div>
			<div class="col-sm-12 filterOption">	
				Сортировка:
				   <select id="sortingOption">
				    <option value="name">По імені</option>
				<!--     <option value="ask">Від дорогих до дешевих</option> -->
				    <option value="desk">Від дешевих до дорогих</option>
				   </select>
				   <div class="abzac"> </div>
					<span class="paginationO">1</span>
					<span class="paginationO">2</span>
					<span class="paginationO">3</span>
					<span class="paginationO">4</span>
					<span class="glyphicon 	glyphicon glyphicon-th blockOption "></span>
					<span class="glyphicon glyphicon glyphicon-th-list listOption"></span>
			</div>


				



			<div class="col-sm-12">
			
				  <div class="testList">

    
				<?php

        function getCatalog($url){
               $ch = curl_init(); 
                          // GET запрос указывается в строке URL 
                          curl_setopt($ch, CURLOPT_URL, $url); 
                          curl_setopt($ch, CURLOPT_HEADER, false);  
                         // curl_setopt($ch,CURLOPT_POSTFIELDS,$fields );
                          $data = curl_exec($ch); 
                          curl_close($ch); 
                           echo $data;
              }
			$url='https://web-store-sample-vs.herokuapp.com/web-store/catalog/'. $node;
              echo "<div class='productsList'>";
              getCatalog($url);
             echo "</div>";

	$url2='https://web-store-sample-vs.herokuapp.com/web-store/catalog/'. $node. '/products';
              echo "<div class='products'>";
              getCatalog($url2);
             echo "</div>";
       // echo $product;
          //   if ($product=='false'){
          //   $url='https://web-store-sample-vs.herokuapp.com/web-store/catalog/'. $node;
          //   echo "<div class='productsList'>";
          //     getCatalog($url);
          //   echo "</div>";

          // //echo  $product;
          //   }else{
          //     echo "<div class='productsList'>";
          //     $url='https://web-store-sample-vs.herokuapp.com/web-store/catalog/'. $node;
          //      getCatalog($url);
          //     echo "</div>";
          //     echo "<div class='products'>";
          //      $url='https://web-store-sample-vs.herokuapp.com/web-store/catalog/'. $node. '/products';
          //      getCatalog($url);
          //      echo "</div>";
          //    // $url='https://web-store-sample-vs.herokuapp.com/web-store/catalog/'. $node;
          //  // echo  $product;  echo  $product;
          //   }

           
            
           
					?>

      
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
  <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>



</body>

<script>
	





</script>
