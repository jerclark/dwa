<!DOCTYPE html>

<html>

<head>

	<?php
		
		$boxes="";
		for ($i=1;$i<=10;$i++){
			$boxes = $boxes."<div style='width:50px; height:50px; background-color:red;margin: 10px'></div>";
		}
		
		
	?>
	
	<style type="text/css">
		body { background-color: <?=$color?>}
	</style>

</head>

<body>
	
	<?=$boxes?>
	
	
</body>

</html>