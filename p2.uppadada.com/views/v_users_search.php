<div class="content_box">
	
	<!--
		@action param is what processes the form
		We use the convention p_{action} to process posts
	-->
	<form method='POST' action='/users/p_search'>
		
		<br>
		<!--helpful to use the same names as the database columns-->
		Search For a User:
		<br>
		<input type='text' name='search_string'/>
		
		<!--This will send the form data to /users/p_signup-->
		<input type='submit'/>
		
	</form>

</div>