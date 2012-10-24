<div class="content_box">
	
	<!--
		@action param is what processes the form
		We use the convention p_{action} to process posts
	-->
	<form method='POST' action='/users/p_signup_edit'>
		
		<br>
		<!--helpful to use the same names as the database columns-->
		First Name
		<br>
		
		<input type='text' name='first_name' 
		<?php if($user): ?>
			value=<?=$user->first_name ?>
		<?php endif; ?>>
		</input>

		<br><br>
		Last Name
		<br>
		<input type='text' name='last_name'
		<?php if($user): ?>
			value=<?=$user->last_name ?>
		<?php endif; ?>>
		</input>
	
		<br><br>
		Email
		<br>
		<input type='text' name='email'
		<?php if($user): ?>
			value=<?=$user->email ?>
		<?php endif; ?>>
		</input>
		
		<br><br>
		Password
		<br>
		<input type='password' name='password'/>
		<br><br>
		
		<!--This will send the form data to /users/p_signup-->
		<input type='submit'/>
		
	</form>

</div>