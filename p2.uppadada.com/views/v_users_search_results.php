<div class="content_box">
	
	<h2>Search Results:<h2>
		
	<? foreach($results as $next_result): ?>
		<?=$next_result['first_name']?>&nbsp;<?=$next_result['last_name']?>&nbsp;&nbsp;
		<?='<a href="/users/subscribe/'.$next_result['user_id'].'">Follow</a><br>'?>
	<? endforeach; ?>	
	
	
</div>