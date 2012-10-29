<div class="content_box">

	<!--helpful to use the same names as the database columns-->
	First Name:
	<h3 class='profile_value'><?=$user->first_name ?></h3>
	Last Name:
	<h3 class='profile_value'><?=$user->last_name ?></h3>
	Email:
	<h3 class='profile_value'><?=$user->email ?></h3>
	Profile Image:
	<div class="profile_image" style="background-image:url('/profile_images/<?=$user->user_id?>_profile.png');"></div>
	
	<br>
	<a href="/users/signup_edit">Edit Profile</a>

</div>