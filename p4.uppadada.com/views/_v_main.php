<!--NOTES-->
<i><small>Compatibility Note: Has been tested with Chrome (Version 23.0.1271.64), Firefox (16.0.2), Safari (5.1.7) and IE 9 (9.0.8112.16421). Safari has some slight usage issues, and IE8 or earlier will not work.</small></i>
<br>
<small>Click here to see the <a href="http://p4.uppadada.com/proposal.html">original proposal</a>, which includes some background and usage information. This implementation below is not exactly as specified in the original proposal, but I believe the spirit of the original proposal is captured.</small>


<!--Build the recipe UI-->
<div id="bm_content_wrapper">

<div id="bm_recipe_wrapper">
	
	<!--div id="bm_recipe_accordian"-->
	
		<div id="header_wrapper">
			<div style="float:left;font-size:175%;margin-left:10px;margin-bottom:10px;">Recipes</div>
			<div style="float:left;margin-left:30px;vertical-align:bottom;color:green;" title="<ul><li>Get started by browsing and adding recipes, using the 'Add/Remove' buttons below the table.</li><li>You can double-click the data cells to edit the properties of recipes you create.</li><li>Check any combination of Breakfast/Lunch/Snack/Dinner to enable that recipe for 'auto-fill'.</li><li>For example, if 'breakfast' is checked, that recipe will be part of the random pool of 'breakfast' recipes for the auto-fill functionality.</li></ul>">
					<small><i>Rollover for Usage Tips</i></small>
			</div>
		</div>
		<div id="bm_recipe_table_outer_wrapper" style="float:left;width:95%;" class="bm_table_wrapper">
			<table id="bm_recipe_table" class="display">
			</table>
			<div>
				<button id="bm_recipe_add_button" type='button' onclick="gApp.recipeController.addRecipe();">Add</button>
				<button type='button' onclick="gApp.recipeController.removeSelectedRecipe()">Remove</button>
			</div>
		</div>
		

		
	<div class="bm_table_anchor" style="clear:both;"></div>
	

</div>


<!--Build the planning grid UI-->
<div id="bm_planner_wrapper">
	
	<div id="header_wrapper">
		<div style="float:left;font-size:175%;margin-left:10px;margin-bottom:10px;">Meal Planner</div>
		<div style="float:left;margin-left:30px;vertical-align:bottom;color:green;" title="<ul><li>Start meal planning by creating a meal plan in the table below. Set the date range for the meal plan (max 2 weeks).</li><li>As you update the date range, you'll see the grid to the right update with a 'meal' placeholder for each meal in that date range.</li><li>You can assign recipes by dragging them from the recipe table above or by clicking the 'auto-fill' button.</li><li>When auto-filling, the app will only apply recipes with the appropriate 'meal type' (i.e., only recipes marked 'breakfast' will plot to breakfast).</li><li>If dragging a recipe from above, you can place the recipe anywhere you like (i.e., the meal checkboxes have no effect.)</li><li>You can also drag/drop the meals cells on each other, in order to switch the recipes for specific meals.</li><li>As you add meals, you'll see the shopping list update.</li><li>Hover over the meal cells to see the ingredients and the preparation steps.</li></ul>"><small><i>Rollover for Usage Tips</i></small></div>
	</div>
		
	<div id="bm_meal_plan_config_wrapper" style="clear:both;float:left;width:30%;">
	
		<div id="bm_meal_plan_table_outer_wrapper">
			<table id="bm_meal_plan_table" class="display">
			</table>
			<div>
				<button id="bm_meal_plan_add_button" type='button' onclick="gApp.mealplanController.addMealplan();">Add</button>
				<button type='button' onclick="gApp.mealplanController.removeSelectedMealplan()">Remove</button>
			</div>
		</div>
		
		<br>
		
		<div id="bm_mealplan_shopping_list_outer_wrapper" style="width:100%;clear:both;">
			
			<div id="bm_mealplan_shopping_inner_wrapper">
				<h3>Shopping List</h3>
				<ul id="bm_mealplan_shopping_list"></ul>
			</div>

		</div>
		
		<div style="clear:both;"></div>
		
	</div>
	
	<div id="bm_mealplan_grid_wrapper" style="float:right;margin-left:30px;">
		
		<div id="bm_mealplan_grid_headers">
			<div class="bm_mealplan_grid_cell bm_mealplan_grid_auto_plan_button" id="bm_mealplan_grid_auto_fill_button_cell">
				<button onClick="gApp.mealplanController.autoPlan()">Auto-Fill!</button>
				<div style="float:right;display:none;" id="bm_auto_fill_activity_indicator"><image src="/images/spinner2-greenie.gif" width="20px" height="20px"></image></div>
			</div>
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

	<div style="clear:both;"></div>
	
</div>

</div>


