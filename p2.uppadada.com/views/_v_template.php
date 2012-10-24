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

<body>
	
	<div id="wrapper">
		
		<div id="masthead_wrapper">
			<div style="position:relative;padding-left:10px;">
				<span id="masthead_text">
					<h1>Chestnut Tree Cafe</h1>
				</span>
			</div>
			<div id="masthead"></div>
			<?php if($user): ?>
				<a style="margin-left:3px;" href="/posts/index">recent activity</a>
				<a style="margin-left:3px;" href="/users/profile">profile</a>
				<a style="margin-left:3px;" href="/users/logout">logout</a>
			<?php endif;?>
			
		</div>

		<div id="content_wrapper">			
			<?=$content;?>
		</div>
		
	</div>

</body>
</html>