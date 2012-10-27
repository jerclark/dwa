<h2 style="text-align:center;">Recent Activity</h2>

	<? foreach($results as $next_post): ?>
	<div class="content_box">
		<div class="post_wrapper">
			<span class="post_display_name"><?=$next_post['first_name']." ".$next_post['last_name']?></span>
			<span class="post_timestamp">planted this seed on: <?=$next_post['modified']?> GMT</span><br>
			<div class="post_text"><?=nl2br($next_post['text'])?></div>
		</div>
	</div>
	<? endforeach; ?>
	

