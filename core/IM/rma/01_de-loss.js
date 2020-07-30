
/* ***********************************
    Globals
   *********************************** */

// SourceObject for Attachmetns script
var SourceObject = 'DE_Loss';

var table1;
var ReasonCodeCheck = [];
var ReasonCodes;


$(document).ready(function () {

    console.log("Script: de-loss.js");
    console.log("CurUser_PrefCultureCode: {% CurrentUser.PreferredCultureCode %}");
    console.log("CurDoc_DocCulture: {%  CurrentDocument.DocumentCulture %}");
    console.log("LocContextCurCulture: {% LocalizationContext.CurrentCulture.CultureCode %}");
    console.log("Test: {$ 1IM.RMAForm.ProductLine.PackageID $}");

    var Culture = " {% LocalizationContext.CurrentCulture.CultureCode %}";

    /* Changed to the following approach due to Custom Checkbox Class */
    /*
    $(document).on("change", "input.Loss-Description-0", function (e) {
        if ($(this).parent().is(':checked')) {
            console.log("check");
            $(".Loss-Description-3").show();
        } else {
            console.log("uncheck");
            $(".Loss-Description-3").prop("checked", false);
            $(".Loss-Description-3").hide();
        }

    });
    */

    $(".Loss-Description-3").hide(); // Hide the depending checkbox manually.

    //$(document).on("click", "label.Loss-Description-0", function (e) {
    $(document).on("change", "input[name='Description']", function (e) {
        
        var myCheckBox = "#" + $(this).attr("for");

        console.log("Test2 click: " + $(this).val());

        //if (!$(myCheckBox).is(':checked')) {
        if ($(this).val()=='0') {
           // console.log("check");
            $(".Loss-Description-3").show();
        } else {
            //console.log("uncheck");
            $(".Loss-Description-3").prop("checked", false);
            $(".Loss-Description-30").prop("checked", false);
            $(".Loss-Description-31").prop("checked", false);
            $(".Loss-Description-3").hide();
        }

    });


    $(document).on("update", "label.Loss-Description-0", function (e) {
    //$(document).on("update", "label.Loss-Description-0", function (e) {

        var myCheckBox = "#" + $(this).attr("for");

        console.log("Test2 update: " + $(myCheckBox).attr("name"));

        if (!$(myCheckBox).is(':checked')) {
            console.log("check");
            $(".Loss-Description-3").show();
        } else {
            //console.log("uncheck");
            $(".Loss-Description-30").prop("checked", false);
            $(".Loss-Description-31").prop("checked", false);
            $(".Loss-Description-3").hide();
        }

    });

    table1 = $("#DT_LossLinesJSON")
        .on('preXhr.dt', function (e, settings, data) {
            
            //console.log("ReasonCheck cleared");
        })
        .DataTable({

        ajax: "/content-items/ajax/customerservice/formlossgetdata",
        "paging": false,
        "ordering": false,
        "info": false,
        searching: false,
        columns: [
            {
                class: "hide",
                title: "DE_Loss_LinesID",
                data: "DT_RowId"
            },
            {
                class: "",
                title: "{$ 1IM.RMAForm.ProductLine.PackageID $}",
                data: "PackageID"
            },
            {
                class: "",
                title: "{$ 1IM.RMAForm.ProductLine.ItemNumber $}",
                data: "ItemNumber"
            },
            {
                class: "",
                title: "{$ 1IM.RMAForm.ProductLine.Quantity $}",
                data: "Quantity"
            },
            {
                class: "",
                title: "{$ 1IM.RMAForm.ProductLine.SerialNumber $}",
                data: "SerialNumber"
            },
            {
                class: "",
                title: "{$ 1IM.RMAForm.Description $}",
                data: "Description",
                render: function (data, type, row, meta) {
                    var iconClass = "-o";
                    var retrnVal = ""
                    var descrList = data.split("|");
                    
                    //var ReasonCodes = ["{$ 1IM.RMAForm.Loss.Description.0 $}", "{$ 1IM.RMAForm.Loss.Description.1 $}", "{$ 1IM.RMAForm.Loss.Description.2 $}", "{$ 1IM.RMAForm.Loss.Description.30 $}", "{$ 1IM.RMAForm.Loss.Description.31 $}"];
                    // "{$ 1IM.RMAForm.Loss.Description.3 $}",
                    let ReasonCodes = [];

                    ReasonCodes[0] = "{$ 1IM.RMAForm.Loss.Description.0 $}";
                    ReasonCodes[1] = "{$ 1IM.RMAForm.Loss.Description.1 $}";
                    ReasonCodes[2] = "{$ 1IM.RMAForm.Loss.Description.2 $}";
                    ReasonCodes[3] = "{$ 1IM.RMAForm.Loss.Description.3 $}";
                    ReasonCodes[30] = "{$ 1IM.RMAForm.Loss.Description.30 $}";
                    ReasonCodes[31] = "{$ 1IM.RMAForm.Loss.Description.31 $}";


                    console.log("REasonCodeList");
                    for (var i = 0, len = descrList.length; i < len; i++) {
                        ReasonCodeCheck.push(descrList[i]);
                        retrnVal += ReasonCodes[descrList[i]] + ", ";
                    }

                    retrnVal = retrnVal.substring(0, retrnVal.length - 2);

                    return retrnVal;
                },
            },
            {
                class: "hide",
                title: "Description",
                data: "Description"
            }
        ],
        language: {
            url: "/CMSScripts/Custom/jQuery/dataTables.lang/{$ DE_Inside.DataTable.Language $}.js",
        },

    });

    $('#cmdNew').click(function (e) {
        e.preventDefault();

        restForm();

    });

    $('#cmdSubmit').click(function (e) {
        e.preventDefault();

        var formdata = $('#form').serializeArray();
        var myValue = $('#DT_LossLinesJSON').find('tr.selected').attr('id');

        if ((myValue !== undefined) && (myValue !== "")) {
            if (checkMandatoryField(e)) {
                var ajax = "/content-items/ajax/customerservice/formlossupdate?DT_RowId=" + myValue;
                performOperation(formdata, ajax);
            }

        } else {
            if (checkMandatoryField(e)) {
                var ajax = "/content-items/ajax/customerservice/formlossinsert";
                performOperation(formdata, ajax);
            }

        }

    }) // End cmdSubmit

    $('#cmdDelete').click(function (e) {
        e.preventDefault();

        // #DT_LossLinesJSON
        var myValue = $('#DT_LossLinesJSON').find('tr.selected').attr('id');

        console.log("SeletedItem: " + myValue);

        if (myValue >= 0) { // if we have an ID selected

            if (confirm("{$ 1IM.CTO.msg.Delete $}")) {

                var ajax = "/content-items/ajax/customerservice/formlossdelete?Loss_LinesID=" + myValue;
                $.get(ajax, function (data) {

                    if (data == 1) {
                        table1.ajax.reload();
                    }
                    else {
                        toastr["error"]("{$ 1IM.RMAForm.Error.NoRecord $}", "");
                    }
                }
                )
            } else {
                return false;
            }

        } else {

            toastr["error"]("{$ 1IM.RMAForm.Error.NoRecordSelected $}", "");

        }
    }); // End cmdDelete

    $('#cmdEdit').click(function (e) {
        e.preventDefault();

        // #DT_LossLinesJSON
        var myValue = $('#DT_LossLinesJSON').find('tr.selected').attr('id');

        if (myValue >= 0) { // if we have an ID selected

            var $ajax = "/content-items/ajax/customerservice/formlossgetdata?Loss_LinesID=" + myValue;

            //console.log($ajax);

            $.getJSON($ajax, function (records, status) {

                //console.log(records.data);

                populate('#myForm', records.data[0]);

            });

        } else {

            toastr["error"]("{$ 1IM.RMAForm.Error.NoRecordSelected $}", "");
        }

    }); // End cmdEdit

    $('select').on('change', function (e) {

        //if ( $("#select1 option[Text='Package was opened or closed with tape again']").length == 0 ){
        // var  selectedValues='';
        //console.log($("#Description option:selected").val());

        if ($("#Description option[value = 'Description4']").length > 0) {
            return false;
        } else {
            //var $select11 = $('#select1');
            //var optionSelected = $("option:selected", this);
            //  $( "#myselect option:selected" ).text();
            var selectedOption = $("#Description option:selected").text();

            /*  
            $("select option:selected").each(function() {
	            selectedValues += $(this).text() + ",";
                console.log(selectedValues);
            });
            */
            //selectedOption = selectedValues.splits(',');
            // if(selectedValues.contains("{$ 1IM.RMAForm.Loss.Description.0 $}")){

            if (selectedOption == "{$ 1IM.RMAForm.Loss.Description.0 $}") {
                //("input[name='ItemNumber']").val() != "")
                //if(!$select11.find("option[value =  'Description4']").length){
                //if($("#select1 option[value='Description4']").length > 0){
               // console.log($("#Description option:selected").text());
                // console.log(optionSelected);
                e.optionText = '{$ 1IM.RMAForm.Loss.Description.3 $}';
                e.optionValue = 'Description4';

                $('#Description').append("<option value='${e.optionValue}'>${e.optionText}</option>");
            }

        }

    }); // end select


    $("[id$='btnOK']").click(function (e) {
        
        if (table1.rows().count() == 0) {
            e.preventDefault();
            toastr["error"]("{$ 1IM.RMAForm.Error.ProvideLineDetails $}", "");
            return false;
        }

 
        ReasonCodes = "";

        table1.column(6).data().each(function (a) {
            console.log(a);
            if (a) {
                ReasonCodes += a + '|';
            }

        });

        var ReasonCodeArray = ReasonCodes.substring(0, ReasonCodes.length - 1).split("|");

        if (ReasonCodeArray.includes("31")) {
            
            if (tblAttachments.rows().count() == 0) {
                toastr["error"]("{$ 1IM.RMAForm.Loss.ImageUpload $}", "");
                return false;
            }
        }




    }); // end btnOkClick

    //desc
    /*
    $('#Description').multiselect({
     enableClickableOptGroups: true
    });
    */

    $("#myForm").on("blur, change", "input", function () {

        //console.log("Fieldcheck triggered by " + $(this).attr("name"));
        makeFieldsMandatory();

    });


}); // End Document ready

/* ***********************************
    Functions
   *********************************** */

function checkMandatoryField(e) {

    var checkFields = true;

    var chkDescription = 0;

    $("input[name='Description']").each(function (e) {
      
        if ($(this).prop("checked") == true) {
            chkDescription = chkDescription + 1;
        }

    });

    if ($("#Description0").prop("checked") == true) {
        console.log("Deesc= check");

        if (($("#Description30").prop("checked") == false) && ($("#Description31").prop("checked") == false)) {
            toastr["error"]("{$ 1IM.RMAForm.Error.DescriptionMissingOpt3 $}", "");
            checkFields = false;
        }
    }

   /*
    if ($("input[name='PackageID']").val() == "") {

          $("#ItemNumber").addClass("required-field"); 
          $( "#Quantity" ).addClass( "required-field" );  

          if (($("input[name='ItemNumber']").val() != "") && ($("input[name='Quantity']").val() != "")) {
              //return true;        
          } else {
              toastr["error"]("{$ 1IM.RMAForm.Error.ManadatoryFieldsFailed $}", "");
              checkFields =  false;
          }
    }
    */


    if (chkDescription == 0) {
        toastr["error"]("{$ 1IM.RMAForm.Error.DescriptionMissing $}", "");
        checkFields = false;
    }

   
    $("#myForm").find(".required-field").each(function () {
        
        toCheck = $("#" + $(this).attr("for"));

        if (toCheck.val() == "") {
            checkFields = false;
        }


    });
    
    if (!checkFields) {
        toastr["error"]("{$ 1IM.RMAForm.Error.ManadatoryFieldsFailed $}", "");
    }


    return checkFields;

} // end function checkMandatoryField

function makeFieldsMandatory() {

    

    if ($("#Description0").prop("checked") == true) {
        $("#lblPackageID").addClass("required-field");

    }

    if ($("#Description1").prop("checked") == true) {
        $("#lblPackageID").addClass("required-field");

    }

    if ($("#Description2").prop("checked") == true) {
        $("#lblPackageID").removeClass("required-field");
    }
    /*
    if ($("input[name='PackageID']").val() == "") {
        $("#ItemNumber").addClass("required-field");
        $("#Quantity").addClass("required-field");
    }
    

    if ($("input[name='PackageID']").val() != "") {
        $("#ItemNumber").removeClass("required-field");
        $("#Quantity").removeClass("required-field");
    }

    if ($("#Description2").prop("checked") == true) {

        //$("#ItemNumber").removeClass("required-field");
        //$("#Quantity").removeClass("required-field");
    }

    */


}


function performOperation(formdata,ajax){   

    //console.log(formdata);       
    $.post( ajax,formdata, function(data) {
        console.log("TestData: " + data);
        
        if(data==1){
            table1.ajax.reload();
            toastr["success"]("{$ 1IM.RMAForm.Error.ChangeSaved $}", "");
            restForm();
            /*
            $('#myForm').find('input').each(function(e){

                if ($(this).prop("type") == "checkbox") {
                    $(this).prop("checked", false);
                }

                if ($(this).prop("type") == "radio") {
                    $(this).prop("checked", false);
                }

                if ($(this).prop("type") == "text") {
                    $(this).val("");
                }

                //console.log("Field: " + $(this).attr("name") +" "+  $(this).prop("type"));
            });
            */
        } else {
            toastr["error"]("{$ 1IM.RMAForm.Error.ChangeNotSaved $", "");
        }  
        console.log("ReasonCodes: " + ReasonCodeCheck);
    }); // end post

} // end function performOperation


function restForm() {


    $('#DT_LossLinesJSON').find('tr.selected').removeClass('selected');

    $('#myForm').find('input').each(function (e) {

        if ($(this).prop("type") == "checkbox") {
            $(this).prop("checked", false);
        }

        if ($(this).prop("type") == "radio") {
            $(this).prop("checked", false);
        }

        if ($(this).prop("type") == "text") {
            $(this).val("");
        }

        $(".Loss-Description-3").hide();

        
    });

} // end function


function populate(frm, data) {
    
    $.each(data, function(key, value){
    //console.log(key+":"+value);
        
    if(key!="Description"){
        $('[id='+key+']', frm).val(value);
    }else{
          
        arr = value.split("|");
        console.log(key + ": " + arr);
        $('[class*="Loss-Description"]').each(function(e){

            
                
            if(arr.includes(this.value)){
                console.log(this.type + " : " + this.name + " : " + this.id + " = " + this.value);
                this.checked = true;
                $(this).attr("checked", true);
                
                
                              
            }else{
                this.checked = false;
                $(this).prop("checked", false);
            }
              
            //$(this).trigger("click");
              
        });


        if (arr.includes($("#Description0").val())) {
            console.log("Option = selected");
            
            $(".Loss-Description-3").show();
        }

        /*
        $("label.Loss-Description-0").trigger("update");
        
        if ($("#Description0").prop("checked")==true) {
            $("label.Loss-Description-0").trigger("click");
        }
        */
        
          
    }

    });
} // end function populate
 

// EndOfScript