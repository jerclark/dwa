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
 	* Display the "search" page
	* 
	* This will display a list of all available users, along with a search form to find users by name, e-mail, etc.
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
	
	
	/**
 	* Process a search for users
	* 
	* This will lookup users based on the passed in search string
	* 
	*/
	public function p_search(){
		
		if (!$this->user){
			Router::redirect("/users/login/");
			return false;
		}
			
		
		#Search for users
		
		$_POST = DB::instance(DB_NAME)->sanitize($_POST);#sanitize the search string post
	
		
		if ( strlen($_POST['search_string']) == 0 ){ #Get all users if search string is empty
			$q = "SELECT user_id,first_name,last_name from users ".$where_clause; //where (user_id != ".$this->user->user_id.")";
			
		}else{ 	#only find users matching the search string - check agains e-mail, firstname, lastname, firstname+lastname
			$q = "SELECT user_id,first_name,last_name from users where 
			(((email LIKE '%".$_POST['search_string']."%') or
			(first_name LIKE '%".$_POST['search_string']."%') or 
			(last_name LIKE '%".$_POST['search_string']."%') or
			(CONCAT(first_name, ' ', last_name) LIKE '%".$_POST['search_string']."%')) and
			(user_id != ".$this->user->user_id."))";
		}
		$users = DB::instance(DB_NAME)->select_rows($q);
		
		$this->template->content = View::instance("v_users_search");
		$this->template->content->search_results = View::instance("v_users_search_results");
		$this->template->content->search_results->results = $users;
		
		echo $this->template;	
		
	}
	
	
	/**
 	* Signup/Edit
	* 
	* This will display a signup form to create an account or edit an existing account
	* 
	* We're using one method/view here because as the form gets more sophisticated (collecting more data, etc.) it will be nice
	* to only have to update one view. There is forked logic when handling password/token setup, as an existing won't necessicarily be entering/changing
	* that information.
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
	* This will process the signup form
	*
	*/
	public function p_signup() {
		
		#Dump out the results of POST to see what the form submitted
		#print_r($_POST);
		
		if (count($_POST) == 0){ #This means we canceled, or a form with nothing in it got posted
			Router::redirect("/index/index");
			die();
		}
		
		if ( (!$this->user) && (strlen($_POST['password']) < 5) ){ #extra bullet proofing. This condition should never be met because of the client-side form validtion 
			die("Please enter a password of 5 or more characters!");
		}

		# Encrypt the password
		$_POST['password'] = sha1(PASSWORD_SALT.$_POST['password']);

		# Add the timestamps
		$_POST['created'] = Time::now();
		$_POST['modified'] = Time::now();		

		# Add/encrypt the token	
		$_POST['token'] = sha1(TOKEN_SALT.$_POST['email'].Utils::generate_random_string());
					
		#Insert the posted form into the db
		$new_user_id = DB::instance(DB_NAME)->insert('users',$_POST);
		
		#save the posted profile image
		$this->save_profile_image($_FILES, $new_user_id);
		
		#Create a "subscription" to yourself
		$data = Array("created" => Time::now(), "subscriber_id" => $new_user_id, "subscribed_id" => $new_user_id);
		DB::instance(DB_NAME)->insert("subscriptions", $data);
	
		#Reply with success
		Router::redirect("/users/login");

	}
	
	
	
	/**
 	* p_edit_profile
	* 
	* This will process the edit profile form
	*
	*/
	public function p_edit_profile() {
		
		#Dump out the results of POST to see what the form submitted
		#print_r($_POST);
		
		if (count($_POST) == 0){ #This means we canceled, or a form with nothing in it got posted
			Router::redirect("/users/profile");
			die();
		}

		#process the passed in image
		$this->save_profile_image($_FILES, $this->user->user_id);
			
		if (empty($_POST['password'])){ #We need to get rid of the password value in the post - we don't want to 'reset' this.
			unset($_POST['password']);
		}else{ # User is updating the password - Encrypt the password
			$_POST['password'] = sha1(PASSWORD_SALT.$_POST['password']);
		}
		
		#Update the mod time
		$_POST['modified'] = Time::now();		
		
		#Insert the posted form into the db
		DB::instance(DB_NAME)->update_row('users',$_POST,"WHERE user_id=".$this->user->user_id);
	
		#Reroute to the user's profile
		Router::redirect("/users/profile");
			
	}
	
	
	
	/**
 	* save_profile_image
	* 
	* This will process save a profile image when a user signs up or edits their profile
	*
	* First, it checks whether image data is attached.
	* If so, then it saves a cropped copy of the uploaded file as the user's profile image (it also keeps a copy of th originally uploaded file); 
	* If not, then it creates a random colored checkerboard image as a placeholder.
	*
	*/
	private function save_profile_image($file_data, $user_id){
		
		$profile_filename = $user_id."_profile.png";
		
		#process the passed in image
		if ($file_data['Filedata']['size'] > 0) {
			$raw_filename = $user_id."_original";
			$img_filename = $this->upload($file_data, "/profile_images/", array("jpg", "jpeg", "gif", "png"), $raw_filename);
			$img = new Image(APP_PATH."profile_images/".$img_filename);
			$img->resize(100,100, "crop");
			$img->save_image(APP_PATH."profile_images/".$profile_filename);
		}else{
			$img = new Image(APP_PATH."profile_images/".$profile_filename);
			if (!$img->exists()){
				$img->generate_random_image(100, 100, true);
			}
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
		
		$_POST = DB::instance(DB_NAME)->sanitize($_POST);
		
		$q = "SELECT token from users where email='".$_POST['email']."' and password='".$_POST['password']."'";
		
		$token = DB::instance(DB_NAME)->select_field($q);
		
		//NO TOKEN!
		if($token == ""){
			$this->template->content = View::instance("v_users_login");
			$this->template->flash_error = "Login Incorrect. Please try again.";
			echo $this->template;
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
	

	private function upload($file_obj, $upload_dir, $allowed_files, $new_file_name = NULL) {
	
		$original_file_name = $file_obj['Filedata']['name'];
		$temp_file          = $file_obj['Filedata']['tmp_name'];
		$upload_dir         = $upload_dir;
		
		if($new_file_name == NULL) $new_file_name = $original_file_name;
		
		$file_parts  = pathinfo($original_file_name);
		$target_file = getcwd().$upload_dir . $new_file_name . "." . $file_parts['extension'];
		
		# Validate the filetype
		if (in_array($file_parts['extension'], $allowed_files)) {
	
			# Save the file
				move_uploaded_file($temp_file,$target_file);
				return $new_file_name . "." . $file_parts['extension'];
	
		} else {
			echo 'Invalid file type.';
		}
	
	}
	
	
	
	
} # end of the class