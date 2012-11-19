function MMMatrixCell(sToken,aValues){
	
	this.token = sToken;
	
	this.values = aValues;
	
	this.resultState = gApp.TestcaseResultStateEnum.UNTESTED; //
	
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

