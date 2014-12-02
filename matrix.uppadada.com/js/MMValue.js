function MMValue(sParameterId,sName){
	
	//ID
	this.id = "V" + gApp.valueCount++;
	
	//NAME
	if (typeof(sName) == "undefined") sName = "Untitled Value - " + this.id;
	this.name = sName;
	
	//DT_RowID
	this.DT_RowId = this.id;
	
	//Optional
	this.optional = false;
	
	//PARENT PARAMETER
	this.parameterId = sParameterId;
	
}



MMValue.prototype.serialize = function(){

	var o = {
		_id: this.id,
		name: this.name,
		optional: this.optional
	};

	return o;
	

}
