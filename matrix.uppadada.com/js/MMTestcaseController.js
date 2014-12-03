function MMTestcaseController(){
	
	//TABLE ROW CLICK EVENT HANDLER
	$('body').on( 'click', '#mm_testcase_table tbody tr', function( e ) {
        	
			var oSelectedTC = gApp.testcaseController.dataTable._('#' + this.id)[0];

	 		if (gApp.testcaseController.selectedTestcase != oSelectedTC && oSelectedTC.id != ""){
								
				//Set the selected testcase
				gApp.testcaseController.selectedTestcase = oSelectedTC;

				//Load the corresponding parameter data set
				gApp.parameterController.loadDataForTestcase(oSelectedTC);
				
				//Click the first item in the parameter table
				gApp.parameterController.dataTable.$('tr:first').click();
				
				//Set the testcase matrix header
				$("#mm_testcase_matrix_header").html("<h3>Testcase Matrix: " + oSelectedTC.name + "</h3>");
								
				//Update the matrix
				gApp.matrixController.loadMatrixForTestcase(oSelectedTC);

			}
		
	});	
	
	
	//INIT DATA TABLE
	this.dataTable = $('#mm_testcase_table').dataTable({
		
		"bFilter": false,
		
		"bInfo": false,

		"sScrollY": "180px",
		
		"bPaginate": false,
		
		"bJQueryUI": true,
		
		"aoColumns": [
					{ "mData": "name", "sTitle":"Testcases"}
				]
		
	});
	
	
	$('#mm_testcase_table').attr("title", "Double-Click to edit");
	
	

	//SELECTED TESTCASE IVAR
	this.selectedTestcase = null;
	
}


MMTestcaseController.prototype.loadData = function(){
	
	var tcCtrl = this;
	var promise = Kinvey.DataStore.find('Testcases', null, {
	    success: function(response) {
	        for (var i=0;i<response.length;i++){
	        	var newTcId = tcCtrl.addTestcase(response[i]);
	        }
	        $('#' + newTcId).children()[0].click();
	    },
	    error: function(response) {
	    	alert(response.description);
	    }
	});
	
}



MMTestcaseController.prototype.detectInputNameKeypress = function(){
	
	if ($("#mm_testcase_input_name").val() == ""){
		$("#mm_testcase_add_button").attr("disabled", "true");
	}else{
		$("#mm_testcase_add_button").removeAttr("disabled");
	}
	
}




MMTestcaseController.prototype.addTestcase = function(tcProps){

	var user = Kinvey.getActiveUser();
	if(null === user) 
	{
		alert("Please login to create testcases.");
		return;
	}


	//Create a new testcase
	var newTestcase = new MMTestcase(tcProps);
	
	//Add it to the table
	this.dataTable.fnAddData( [newTestcase] );
	
	
	//Set the editable behavior
	$('#' + newTestcase.id + ' td').editable( function(value,settings){
				gApp.testcaseController.dataTable._('#' + newTestcase.id)[0].name = value;
				$("#mm_testcase_matrix_header").html("<h3>Testcase Matrix: " + value + "</h3>");
				this.selectedTestcase = gApp.testcaseController.dataTable._('#' + newTestcase.id)[0];

				//gApp.testcaseController.updateTestcase();

				return(value);
	        },
			{
	        	"height": "14px",
	        	"width": "100%",
				event     : "dblclick",
				onblur : "submit"
			} );
	
	//Select the new testcase		
	$('#' + newTestcase.id).children()[0].click();

	//Add any parameters
	if ( (typeof(tcProps.parameters) == "undefined") || (tcProps.parameters.length == 0) ) {
		gApp.parameterController.addParameter({});
	} 


	//Save to kinvey
	if (typeof(tcProps._id) == "undefined"){
		var promise = Kinvey.DataStore.save('Testcases', this.selectedTestcase, {
			success   : function(response) {
				gApp.testcaseController.selectedTestcase._id = response._id;
			},
			error : function(response){
				alert(response.description);
			}
		});	
	}

	//return the testcase id
	return newTestcase.id;
	
	
}


MMTestcaseController.prototype.removeTestcase = function(){
	
	//Make sure a testcase is selected
	if (this.selectedTestcase == null){
		alert("Please select a testcase!");
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
		
		//Clear the parameter table table
		gApp.parameterController.dataTable.fnClearTable();
		
		//Clear the value table
		gApp.valueController.dataTable.fnClearTable();
		
	}

	var promise = Kinvey.DataStore.destroy('Testcases', this.selectedTestcase._id, {
	    success: function(response) {
	        console.log("deleted");
	    },
	    error: function(response){
	    	console.log(response.description);
	    }
	});
		
}


MMTestcaseController.prototype.updateTestcase = function(){

	if (this.selectedTestcase._id != null){

		//Save to kinvey
		var promise = Kinvey.DataStore.update('Testcases', this.selectedTestcase, {
			success   : function(response) {
				//alert(response.description);
			},
			error : function(response){
				alert(response.description);
			}
		});	

	}
}





MMTestcaseController.prototype.editMetadata = function(){
	
	var selectedTestcaseId = this.selectedTestcase.id;
	
	//Make sure a testcase is selected
	if (this.selectedTestcase == {} || this.selectedTestcase == null){
		alert("Please create and/or selected a testcase!");
		return;
	}
	
	
	$( "#metadata-form-div" ).dialog({
		buttons:{
			Update:function(){
				//Update the testcase object with the entered values
				gApp.testcaseController.dataTable._('#' + selectedTestcaseId)[0].name = $("#mm_tc_metadata_name_field").val();
				gApp.testcaseController.dataTable._('#' + selectedTestcaseId)[0].expectedResult = $("#mm_tc_metadata_expected_result_field").val();
				gApp.testcaseController.selectedTestcase = gApp.testcaseController.dataTable._('#' + selectedTestcaseId)[0];
				gApp.testcaseController.selectedTestcase.updateCells();
				$("#mm_testcase_matrix_header").html("<h3>Testcase Matrix: " + $("#mm_tc_metadata_name_field").val() + "</h3>");
				$( this ).dialog( "close" );
			},
			Cancel:function(){
				$( this ).dialog( "close" );
			}
		}
	});
	
	//Init the form
	$("#metadata-form-div").attr("title", "Testcase - " + this.selectedTestcase.name);
	
	//Add it to the Form DIV
	$("#metadata-form-form").html(this.metadataFieldsetHTML());
	
	//Show the form DIV, and "disable" the background
	$( "#metadata-form-div" ).dialog( "open" );
	
}


MMTestcaseController.prototype.metadataFieldsetHTML = function(){
	return '<fieldset><label for="name">Name</label><input type="text" name="name" id="mm_tc_metadata_name_field" value="' + this.selectedTestcase.name + '" class="text ui-widget-content ui-corner-all" /><label for="expectedResult">Expected Result</label><textarea cols="60" rows="10" name="expectedResult" id="mm_tc_metadata_expected_result_field" value="' + this.selectedTestcase.expectedResult + '" class="text ui-widget-content ui-corner-all">' + this.selectedTestcase.expectedResult + '</textarea></fieldset>';
}



