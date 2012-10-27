<div class="content_box">
	
	<!--
		@action param is what processes the form
		We use the convention p_{action} to process posts
	-->
	<form method='POST' action='/posts/p_create'>
		
		<br>
		<!--helpful to use the same names as the database columns-->
		Enter a new post:
		<br>
		<textarea style="height:70px;width:95%;margin-top:10px;" name='content'/></textarea>
		<br>
		
		<!--This will send the form data to /users/p_signup-->
		<input type='submit'/>
		
	</form>

</div>