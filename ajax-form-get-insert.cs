// HTML in Kentico Form Layout

<div id="subform" class="row">
    <div id="myForm" class="form-horizontal myForm " style="display:block; cursor: default">
        <div class="row">
            <div class="col-md-3">
                <label for="PackageID">{$ 1IM.RMAForm.ProductLine.PackageID $}</label>

                <input class="form-control" name="PackageID" id="PackageID" type="text" />
            </div>

            <div class="col-md-3">
                <div class="col"><label for="ItemNumber">{$ 1IM.RMAForm.ProductLine.ItemNumber $}</label></div>

                <div class="col"><input class="form-control" name="ItemNumber"  id="ItemNumber"  type="text" /></div>
            </div>


            <div class="col-md-3">
                <div class="col"><label for="Quantity">{$1IM.RMAForm.ProductLine.Quantity $}</label></div>

                <div class="col"><input class="form-control" name="Quantity" id="Quantity" type="text" /></div>
            </div>

            <div class="col-md-3">
                <div class="col"><label for="SerialNumber">{$ 1IM.RMAForm.ProductLine.SerialNumber $}</label></div>

                <div class="col"><input class="form-control" name="SerialNumber"  id="SerialNumber" type="text" /></div>
            </div>
        </div>
        
        <div class="col-md-0ffset-9">
            <button class="btn btn-success btn-sm" id="cmdSubmit" style="float: right;margin-right:10px;">{$ 1IM.RMAForm.Save $}</button>
        </div>
    
    </div>
    <table id="DT_ContactsJSON" class="datatable display dblClick">
        <thead>
        </thead>
        <tbody>
        </tbody>
    </table>
</div>

/* GET FORM DATA */

// SQL
SELECT * FROM Form_oneIM_Loss_Lines_DE
WHERE ##WHERE##

// WHERE
SessionID = '{% IMMacros.GetSessionID() %}'
{% if (QueryString.Loss_LinesID != "") { " AND DE_Loss_LinesID=" + QueryString.Loss_LinesID } %}

// Transformation (application/json)
{% if (DataItemIndex == 0) {"{\"data\": ["} %}
    {% if (Loss_LinesID != 0) { %}
        {
            "DT_RowId": {% DE_Loss_LinesID %},
            "PackageID": "{% PackageID %}",
            "ItemNumber": "{% ItemNumber %}",
            "Quantity": "{% Quantity %}",
            "SerialNumber": "{% SerialNumber %}",
            "Description": "{% Description %}"
        }
        {% if (DataItemIndex + 1 != DataItemCount) {","}  %}
    {% } %}
{% if (DataItemIndex + 1 == DataItemCount) {"]}"} %}


/* INSERT FORM DATA */

// SQL
DECLARE @PackageID VARCHAR(200)
DECLARE @ItemNumber VARCHAR(200)
DECLARE @Quantity INT
DECLARE @SerialNumber VARCHAR(200)
DECLARE @SessionID VARCHAR(255)
DECLARE @Description VARCHAR(255)

##WHERE##

INSERT INTO [KENTICO].[dbo].[Form_oneIM_Loss_Lines_DE] 
		(
            [PackageID], 
            [ItemNumber],
            [Quantity],
            [SerialNumber],
            [SessionID],
            [FormInserted],
            [FormUpdated],
            [Description]        
		) 
VALUES (@PackageID, @ItemNumber, @Quantity, @SerialNumber, @SessionID, GETDATE(), GETDATE(), @Description)

SELECT @@ROWCOUNT as result

// WHERE
SET @PackageID = '{% SQLEscape(IMMacros.GetRequestData("PackageID")) %}'
SET @ItemNumber = '{% SQLEscape(IMMacros.GetRequestData("ItemNumber")) %}'
SET @Quantity = '{% SQLEscape(IMMacros.GetRequestData("Quantity")) %}'
SET @SerialNumber = '{% SQLEscape(IMMacros.GetRequestData("SerialNumber")) %}'
SET @Description = '{% SQLEscape(IMMacros.GetRequestData("Description")) %}
SET @SessionID = '{% IMMacros.GetSessionID() %}'

// Transformation (text/plain)
{% result %}


// Script on page. Required DataTable JS

<script>
$(document).ready(function(){
   
    var table1 = $("#DT_LossLinesJSON").DataTable({
     
        ajax: "http://starter-ingrammicro-eu/en/content-items/ajax/training/formlossgetdata",
        "paging":   false,
        "ordering": false,
        "info":     false,
        searching: false,
        columns: [
            {
                class: "hidden",
                title: "Loss_LineiD", 
                data: "DT_RowId" 
            },
            {
                class: "col-md-3",
                title: "{$ 1IM.RMAForm.ProductLine.PackageID $}",  
                data: "PackageID" 
            },
            {
                class: "col-md-3",
                title: "$ 1IM.RMAForm.ProductLine.ItemNumber $),  
                data: "ItemNumber" 
            },
            {
                class: "col-md-3",
                title: "{$ 1IM.RMAForm.ProductLine.Quantity $}",  
                data: "Quantity" 
            },
            {
                class: "col-md-3",
                title: "{$ 1IM.RMAForm.ProductLine.SerialNumber $}", 
                data: "SerialNumber"
            }
        ]
    });

    $('#cmdSubmit').click(function(e){
        e.preventDefault();
        var formdata = $('#form').serializeArray();
        var ajax = "/content-items/ajax/training/formlossinsert";   
        performOperation(formdata, ajax);
    });
	 
    function performOperation(formdata,ajax) {
        $.post( ajax, formdata, function(data) {
                if (data == 1) {
                table1.ajax.reload();
            
                $('#PackageID').val("");
                $('#ItemNumber').val("");
                $('#Quantity').val("");
                $('#SerialNumber').val("");
                
                } else {
                }
        });
    });

    function populate(frm, data) {
        $.each(data, function(key, value){
            $('[id=' + key + ']', frm).val(value);
        });
    }

}); 
</script>