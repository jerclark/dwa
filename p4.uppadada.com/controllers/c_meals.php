<?php
class meals_controller extends base_controller {


	/**
	* List the meals
	* 
	* This will return a list of the meals
	* 
	*/
	public function index($mealplanId = NULL) {
		
		$where_clause = ($mealplanId == NULL) ? "" : "WHERE mealplan_id = ".$mealplanId." order by meal_index asc";
		
		$q = "SELECT * FROM meals ".$where_clause;
				
		$meals = DB::instance(DB_NAME)->select_rows($q);
		
		
		foreach($meals as &$v){
			$v["DT_RowId"] = 'M'.$v["meal_id"];
			
			$recipe = DB::instance(DB_NAME)->select_row("SELECT * from recipes where recipe_id = ".$v["recipe_id"]);
			
			if ($recipe != ""){
				$v["recipe"] = $recipe;
			}
		}
		unset($v);
		
		echo json_encode($meals);
	
	}


	/**
	* Update
	* 
	* This will update a meal from the DB
	* 
	*/
	public function p_update() {
		
		//Auth::bounce(!$this->user);
		$_POST['modified'] = Time::now();

		DB::instance(DB_NAME)->update_row('meals',$_POST,"WHERE meal_id=".$_POST['meal_id']);
		
	
	}


	/**
	* Add
	* 
	* This will add a meal
	* 
	*/
	public function add() {
	
	
		//$data = Array("name" => "New Mealplan", "created" => Time::now(), "modified" => Time::now(), "user_id" => $this->user->user_id);

		#Insert the posted form into the db
		$meal = DB::instance(DB_NAME)->insert('meals',$data);
		
		echo json_encode('M'.$meal);
	
	}
	
	
	
	/**
	* Delete
	* 
	* This will remove a meal from the DB
	* 
	*/
	public function delete($meal_id) {
		
		//Auth::bounce(!$this->user);

		# Delete this recipe
		$where_condition = 'WHERE meal_id = '.$meal_id;
		DB::instance(DB_NAME)->delete('meals', $where_condition);
	
	}
	
	
}