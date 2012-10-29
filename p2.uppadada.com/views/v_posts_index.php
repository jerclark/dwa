<div class="content_box">
	
	<!--
		@action param is what processes the form
		We use the convention p_{action} to process posts
	-->
	<form method='POST' action='/posts/p_search'>
		
		<br>
		<!--helpful to use the same names as the database columns-->
		Find Posts:
		<br>
		<input type='text' name='search_string'/>
		
		<!--This will send the form data to /posts/p_search-->
		<input type='submit' value='Find'/>
		
		<!--This will clear the search, and submit the form again /users/p_signup-->
		<input onclick="form.search_string.value=''" type="submit" value="Show All"/>
				
	</form>

</div


<div id="content_box">			
	<?=$search_results;?>
</div>

	

