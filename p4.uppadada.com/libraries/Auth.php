<?php

class Auth{

	public static function bounce($id_is_invalid = TRUE){
		if($id_is_invalid){
			Router::redirect("/users/login/");
			return false;
		}		
	}
	
}