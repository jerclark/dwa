var gApp;


$.fn.dataTableExt.oApi.fnReloadAjax = function ( oSettings, sNewSource, fnCallback, bStandingRedraw )
{
    if ( typeof sNewSource != 'undefined' && sNewSource != null ) {
        oSettings.sAjaxSource = sNewSource;
    }

    // Server-side processing should just call fnDraw
    if ( oSettings.oFeatures.bServerSide ) {
        this.fnDraw();
        return;
    }

    this.oApi._fnProcessingDisplay( oSettings, true );
    var that = this;
    var iStart = oSettings._iDisplayStart;
    var aData = [];

    this.oApi._fnServerParams( oSettings, aData );

    oSettings.fnServerData.call( oSettings.oInstance, oSettings.sAjaxSource, aData, function(json) {
        /* Clear the old information from the table */
        that.oApi._fnClearTable( oSettings );

        /* Got the data - add it to the table */
        var aData =  (oSettings.sAjaxDataProp !== "") ?
            that.oApi._fnGetObjectDataFn( oSettings.sAjaxDataProp )( json ) : json;

        for ( var i=0 ; i<aData.length ; i++ )
        {
            that.oApi._fnAddData( oSettings, aData[i] );
        }

        oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();

        if ( typeof bStandingRedraw != 'undefined' && bStandingRedraw === true )
        {
            oSettings._iDisplayStart = iStart;
            that.fnDraw( false );
        }
        else
        {
            that.fnDraw();
        }

        that.oApi._fnProcessingDisplay( oSettings, false );

        /* Callback user function - for event handlers etc */
        if ( typeof fnCallback == 'function' && fnCallback != null )
        {
            fnCallback( oSettings );
        }
    }, oSettings );
};



$(document).ready(function() {	
	
	gApp = new BMApp();
		    
});



function BMApp(){
	

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
	
	


	this.recipeController = new BMRecipeController();

}