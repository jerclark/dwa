function BMMealPlanController(){
	
	
	//Init the Recipe Tabs
	$("#bm_mealplan_tabs").tabs({
	});
	
	
	//Init the date pickers for the mealplan setup
	$( "#bm_mealplan_start_date" ).datepicker({
		showOn: "button",
		buttonImage: "/images/calendar.gif",
		buttonImageOnly: true,
		disabled: true,
		dateFormat: "yy-mm-dd",
        defaultDate: "+1w",
		minDate: -0,
        changeMonth: true,
        numberOfMonths: 2,
        onClose: function( selectedDate ) {
            $( "#bm_mealplan_end_date" ).datepicker( "option", "minDate", selectedDate );
        }
    });
    $( "#bm_mealplan_end_date" ).datepicker({
	    showOn: "button",
		buttonImage: "/images/calendar.gif",
		buttonImageOnly: true,
		disabled: true,
		dateFormat: "yy-mm-dd",
        defaultDate: "+1w",
		minDate: -0,
        changeMonth: true,
        numberOfMonths: 2,
        onClose: function( selectedDate ) {
            $( "#bm_mealplan_start_date" ).datepicker( "option", "maxDate", selectedDate );
        }
    });


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

		"sScrollY": "200px",
		
		"bPaginate": false,
		
		"bJQueryUI": true,
		
		"sAjaxSource": "/mealplans/index",
		
		"aoColumns": [
					{"mData":"name","sTitle":"Meal Plans"}
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
			$('td', nRow).editable( function(value, settings){
				var mealplanId = gApp.mealplanController.dataTable._("#" + nRow.id)[0].mealplan_id;
				$.ajax({
					data: {"mealplan_id":mealplanId, "name":value},
					type: "POST",
			        url: '/mealplans/p_update'
			     }).done(function(oResponse){
					//Reload the data
					gApp.mealplanController.dataTable.fnReloadAjax();		
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

			
		}
		
		
	});
	
	
}



BMMealPlanController.prototype.addMealplan = function(){
	
	
	//Create the JQUERY ajax call here, and reload the table on success
	$.ajax({
		dataType:"json",
        url: '/mealplans/add'
     }).done(function(oResponse){
		 
		//Reload the data
		gApp.mealplanController.dataTable.fnReloadAjax();		
		
		
	 }).error(function(xhr, errorStatus, errorText){
		alert("There was an issue adding a new mealplan: " + errorStatus + ", " + errorText);
	 });
	
		
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