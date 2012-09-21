	
	
	/** initPage()
	* Registers event handlers and popluates the "about" blurb
	*/
	function initPage(){
		
		//Register the event handlers for the "flashlight text"
	    var divs = document.getElementsByTagName('div');
	    for (var i = 0; i < divs.length; i++){
	      if (divs[i].getAttribute('class') == 'flashlight_text'){
	        divs[i].onmousemove = updateShine;
	        divs[i].onmouseout = extinguishShine;
	      }
	    }
	
		//Populate the "about_blurb" based on the browser
		var aboutBlurb = document.getElementById("about_blurb");
		var userAgent = navigator.userAgent;
		var text = "Welcome!<p>"
		if ( (userAgent.indexOf("WebKit") >= 0) ){
			aboutBlurb.innerHTML = "It appears you are using a WebKit based browser - lucky for you!<br>It may look like there's no text in the sections below, but move your mouse around and see what you might find! (hint: It's super-gratuitous CSS poppycock. Enjoy!)";
		}else{
			aboutBlurb.innerHTML = "It appears you are using a non-WebKit based browser - too bad!<br>I've added some super-gratuitous CSS poppycock that probably won't work for you. There's also an HTML 5 video embedded, which quite possibly won't work either. But feel free to be riveted by the copy!";
		}
		
	
	}
	
	
	/** updateShine(Event)
	* This is the "onmousemove" event handler that does the "flashlight_text" effect.
	*/
	function updateShine(event){
		
		//Capture the target element
		var targetText = event.target;
		
		//This is a small adjusment to get the center of the "diffusion" close to the mouse
		var centeringOffset = targetText.offsetHeight * 5;
		
		//Capture the x,y coordinates of the mouse location, and calculate what percentage of the elements width/height to draw the center of the gradient
		var xCoord =  (event.offsetX/targetText.offsetWidth)*100;
		var yCoord = (event.offsetY/targetText.offsetHeight)*100;
		
		//Draw a radial gradient at the "hit-point", whose radius is 30% of the dimensions of the parent element. Have the "outer" gradient color be the same as the background (in this case #CCCCCC) so it appears to "disappear". I also needed to keep setting the background clip and text fill in order to make it work on every mouse move event.
		if (targetText.style != undefined){
			targetText.style.background = "-webkit-radial-gradient(" + xCoord + "% " + yCoord + "%,30% 30%,#AA3333,#CCCCCC)";
			targetText.style.webkitBackgroundClip = "text";
			targetText.style.webkitTextFillColor = "transparent";
		}
	}
	
	/** extinguishShine(Event)
	*This is the "onmouseout" event handler that kills the "flashlight_text" effect.
	*/
	function extinguishShine(event){
		if (event.target.style != undefined){
			event.target.style.background = "-webkit-radial-gradient(50% 50%,60% 60%,#CCCCCC,#CCCCCC)";
		}
	}
	
	
	
	window.onmousemove = function(event){	
		var mastheadTextElem = 	document.getElementById("masthead_text");	
		mastheadTextElem.style.background = "-webkit-gradient(linear, left top, right top, from(rgba(90,90,90,0.0)), to(rgba(90,90,90,0.0)), color-stop(" + parseInt(event.pageX)/window.innerWidth + ",#AA3333))";
		mastheadTextElem.style.webkitBackgroundClip = "text";
		mastheadTextElem.style.webkitTextFillColor = "transparent";
	}
	
