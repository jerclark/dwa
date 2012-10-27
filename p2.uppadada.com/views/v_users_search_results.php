<div class="content_box">
	
	<h2>Search Results:<h2>
		
	<? foreach($results as $next_result): ?>
		<?=$next_result['first_name']?>&nbsp;<?=$next_result['last_name']?>&nbsp;&nbsp;
		<? if(isset($connections[$next_result['user_id']])): ?>
			<?='<a href="/subscriptions/destroy/'.$next_result['user_id'].'">Unfollow</a><br>'?>
		<? else: ?>
			<?='<a href="/subscriptions/create/'.$next_result['user_id'].'">Follow</a><br>'?>
		<? endif; ?>
	<? endforeach; ?>	
	
	
</div>