<!--Wrapper-->

<div style="border:3px solid gray;margin-top:10px;padding:20px;	min-width:850px;border-radius:20px;">

	<div style="align:center;width:100%;margin:auto;min-width:850px;">
	
	
		<div id="mm_testcase_table_wrapper" class="mm_table_wrapper">
	
			<table id="mm_testcase_table" class="display">
			</table>
		
			<button type='button' onclick="gApp.testcaseController.addTestcase()">Add</button>
			<button type='button' onclick="gApp.testcaseController.removeTestcase()">Remove</button>
		
	
		</div>
	
		<div id="mm_parameter_table_wrapper" class="mm_table_wrapper">
		
			<table id="mm_parameter_table" class="display">
			</table>
		
			<button type='button' onclick="gApp.parameterController.addParameter()">Add</button>
			<button type='button' onclick="gApp.parameterController.removeParameter()">Remove</button>
		
		</div>
	
		<div id="mm_value_table_wrapper" class="mm_table_wrapper">
	
			<table id="mm_value_table" class="display">
			</table>
		
			<button type='button' onclick="gApp.valueController.addValue()">Add</button>
			<button type='button' onclick="gApp.valueController.removeValue()">Remove</button>
	
		</div>
		
		<div id="mm_table_anchor" style="clear:both;"></div>
	
	</div>
	
	
	<div id="mm_matrix_wrapper" class="mm_matrix_wrapper">
	
		<div id="mm_matrix_content">
		</div>
		
		<div id="mm_matrix_anchor" style="clear:both;"></div>
		
	</div>
	
	
	
	
</div>