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
			$('#mm_matrix_content').append('<div class="mm_matrix_row" id=' + sRowId + '></div>')
		}
		
		$('#' + sRowId).append('<div class="mm_matrix_cell" id="' + oCell.token + '" style="width:' + iCellWidth + 'px;" title="' + oCell.displayName() + '"></div>');
		iCellHeight = $('.mm_matrix_cell').height();
		
		
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
			
		
	}
	
}


