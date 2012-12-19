function BMMealPlanController(){
	
	this._meals = [];

	//REGISTER TABLE ROW CLICK EVENT HANDLER
	$('body').on( 'click', '#bm_meal_plan_table tbody tr', function( e ) {
        	
			//This will get the whole recipe data object because they get loaded from the ajax source
			var oSelectedMealplan = gApp.mealplanController.dataTable._('#' + this.id)[0];
			
			//Load the data into the fields
			$("#bm_mealplan_start_date").val(oSelectedMealplan.start_date);
			$("#bm_mealplan_end_date").val(oSelectedMealplan.end_date);
			$(".bm_mealplan_id").val(oSelectedMealplan.mealplan_id);
			
			//Reload the meal "grid"
			$.ajax({
				dataType:"json",
		        url: '/meals/index/' + oSelectedMealplan.mealplan_id 
		     }).done(function(oResponse){
				//Clear out the shopping list
				//Redisplay the grid data
				gApp.mealplanController._meals = oResponse;
				gApp.mealgridController.displayGridForMealplan(oResponse);
				
			 }).error(function(xhr, errorStatus, errorText){
				alert("There was an issue adding a new recipe: " + errorStatus + ", " + errorText);
			 });
			
		
	});
	
	
	
	//MEALPLAN SETUP AJAX FORM
	$('form[name="bm_mealplan_setup_form"]').ajaxForm({
		type: 'POST',
		url: '/mealplans/p_update/',
		beforeSubmit: function() {
			$('#bm_mealplan_status').html("Updating Mealplan...");
			gApp.mealplanController.lockMealplan();
		},
		success: function(response) { 
			$('#bm_mealplan_status').html("");	
			gApp.mealplanController.dataTable.fnReloadAjax();
			gApp.mealplanController.dataTable.$('.row_selected').children()[0].click();
		},
		error: function(response){
			alert(response);
		}
	});

	
	
	
	
	//INIT DATA TABLE
	this.dataTable = $('#bm_meal_plan_table').dataTable({
		
		"bFilter": false,
		
		"bInfo": false,

		"sScrollY": "175px",
		
		"bPaginate": false,
		
		"bJQueryUI": true,
		
		"sAjaxSource": "/mealplans/index",
		
		"aoColumns": [
					{"mData":"name","sTitle":"Meal Plan", "sClass":"name textinput_editable","sWidth":"33%"},
					{"mData":"start_date","sTitle":"Plan Start Date", "sClass":"start_date datepicker_editable","sWidth":"33%"},
					{"mData":"end_date","sTitle":"Plan End Date", "sClass":"end_date datepicker_editable","sWidth":"33%"},
				],
			
	    "fnDrawCallback": function( oSettings ) {
		    if (this.$('tr').length > 0){
				//this.$('.row_selected').children()[0].click();
			}
			
		},
		
		"fnCreatedRow": function (nRow, aData, iDataIndex) {
						
			//Capture the data
			var oData = aData; 
								  	
			//NAME EDITING
			$('td[class*="textinput_editable"]', nRow).editable( function(value, settings){
				var mealplanId = gApp.mealplanController.dataTable._("#" + nRow.id)[0].mealplan_id;
				$.ajax({
					data: {"mealplan_id":mealplanId, "name":value},
					type: "POST",
			        url: '/mealplans/p_update'
			     }).done(function(oResponse){
					//Reload the data
					var editedRow = nRow;
					gApp.mealplanController.reloadData(editedRow);
					//gApp.mealplanController.dataTable.fnReloadAjax();		
				 }).error(function(xhr, errorStatus, errorText){
					alert("There was an issue updating the mealplan: " + errorStatus + ", " + errorText);
				 });
				return(value);
			}, 
			{	
                "height": "20px",
				event: "dblclick",
				"width": "100%",
				onblur: "submit"
            });

			//Capture the date information for use in following closures
			var startDate = parseDate(oData.start_date); //new Date(oData.start_date);
			var endDate = parseDate(oData.end_date); //new Date(oData.end_date);
			var dateDiff = endDate.getTime() - startDate.getTime();
			
			//START DATE EDITING
			var startMaxDate = oData.end_date;
			$('td[class*="start_date"]', nRow).editable( function(value, settings){
				
				//Init the date for posting
				var tmpMealplanData = gApp.mealplanController.dataTable._("#" + nRow.id)[0];
				var mealplanData = {"mealplan_id":tmpMealplanData.mealplan_id, "start_date":tmpMealplanData.start_date, "end_date":tmpMealplanData.end_date};
				mealplanData["start_date"] = value;
				
				//Adjust the actual value of the end date if we've gone past it, or if we've gone earlier than 2 weeks before
				var newStartDate = new Date(value);
				if ( newStartDate.getTime() > endDate.getTime() ){
					var newEndDateTime = newStartDate.getTime() + dateDiff;
					var newEndDateString = new Date(newEndDateTime).toISOString().substring(0,10);
					mealplanData["end_date"] = newEndDateString;
				}else if ( (newStartDate.getTime() + TWO_WEEKS) < endDate.getTime() ){
					var newEndDateTime = newStartDate.getTime() + TWO_WEEKS;
					var newEndDateString = new Date(newEndDateTime).toISOString().substring(0,10);
					mealplanData["end_date"] = newEndDateString;
				}
				$.ajax({
					data: mealplanData,
					type: "POST",
			        url: '/mealplans/p_update'
			     }).done(function(oResponse){
					//Reload the data
					var editedRow = nRow;
					gApp.mealplanController.reloadData(editedRow);	
				 }).error(function(xhr, errorStatus, errorText){
					alert("There was an issue updating the mealplan: " + errorStatus + ", " + errorText);
				 });
				return(value);
			}, 
			{	
				"type":"datepicker",
				datepicker: {
			    	dateFormat: 'yy-mm-dd', 
			    	numberOfMonths: 2,
					minDate:0
			  	},
				event: "dblclick",
				"width": "100%"
            });



			//END DATE EDITING

			var maxEndDate = new Date(startDate.getTime() + (14*(24*(60*60000))));
			$('td[class*="end_date"]', nRow).editable( function(value, settings){
				var tmpMealplanData = gApp.mealplanController.dataTable._("#" + nRow.id)[0];
				var mealplanData = {"mealplan_id":tmpMealplanData.mealplan_id, "start_date":tmpMealplanData.start_date, "end_date":tmpMealplanData.end_date};
				mealplanData[this.classList[0]] = value;
				$.ajax({
					data: mealplanData,
					type: "POST",
			        url: '/mealplans/p_update'
			     }).done(function(oResponse){
					//Reload the data
					var editedRow = nRow;
					gApp.mealplanController.reloadData(editedRow);
					//gApp.mealplanController.dataTable.fnReloadAjax();		
				 }).error(function(xhr, errorStatus, errorText){
					alert("There was an issue updating the mealplan: " + errorStatus + ", " + errorText);
				 });
				return(value);
			}, 
			{	
				"type":"datepicker",
				datepicker: {
			    	dateFormat: 'yy-mm-dd', 
			    	numberOfMonths: 2,
					minDate:startDate.toISOString().substring(0,10),
					maxDate:maxEndDate.toISOString().substring(0,10)
			  	},
				event: "dblclick",
				"width": "100%"
            });

		
		}
		
		
	});
	
	
}



BMMealPlanController.prototype.addMealplan = function(){
	
	
	//Create the JQUERY ajax call here, and reload the table on success
	$.ajax({
		dataType:"json",
        url: '/mealplans/add'
     }).done(function(oResponse){
		 
		var newMealplanId = oResponse;
		
		//Reload the data
		gApp.mealplanController.dataTable.fnReloadAjax(
			null,
			function(oSettings){
				var scroller = gApp.mealplanController.dataTable.fnSettings().nTable.parentNode;                                             
				$(scroller).scrollTo( "tr[id='" + newMealplanId + "']", 1);
				$("#" + newMealplanId + " > td:eq(0)").dblclick();
			},
			true
		);		
		
		
	 }).error(function(xhr, errorStatus, errorText){
		alert("There was an issue adding a new mealplan: " + errorStatus + ", " + errorText);
	 });
	
		
}



BMMealPlanController.prototype.autoPlan = function(){
	
	
	var recipeData = gApp.recipeController.dataTable._("tr");
	
	/*
	Repeat with each meal
	If it doesn't have a recipe attached, look for a recipe of that type randomly and apply it
	*/
	for (var i=0;i<this._meals.length;i++){
		
		if (!this._meals[i].recipe){
			
			var mealKey = "";
			
			//Get the "index" of the meal to find what type it is
			switch ( (i+4) % 4 ){ 
				
				case 0: //Breakfast
					mealKey = "is_breakfast";
					break;
					
				case 1: //Lunch
					mealKey = "is_lunch";
					break;
					
				case 2: //Snack
					mealKey = "is_snack";
					break;
									
				case 3: //Dinner
					mealKey = "is_dinner";
					break;

				default:
					mealKey = "is_dinner";
					break
			
			}
			
			//Get all recipes of that type from the recipe data table
			var possibleRecipes = recipeData.filter(function(e,a,i){
				return (e[mealKey] == 1);
			});
			
			//Randomly fetch one from the filtered list and apply it
			if (possibleRecipes.length > 0){
				var randomRecipe = possibleRecipes[ Math.floor(Math.random()*(possibleRecipes.length)) ];
				
				var mealIndex = i;
				$.post("/meals/p_update", {"meal_id":this._meals[i].meal_id, "recipe_id":randomRecipe.recipe_id})
				 .success(function() { 
					//gApp.mealplanController.refresh();
				  })
				 .error(function() { 
					alert("error"); 
				  })
				 .complete(function() {
					$("#" + gApp.mealplanController._meals[mealIndex].meal_id).html('');
					gApp.mealplanController.refresh();
				 });
				
				//This will put a spinner in the cell being updated
				$("#" + this._meals[i].meal_id).html('<image src="/images/spinner2-greenie.gif" width="20px" height="20px"></image>');
				
			}
						
		}
	}
	
	
	
		
}


BMMealPlanController.prototype.reloadData = function(editedRow){
	gApp.mealplanController.dataTable.fnReloadAjax(
		null,
		function(oSettings){
			gApp.mealplanController.dataTable.fnSort( [ [1,'asc'] ] );
			gApp.mealplanController.scrollToAndSelectRow(editedRow);
		},
		true
	);
}


BMMealPlanController.prototype.scrollToAndSelectRow = function(nRow){
	$(this.dataTable.fnSettings().nTable.parentNode).scrollTo( "tr[id='" + nRow.id + "']", 1);	
	$("#" + nRow.id + " > td:eq(0)").click();
}



BMMealPlanController.prototype.editSelectedMealplan = function(){
	
	//Toggle the states
	this.unlockMealplan();
		
}


BMMealPlanController.prototype.saveSelectedMealplan = function(){
	
	//Toggle the states
	$("#bm_mealplan_setup_form").submit();
		
}


BMMealPlanController.prototype.cancelEditSelectedMealplan = function(){
	
	//Reload the selected mealplan, and lock the form
	this.dataTable.$('.row_selected').children()[0].click();
	this.lockMealplan();
		
}




BMMealPlanController.prototype.unlockMealplan = function(){

	$('#bm_mealplan_start_date').datepicker('enable');
	$('#bm_mealplan_end_date').datepicker('enable')

	$("#bm_mealplan_edit_button").toggle();
	$("#bm_mealplan_save_edit_button").toggle();
	$("#bm_mealplan_cancel_edit_button").toggle();
	

}


BMMealPlanController.prototype.lockMealplan = function(){

	$('#bm_mealplan_start_date').datepicker('disable');
	$('#bm_mealplan_end_date').datepicker('disable')
	
	$("#bm_mealplan_edit_button").toggle();
	$("#bm_mealplan_save_edit_button").toggle();
	$("#bm_mealplan_cancel_edit_button").toggle();
	
}


BMMealPlanController.prototype.refresh = function(){
	this.dataTable.$('.row_selected').children()[0].click();
}




BMMealPlanController.prototype.removeSelectedMealplan = function(){
	
	var iSelectedMealplanId = this.dataTable.$('.row_selected').attr("id").substr(2);

	//Create the JQUERY ajax call here, and reload the table on success
	$.ajax({
		dataType:"json",
       	url: '/mealplans/delete/' + iSelectedMealplanId
     }).done(function(){
		 gApp.mealplanController.dataTable.fnReloadAjax();
		 gApp.mealplanController.dataTable.$('tr:last').children()[0].click();
	 }).error(function(xhr, errorStatus, errorText){
		alert("There was an issue removing a recipe: " + errorStatus + ", " + errorText);
	 });
	
		
}




