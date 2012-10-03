<!DOCTYPE html>

<html>

<head>
	<!--long form tag of PHP-->
	
	<!--NO HTML in PHP TAGS-->
	
	<!--ERRORS (kills app), WARNINGS and -->
	
	<?php
	
		$square = 4 * 4;
		
		//String variable
		$name = "Jeremy";
		$age = "36";
		
		//Int variable
		$age = 36;
		
		//Float
		$weight = 200.12;
		
		//Boolean (don't believe it's case sensitive)
		$loggedIn = FALSE;
		
		
		$quarter = .25;
		$dime = .10;
		$nickle = .05;
		$total = (4 * $quarter) + (5 * $dime) + (3 * $nickle);
		//echo $total;
		
	?>

</head>

<body>
	
	Total change: <?=$total?>
	The square of 4 is: <?=$square?>

	
</body>

</html>