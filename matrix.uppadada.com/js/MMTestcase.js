function MMTestcase(sName){
	
	//ID
	this.id = "TC" + gApp.testcaseCount++;
	
	//NAME
	if (typeof(sName) == "undefined") sName = "Untitled Testcase - " + this.id;
	this.name = sName;
	
	//PARAMETERS
	this.parameters = [];
	
	//DT_RowID
	this.DT_RowId = this.id;
	
	//CELLS
	this.matrixCells = [];
	
	//EXPECTED RESULT
	this.expectedResult = "";
		
	//Set the parameter controller
	//this.parameterController = new MMParameterController();
	
	
	/*
	//Create a new parameter data source that's associated with the new testcase
	giParameterCount++;
	gParameters[testcaseId] = [];

	//Now load the data into the Parameter table
	loadParametersForTestcase(testcaseId);
	*/
			
	
}


MMTestcase.prototype.updateCells = function(){
	
	var currentTestcase = this;
	
	//Get the parameters of the selected testcase
	var aParameters = this.parameters;
	
	//Get an array of descendent value collections, and calculate the column count
	var aParameterValues = [];
	$.each(aParameters, function(iIndex,oValue){
		var aValues = oValue.values;
		if (aValues.length > 0) 
			aParameterValues.push(aValues);
	});
	
	//Create the testcases
	var testcaseCells = MMListCombiner.combine(aParameterValues);
		
	//Add cells to the matrixCells array
	$.each(testcaseCells, function(iIndex, oValue){ //Go through each testcase
		
		var aCellValues = oValue;
		
		//Derive the cell token (concatenate all of the value ID's)
		var sCellToken = "CELL_";
		$.each(oValue, function(iIndex, oValue){
			sCellToken = sCellToken + oValue.id;
		});
		
		//Check to see if there's already a cell with that token
		var oMatch = $(currentTestcase.matrixCells).filter(function(){			
			return this.token == sCellToken;
		});
		
		
		
		//If not, create a new MatrixCell
		if (oMatch.length == 0 && sCellToken != ""){
			var newCell = new MMMatrixCell(sCellToken, aCellValues);
			newCell.testcaseId = currentTestcase.id;
			newCell.expectedResult = "";
			currentTestcase.matrixCells.push(newCell);
		//If there is, then update the values just to make sure they have the right names n' junk
		}else{
			oMatch[0].values = this;	
		}
		
		
	});
	
	
	gApp.matrixController.loadMatrixForTestcase(this);
	
	
}


MMTestcase.prototype.pruneCells = function(sValueId){
	
	var l_sValueId = sValueId;
	
	//Do a filter on the matrixCells for any cell with a token containing the pruned value ID
	var prunedArray = this.matrixCells.filter(function(e,i,a){
		var re = new RegExp("((" + l_sValueId + "(?=V))|(" + l_sValueId + "$))", 'gi');
		return (e.token.match(re) == null);
	});
	
	this.matrixCells = prunedArray;
	
	gApp.matrixController.loadMatrixForTestcase(this);
	
}



MMTestcase.prototype.cellsForValue = function(sValueId){
	
	var l_sValueId = sValueId;
	var aCells = [];
	
	//Do a filter on the matrixCells for any cell with a token containing the pruned value ID
	aCells = this.matrixCells.filter(function(e,i,a){
		var re = new RegExp("((" + l_sValueId + "(?=V))|(" + l_sValueId + "$))", 'gi');
		return (e.token.match(re) != null);
	});
	
	return aCells;
	
}

