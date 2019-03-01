<?php

// if (isset($_COOKIE["Authorization"]))

 //$i = (int) $_COOKIE["i"];
// echo "yryaaaaaaa";

?>


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
	<link rel="stylesheet" href="path/to/font-awesome/css/font-awesome.min.css">
	<script src="libs/jquery/jquery-2.1.4.min.js"></script>
</head>
<body>
	<!-- <?php 
	if (isset($_GET["url"]))

		{
		echo "uraaaaa!!!";


	 ?>	 -->



<!-- <?php
		 exit;}
?>	
 -->



		

	 
		<?php
		 require_once "header.php";
		?>
		
<div class="content">
		<?php
		//if (isset($_COOKIE["Authorization"])){
		 require_once "mainPage.php";

	//	}

		//else{
		//	 require_once "mainPage.php";
		// require_once "autorization.php";
		//}

		?>
</div>
	



	<footer>

	<?php
		 require_once "footer.php";
		?>

	</footer>


	
</body>
</html>
