$(document).ready(function () {

    //var bmkRegID;


    function GetValue(id) {

        var tagName = id.prop("tagName").toLowerCase();
        var tag = id.attr("id");
        var type = id.attr("type");


        if (tagName == "input" && (type == "checkbox" || type == "radio")) {
            return id.is(":checked");
        } else if (tag == "input" && type == "undefined") {
            return id.get(0).files.length
        } else {
            //console.log(tagName + ' - ' + tag +': '+ type+' - '+id.val());
            return id.val();
        }
    };


    function checkRequiredFields(){
     
        var rtrnVal=true;
        var myError=0;
      
        $('.InputRequired').each(function (i) {

            //var fieldtocheck= $(this).parent().attr('for');
            var fieldtocheck = $(this).attr('id');

            var ctl = $('#' + fieldtocheck);

            if (ctl.hasClass('uploader')) {
                ctl = ctl.find('input[type=file]');

            }

            //if($('#'+fieldtocheck).val()==""){
            if (GetValue(ctl) == "") {
                $('#' + fieldtocheck).addClass("error");

                if (ctl.attr("type") == 'checkbox') {
                    $('#' + fieldtocheck).parent().addClass("error");
                }


                myError = myError + 1;

                rtrnVal = false;

            } else {
                $('#' + fieldtocheck).removeClass("error");
                if (ctl.attr("type") == 'checkbox') {
                    $('#' + fieldtocheck).parent().removeClass("error");
                }

            }
        });

        if(myError>0){
            //toastr.options = { "preventDuplicates": true,"progressBar": false,"closeButton": false, "timeOut": "1500", "positionClass": "toast-top-center offset"};
            //toastr["error"]("Bitte überprüfen Sie die mit * gekennzeichneten Pflichtfelder", "");
            alert("Bitte überprüfen Sie die mit * gekennzeichneten Pflichtfelder");

        }
      
        return rtrnVal;
    } // end function
   
      
    $(document).on("blur change",".InputRequired",function() {
        //console.log(event.type);

        var ctl=$(this);
        if(ctl.hasClass('uploader')){
            ctl = ctl.find('input[type=file]');
        }
       
       
        if(GetValue(ctl)==""){
            $(this).addClass("error");

        if(ctl.attr("type")=='checkbox'){
            $(this).parent().addClass("error");
        }
   
        }else{
            $(this).removeClass("error");

            if(ctl.attr("type")=='checkbox'){
                $(this).parent().removeClass("error");
            }
        }


    });

    $('input[name=tln_kz]').change(function (e) {
        var me = $(this);
        console.log("Attend...");

        var radio = $('input[name=tln_kz]:checked').val();
       
        if (radio == "ja") {
          $('#BookingDetailsPanel').collapse('show');
           
        }

        if (radio == "nein") {
            $('#BookingDetailsPanel').collapse('hide');
        }


    });


    $('.cmdTest').click(function (e) {

        var inputs = $('input[name=function]:checked');

        var test ="";

        for (var i = 0; i < inputs.length; i++) {
            test = test + $(inputs[i]).val()+",";
        }

        if (test != "") {
            test = test.substring(0, test.length-1);

        }
        $('#functions_text').val(test);
       
        console.log("Functions: " + test);

        return false;
    });



    $('.cmdSubmit').click(function(e){
        e.preventDefault();

        if(!checkRequiredFields())
            return false;


        var inputs = $('input[name=function]:checked');
        var test = "";

        for (var i = 0; i < inputs.length; i++) {
            test = test + $(inputs[i]).val() + ",";
        }

        if (test != "") {
            test = test.substring(0, test.length - 1);
        }
        $('#functions_text').val(test);

     
        var formdata=$('#form').serializeArray();
       
        var ajax="/content-items/ajax/top/regkey_registration_pax";
     
        console.log(ajax);
     
        console.log(formdata);
        console.log("this is before the post");
   
        $.blockUI({
            message: "Einen Moment Geduld, bitte.",
            css : {
                background: "none",
                border: "none",
                color: "#f4f4f4"
            }
        });

        $.post( ajax,formdata, function(data) {
            console.log("after post " + data);
            if(data==1){
                //toastr.success("Changes have been saved.");

                //alert('Vielen Dank. Wir haben Ihre Antwort vermerkt.');
                location.reload();
            } else if (data == 2){
                location.reload();
            } else{
                //toastr.error("Change could not be saved.");
                //$('.error-reg').removeClass("hidden");
                //alert('Error');
                $.unblockUI();

            } //end if data

            //$.unblockUI();
      
        }); //end post

    }); //end command save

    //new QRCode(document.getElementById("qrcode"), "http://jindo.dev.naver.com/collie");

    renderQRCode("test");

}); //end document.ready


function renderQRCode() {

    
    var id = '{%IMMacros.SessionGetValue("DETOPRegKey")#%}';
    
    //bmkRegID = '{%IMMacros.SessionGetValue("DETOPbmkRegID".ToString())#%}';
    //console.log('bmkRegID: ' + bmkRegID);

    var url = "https://de.ingrammicro.eu/solution-summit?id=" + bmkRegID;

    console.log('URL: ' + url);

    var qrcode = new QRCode(document.getElementById("qrcode"), {
        text: url,
        width: 128,
        height: 128,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

}



