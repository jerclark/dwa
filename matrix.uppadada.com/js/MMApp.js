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
	
}



MMApp.prototype.TestcaseResultStateEnum = {
    PASS : "pass",
    FAIL : "fail",
    UNTESTED : "untested"
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





