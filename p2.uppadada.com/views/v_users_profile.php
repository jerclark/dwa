<div class="content_box">

	<!--helpful to use the same names as the database columns-->
	<h2>First Name:</h2>
	<h3 class='profile_value'><?=$user->first_name ?></h3>
	<h2>Last Name:</h2>
	<h3 class='profile_value'><?=$user->last_name ?></h3>
	<h2>Email:</h2>
	<h3 class='profile_value'><?=$user->email ?></h3>
	<h2>Profile Image:</h2>
	<div class="profile_image" style="background-image:url('/profile_images/<?=$user->user_id?>_profile.png');"></div>
	
	<br>
	<a href="/users/signup_edit">Edit Profile</a>

</div>