<?php
class users_controller extends base_controller {
	
	public $client_files;
	
	public function __construct() {
		parent::__construct(); //Must call parent's __construct method
		#echo "users_controller construct called<br><br>";
		
		$this->client_files = Array("/css/users.css", "/js/users.js");
		$this->template->client_files = Utils::load_client_files($this->client_files); //This uses a utililty method in UTILS
				
	} 
	
	
	/**
 	* List the users
	* 
	* This will list all the users that the current user is following.
	* 
	*/
	public function index() {
		
		Auth::bounce(!$this->user);
		
		Router::redirect("/users/search");
		
	}
	
	
	
	/**
 	* Search for a user
	* 
	* This will take a search term and do a "LIKE" query agains e-mail, first name and last name
	* 
	*/
	public function search(){
		
		if(!$this->user){
			Router::redirect("/users/login/");
			return false;
		}
		
		#Get all of the users in the system
		$q = "SELECT user_id,first_name,last_name from users where (user_id != ".$this->user->user_id.")";
		$users = DB::instance(DB_NAME)->select_rows($q);
		
		#Load up connections to those users
		$q = "SELECT * FROM subscriptions WHERE (subscriber_id = ".$this->user->user_id.")";
		$connections = DB::instance(DB_NAME)->select_array($q, 'subscribed_id');
			
		#Setup the template	
		$this->template->title = "Connect with comrades!";
		
		#load the content
		$this->template->content = View::instance("v_users_search");
		$this->template->content->search_results = View::instance("v_users_search_results");
		$this->template->content->search_results->results = $users;
		$this->template->content->search_results->connections = $connections;
		
	
		#This renders the view
		echo $this->template;
	
		
	}
	
	
	public function p_search(){
		
		if (!$this->user){
			Router::redirect("/users/login/");
			return false;
		}
			
		
		#Search for users
		if ( strlen($_POST['search_string']) == 0 ){ #Get all users if search string is empty
			$q = "SELECT user_id,first_name,last_name from users where (user_id != ".$this->user->user_id.")";
		}else{ 	#only find users matching the search string
			$q = "SELECT user_id,first_name,last_name from users where 
			(((email LIKE '%".$_POST['search_string']."%') or
			(first_name LIKE '%".$_POST['search_string']."%') or 
			(last_name LIKE '%".$_POST['search_string']."%')) and
			(user_id != ".$this->user->user_id."))";
		}
		$users = DB::instance(DB_NAME)->select_rows($q);
		
		$this->template->content = View::instance("v_users_search");
		$this->template->content->search_results = View::instance("v_users_search_results");
		$this->template->content->search_results->results = $users;
		
		#$this->template->content = View::instance("v_users_search_results");
		#$this->template->content->results = $users;	
		
		echo $this->template;	
		
	}
	
	
	/**
 	* Signup
	* 
	* This will display a signup form to create an account
	* 
	*/
	public function signup_edit() {

		$this->template->title = "User Signup";
	
		#load the content
		$this->template->content = View::instance("v_users_signup_edit");
		
		#This renders the view
		echo $this->template;

	}
	
	
	/**
 	* p_signup
	* 
	* This will process the sign up form
	* 
	*/
	public function p_signup_edit() {
		
		#Dump out the results of POST to see what the form submitted
		#print_r($_POST);
		
		if (strlen($_POST['password']) < 5){
			die("Please enter a password of 5 or more characters!");
		}
		
		# Encrypt the password	
		$_POST['password'] = sha1(PASSWORD_SALT.$_POST['password']);
		
		# Add the timestamps
		$_POST['created'] = Time::now();
		$_POST['modified'] = Time::now();		
			
		# Add/encrypt the token	
		$_POST['token'] = sha1(TOKEN_SALT.$_POST['email'].Utils::generate_random_string());
		
		
		if ($this->user){ #We're updating the current user
			
			#Insert the posted form into the db
			DB::instance(DB_NAME)->update_row('users',$_POST,"WHERE user_id=".$this->user->user_id);
		
			#Reroute to the user's profile
			Router::redirect("/users/profile");
			
		
		}else{	#We're creating a new user
			
			#Insert the posted form into the db
			$new_user_id = DB::instance(DB_NAME)->insert('users',$_POST);
			
			#Create a "subscription" to yourself
			$data = Array("created" => Time::now(), "subscriber_id" => $new_user_id, "subscribed_id" => $new_user_id);
			DB::instance(DB_NAME)->insert("subscriptions", $data);
		
			#Reply with success
			Router::redirect("/users/login");
		}

	}
	
	
	/**
 	* Login
	* 
	* This will display a user/pass form for a user to login
	* 
	*/
	public function login() {
		
		$this->template->content = View::instance("v_users_login");
		
		echo $this->template;
	}
	
	
	/**
 	* Process Login
	* 
	* This will display a user/pass form for a user to login
	* 
	*/
	public function p_login() {
		
		$_POST['password'] = sha1(PASSWORD_SALT.$_POST['password']);
		
		$q = "SELECT token from users where email='".$_POST['email']."' and password='".$_POST['password']."'";
		
		$token = DB::instance(DB_NAME)->select_field($q);
		
		//NO TOKEN!
		if($token == ""){
			Router::redirect("/users/login/");
		}else{
			setcookie("token", $token, strtotime('+2 weeks'), '/');
		}
		
		Router::redirect("/posts/index/");
	}
	
	
	
	
	/**
 	* Logout
	* 
	* This will log the current user out of the application, and display a logout confirmation
	* 
	*/
	public function logout() {
		
		//DELETE THE COOKIE!!!
		setcookie ("token", $token, strtotime('-1 hour'), '/');
		
		$this->template->content = View::instance("v_users_logout");
		
		$this->template->user = NULL;
		
		echo $this->template;
		
	}
	
	
	/**
 	* Profile
	* 
	* This will display the profile information for a user
	* 
	*/
	public function profile() {
		
		/*Traditionally, we might use:
			require_once("/../core/libraries/View.php");
		But the framework auto-loads the libraries, so we can just use library classes.*/
		
		//Use !this->user to test whether the user is logged in.
		if (!$this->user){
		
			Router::redirect("/users/login/");
			return false;
		
		}else {
			
			#Set the content of the master _v_template (content is a variable defined in the body of the _v_template)
			$this->template->content = View::instance("v_users_profile");
			
			#This passes the "user_name" variable to the view. Any data available to the Controller needs to be passed to the
			#view in this way
			$this->template->content->user_name = $user_name;
			
			#This will setup the "client_files" in the view. Stuff like CSS, etc.
			$this->template->client_files = Utils::load_client_files($this->client_files); //This uses a utililty method in UTILS
			
			#This renders the view
			echo $this->template; 
			
		}
	}
	
	
	/**
 	* Process Profile
	* 
	* This will display the profile information for a user
	* 
	*/
	public function p_profile() {
		
		
		//Use !this->user to test whether the user is logged in.
		if (!$this->user){
			Router::redirect("/users/login/");
			return false;
		}
		
		
		if($user_name == NULL) {	
			echo "No user specified";
		}
		else {
			
			#Set the content of the master _v_template (content is a variable defined in the body of the _v_template)
			$this->template->content = View::instance("v_users_profile");
			
			#This passes the "user_name" variable to the view. Any data available to the Controller needs to be passed to the
			#view in this way
			$this->template->content->user_name = $user_name;
			
			#This will setup the "client_files" in the view. Stuff like CSS, etc.
			$this->template->client_files = Utils::load_client_files($this->client_files); //This uses a utililty method in UTILS
			
			#This renders the view
			echo $this->template; 
			
		}
	}
	
	
	
	
	
	/**
 	* Follow a user
	* 
	* Become a follower of another user, and get access to their posts in your post index
	*
	* @user_name The name of the user to follow
	* 
	*/
	public function subscribe($subscribed_id) {
	
		Auth::bounce(!$this->user);
		
		$data = Array("created" => Time::now(), "subscriber_id" => $this->user->user_id, "subscribed_id" => $subscribed_id);
		
		#Create a record in the "subscription" that joins you to the person you want to follow
		DB::instance(DB_NAME)->insert("subscriptions", $data);
		
		Router::redirect("/posts/index");
		
	}
	

	
	
	
	
} # end of the class