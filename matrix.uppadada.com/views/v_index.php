<!--Wrapper-->

<div style="border:3px solid gray;margin-top:10px;padding:20px;	min-width:850px;border-radius:20px;">

	<div style="align:center;width:100%;margin:auto;min-width:850px;border:1px solid darkgray;background-color:#EEEEEE;border-radius:15px;">
	
	
		<div id="mm_testcase_table_wrapper" class="mm_table_wrapper">
	
			<table id="mm_testcase_table" class="display">
			</table>
			
			<div>
			<span style="float:left;display:none;"><input type="text" id="mm_testcase_input_name" placeholder="Enter Testcase Name" onkeyup="gApp.testcaseController.detectInputNameKeypress()"/></span>
			<button id="mm_testcase_add_button" type='button' onclick="gApp.testcaseController.addTestcase()">Add</button>
			<button type='button' onclick="gApp.testcaseController.removeTestcase()">Remove</button>
			</div>
				
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
	
		<div id="mm_value_table_wrapper" class="mm_table_wrapper">
	
			<table id="mm_value_table" class="display">
			</table>
		
			<div>
			<span style="float:left;display:none;"><input hidden="true" type="text" id="mm_value_input_name" placeholder="Enter Value Name" onkeyup="gApp.valueController.detectInputNameKeypress()"/></span>
			<button type='button' id="mm_value_add_button" onclick="gApp.valueController.addValue()">Add</button>
			<button type='button' onclick="gApp.valueController.removeValue()">Remove</button>
				
		</div>
		
		<div id="mm_table_anchor" style="clear:both;"></div>
	
	</div>
	
	
	<div id="mm_matrix_wrapper" class="mm_matrix_wrapper">
		
		<button type='button' onclick="gApp.matrixController.editSelectedCellsMetadata()">Edit Expected Result For Selected Cell(s)</button>
		
		<div id="mm_matrix_content">
			<div id="mm_matrix_placeholder" style="border:2px solid gray;background:white;padding:20px;height:50px;border-radius:15px;">
				<span style="color:gray;align:center;margin:auto;"><i>Create a testcase to plot cells in the matrix!</i></span>
			</div>
		</div>
		
		<div id="mm_matrix_anchor" style="clear:both;"></div>
		
	</div>
	
	
	<div id="mm_context_menu">
		<div id="mm_cell_edit_expected_result_menu_item" onclick="gApp.matrixController.editExpectedResultForCell()">Edit Expected Result For Cell</div>
	</div>
	
	
	
	
</div>