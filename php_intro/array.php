<!DOCTYPE html>

<html>

<head>

	<?php
		
		
		print_r($_POST);
		
		$winning_number = rand(1,sizeof($contestants));
		
		$contestants = "";
		
		foreach($_POST as $key => $contestant) {
			$random_number = rand(1,3);
			if ($random_number == $winning_number){
				$contestants[$key] = "Winner";
			}else{
				$contestants[$key] = "Loser";
			}
		}
		
		
	?>
	
	
	
</head>

<body>
	
	<form method='POST' action='array.php'>
		<input type='text' name='contestant1'/><br>
		<input type='text' name='contestant2'/><br>
		<input type='text' name='contestant3'/><br>
		<input type="Submit"/>
	</form>
	
	
	<!--This uses an alternative syntax where the ":" in the first statement is 'opens' the loop, and the "endforeach" statement closes the loop-->
	<? foreach($contestants as $key => $winner_or_loser): ?>
		<?=$_POST[$key]?> is a <?=$winner_or_loser?><br>
	<? endforeach; ?>
	
</body>

</html>