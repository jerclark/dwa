function BMMealGridController(){
	
	
}


BMMealGridController.prototype.displayGridForMealplan = function(aoMeals){
	
	//First Create the rows, with the "date" row headers
	$("#bm_mealplan_grid_content").html("");
	var rowCount = aoMeals.length / 4;
	for (var i=0;i<rowCount;i++){
		
		var sRowId = "bm_mealplan_row_" + i;
		
		//Add the row
		$("#bm_mealplan_grid_content").append('<div class="bm_mealplan_row" id="' + sRowId + '"></div>');
		
		//Add the row header - the date
		$("#" + sRowId).append('<div class="bm_mealplan_grid_cell bm_mealplan_grid_row_header">' + aoMeals[i*4].meal_date + '</div>')
	}
	
	//Now place the cells
	for (var i=0;i<aoMeals.length;i++){
		var targetRowIndex = Math.floor(i / 4);
		var sCellLabel = aoMeals[i].recipe ? aoMeals[i].recipe.name : aoMeals[i].meal_id;
		$("#bm_mealplan_row_" + targetRowIndex).append('<div class="bm_mealplan_grid_cell bm_mealplan_grid_body" id="' + aoMeals[i].meal_id + '">' + sCellLabel + '</div>');
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
			accept: ".bm_mealplan_grid_cell",
			hoverClass: "ui-state-active",
			drop: function( event, ui ) {
				
				var sourceMeal = ui.draggable.data().meal;
				var targetMeal = $(this).data().meal;
				
				
				//Post an update for the source meal
				$.post("/meals/p_update", {"meal_id":sourceMeal.meal_id, "recipe_id":targetMeal.recipe_id})
				 .success(function() { 
					//gApp.mealplanController.refresh();
				  })
				 .error(function() { 
					//alert("error"); 
				  })
				 .complete(function() { 
					gApp.mealplanController.refresh();
				  });
				
				
				//Post an update for the target meal
				$.post("/meals/p_update", {"meal_id":targetMeal.meal_id, "recipe_id":sourceMeal.recipe_id})
				 .success(function() { 
					//gApp.mealplanController.refresh();
				  })
				 .error(function() { 
					alert("error"); 
				  })
				 .complete(function() { 
					gApp.mealplanController.refresh();
				  });
				
            }
		});
		
	
		//Setup the droppable event for recipes from the tables
		$("#" + aoMeals[i].meal_id).droppable({
			accept: "tr",
			hoverClass: "ui-state-active",
			drop: function( event, ui ) {

				var sourceRecipeId = ui.draggable[0].id;
				var targetMeal = $(this).data().meal;


				//Post an update for the target meal
				$.post("/meals/p_update", {"meal_id":targetMeal.meal_id, "recipe_id":sourceRecipeId.substring(1)})
				 .success(function() { 
					//gApp.mealplanController.refresh();
				  })
				 .error(function() { 
					alert("error"); 
				  })
				 .complete(function() { 
					gApp.mealplanController.refresh();
				  });

            }
		});
		
		
	}
	
	
}
