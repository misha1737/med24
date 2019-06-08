
<?php
    $node = htmlspecialchars($_GET["nodeId"]);
     $product = htmlspecialchars($_GET["product"]);


    ?>

<?php
		 require_once "head.php";
		?>
<body >

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
				<!-- <h4>Категорія</h4>	
				<form class="categoria">

			 -->
			 <?php echo "<div class='catalogLeftMenu'></div>"; ?>
			<div class="pdcatalog">
		
		 </div>


<br>	

				</form>

			</div>

			<div class="col-sm-9">


			<div class="col-sm-12">
				<div class="allCatalog">

					<div class="zagolovokFilter col-sm-12">Каталог</div>	
			
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
              if($node=='all'){
			$url='https://web-store-sample-vs.herokuapp.com/web-store/catalog/';
              }else{

			$url='https://web-store-sample-vs.herokuapp.com/web-store/catalog/'. $node. '/sub-categories';

				}
              echo "<div class='productsList load'>";
              getCatalog($url);
             echo "</div>";
             echo "<div class='productsList2'></div>";
             echo "<div class='productsList3'></div>";
             $page=0;
             $page='name';
	$url2='https://web-store-sample-vs.herokuapp.com/web-store/catalog/'. $node. '/products' .'?page='.$page.'&size=2'.'&sort='.$sortParam;
             

           
					?>
			
				</div>
			</div>
			<div class="col-sm-12 filterOption " style='display:none'>	
				Сортировка:
				   <select class="prosort" id="sortingOption">
				    <option value="name">По імені</option>
				<!--     <option value="ask">Від дорогих до дешевих</option> -->
				    <option value="desk">Від дешевих до дорогих</option>
				   </select>
				   <div class="abzac"> </div>
					 <span id="pagesPagination">
					
					</span>
					<span class="glyphicon 	glyphicon glyphicon-th blockOption "></span>
					<span class="glyphicon glyphicon glyphicon-th-list listOption"></span>
			</div>


				



			<div class="col-sm-12">
			
				  <div class="allCatalog">

    			<?php
				 echo "<div class='products load'>";
             // getCatalog($url2);
             	echo $node ;
             echo "</div>";
          	echo "<div class='node' style='display:none'>";
             echo $node ;
             echo "</div>";
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
