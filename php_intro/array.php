<!DOCTYPE html>

<html>

<head>

	<?php
		
		$contestants['Susan'] = "Winner";
		$contestants['Cruz'] = "Winner";
		$contestants['Vivian'] = "Loser";
		
		$winning_number = rand(1,3);
		
		foreach($contestants as $key => $contestant) {
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
	
	
	<!--This uses an alternative syntax where the ":" in the first statement is 'opens' the loop, and the "endforeach" statement closes the loop-->
	<? foreach($contestants as $key => $winner_or_loser): ?>
		<?=$key?> is a <?=$winner_or_loser?><br>
	<? endforeach; ?>
	
</body>

</html>