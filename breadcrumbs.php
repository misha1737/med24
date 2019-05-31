<div class="breadcrumbs">
	<a href="index.php">
			Головна
	</a> > 
	<span id='breadcrumbs'>
	<span class="thisPage"></span>
	</span>
</div>

<script>
	var title=$("body").attr("id");
	$(".breadcrumbs .thisPage").append(title);
	console.log(title);

</script>