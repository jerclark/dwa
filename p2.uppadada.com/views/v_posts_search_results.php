<h2>Recent Activity</h2>
<? foreach($results as $next_post): ?>
<div class="content_box">
	<div class="post_wrapper">
		<div class="profile_image" style="background-image:url('/profile_images/<?=$next_post['user_id']?>_profile.png');"></div>
		<span class="post_display_name"><?=$next_post['first_name']." ".$next_post['last_name']?></span>
		<span class="post_timestamp">planted this seed on: <?=$next_post['modified']?> GMT</span><br>
		<div class="post_text"><?=nl2br($next_post['text'])?></div>
	</div>
</div>
<? endforeach; ?>