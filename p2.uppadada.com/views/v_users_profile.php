<div class="content_box">

	<!--helpful to use the same names as the database columns-->
	<h2>First Name:</h2>
	<h3 class='profile_value'><?=$user->first_name ?></h3>
	<h2>Last Name:</h2>
	<h3 class='profile_value'><?=$user->last_name ?></h3>
	<h2>Email:</h2>
	<h3 class='profile_value'><?=$user->email ?></h3>
	
	<br>
	<a href="/users/signup_edit">Edit Profile</a>

</div>