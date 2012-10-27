<?php


class subscriptions_controller extends base_controller {
	
	public $client_files;
	
	public function __construct() {
		parent::__construct(); //Must call parent's __construct method
		#echo "users_controller construct called<br><br>";
		
		#$this->client_files = Array("/css/subscriptions.css", "/js/users.js");
		$this->template->client_files = Utils::load_client_files($this->client_files); //This uses a utililty method in UTILS
				
	}
	
	
	/**
 	* Create a subscription
	* 
	* Become a follower of another user, and get access to their posts in your post index
	*
	* @subscribed_id The id of the user to follow
	* 
	*/
	public function create($subscribed_id) {
	
		Auth::bounce(!$this->user);
		
		$data = Array("created" => Time::now(), "subscriber_id" => $this->user->user_id, "subscribed_id" => $subscribed_id);
		
		#Create a record in the "subscription" that joins you to the person you want to follow
		DB::instance(DB_NAME)->insert("subscriptions", $data);
		
		Router::redirect("/posts/index");
		
	}
	
	
	/**
 	* Check whether a subscription exists
	* 
	* Check whether I'm subscribed to a user
	*
	* @subscribed_id The id of the user to follow
	* 
	*/
	public function destroy($subscribed_id) {
	
		Auth::bounce(!$this->user);
		
		$data = Array("created" => Time::now(), "subscriber_id" => $this->user->user_id, "subscribed_id" => $subscribed_id);
		
		#Create a record in the "subscription" that joins you to the person you want to follow
		DB::instance(DB_NAME)->insert("subscriptions", $data);
		
		Router::redirect("/posts/index");
		
	}
	
	

	
	
	
	
}