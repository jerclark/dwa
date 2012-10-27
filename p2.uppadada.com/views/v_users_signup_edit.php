<div class="content_box">
	
	<!--
		@action param is what processes the form
		We use the convention p_{action} to process posts
	-->
	<form method='POST' 
		<?php if($user): ?>
			action='/users/p_edit_profile'
		<?php else: ?>
			action='/users/p_signup'
		<?php endif;?>
	/>
		
		<br>
		<!--helpful to use the same names as the database columns-->
		First Name
		<br>
		<input type='text' required pattern="\w+" name='first_name' 
		<?php if($user): ?>
			value=<?=$user->first_name ?>
		<?php endif; ?>>
		</input>

		<br><br>
		Last Name
		<br>
		<input type='text' required pattern="\w+" name='last_name'
		<?php if($user): ?>
			value=<?=$user->last_name ?>
		<?php endif; ?>>
		</input>
	
		<br><br>
		Email
		<br>
		<input type='text' required pattern="\w+@\w+\.\w{2,3}" name='email' onchange="
		  this.setCustomValidity(this.validity.patternMismatch ? 'Please enter an e-mail address' : '');
		  if(this.checkValidity()) form.email.pattern = this.value;"
		  <?php if($user): ?> value=<?=$user->email ?><?php endif; ?> >
		</input>
		
				
		<br><br>
		Password
		<br>
		<input id='password' type='password' name='password' required pattern="\w{5,}" <?php if($user): ?>value=<?=$user->password ?> disabled='true'<?php endif; ?> onchange="
		  this.setCustomValidity(this.validity.patternMismatch ? 'Please enter a password of 5 or more characters' : '');
		  if(this.checkValidity()) form.password.pattern = this.value;"/>
		<br><br>
		
		Password Confirmation
		<br>
		<input id='password_confirmation' type='password' <?php if($user): ?>value=<?=$user->password ?> disabled='true'<?php endif; ?> onchange="
		  this.setCustomValidity(this.value!=form.password.pattern ? 'Passwords must match!' : '');
			this.checkValidity();"/>
		<br><br>
				
		
		<!--This will send the form data to /users/p_signup-->
		<br><br>
		<input type='submit'/>
				
	</form>
	
	<!--redirect to the appropriate controller method based on whether there's a user or not-->
	<a 
	<?php if($user): ?>
		href='/users/p_edit_profile'
	<?php else: ?>
		href='/users/p_signup'
	<?php endif;?>
	>Cancel</a>
	

</div>