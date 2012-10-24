<div class="content_box">
	
	<!--
		@action param is what processes the form
		We use the convention p_{action} to process posts
	-->
	<form method='POST' action='/users/p_login'>
		
		<br>
		<!--helpful to use the same names as the database columns-->
		Email:
		<br>
		<input type='text' name='email'/>
		<br><br>
		Password:
		<br>
		<input type='password' name='password'/>
		<br><br>
		
		<!--This will send the form data to /users/p_signup-->
		<input type='submit'/>
		
	</form>

</div>