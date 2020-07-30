 
//flag for user rights
  var myBool = '{% CurrentUser.IsInRole("ntauthority-authenticatedusers", "CMSGlobalAdministrator") #%}';
  var bshow = (myBool == 'True');
  var toolbar = 
  "<div class='btn-toolbar' role='toolbar'>" + 
  "<div class='btn-group' role='group'>" + 
  "</div>";  
//write datatable errors to console
$.fn.dataTable.ext.errMode = function ( settings, helpPage, message ) { 
  console.log(message);
};
$.fn.dataTable.Api.register( 'processing()', function ( show ) {
    return this.iterator( 'table', function ( ctx ) {
        ctx.oApi._fnProcessingDisplay( ctx, show );
    } );
} );
$(document).on("page.dt", function (e, settings) {
  var TblId = e.target.id;
  if (TblId == "DT_Serials") {/*
    $.blockUI({
      message: $("#preloadInfo"),
      css : {
        background: "none",
        border: "none",
        color: "white"
      }
    });*/  
  };
});  
$(document).on("search.dt", function (e, settings) {
  var TblId = e.target.id;
  if (TblId == "DT_Serials") {/*
    $.blockUI({
      message: $("#preloadInfo"),
      css : {
        background: "none",
        border: "none",
        color: "white"
      }
    }); */ 
  };
});  
$(document).on("preInit.dt", function (e, settings) {
  var $sb = $(".dataTables_filter input[type='search'][aria-controls='DT_Serials']");
  $sb.off();
  $sb.on("keypress", function (evtObj) {
    if (evtObj.keyCode == 13) {
      $('#DT_Serials').DataTable().search($sb.val()).draw();
      evtObj.preventDefault();
    }
  });
});  
              
$(document).ready(function(e) 
{     
    $("#CookieConsentLayer").find($('input[type=submit]')).each(function(key, val){
        $(val).attr("formnovalidate","true");
    });
    //basket datatable
    var tbl_basket=$("#DT_Basket").DataTable({
      dom: '<"theader-wrapper"lf<btn_resetsearch>r>tip',      
      // "sDom": '<"top"fl>rt<"bottom"ip><"clear">',
      data : vbasketdata,
      bStateSave: true,
      aLengthMenu: [25, 75, 100, 150, 250],
      pageLength: 25,  
      // language: lang_mod,
      language: {
        url: "/1IM/dataTables-1.10.12/lang/{$ DataTable.Language $}.js",
      },        
      initComplete: function(settings, json) {
        // $(".toolbar").css({"padding-left": "10px"});
        // $("div.toolbar").html(toolbar); 
        $('div.dataTables_length select').addClass("form-control selectBo");
        $('div.dataTables_filter input').addClass('form-control searchBo');
        /*
        $('div.dataTables_filter input').after("<button type='button' id='btn_resetsearch' class='reset-button'><i class='fa fa-times' aria-hidden='true'></i></button>");
        $('a.previous').html("<i class=\"fa fa-chevron-left\" aria-hidden=\"true\"></i>");
        $('a.next').html("<i class=\"fa fa-chevron-right\" aria-hidden=\"true\"></i>");
        $('.paginate_button.current').attr("style", "color:white!important");           
        */
      },     
      order: [[2, "asc"]],
      //scrollX: false,
      //scrollCollapse : true,
      responsive: true,
      autoWidth: true,
      columns: [
        {
          data: "Id",
          title: "{$DE-Inside.AppleDEP.tbl_basket.column.title.Id$}",
          name: "Id",
          visible: false,
        },
        {
          class: "dt-center",
          render: function (data, type, full, meta) {
            return "<div style='text-align:center;width:20px' class='custom'><input type='checkbox' class='Id' id='id[" + full.SerialNbr +"]' name='id[" + full.SerialNbr +"]' value='" + full.SerialNbr +"'><label for='id[" + full.SerialNbr +"]'>";
          },
          orderable: false,
          title: "<div style='text-align:center;width:20px' class='no-sort custom'><input type='checkbox' id='select_all_dt_basket' name='select_all_dt_basket' value='1' id='select_all_dt_basket'><label for='select_all_dt_basket'>"
        },
        {
          class: "CustomerNbr",
          data: "CustomerNbr",
          name: "CustomerNbr",
          title: "{$DE-Inside.AppleDEP.tbl_basket.column.title.CustomerNbr$}",
          visible: bshow //invisible if insufficient rights
        },
        {
          class: "Custname",
          data: "Custname",
          name: "Custname",
          title: "{$DE-Inside.AppleDEP.tbl_basket.column.title.Custname$}",
          visible: bshow //invisible if insufficient rights
        },
        {
          data: "ShipDate",
          name: "MixedData",
          render: function (data, type, full, meta) {
            var retStr="";
            if (full.OrderNbr!="") retStr+=full.OrderNbr;
            if (full.OrderDate!="") retStr+=" / "+full.OrderDate;
            retStr+="<br>";
            if (full.InvoiceNbr!="") retStr+= full.InvoiceNbr;
            if (full.ShipDate!="") retStr+=" / "+full.ShipDate;
            return retStr;
          },
          width: "200px",
          title: "{$DE-Inside.AppleDEP.tbl_basket.column.title.MixedData$}",
          orderable: true,
        },
        {
          className: "SerialNbr",
          data: "SerialNbr",
          name: "SerialNbr",
          title: "{$DE-Inside.AppleDEP.tbl_basket.column.title.SerialNbr$}",
          render: function ( data, type, full ) {
            return "<span data-toggle='tooltip' title='{$DE-Inside.AppleDEP.tbl_basket.column.SerialNbr.ToolTipp.SKU$}: " + full.SKU + " {$DE-Inside.AppleDEP.tbl_basket.column.SerialNbr.ToolTipp.MfrPartNbr$}: " + full.MfrPartNbr + "<br>{$DE-Inside.AppleDEP.tbl_basket.column.SerialNbr.ToolTipp.Description$}: " + full.Description + "'>" + data + "</span>";
          },
          orderable: false, 
        },
        {
          className: "InternalStatus dt-center",
          data: "InternalStatus",
          name: "InternalStatus",
          title: "{$DE-Inside.AppleDEP.tbl_basket.column.title.InternalStatus$}",
          render: function (data, type, full ) {
            var state_icn = "fas fa-circle";
            var ResponseMessage = "";
            var tooltip="";
            
            if (data!=="") {
            
              if (full.HasHistory=="false") {tooltip="{$DE-Inside.AppleDEP.tbl_basket.column.InternalStatus.HasHistoryFalse$}";} else if (full.HasHistory=="true") {tooltip="{$DE-Inside.AppleDEP.tbl_basket.column.InternalStatus.HasHistoryTrue$}";}
              
              if (full.LastActionStatus == "success") {state_icn = "fas fa-check fa-lg text-success";ResponseMessage="2-4-txt";} // done /erledigt
              if (full.LastActionStatus == "failure") {state_icn = "fas fa-times fa-lg text-danger";ResponseMessage="2-5-txt";} // error / failure
              if (data == "2") {state_icn = "fas fa-truck fa-lg";ResponseMessage="2-1-txt";} // awaiting delivery
              if (data == "-93") {state_icn = "fas fa-arrow-circle-up fa-lg";ResponseMessage="2-2-txt";} // -93 -- awaiting overwrite
              if (data == "-96") {state_icn = "fas fa-arrow-circle-down fa-lg";ResponseMessage="2-3-txt";} // -96 -- awaiting unenroll
              if (data == "-99") {state_icn = "faa fa-arrow-circle-up fa-lg";ResponseMessage="2-4-txt";} // -99 -- awaiting enroll
              
              ResponseMessage = $("#" + ResponseMessage).text();
              return "<span data-toggle='tooltip' title='{$DE-Inside.AppleDEP.tbl_basket.column.InternalStatus.ToolTipp.History$}:" + tooltip + "<br>{$DE-Inside.AppleDEP.tbl_basket.column.InternalStatus.ToolTipp.protocoltype$}:"+full.ProtocolType+"<br>{$DE-Inside.AppleDEP.tbl_basket.column.InternalStatus.ToolTipp.Status$}:" + ResponseMessage + "'><i  class='" + state_icn + "'></span>";
            }
            else {
              return "";
            }
           },
           orderable: true,
        },
        {
          className: "AppleStatus dt-center",
          data: "AppleStatus",
          name: "AppleStatus",
          title: "{$DE-Inside.AppleDEP.tbl_basket.column.title.AppleStatus$}",
          render: function (data, type, full ) {
            if (data!=="") {
              var tooltip="";
              var state_icn="";
              if (data == "enrolled") {state_icn = "fas fa-circle text-success";tooltip="1-1-txt";}
              if (data == "unenrolled") {state_icn = "fas fa-circle text-danger";tooltip="1-2-txt";}
              return "<span data-toggle='tooltip' title='"+$("#" + tooltip).text()+"'><i class='" + state_icn + "'></span>";
            }
            else {
              return "";
            }
          },
          orderable: true,
        },
        {
          className: "EndCustName",
          data: "EndCustName",
          name: "EndCustName",
          title: "{$DE-Inside.AppleDEP.tbl_basket.column.title.EndCustName$}",
          orderable: false,
        },
        {
          className: "CustPo",
          data: "CustPo",
          name: "CustPo",
          title: "{$DE-Inside.AppleDEP.tbl_basket.column.title.CustPo$}",
          orderable: false,
        },
        {
          className: "Comment",
          data: "Comment",
          name: "Comment",
          title: "{$DE-Inside.AppleDEP.tbl_basket.column.title.Comment$}",
          orderable: false,
        },
        {
          className: "CustomerDepId",
          data: "CustomerDepId",
          name: "CustomerDepId",
          visible: false,
        },
        {
          className: "EndCustDepId",
          data: "EndCustDepId",
          name: "EndCustDepId",
          visible: false,
        }
      ],
      drawCallback: function( settings ) {
        $("#basket-count").html(getNumFilteredRows("#DT_Basket")); //update badge with basket count
        if (getNumFilteredRows("#DT_Basket")>0) {
          $("#basket-count").css("background-color","#FF0000");
        } 
        else {
          $("#basket-count").css("background-color","#73879C");
        }
      },
      fnRowCallback: function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) 
      {
        var data_info="{\"ItemID\":\""+ aData.Id + "\",\"serial_nbr\":\"" + aData.SerialNbr + "\"}";
        var id="line_" + aData.Id ;
        var rowId =  aData.Id;
        $(nRow).attr("data-info",data_info);
        $(nRow).attr("id",id);
        $(nRow).attr("rowId",rowId);      
      
        if (aData.InternalStatus == "1") {
          $('td', nRow).css({"background-color":"#C0E6A1"});
        }
        else {
          // Ingram Micro defined error / colored line
          if (aData.ResponseBulkMessage == "SHIPMENT MISSING") {
            $('td', nRow).css({"background-color":"#fcf8e3"});
          }
        }
        return nRow;
      }
    });
    var tbl_serials=$("#DT_Serials").DataTable(
    {
      // dom: '<"theader-wrapper"lf<btn_resetsearch><"toolbar">r>tip',
      dom: '<"theader-wrapper"lf<btn_resetsearch>r>tip',
      aLengthMenu: [25, 75, 100, 150, 250],
      pageLength: 25,  
      //sWidth: "100%",
      ajax: {
        type: "POST",
        url: "/content-items/ajax/dashboard/dep/get_serials_manually",
        data:  function(d) { 
          customer_id = $('#CUSTOMER_ID').val();
          if (typeof $("#CUSTOMER_ID").val() === "undefined") {
            d.customer_id = '{% CurrentUser.imCompanyCd #%}{% CurrentUser.imBranchNbr #%}{% CurrentUser.imCustomerNbr #%}';
          }
          else {
            d.customer_id = customer_id;
          }
          d.device_id = sql_device_id; 
          d.state_fltr = state_fltr;
          d.bshow = bshow;
          if ((d.customer_id == '') && (d.device_id == '' )) {
            d.device_id = "EMPTY";
          }
          else {
            if (d.customer_id == '')  d.customer_id = "EMPTY";
            if (d.device_id == '')  d.device_id = "EMPTY";
          }
        },
        dataSrc: function ( json ) {
            if (json.data.length!=0 && json.NotFound.length!=0 && json.NotFound[0]!="EMPTY") {
              BootstrapDialog.show({
                  title: '{$DE-Inside.AppleDEP.MainTab.Tab2.message.dialog.confirm.title.serialnotfound$}',
                  message: "{$DE-Inside.AppleDEP.MainTab.Tab2.message.dialog.confirm.message.serialnotfound$}:<br>"+json.NotFound.join("<br>")
              }); 
            }
            return json.data;
        } 
      },
      //scrollCollapse : true,
      responsive: true,   
      autoWidth: true,
      //scrollX: true,
      serverSide: true,
      {% if(CurrentUser.IsInRole("ntauthority-authenticatedusers", "CMSGlobalAdministrator")) { %}
      deferLoading: 0,
      order: [[4, "desc"]],
      {% } #%}
      {% if(!CurrentUser.IsInRole("ntauthority-authenticatedusers", "CMSGlobalAdministrator")) { %}
      order: [[4, "desc"]],
      {% } #%}
      // language: lang_mod,
      language: {
        url: "/1IM/dataTables-1.10.12/lang/{$ DataTable.Language $}.js",
      },        
      // processing: true,
      columns: [
        {
          data: "Id",
          title: "{$DE-Inside.AppleDEP.tbl_serials.column.title.Id$}",
          name: "Id",
          orderable: false,
          visible: false,
        },
        {
          class: "dt-center dt-custom",
          data: null,
          render: function (data, type, full, meta) {
            if (full.IsManually==1) { 
              return "<div class='text-center custom' style='margin-left:5px'><input type='checkbox' class='Id' id='id[" + full.Id +"]' name='id[" + full.Id +"]' value='" + data["SerialNbr"] +"'><label for='id[" + full.Id +"]' style='padding-right:15px'></label><i class='fas fa-user-edit'></i></div>"; 
            } 
            else {
              return "<div class='text-center custom'><input type='checkbox' class='Id' id='id[" + full.Id +"]' name='id[" + full.Id +"]' value='" + data["SerialNbr"] +"'><label for='id[" + full.Id +"]'></div>";
            }
          },
          orderable: false,
          title: "<div class='text-center no-sort custom'><input type='checkbox' id='select_all_dt_serials' name='select_all_dt_serials' value='1' id='select_all_dt_serials'><label for='select_all_dt_serials'>"
        },
        {
          class: "CustomerNbr",
          data: "CustomerNbr",
          name: "CustomerNbr",
          title: "{$DE-Inside.AppleDEP.tbl_serials.column.title.CustomerNbr$}",
          visible: bshow //invisible if insufficient rights
        },
        {
          class: "Custname",
          data: "Custname",
          name: "Custname",
          title: "{$DE-Inside.AppleDEP.tbl_serials.column.title.Custname$}",
          visible: bshow //invisible if insufficient rights
        },
        {
          data: "ShipDate",
          name: "MixedData",
          render: function (data, type, full, meta) {
            var retStr="";
            if (full.OrderNbr!="") retStr+=full.OrderNbr;
            if (full.OrderDate!="") retStr+=" / "+full.OrderDate;
            retStr+="<br>";
            if (full.InvoiceNbr!="") retStr+= full.InvoiceNbr;
            if (full.ShipDate!="") retStr+=" / "+full.ShipDate;
            return retStr;
          },
          width: "200px",
          title: "{$DE-Inside.AppleDEP.tbl_serials.column.title.MixedData$}",
          orderable: true,
        },
        {
          className: "SerialNbr",
          data: "SerialNbr",
          name: "SerialNbr",
          title: "{$DE-Inside.AppleDEP.tbl_serials.column.title.SerialNbr$}",
          render: function ( data, type, full ) {
            return "<span data-toggle='tooltip' title='{$DE-Inside.AppleDEP.tbl_serials.column.SerialNbr.ToolTipp.SKU$}: " + full.SKU + " {$DE-Inside.AppleDEP.tbl_serials.column.SerialNbr.ToolTipp.MfrPartNbr$}: " + full.MfrPartNbr + "<br>{$DE-Inside.AppleDEP.tbl_serials.column.SerialNbr.ToolTipp.Description$}: " + full.Description + "'><i class='fa fa-expand' aria-hidden='true' style='display:inline;white-space:nowrap'></i>&nbsp;" + data + "</span>";
          },
          orderable: false,
        },
        {
          className: "InternalStatus dt-center",
          data: "InternalStatus",
          name: "InternalStatus",
          title: "{$DE-Inside.AppleDEP.tbl_serials.column.title.InternalStatus$}",
          render: function (data, type, full ) {
            var state_icn = "fas fa-circle";
            var ResponseMessage = "";
            var tooltip="";
            if (data!=="") {
              if (full.HasHistory=="false") {tooltip="{$DE-Inside.AppleDEP.tbl_serials.column.InternalStatus.HasHistoryFalse$}";} else if (full.HasHistory=="true") {tooltip="{$DE-Inside.AppleDEP.tbl_serials.column.InternalStatus.HasHistoryTrue$}";}
              
              if (full.LastActionStatus == "success") {state_icn = "fas fa-check fa-lg text-success";ResponseMessage="2-4-txt";} // done /erledigt
              if (full.LastActionStatus == "failure") {state_icn = "fas fa-times fa-lg text-danger";ResponseMessage="2-5-txt";} // error / failure
              if (data == "2") {state_icn = "fas fa-truck fa-lg";ResponseMessage="2-1-txt";} // awaiting delivery
              if (data == "-93") {state_icn = "fas fa-arrow-circle-up fa-lg";ResponseMessage="2-2-txt";} // -93 -- awaiting overwrite
              if (data == "-96") {state_icn = "fas fa-arrow-circle-down fa-lg";ResponseMessage="2-3-txt";} // -96 -- awaiting unenroll
              if (data == "-99") {state_icn = "fas fa-arrow-circle-up fa-lg";ResponseMessage="2-4-txt";} // -99 -- awaiting enroll
              
              ResponseMessage = $("#" + ResponseMessage).text();
              return "<span data-toggle='tooltip' title='{$DE-Inside.AppleDEP.tbl_serials.column.InternalStatus.ToolTipp.History$}:" + tooltip + "<br>{$DE-Inside.AppleDEP.tbl_serials.column.InternalStatus.ToolTipp.protocoltype$}:" + full.ProtocolType + "<br>{$DE-Inside.AppleDEP.tbl_serials.column.InternalStatus.ToolTipp.Status$}:" + ResponseMessage + "'><i  class='" + state_icn + "'></span>";
            }
            else {
              return "";
            }
           },
           orderable: true,
        },
        {
          className: "AppleStatus dt-center",
          data: "AppleStatus",
          name: "AppleStatus",
          title: "{$DE-Inside.AppleDEP.tbl_serials.column.title.AppleStatus$}",
          render: function (data, type, full ) {
            if (data!=="") {
              var tooltip="";
              var state_icn="";
              if (data == "enrolled") {state_icn = "fas fa-circle text-success";tooltip="1-1-txt";}
              if (data == "unenrolled") {state_icn = "fas fa-circle text-danger";tooltip="1-2-txt";}
              return "<span data-toggle='tooltip' title='"+$("#" + tooltip).text()+"'><i class='" + state_icn + "'></span>";
            }
            else {
              return "";
            }
          },
          orderable: true,
        },
        {
          className: "EndCustName",
          data: "EndCustName",
          name: "EndCustName",
          title: "{$DE-Inside.AppleDEP.tbl_serials.column.title.EndCustName$}",
          render: function (data, type, full) {
            if (data!=="") {
              return "<span data-toggle='tooltip' title='"+full.EndCustEmail + "'>" + data + "</span>";
            }
            else {
              return "";
            } 
          },
          orderable: false,
        },
        {
          className: "CustPo",
          data: "CustPo",
          name: "CustPo",
          title: "{$DE-Inside.AppleDEP.tbl_serials.column.title.CustPo$}",
          orderable: false,
        },
        {
          className: "Comment",
          data: "Comment",
          name: "Comment",
          title: "{$DE-Inside.AppleDEP.tbl_serials.column.title.Comment$}",
          orderable: false,
        },
        {
          className: "CustomerDepId",
          data: "CustomerDepId",
          name: "CustomerDepId",
          visible: false,
        },
        {
          className: "EndCustDepId",
          data: "EndCustDepId",
          name: "EndCustDepId",
          visible: false,
        }
      ],
      initComplete: function(settings, json) {
        //$(".toolbar").css({"padding-left": "10px"});
        //$("div.toolbar").html(toolbar); 
        $('div.dataTables_length select').addClass("form-control selectBo");
        $('div.dataTables_filter input').addClass('form-control searchBo');
        /*
        $('div.dataTables_filter input').after("<button type='button' id='btn_resetsearch' class='reset-button'><i class='fa fa-times' aria-hidden='true'></i></button>");
        $('a.previous').html("<i class=\"fa fa-chevron-left\" aria-hidden=\"true\"></i>");
        $('a.next').html("<i class=\"fa fa-chevron-right\" aria-hidden=\"true\"></i>");
        $('.paginate_button.current').attr("style", "color:white!important");           
        */
        //$.unblockUI();
      },     
      error: function (xhr, error, thrown) {
        //error( xhr, error, thrown );
        $("#preloadInfo").html("<h1>{$ 1IM.Dashboard.TrackTrace.Error $}!</h1><h2>" + $("#errors div[data='" + xhr.responseText + "']").html() + "!</h2><h3>{$ 1IM.Dashboard.TrackTrace.TryAgain $}</h3>");
        //$(".blockUI").css("cursor", "not-allowed");        
      },   
      drawCallback: function( settings ) {
        //$.unblockUI();
        //$("#serial-count").html(getNumFilteredRows("#DT_Serials")); //update badge with serials count
      },
      fnRowCallback: function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) 
      {
        
        //$("#DT_Serials_wrapper").css({"width":"1260px"});
        
        var data_info="{\"ItemID\":\""+ aData.Id + "\",\"serial_nbr\":\"" + aData.SerialNbr + "\"}";
        var id="line_" + aData.Id;
        var rowId =  aData.Id;
        $(nRow).attr("data-info",data_info);
        $(nRow).attr("id",id);
        $(nRow).attr("rowId",rowId);      
      
        if (aData.InternalStatus == "1") {
          $('td', nRow).css({"background-color":"#C0E6A1"});
        }
        else {
          // Ingram Micro defined error / colored line
          if (aData.ResponseBulkMessage == "SHIPMENT MISSING") {
            $('td', nRow).css({"background-color":"#fcf8e3"});
          }
        }
      
        return nRow;
      }
    }); 
    //renderer function: temporarily adds sub table with history data
    function formatDetails (d, i) {
        if (d) {
            var retval='<table id="DT_Serials_Sub'+i+'" class="display datatable xresponsive" style="width:100%"></table>';
              
            return retval;
        }
        return "";
    }
  
      //event: click on serials table line shows history sub table
      $('#DT_Serials tbody').off('click').on('click', 'td', function () {
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
                url: "/content-items/ajax/dashboard/dep/get_history_manually",
                data:  function(d) { 
                  d.customer_id = $("#CUSTOMER_ID").val(); 
                  d.Id = row.data().Id; 
                  d.IsManually = row.data().IsManually;
                  if (d.customer_id == '')  d.customer_id = "EMPTY";
                },
              },
              scrollCollapse: true,
              autoWidth: true,
              paging: false,
              responsive: true, 
              //fixedColumns: true,
              //columnDefs: [{ width: 100, targets: 8 }],
              //scrollX: true,
              //scrollX: "100%",
              sWidth: "100%",
              //ScrollXInner: "101%", 
              Processing: true,  
              ordering: false,
//              language: lang_mod,
              language: {
                url: "/1IM/dataTables-1.10.12/lang/{$ DataTable.Language $}.js",
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
                //{name: "EndCustPo", data: "EndCustPo", title: "{$DE-Inside.AppleDEP.tbl_serials.sub_tbl_history.column.title.EndCustPo$}", visible: true},
                {className: "Comment", name: "Comment", data: "Comment", title: "{$DE-Inside.AppleDEP.tbl_serials.sub_tbl_history.column.title.Comment$}", visible: true},
                {name: "AppleTransactionID", className:"AppleTransactionID dt-center", data: "AppleTransactionID", title: "{$DE-Inside.AppleDEP.tbl_serials.sub_tbl_history.column.title.AppleTransactionID$}", visible: true},
                {name: "ItemCreatedWhen", className:"ItemCreatedWhen dt-center", data: "ItemCreatedWhen", title: "{$DE-Inside.AppleDEP.tbl_serials.sub_tbl_history.column.title.ItemCreatedWhen$}", visible: true},
                //{name: "EnrollmentComplete", className:"EnrollmentComplete dt-center", data: "EnrollmentComplete", title: "{$DE-Inside.AppleDEP.tbl_serials.sub_tbl_history.column.title.EnrollmentComplete$}", visible: true},
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
                //tbl_serials.columns.adjust().draw(false);
                //$("#DT_Serials").css({"width":$("#DT_Serials_Sub"+row[0][0]+"_wrapper").css("width")});
                //$("#DT_Serials"+row[0][0]+"_wrapper").css({"width":parseInt($("#DT_Serials_wrapper").css("width").replace( /[^\d.]/g, ''))+"px"});
              },
              fnRowCallback: function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) 
              {
                //$("#DT_Serials_Sub"+row[0][0]+"_wrapper").css({"width":parseInt($("#DT_Serials_wrapper").css("width").replace( /[^\d.]/g, ''))-25+"px"});
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
                html = $.get('/content-items/ajax/dashboard/dep/dlg_json_show_manually.aspx?ItemID=' + data_inner.Id + '&IsManually=' + data.IsManually, function(data)
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
      });
    /*  
    $.ajax({
      dataType: "json",
      url: "/CMSScripts/Custom/jQuery/dataTables.lang/{$DE-Inside.AppleDEP.datatables.language$}.js",
      data: "",
      async: false,
      success: function(data){
        var lang_mod = data;
        lang_mod.sProcessing='<i class="fa fa-circle-o-notch fa-spin fa-2x fa-fw"></i>';
        doDataTable_tbl_serial(lang_mod);
        doDataTable_tbl_basket(lang_mod);
        
      //activate tooltip for serials table
      $('#DT_Serials').on('draw.dt', function () {
         $('[data-toggle="tooltip"]').tooltip({html: true, placement: "right", container: "body"});
      });
      
      //activate tooltip for basket table
      $('#DT_Basket').on('draw.dt', function () {
         $('[data-toggle="tooltip"]').tooltip({html: true, placement: "right", container: "body"});
      });
      }
    });
    */
});
  
function getNumFilteredRows(id){
   var info = $(id).DataTable().page.info();
   return info.recordsDisplay;
}  
/*
function find_idx(search, arr) {
    var result = [];
    for (var i in arr) {
        if (arr[i].indexOf(search)) 
        {
            result.push(i);
        }
    }
    return result;
}  
function find(search, arr) {
    var result = [];
    for (var i in arr) {
        if (arr[i].indexOf(search)) 
        {
            result.push(arr[i]);
        }
    }
    return result;
}*/
 
