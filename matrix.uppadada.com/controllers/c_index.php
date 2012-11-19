<?php

class index_controller extends base_controller {

	public function __construct() {
		parent::__construct();
	} 
	
	/*-------------------------------------------------------------------------------------------------
	Access via http://yourapp.com/index/index/
	-------------------------------------------------------------------------------------------------*/
	public function index() {
		
		
		$this->template->content = View::instance("v_index");
		
		$client_files = Array("/css/matrix_master.css");

	    $this->template->client_files = Utils::load_client_files($client_files);
		
		echo $this->template;

	}
	
	
	
		
} // end class
