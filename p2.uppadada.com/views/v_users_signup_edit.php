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
	 enctype="multipart/form-data"/>
		
		<br>
		
		<!--helpful to use the same names as the database columns-->
		<!--First Name-->
		First Name
		<br>
		<input type='text' required pattern="\w+" name='first_name' 
		<?php if($user): ?>
			value=<?=$user->first_name ?>
		<?php endif; ?>>
		</input>
		<br><br>
		
		
		<!--Last Name-->
		Last Name
		<br>
		<input type='text' required pattern="\w+" name='last_name'
		<?php if($user): ?>
			value=<?=$user->last_name ?>
		<?php endif; ?>>
		</input>
		<br><br>
		
		
		<!--E-mail-->
		Email
		<br>
		<input type='text' required pattern="\w+@\w+\.\w{2,3}" name='email' onchange="
		  this.setCustomValidity(this.validity.patternMismatch ? 'Please enter an e-mail address' : '');
		  if(this.checkValidity()) form.email.pattern = this.value;"
		  <?php if($user): ?> value=<?=$user->email ?> disabled='true'<?php endif; ?> >
		</input>
		<br><br>
		
		
		<!--Profile Pic-->
		Profile Picture ( jpg / jpeg / png / gif - 500K max)
		<br>
		<input type='file' name='Filedata'></input>		
		<br><br>
		
		
		<!--Password-->
		Password
		<br>
		<input id='password' type='password' name='password' required pattern="\w{5,}" <?php if($user): ?>value=<?=$user->password ?> disabled='true'<?php endif; ?> onchange="
		  this.setCustomValidity(this.validity.patternMismatch ? 'Please enter a password of 5 or more characters' : '');
		  if(this.checkValidity()) form.password.pattern = this.value;"/>
		<br><br>
		
		
		<!--Password Confirmation-->
		Password Confirmation
		<br>
		<input id='password_confirmation' type='password' required <?php if($user): ?>value=<?=$user->password ?> disabled='true'<?php endif; ?> onchange="
		  this.setCustomValidity(this.value!=form.password.pattern ? 'Passwords must match!' : '');
			this.checkValidity();"/>
		<br><br>
		
		
		<!--Change Password Button-->
		<?php if($user): ?>
		<button type="button" onclick="form.password.disabled=false;form.password.value='';form.password_confirmation.disabled=false;form.password_confirmation.value='';form.password_changed.value='true'">Change Password</button>
		<?php endif; ?>
				
		
		<!--This will send the form data to /users/p_signup-->
		<br><br>
		<input type='submit'/>
		
		<!--redirect to the appropriate controller method based on whether there's a user or not-->
		<button type="button" onclick=" 
		<?php if($user): ?>
			window.location='/users/p_edit_profile'
		<?php else: ?>
			window.location='/users/p_signup'
		<?php endif;?>
		"
		>Cancel</button>
				
	</form>
	

	

</div>