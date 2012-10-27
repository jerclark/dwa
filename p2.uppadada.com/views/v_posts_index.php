<h2 style="text-align:center;">Recent Activity</h2>

	<? foreach($results as $next_post): ?>
	<div class="content_box">
		<?=$next_post['first_name']." ".$next_post['last_name']."<br>"?>
		<?=$next_post['text']."<br><br>"?>
	</div>
	<? endforeach; ?>
	

