<!DOCTYPE html>
<!--THIS SERVES AS THE MASTER TEMPLATE FOR ALL PAGES IN OUR APPLICATION-->
<html>
<head>
	<title>Big Meals, No Whammies<?=@$title; ?></title>

	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />	
	
	<!-- JS -->
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js"></script>
	<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.8.23/jquery-ui.min.js"></script>
				
	<!-- Controller Specific JS/CSS -->
	<script type="text/javascript" src="/js/p4.js"></script>
	<link rel="stylesheet" type="text/css" href="/css/p2.css"/>
	<link rel="stylesheet" type="text/css" href="/css/p4.css"/>
	<?php echo @$client_files; ?>
	
	

</head>

<body>
	
	<div id="wrapper" style="min-width:665px">
		
		<div id="masthead_wrapper">
			<div style="position:relative;padding-left:10px;">
				<div id="masthead_image" style="float:left;background-image:url('http://funniestcorner.com/wp-content/uploads/2012/09/21.jpg');"></div>
				<h1 id="masthead_text">Big Meals, No Whammies</h1>
			</div>
			<div id="masthead"><a href="/index/index"><span id="masthead_link"></span></a></div>
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