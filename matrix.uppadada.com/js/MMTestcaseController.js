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
								
				//Update the matrix
				gApp.matrixController.loadMatrixForTestcase(oSelectedTC);

			}
		
	});
	
	
	//INIT DATA TABLE
	this.dataTable = $('#mm_testcase_table').dataTable({

		"sScrollY": "90px",
		
		"bPaginate": false,
		
		"aaData": [],
		
		"bJQueryUI": true,
		
		"aoColumns": [
					{ "mData": "name", "sTitle":"Testcases"}
				]
		
	});
	

	//SELECTED TESTCASE IVAR
	this.selectedTestcase = {};
	
}


MMTestcaseController.prototype.addTestcase = function(){
	
	//Create a new testcase
	var newTestcase = new MMTestcase();
	
	//Add it to the table
	this.dataTable.fnAddData( [newTestcase] );
	
	//Set the editable behavior
	$('#' + newTestcase.id + ' td').editable( function(value,settings){
			    return(value);
	        },
			{
	        	"height": "14px",
	        	"width": "100%",
				event     : "dblclick",
				onblur : "submit"
			} );
	
	//Select the new testcase		
	$('#' + newTestcase.id).click();
	gApp.parameterController.addParameter();		
	
	//return the testcase id
	return newTestcase.id;
	
	
}







