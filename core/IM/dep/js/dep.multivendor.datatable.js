  var tbl_basket_apple;
  var tbl_basket_knox;
  var vbasketdata;
  //flag for user rights
  var myBool = '{% CurrentUser.IsInRole("ntauthority-authenticatedusers", "CMSGlobalAdministrator") #%}';
  var bshow = (myBool == 'True');
  var toolbar = "<div class='btn-toolbar' role='toolbar'>" + 
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
      //basket datatable
      tbl_basket_apple=$("#DT_Basket_Apple").DataTable({
        dom: '<"theader-wrapper"lf<btn_resetsearch>r>tip',
        data : vbasketdata,
        rowid : 'Id',
        bStateSave: true,
        aLengthMenu: [25, 75, 100, 150, 250],
        pageLength: 25,  
        language: {
          url: "/1IM/dataTables-1.10.12/lang/{$ DataTable.Language $}.js",
        },        
        initComplete: function(settings, json) {
          $('div.dataTables_length select').addClass("form-control selectBo");
          $('div.dataTables_filter input').addClass('form-control searchBo');
        },     
        order: [[2, "asc"]],
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
            title: "<div style='text-align:center;width:20px' class='no-sort custom'><input type='checkbox' id='select_all_dt_basket_apple' name='select_all_dt_basket_apple' value='1'><label for='select_all_dt_basket_apple'>"
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
          $("#basket-count-apple").html(getNumFilteredRows("#DT_Basket_Apple")); //update badge with basket count
          if (getNumFilteredRows("#DT_Basket_Apple")>0) {
            $("#basket-count-apple").css("background-color","#FF0000");
          } 
          else {
            $("#basket-count-apple").css("background-color","#73879C");
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

      // basket for Samsung knox
      tbl_basket_knox=$("#DT_Basket_Knox").DataTable({
        dom: '<"theader-wrapper"lf<btn_resetsearch>r>tip',
        data : vbasketdata,
        rowid : 'Id',
        bStateSave: true,
        aLengthMenu: [25, 75, 100, 150, 250],
        pageLength: 25,  
        language: {
          url: "/1IM/dataTables-1.10.12/lang/{$ DataTable.Language $}.js",
        },        
        initComplete: function(settings, json) {
          $('div.dataTables_length select').addClass("form-control selectBo");
          $('div.dataTables_filter input').addClass('form-control searchBo');
        },     
        order: [[2, "asc"]],
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
            title: "<div style='text-align:center;width:20px' class='no-sort custom'><input type='checkbox' id='select_all_dt_basket_knox' name='select_all_dt_basket_knox' value='1'><label for='select_all_dt_basket_knox'>"
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
          $("#basket-count-knox").html(getNumFilteredRows("#DT_Basket_Knox")); //update badge with basket count
          if (getNumFilteredRows("#DT_Basket_Knox")>0) {
            $("#basket-count-knox").css("background-color","#FF0000");
          } 
          else {
            $("#basket-count-knox").css("background-color","#73879C");
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
        dom: '<"theader-wrapper"lf<btn_resetsearch>r>tip',
        aLengthMenu: [25, 75, 100, 150, 250],
        pageLength: 25,  
        ajax: {
          type: "POST",
          url: "/content-items/ajax/dashboard/dep/get_masterserials",
          data:  function(d) { 
            customer_id = $('#CUSTOMER_ID').val();
            if (typeof $("#CUSTOMER_ID").val() === "undefined") {
              d.customer_id = '{% CurrentUser.imCompanyCd #%}{% CurrentUser.imBranchNbr #%}{% CurrentUser.imCustomerNbr #%}';
            }
            else {
              d.customer_id = customer_id;
            }
            d.device_id = sql_device_id; 
            d.vendmastervalue = vendmastervalue;
            d.vendmastertext = vendmastertext;
            d.state_fltr = state_fltr;
            d.bshow = bshow;
            if ((d.customer_id == '') && (d.device_id == '' )) {
              d.device_id = "EMPTY";
            }
            else {
              if (d.customer_id == '')  d.customer_id = "EMPTY";
              if (d.device_id == '')  d.device_id = "EMPTY";
            }
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
            class: "dt-center",
            data: null,
            render: function (data, type, full, meta) {
              return "<div class='text-center custom' id='add2basket'><input type='checkbox' class='Id' id='id[" + full.Id +"]' name='id[" + full.Id +"]' value='" + data["SerialNbr"] +"'><label for='id[" + full.Id +"]'>";
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
          $('div.dataTables_length select').addClass("form-control selectBo");
          $('div.dataTables_filter input').addClass('form-control searchBo');
        },     
        error: function (xhr, error, thrown) {
          $("#preloadInfo").html("<h1>{$ 1IM.Dashboard.TrackTrace.Error $}!</h1><h2>" + $("#errors div[data='" + xhr.responseText + "']").html() + "!</h2><h3>{$ 1IM.Dashboard.TrackTrace.TryAgain $}</h3>");
        },   
        drawCallback: function( settings ) {
        },
        fnRowCallback: function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) 
        {
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
      $('#DT_Serials tbody').off('click').on('click', 'td:not(:first-child)', function (e) {
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
          
            var requesturi =  "/content-items/ajax/dashboard/dep/get_history"; // default Apple
            if (vendmastertext.indexOf(cVendMasterName.Samsung.toLowerCase()) != -1) {
              requesturi =  "/content-items/ajax/dashboard/dep/get_history_knox"; // Knox
            }
            var osubtable=$("#DT_Serials_Sub"+row[0][0]).DataTable(
            {
              "sDom": '<"top">rt<"bottom"><"clear">',
              ajax: {
                type: "POST",
                url: requesturi,
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
      });
  });
    
  function getNumFilteredRows(id){
     var info = $(id).DataTable().page.info();
     return info.recordsDisplay;
  }
