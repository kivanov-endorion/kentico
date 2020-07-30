/* ***********************************
    Globals
   *********************************** */

// SourceObject for Attachmetns script
var SourceObject = 'DE_Damage';

var table1;
var ReasonCodeCheck = [];

$(document).ready(function () {

    if ($('.ErrorLabel').text() != "") {
        $("html, body").animate({ scrollTop: 0 }, "slow");
        toastr["error"]($('.ErrorLabel').text(), "");
    }

    $(document).on("change", "span.mypostback > input, select.mypostback", function (e) {

        $.blockUI({
            message: "{$ 1IM.RMAForm.PleaseWait $}",
            css: {
                background: "none",
                border: "none",
                color: "#f4f4f4"
            }
        });

    });



    table1 = $("#DT_ContactsJSON").DataTable({
        ajax: "/content-items/ajax/customerservice/formdamagegetdata",
        "paging": false,
        "ordering": false,
        "info": false,
        "autoWidth": true,
        searching: false,
        columns: [
            {
                class: "hide",
                title: "DT_RowId",
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
                title: "{$1IM.RMAForm.ProductLine.SerialNumber$}",
                data: "SerialNumber"
            },
            {
                class: "",
                title: "{$ 1IM.RMAForm.Description $}",
                data: "Description",
                render: function (data, type, row, meta) {
                    var retrnVal = ""
                    var descrList = data.split("|");

                    var ReasonCodes = ["{$ 1IM.RMAForm.Damage.Description.0 $}", "{$ 1IM.RMAForm.Damage.Description.1 $}", "{$ 1IM.RMAForm.Damage.Description.2 $}", "{$ 1IM.RMAForm.Damage.Description.3 $}", "{$ 1IM.RMAForm.Damage.Description.4 $}", "{$ 1IM.RMAForm.Damage.Description.5 $}", "{$ 1IM.RMAForm.Damage.Description.6 $}", "{$ 1IM.RMAForm.Damage.Description.7 $}", "{$ 1IM.RMAForm.Damage.Description.8 $}"];

                    for (var i = 0, len = descrList.length; i < len; i++) {
                        ReasonCodeCheck.push(descrList[i]);
                        retrnVal += ReasonCodes[descrList[i]] + ", ";
                    }

                    retrnVal = retrnVal.substring(0, retrnVal.length - 2);

                    return retrnVal;
                },
            }
        ],
        language: {
            url: "/CMSScripts/Custom/jQuery/dataTables.lang/{$ DE_Inside.DataTable.Language $}.js",
        }

    }); // End Datatable Lines

    $('#cmdNew').click(function (e) {
        e.preventDefault();

        restForm();

    });

    $('#cmdSubmit').click(function (e) {
        e.preventDefault();

        var formdata = $('#form').serializeArray();
        var myValue = $('#DT_ContactsJSON').find('tr.selected').attr('id');

        if ((myValue != undefined) && (myValue != "")) {
            if (checkMandatoryField(e)) {
                var ajax = "/content-items/ajax/customerservice/formdamageupdate?DT_RowId=" + myValue;
                performOperation(formdata, ajax);
            } else {
                return false;
            }

        } else {
            if (checkMandatoryField(e)) {
                var ajax = "/content-items/ajax/customerservice/formdamageinsert";
                performOperation(formdata, ajax);
            } else {
                return false;
            }


        }

    }); // End cmdSubmit

    $('#cmdDelete').click(function (e) {
        e.preventDefault();

        // #DT_ContactsJSON
        var myValue = $('#DT_ContactsJSON').find('tr.selected').attr('id');

        if (myValue >= 0) { // if we have an ID selected

            if (confirm("{$ 1IM.CTO.msg.Delete $}")) {

                var ajax = "/content-items/ajax/customerservice/formdamagedelete?Damage_LinesID=" + myValue;

                console.log(ajax);

                $.get(ajax, function (data) {
                    if (data == 1) {
                        table1.ajax.reload();
                    } else {
                        toastr["error"]("{$ 1IM.RMAForm.Error.NoRecord $}", "");
                    }
                }); // End Get
            } else {
                return false;
            }

        } else {

            toastr["error"]("{$ 1IM.RMAForm.Error.NoRecordSelected $}", "");

        }

    }); // End cmdDelete

    $('#cmdEdit').click(function (e) {
        e.preventDefault();

        // #DT_ContactsJSON
        var myValue = $('#DT_ContactsJSON').find('tr.selected').attr('id');

        if (myValue >= 0) { // if we have an ID selected

            var $ajax = "/content-items/ajax/customerservice/formdamagegetdata?Damage_LinesID=" + myValue;

            console.log($ajax);

            $.getJSON($ajax, function (records, status) {
                console.log(records.data);

                populate('#myForm', records.data[0]);

            }); // End Get

        } else {
            toastr["error"]("{$ 1IM.RMAForm.Error.NoRecordSelected $}", "");
        }

    }); // End cmdEdit

    $("[id$='btnOK']").click(function (e) {
        // e.preventDefault();
        if (table1.rows().count() == 0) {

            //console.log("Product count: " + table1.rows().count())
            toastr["error"]('{$ 1IM.RMAForm.Error.ProvideLineDetails $}', "");
            return false;
        }


        if ($("[name$='$Carrier$dropDownList']").val() != 6) {  
            //console.log("Carrier: " + $("[name$='$Carrier$dropDownList']").val());
            if (tblAttachments.rows().count() == 0) {
                console.log("Att count: " + tblAttachments.rows().count())
                toastr["error"]("{$ 1IM.RMAForm.Loss.ImageUpload $}", "");
                return false;
            }
        } else {
            //console.log("Carrier: " + $("[name$='$Carrier$dropDownList']").val());

        }

    }); // End btnOK


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
            console.log("Result: " + chkDescription);
        }
    });

    if (chkDescription == 0) {

        toastr["error"]("{$ 1IM.RMAForm.Error.DescriptionMissing $}", "");
        checkFields = false;

    }

    if ($("input[name='PackageID']").val() == "" || $("input[name='ItemNumber']").val() == "" || $("input[name='Quantity']").val() == "") {

        toastr["error"]("{$ 1IM.RMAForm.Error.ManadatoryFieldsFailed $}", "");
        checkFields = false;

    }

    return checkFields;

     
} // end function 

function performOperation(formdata,ajax){	  
    console.log(formdata);       

    $.post(ajax, formdata, function (data) {
        console.log("TestData: " + data);

        if (data == 1) {
            table1.ajax.reload();
            toastr["success"]("{$ 1IM.RMAForm.Error.ChangeSaved $}", "");
            $('#myForm').find('input').each(function (e) {

                if ($(this).prop("type") == "checkbox") {
                    $(this).prop("checked", false);
                }

                if ($(this).prop("type") == "text") {
                    $(this).val("");
                }

                console.log("Field: " + $(this).attr("name") + " " + $(this).prop("type"));
            });
        } else {
            toastr["error"]("{$ 1IM.RMAForm.Error.ChangeNotSaved $", "");
        }
        console.log("ReasonCodes: " + ReasonCodeCheck);
    }); // end post

} // End function


function restForm() {


    $('#DT_ContactsJSON').find('tr.selected').removeClass('selected');

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


    });

} // end function

function populate(frm, data) {

    $.each(data, function (key, value) {
        console.log(key + ":" + value);

        if (key != "Description") {
            $('[id=' + key + ']', frm).val(value);
        } else {

            arr = value.split("|");

            $('[class*="-Description-"]').each(function (e) {
                console.log(" : " + this.value);

                if (arr.includes(this.value)) {

                    this.checked = true;

                } else {
                    this.checked = false;
                }

                $(this).trigger("click");

            });

        }

    });
} // end function populate
  
  