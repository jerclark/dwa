<!--THIS SERVES AS THE MASTER TEMPLATE FOR ALL PAGES IN OUR APPLICATION-->

<!DOCTYPE html>
<html>
<head>
	<title>Chestnut Tree Cafe - <?=@$title; ?></title>

	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />	
	
	<!-- JS -->
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js"></script>
	<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.8.23/jquery-ui.min.js"></script>
				
	<!-- Controller Specific JS/CSS -->
	<script type="text/javascript" src="/js/p2.js"></script>
	<link rel="stylesheet" type="text/css" href="/css/p2.css"/>
	<?php echo @$client_files; ?>
	
	

</head>

<body onlaod="initPage()">
	
	<div id="wrapper" style="min-width:600px">
		
		<div id="masthead_wrapper" onclick="window.location='/index/index'">
			<div style="position:relative;padding-left:10px;">
				<span id="masthead_text">
					<h1><a href="/index/index">Chestnut Tree Cafe</a></h1>
				</span>
			</div>
			<div id="masthead"></div>
			<? if(isset($flash_error)): ?>
				<div id="flash_error">
					<?=$flash_error?>
				</div>
			<? endif; ?>
			<? if(isset($flash_msg)): ?>
				<div id="flash_msg">
					<?=$flash_msg?>
				</div>
			<? endif; ?>
			<?php if($user): ?>
				<div id='toolbar_wrapper'>
					Welcome, <?=$user->first_name?>!</span>
					<a class="navbar_link" href="/posts/create">create a post</a>
					<a class="navbar_link" href="/posts/index">view posts</a>
					<a class="navbar_link" href="/users/search">connect</a>
					<a class="navbar_link" href="/users/profile">profile</a>
					<a class="navbar_link" href="/users/logout">logout</a>
				</div>
			<?php endif;?>
			
		</div>

		<div id="content_wrapper">			
			<?=$content;?>
		</div>
		
	</div>

</body>
</html>