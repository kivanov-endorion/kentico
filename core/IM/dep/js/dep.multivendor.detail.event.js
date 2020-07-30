$(document).ready(function(e) 
{         
    //event: click on serials table line shows history sub table
    $('#DT_Serials tbody').off('click').on('click', 'td', function (e) {
      
      // Prevent click event from propagating to parent
      e.stopPropagation();
      
      var tr = $(this).closest('tr');
      var row = tbl_serials.row( tr );
      var node = tbl_serials.row(tr).node();
      
      if ( row.child.isShown() ) {
          // this row is already open - close it
          row.child.hide();
          tr.removeClass('shown');
          $("#DT_Serials_Sub"+row[0][0]).DataTable().destroy();
  
          $(tbl_serials.cell({ row: row[0][0], column: 5 }).node()).find("i").removeClass('fa-compress');
          $(tbl_serials.cell({ row: row[0][0], column: 5 }).node()).find("i").addClass('fa-expand');
      }
      else {
          // open this row
          row.child( formatDetails(row.data(), row[0][0]),'no-padding').show();
          //$('tr td:first-child').css("padding","0");
          tr.addClass('shown'); 
        
          var osubtable=$("#DT_Serials_Sub"+row[0][0]).DataTable(
          {
            "sDom": '<"top">rt<"bottom"><"clear">',
            ajax: {
              type: "POST",
              url: "/content-items/ajax/dashboard/dep/get_history",
              data:  function(d) { 
                d.customer_id = $("#CUSTOMER_ID").val(); 
                d.Id = row.data().Id; 
                if (d.customer_id == '')  d.customer_id = "EMPTY";
              },
            },
            scrollCollapse: true,
            autoWidth: true,
            paging: false,
            responsive: true, 
            sWidth: "100%",
            Processing: true,  
            ordering: false,
            language: {
              url: "~/1IM/1IM.v1/dataTables-1.10.12/lang/{$ DataTable.Language $}.js",
            },        
            columns: [
              {className: "Id", name: "Id", data: "Id", title: "{$DE-Inside.AppleDEP.tbl_serials.sub_tbl_history.column.title.Id$}", visible: false},
              {className: "OrderType dt-center", name: "OrderType", data: "OrderType", title: "{$DE-Inside.AppleDEP.tbl_serials.sub_tbl_history.column.title.OrderType$}", visible: true},
              { 
                className: "InternalStatus dt-center",
                data: "InternalStatus",
                name: "InternalStatus",
                title: "{$DE-Inside.AppleDEP.tbl_serials.sub_tbl_history.column.title.InternalStatus$}",
                render: function (data, type, full ) {
                  var state_icn = "fas fa-circle";
                  var ResponseMessage = "";
                  var tooltip="";
  
                  if (full.ActionStatus == "success") {state_icn = "fas fa-check fa-lg text-success";ResponseMessage="2-4-txt";} // done /erledigt
                  if (full.ActionStatus == "failure") {state_icn = "fas fa-times fa-lg text-danger";ResponseMessage="2-5-txt";} // error / failure
                  if (data == "2") {state_icn = "fa fa-truck fa-lg";ResponseMessage="2-1-txt";} // awaiting delivery
                  if (data == "-93") {state_icn = "fas fa-arrow-circle-up fa-lg";ResponseMessage="2-2-txt";} // -93 -- awaiting overwrite
                  if (data == "-96") {state_icn = "fas fa-arrow-circle-down fa-lg";ResponseMessage="2-3-txt";} // -96 -- awaiting unenroll
                  if (data == "-99") {state_icn = "fas fa-arrow-circle-up fa-lg";ResponseMessage="2-4-txt";} // -99 -- awaiting enroll
                  
                  ResponseMessage = $("#" + ResponseMessage).text();
                  return "<span data-toggle='tooltip' title='{$DE-Inside.AppleDEP.tbl_serials.sub_tbl_history.column.InternalStatus.ToolTipp.protocoltype$}:" + full.ProtocolType + "<br>{$DE-Inside.AppleDEP.tbl_serials.sub_tbl_history.column.InternalStatus.ToolTipp.Status$}:" + ResponseMessage + "'><i  class='" + state_icn + "'></span>";
                  }          
              },
              {className: "CustomerDepId", name: "CustomerDepId", data: "CustomerDepId", title: "{$DE-Inside.AppleDEP.tbl_serials.sub_tbl_history.column.title.CustomerDepId$}", visible: true},
              {className: "EnrollmentID", name: "EnrollmentID", data: "EnrollmentID", title: "{$DE-Inside.AppleDEP.tbl_serials.sub_tbl_history.column.title.EnrollmentID$}", visible: true},
              {className: "EndCustDepId", name: "EndCustDepId", data: "EndCustDepId", title: "{$DE-Inside.AppleDEP.tbl_serials.sub_tbl_history.column.title.EndCustDepId$}", visible: true},
              {
                className: "EndCustName", 
                name: "EndCustName", 
                data: "EndCustName", 
                title: "{$DE-Inside.AppleDEP.tbl_serials.sub_tbl_history.column.title.EndCustName$}", 
                visible: true,
                render: function (data, type, full) {
                  if (data!=="") {
                    return "<span data-toggle='tooltip' title='"+full.EndCustEmail + "'>" + data + "</span>";
                  }
                  else {
                    return "";
                  } 
                },
              },
              {className: "Comment", name: "Comment", data: "Comment", title: "{$DE-Inside.AppleDEP.tbl_serials.sub_tbl_history.column.title.Comment$}", visible: true},
              {name: "AppleTransactionID", className:"AppleTransactionID dt-center", data: "AppleTransactionID", title: "{$DE-Inside.AppleDEP.tbl_serials.sub_tbl_history.column.title.AppleTransactionID$}", visible: true},
              {name: "ItemCreatedWhen", className:"ItemCreatedWhen dt-center", data: "ItemCreatedWhen", title: "{$DE-Inside.AppleDEP.tbl_serials.sub_tbl_history.column.title.ItemCreatedWhen$}", visible: true},
              {
                className: "ResponseCheckCode dt-center", name: "ResponseCheckCode", data: "ResponseCheckCode", title: "{$DE-Inside.AppleDEP.tbl_serials.sub_tbl_history.column.title.ResponseCheckCode$}", visible: true, 
                render: function ( data, type, full ) {
                  return "<span data-toggle='tooltip' title='"+full.ResponseCheckCode+"'>{$DE-Inside.AppleDEP.tbl_serials.sub_tbl_history.column.ResponseCheckCode.Details$}</span>";
                }
              },
              {
                className: "ResponseCheckMessage dt-center", name: "ResponseCheckMessage", data: "ResponseCheckMessage", title: "{$DE-Inside.AppleDEP.tbl_serials.sub_tbl_history.column.title.ResponseCheckMessage$}", visible: true, 
                render: function ( data, type, full ) {
                  return "<span data-toggle='tooltip' title='"+full.ResponseCheckMessage+"'>{$DE-Inside.AppleDEP.tbl_serials.sub_tbl_history.column.ResponseCheckMessage.Details$}</span>";
                }
              },
            ],
            order: [[0, "desc"]],
            processing: true,
            serverSide: true,
            drawCallback: function( settings ) {
            },
            fnRowCallback: function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) 
            {
            }
          });
          
          $(tbl_serials.cell({ row: row[0][0] , column: 5 }).node()).find("i").removeClass('fa-expand');
          $(tbl_serials.cell({ row: row[0][0] , column: 5 }).node()).find("i").addClass('fa-compress');  
  
          //event: handle click on sub table line to open dialog with apple dep json data
          $("#DT_Serials_Sub"+row[0][0]).off('click').on('click', 'td', function (e) {          
            var data = row.data();   
            var tr_inner = $(this).closest('tr');
            var row_inner = osubtable.row( tr_inner );
            var data_inner = row_inner.data(); 
            var AppleTransactionID = data_inner.AppleTransactionID;
            var SerialNbr = data.SerialNbr;
            var CustomerNbr =  data.CustomerNbr;    
            var CustomerDepId =  data_inner.CustomerDepId;    
            var OrderNbr =  data_inner.EnrollmentID; 
            e.preventDefault();  
            var html="";
            if (bshow || !bshow)  
            {
              html = $.get('/content-items/ajax/dashboard/dep/dlg_json_show.aspx?ItemID=' + data_inner.Id, function(data)
              {
                  var outerhtml = $(data).find("#modal").prop("outerHTML");
                  $("#modal").remove();
                  var newhtml = $(outerhtml).modal('show');
                  $(newhtml).attr("companycd", CustomerNbr);
                  $(newhtml).attr("customerDepId", CustomerDepId);
                  $(newhtml).attr("orderNbr", OrderNbr );
              });
            }
            else 
            {
              html = "<table style='width:100%'>" +
                        "<tr><td>{$DE-Inside.AppleDEP.tbl_serials.sub_tbl_history.dialog.serialnbr$}:</td><td>" + SerialNbr + "</td></tr>" +
                        "<tr><td>{$DE-Inside.AppleDEP.tbl_serials.sub_tbl_history.dialog.appletransactionid$}:</td><td>" + AppleTransactionID + "</td></tr>" +
                        "</table>";
  
              BootstrapDialog.show({
                title: '{$DE-Inside.AppleDEP.tbl_serials.sub_tbl_history.dialog.title$}',
                message: html
              });                              
            }
            return false;        
          });
      } 

    //}
    });    
    //renderer function: temporarily adds sub table with history data
    function formatDetails (d, i) {
      if (d) {
          var retval='<table id="DT_Serials_Sub'+i+'" class="display datatable xresponsive" style="width:100%"></table>';
            
          return retval;
      }
      return "";
  }
});  
