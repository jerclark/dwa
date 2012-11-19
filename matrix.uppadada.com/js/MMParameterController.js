function MMParameterController(){

	//Setup the row selection handler
	$('body').on( 'click', '#mm_parameter_table tbody tr', function( e ) {
        
		var selectedId = this.id;
		var oSelectedParameter = $(gApp.parameterController.testcase.parameters).filter(function(){
			return (this.id == selectedId);
		})[0];

		if (gApp.parameterController.selectedParameter() != oSelectedParameter && oSelectedParameter.id != ""){	
				
			//Set the selected parameter
			//gApp.parameterController.selectedParameter = oSelectedParameter;

			//Load the corresponding parameter data set
			gApp.valueController.loadDataForParameter(oSelectedParameter);
						
		}	

	});
	
	this.dataTable = $('#mm_parameter_table').dataTable({
		
		"bDestroy": true,
		
		"sScrollY": "90px",
		
		"bPaginate": false,
		
		"aaData": [],
		
		"bJQueryUI": true,
		
		"aoColumns": [
					{ "mData":"name","sClass":"name","sTitle": "Parameter" }
				]
		
	});
	
	this.testcase = null;
		
}


MMParameterController.prototype.selectedParameter = function(){
	return this.dataTable._('.row_selected');
}


MMParameterController.prototype.addParameter = function(){
	
	//Make sure a testcase is selected
	if (this.testcase == null){
		alert("Please selected a testcase!");
		return;
	}
	
	//Create a new parameter
	var newParameter = new MMParameter();
	this.dataTable.fnAddData( newParameter );
	gApp.testcaseController.selectedTestcase.parameters = this.dataTable.fnGetData();
	
	//Select the new parameter, and create a default value
	$('#' + newParameter.id).click();
	gApp.valueController.addValue();
	
	
	//Tell the testcase to recalculate the matrix cells
	gApp.testcaseController.selectedTestcase.matrixCells = [];
	gApp.testcaseController.selectedTestcase.updateCells();
	
	return newParameter.id;
	
}


MMParameterController.prototype.removeParameter = function(){
	
	//Make sure a testcase is selected
	if (this.testcase == null){
		alert("Please selected a testcase!");
		return;
	}
	
	//Get the index of the selected value row
	var oSelectedRows = this.dataTable.$('.row_selected');
	
	//If there's a selected row
	if (oSelectedRows.length > 0){
		
		//Get the index of the selected row
		var oSelectedRow = oSelectedRows[0];
		var iSelectedIndex = this.dataTable.fnGetPosition(oSelectedRow);
	
		//Remove the value from the table
		this.dataTable.fnDeleteRow( iSelectedIndex );
		
		//Clear the value table
		gApp.valueController.dataTable.fnClearTable();
	
		//Set the parent parameter's values to the table data
		gApp.testcaseController.selectedTestcase.parameters = this.dataTable.fnGetData();
			
		//Tell the testcase to recalculate the matrix cells
		gApp.testcaseController.selectedTestcase.matrixCells = [];
		gApp.testcaseController.selectedTestcase.updateCells();
		
	}
		
}




MMParameterController.prototype.loadDataForTestcase = function(oTestcase){
	
	//Set the testcase
	this.testcase = oTestcase;
	
	//Now load the data into the Parameter table
	this.dataTable = $('#mm_parameter_table').dataTable({
		
		"bDestroy": true,
		
		"sScrollY": "90px",
		
		"bPaginate": false,
		
		"aaData": oTestcase.parameters,
		
		"bJQueryUI": true,
		
		"aoColumns": [
					{ "mData":"name","sClass":"name","sTitle": "Parameter" }
				],
				
		"fnCreatedRow": function (nRow, aData, iDataIndex) {
						var oData = aData;
					  	$('td', nRow).editable( function(value, settings){
							oData[this.classList[0]] = value; //this.classList[0] is the the TD class which it gets from the column definition 
							
							//Update the testcase parameters to include the new name
							gApp.parameterController.testcase.parameters = gApp.parameterController.dataTable.fnGetData();
							
							//Update the cells
							gApp.parameterController.testcase.updateCells();
							return value;
						}, 
						{	
			                "height": "14px",
							event: "dblclick",
							onblur: "submit"
			            } );
			        },
			
		
		
		
	});
	
}