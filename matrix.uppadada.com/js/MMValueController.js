function MMValueController(){

	//Setup the row selection handler
	$('body').on( 'click', '#mm_value_table tbody tr td[class!="optional"]', function( e ) {
       
		var oSelectedValue = gApp.valueController.dataTable._('#' + this.parentElement.id)[0];

		if (gApp.valueController.selectedValue != oSelectedValue && oSelectedValue.id != ""){	

			//Set the selected value
			gApp.valueController.selectedValue = oSelectedValue;
			
			//Highlight all cells associated with that value
			gApp.parameterController.testcase.updateCells();
			
		}	

	});
	
	//this.dataTable = //Now load the data into the Parameter table
	this.dataTable = $('#mm_value_table').dataTable({
		
		"bFilter": false,
		
		"bInfo": false,
		
		"bDestroy": true,
		
		"sScrollY": "180px",
		
		"bPaginate": false,
		
		"aaData": [],
		
		"bJQueryUI": true,
		
		"aoColumns": [
					{ "mData":"name","sClass":"name","sTitle": "Values" },
					{ "mData":"optional","sClass":"optional","sTitle": "Optional" }
				]
		
	});
	
	this.parameter = null;
	
	this.selectedValue = {};
	
}


MMValueController.prototype.addValue = function(){
	
	//Make sure a parameter is selected
	if (gApp.parameterController.selectedParameter().length == 0){
		alert("Please select a parameter!");
		return;
	}
	
	//Create a new parameter
	var newValue = new MMValue(gApp.parameterController.selectedParameter()[0].id);
	
	//Add it to the table
	this.dataTable.fnAddData( newValue );
	
	//Set the optional column to be a checkbox
	//$("#" + newValue.id + ">td.optional").html("<input class='mm_value_optional_cb' type='checkbox' name='optional' value='false' onclick='gApp.valueController.updateOptional(event)'/>");
	
	//Set the parent parameter's values to the table data
	//this.parameter.values.push(newValue);
	this.parameter.values = this.dataTable.fnGetData();
	
	//Create new matrix cells for the selected testcase
	gApp.testcaseController.selectedTestcase.updateCells();
	
	return newValue.id;
	
	
}

MMParameterController.prototype.detectInputNameKeypress = function(){
	
	if ($("#mm_value_input_name").val() == ""){
		$("#mm_value_add_button").attr("disabled", "true");
	}else{
		$("#mm_value_add_button").removeAttr("disabled");
	}
	
}



MMValueController.prototype.removeValue = function(){
	
	//Make sure a parameter is selected
	if (gApp.parameterController.selectedParameter().length == 0){
		alert("Please select a parameter!");
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
		
		"bFilter": false,
		
		"bInfo": false,
		
		"bDestroy": true,
		
		"sScrollY": "180px",
		
		"bPaginate": false,
		
		"aaData": oParameter.values,
		
		"bJQueryUI": true,
		
		"aoColumns": [
					{ "mData":"name","sClass":"name","sTitle": "Value" },
					{ "mData":"optional","sClass":"optional","sTitle": "Optional", "sWidth": "30px"  }
				],
				
		"fnCreatedRow": function (nRow, aData, iDataIndex) {
						
						//Capture the data
						var oData = aData; 
						
						//Display the optional column as a checkbox and populate it with the correct value
						$(nRow).children(".optional").html("<input class='mm_value_optional_cb' type='checkbox' name='optional' onclick='gApp.valueController.updateOptional(event)'/>");
						$(nRow).children(".optional").attr("selectable", "false");
						$(nRow).children(".optional").children("input").prop("checked", oData.optional);
											  	
						//Create the editable function (excluding the "optional" column)
						$('td[class!="optional"]', nRow).editable( function(value, settings){
							oData[this.classList[0]] = value; //this.classList[0] is the the TD class which it gets from the column definition 
							gApp.valueController.parameter.values = gApp.valueController.dataTable.fnGetData();
							gApp.parameterController.testcase.updateCells();
							return value;
						}, 
						{	
			                "height": "14px",
							event: "dblclick",
							onblur: "submit"
			            });
			
			
			        }
		
		
		
	});
	
}





MMValueController.prototype.updateOptional = function(e){
	var oData = gApp.valueController.dataTable._("#" + e.target.parentElement.parentElement.id)[0];
	oData['optional'] = e.target.checked;
	gApp.valueController.parameter.values = gApp.valueController.dataTable.fnGetData();
	gApp.parameterController.testcase.updateCells();
}
