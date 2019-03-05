






<?php
error_reporting(0);


$categoria = htmlspecialchars($_GET["categoria"]);


?>

<?php
     require_once "head.php";
    ?>
    
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