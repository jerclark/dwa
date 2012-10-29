<div class="content_box">
		
	<? foreach($results as $next_result): ?>
		<div class='search_result_wrapper'>
			
			<div style="display:table-cell;vertical-align:middle;">
				<div class="profile_image" style="background-image:url('/profile_images/<?=$next_result['user_id']?>_profile.png');"></div>
			</div>
			
			<div style="border-left:20px;display:table-cell;vertical-align: middle;">
				<span class="post_display_name" style="margin-right:10px;"><?=$next_result['first_name']?>&nbsp;<?=$next_result['last_name']?></span>
			</div>
			
			<div style="border-left:50px;display:table-cell;vertical-align: middle;">
				<? if(isset($connections[$next_result['user_id']])): ?>
					<?='<a style="float:left;" href="/subscriptions/destroy/'.$next_result['user_id'].'">Unfollow</a><br>'?>
				<? else: ?>
					<?='<a style="float:left;" href="/subscriptions/create/'.$next_result['user_id'].'">Follow</a><br>'?>
				<? endif; ?>
			</div>
			
		
		</div>	
	<? endforeach; ?>
	
	
</div>