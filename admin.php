

<?php
		 require_once "head.php";
		?>
<body>


		

	 
		<?php
		 require_once "header.php";
		?>
		
<div class="content admin">
	<div class="container">
		<div class="row">
		<div class="col-sm-3">
			<ul class="adminNav">	
				<li id="zamovlenyaButton" class="active">	
					Замовлення	
				</li>
				<li id="usersButton" >	
					Користувачі
				</li>
			</ul>
		</div>
			<div class="col-sm-9">
					<div class="adminInfoBlock">	
						<div id="AllOrders">
						


						</div>
						<div id="users">
						


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
<script>
getAllOrders();
getUsers();
</script>	
</body>
</html>
