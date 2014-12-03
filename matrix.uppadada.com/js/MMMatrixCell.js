function MMMatrixCell(sToken,aValues){
	
	this.token = sToken;
	
	this.values = aValues;
	
	this.resultState = gApp.TestcaseResultStateEnum.UNTESTED; //
	
	this.expectedResult = "";
	
	this.hasOverrideResult = false;
	
	this.testcaseId = null;
	
	this.selected = false;
		
}

MMMatrixCell.prototype.displayName = function(){
	
	var result = "";
	$(this.values).each(function(){
		var sParamName = gApp.parameterController.dataTable._("#" + this.parameterId)[0].name;
		result = result + sParamName + ": " + this.name + "<br>";
	});
	return result;
	
}


MMMatrixCell.prototype.isOptional = function(){
	
	var optionalValues = $(this.values).filter(function(){
		return ((this.optional == "true") || (this.optional == true));
	});
	return optionalValues.length > 0;
	
}


MMMatrixCell.prototype.isSelected = function(){
	
	//Check whether any cells with the class mm_cell_selected 
	return $("#" + this.token).hasClass("mm_cell_selected");
	
	/*//Filter the values for this matrix cell to include only those that are "selected" (there should only be 1)
	var selectedValues = $(this.values).filter(function(){
		try{
			//Check to see if
			return (gApp.valueController.dataTable._('.row_selected')[0].id == this.id);
		}catch(e){
			return false;
		}
		return false;
	});
	
	//If there was a selected value, then consider this cell needing selection
	return ( (selectedValues.length > 0) || this.selected) ;
	*/
	
}


MMMatrixCell.prototype.toggleState = function(){
	
	if (this.resultState == gApp.TestcaseResultStateEnum.UNTESTED){
		
		this.resultState = gApp.TestcaseResultStateEnum.PASS;
		$('#' + this.token).attr("resultState", "pass");
	
	}else if (this.resultState == gApp.TestcaseResultStateEnum.PASS){
		
		this.resultState = gApp.TestcaseResultStateEnum.FAIL;
		$('#' + this.token).attr("resultState", "fail");
	
	}else{
		
		this.resultState = gApp.TestcaseResultStateEnum.UNTESTED;
		$('#' + this.token).attr("resultState", "");
	
	}	
	
}

