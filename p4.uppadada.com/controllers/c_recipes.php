<?php
class recipes_controller extends base_controller {


	/**
	* List the recipes
	* 
	* This will return a list of the recipes
	* 
	*/
	public function index() {
	
		$q = "SELECT * FROM recipes";
		
		$recipes = DB::instance(DB_NAME)->select_rows($q);
		
		foreach($recipes as &$v){
			$v["DT_RowId"] = 'R'.$v["recipe_id"];
		}
		unset($v);
		
		echo '{"aaData":'.json_encode($recipes).'}';
	
	}



	/**
	* Add
	* 
	* This will add a recipe
	* 
	*/
	public function add() {
	
	
		$data = Array("name" => "New Recipe", "created" => Time::now(), "modified" => Time::now());

		#Insert the posted form into the db
		$recipe = DB::instance(DB_NAME)->insert('recipes',$data);
		
		echo json_encode('R'.$recipe);
	
	}	
	
	
	/**
	* Delete
	* 
	* This will remove a recipe from the DB
	* 
	*/
	public function delete($recipe_id) {

		# Delete this recipe
		$where_condition = 'WHERE recipe_id = '.$recipe_id;
		DB::instance(DB_NAME)->delete('recipes', $where_condition);
	
	}

	
	
	
	/**
	* Update
	* 
	* This will update the recipe data in the DB
	* 
	*/
	public function p_update() {
				
		#Update the mod time
		$_POST['modified'] = Time::now();		

		#Insert the posted data into the db
		DB::instance(DB_NAME)->update_row('recipes',$_POST,"WHERE recipe_id=".$_POST['recipe_id']);
	
	}
	


}