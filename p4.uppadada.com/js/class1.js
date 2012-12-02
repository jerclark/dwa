$(document).ready(function(){
	
	//Vanilla Java script 
	//document.getElementById('lucy').style.backgroundColor = "red";
	
	// jQuery
	//Make lucy have a 3px red border
	//$('#lucy').css('border', '3px solid red');
	
	//Make both boxes yello
	//$('.ricardo').css('background-color', 'yellow');
	
	//Turn body of the page yellow
	//$('body').css('background-color', 'yellow');
	
	//Turn all divs green
	//$('div').css('background-color', 'green');
	
	//Make all the divs disappear, toggle or show
	//$('div').hide();
	//$('div').toggle();
	//$('div').show();


	//Change border to blue on click lucy
	/*$('#lucy').click(function(){
		console.log("Lucy Was Clicked");
		$('#lucy').css('border', '5px solid blue');
	});*/
	
	
	//Change border to blue on click lucy
	/*$('#lucy').click(function(){
		console.log("Lucy Was Clicked");
		$('#ricky').css('width', '500px');
	});*/
	
	/*
	$('#lucy').hover(function(){
		console.log("Lucy Was Clicked");
		$('#lucy').css('opacity', '.5');
	});
	*/
	
	/*
	$('.ricardo').click(function(){
		console.log("Lucy Was Clicked");
		$('#lucy').css('height', '500');
	});
	*/
	
	
	$('.ricardo').click(function(){
		console.log("Lucy Was Clicked");
		$('.ricardo').hide();
	});
	
	
	
}); //end of doc ready