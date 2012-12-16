function BMMealGridController(){
	
	
}


BMMealGridController.prototype.displayGridForMealplan = function(aoMeals){
	
	//Clear out the content
	$("#bm_mealplan_grid_content").html("");
	$("#bm_mealplan_shopping_list").html("");
	
	//First Create the rows, with the "date" row headers
	var rowCount = aoMeals.length / 4;
	for (var i=0;i<rowCount;i++){
		
		var sRowId = "bm_mealplan_row_" + i;
		
		//Add the row
		$("#bm_mealplan_grid_content").append('<div class="bm_mealplan_row" id="' + sRowId + '" style="clear:both;"></div>');
		
		//Add the row header - the date
		$("#" + sRowId).append('<div class="bm_mealplan_grid_cell bm_mealplan_grid_row_header">' + aoMeals[i*4].meal_date + '</div>')
	}
	
	//Compose the Grid and the Ingredient Lis
	for (var i=0;i<aoMeals.length;i++){
		
		//Add the cell for the next meal
		var targetRowIndex = Math.floor(i / 4);
		var sCellLabel = aoMeals[i].recipe ? aoMeals[i].recipe.name : aoMeals[i].meal_id;
		$("#bm_mealplan_row_" + targetRowIndex).append('<div class="bm_mealplan_grid_cell bm_mealplan_grid_body" id="' + aoMeals[i].meal_id + '">' + sCellLabel + '</div>');
		
		//Setup the data object on the cell
		$("#" + aoMeals[i].meal_id).data('meal', aoMeals[i]);
		
		//Setup the draggable cell
		$("#" + aoMeals[i].meal_id).draggable({
			revert: true,
			zIndex:100,
			cursor: "move",
			containment: "#bm_mealplan_grid_wrapper", 
			scroll: false
		});
		
		//Setup the droppable event for other meals
		$("#" + aoMeals[i].meal_id).droppable({
			accept: ".bm_mealplan_grid_cell,tr",
			hoverClass: "ui-state-active",
			drop: function( event, ui ) {
				
				var iSourceRecipeId;
				var oSourceMeal;
				
				//If it's another meal grid cell
				if (ui.draggable.hasClass("bm_mealplan_grid_cell")){
					oSourceMeal = ui.draggable.data().meal;
					iSourceRecipeId = oSourceMeal.recipe_id; 
				//Otherwise if it's a table row	
				}else{
					iSourceRecipeId = ui.draggable[0].id.substring(1);
				}
				
				
				
				//Post an update for the target meal
				var targetMeal = $(this).data().meal;
				$.post("/meals/p_update", {"meal_id":targetMeal.meal_id, "recipe_id":iSourceRecipeId})
				 .success(function() { 
					//gApp.mealplanController.refresh();
				  })
				 .error(function() { 
					alert("error"); 
				  })
				 .complete(function() { 
					gApp.mealplanController.refresh();
				 });
				
				
				//If it was another grid cell, post an update for the source cell
				if (ui.draggable.hasClass("bm_mealplan_grid_cell")){
					//Post an update for the source meal
					$.post("/meals/p_update", {"meal_id":oSourceMeal.meal_id, "recipe_id":targetMeal.recipe_id})
					 .success(function() { 
						//gApp.mealplanController.refresh();
					  })
					 .error(function() { 
						//alert("error"); 
					  })
					 .complete(function() { 
						gApp.mealplanController.refresh();
					  });
				}
				
				
            }
		});
		
		//Append the ingredients to the ingredients list
		if (aoMeals[i].recipe && aoMeals[i].recipe.ingredients){
			$("#bm_mealplan_shopping_list").append("<li>" + aoMeals[i].recipe.ingredients.replace(/\n/g, "<li>"));
		}
		
		

	}
	
	
}
