

window.onmousemove = function(event){	
	var mastheadTextElem = 	document.getElementById("masthead_text");	
	mastheadTextElem.style.background = "-webkit-gradient(linear, left top, right top, from(rgba(90,90,90,0.0)), to(rgba(90,90,90,0.0)), color-stop(" + parseInt(event.pageX)/window.innerWidth + ",#AA3333))";
	mastheadTextElem.style.webkitBackgroundClip = "text";
	mastheadTextElem.style.webkitTextFillColor = "transparent";
}