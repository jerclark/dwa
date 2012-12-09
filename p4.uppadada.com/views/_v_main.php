<!--Build the recipe UI-->


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
								<textarea readonly editable="false" id="bm_recipe_ingredients_field" name="ingredients" style="height:200px;width:700px;" placeholder="Enter Ingredients Here. Separate ingredients with a carriage return."></textarea>
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
							<span class=".bm_update_status"></span>
						</div>
				    </div>
				</div>
				<!--
				<form name="bm_recipe_metadata_form" method="POST" action="">
					<fieldset>
						Recipe Name: <input id="bm_recipe_form_name" label="Name" type="text" name="bm_recipe_form_name"></input>
						<br>
						Ingredients: <br>
						<textarea id="bm_recipe_form_ingredients" name="recipe_ingredients" style="height:200px;width:700px;" placeholder="Enter Ingredients Here. Separate ingredients with a carriage return."></textarea>
						<br>
						Preparation: <br>
						<textarea id="bm_recipe_form_steps" name="recipe_steps" style="height:200px;width:700px;" placeholder="Enter steps here. Separate steps with a carriage return."></textarea>
						<hidden id="bm_recipe_form_id" name="recipe_id"></hidden>
						<button style="" onclick="gApp.recipeController.cancelUpdateSelectedRecipe()">Cancel</button>
						<button style="" onclick="gApp.recipeController.updateSelectedRecipe()">Update</button>
					</fieldset>
				</form>
				-->
			</div>
			<div id="bm_table_anchor" style="clear:both;"></div>
		</div>
		
		
		<h3>Community Recipes</h3>
		<div id="bm_my_recipes_accordian_panel">
			<div id="bm_recipe_table_wrapper" class="bm_table_wrapper">
				<table id="bm_recipe_table" class="display">
				</table>
				<div>
					<button id="bm_recipe_add_button" type='button' onclick="">Add</button>
					<button type='button' onclick="">Remove</button>
				</div>
			</div>
			<div id="bm_table_anchor" style="clear:both;"></div>
		</div>

</div>


<!--Build the planning grid UI-->
<div id-"bm_planner_wrapper">
	DUDE
</div>