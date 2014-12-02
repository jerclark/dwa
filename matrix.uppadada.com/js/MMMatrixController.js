function MMMatrixController(){
	
	
	//TABLE ROW CLICK EVENT HANDLER
	$('body').on( 'click', '#mm_matrix_grid tbody tr', function( e ) {
        	
		//alert("hello!");
		
	});
	
	
	
	
	//INIT DATA TABLE
	this.dataTable = $('#mm_matrix_grid').dataTable({

		"sScrollY": "90px",
		
		"bPaginate": false,
		
		"aaData": [["No Grid To Display"]],
		
		"bJQueryUI": true,
		
		"aoColumns": [{"sTitle":"Testcase Matrix"}]
		
	});
	
	

	
	//Context menu event handlers
	$('#mm_context_menu').click(function() {
        $('#mm_context_menu').hide();
    });
    $(document).click(function() {
        $('#mm_context_menu').hide();
    });
	
}



MMMatrixController.prototype.loadMatrixForTestcase = function(oTestcase){
	
	var aCells = oTestcase.matrixCells;
	
	//Row Count
	var iRowCount = Math.floor(Math.sqrt(aCells.length));
	while(aCells.length % iRowCount != 0)
	     iRowCount = iRowCount - 1;
	
	//Column count
	var iColumnCount = aCells.length/iRowCount;
	
	//Initialize the matrix wrapper div
	$('#mm_matrix_content').html("");
	
	//Create the rows and cells
	var sRowId = "";
	var sMatrixWidth = $('#mm_matrix_content').css("width");
	var iMatrixWidth = parseInt(sMatrixWidth) - 40;
	var iCellWidth = ( iMatrixWidth / iColumnCount) - 10; //5 is the cell margin
	var iCellHeight = 40;
	
	for (var i=0;i<aCells.length;i++){
		
		var oCell = aCells[i];
		
		var r = i % (iColumnCount);
		if (r == 0){ //Start a new row
			sRowId = "mm_matrix_row_" + i/(iColumnCount);
			$('#mm_matrix_content').append('<div class="mm_matrix_row" id=' + sRowId + '></div>');
		}
		
		//Set Cell Title for the Tooltip display
		var sExpectedResult = "<span style='color:gray'><i>Right-Click cells to edit expected results</i></span>";
		if (oCell.expectedResult != ""){
			sExpectedResult = "<i>" + oCell.expectedResult + "</i>";
		}else if (gApp.testcaseController.selectedTestcase.expectedResult != ""){
			sExpectedResult = "<i>" + gApp.testcaseController.selectedTestcase.expectedResult + "</i>";
		}
		
		var sDisplayName = oCell.displayName();
		var sCellTitle = sDisplayName +  '<br>Expected Result: ' + sExpectedResult;
		
		//Append the HTML for the cell
		$('#' + sRowId).append('<div class="mm_matrix_cell" id="' + oCell.token + '" title="' + sCellTitle + '" style="width:' + iCellWidth + 'px;"></div>');
		
		//Associate the matrix cell data with the div
		$('#' + oCell.token).data(oCell);
		
		//Map the cell data attributes to the div attributes
		$('#' + oCell.token).attr(oCell);
		
		//Set the opacity to reflect whether the cell is optional
		if (oCell.isOptional()){
			$('#' + oCell.token).css("opacity", "0.4");
		}else{
			$('#' + oCell.token).css("opacity", "1.0");	
		}
		
		//Set the style to reflect whether the cell is selected
		if (oCell.isSelected()){
			$('#' + oCell.token).addClass("mm_cell_selected");
		}else{
			$('#' + oCell.token).removeClass("mm_cell_selected");		
		}
		
		
		//Create the Click Handler
		$('#' + oCell.token).on('click',function( e ){
			
			var cellData = $('#' + e.target.id).data();
			
			//Check whether it's an option-click. If so, toggle the selection.
			if (e.altKey == true){
				
				if (cellData.isSelected()){
					$('#' + cellData.token).removeClass("mm_cell_selected");
				}else{
					$('#' + cellData.token).addClass("mm_cell_selected");	
				}
				
				
				
			}else{ //non-option click
			
				cellData.toggleState();
					
			}
			
			//Update the cell data in the testcase matrix cells
			var updatedMatrixCells = gApp.testcaseController.selectedTestcase.matrixCells.map(function(e,i,a){
				if (e.token == cellData.token){
					e = cellData;
				}
				return e;
			});

			gApp.testcaseController.selectedTestcase.matrixCells = updatedMatrixCells;
	
			gApp.matrixController.updateStats();
			
		});
		
				
		//Create the right-click handler
		$("#" + oCell.token).on("contextmenu", function(e) {
			
			$('#mm_context_menu').attr("clickedCellId", this.id);
			
		    $('#mm_context_menu').css({
		        top: e.pageY+'px',
		        left: e.pageX+'px'
		    }).show();

		    return false;

		});
		
		
		this.updateStats();
			
		
	}
	
}


MMMatrixController.prototype.updateStats = function(){
	
	//Get all testcases and the count
	var aMatrixCells = gApp.testcaseController.selectedTestcase.matrixCells;
	var iTotalCnt = aMatrixCells.length;
	
	//Get the passed cells
	var aPassedCells = aMatrixCells.filter(function(e,i,a){
		return (e.resultState == gApp.TestcaseResultStateEnum.PASS);
	});
	var iPassedCnt = aPassedCells.length;
	
	//Get the failed cells
	var aFailedCells = aMatrixCells.filter(function(e,i,a){
		return (e.resultState == gApp.TestcaseResultStateEnum.FAIL);
	});
	var iFailedCnt = aFailedCells.length;
	
	
	//Set the total testcase number
	$("#mm_matrix_total_stat_value").html(iTotalCnt);
	
	//Set the percent executed 
	var iExecutedCnt = (iPassedCnt + iFailedCnt);
	var iExecutedCellPercent = ( iExecutedCnt / iTotalCnt) * 100;
	$("#mm_matrix_executed_stat_value").html( parseInt(iExecutedCellPercent) );
	
	//Set the percent passed 
	var iPassedPercent = (iExecutedCnt == 0) ? 0 : (iPassedCnt / iExecutedCnt) * 100;
	$("#mm_matrix_passed_stat_value").html( parseInt(iPassedPercent) );
	
	//Set the percent failed 
	var iFailedPercent = (iExecutedCnt == 0) ? 0 : (iFailedCnt / iExecutedCnt) * 100;
	$("#mm_matrix_failed_stat_value").html( parseInt(iFailedPercent) );
	
	
}



MMMatrixController.prototype.selectAllCells = function(){

	$('.mm_matrix_cell').addClass("mm_cell_selected");
	
}


MMMatrixController.prototype.clearSelection = function(){

	$('.mm_matrix_cell').removeClass("mm_cell_selected");
	
}


/*
Edit Expected Result for This Cell
*/
MMMatrixController.prototype.editExpectedResultForCell = function(){
	
	//Get the cell ID from the clicked div
	var clickedCellId = $("#mm_context_menu").attr("clickedCellId");
	
	//Gotta get the clicked cell object	
	var oClickedCell = gApp.testcaseController.selectedTestcase.matrixCells.filter(function(e,i,a){
		return (e.token == clickedCellId);
	})[0];
		
	//Display a form for that cell
	$( "#metadata-form-div" ).dialog({
		buttons:{
			Update:function(){
				var selectedTestcase = gApp.testcaseController.selectedTestcase;
				var aCells = gApp.testcaseController.selectedTestcase.matrixCells;
				aCells.map(function(e,i,a){
					if (e.token == clickedCellId){
						//Update the cell object with the entered values
						e.expectedResult = $("#mm_cells_metadata_expected_result_field").val();
						e.hasOverrideResult = true;
					}
				});
				selectedTestcase.matrixCells = aCells;
				gApp.testcaseController.selectedTestcase = gApp.testcaseController.dataTable._('#' + selectedTestcase.id)[0];
				gApp.testcaseController.selectedTestcase.updateCells();

				//Save to Kinvey
				//gApp.testcaseController.updateTestcase();

				$( this ).dialog( "close" );
			},
			Cancel:function(){
				$( this ).dialog( "close" );
			}
		}
	});
	
	//Init the form
	$("#metadata-form-div").attr("title", "Edit Expected Result For Cell - " + oClickedCell.displayName());
	
	//Add it to the Form DIV
	$("#metadata-form-form").html(this.singleCellMetadataFieldsetHTML(oClickedCell.expectedResult));
	
	//Show the form DIV, and "disable" the background
	$( "#metadata-form-div" ).dialog( "open" );
	
}




/*
Edit Expected Result for Selected Cells
*/
MMMatrixController.prototype.editExpectedResultForSelectedCells = function(){
	
	var selectedTestcase = gApp.testcaseController.selectedTestcase;
	var selectedValue = gApp.valueController.selectedValue;
	
	
	//Make sure a value is selected
	if ( $(".mm_cell_selected").length == 0 ) { //selectedValue == {} || selectedValue == null || gApp.valueController.dataTable.$('.row_selected').length == 0){
		alert("Please select some cells!");
		return;
	}
	
	
	$( "#metadata-form-div" ).dialog({
		buttons:{
			Update:function(){
				var aCells = gApp.testcaseController.selectedTestcase.matrixCells;
				aCells.map(function(e,i,a){
					if (e.isSelected()){
						//Update the testcase object with the entered values
						e.expectedResult = $("#mm_cells_metadata_expected_result_field").val();
						e.hasOverrideResult = true;
					}
				});
				gApp.testcaseController.selectedTestcase.matrixCells = aCells;
				gApp.testcaseController.selectedTestcase = gApp.testcaseController.dataTable._('#' + selectedTestcase.id)[0];
				gApp.testcaseController.selectedTestcase.updateCells();
				$( this ).dialog( "close" );
			},
			Cancel:function(){
				$( this ).dialog( "close" );
			}
		}
	});
	
	//Init the form
	$("#metadata-form-div").attr("title", "Edit Selected Cells");
	
	//Add it to the Form DIV
	$("#metadata-form-form").html(this.metadataFieldsetHTML());
	
	//Show the form DIV, and "disable" the background
	$( "#metadata-form-div" ).dialog( "open" );
	
}


MMMatrixController.prototype.metadataFieldsetHTML = function(){
	return '<fieldset><textarea cols="60" rows="10" name="expectedResult" id="mm_cells_metadata_expected_result_field" value="" placeholder="Enter Result For Selected Cell(s)" class="text ui-widget-content ui-corner-all"></textarea></fieldset>';
}


MMMatrixController.prototype.singleCellMetadataFieldsetHTML = function(sExistingExpectedResult){
	return '<fieldset><textarea cols="60" rows="10" name="expectedResult" id="mm_cells_metadata_expected_result_field" value="" placeholder="Enter Result For Selected Cell(s)" class="text ui-widget-content ui-corner-all">' + sExistingExpectedResult + '</textarea></fieldset>';
}



