function MMParameter(oProps){

	//ID
	if (typeof(oProps._id) == "undefined") {
		this.id = "P" + gApp.parameterCount++; 
		this.kinvey_id = "";
	}else{
		this.id = this.kinvey_id = oProps._id;
	}
			

	//NAME
	//if (typeof(sName) == "undefined") sName = "Untitled Testcase - " + this.id;
	(typeof(oProps.name) == "undefined") ? 
		this.name = "Untitled Parameter - " + this.id :
		this.name = oProps.name;
	
	//PARAMETERS
	(typeof(oProps.values) == "undefined") ? 
		this.values = [] :
		this.values = oProps.values;
	
	//DT_RowID
	this.DT_RowId = this.id;
	
	
	//EXPECTED RESULT
	(typeof(oProps.expectedResult) == "undefined") ? 
		this.expectedResult = "" :
		this.expectedResult = oProps.expectedResult;

	
}


MMParameter.prototype.serialize = function(){

	var serializedVals = [];
	for (var i=0;i<this.values.length;i++){
		serializedVals.push(this.values[i].serialize());
	}

	var o = {
		_id: this.id,
		name: this.name,
		values: serializedVals
	};

	if (this.kinvey_id != "") o._id = this.kinvey_id;

	return o;
	

}
