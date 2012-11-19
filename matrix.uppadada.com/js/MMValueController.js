function MMValueController(){

	//Setup the row selection handler
	$('body').on( 'click', '#mm_value_table tbody tr', function( e ) {
        	
		var oSelectedValue = gApp.valueController.dataTable._('#' + this.id)[0];

		if (gApp.valueController.selectedValue != oSelectedValue && oSelectedValue.id != ""){	

			//Set the selected value
			gApp.valueController.selectedValue = oSelectedValue;

		}	

	});
	
	//this.dataTable = //Now load the data into the Parameter table
	this.dataTable = $('#mm_value_table').dataTable({
		
		"bDestroy": true,
		
		"sScrollY": "90px",
		
		"bPaginate": false,
		
		"aaData": [],
		
		"bJQueryUI": true,
		
		"aoColumns": [
					{ "mData":"name","sClass":"name","sTitle": "Value" },
					{ "mData":"optional","sClass":"optional","sTitle": "Optional" }
				]
		
	});
	
	this.parameter = null;
	
	this.selectedValue = {};
	
}


MMValueController.prototype.addValue = function(){
	
	//Make sure a parameter is selected
	if (gApp.parameterController.selectedParameter().length == 0){
		alert("Please selected a parameter!");
		return;
	}
	
	//Create a new parameter
	var newValue = new MMValue(gApp.parameterController.selectedParameter()[0].id);
	
	//Add it to the table
	this.dataTable.fnAddData( newValue );
	
	//Set the parent parameter's values to the table data
	//this.parameter.values.push(newValue);
	this.parameter.values = this.dataTable.fnGetData();
	
	//Create new matrix cells for the selected testcase
	gApp.testcaseController.selectedTestcase.updateCells();
	
	return newValue.id;
	
	
}


MMValueController.prototype.removeValue = function(){
	
	//Make sure a parameter is selected
	if (gApp.parameterController.selectedParameter().length == 0){
		alert("Please selected a parameter!");
		return;
	}
	
	//Get the index of the selected value row
	var oSelectedRows = this.dataTable.$('.row_selected');
	
	//If there's a selected row
	if (oSelectedRows.length > 0){
		
		var oSelectedRow = oSelectedRows[0];
		var iSelectedIndex = this.dataTable.fnGetPosition(oSelectedRow);
	
		//Remove the value from the table
		this.dataTable.fnDeleteRow( iSelectedIndex );
	
		//Set the parent parameter's values to the table data
		//this.parameter.values.push(newValue);
		this.parameter.values = this.dataTable.fnGetData();
	
		//Remove the cells
		gApp.testcaseController.selectedTestcase.pruneCells(oSelectedRow.id);
		
	}
		
}




MMValueController.prototype.loadDataForParameter = function(oParameter){
	
	//Set the testcase
	this.parameter = oParameter;
	
	//Now load the data into the Parameter table
	this.dataTable = $('#mm_value_table').dataTable({
		
		"bDestroy": true,
		
		"sScrollY": "90px",
		
		"bPaginate": false,
		
		"aaData": oParameter.values,
		
		"bJQueryUI": true,
		
		"aoColumns": [
					{ "mData":"name","sClass":"name","sTitle": "Value" },
					{ "mData":"optional","sClass":"optional","sTitle": "Optional" }
				],
				
		"fnCreatedRow": function (nRow, aData, iDataIndex) {
						var oData = aData; 
					  	$('td', nRow).editable( function(value, settings){
							oData[this.classList[0]] = value; //this.classList[0] is the the TD class which it gets from the column definition 
							gApp.valueController.parameter.values = gApp.valueController.dataTable.fnGetData();
							gApp.parameterController.testcase.updateCells();
							return value;
						}, 
						{	
			                "height": "14px",
							event: "dblclick",
							onblur: "submit"
			            } );
			        }
		
		
		
	});
	
}
