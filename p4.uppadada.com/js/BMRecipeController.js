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
		
		"bFilter": false,
		
		"bInfo": false,

		"sScrollY": "350px",
		
		"bPaginate": false,
		
		"bJQueryUI": true,
		
		"sAjaxSource": "/recipes/index",
		
		"aoColumns": [
					{"mData":"name","sTitle":"Recipes"}
				],
			
	    "fnDrawCallback": function( oSettings ) {
		    if (this.$('tr').length > 0){
				this.$('tr:last').children()[0].click();
			}
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


BMRecipeController.prototype.addRecipe = function(){
	
	
	//Create the JQUERY ajax call here, and reload the table on success
	$.ajax({
		dataType:"json",
        url: '/recipes/add'
     }).done(function(oResponse){
		 gApp.recipeController.dataTable.fnReloadAjax();
	 }).error(function(xhr, errorStatus, errorText){
		alert("There was an issue adding a new recipe: " + errorStatus + ", " + errorText);
	 });
	
		
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








