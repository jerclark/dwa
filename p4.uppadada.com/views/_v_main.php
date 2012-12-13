<!--Build the recipe UI-->
<div id="bm_content_wrapper">

<div id="bm_recipe_wrapper">
	
	<div id="bm_recipe_accordian">
	
		<h3>My Recipes</h3>
		<div id="bm_my_recipes_accordian_panel">
			<div id="bm_recipe_table_wrapper" style="float:left;" class="bm_table_wrapper">
				<table id="bm_recipe_table" class="display">
				</table>
				<div>
					<button id="bm_recipe_add_button" type='button' onclick="gApp.recipeController.addRecipe();">Add</button>
					<button type='button' onclick="gApp.recipeController.removeSelectedRecipe()">Remove</button>
				</div>
			</div>
			<div id="bm_metadata_wrapper" style="float:left;margin-left:20px;">
				<div id="bm_recipe_name_label"></div>
				<div id="bm_recipe_tabs">
					
					<!--TABS-->
					<ul>
				        <li><a href="#bm_recipe_ingredient_tab_content">Ingredients</a></li>
				        <li><a href="#bm_recipe_steps_tab_content">Steps</a></li>
				        <li><a href="#bm_recipe_meal_tab_content">Meal Type<a></li>
				    </ul>
					
					<!--INGREDIENT TAB CONTENT-->
					<div id="bm_recipe_ingredient_tab_content">
						<form name="bm_recipe_ingredients_form" id="bm_recipe_ingredients_form">
							<fieldset>
								<textarea readonly id="bm_recipe_ingredients_field" name="ingredients" style="height:200px;width:700px;" placeholder="Enter Ingredients Here. Separate ingredients with a carriage return."></textarea>
								<input hidden class="bm_recipe_id" name="recipe_id"></input>
							</fieldset>
						</form>
						<div id="bm_recipe_ingredient_buttons">
							<button id="bm_recipe_ingredient_edit_button" style="" onclick="gApp.recipeController.editSelectedRecipeIngredients()">Edit</button>
							<button id="bm_recipe_ingredient_save_edit_button" hidden style="" onclick="gApp.recipeController.saveSelectedRecipeIngredients()">Save</button>
							<button id="bm_recipe_ingredient_cancel_edit_button" hidden style="" onclick="gApp.recipeController.cancelEditSelectedRecipeIngredients()">Cancel Edit</button>
							<span class=".bm_update_status"></span>
						</div>
				    </div>
				    
					<!--STEPS TAB CONTENT-->
					<div id="bm_recipe_steps_tab_content">
						<form name="bm_recipe_steps_form" id="bm_recipe_steps_form">
							<fieldset>
								<textarea readonly editable="false" id="bm_recipe_steps_field" name="steps" style="height:200px;width:700px;" placeholder="Enter Preparation Steps Here."></textarea>
								<input hidden class="bm_recipe_id" name="recipe_id"></input>
							</fieldset>
						</form>
						<div id="bm_recipe_steps_buttons">
							<button id="bm_recipe_steps_edit_button" style="" onclick="gApp.recipeController.editSelectedRecipeSteps()">Edit</button>
							<button id="bm_recipe_steps_save_edit_button" hidden style="" onclick="gApp.recipeController.saveSelectedRecipeSteps()">Save</button>
							<button id="bm_recipe_steps_cancel_edit_button" hidden style="" onclick="gApp.recipeController.cancelEditSelectedRecipeSteps()">Cancel Edit</button>
							<span class=".bm_update_status"></span>
						</div>
					</div>
				    
					<div id="bm_recipe_meal_tab_content">
						<form name="bm_recipe_meal_type_form" id="bm_recipe_meal_type_form">
							<fieldset>
								<input type="hidden" name="is_breakfast" value="0" />
								<input disabled type="checkbox" id="bm_recipe_meal_type_breakfast_checkbox" name="is_breakfast" value="1"></input> Breakfast<br>
								<input type="hidden" name="is_lunch" value="0" />
								<input disabled type="checkbox" id="bm_recipe_meal_type_lunch_checkbox" name="is_lunch" value="1"></input> Lunch<br>
								<input type="hidden" name="is_snack" value="0" />
								<input disabled type="checkbox" id="bm_recipe_meal_type_snack_checkbox" name="is_snack" value="1"></input> Snack<br>
								<input type="hidden" name="is_dinner" value="0" />
								<input disabled type="checkbox" id="bm_recipe_meal_type_dinner_checkbox" name="is_dinner" value="1"> Dinner</input>
								<input hidden class="bm_recipe_id" name="recipe_id"></input>
							</fieldset>	
						</form>
						<div id="bm_recipe_meal_type_buttons">
							<button id="bm_recipe_meal_type_edit_button" style="" onclick="gApp.recipeController.editSelectedRecipeMealType()">Edit</button>
							<button id="bm_recipe_meal_type_save_edit_button" hidden style="" onclick="gApp.recipeController.saveSelectedRecipeMealType()">Save</button>
							<button id="bm_recipe_meal_type_cancel_edit_button" hidden style="" onclick="gApp.recipeController.cancelEditSelectedRecipeMealType()">Cancel Edit</button>
							<span class="bm_update_status"></span>
						</div>
				    </div>
				</div>
			</div>
			<div class="bm_table_anchor" style="clear:both;"></div>
		</div>
		<!--
		<h3>Community Recipes</h3>
		<div id="bm_community_recipes_accordian_panel">
			
			<div id="bm_community_recipe_table_wrapper" class="bm_table_wrapper">
				<table id="bm_community_recipe_table" class="display">
				</table>
			</div>
			<div class="bm_table_anchor" style="clear:both;"></div>
		
			<div class="bm_table_anchor" style="clear:both;"></div>
		</div>
		-->
		
	</div>
		

</div>


<!--Build the planning grid UI-->
<div id="bm_planner_wrapper">
	
	<h3>Meal Planner</h3>
	<div id="bm_meal_plan_table_wrapper" style="float:left;" class="bm_table_wrapper">
		<table id="bm_meal_plan_table" class="display">
		</table>
		<div>
			<button id="bm_meal_plan_add_button" type='button' onclick="gApp.mealplanController.addMealplan();">Add</button>
			<button type='button' onclick="gApp.mealplanController.removeMealplan()">Remove</button>
		</div>
	</div>
	
	<div id="bm_metadata_wrapper" style="float:left;margin-left:20px;">
		<!--div id="bm_mealplan_tabs"-->
	
			<!--TABS-->
			<!--ul>
		        <li><a href="#bm_mealplan_setup_tab_content">Setup</a></li>
		        <li><a href="#bm_mealplan_grid_tab_content">Plan</a></li>
		    </ul-->
		
			<!--SETUP TAB CONTENT-->
			<div id="bm_mealplan_setup_content">
				<form name="bm_mealplan_setup_form" id="bm_mealplan_setup_form">
					
					<fieldset>
						<label for="start_date">Plan Start Date:</label>
						<input type="text" id="bm_mealplan_start_date" name="start_date"/>
						<label for="end_date">Plan End Date:</label>
						<input type="text" id="bm_mealplan_end_date" name="end_date"/>
						<input hidden class="bm_mealplan_id" name="mealplan_id"></input>
					</fieldset>
					
				</form>
		    </div>
		
			<div id="bm_mealplan_setup_buttons">
				<button id="bm_mealplan_edit_button" style="" onclick="gApp.mealplanController.editSelectedMealplan()">Edit</button>
				<button id="bm_mealplan_save_edit_button" hidden style="" onclick="gApp.mealplanController.saveSelectedMealplan()">Save</button>
				<button id="bm_mealplan_cancel_edit_button" hidden style="" onclick="gApp.mealplanController.cancelEditSelectedMealplan()">Cancel Edit</button>
				<span id="bm_mealplan_status"></span>
			</div>
			
			<div id="bm_mealplan_grid_wrapper">
				<div id="bm_mealplan_grid_headers">
					<div  class="bm_mealplan_grid_cell bm_mealplan_grid_column_header" id="bm_mealplan_grid_column_header_day" style="visibility:hidden;">Day</div>
					<div class="bm_mealplan_grid_cell bm_mealplan_grid_column_header" id="bm_mealplan_grid_column_header_breakfast">Breakfast</div>
					<div class="bm_mealplan_grid_cell bm_mealplan_grid_column_header" id="bm_mealplan_grid_column_header_lunch">Lunch</div>
					<div class="bm_mealplan_grid_cell bm_mealplan_grid_column_header" id="bm_mealplan_grid_column_header_snack">Snack</div>
					<div class="bm_mealplan_grid_cell bm_mealplan_grid_column_header" id="bm_mealplan_grid_column_header_dinner">Dinner</div>
				</div>
			
				<div id="bm_mealplan_grid_content">
					<div id="bm_mealplan_grid_placeholder" style="border:2px solid gray;background:white;padding:20px;height:50px;border-radius:15px;">
						<span style="color:gray;align:center;margin:auto;"><i>Create/Select a meal plan to schdule meals!</i></span>
					</div>
			    </div>
			
				<div id="bm_grid_anchor" style="clear:both;"></div>
			
			</div>
			
		<!--/div--> <!--END OF THE TABS, SHOULD WE GET THEM TO WORK-->

	</div>
	
	
	
	<div id="bm_table_anchor" style="clear:both;"></div>

	
	
</div>


</div>