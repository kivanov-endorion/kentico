
/* ***********************************
    Globals
   *********************************** */

// SourceObject for Attachmetns script
var SourceObject = 'DE_Loss';

var table1;
var ReasonCodeCheck = [];

$(document).ready(function () {

    console.log("Script: de-loss.js");
    console.log("CurUser_PrefCultureCode: {% CurrentUser.PreferredCultureCode %}");
    console.log("CurDoc_DocCulture: {%  CurrentDocument.DocumentCulture %}");
    console.log("LocContextCurCulture: {% LocalizationContext.CurrentCulture.CultureCode %}");

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

    $(document).on("click", "label.Loss-Description-0", function (e) {
        
        var myCheckBox = "#" + $(this).attr("for");

        console.log("Test2: " + $(myCheckBox).attr("name"));

        if (!$(myCheckBox).is(':checked')) {
            console.log("check");
            $(".Loss-Description-3").show();
        } else {
            console.log("uncheck");
            $(".Loss-Description-3").prop("checked", false);
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
                title: "{% GetResourceString("1IM.RMAForm.ProductLine.PackageID", Cookies["CMSPreferredCulture"]) #%}",
                data: "PackageID"
            },
            {
                class: "",
                title: "{% GetResourceString("1IM.RMAForm.ProductLine.ItemNumber", Cookies["CMSPreferredCulture"]) #%}",
                data: "ItemNumber"
            },
            {
                class: "",
                title: "{% GetResourceString("1IM.RMAForm.ProductLine.Quantity", Cookies["CMSPreferredCulture"]) #%}",
                data: "Quantity"
            },
            {
                class: "",
                title: "{% GetResourceString("1IM.RMAForm.ProductLine.SerialNumber", Cookies["CMSPreferredCulture"]) #%}",
                data: "SerialNumber"
            },
            {
                class: "",
                title: "{% GetResourceString("1IM.RMAForm.Description", Cookies["CMSPreferredCulture"]) #%}",
                data: "Description",
                render: function (data, type, row, meta) {
                    var iconClass = "-o";
                    var retrnVal = ""
                    var descrList = data.split("|");
                    
                    var ReasonCodes = ["{% GetResourceString("1IM.RMAForm.Loss.Description.0", Cookies["CMSPreferredCulture"]) %}", "{% GetResourceString("1IM.RMAForm.Loss.Description.1", Cookies["CMSPreferredCulture"]) %}", "{% GetResourceString("1IM.RMAForm.Loss.Description.2", Cookies["CMSPreferredCulture"]) %}", "{% GetResourceString("1IM.RMAForm.Loss.Description.3", Cookies["CMSPreferredCulture"]) %}"];

                    for (var i = 0, len = descrList.length; i < len; i++) {
                        ReasonCodeCheck.push(descrList[i]);
                        retrnVal += ReasonCodes[descrList[i]] + ", ";
                    }

                    return retrnVal;
                },
            },
            {
                class: "",
                title: "Description",
                data: "Description"
            }
        ],
        language: {
            //url: "/CMSScripts/Custom/jQuery/dataTables.lang/{$ DE_Inside.DataTable.Language $}.js",
            url: "/CMSScripts/Custom/jQuery/dataTables.lang/{% GetResourceString("DE_Inside.DataTable.Language", Cookies["CMSPreferredCulture"]) #%}.js",
            
        },

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
                        toastr["error"]("{% GetResourceString("1IM.RMAForm.Error.NoRecordSelected", Cookies["CMSPreferredCulture"]) #%}", "");
                    }
                }
                )
            } else {
                return false;
            }

        } else {

            toastr["error"]("{% GetResourceString("1IM.RMAForm.Error.NoRecordSelected", Cookies["CMSPreferredCulture"]) %}", "");

        }
    }); // End cmdDelete

    $('#cmdEdit').click(function (e) {
        e.preventDefault();

        // #DT_LossLinesJSON
        var myValue = $('#DT_LossLinesJSON').find('tr.selected').attr('id');

        if (myValue >= 0) { // if we have an ID selected

            var $ajax = "/content-items/ajax/customerservice/formlossgetdata?Loss_LinesID=" + myValue;

            console.log($ajax);

            $.getJSON($ajax, function (records, status) {

                console.log(records.data);

                populate('#myForm', records.data[0]);

            });

        } else {

            toastr["error"]("{% GetResourceString("1IM.RMAForm.Error.NoRecordSelected", Cookies["CMSPreferredCulture"]) %}", "");
        }

    }); // End cmdEdit

    $('select').on('change', function (e) {

        //if ( $("#select1 option[Text='Package was opened or closed with tape again']").length == 0 ){
        // var  selectedValues='';
        console.log($("#Description option:selected").val());

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
                console.log($("#Description option:selected").text());
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
            console.log("row count is" + table1.rows().count());
            //alert('please provide line details');
            toastr["error"]("{% GetResourceString("1IM.RMAForm.Error.ProvideLineDetails", Cookies["CMSPreferredCulture"]) %}", "");
        }

    }); // end btnOkClick

    //desc
    /*
    $('#Description').multiselect({
     enableClickableOptGroups: true
    });
    */


}); // End Document ready

  /* ***********************************
      Functions
     *********************************** */

function checkMandatoryField(e) {
    
      if ($("input[name='PackageID']").val() == "") {
          $("#ItemNumber").addClass("required-field"); 
          $( "#Quantity" ).addClass( "required-field" );  

          if (($("input[name='ItemNumber']").val() != "") && ($("input[name='Quantity']").val() != "")) {
              /*
              var ajax="/content-items/ajax/customerservice/formlossinsert";   
              performOperation(formdata,ajax);
              */
              return true;
            
          } else {

              e.preventDefault();
              toastr["error"]("Please Provide the value for mandatory field", "");
              return false;
          }
      } else {    
             return true;
      }
} // end function checkMandatoryField

function performOperation(formdata,ajax){   

    console.log(formdata);       
    $.post( ajax,formdata, function(data) {
        console.log("TestData: " + data);
        
        if(data==1){
            table1.ajax.reload();
            toastr["success"]("{$1IM.RMAForm.Error.ChangeSaved $}", "");
            $('#myForm').find('input').each(function(e){

                if ($(this).prop("type") == "checkbox") {
                    $(this).prop("checked", false);
                }

                if ($(this).prop("type") == "text") {
                    $(this).val("");
                }

                console.log("Field: " + $(this).attr("name") +" "+  $(this).prop("type"));
            });
        } else {
            toastr["error"]("{$1IM.RMAForm.Error.ChangeNotSaved $}", "");
        }  
        console.log("ReasonCodes: " + ReasonCodeCheck);
    }); // end post

} // end function performOperation


function populate(frm, data) {
    
    $.each(data, function(key, value){
    console.log(key+":"+value);
        
    if(key!="Description"){
    $('[id='+key+']', frm).val(value);
    }else{
          
        
        
        arr = value.split("|");

         
        $('[class*="Loss-Description"]').each(function(e){
            console.log(" : " +this.value);
        
            if(arr.includes(this.value)){
                 
                this.checked = true;             
                              
            }else{
                this.checked = false;
            }
              
            $(this).trigger("click");
              
        });
          
    }

    });
} // end function populate
 

// EndOfScript