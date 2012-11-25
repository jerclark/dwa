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
			$('#' + oCell.token).addClass("selected");
		}else{
			$('#' + oCell.token).removeClass("selected");		
		}
		
		
		//Create the Click Handler
		$('#' + oCell.token).on('click',function( e ){
			
			var cellData = $('#' + e.target.id).data();
			cellData.toggleState();
		
			//Update the cell data in the testcase matrix cells
			var updatedMatrixCells = gApp.testcaseController.selectedTestcase.matrixCells.map(function(e,i,a){
				if (e.token == cellData.token){
					e = cellData;
				}
				return e;
			});
		
			gApp.testcaseController.selectedTestcase.matrixCells = updatedMatrixCells;
			
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
		
			
		
	}
	
}


/*
RIGHT CLICKING ON A SINGLE CELL
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
CLICKING ON THE EDIT SELECTED CELLS BUTTON (WITH MULTIPLE SELECTION)
*/
MMMatrixController.prototype.editSelectedCellsMetadata = function(){
	
	var selectedTestcase = gApp.testcaseController.selectedTestcase;
	var selectedValue = gApp.valueController.selectedValue;
	
	
	//Make sure a value is selected
	if (selectedValue == {} || selectedValue == null || gApp.valueController.dataTable.$('.row_selected').length == 0){
		alert("Please create and/or selected a value from the value list!");
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
	$("#metadata-form-div").attr("title", "Edit Cells For Value - " + selectedValue.name);
	
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



