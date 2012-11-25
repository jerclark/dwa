function MMParameter(sName){
	
	//ID
	this.id = "P" + gApp.parameterCount++;
	
	//NAME
	if (typeof(sName) == "undefined") sName = "Untitled Parameter - " + this.id;
	this.name = sName;
	
	//DT_RowID
	this.DT_RowId = this.id;
	
	//VALUES
	this.values = [];
	
	//TESTCASE (basically, a "parent" field)
	//this.testcase = gApp.testcaseController.selectedTestcase;
	
}