<!--NOTES-->
<br>
<i><small>Compatibility Note: Has been tested with Chrome (Version 23.0.1271.64), Firefox (16.0.2), Safari (5.1.7) and IE 9 (9.0.8112.16421). Safari has some slight usage issues, and IE8 or earlier will not work.</small></i>
<br><br>
<small>Click here to see the <a href="http://p3.uppadada.com">original proposal</a>, which includes some background and usage information. This implementation below is not exactly as specified in the original proposal, but I believe the spirit of the original proposal is captured. There is NO persistence in this implementation. Once you leave the page, your entered data will be lost.</small>


<!--Wrapper-->
<div style="border:3px solid gray;margin-top:10px;padding:20px;	min-width:1100px;border-radius:20px;">


	<!--TABLE CONTENT-->

	<div class="mm_content_layout_header"><h3>Testcase Configuration</h3></div>
	
	<div>
		<div class="mm_table_step_text"><i><small>Step 1: Add testcases. For example, you might enter "Checkout", to test a shopping basket app.</small></i></div>
		<div style="float:left;padding-left:10px;vertical-align:middle;">
			<img src="/images/right_arrow.png" width="20px" height="20px"/>
		</div>
		<div class="mm_table_step_text" style="margin-bottom:10px;margin-left:15px;"><i><small>Step 2: Add parameters. For example, you might enter "Credit Card Type" and "Discount" in our "Checkout" example.</small></i></div>
		<div style="float:left;padding-left:10px;vertical-align:middle;">
			<img src="/images/right_arrow.png" width="20px" height="20px"/>
		</div>
		<div class="mm_table_step_text" style="margin-bottom:10px;margin-left:15px;"><i><small>Step 3: Add values. For example, you might enter "Visa", "Master Card" and "AmEx" for "Credit Card Type", and "10%" and "20%" for "Discount".</small></i></div>
	</div>
	

	<div id="mm_table_wrapper_wrapper" style="clear:both;align:center;width:100%;margin:auto;min-width:850px;border:none;background-color:white;border-radius:15px;">
			
		<div id="mm_testcase_table_wrapper" class="mm_table_wrapper">
				
			<table id="mm_testcase_table" class="display">
			</table>
		
			<div>
				<button id="mm_testcase_add_button" type='button' onclick="gApp.testcaseController.addTestcase()">Add</button>
				<button type='button' onclick="gApp.testcaseController.removeTestcase()">Remove</button>
			</div>
						
		</div>
		
		
		<div style="float:left;padding-left:10px;vertical-align:middle;">
			<img src="/images/spacer.png" width="20px" height="40px"/>
		</div>
	
		<div id="mm_parameter_table_wrapper" class="mm_table_wrapper">
		
			<table id="mm_parameter_table" class="display">
			</table>
		
			<div>
			<span style="float:left;display:none;"><input hidden="true" type="text" id="mm_parameter_input_name" placeholder="Enter Parameter Name" onkeyup="gApp.parameterController.detectInputNameKeypress()"/></span>
			<button type='button' id="mm_parameter_add_button" onclick="gApp.parameterController.addParameter()">Add</button>
			<button type='button' onclick="gApp.parameterController.removeParameter()">Remove</button>
			</div>
			
		</div>
		
		
		<div style="float:left;padding-left:10px;vertical-align:middle;">
			<img src="/images/spacer.png" width="20px" height="40px"/>
		</div>
	
		<div id="mm_value_table_wrapper" class="mm_table_wrapper">
	
			<table id="mm_value_table" class="display">
			</table>
		
			<div>
				<span style="float:left;display:none;"><input hidden="true" type="text" id="mm_value_input_name" placeholder="Enter Value Name" onkeyup="gApp.valueController.detectInputNameKeypress()"/></span>
				<button type='button' id="mm_value_add_button" onclick="gApp.valueController.addValue()">Add</button>
				<button type='button' onclick="gApp.valueController.removeValue()">Remove</button>
			</div>
		</div>
		
		<div id="mm_table_anchor" style="clear:both;"></div>
	
	</div>
	
	
	
	
	

	
	
	<!--MATRIX CONTENT-->
	
	<br>
	
	<div id="mm_testcase_matrix_header" class="mm_content_layout_header"><h3>Testcase Matrix</h3></div>
	
	<div style="margin-top:30px;clear:both;">
		<i><small>Step 4: Track results. Hover over cell to see testcase information. Click cell to log pass/fail result. Option-Click cell to select/deselect cell. Right-Click cell to edit expected result.</small></i>
	</div>
	
	
	<div id="mm_matrix_wrapper" class="mm_matrix_wrapper">
		
		
		<div id="mm_matrix_stats_wrapper" style="margin-left:30px;border-radius:15px;float:left;">
		
			<div id="mm_testcase_matrix_stats" style="float:left;text-align:right;margin:auto;margin-left:15px;border-radius:5px;">
				<span id="mm_matrix_total_stat_label">Total Testcases:</span><br>
				<span id="mm_matrix_executed_stat_label">% Executed:</span><br>
				<span id="mm_matrix_passed_stat_label">% Passed:</span><br>
				<span id="mm_matrix_failed_stat_label">% Failed:</span><br>				
			</div>
		
		
			<div id="mm_testcase_matrix_stats" style="float:left;text-align:left;margin:auto;margin-left:15px;border-radius:5px;">
				<span id="mm_matrix_total_stat_value"></span><br>
				<span id="mm_matrix_executed_stat_value"></span><br>
				<span id="mm_matrix_passed_stat_value"></span><br>
				<span id="mm_matrix_failed_stat_value"></span>					
			</div>
			
		</div>
		
		
		<!--button type='button' onclick="gApp.matrixController.editSelectedCellsMetadata()">Edit Expected Result For Selected Cell(s)</button-->
		
		<div id="mm_matrix_content">
			<div id="mm_matrix_placeholder" style="border:2px solid gray;background:white;padding:20px;height:50px;border-radius:15px;">
				<span style="color:gray;align:center;margin:auto;"><i>Create a testcase to plot cells in the matrix!</i></span>
			</div>
		</div>
		
		<div id="mm_matrix_anchor" style="clear:both;"></div>

	</div>
	
	
	<div id="mm_context_menu">
		<div id="mm_cell_edit_expected_result_menu_item" onclick="gApp.matrixController.editExpectedResultForCell()">Edit Expected Result For This Cell</div>
		<div class="mm_menu_separator"></div>
		<div id="mm_selected_cells_edit_expected_results_menu_item" onclick="gApp.matrixController.editExpectedResultForSelectedCells()">Edit Expected Result For Selected Cells</div>
		<div class="mm_menu_separator"></div>
		<div id="mm_select_all_cells_menu_item" onclick="gApp.matrixController.selectAllCells()">Select All Cells</div>
		<div class="mm_menu_separator"></div>
		<div id="mm_clear_selection_menu_item" onclick="gApp.matrixController.clearSelection()">Clear Selection</div>
	</div>
	
	
	
	
</div>