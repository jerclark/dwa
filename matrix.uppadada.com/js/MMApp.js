var gApp = {};

var giTestcaseCount = 0;
var giParameterCount = 0;
var giValueCount = 0;

//Descendent Data
var gParameters = {};
var gValues = {};

var gMuxedTestcases = {};


//Selected item id's
var gSelectedTestcase;
var gSelectedParameter;
var gSelectedValue;

//Table Globals
var gTestcaseDataTable;
var gParameterDataTable;
var gValueDataTable;

//Matrix Globals
var gMatrixGrid;

//Kinvey Globals
var gActiveUser;



$(document).ready(function() {	
	
	$( document ).tooltip({
	            position: {
	                my: "center bottom-20",
	                at: "center top",
	                using: function( position, feedback ) {
	                    $( this ).css( position );
	                    /*$( "<div>" )
	                        .addClass( "arrow" )
	                        .addClass( feedback.vertical )
	                        .addClass( feedback.horizontal )
	                        .appendTo( this );*/
	                }
	            }
	        });
	
	gApp = new MMApp();


	//init the Kinvey Backend, and validate connection
	var initPromise = Kinvey.init({
   		appKey    : 'kid_by8TjzRMv',
    	appSecret : '59ef31a617814b45b7fa29ae24a279b8'
	});
	initPromise.then(function(activeUser) {
    	gApp.toggleLoginLogout();
    	
    	//Load the data from kinvey, if we have a login
    	if (activeUser != null){
			gApp.testcaseController.loadData();
		}

	
	}, function(error) {
    	alert("error: " + error);
	});






	
	//Load some sample data
	//gApp.addSampleData();
	
	//This forces a redraw of the table headers so the labels draw
	$(".DataTables_sort_wrapper").click();
	
	
	
	
	
		    
});






function MMApp(){
	
	//CLICK HANDLER FOR ALL TABLE CELLS
	$('body').on( 'click', 'tbody tr td[selectable!="false"]', function( e ) {
        
			//Perform the selection highlight
			if ( $(this).parent().hasClass('row_selected') ) { //If the row is already selected, leave it selected
	           
	        }
	        else { //Otherwise, select the row that's clicked (closest() looks for the parent table of the clicked row)
	            $(this).parent().closest('table').dataTable().$('tr.row_selected').removeClass('row_selected');
	            $(this).parent().addClass('row_selected');
	        }
		
	});
	
	
	this.testcaseController = new MMTestcaseController();
	this.parameterController = new MMParameterController();
	this.valueController = new MMValueController();
	this.matrixController = new MMMatrixController();
	
	this.testcaseCount = 0;
	this.parameterCount = 0;
	this.valueCount = 0;
	
	
	$(".DataTables_sort_wrapper").click();

	
}

MMApp.prototype.authenticate = function(){

	var u = $('input[name=username]').val();
	var p = $('input[name=password]').val();

	var promise = Kinvey.User.login(
	{
    	username : u,
    	password : p
	}, 
	{
	    success: function(response) {
	    	gApp.toggleLoginLogout();
	    	gApp.testcaseController.loadData();
	    },
	    error: function(response) {
        	alert(response.description);
    	}
	});

}



MMApp.prototype.signup = function(){

	var u = $('input[name=username]').val();
	var p = $('input[name=password]').val();

	var promise = Kinvey.User.signup({
    	username : u,
    	password : p
	}, {
	    success: function(response) {
	    	gApp.toggleLoginLogout();
	    	gApp.testcaseController.loadData();
	    },
	    error: function(response) {
        	alert(response.description);
    	}
	});

}


MMApp.prototype.logout = function(){
	var user = Kinvey.getActiveUser();
	if(null !== user) {
		var promise = Kinvey.User.logout( {
		    success: function(response) {
		    	gApp.toggleLoginLogout()
		    },
		    error: function(response) {
	        	alert(response.description);
	    	}
		});
	}
}



MMApp.prototype.addSampleData = function(){
	var sampleTcId = gApp.testcaseController.addTestcase();
}



MMApp.prototype.TestcaseResultStateEnum = {
    PASS : "pass",
    FAIL : "fail",
    UNTESTED : "untested"
}

MMApp.prototype.kinveyLogin = function(){


}


MMApp.prototype.toggleLoginLogout = function(){

	var activeUser = Kinvey.getActiveUser();
	if (activeUser == null){
		$("#loginmodal").show();
		$("#logout").hide();
		this.gActiveUser = null;
	}else{
		$("#loginmodal").hide();
		$("#logout").show();
		$("#current_user_name").html(activeUser.username);
		this.gActiveUser = activeUser;
	}

}



function findDTRowDataById(aDTDataSet, iDTRowId){
	var i = -1;
	var d = $(aDTDataSet).filter(function(){
	    return this.DT_RowId == iDTRowId;
	});
	if (d.length > 0){
		i = jQuery.inArray(d[0],aDTDataSet);
	}
	return {index:i,data:d[0]};
}



$(function(){
	
	$( "#metadata-form-div" ).dialog({
           autoOpen: false,
           height: 500,
           width: 700,
           modal: true,
           buttons: {
               Update: function(){
				   
			   },
               Cancel: function() {
                   $( this ).dialog( "close" );
               }
           },
           close: function() {
               //allFields.val( "" ).removeClass( "ui-state-error" );
           }
       });
});




function guid(){
	'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    	var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    	return v.toString(16);
	});
}




