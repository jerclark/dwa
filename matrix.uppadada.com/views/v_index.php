<!--Wrapper-->

<div style="border:3px solid gray;margin-top:10px;padding:20px;	min-width:850px;border-radius:20px;">


	<!--TABLE CONTENT-->

	<div class="mm_content_layout_header"><h3>Testcase Configuration</h3></div>
	
	<div>
		<div style="width:334px;padding-left:0px;float:left;"><i>Step 1: Add testcases. Double-click the name to edit.</i></div>
		<div style="float:left;padding-left:10px;vertical-align:middle;">
			<img src="/images/right_arrow.png" width="20px" height="40px"/>
		</div>
		<div style="width:334px;padding-left:0px;float:left;margin-left:15px;"><i>Step 2: Add parameters. Double-click the name to edit.</i></div>
		<div style="float:left;padding-left:10px;vertical-align:middle;">
			<img src="/images/right_arrow.png" width="20px" height="40px"/>
		</div>
		<div style="width:334px;padding-left:0px;float:left;margin-left:15px;"><i>Step 3: Add values. Double-click the name to edit. Check "optional" to dim cells.</i></div>
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
	
	<div style="margin-top:30px;">
		<i>Step 4: Track results. Hover over cell to see testcase information. Click cell to log pass/fail result. Right-Click cell to edit expected result. (NOTE: You can select a row from the values table above to select and edit multiple expected results at once)</i>
	</div>
	
	<div id="mm_matrix_wrapper" class="mm_matrix_wrapper">
		
		<div id="mm_testcase_matrix_header" class="mm_content_layout_header"><h3>Testcase Matrix</h3></div>
		
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
		<div style="border:1px solid black;margin-top:5px;margin-bottom:5px;"></div>
		<div id="mm_cells_edit_expected_results_menu_item" onclick="gApp.matrixController.editExpectedResultForSelectedCells()">Edit Expected Result For Selected Cells</div>
	</div>
	
	
	
	
</div>