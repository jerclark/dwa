<div class="content_box">

	<!--helpful to use the same names as the database columns-->
	<div class="post_display_name" style="margin-top:20px;">First Name:</div>
	<h3 class='profile_value'><?=$user->first_name ?></h3>
	<div class="post_display_name">Last Name:</div>
	<h3 class='profile_value'><?=$user->last_name ?></h3>
	<div class="post_display_name">Email:</div>
	<h3 class='profile_value'><?=$user->email ?></h3>
	<div class="post_display_name">Profile Image:</div>
	<div class="profile_image" style="margin-top:10px;background-image:url('/profile_images/<?=$user->user_id?>_profile.png');"></div>
	
	<br>
	
	<button type="button" onclick="window.location='/users/signup_edit'">Edit Profile</button>

</div>