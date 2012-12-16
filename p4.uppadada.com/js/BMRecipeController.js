function BMRecipeController(){
	
	
	//Init the recipe accordian
	$(function() {
	     $( "#bm_recipe_accordian" ).accordion();
	});
	
	
	//Init the Recipe Tabs
	$("#bm_recipe_tabs").tabs({
		event:'mouseover'
	});
	
	

	//REGISTER TABLE ROW CLICK EVENT HANDLER
	$('body').on( 'click', '#bm_recipe_table tbody tr', function( e ) {
        	
			//This will get the whole recipe data object because they get loaded from the ajax source
			var oSelectedRecipe = gApp.recipeController.dataTable._('#' + this.id)[0];
			
			//Load the data into the fields
			$("#bm_recipe_name_label").html(oSelectedRecipe.name);
			$("#bm_recipe_ingredients_field").val(oSelectedRecipe.ingredients);
			$("#bm_recipe_steps_field").val(oSelectedRecipe.steps);
			$("#bm_recipe_meal_type_breakfast_checkbox").attr("checked", (oSelectedRecipe.is_breakfast == 1));
			$("#bm_recipe_meal_type_lunch_checkbox").attr("checked", (oSelectedRecipe.is_lunch == 1));
			$("#bm_recipe_meal_type_snack_checkbox").attr("checked", (oSelectedRecipe.is_snack == 1));
			$("#bm_recipe_meal_type_dinner_checkbox").attr("checked", (oSelectedRecipe.is_dinner == 1));
			$(".bm_recipe_id").val(oSelectedRecipe.recipe_id);
		
	});	

	
	
	//INIT DATA TABLE
	this.dataTable = $('#bm_recipe_table').dataTable({
		
		"bFilter": true,
		
		"bInfo": true,

		"sScrollY": "200px",
		
		"bPaginate": true,
		
		"bJQueryUI": true,
		
		"sAjaxSource": "/recipes/index",
		
		"aoColumns": [
					{"mData":"name","sTitle":"Recipes", "sClass":"name text_input_editable"},
					{"mData":"ingredients","sTitle":"Ingredients","sClass":"ingredients textarea_editable"},
					{"mData":"steps","sTitle":"Preparation","sClass":"steps textarea_editable"},
					{"mData":"is_breakfast","sTitle":"Breakfast","sClass":"is_breakfast", "sWidth":"50px"},
					{"mData":"is_lunch","sTitle":"Lunch","sClass":"is_lunch","sWidth":"50px"},
					{"mData":"is_dinner","sTitle":"Dinner","sClass":"is_dinner","sWidth":"50px"},
					{"mData":"is_snack","sTitle":"Snack","sClass":"is_snack","sWidth":"50px"},
					{"mData":"email","sTitle":"Contributor", "sClass":"contributor"}				
				],
			
	    "fnDrawCallback": function( oSettings ) {
		    if (this.$('tr').length > 0){
				this.$('tr:last').children()[0].click();
			}
		},
		
		"fnCreatedRow": function (nRow, aData, iDataIndex) {
						
			//Capture the data
			var oData = aData; 
			
			
			//Setup the checkbox columns
			gApp.recipeController.setupRecipeTableCheckbox(nRow,oData,"is_breakfast");
			gApp.recipeController.setupRecipeTableCheckbox(nRow,oData,"is_lunch");
			gApp.recipeController.setupRecipeTableCheckbox(nRow,oData,"is_dinner");
			gApp.recipeController.setupRecipeTableCheckbox(nRow,oData,"is_snack");
			
			
			/*$(nRow).children(".is_breakfast").html("<input style='align:middle;' value='0' class='bm_recipe_is_breakfast_checkbox' type='checkbox' name='is_breakfast' onclick='gApp.recipeController.handleCheckboxClick(event)'/>");
			$(nRow).children(".is_breakfast").attr("selectable", "false");
			$(nRow).children(".is_breakfast").children("input").prop("checked", (oData.is_breakfast == 1));
			
			$(nRow).children(".is_lunch").html("<input style='align:middle;' value='0' class='bm_recipe_is_breakfast_checkbox' type='checkbox' name='is_breakfast' onclick='gApp.recipeController.handleCheckboxClick(event)'/>");
			$(nRow).children(".is_breakfast").attr("selectable", "false");
			$(nRow).children(".is_breakfast").children("input").prop("checked", (oData.is_breakfast == 1));
			
			$(nRow).children(".is_breakfast").html("<input style='align:middle;' value='0' class='bm_recipe_is_breakfast_checkbox' type='checkbox' name='is_breakfast' onclick='gApp.recipeController.handleCheckboxClick(event)'/>");
			$(nRow).children(".is_breakfast").attr("selectable", "false");
			$(nRow).children(".is_breakfast").children("input").prop("checked", (oData.is_breakfast == 1));
			
			$(nRow).children(".is_breakfast").html("<input style='align:middle;' value='0' class='bm_recipe_is_breakfast_checkbox' type='checkbox' name='is_breakfast' onclick='gApp.recipeController.handleCheckboxClick(event)'/>");
			$(nRow).children(".is_breakfast").attr("selectable", "false");
			$(nRow).children(".is_breakfast").children("input").prop("checked", (oData.is_breakfast == 1));
			*/
			
								  	
			//NAME EDITING
			$('td[class*="text_input_editable"]', nRow).editable( function(value, settings){
				var recipeId = gApp.recipeController.dataTable._("#" + nRow.id)[0].recipe_id;
				var recipeData = {"recipe_id":recipeId};
				recipeData[this.classList[0]] = value;
				$.ajax({
					data: recipeData,
					type: "POST",
			        url: '/recipes/p_update'
			     }).done(function(oResponse){
					//Reload the data
					gApp.recipeController.dataTable.fnReloadAjax();		
				 }).error(function(xhr, errorStatus, errorText){
					alert("There was an issue updating the recipe: " + errorStatus + ", " + errorText);
				 });
				return(value);
			},
			{	
                "height": "20px",
				event: "dblclick",
				"width": "100%",
				onblur: "submit"
            });

			//NAME EDITING
			$('td[class*="textarea_editable"]', nRow).editable( function(value, settings){
				var recipeId = gApp.recipeController.dataTable._("#" + nRow.id)[0].recipe_id;
				var recipeData = {"recipe_id":recipeId};
				recipeData[this.classList[0]] = value;
				$.ajax({
					data: recipeData,
					type: "POST",
			        url: '/recipes/p_update'
			     }).done(function(oResponse){
					//Reload the data
					gApp.recipeController.dataTable.fnReloadAjax();		
				 }).error(function(xhr, errorStatus, errorText){
					alert("There was an issue updating the recipe: " + errorStatus + ", " + errorText);
				 });
				return(value);
			},
			{	
                "height": "40px",
				event: "dblclick",
				indicator: 'Saving ingredients...',
				type: 'textarea',
				submit:'Save changes',
				cancel: 'Cancel'
            });

			

			
			//DRAG N' DROP TO MEAL GRID
			$(nRow).draggable({
				zIndex:5000,
				cursor: "move",
				scroll: false,
				appendTo: "body",
				helper: function() {
			        //debugger;
			        return $("<div></div>").append($(this).find('td:first').html());
			    }
			});



			
		}
		
		
	});
	


	//RECIPE INGREDIENT AJAX FORM
	$('form[name="bm_recipe_ingredients_form"]').ajaxForm({
		type: 'POST',
		url: '/recipes/p_update/',
		beforeSubmit: function() {
			$('.bm_update_status').html("Updating Ingredients...");
			gApp.recipeController.lockIngredientForm();
		},
		success: function(response) { 
			$('.bm_update_status').html("");	
			gApp.recipeController.dataTable.fnReloadAjax();
			gApp.recipeController.dataTable.$('.row_selected').children()[0].click();
		}
	});
	
	
	//RECIPE STEPS AJAX FiORM
	$('form[name="bm_recipe_steps_form"]').ajaxForm({
		type: 'POST',
		url: '/recipes/p_update/',
		beforeSubmit: function() {
			$('.bm_update_status').html("Updating Steps...");
			gApp.recipeController.lockStepsForm();
		},
		success: function(response) {
			$('.bm_update_status').html("");	
			gApp.recipeController.dataTable.fnReloadAjax();
			gApp.recipeController.dataTable.$('.row_selected').children()[0].click();
		}
	});
	
	
	//MEAL TYPE AJAX FiORM
	$('form[name="bm_recipe_meal_type_form"]').ajaxForm({
		type: 'POST',
		url: '/recipes/p_update/',
		beforeSubmit: function() {
			$('.bm_update_status').html("Updating Meal Type...");
			gApp.recipeController.lockMealTypeForm();
		},
		success: function(response) {
			$('.bm_update_status').html("");
			gApp.recipeController.dataTable.fnReloadAjax();
			gApp.recipeController.dataTable.$('.row_selected').children()[0].click();
		}
	});



	
}


BMRecipeController.prototype.setupRecipeTableCheckbox = function(nRow, oData, sProp){
	$(nRow).children("." + sProp).html("<input style='align:middle;' value='0' class='bm_recipe_table_checkbox' type='checkbox' name='" + sProp + "' onclick='gApp.recipeController.handleCheckboxClick(event)'/>");
	$(nRow).children("." + sProp).attr("selectable", "false");
	$(nRow).children("." + sProp).children("input").prop("checked", (oData[sProp] == 1));
}



BMRecipeController.prototype.handleCheckboxClick = function(e){
	
	var oData = gApp.recipeController.dataTable._("#" + e.target.parentElement.parentElement.id)[0];
	var oPostData = {"recipe_id":oData.recipe_id};
	oPostData[e.target.parentElement.classList[0]] = e.target.checked ? 1 : 0;
	this.updateRecipe(oPostData);
	
}


BMRecipeController.prototype.updateRecipe = function(oRecipeData){
	$.ajax({
		data: oRecipeData,
		type: "POST",
        url: '/recipes/p_update'
     }).done(function(oResponse){
		//Reload the data
		gApp.recipeController.dataTable.fnReloadAjax();		
	 }).error(function(xhr, errorStatus, errorText){
		alert("There was an issue updating the recipe: " + errorStatus + ", " + errorText);
	 });
}







BMRecipeController.prototype.addRecipe = function(){
	
	
	//Create the JQUERY ajax call here, and reload the table on success
	$.ajax({
		dataType:"json",
        url: '/recipes/add'
     }).done(function(oResponse){
		 
		//Reload the data
		gApp.recipeController.dataTable.fnReloadAjax();		
		
		
	 }).error(function(xhr, errorStatus, errorText){
		alert("There was an issue adding a new recipe: " + errorStatus + ", " + errorText);
	 });
	
		
}


BMRecipeController.prototype.updateRecipeName = function(){
	alert("Changed Name");
}


BMRecipeController.prototype.removeSelectedRecipe = function(){
	
	var iSelectedRecipeId = this.dataTable.$('.row_selected').attr("id").substr(1);

	//Create the JQUERY ajax call here, and reload the table on success
	$.ajax({
		dataType:"json",
       	url: '/recipes/delete/' + iSelectedRecipeId
     }).done(function(){
		 gApp.recipeController.dataTable.fnReloadAjax();
		 gApp.recipeController.dataTable.$('tr:last').children()[0].click();
	 }).error(function(xhr, errorStatus, errorText){
		alert("There was an issue removing a recipe: " + errorStatus + ", " + errorText);
	 });
	
		
}



/**************
*INGREDIENT EDITING
***************/

BMRecipeController.prototype.editSelectedRecipeIngredients = function(){
		
	//Toggle the states
	this.unlockIngredientForm();
		
}


BMRecipeController.prototype.saveSelectedRecipeIngredients = function(){
	
	//Submit the Ajax form, and 
	$("#bm_recipe_ingredients_form").submit();
		
}


BMRecipeController.prototype.cancelEditSelectedRecipeIngredients = function(){
	
	//Reload the selected recipe data, and lock the form.
	this.dataTable.$('.row_selected').children()[0].click();
	this.lockIngredientForm();
			
}


BMRecipeController.prototype.lockIngredientForm = function(){
	
	//Revert to the table data, and lock the form fields
	$("#bm_recipe_ingredients_field").attr("readonly", "true");
	
	$("#bm_recipe_ingredient_save_edit_button").toggle();
	
	$("#bm_recipe_ingredient_cancel_edit_button").toggle();
	
	$("#bm_recipe_ingredient_edit_button").toggle();
		
}


BMRecipeController.prototype.unlockIngredientForm = function(){
	
	//Toggle the states
	$("#bm_recipe_ingredients_field").removeAttr("readonly");
	
	$("#bm_recipe_ingredient_save_edit_button").toggle();
	
	$("#bm_recipe_ingredient_cancel_edit_button").toggle();
	
	$("#bm_recipe_ingredient_edit_button").toggle();
		
}



/**************
*PREPARITION STEPS EDITING
***************/

BMRecipeController.prototype.editSelectedRecipeSteps = function(){
		
	//Toggle the states
	this.unlockStepsForm();
	
}


BMRecipeController.prototype.saveSelectedRecipeSteps = function(){
	
	//Submit the Ajax form, and 
	$("#bm_recipe_steps_form").submit();
		
}


BMRecipeController.prototype.cancelEditSelectedRecipeSteps= function(){
		
	//Reload the selected recipe
	this.dataTable.$('.row_selected').children()[0].click();
	this.lockStepsForm();
			
}

BMRecipeController.prototype.lockStepsForm = function(){
	
	//Revert to the table data, and lock the form fields
	$("#bm_recipe_steps_field").attr("readonly", "true");
	
	$("#bm_recipe_steps_save_edit_button").toggle();
	
	$("#bm_recipe_steps_cancel_edit_button").toggle();
	
	$("#bm_recipe_steps_edit_button").toggle();
		
}


BMRecipeController.prototype.unlockStepsForm = function(){
	
	//Revert to the table data, and lock the form fields
	$("#bm_recipe_steps_field").removeAttr("readonly");
	
	$("#bm_recipe_steps_save_edit_button").toggle();
	
	$("#bm_recipe_steps_cancel_edit_button").toggle();
	
	$("#bm_recipe_steps_edit_button").toggle();
		
}




/**************
*MEAL TYPE EDITING
***************/

BMRecipeController.prototype.editSelectedRecipeMealType = function(){
		
	//Toggle the states
	this.unlockMealTypeForm();		
}


BMRecipeController.prototype.saveSelectedRecipeMealType = function(){
	
	//Submit the Ajax form, and 
	$("#bm_recipe_meal_type_form").submit();
		
}


BMRecipeController.prototype.cancelEditSelectedRecipeMealType= function(){
		
	//Reload the selected recipe
	this.dataTable.$('.row_selected').children()[0].click();
	this.lockMealTypeForm();
			
}

BMRecipeController.prototype.lockMealTypeForm = function(){
	
	//Revert to the table data, and lock the form fields
	$("#bm_recipe_meal_type_breakfast_checkbox").attr("disabled", "true");
	$("#bm_recipe_meal_type_lunch_checkbox").attr("disabled", "true");
	$("#bm_recipe_meal_type_snack_checkbox").attr("disabled", "true");
	$("#bm_recipe_meal_type_dinner_checkbox").attr("disabled", "true");
	
	$("#bm_recipe_meal_type_save_edit_button").toggle();	
	$("#bm_recipe_meal_type_cancel_edit_button").toggle();
	$("#bm_recipe_meal_type_edit_button").toggle();
		
}


BMRecipeController.prototype.unlockMealTypeForm = function(){
	
	//Revert to the table data, and lock the form fields
	$("#bm_recipe_meal_type_breakfast_checkbox").removeAttr("disabled");
	$("#bm_recipe_meal_type_lunch_checkbox").removeAttr("disabled");
	$("#bm_recipe_meal_type_snack_checkbox").removeAttr("disabled");
	$("#bm_recipe_meal_type_dinner_checkbox").removeAttr("disabled");

	
	$("#bm_recipe_meal_type_save_edit_button").toggle();	
	$("#bm_recipe_meal_type_cancel_edit_button").toggle();
	$("#bm_recipe_meal_type_edit_button").toggle();
		
}








