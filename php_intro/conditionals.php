<!DOCTYPE html>

<html>

<head>
	
	<?php

		/*Hardcoded. Might normally come from a DB.*/
		$age = "18";
		if($age <= 12){
			$person_type = "Kiddo";
		}else if ($age > 12 AND $age <= 19){
			$person_type = "Teenagero";
		}else if ($age > 19 AND $age <= 80){
			$person_type = "Adulto";
		}else{
			$person_type = "Super wise-o";
		}
		
		
	?>

</head>

<body>
	
	<!--Use the @ symbol to suppress errors on the resolution of that variable-->
	The person is a <?=@$person_type?>
	
</body>

</html>