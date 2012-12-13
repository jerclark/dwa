<?php
class mealplans_controller extends base_controller {


	/**
	* List the mealplans
	* 
	* This will return a list of the mealplans
	* 
	*/
	public function index() {
	
		$q = "SELECT * FROM mealplans";
		
		$mealplans = DB::instance(DB_NAME)->select_rows($q);
		
		foreach($mealplans as &$v){
			$v["DT_RowId"] = 'MP'.$v["mealplan_id"];
		}
		unset($v);
		
		echo '{"aaData":'.json_encode($mealplans).'}';
	
	}


	/**
	* Add
	* 
	* This will add a mealplan
	* 
	*/
	public function add() {
	
	
		$data = Array("name" => "New Mealplan", "created" => Time::now(), "modified" => Time::now(), "user_id" => $this->user->user_id);

		#Insert the posted form into the db
		$mealplan = DB::instance(DB_NAME)->insert('mealplans',$data);
		
		echo json_encode('MP'.$mealplan);
	
	}
	


	/**
	* Update
	* 
	* This will update the mealplan data in the DB
	* 
	*/
	public function p_update() {
				
		#Update the mod time
		$_POST['modified'] = Time::now();
		
		#Insert the posted data into the db
		DB::instance(DB_NAME)->update_row('mealplans',$_POST,"WHERE mealplan_id=".$_POST['mealplan_id']);
		
		#Get the number of meals
		$startDate = $_POST['start_date'];
		$endDate = $_POST['end_date'];
		$numDays = ( (strtotime($endDate) - strtotime($startDate))/86400 ) + 1;
		$numMeals = ($numDays * 4);

		
		#for each meal, add it to the DB if it doesn't exist. If it does, update the meal date just in case the user changed the range.
		for ($i=0;$i<$numMeals;$i++){
			
			$mealType = $i % 4;
			$mealDate = date(DATE_ISO8601, strtotime($startDate."+".floor($i / 4)." days"));
			
			//First add/update any new meals
			$q = "INSERT INTO meals (`mealplan_id`,`meal_type`,`meal_index`, `meal_date`, `created`, `modified`) VALUES (".$_POST['mealplan_id'].",".$mealType.",".$i.",'".$mealDate."',".Time::now().",".Time::now().") ON DUPLICATE KEY UPDATE meal_date='".$mealDate."'";
			
			DB::instance(DB_NAME)->query($q);
			
		}
		
		#Now, delete any meals that are outside the range in case the user shortened the range
		$where_condition = 'WHERE meal_index > '.($numMeals - 1).' AND mealplan_id = '.$_POST['mealplan_id'];
		DB::instance(DB_NAME)->delete("meals", $where_condition);
		
		
	}
	
	
	
	
	
	
}