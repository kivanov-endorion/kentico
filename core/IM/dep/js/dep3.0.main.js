 
    /*********************************************
    17.01.2017 -ge createdep switched from method GET to POST, in case excceding URl length
    *********************************************/
    var sql_device_id = "";
    var customer_id = "";
    var vbasketdata;
    var saved_object;

    // selection lists
    var rows_basket = [];
    var rows_basket_manually = [];
    // Array holding selected row IDs
    var rows_selected = [];
    var rows_basket_selected = [];
	//Manual Enrollment
	 var rows_selected_manual = [];
	 var manual_count = 0;
    var error = {
        valid: true,
        text: "{$DE-Inside.AppleDEP.MainTab.Tab2.message.valid_data$}"
    };

    //external filter function for serials table 
    var filter = {
        all: 0,
        enrolled: 1,
        wait4delivery: 2, // truck
        nodep: -1, // is null in SQL statement
        error: -999,
        wait4ov: -93,
        wait4re: -96,
        wait4or: -99,
        apple: "apple",
        pending: "pending",
        manually: "manually"
    };

    var state_fltr = filter.all;

    $("#basket-count-Manual").html(manual_count); //update badge with manual basket count
    $("#basket-count-Manual").css("background-color","#73879C");

    function addSelectItem(t, ev) {
        ev.stopPropagation();

        var bs = $(t).closest('.bootstrap-select');
        var txt = $(t.parentElement)[0].childNodes['0'].value.replace(/[|]/g, "");

        if ($.trim(txt) == '') return;
        $(t.parentElement)[0].childNodes['0'].value = "";
        var p = bs.find('select');
        p.append($("<option>", {
            "selected": true,
            "text": txt
        })).selectpicker('refresh');

        p.dropdown("toggle");
    }

    function addSelectInpKeyPress(t, ev) {
        ev.stopPropagation();

        // do not allow pipe character
        if (ev.which == 124) ev.preventDefault();

        // enter character adds the option
        if (ev.which == 13) {
            ev.preventDefault();
            //addSelectItem($(t).next(),ev);
        }
    }
    

    $(document).ready(function(e) {

        var content = "<input type='text' class='bss-input' onKeyDown='event.stopPropagation();' onKeyPress='addSelectInpKeyPress(this,event);' onClick='event.stopPropagation()' placeholder='{$DE-Inside.AppleDEP.MainTab.Tab2.selectpicker.additem$}'> <span class='glyphicon glyphicon-plus addnewicon' onClick='addSelectItem(this,event,1);'></span>";

        var divider = $('<option/>')
            .addClass('divider')
            .data('divider', true);
        var divider2 = $('<option/>')
            .addClass('divider')
            .data('divider', true);

        var addoption = $('<option/>', {
            class: 'addItem'
        }).data('content', content);
        var addoption2 = $('<option/>', {
            class: 'addItem'
        }).data('content', content);
        //.append(divider).prepend(addoption)
        $('#ENDCUSTOMER_DEPID').selectpicker({
            liveSearch: true,
            maxOptions: 1,
            dropupAuto: false,
        });
      
       $('#ENDCUSTOMER_DEPID_MANUAL').selectpicker({
            liveSearch: true,
            maxOptions: 1,
            dropupAuto: false,
        });

        $('#ENDCUSTOMER_NAME').selectpicker({
            liveSearch: true,
            maxOptions: 1,
            dropupAuto: false,
        });
      
       $('#ENDCUSTOMER_NAME_MANUAL').selectpicker({
            liveSearch: true,
            maxOptions: 1,
            dropupAuto: false,
        });

        $('.bs-searchbox').append('<input type="button" onclick="addSelectItem(this,event,1);" value="{$DE-Inside.AppleDEP.MainTab.Tab2.selectpicker.additem$}"/>');

        $('#ENDCUSTOMER_DEPID').selectpicker('refresh');
       $('#ENDCUSTOMER_DEPID_MANUAL').selectpicker('refresh');
        $('#ENDCUSTOMER_NAME').selectpicker('refresh');
       $('#ENDCUSTOMER_NAME_MANUAL').selectpicker('refresh');

        $('#ENDCUSTOMER_SHIPDATE').datetimepicker({
            format: 'L',
            showTodayButton: true,
            //debug: true,
            widgetPositioning: {
                horizontal: 'left',
                vertical: 'bottom'
            },
            icons: {
              time: "far fa-clock",
              date: "fas fa-calendar-alt",
              up: "fas fa-arrow-up",
              down: "fas fa-arrow-down",
              today: "fas fa-calendar-day"
            }
        });
        $('#ENDCUSTOMER_ORDERDATE').datetimepicker({
            format: 'L',
            showTodayButton: true,
            //debug: true,
            widgetPositioning: {
                horizontal: 'left',
                vertical: 'bottom'
            },
            icons: {
              time: "far fa-clock",
              date: "fas fa-calendar-alt",
              up: "fas fa-arrow-up",
              down: "fas fa-arrow-down",
              today: "fas fa-calendar-day"
            }
        });
       $('#ENDCUSTOMER_SHIPDATE_MANUAL').datetimepicker({
            format: 'L',
            showTodayButton: true,
            //debug: true,
            widgetPositioning: {
                horizontal: 'left',
                vertical: 'bottom'
            },
            icons: {
              time: "far fa-clock",
              date: "fas fa-calendar-alt",
              up: "fas fa-arrow-up",
              down: "fas fa-arrow-down",
              today: "fas fa-calendar-day"
            }
        });
      $('#ENDCUSTOMER_ORDERDATE_MANUAL').datetimepicker({
            format: 'L',
            showTodayButton: true,
            //debug: true,
            widgetPositioning: {
                horizontal: 'left',
                vertical: 'bottom'
            },
            icons: {
              time: "far fa-clock",
              date: "fas fa-calendar-alt",
              up: "fas fa-arrow-up",
              down: "fas fa-arrow-down",
              today: "fas fa-calendar-day"
            }
        });

        $("#ENDCUSTOMER_SHIPDATE").data("DateTimePicker").date(new Date());
        $("#ENDCUSTOMER_ORDERDATE").data("DateTimePicker").date(new Date());
      $("#ENDCUSTOMER_SHIPDATE_MANUAL").data("DateTimePicker").date(new Date());
       $("#ENDCUSTOMER_ORDERDATE_MANUAL").data("DateTimePicker").date(new Date());

        //event: load apple dep showorder if clicked on third dialog tab opened from line in history sub table
        $(document).on('click', '.showorder', function(e) {
            var EBS_Service_Url_DEV = "172.31.224.159:8069";
            // var EBS_Service_Url_DEV = "localhost:7552"; 
            var EBS_Service_Url_LIVE = "10.31.224.204:8069";
            var companycd = $(document).find('div#modal').attr('companycd');
            var customerDepId = $(document).find('div#modal').attr('customerDepId');
            var orderNbr = $(document).find('div#modal').attr('orderNbr');
            if (companycd == "") companycd = "DE";
            var _host = EBS_Service_Url_LIVE;
            if (window.location.hostname.toUpperCase().indexOf(".DEV") > 0) {
                _host = EBS_Service_Url_DEV;
            }
            var request = "http://" + _host + "/?action=AppleDEPShowOrderV3&company=" + companycd + "&resellerid=" + customerDepId + "&ordernbr=" + orderNbr + "&system=Live";
            $('.loading').show();

            $.ajax({
                type: 'GET',
                dataType: 'jsonp',
                jsonpCallback: 'ShowOrder',
                jsonp: false,
                crossDomain: true,
                url: request,
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR)
                    if (jqXHR.status == 200) {
                        $('#showorderjson').val(jqXHR.toString());
                    }
                    $('.loading').hide();
                },
                success: function(Jsonp) {
                    $('#showorderjson').val(JSON.stringify(Jsonp));
                    $('.loading').hide();
                }
            });
        });

        // $.fn.select2.defaults.set("theme", "bootstrap");


        /*event: tab clicked by user */
        $('.btn-tab').click(function(e) {
            $('.btn-tab').removeClass("btn-tab-active");
            $(this).addClass('btn-tab-active');
        });
      
        $('#btnicons').click(function(e) {
          BootstrapDialog.show({
              message: $('#divicons1')[0].outerHTML+"<br>"+$('#divicons2')[0].outerHTML,
              type: BootstrapDialog.TYPE_INFO,
              nl2br: false
          });
        });
      
        var table = $('#DT_Serials').DataTable();
        var tbl_basket = $('#DT_Basket').DataTable();

        //event: external filter button clicked
        $('#FilterBtn a').on('click', function() {
            var sel = $(this).data('title');
            var tog = $(this).data('toggle');
            $('#' + tog).prop('value', sel);

            $('a[data-toggle="' + tog + '"]').not('[data-title="' + sel + '"]').removeClass('active').addClass('notActive');
            $('a[data-toggle="' + tog + '"][data-title="' + sel + '"]').removeClass('notActive').addClass('active');

            if (sel == "opt_err") state_fltr = filter.error;
            else if (sel == "opt_ne") state_fltr = filter.nodep;
            else if (sel == "opt_all") state_fltr = filter.all;
            else if (sel == "opt_pending") state_fltr = filter.pending;
            else if (sel == "opt_manual") state_fltr = filter.manually;
            else state_fltr = filter.all
            console.log(sel + " / " + state_fltr);
            /* fire search with new filter */
            searchDevices();
            table.search("").draw();
            table.processing(true);
            //setTimeout( function () {
            //  table.processing( false );
            //}, 4000 );
            //table.ajax.reload();
        })

        $('#DEP').selectpicker({
            width: null
        });
      
        $('#DEP_Manual').selectpicker({
            width: null
        });

        $('#IN_RESELLER_DEPID').css("text-transform", "uppercase");
        $('#ENROLLMENT_ID').css("text-transform", "uppercase");
      
        $('#IN_RESELLER_DEPID_MANUAL').css("text-transform", "uppercase");
        $('#ENROLLMENT_ID_MANUAL').css("text-transform", "uppercase");
		
		//Manual Enrollment
		$('#ENDCUSTOMER_DEPID_MANUAL').css("text-transform", "uppercase");
		$('#ENDCUSTOMER_NAME_MANUAL').css("text-transform", "uppercase");
        $('#Serials_Manual').css("text-transform", "uppercase");
		
		$('#DEP_Manual').change(function(e) {
            /* setting currently changed option value to option variable */
            var option = $(this).find('option:selected').val();
            /* setting input box value to selected option value */
            $('#showoption').val(option);
        });

        //basket form field events
        //$('#Serials_Manual').change(function(e) {
			function manualBadge(){
				
				var arrfinal=new Array();
			//var budge_serial_number_count = $("#Serials_Manual").val();
			//manual_count = budge_serial_number_count.split(" ").length;
			//if(manual_count>=1){
			//	$("#basket-count-Manual").html(manual_count);
			//	 $("#basket-count-Manual").css("background-color","#FF0000");
			//}
			//var matches = budge_serial_number_count.match(/\n/g);
// count them, if there are any
//var breaks = matches ? matches.length : 0;
//console.log(breaks);
           // if (breaks>=1) {
                // space dosent work, try newline  
                //budge_serial_number_count = $("#Serials_Manual").val();
              //  budge_serial_number_count = budge_serial_number_count.split("\n").length;
				//manual_count= budge_serial_number_count;
				//if(manual_count>=1){
				//$("#basket-count-Manual").html(manual_count);
				// $("#basket-count-Manual").css("background-color","#FF0000");
			//}
          //  }
			var serialnbr=$("#Serials_Manual").val();
$.each( serialnbr.split("\n"), function( index, value ){
  if (value!=="") {
        $.each( value.split(" "), function( index, value ){
            if (value!=="") {arrfinal.push(value);}
        });
  }
});

$("#basket-count-Manual").html(arrfinal.length);
if (arrfinal.length==0) { $("#basket-count-Manual").css("background-color","#73879C"); } 
else {
  $("#basket-count-Manual").css("background-color","#FF0000");
}
        }
		//);
		
			//}
			
 $("#Serials_Manual").keyup(manualBadge);
      
        $('#DEP').change(function(e) {
            /* setting currently changed option value to option variable */
            var option = $(this).find('option:selected').val();
            /* setting input box value to selected option value */
            $('#showoption').val(option);
        });

        $('#ENDCUSTOMER_DEPID').on('change', function(e) {
            var endcustomer = $(this).find('option:selected').text().split(","); // $( "#ENDCUSTOMER_DEPID" ).val().split(",");
            var val = endcustomer[0];
            var val2 = endcustomer[1];
            if (val === undefined && endcustomer[0] !== undefined) {
                val = endcustomer[0].trim()
            } else if (val === undefined) {
                val = "";
            }
            if (val2 === undefined && endcustomer[1] !== undefined) {
                val2 = endcustomer[1].trim()
            } else if (val2 === undefined) {
                val2 = "";
            }
            $('#ENDCUSTOMER_DEPID').selectpicker('val', val.trim());
            if (val2 != "") {
                $('#ENDCUSTOMER_NAME').selectpicker('val', val2.trim());
            }
        });
		
		 $('#ENDCUSTOMER_DEPID_MANUAL').on('change', function(e) {
            var endcustomer = $(this).find('option:selected').text().split(","); // $( "#ENDCUSTOMER_DEPID" ).val().split(",");
            var val = endcustomer[0];
            var val2 = endcustomer[1];
            if (val === undefined && endcustomer[0] !== undefined) {
                val = endcustomer[0].trim()
            } else if (val === undefined) {
                val = "";
            }
            if (val2 === undefined && endcustomer[1] !== undefined) {
                val2 = endcustomer[1].trim()
            } else if (val2 === undefined) {
                val2 = "";
            }
            $('#ENDCUSTOMER_DEPID_MANUAL').selectpicker('val', val.trim());
            if (val2 != "") {
                $('#ENDCUSTOMER_NAME_MANUAL').selectpicker('val', val2.trim());
            }
        });


        $('#ENDCUSTOMER_NAME').on('change', function(e) {
            var endcustomer = $(this).find('option:selected').text().split(","); // $( "#ENDCUSTOMER_DEPID" ).val().split(",");
            var val = endcustomer[0];
            var val2 = endcustomer[1];
            if (val === undefined && endcustomer[0] !== undefined) {
                val = endcustomer[0].trim()
            } else if (val === undefined) {
                val = "";
            }
            if (val2 === undefined && endcustomer[1] !== undefined) {
                val2 = endcustomer[1].trim()
            } else if (val2 === undefined) {
                val2 = "";
            }
            $('#ENDCUSTOMER_NAME').selectpicker('val', val.trim());
            if (val2 != "") {
                $('#ENDCUSTOMER_DEPID').selectpicker('val', val2.trim());
            }
        });
        //end basket form field events
		
		// Manual Enrollment
		$('#ENDCUSTOMER_NAME_MANUAL').on('change', function(e) {
            var endcustomer = $(this).find('option:selected').text().split(","); // $( "#ENDCUSTOMER_DEPID" ).val().split(",");
            var val = endcustomer[0];
            var val2 = endcustomer[1];
            if (val === undefined && endcustomer[0] !== undefined) {
                val = endcustomer[0].trim()
            } else if (val === undefined) {
                val = "";
            }
            if (val2 === undefined && endcustomer[1] !== undefined) {
                val2 = endcustomer[1].trim()
            } else if (val2 === undefined) {
                val2 = "";
            }
            $('#ENDCUSTOMER_NAME_MANUAL').selectpicker('val', val.trim());
            if (val2 != "") {
                $('#ENDCUSTOMER_DEPID_MANUAL').selectpicker('val', val2.trim());
            }
        });
 
        //event: search for customer id - Array holding selected row IDs
        $(document).on("keypress", "#CUSTOMER_ID", function(event) {
            if (event.which == 13 && ($("#CUSTOMER_ID").val()!=="" || $("#DEVICE_ID").val().replace(/(\r\n|\n|\r)/gm,"").trim()!=="")) {
                event.preventDefault();
                searchDevices();
                table.search("").draw();
                //table.ajax.reload();
            }
        });

        //event: search for serial number
        $(document).on("keypress", "#DEVICE_ID", function(event) {
            if (typeof $("#CUSTOMER_ID").val() === "undefined") {
              customer_id = '{% CurrentUser.imCompanyCd #%}{% CurrentUser.imBranchNbr #%}{% CurrentUser.imCustomerNbr #%}';
            }  
            if (event.which == 13 && (customer_id !== "" || $("#DEVICE_ID").val().replace(/(\r\n|\n|\r)/gm,"").trim()!=="")) {
           // if (event.which == 13 && ($("#CUSTOMER_ID").val()!=="" || $("#DEVICE_ID").val().replace(/(\r\n|\n|\r)/gm,"").trim()!=="")) {
                event.preventDefault();
                searchDevices();
                table.search("").draw();
                //table.ajax.reload();
            }
        });

        /***********************************************
                          START
            Table Serials Handle click on checkbox
        ***********************************************/
        //event: click checkbox on serials table
        $('#DT_Serials tbody').on('click', 'input[type="checkbox"]', function(e) {
            var $row = $(this).closest('tr');
            // Get row data
            var data = table.row($row).data();
            if (data.IsManually=="1") {
              var idx_basket_manually=checkArray(data, rows_basket_manually);
              if (this.checked && idx_basket_manually === -1) {
                rows_basket_manually.push(data);

                //Manual Enrollment
                var ENDCUSTOMER_DEPID_MANUAL = $('#ENDCUSTOMER_DEPID_MANUAL').val();
                var ENDCUSTOMER_NAME_MANUAL = $('#ENDCUSTOMER_NAME_MANUAL').val();
                var RESELLER_DEPID_MANUAL = $('#IN_RESELLER_DEPID_MANUAL').val().toUpperCase();
                var ENROLLMENT_ID_MANUAL = $('#ENROLLMENT_ID_MANUAL').val().toUpperCase();
                var ENDCUSTOMER_PO_MANUAL = $('#ENDCUSTOMER_PO_MANUAL').val();
                var ENDCUSTOMER_EMAIL_MANUAL = $('#EndCustEmail_Manual').val();
                var Comment_Manual = $('#Comment_Manual').val();
                
                if (RESELLER_DEPID_MANUAL != data.CustomerDepId && data.CustomerDepId.length>0) {
                    $('#IN_RESELLER_DEPID_MANUAL').val(data.CustomerDepId.toUpperCase());
                }
                /* set input fields with the last selection */
                if (data.EnrollmentId && data.EnrollmentId.length>0) {
                    $('#ENROLLMENT_ID_MANUAL').val(data.EnrollmentId.toUpperCase());
                }
                else
                {
                    $('#ENROLLMENT_ID_MANUAL').val(data.OrderNbr.toUpperCase());
                }
                $('#ENDCUSTOMER_DEPID_MANUAL').val(data.EndCustDepId.toUpperCase());
                
                var length = $('#ENDCUSTOMER_DEPID_MANUAL option').filter(function() {
                    return $(this).text() === data.EndCustDepId;
                }).length;
                if (length == 0) {
                    var p = $('#ENDCUSTOMER_DEPID_MANUAL');
                    var o = $('option', p).eq(-2);
                    o.before($("<option>", {
                        "selected": true,
                        "text": data.EndCustDepId
                    }));
                    p.selectpicker('refresh');
                }
                
                var length = $('#ENDCUSTOMER_NAME_MANUAL option').filter(function() {
                    return $(this).text() === data.EndCustName;
                }).length;
                if (length == 0) {
                    var p = $('#ENDCUSTOMER_NAME_MANUAL');
                    var o = $('option', p).eq(-2);
                    o.before($("<option>", {
                        "selected": true,
                        "text": data.EndCustName
                    }));
                    p.selectpicker('refresh');
                }
                
                $('#EndCustEmail_Manual').val(data.EndCustEmail);
                $('#ENDCUSTOMER_PO_MANUAL').val(data.EndCustPo);
                $('#ENDCUSTOMER_NAME_MANUAL').val(data.EndCustName);
                $('#Comment_Manual').val(data.Comment);
                $('#CustomerOrderNo_Manual').val(data.CustPo);
                $('#OrderNo_Manual').val(data.OrderNbr);
                $('#InvoiceNo_Manual').val(data.InvoiceNbr);
                $('#CUSTOMER_ID_MANUAL').val(data.CustomerNbr);
                $("#ENDCUSTOMER_ORDERDATE_MANUAL").data("DateTimePicker").date(moment(data.OrderDate, "DD/MM/YYYY"));
                $("#ENDCUSTOMER_SHIPDATE_MANUAL").data("DateTimePicker").date(moment(data.ShipDate, "DD/MM/YYYY"));
                /*end set data*/
                
                var newContent="";
                $.each(rows_basket_manually, function( index, value ){
                  newContent+=value.SerialNbr+"\r\n";
                });
                $("#Serials_Manual").val(newContent);
                manualBadge();
              }
              else if (!this.checked && idx_basket_manually !== -1) {
                rows_basket_manually.splice(idx_basket_manually, 1);
                var newContent="";
                $.each(rows_basket_manually, function( index, value ){
                  newContent+=value.SerialNbr+"\r\n";
                });
                $("#Serials_Manual").val(newContent);
                manualBadge();
              }
            }
            else {
              var idx_basket=checkArray(data, rows_basket);
              var index=checkArray(data, rows_selected);
              //var idx_basket = $.inArray(data, rows_basket);
              //var index = $.inArray(data, rows_selected);
              if (this.checked && idx_basket === -1) { // add if id not in   
                  tbl_basket.row.add(data).draw();
                  rows_basket.push(data);
                  //toastr["success"](data.SerialNbr + " {$DE-Inside.AppleDEP.MainTab.Tab2.message.basket_added$}", "Information");
              } else {
                  // get the correct basket row
                  // no delete at basket TAB will be done with Remove Button
                  // tbl_basket.row(idx_basket).remove().draw();
                  // console.log('deleteing row ' + idx_basket + ' from selection list');
              }
  
              if (this.checked && index === -1) {
                  rows_selected.push(data);
                  // Otherwise, if checkbox is not checked and row ID is in list of selected row IDs
              } else if (!this.checked && index !== -1) {
                  rows_selected.splice(index, 1);
              }
  
              //tbl_basket.fnAddData( data );
              // If checkbox is checked and row ID is not in list of selected row IDs
            }
          
            if (this.checked) {
                $row.addClass('selected');
            } else {
                $row.removeClass('selected');
            }

            e.stopPropagation();
        });

        //event: handle click on "Select all" control at serials table
        $(document).on("click", "#select_all_dt_serials", function(e) {
            if (this.checked) {
                $('#DT_Serials tbody input[type="checkbox"]:not(:checked)').trigger('click');
            } else {
                $('#DT_Serials tbody input[type="checkbox"]:checked').trigger('click');
            }
            // Prevent click event from propagating to parent
            e.stopPropagation();
        });

        // Handle table draw event
        table.on('draw', function() {
            // Update state of "Select all" control
            updateDataTableSelectAllCtrl(table, "select_all_dt_serials");
        });
        /***********************************************
                        END
          Table serials Handle click on checkbox
        ***********************************************/


        /***********************************************
                  START Table Basket
          Table Basket click on checkbox
        ***********************************************/
        //event: click checkbox on basket table
        $('#DT_Basket tbody').on('click', 'input[type="checkbox"]', function(e) {
            var $row = $(this).closest('tr');
            // Get row data
            var data = tbl_basket.row($row).data();
            /* 
            $($row).toggleClass('selected');
            var rowid = tbl_basket.row($row).index();
            var selected = $($row).hasClass('selected');
            persistSelection(rowid, selected);
            */
            // Get row ID
            // var rowId = data.Id;

            // Determine whether row ID is in the list of selected row IDs
            var idx_basket = $.inArray(data, rows_basket_selected);
            var RESELLER_DEPID = $('#IN_RESELLER_DEPID').val().toUpperCase();
            var ENDCUSTOMER_DEPID = $('#ENDCUSTOMER_DEPID').val();
            var ENDCUSTOMER_NAME = $('#ENDCUSTOMER_NAME').val();          
            var ENDCUSTOMER_PO = $('#ENDCUSTOMER_PO').val();
            var ENDCUSTOMER_EMAIL = $('#EndCustEmail').val();
            var Comment = $('#Comment').val();
            if (RESELLER_DEPID != data.CustomerDepId && data.CustomerDepId.length>0) {
                $('#IN_RESELLER_DEPID').val(data.CustomerDepId.toUpperCase());
            }
            /* set input fields with the last selection */
            if (data.EnrollmentId && data.EnrollmentId.length>0) {
              $('#ENROLLMENT_ID').val(data.EnrollmentId.toUpperCase());
            }
            else
            {
              $('#ENROLLMENT_ID').val(data.OrderNbr.toUpperCase());
            }
            $('#ENDCUSTOMER_DEPID').val(data.EndCustDepId.toUpperCase());

            var length = $('#ENDCUSTOMER_DEPID option').filter(function() {
                return $(this).text() === data.EndCustDepId;
            }).length;
            if (length == 0) {
                var p = $('#ENDCUSTOMER_DEPID');
                var o = $('option', p).eq(-2);
                o.before($("<option>", {
                    "selected": true,
                    "text": data.EndCustDepId
                }));
                p.selectpicker('refresh');
            }

            var length = $('#ENDCUSTOMER_NAME option').filter(function() {
                return $(this).text() === data.EndCustName;
            }).length;
            if (length == 0) {
                var p = $('#ENDCUSTOMER_NAME');
                var o = $('option', p).eq(-2);
                o.before($("<option>", {
                    "selected": true,
                    "text": data.EndCustName
                }));
                p.selectpicker('refresh');
            }

            $('#ENDCUSTOMER_PO').val(data.EndCustPo);
            $('#ENDCUSTOMER_NAME').val(data.EndCustName);
            $('#Comment').val(data.Comment);
          
            $("#ENDCUSTOMER_ORDERDATE").data("DateTimePicker").date(moment(data.OrderDate, "DD/MM/YYYY"));
            $("#ENDCUSTOMER_SHIPDATE").data("DateTimePicker").date(moment(data.ShipDate, "DD/MM/YYYY"));
            // if (RESELLER_DEPID == "")  { $('#IN_RESELLER_DEPID').val(data.customerDepId) };
            // if (ENDCUSTOMER_DEPID == "")  { $('#ENDCUSTOMER_DEPID').val(data.endCustDepId) };
            // if (ENDCUSTOMER_PO == "")  { $('#ENDCUSTOMER_PO').val(data.endCustPo) };
            // if (Comment == "")  { $('#Comment').val(data.comment) };
            // tbl_basket.row.add( data ).draw();
            //tbl_basket.fnAddData( data );
            // If checkbox is checked and row ID is not in list of selected row IDs
            if (this.checked && idx_basket === -1) {
                rows_basket_selected.push(data);
                // Otherwise, if checkbox is not checked and row ID is in list of selected row IDs
            } else if (!this.checked && idx_basket !== -1) {
                rows_basket_selected.splice(idx_basket, 1);
            }

            if (this.checked) {
                $row.addClass('selected');
            } else {
                $row.removeClass('selected');
            }
            // Update state of "Select all" control
            updateDataTableSelectAllCtrl(tbl_basket, "select_all_dt_basket");
            // Prevent click event from propagating to parent
            e.stopPropagation();
        });

        // Handle click on "Select all" control
        $(document).on("click", "#select_all_dt_basket", function(e) {
            //  $('thead input[name="select_all_dt_basket"]', tbl_basket.table().container()).on('click', function(e){
            if (this.checked) {
                $('#DT_Basket tbody input[type="checkbox"]:not(:checked)').trigger('click');
            } else {
                $('#DT_Basket tbody input[type="checkbox"]:checked').trigger('click');
            }
            // Prevent click event from propagating to parent
            e.stopPropagation();
        });
        // Handle click on table cells with checkboxes
        $('#DEP').change(function() {
            /* setting currently changed option value to option variable */
            var option = $(this).find('option:selected').val();
            /* setting input box value to selected option value */
            $('#showoption').val(option);
        });
        // Handle table draw event

        tbl_basket.on('draw', function() {
            // Update state of "Select all" control
            updateDataTableSelectAllCtrl(tbl_basket, "select_all_dt_basket");
        });
        /***********************************************
                  END TABLE Basket
          Table Serials Handle click on checkbox
        ***********************************************/

        //event: button remove from basket
        $('.cmdRemove').click(function(e) {
            var setting = $(this).data('info');
            // Iterate over all selected checkboxes
            var delcnt = 0;
            $.each(rows_basket_selected, function(index, data) {
                // get the row index in DT
                var idx_basket = $.inArray(data, rows_basket);
                // var idx = tbl_basket.row( data ).index();
                tbl_basket.row(idx_basket).remove().draw();
                rows_basket.splice(idx_basket, 1);
                delcnt = delcnt + 1;
                // console.log('remove row ' + idx_basket + '.');
            });
            if (delcnt == rows_basket_selected.length) {
                // clean up the selected array
                rows_basket_selected = [];
                tbl_basket.$('input').removeAttr('checked');
                //  tbl_basket.attr('value');
            }
            e.preventDefault();
        });

        //event (unused): button delete item 
        $('.cmdDeleteItem').click(function(e) {
            e.preventDefault();
            var setting = $(this).data('info');
            BootstrapDialog.confirm({
                title: 'Delete selected Lines.',
                message: 'Do you really want to delete this ' + rows_selected.length + ' item(s) ?',
                type: BootstrapDialog.TYPE_DANGER, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
                // draggable: true, // <-- Default value is false
                btnCancelLabel: 'Cancel', // <-- Default value is 'Cancel',
                btnCancelClass: 'btn-info', // <-- If you didn't specify it, dialog type will be used,
                btnOKLabel: 'Accept', // <-- Default value is 'OK',
                btnOKClass: 'btn-warning', // <-- If you didn't specify it, dialog type will be used,
                callback: function(result) {
                    // result will be true if button was click, while it will be false if users close the dialog directly.
                    if (result) {
                        var form = this;
                        var selectedText = $("#DEP").children("option").filter(":selected").text();
                        var selectedValue = $("#DEP").children("option").filter(":selected").attr('value');

                        var requestCallback = new MyRequestsCompleted({
                            numRequest: rows_selected.length
                        });

                        // Iterate over all selected checkboxes
                        $.each(rows_selected, function(index, data) {
                            var rowId = data.Id;
                            var serial_nbr = data.SerialNbr;
                            var request = "~/Apple/ajax/delete_Apple_DEP_line.aspx?service=" + selectedValue + "&ItemID=" + rowId;
                            $.ajax({
                                url: request,
                                success: function(data) {
                                    var ok = (data < 0 & data > -100) ? "true" : "false";
                                    toastr[ok === "true" ? "success" : "error"]("{$DE-Inside.AppleDEP.MainTab.Tab2.message.orderid$}: " + ENROLLMENT_ID, selectedText);
                                }
                            });
                            /*
                            remarked als beispiel 
                            var result = $.get( request, function( data ) {
                               toastr[data === "1" ? "success" : "error"]("Serial Nbr.:" + serial_nbr + " processed.");       
                            }); // end get  */
                        }); // end each row
                    } // end of if result
                } // end callback
            }); // end if confirm / undefined
        }); // end cmdDelete

        //event: button save - handle form submission event 
        $('.cmdSave').click(function(e) {
            if (tbl_basket.data().count() == 0) {
                error.text = "{$DE-Inside.AppleDEP.MainTab.Tab2.message.addLine$}";
                error.valid = false;
            } else {
                var _inputValid = (checkinputs('checkinput_left') && checkinputs('checkinput_right'));
                if (_inputValid == true) {
                    var dt_orderdate = $('#ENDCUSTOMER_ORDERDATE').val();
                    var dt_shipdate = $('#ENDCUSTOMER_SHIPDATE').val();
                    // if (_inputValid == true) _inputValid = ;
                    if ((dt_orderdate != "") && (dt_shipdate != "")) {

                        var form = this;
                        var selectedText = $("#DEP").children("option").filter(":selected").text();
                        var selectedValue = $("#DEP").children("option").filter(":selected").attr('value');
                        // var CUSTOMER_ID = $('#CUSTOMER_ID').val();
                        var RESELLER_DEPID = $('#IN_RESELLER_DEPID').val().toUpperCase();
                        var ENROLLMENT_ID = $('#ENROLLMENT_ID').val().toUpperCase();
                        var ENDCUSTOMER_DEPID = $('#ENDCUSTOMER_DEPID').val();
                        var ENDCUSTOMER_NAME = $('#ENDCUSTOMER_NAME').val();
                        var ENDCUSTOMER_PO = $('#ENDCUSTOMER_PO').val();
                        var ENDCUSTOMER_EMAIL = $('#EndCustEmail').val();
                        var Comment = $('#Comment').val();
                        var currentdate = new Date();
                        var actualtime = currentdate.getHours() + ":" +
                            currentdate.getMinutes() + ":" +
                            currentdate.getSeconds();
                        var dt_orderdate = new Date($('#ENDCUSTOMER_ORDERDATE').val() + ' ' + "10:00:00"); // actualtime);
                        var dt_shipdate = new Date($('#ENDCUSTOMER_SHIPDATE').val() + ' ' + "10:00:00"); // actualtime);

                        //var dt_orderdate_iso = moment(dt_orderdate).format('YYYY-MM-DDThh:mm:ssZ');
                        var dt_orderdate_iso = dt_orderdate.toISOString().slice(0, 10) + 'T' + "00:00:00Z";
                        // var dt_shipdate_iso = moment(dt_shipdate).format('YYYY-MM-DDThh:mm:ssZ');
                        var dt_shipdate_iso = dt_shipdate.toISOString().slice(0, 10) + 'T' + "00:00:00Z";
                        if (dt_orderdate > dt_shipdate) {
                            error.valid = false;
                            error.text = "{$DE-Inside.AppleDEP.MainTab.Tab2.message.wrongdates$}";
                        }
                    } else {
                        error.valid = false;
                        error.text = "{$DE-Inside.AppleDEP.MainTab.Tab2.message.wrongdates$}";
                    }
                } else {
                    error.valid = false;
                    // error.text = "{$CSS.AppleDEP.serial-enrollment.Msg.WrongDates$}";
                }
            }
            if (error.valid == true) {
                /* are you sure ? */
                var msg = "<table style='width:100%'>" +
                    "<tr><td>{$DE-Inside.AppleDEP.MainTab.Tab2.resellerid$}:</td><td>" + RESELLER_DEPID + "</td></tr>" +
                    "<tr><td>{$DE-Inside.AppleDEP.MainTab.Tab2.orderid$}:</td><td>" + ENROLLMENT_ID + "</td></tr>" +
                    "<tr><td>{$DE-Inside.AppleDEP.MainTab.Tab2.endcustdepid$}:</td><td>" + ENDCUSTOMER_DEPID + "</td></tr>" +
                    "<tr><td>{$DE-Inside.AppleDEP.MainTab.Tab2.endcustname$}:</td><td>" + ENDCUSTOMER_NAME + "</td></tr>"
                //"<tr><td>{$DE-Inside.AppleDEP.MainTab.Tab2.endcustpo$}:</td><td>" + ENDCUSTOMER_PO + "</td></tr>" +
                /*
                 "<tr><td>OrderDate:</td><td>" + dt_orderdate_iso + "</td></tr>" +
                 "<tr><td>ShipDate:</td><td>" + dt_shipdate_iso + "</td></tr>" +
                */
                "<tr><td>Comment:</td><td>" + Comment + "</td></tr>" +
                    "</table>";


                /*------------------------------------------------*/
                BootstrapDialog.confirm({
                    title: '{$DE-Inside.AppleDEP.MainTab.Tab2.message.dialog.confirm$}',
                    message: msg,
                    type: BootstrapDialog.TYPE_WARNING, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
                    // draggable: true, // <-- Default value is false
                    btnCancelLabel: 'Cancel', // <-- Default value is 'Cancel',
                    btnCancelClass: 'btn-info', // <-- If you didn't specify it, dialog type will be used,
                    btnOKLabel: 'Accept', // <-- Default value is 'OK',
                    btnOKClass: 'btn-warning', // <-- If you didn't specify it, dialog type will be used,
                    callback: function(result) {
                        // result will be true if button was click, while it will be false if users close the dialog directly.
                        var formData = "";

                        if (result) {
                            var itemids = "";
                            var d = this.data();
                            // Iterate over all selected checkboxes
                            tbl_basket.rows().every(function(rowIdx, tableLoop, rowLoop) {
                                d = this.data();
                                var rowId = d.Id;
                                itemids = itemids + rowId + "~";
                            }); // end each
                            var rowId = d.Id;
                            var serial_nbr = d.SerialNbr;
                            if(typeof ENDCUSTOMER_EMAIL==="undefined") {ENDCUSTOMER_EMAIL=""}
                            var formData = "ItemIDs=" + itemids +
                                "&service=" + selectedValue +
                                // "&serialNbr=" + serial_nbr +
                                "&CustomerDepId=" + RESELLER_DEPID +
                                "&EnrollmentID=" + ENROLLMENT_ID +
                                "&EndCustDepId=" + ENDCUSTOMER_DEPID +
                                "&EndCustName=" + ENDCUSTOMER_NAME +
                                "&EndCustEmail=" + ENDCUSTOMER_EMAIL +
                                "&OrderDate=" + dt_orderdate_iso +
                                "&ShipDate=" + dt_shipdate_iso +
                                "&Comment=" + Comment;

                            var request = "/content-items/ajax/dashboard/dep/createdep";
                            $.ajax({
                                url: request,
                                type: "POST",
                                data: formData,
                                success: function(data) {
                                    var ok = (data < 0 & data > -100) ? "true" : "false";
                                    if (data == -900) {
                                        /*  -900 =  enrollment again 1 or more  line(s)  enrolled with ordertype = OR and status =1
                                          Show error dialog.
                                        */
                                        BootstrapDialog.show({
                                            title: '{$DE-Inside.AppleDEP.MainTab.Tab2.message.dialog.confirm.title.enrolled$}',
                                            message: '{$DE-Inside.AppleDEP.MainTab.Tab2.message.dialog.confirm.message.enrolled$}',
                                            type: BootstrapDialog.TYPE_WARNING,
                                            buttons: [{
                                                label: 'OK',
                                                cssClass: 'btn-warning',
                                                action: function(dialogItself) {
                                                    dialogItself.close();
                                                }
                                            }]
                                        });
                                    } else if (data == -910) {
                                        /*  -900 =  enrollment again 1 or more  line(s)  enrolled with ordertype = OR and status =1
                                          Show error dialog.
                                        */
                                        BootstrapDialog.show({
                                            title: '{$DE-Inside.AppleDEP.MainTab.Tab2.message.dialog.confirm.title.pending$}',
                                            message: '{$DE-Inside.AppleDEP.MainTab.Tab2.message.dialog.confirm.message.pending$}',
                                            type: BootstrapDialog.TYPE_WARNING,
                                            buttons: [{
                                                label: 'OK',
                                                cssClass: 'btn-warning',
                                                action: function(dialogItself) {
                                                    dialogItself.close();
                                                }
                                            }]
                                        });
                                    } else if (data == -920) {
                                        /*  -920 =  enrollment id already used
                                          Show error dialog.
                                        */
                                        BootstrapDialog.show({
                                            title: '{$DE-Inside.AppleDEP.MainTab.Tab2.message.dialog.confirm.title.usedenrollmentid$}',
                                            message: '{$DE-Inside.AppleDEP.MainTab.Tab2.message.dialog.confirm.message.usedenrollmentid$}',
                                            type: BootstrapDialog.TYPE_WARNING,
                                            buttons: [{
                                                label: 'OK',
                                                cssClass: 'btn-warning',
                                                action: function(dialogItself) {
                                                    dialogItself.close();
                                                }
                                            }]
                                        });
                                    } else {
                                        // toastr[ok === "true" ? "success" : "error"]( "{$CSS.AppleDEP.serial-enrollment.tab.basket.orderid$}: " + ENROLLMENT_ID, selectedText);
                                        if (ok == "true") {
                                            BootstrapDialog.show({
                                                title: '{$DE-Inside.AppleDEP.MainTab.Tab2.message.dialog.confirm.title$}',
                                                message: msg + '<br>' + '{$DE-Inside.AppleDEP.MainTab.Tab2.message.dialog.confirm.message.successful$}',
                                                type: BootstrapDialog.TYPE_SUCCESS,
                                                buttons: [{
                                                    label: 'OK',
                                                    cssClass: 'btn-primary',
                                                    action: function(dialogItself) {
                                                        dialogItself.close();
                                                    }
                                                }]

                                            });
                                            // basket clear
                                            tbl_basket.clear().draw();
                                            rows_basket = [];
                                            // go to main tab
                                            $('.nav li:nth-child(1) a').tab('show');
                                            $('#ENDCUSTOMER_DEPID').val("");$('#ENDCUSTOMER_DEPID').selectpicker('refresh');
                                            $('#ENDCUSTOMER_NAME').val("");$('#ENDCUSTOMER_NAME').selectpicker('refresh');
                                            $('#IN_RESELLER_DEPID').val("");
                                            $("#DEP").selectpicker('val', "OR");
                                            //$('#ENDCUSTOMER_ORDERDATE').data().DateTimePicker.date(null);
                                            //$('#ENDCUSTOMER_SHIPDATE').data().DateTimePicker.date(null);
                                            $("#ENDCUSTOMER_SHIPDATE").data("DateTimePicker").date(new Date());
                                            $("#ENDCUSTOMER_ORDERDATE").data("DateTimePicker").date(new Date());
                                            $('#Comment').val("");
                                            $('#ENROLLMENT_ID').val("");
                                            //$('.nav-tabs a[href="#serials"]').tab('show');
                                            //table.ajax.reload();
                                            table.draw(); // refresh main tab
                                        } else {
                                            BootstrapDialog.show({
                                                title: '{$DE-Inside.AppleDEP.MainTab.Tab2.message.dialog.confirm.title$}',
                                                message: '{$DE-Inside.AppleDEP.MainTab.Tab2.message.dialog.confirm.message.failed$}',
                                                type: BootstrapDialog.TYPE_WARNING,
                                                buttons: [{
                                                    label: 'OK',
                                                    cssClass: 'btn-warning',
                                                    action: function(dialogItself) {
                                                        dialogItself.close();
                                                    }
                                                }]
                                            });
                                        }
                                    }
                                }
                            });
                        } // end if result
                    } // end of callback
                }); // end 1st Dlg
            } /* end if _inputValid */
            else {
                toastr.options.timeOut = 5000;
                toastr["warning"](error.text, "Information");
                error.text = "{$DE-Inside.AppleDEP.MainTab.Tab2.message.dialog.confirm.message.valid$}";
                toastr.options.timeOut = 1000;
            }
            /*
            if (rows_selected.length == inscnt) {
               toastr["success"]( inscnt + " item(s) processed", selectedText);
            }
            else {
               toastr["error"]( inscnt + " item(s) processed out of " +rows_selected.length, selectedText);
            }
            */
            e.preventDefault();
        });
		
		
		// Manual Enrollment		
		 $('.cmdSaveManual').click(function(e) {
            var arrfinal=new Array();
			var serialnbr=$("#Serials_Manual").val().toUpperCase();
            $.each( serialnbr.split("\n"), function( index, value ){
              if (value!=="") {
                    $.each( value.split(" "), function( index, value ){
                        if (value!=="") {arrfinal.push(value);}
                    });
              }
            });

            if (arrfinal.length == 0) {
                error.text = "{$DE-Inside.AppleDEP.MainTab.Tab2.message.addLine$}";
                error.valid = false;
            } else {
                var _inputValid = (checkinputs('checkinput_left_manual') && checkinputs('checkinput_right_manual'));
                if (_inputValid == true) {
                    var dt_orderdate_manual = $('#ENDCUSTOMER_ORDERDATE_MANUAL').val();
                    var dt_shipdate_manual = $('#ENDCUSTOMER_SHIPDATE_MANUAL').val();
                    // if (_inputValid == true) _inputValid = ;
                    if ((dt_orderdate_manual != "") && (dt_shipdate_manual != "")) {

                        var form = this;
                        var selectedText = $("#DEP_Manual").children("option").filter(":selected").text();
                        var selectedValue = $("#DEP_Manual").children("option").filter(":selected").attr('value');
                        // var CUSTOMER_ID = $('#CUSTOMER_ID').val();
                        var RESELLER_DEPID_MANUAL = $('#IN_RESELLER_DEPID_MANUAL').val().toUpperCase();
                        var ENROLLMENT_ID_MANUAL = $('#ENROLLMENT_ID_MANUAL').val().toUpperCase();
                        var ENDCUSTOMER_DEPID_MANUAL = $('#ENDCUSTOMER_DEPID_MANUAL').val();
                        var ENDCUSTOMER_NAME_MANUAL = $('#ENDCUSTOMER_NAME_MANUAL').val();
                        var ENDCUSTOMER_PO_MANUAL = $('#ENDCUSTOMER_PO_MANUAL').val();
                        var ENDCUSTOMER_EMAIL_MANUAL = $('#EndCustEmail_Manual').val();
                        var CustomerOrderNo_Manual = $('#CustomerOrderNo_Manual').val();
                        var InvoiceNo_Manual = $('#InvoiceNo_Manual').val();
                        var OrderNo_Manual = $('#OrderNo_Manual').val();
                        var Comment_Manual = $('#Comment_Manual').val();
                        var CUSTOMER_ID_MANUAL = $('#CUSTOMER_ID_MANUAL').val();
                      
                        var currentdate = new Date();
                        var actualtime = currentdate.getHours() + ":" +
                            currentdate.getMinutes() + ":" +
                            currentdate.getSeconds();
                        var dt_orderdate_manual = new Date($('#ENDCUSTOMER_ORDERDATE_MANUAL').val() + ' ' + "10:00:00"); // actualtime);
                        var dt_shipdate_manual = new Date($('#ENDCUSTOMER_SHIPDATE_MANUAL').val() + ' ' + "10:00:00"); // actualtime);

                        //var dt_orderdate_iso = moment(dt_orderdate).format('YYYY-MM-DDThh:mm:ssZ');
                        var dt_orderdate_iso_manual = dt_orderdate_manual.toISOString().slice(0, 10) + 'T' + "00:00:00Z";
                        // var dt_shipdate_iso_manual = moment(dt_shipdate_manual).format('YYYY-MM-DDThh:mm:ssZ');
                        var dt_shipdate_iso_manual = dt_shipdate_manual.toISOString().slice(0, 10) + 'T' + "00:00:00Z";
                        if (dt_orderdate_manual > dt_shipdate_manual) {
                            error.valid = false;
                            error.text = "{$DE-Inside.AppleDEP.MainTab.Tab2.message.wrongdates$}";
                        }
                    } else {
                        error.valid = false;
                        error.text = "{$DE-Inside.AppleDEP.MainTab.Tab2.message.wrongdates$}";
                    }
                } else {
                    error.valid = false;
                    // error.text = "{$CSS.AppleDEP.serial-enrollment.Msg.WrongDates$}";
                }
            }
            if (error.valid == true) {
                /* are you sure ? */
                var msg = "<table style='width:100%'>" +
                    "<tr><td>{$DE-Inside.AppleDEP.MainTab.Tab2.resellerid$}:</td><td>" + RESELLER_DEPID_MANUAL + "</td></tr>" +
                    "<tr><td>{$DE-Inside.AppleDEP.MainTab.Tab2.orderid$}:</td><td>" + ENROLLMENT_ID_MANUAL + "</td></tr>" +
                    "<tr><td>{$DE-Inside.AppleDEP.MainTab.Tab2.endcustdepid$}:</td><td>" + ENDCUSTOMER_DEPID_MANUAL + "</td></tr>" +
                    "<tr><td>{$DE-Inside.AppleDEP.MainTab.Tab2.endcustname$}:</td><td>" + ENDCUSTOMER_NAME_MANUAL + "</td></tr>" +
                                           
                //"<tr><td>{$DE-Inside.AppleDEP.MainTab.Tab2.endcustpo$}:</td><td>" + ENDCUSTOMER_PO + "</td></tr>" +
                /*
                 "<tr><td>OrderDate:</td><td>" + dt_orderdate_iso + "</td></tr>" +
                 "<tr><td>ShipDate:</td><td>" + dt_shipdate_iso + "</td></tr>" +
                */
                "<tr><td>{$DE-Inside.AppleDEP.MainTab.Tab2.endcustemail$}:</td><td>" + ENDCUSTOMER_EMAIL_MANUAL + "</td></tr>" +
                "<tr><td>{$DE-Inside.AppleDEP.MainTab.Tab2.comment$}:</td><td>" + Comment_Manual + "</td></tr>" +
                "<tr><td>{$1IM.Dashboard.CCP.CustomerOrderNo$}:</td><td>" + CustomerOrderNo_Manual + "</td></tr>" +
                "<tr><td>{$1IM.Dashboard.CCP.InvoiceNbr$}:</td><td>" + InvoiceNo_Manual + "</td></tr>" +
                "<tr><td>{$DE-Inside.AppleDEP.MainTab.Tab2.orderid$}:</td><td>" + OrderNo_Manual + "</td></tr>" +
                "</table>";


                /*------------------------------------------------*/
                BootstrapDialog.confirm({
                    title: '{$DE-Inside.AppleDEP.MainTab.Tab2.message.dialog.confirm$}',
                    message: msg,
                    type: BootstrapDialog.TYPE_WARNING, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
                    // draggable: true, // <-- Default value is false
                    btnCancelLabel: 'Cancel', // <-- Default value is 'Cancel',
                    btnCancelClass: 'btn-info', // <-- If you didn't specify it, dialog type will be used,
                    btnOKLabel: 'Accept', // <-- Default value is 'OK',
                    btnOKClass: 'btn-warning', // <-- If you didn't specify it, dialog type will be used,
                    callback: function(result) {
                        // result will be true if button was click, while it will be false if users close the dialog directly.
                        var formData = "";

                        if (result) {
                            var arrfinal=new Array();
                            var serialnbr=$("#Serials_Manual").val();
                            
                            $.each( serialnbr.split("\n"), function( index, value ){
                              if (value!=="") {
                                    $.each( value.split(" "), function( index, value ){
                                        if (value!=="") {arrfinal.push(value);}
                                    });
                              }
                            });
                          
                            var itemids = "";
                          
                            $.each(arrfinal, function( index, value ){
                                itemids+= value+"~";
                            });
                            
                            
                            if(typeof ENDCUSTOMER_EMAIL_MANUAL==="undefined") {ENDCUSTOMER_EMAIL_MANUAL=""}
                            var formData = "ItemIDs=" + itemids +
                                "&service=" + selectedValue +
                                "&CustomerDepIdManual=" + RESELLER_DEPID_MANUAL +
                                "&EnrollmentIDManual=" + ENROLLMENT_ID_MANUAL +
                                "&EndCustDepIdManual=" + ENDCUSTOMER_DEPID_MANUAL +
                                "&EndCustNameManual=" + ENDCUSTOMER_NAME_MANUAL +
                                "&EndCustEmailManual=" + ENDCUSTOMER_EMAIL_MANUAL +
                                "&OrderDateManual=" + dt_orderdate_iso_manual +
                                "&ShipDateManual=" + dt_shipdate_iso_manual +
                                "&CommentManual=" + Comment_Manual + 
                                "&CustomerOrderNoManual=" + CustomerOrderNo_Manual + 
                                "&InvoiceNoManual=" + InvoiceNo_Manual + 
                                "&OrderNoManual=" + OrderNo_Manual +
                                "&CUSTOMER_ID_MANUAL=" + CUSTOMER_ID_MANUAL;
                          
                            var request = "/content-items/ajax/dashboard/dep/createdep_manually";
                            $.ajax({
                                url: request,
                                type: "POST",
                                data: formData,
                                success: function(data) {
                                    var ok = (data < 0 & data > -100) ? "true" : "false";
                                    if (data == -900) {
                                        /*  -900 =  enrollment again 1 or more  line(s)  enrolled with ordertype = OR and status =1
                                          Show error dialog.
                                        */
                                        BootstrapDialog.show({
                                            title: '{$DE-Inside.AppleDEP.MainTab.Tab2.message.dialog.confirm.title.enrolled$}',
                                            message: '{$DE-Inside.AppleDEP.MainTab.Tab2.message.dialog.confirm.message.enrolled$}',
                                            type: BootstrapDialog.TYPE_WARNING,
                                            buttons: [{
                                                label: 'OK',
                                                cssClass: 'btn-warning',
                                                action: function(dialogItself) {
                                                    dialogItself.close();
                                                }
                                            }]
                                        });
                                    } else if (data == -910) {
                                        /*  -900 =  enrollment again 1 or more  line(s)  enrolled with ordertype = OR and status =1
                                          Show error dialog.
                                        */
                                        BootstrapDialog.show({
                                            title: '{$DE-Inside.AppleDEP.MainTab.Tab2.message.dialog.confirm.title.pending$}',
                                            message: '{$DE-Inside.AppleDEP.MainTab.Tab2.message.dialog.confirm.message.pending$}',
                                            type: BootstrapDialog.TYPE_WARNING,
                                            buttons: [{
                                                label: 'OK',
                                                cssClass: 'btn-warning',
                                                action: function(dialogItself) {
                                                    dialogItself.close();
                                                }
                                            }]
                                        });
                                    } else if (data == -920) {
                                        /*  -920 =  enrollment id already used
                                          Show error dialog.
                                        */
                                        BootstrapDialog.show({
                                            title: '{$DE-Inside.AppleDEP.MainTab.Tab2.message.dialog.confirm.title.usedenrollmentid$}',
                                            message: '{$DE-Inside.AppleDEP.MainTab.Tab2.message.dialog.confirm.message.usedenrollmentid$}',
                                            type: BootstrapDialog.TYPE_WARNING,
                                            buttons: [{
                                                label: 'OK',
                                                cssClass: 'btn-warning',
                                                action: function(dialogItself) {
                                                    dialogItself.close();
                                                }
                                            }]
                                        });
                                    } else if (data == -991) {
                                        /*  -991 =  customerno not found
                                          Show error dialog.
                                        */
                                        BootstrapDialog.show({
                                            title: '{$DE-Inside.AppleDEP.MainTab.Tab2.message.dialog.confirm.title.customernotfound$}',
                                            message: '{$DE-Inside.AppleDEP.MainTab.Tab2.message.dialog.confirm.message.customernotfound$}',
                                            type: BootstrapDialog.TYPE_WARNING,
                                            buttons: [{
                                                label: 'OK',
                                                cssClass: 'btn-warning',
                                                action: function(dialogItself) {
                                                    dialogItself.close();
                                                }
                                            }]
                                        });
                                    } else {
                                        // toastr[ok === "true" ? "success" : "error"]( "{$CSS.AppleDEP.serial-enrollment.tab.basket.orderid$}: " + ENROLLMENT_ID, selectedText);
                                        if (ok == "true") {
                                            BootstrapDialog.show({
                                                title: '{$DE-Inside.AppleDEP.MainTab.Tab2.message.dialog.confirm.title$}',
                                                message: msg + '<br>' + '{$DE-Inside.AppleDEP.MainTab.Tab2.message.dialog.confirm.message.successful$}',
                                                type: BootstrapDialog.TYPE_SUCCESS,
                                                buttons: [{
                                                    label: 'OK',
                                                    cssClass: 'btn-primary',
                                                    action: function(dialogItself) {
                                                        dialogItself.close();
                                                    }
                                                }]

                                            });
                                            // basket clear
                                            $("#Serials_Manual").val('');
                                            $("#basket-count-Manual").html(0);
                                            $("#basket-count-Manual").css("background-color","#73879C");
                                            // go to main tab
                                            $('.nav li:nth-child(1) a').tab('show');
                                            $('#ENDCUSTOMER_DEPID_MANUAL').val("");$('#ENDCUSTOMER_DEPID_MANUAL').selectpicker('refresh');
                                            $('#ENDCUSTOMER_NAME_MANUAL').val("");$('#ENDCUSTOMER_NAME_MANUAL').selectpicker('refresh');
                                            $('#IN_RESELLER_DEPID_MANUAL').val("");
                                            $("#DEP_Manual").selectpicker('val', "OR");
                                            //$('#ENDCUSTOMER_ORDERDATE').data().DateTimePicker.date(null);
                                            //$('#ENDCUSTOMER_SHIPDATE').data().DateTimePicker.date(null);
                                            $("#ENDCUSTOMER_SHIPDATE_MANUAL").data("DateTimePicker").date(new Date());
                                            $("#ENDCUSTOMER_ORDERDATE_MANUAL").data("DateTimePicker").date(new Date());
                                            $('#Comment_Manual').val("");
                                            $('#ENROLLMENT_ID_MANUAL').val("");
                                            $('#EndCustEmail_Manual').val("");
                                            $('#CustomerOrderNo_Manual').val("");
                                            $('#InvoiceNo_Manual').val("");
                                            $('#OrderNo_Manual').val("");
                                            //$('.nav-tabs a[href="#serials"]').tab('show');
                                            //table.ajax.reload();
                                            table.draw(); // refresh main tab
                                        } else {
                                            BootstrapDialog.show({
                                                title: '{$DE-Inside.AppleDEP.MainTab.Tab2.message.dialog.confirm.title$}',
                                                message: '{$DE-Inside.AppleDEP.MainTab.Tab2.message.dialog.confirm.message.failed$}',
                                                type: BootstrapDialog.TYPE_WARNING,
                                                buttons: [{
                                                    label: 'OK',
                                                    cssClass: 'btn-warning',
                                                    action: function(dialogItself) {
                                                        dialogItself.close();
                                                    }
                                                }]
                                            });
                                        }
                                    }
                                }
                            });
                        } // end if result
                    } // end of callback
                }); // end 1st Dlg
            } /* end if _inputValid */
            else {
                toastr.options.timeOut = 5000;
                toastr["warning"](error.text, "Information");
                error.text = "{$DE-Inside.AppleDEP.MainTab.Tab2.message.dialog.confirm.message.valid$}";
                toastr.options.timeOut = 1000;
            }
            /*
            if (rows_selected.length == inscnt) {
               toastr["success"]( inscnt + " item(s) processed", selectedText);
            }
            else {
               toastr["error"]( inscnt + " item(s) processed out of " +rows_selected.length, selectedText);
            }
            */
            e.preventDefault();
        });
		
		 //event: button remove from basket
           $('.cmdRemoveManual').click(function(e) {
           $("#Serials_Manual").val('');
		   if($("#Serials_Manual").val()==''){
			   
			  manual_count = 0;
			  $("#basket-count-Manual").html(manual_count);
				 $("#basket-count-Manual").css("background-color","#73879C");

			   
		   }
            e.preventDefault();
        });
           
    });

    function searchDevices() {
        customer_id = $('#CUSTOMER_ID').val();
        if (typeof $("#CUSTOMER_ID").val() === "undefined") {
          customer_id = '{% CurrentUser.imCompanyCd #%}{% CurrentUser.imBranchNbr #%}{% CurrentUser.imCustomerNbr #%}';
          //d.customer_id = customer_id;
        }
        sql_device_id = getDeviceID();
        $('#ENDCUSTOMER_DEPID').val("");$('#ENDCUSTOMER_DEPID').selectpicker('refresh');
        $('#ENDCUSTOMER_NAME').val("");$('#ENDCUSTOMER_NAME').selectpicker('refresh');
        $('#ENDCUSTOMER_PO').val("");
        $('#Comment').val("");
    }

    function getDeviceID() {
        var device_id = $("#DEVICE_ID").val();
        if (device_id.replace(/(\r\n|\n|\r)/gm,"").trim()=="") {device_id="";}
        sqldeviceid = "";
        if (device_id != "") {
            device_id = device_id.split(" ");
            if (device_id == $("#DEVICE_ID").val()) {
                // space dosent work, try newline  
                device_id = $("#DEVICE_ID").val();
                device_id = device_id.split("\n");
            }
            sqldeviceid = "(";
            device_id.forEach(function(entry) {
                if (entry != "") {
                    sqldeviceid = sqldeviceid + "'" + entry + "',";
                }
            });
            sqldeviceid = sqldeviceid.substr(0, sqldeviceid.length - 1) + ")";
        }
        return sqldeviceid;
    }

    function checkinputs(section) {
        error.valid = true;
        var div = document.getElementById(section);

        $(div).find('input:text, input:password, textarea, input:checkbox, select')
            .each(function() {
                var regexparam = $(this).attr('pattern');
                var regex = null;
                if (regexparam != "") regex = new RegExp(regexparam);
                var required = $(this).attr('required') == "required";
                var name = $(this).attr('id');
                var inp_val = $(this).val();
                var inputType = $('#' + name).attr('type');
                if ((required == true) && (inp_val == "")) {
                    error.valid = false;
                    if (inputType == 'option') {
                        //$(this).effect("highlight", {}, 5000); 
                        $('button[data-id="' + name + '"]').removeClass("btn-primary");
                        $('button[data-id="' + name + '"]').addClass("btn-danger");
                        //$(this).closest('button').closest('button').addClass("form-group btn-danger has-feedback");
                        error.text = "{$DE-Inside.AppleDEP.MainTab.Tab2.message.select_endcustomer$}";
                    } else {
                        $(this).closest('div').addClass("form-group has-error has-feedback");
                        //$(this).effect("highlight", {}, 2000);
                    }
                } else {
                    if (inputType == 'option' && $('button[data-id="' + name + '"]').hasClass("btn-danger")) {
                        $('button[data-id="' + name + '"]').removeClass("btn-danger");
                        $('button[data-id="' + name + '"]').addClass("btn-primary");
                    } else if (inputType == 'checkbox' && $(this).closest('div').hasClass("label-danger")) {
                        $(this).closest('div').removeClass("form-group label-danger has-feedback");
                    } else if ($(this).closest('div').hasClass("has-error")) {
                        $(this).closest('div').removeClass("form-group has-error has-feedback");
                    }

                    if (regex != null) {
                        if (!regex.test(inp_val)) {
                            //$(this).effect("bounce", "slow");
                            $(this).closest('div').addClass("form-group has-error has-feedback");
                            //$(this).effect("highlight", {}, 5000);
                            //$(this).addClass('error_input');
                            error.valid = false;
                        } else {
                            // checkbox ?
                            if (inputType == 'checkbox') {
                                if (!$(this).is(":checked")) {
                                    $(this).closest('div').addClass("form-group label-danger has-feedback");
                                    //$(this).effect("highlight", {}, 5000); 
                                    error.valid = false;
                                    error.text = "{$DE-Inside.AppleDEP.MainTab.Tab2.message.confirm$}";
                                }
                            }
                            $(this).removeClass('error_input');
                        }
                    }
                }
            });
        return error.valid;
    }
    //
    // Updates "Select all" control in a data table
    //
    function updateDataTableSelectAllCtrl(table, headername) {
        var $table = table.table().node();
        var $chkbox_all = $('tbody input[type="checkbox"]', $table);
        var $chkbox_checked = $('tbody input[type="checkbox"]:checked', $table);
        var chkbox_select_all = $('thead input[name="' + headername + '"]', $table).get(0);

        if (chkbox_select_all) {
            // If none of the checkboxes are checked
            if ($chkbox_checked.length === 0) {
                chkbox_select_all.checked = false;
                if ('indeterminate' in chkbox_select_all) {
                    chkbox_select_all.indeterminate = false;
                }

                // If all of the checkboxes are checked
            } else if ($chkbox_checked.length === $chkbox_all.length) {
                chkbox_select_all.checked = true;
                if ('indeterminate' in chkbox_select_all) {
                    chkbox_select_all.indeterminate = false;
                }

                // If some of the checkboxes are checked
            } else {
                chkbox_select_all.checked = true;
                if ('indeterminate' in chkbox_select_all) {
                    chkbox_select_all.indeterminate = true;
                }
            }
        }
    }

    var MyRequestsCompleted = (function() {
        var numRequestToComplete,
            requestsCompleted,
            callBacks,
            singleCallBack;

        return function(options) {
            if (!options) options = {};

            numRequestToComplete = options.numRequest || 0;
            requestsCompleted = options.requestsCompleted || 0;
            callBacks = [];
            var fireCallbacks = function() {
                for (var i = 0; i < callBacks.length; i++) callBacks[i]();
                // Reload Page
                location.reload();
                //alert("we're all complete");
            };
            if (options.singleCallback) callBacks.push(options.singleCallback);



            this.addCallbackToQueue = function(isComplete, callback) {
                if (isComplete) requestsCompleted++;
                if (callback) callBacks.push(callback);
                if (requestsCompleted == numRequestToComplete) fireCallbacks();
            };
            this.requestComplete = function(isComplete) {
                if (isComplete) requestsCompleted++;
                if (requestsCompleted == numRequestToComplete) fireCallbacks();
            };
            this.setCallback = function(callback) {
                callBacks.push(callBack);
            };
        };
    })();

    function selectPersistedRows(table) {
        if (!(sessionStorage.rowKeyStore))
            return;

        var rowKeys = JSON.parse(sessionStorage.rowKeyStore);
        for (var key in rowKeys) {
            $(table.row(key).node()).addClass('selected');
        }
    }
  
    function checkArray(a1, a2) {
      var t=-1;
      for (var i = 0; i < a2.length; i++) {
        if (a2[i].Id === a1.Id){
          t=i;
          break;
        }
      }
      return t;
    }
  
    function persistSelection(index, isSelected) {
        var ss = sessionStorage;
        if (!(ss.rowKeyStore)) {
            ss.rowKeyStore = "{}";
        }
        var rowKeys = JSON.parse(ss.rowKeyStore);
        if (isSelected === false && rowKeys.hasOwnProperty(index)) {
            console.log('removing row ' + index + ' from selection list');
            delete rowKeys[index];
        } else if (isSelected) {
            rowKeys[index] = true;
            console.log('adding row ' + index + ' from selection list');
        }
        ss.rowKeyStore = JSON.stringify(rowKeys);
    }
 
