<h2>Recent Activity</h2>
<? foreach($results as $next_post): ?>
<div class="content_box">
	<div class="post_wrapper">
		
		<div style="display:table-cell;vertical-align:middle;">
			<div class="profile_image" style="float:left;background-image:url('/profile_images/<?=$next_post['user_id']?>_profile.png');"></div>
		</div>
		
		<div style="display:table-cell;vertical-align:middle;">
			<span class="post_display_name" style="display"><?=$next_post['first_name']." ".$next_post['last_name']?></span>
			&nbsp;
			<span class="post_timestamp">planted this seed on: <?=$next_post['modified']?> GMT</span>
		</div>
	</div>
	
	<div class="post_text" style="clear:left;"><?=nl2br($next_post['text'])?></div>
	
</div>
<? endforeach; ?>