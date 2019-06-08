

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
		let promise = new Promise((resolve, reject) => {

		    refreshToken();
		    $('adminInfoBloc').append('<div id="AllOrders"></div>');
				$('adminInfoBloc').append('<div id="users"></div>');
				getAllOrders();
				getUsers();
		    resolve("result");

		});

		// promise.then навешивает обработчики на успешный результат или ошибку
		promise
		  .then(
		    result => {
		     


		  
		    },
		    error => {
		      // вторая функция - запустится при вызове reject
		    
		    }
		  );
	
	
	
</script>	
</body>
</html>
