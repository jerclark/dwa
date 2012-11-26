<!DOCTYPE html>
<!--THIS SERVES AS THE MASTER TEMPLATE FOR ALL PAGES IN OUR APPLICATION-->
<html>
<head>
	<title>Matrix Master</title>

	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />	
	
	<!-- JQUERY-->
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js"></script>
	<!--script src="/js/jquery-1.8.3.min.js"></script-->
	<script src="/js/jquery-ui-1.9.1.custom/js/jquery-ui-1.9.1.custom.js"></script>
	<link rel="stylesheet" type="text/css" href="/js/jquery-ui-1.9.1.custom/development-bundle/themes/base/jquery-ui.css"/>
	
	<!-- JS -->			
	<script type="text/javascript" charset="utf-8" src="/DataTables/media/js/jquery.dataTables.js"></script>
	<script type="text/javascript" charset="utf-8" src="/js/jquery.jeditable.js"></script>
	<script type="text/javascript" charset="utf-8" src="/js/jquery.bgiframe-2.1.2.js"></script>
	
	<script type="text/javascript" charset="utf-8" src="/js/MMApp.js"></script>
	<script type="text/javascript" charset="utf-8" src="/js/MMTestcase.js"></script>
	<script type="text/javascript" charset="utf-8" src="/js/MMParameter.js"></script>
	<script type="text/javascript" charset="utf-8" src="/js/MMValue.js"></script>
	<script type="text/javascript" charset="utf-8" src="/js/MMTestcaseController.js"></script>
	<script type="text/javascript" charset="utf-8" src="/js/MMParameterController.js"></script>
	<script type="text/javascript" charset="utf-8" src="/js/MMValueController.js"></script>
	<script type="text/javascript" charset="utf-8" src="/js/MMMatrixController.js"></script>
	<script type="text/javascript" charset="utf-8" src="/js/MMMatrixCell.js"></script>
	<script type="text/javascript" charset="utf-8" src="/js/MMListCombiner.js"></script>
	
	
	<!-- CSS -->
	<link rel="stylesheet" type="text/css" href="/css/flip.css"/>
	<style type="text/css" title="currentStyle">
	    @import "/DataTables/media/css/demo_table.css";@import "/DataTables/media/css/header.ccss";
					@import "/DataTables/media/css/demo_table_jui.css";
					@import "/DataTables/examples/examples_support/themes/smoothness/jquery-ui-1.8.4.custom.css";
	</style>
	
				
	<!-- Controller Specific JS/CSS -->

	<?php echo @$client_files; ?>
	

	
	

</head>

<body>

	<div id="metadata-form-div" title="">
	    <form id="metadata-form-form">
	    </form>
	</div>

	
	<div id="wrapper" style="min-width:665px;">
		
		<div id="masthead_wrapper">
			<div style="position:relative;padding-left:10px;">
				<div id="masthead_image" style="float:left;background-image:url('/images/matrix.jpg');"></div>
				<h1 id="masthead_text">Matrix Master</h1>
			</div>
			<div id="masthead"></div>			
		</div>

		<div id="content_wrapper">			
			<?=$content;?>
		</div>
		
	</div>
	
	

	
		

</body>
</html>