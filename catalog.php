






<?php
error_reporting(0);


$categoria = htmlspecialchars($_GET["categoria"]);


?>

<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8" />
	<title><?php echo "Категорія " . $categoria ?></title>
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
	<link rel="stylesheet" href="css/reset.css" />
	<link rel="stylesheet" href="libs/bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" href="scss/application.css" />
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.9/css/all.css" integrity="sha384-5SOiIsAziJl6AWe0HWRKTXlfcSHKmYV4RBF18PPJ173Kzn7jzMyFuTtk8JA7QQG1" crossorigin="anonymous">
	<link rel="stylesheet" href="path/to/font-awesome/css/font-awesome.min.css">
	<script src="libs/jquery/jquery-2.1.4.min.js"></script>
</head>
<body id=<?php echo "Категорія" . $categoria ?>>

<?php include 'header.php'; ?>
<div class="content">
	<div class="container">

		<?php
include 'breadcrumbs.php'; ?>

	<div class="catalog">
<?php
 
switch($categoria)
{
	case 1:
      include 'categoriya1.php'; 
      break;
	case 2:
      include 'categoriya2.php'; 
      break;
	case 3:
      include 'categoriya3.php'; 
      break;
    case 4:
      include 'categoriya4.php'; 
      break;
    case 5:
      include 'categoriya5.php'; 
      break;
    case 6:
      include 'categoriya6.php'; 
      break;
    case 7:
      include 'categoriya7.php'; 
      break;
    case 8:
      include 'categoriya8.php'; 
      break;



	default:		 
      echo ("wrong get parameter");
} 


?>

</div>
</div>
</div>
<footer>
<?php	
include 'footer.php'; 
?>

</footer>
</body>
</html>