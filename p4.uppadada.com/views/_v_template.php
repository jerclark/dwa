<!DOCTYPE html>
<!--THIS SERVES AS THE MASTER TEMPLATE FOR ALL PAGES IN OUR APPLICATION-->
<html>
<head>
	<title>Big Meals, No Whammies<?=@$title; ?></title>

	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />	
	
	
	<!-- JQUERY AND PLUGINS-->
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js"></script>
	<!--script src="/js/jquery-1.8.3.min.js"></script-->
	<script src="/js/jquery-ui-1.9.1.custom/js/jquery-ui-1.9.1.custom.js"></script>
	<link rel="stylesheet" type="text/css" href="/js/jquery-ui-1.9.1.custom/development-bundle/themes/base/jquery-ui.css"/>
	<script type="text/javascript" charset="utf-8" src="/DataTables/media/js/jquery.dataTables.js"></script>
	<script type="text/javascript" charset="utf-8" src="/js/jquery.jeditable.js"></script>
	<script type="text/javascript" charset="utf-8" src="/js/jquery.bgiframe-2.1.2.js"></script>
	<script type="text/javascript" charset="utf-8" src="/js/jquery.form.js"></script>
	

	<!--OTHER JS-->
	<script type="text/javascript" src="/js/p4.js"></script>
	
	
	<!--CSS-->
	<link rel="stylesheet" type="text/css" href="/css/p2.css"/>
	<link rel="stylesheet" type="text/css" href="/css/p4.css"/>
	<style type="text/css" title="currentStyle">
	    @import "/DataTables/media/css/demo_table.css";@import "/DataTables/media/css/header.ccss";
					@import "/DataTables/media/css/demo_table_jui.css";
					@import "/DataTables/examples/examples_support/themes/smoothness/jquery-ui-1.8.4.custom.css";
	
	    .ui-tabs-vertical { width: 55em; }
	    .ui-tabs-vertical .ui-tabs-nav { padding: .2em .1em .2em .2em; float: left; width: 12em; }
	    .ui-tabs-vertical .ui-tabs-nav li { clear: left; width: 100%; border-bottom-width: 1px !important; border-right-width: 0 !important; margin: 0 -1px .2em 0; }
	    .ui-tabs-vertical .ui-tabs-nav li a { display:block; }
	    .ui-tabs-vertical .ui-tabs-nav li.ui-tabs-active { padding-bottom: 0; padding-right: .1em; border-right-width: 1px; border-right-width: 1px; }
	    .ui-tabs-vertical .ui-tabs-panel { padding: 1em; float: right; width: 40em;}
	</style>

	<!-- Controller Specific JS/CSS -->
	<?php echo @$client_files; ?>


</head>

<body>
	
	<div id="wrapper" style="min-width:665px">
		
		<div id="masthead_wrapper">
			<div style="position:relative;padding-left:10px;">
				<div id="masthead_image" style="float:left;background-image:url('http://funniestcorner.com/wp-content/uploads/2012/09/21.jpg');"></div>
				<h1 id="masthead_text">B</h1>
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