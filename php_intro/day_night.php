<!DOCTYPE html>

<html>

<head>

	<?php
	
		$hour = date('G');
		$color = "blue";
		if ($hour >= 20 OR $hour < 8){
			$color = "black";
		}
		
		
	?>
	
	<style type="text/css">
		body { background-color: <?=$color?>}
	</style>

</head>

<body>
	
	

	
</body>

</html>