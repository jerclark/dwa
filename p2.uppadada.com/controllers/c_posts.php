<?php
class posts_controller extends base_controller {

	public function __construct() {
		
		parent::__construct(); //Must call parent's __construct method
		
	}
	
	/**
	* Display list of posts
	* 
	* By default, this will display all posts from all followed users in chronological order.	
	*/
	public function index() {
				
		Auth::bounce(!$this->user);
		
		$_POST['search_string'] = "";
		$this->p_search();
		
		/*
		#Search for all posts of all people that i'm following
		$q = "SELECT posts.*,users.first_name,users.last_name FROM posts,users WHERE posts.user_id IN (SELECT subscribed_id FROM subscriptions WHERE subscriber_id=".$this->user->user_id.") AND users.user_id=posts.user_id ORDER BY posts.modified DESC";
		$posts = DB::instance(DB_NAME)->select_rows($q);
		
		#format the mod date for each post
		foreach($posts as $key => &$next_post){
			$next_post['modified'] = Time::display($next_post['modified']);
		}
		
			
		#Setup the template	
		$this->template->title = "Post Activity";
		
		#load the content
		$this->template->content = View::instance("v_posts_index");
		$this->template->content->search_results = View::instance("v_posts_search_results");
		$this->template->content->search_results->results = $posts;		
	
		#This renders the view
		echo $this->template;
		*/
				
	}
	
	
	/**
 	* Process a search for posts
	* 
	* This will lookup posts based on the passed in search string
	* 
	*/
	public function p_search(){
		
		if (!$this->user){
			Router::redirect("/users/login/");
			return false;
		}
			
		
		#Search for posts
		
		$_POST = DB::instance(DB_NAME)->sanitize($_POST); #sanitize the search string post
		
		if ( strlen($_POST['search_string']) == 0 ){ #Get all posts if search string is empty
			
			$q = "SELECT posts.*,users.first_name,users.last_name FROM posts,users WHERE posts.user_id IN (SELECT subscribed_id FROM subscriptions WHERE subscriber_id=".$this->user->user_id.") AND users.user_id=posts.user_id ORDER BY posts.modified DESC";
		
		}else{ 	#only find posts matching the search string - check agains e-mail, firstname, lastname, firstname+lastname
			
			$q = "SELECT posts.*,users.first_name,users.last_name FROM posts,users 
			WHERE posts.user_id IN (SELECT subscribed_id FROM subscriptions WHERE subscriber_id=".$this->user->user_id.") 
			AND (users.user_id=posts.user_id) 
			AND ((posts.text LIKE '%".$_POST['search_string']."%') or
			(users.first_name LIKE '%".$_POST['search_string']."%') or 
			(users.last_name LIKE '%".$_POST['search_string']."%') or
			(CONCAT(users.first_name, ' ', users.last_name) LIKE '%".$_POST['search_string']."%')) 
			ORDER BY posts.modified DESC";
			
		}
		$posts = DB::instance(DB_NAME)->select_rows($q);
		
		#format the mod date for each post
		foreach($posts as $key => &$next_post){
			$next_post['modified'] = Time::display($next_post['modified']);
		}
		
		$this->template->content = View::instance("v_posts_index");
		$this->template->content->search_results = View::instance("v_posts_search_results");
		$this->template->content->search_results->results = $posts;
		
		echo $this->template;	
		
	}
	
	
	
	
	/**
 	* Create a post
	* 
	* Display a form for making a post
	* 
	*/
	public function create() {
		
		Auth::bounce(!$this->user);		
				
		$this->template->title = "Create Post";

		#load the content
		$this->template->content = View::instance("v_posts_create");
	
		#This renders the view
		echo $this->template;
		
		
	}
	
	
	
	/**
 	* Process a post
	* 
	* This will create a post from the passed in text.
	* 
	*/
	public function p_create() {
		
		Auth::bounce(!$this->user);
				
		#Dump out the results of POST to see what the form submitted
		#print_r($_POST);
	
		$data = Array("user_id" => $this->user->user_id, "text" => $_POST['content'], "created" => Time::now(), "modified" => Time::now());

		#Insert the posted form into the db
		DB::instance(DB_NAME)->insert('posts',$data);
		
		#Redirect to the "recent activity" page
		Router::redirect("/posts/index");
		
	}
	
	
	
	/**
	* Comment on a post
	* 
	* Display a form for commenting on a post
	* 
	*/
	public function comment() {
		
		Auth::bounce(!$this->user);
	
		$this->template->title = "Create Post";

		#load the content
		$this->template->content = View::instance("v_posts_create");

		#This renders the view
		echo $this->template;


	}



	/**
	* Process a Comment
	* 
	* This will create a post from the passed in text.
	* 
	* Expects
	* @parent - The ID of the post to which this is a response. If null, then this is an originating post.
	* @content - The content of the post.
	*/
	public function p_comment() {

		#Dump out the results of POST to see what the form submitted
		#print_r($_POST);	

		# Add/encrypt the token	
		$_POST['token'] = sha1(TOKEN_SALT.$_POST['email'].Utils::generate_random_string());

		#Insert the posted form into the db
		DB::instance(DB_NAME)->insert('users',$_POST);

		#Reply with success
		echo 'You are Registered!';

	}
	
	
	
	/**
 	* Delete a post
	* 
	* Will delete a post. If the post has children posts, all children will be deleted. 
	* 
	* @post_id The id of the post to delete
	*/
	public function delete($post_id) {
		
	}
	
	/**
 	* Edit a post
	* 
	* Will change the content of a post.
	* 
	* @post_id The id of the post to change
	*/
	public function edit($post_id) {
		
	}
	
	
	/**
 	* Repost a post
	* 
	* Repost another post so people following you can see it.
	* 
	* @post_id The id of the post to repost
	*/
	public function repost($post_id) {
		
	}
	
	
}
