function MMValue(sParameterId,sName){
	
	//ID
	this.id = "V" + gApp.valueCount++;
	
	//NAME
	if (typeof(sName) == "undefined") sName = this.id;
	this.name = sName;
	
	//DT_RowID
	this.DT_RowId = this.id;
	
	//Optional
	this.optional = false;
	
	//PARENT PARAMETER
	this.parameterId = sParameterId;
	
}