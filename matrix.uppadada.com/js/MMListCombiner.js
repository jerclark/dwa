MMListCombiner = {
	
	combine: function(o){
		var result = [];
	    var count=1;
	    var step_len=[];

		//repeat for each passed in object
	    for(var i=0;i<o.length;i++){

			//set the step length to the value of count
			step_len[i]=count;

			//Multiply count by the length of objects in the list at index i
	        count*=o[i].length;

	    }

		//repeat count times
	    for(var i=0;i<count;i++){

	        var tmp=[];
	        for(var n=0;n<o.length;n++){
	            tmp.push(o[n][Math.floor(i/step_len[n])%o[n].length]);
	        }
	        result.push(tmp);
	    }

		return result;
	}
	
}
