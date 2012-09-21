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
	
	
	function updateShine(event){
		//var contentText = document.getElementById("content_text");
		var targetText = event.target;
		var masthead = document.getElementById("masthead");
		var centeringOffset = targetText.offsetHeight * 5;
		var xCoord =  (event.offsetX/targetText.offsetWidth)*100;//(event.clientX/targetText.offsetWidth)*100;
		var yCoord = (event.offsetY/targetText.offsetHeight)*100; //(event.clientY/(targetText.offsetHeight + masthead.offsetHeight + centeringOffset))*100;
		if (targetText.style != undefined){
			targetText.style.background = "-webkit-radial-gradient(" + xCoord + "% " + yCoord + "%,30% 30%,#AA3333,#CCCCCC)";
			targetText.style.webkitBackgroundClip = "text";
			targetText.style.webkitTextFillColor = "transparent";
		}
	}
	
	
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
	
