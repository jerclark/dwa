<div class="content_box">
		
	<? foreach($results as $next_result): ?>
		<div class='search_result_wrapper'>
			<div class="profile_image" style="background-image:url('/profile_images/<?=$next_result['user_id']?>_profile.png');"></div>
			<?=$next_result['first_name']?>&nbsp;<?=$next_result['last_name']?>&nbsp;&nbsp;
			<? if(isset($connections[$next_result['user_id']])): ?>
				<?='<a href="/subscriptions/destroy/'.$next_result['user_id'].'">Unfollow</a><br>'?>
			<? else: ?>
				<?='<a href="/subscriptions/create/'.$next_result['user_id'].'">Follow</a><br>'?>
			<? endif; ?>
		</div>	
	<? endforeach; ?>
	
	
</div>