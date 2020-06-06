    //flag for user rights
    //var myBool = '{% CurrentUser.IsInRole("ntauthority-authenticatedusers", "CMSGlobalAdministrator") #%}';
    //var bshow = (myBool == 'False');
    
    $(document).ready(function(e) 
    {
      
        // RMA datatable
        var tbl_rma=$("#DT_RMA").DataTable({
          dom: '<<".d-flex justify-content-between align-items-center mb-3"<"#search_left.d-flex"><"#datetime.d-flex">><t><"d-flex justify-content-between"ilp>>',
          ajax: "/content-items/ajax/dashboard/erma/overview",
          pageLength: 25,
          lengthMenu: [25, 50, 75, 100, 150, 200, 250],
          language: {
            //sUrl: "~/1IM/dataTables-1.10.12/lang/{$ DataTable.Language $}.js",
            paginate: {
              first: "<i class='fas fa-chevron-left'></i><i class='fas fa-chevron-left'></i>",
              last: "<i class='fas fa-chevron-right'></i><i class='fas fa-chevron-right'></i>",
              next: "<i class='fas fa-chevron-right'></i>",
              previous: "<i class='fas fa-chevron-left'></i>"
            }
          }, 
          paging: true,
          pagingType: "full_numbers",
          order: [[3, "desc"]],
          //scrollX: false,
          //scrollCollapse : true,
          responsive: true,
          autoWidth: true,
          deferRender: true,
          columns: [
            {
              class: "details-control",
              orderable: false,
              data: null,
              defaultContent: "",
              render: function () {
                  return '<i aria-hidden="true"></i>';
              },
              width: "15px"
            },
            {
              class: "rmaNumber select-filter",
              data: "rmaNumber",
              title: "{$RMA.RMA-Number$}",
              name: "rmaNumber",
              width: "160px",
              searchable: true
              //visible: bshow //invisible if insufficient rights
            },
            {
              class: "reference select-filter",
              data: "reference",
              name: "reference",
              title: "{$RMA.Reference-Number$}",
              //orderable: false,
              width: "120px",
              searchable: true
            },
            {
              className: "entryDate",
              data: "entryDate",
              name: "entryDate",
              title: "{$RMA.Date$}",
              type: "date",
              width: "100px"
            },
            {
              className: "Price text-right",
              data: "Price",
              name: "Price",
              title: "{$RMA.Price$}",
              width: "100px",
              type: "num-fmt",
              render: function (data, type, row, meta) {
                 
                    var abbr = row.CurrencyCd;

                    var symbol = "";              
                    if(abbr == "USD"){
                       symbol = "$&thinsp;";
          
                    } else if(abbr == "GBP"){
                       symbol = "&pound;&thinsp;";
          
                    } else if(abbr == "EUR"){
                       symbol = "&euro;&thinsp;";
                    }
          
                    var num = $.fn.dataTable.render.number(',', '.', 2, symbol).display(data);              
                    return num;         
                 }
              
            },
            {
              className: "returnReason",
              data: "returnReason",
              name: "returnReason",
              title: "{$RMA.Return-Reason$}"
            },
            {
              className: "rmaStatus",
              data: "rmaStatus",
              name: "rmaStatus",
              title: "{$RMA.Status$}",
              width: "200px"
            },
            {
              data: "CurrencyCd",
              name: "CurrencyCd",
              visible: false
            }
          ]
        }); // end RMA_tbl
      
      
      
        tbl_rma.on( 'init', function () {
            $('#search_left')
              .html('<div class="input-group"><select id="search" class="form-control custom bg-light">'+
                    '<option value="rma">{$RMA.RMA-Number$}</option>'+
                    '<option value="ref">{$RMA.Reference-Number$}</option>'+
                    '</select>'+
                    '<input type="text" id="rma_search" placeholder="{$RMA.SearchBy$} {$RMA.RMA-Number$}" class="form-control mr-2">'+
                    '<input type="text" id="ref_search" placeholder="{$RMA.SearchBy$} {$RMA.Reference-Number$}" class="form-control mr-2 d-none">'+
                    '</div>');
            $('#datetime')
              .html('<div id="date_filter" class="d-flex">'+
                      '<input class="date_range_filter date form-control mr-2" type="text" id="datepicker_from" placeholder="{$RMA.From$}:" />'+
                      '<input class="date_range_filter date form-control" type="text" id="datepicker_to" placeholder="{$RMA.Until$}:" />'+
                    '</div>');
            $('#search_left').on('change', function(){
                if($('#search').val() == 'rma') {
                    $('#rma_search').removeClass('d-none'); 
                    $('#ref_search').addClass('d-none'); 
                    
                } 
                else {
                    $('#rma_search').addClass('d-none'); 
                    $('#ref_search').removeClass('d-none');
                    
                } 
            });

            $("#datepicker_from").datetimepicker({
                icons: {
                    time: "far fa-clock",
                    date: "fas fa-calendar-alt",
                    up: "fas fa-arrow-up",
                    down: "fas fa-arrow-down"
                },
                format:"DD.MM.YYYY",
                locale: "{%LocalizationContext.CurrentCulture.CultureCode.Split("-")[1]#%}"
            });
            $("#datepicker_to").datetimepicker({
                icons: {
                    time: "far fa-clock",
                    date: "fas fa-calendar-alt",
                    up: "fas fa-arrow-up",
                    down: "fas fa-arrow-down"
                },
                format:"DD.MM.YYYY",
                locale: "{%LocalizationContext.CurrentCulture.CultureCode.Split("-")[1]#%}",
                useCurrent: false
            });

            $("#datepicker_from").on("dp.change", function (e) {
                $('#datepicker_to').data("DateTimePicker").minDate(e.date);
                });
            $("#datepicker_to").on("dp.change", function (e) {
                $('#datepicker_from').data("DateTimePicker").maxDate(e.date);
            });
          
              $.fn.dataTableExt.afnFiltering.push(
                function( oSettings, aData, iDataIndex ) {
                    var iFini = document.getElementById('datepicker_from').value;
                    var iFfin = document.getElementById('datepicker_to').value;
                    var iStartDateCol = 3;
                    var iEndDateCol = 3;
             
                    iFini=iFini.substring(6,10) + iFini.substring(3,5)+ iFini.substring(0,2);
                    iFfin=iFfin.substring(6,10) + iFfin.substring(3,5)+ iFfin.substring(0,2);
             
                    var datofini=aData[iStartDateCol].substring(6,10) + aData[iStartDateCol].substring(3,5)+ aData[iStartDateCol].substring(0,2);
                    var datoffin=aData[iEndDateCol].substring(6,10) + aData[iEndDateCol].substring(3,5)+ aData[iEndDateCol].substring(0,2);
             
                    if ( iFini === "" && iFfin === "" )
                    {
                        return true;
                    }
                    else if ( iFini <= datofini && iFfin === "")
                    {
                        return true;
                    }
                    else if ( iFfin >= datoffin && iFini === "")
                    {
                        return true;
                    }
                    else if (iFini <= datofini && iFfin >= datoffin)
                    {
                        return true;
                    }
                    return false;
                }
            );
          $('.date').on("keyup", function() {
              $("#DT_RMA").DataTable().draw();
          } );
          $('.date').on("dp.change", function() {
             $("#DT_RMA").DataTable().order([[3,'asc']]).draw();
          } );
    
        }); // End init

        
          
      
       $(document).on('keyup', '#rma_search', function() {
          $('#DT_RMA').DataTable()
              .column(1)
              .search( $('#rma_search').val() )
              .draw();
        });
        $(document).on('keyup', '#ref_search', function() {
          $('#DT_RMA').DataTable()
              .column(2)
              .search( $('#ref_search').val() )
              .draw();
        });
      
        
      
      // Add event listener for opening and closing details
        $('#DT_RMA tbody').on('click', 'tr', function () {
            var tr = $(this).closest('tr');
            var tdi = tr.find("i.fas");
            var row = tbl_rma.row(tr);
    
            if (row.child.isShown()) {
                // This row is already open - close it
                row.child.hide();
                tr.removeClass('shown');
                tdi.first().removeClass('fa-minus-square text-danger');
                tdi.first().addClass('fa-plus-square text-success');
            }
            else {
                // Open this row
                row.child(format(row.data()),'p-0').show();
                tr.addClass('shown');
                tdi.first().removeClass('fa-plus-square text-success');
                tdi.first().addClass('fa-minus-square text-danger');
            }
        });
    
        tbl_rma.on("user-select", function (e, dt, type, cell, originalEvent) {
            if ($(cell.node()).hasClass("details-control")) {
                e.preventDefault();
            }
        });
      
      
    }); // End on document ready
    
    
    function format(data){
        
        // `data` is the original data object for the row
      var RMA_details = '<div class="alert-success p-3 mb-3">{$RMA.YourRequest$} <strong class="caps">'+data.rmaNumber+'</strong>, {$RMA.SubmittedOn$} '+data.entryDate+', {$RMA.IsIn$} <strong class="caps">'+data.rmaStatus+'</strong> {$RMA.Status$}</div>'+
      '<div class="alert-info p-3">'+
      '{$RMA.ReturnInstructions$}'+
      '<address>Ingram Micro Returns (Ref. # '+data.reference+')<br/>88 Foster Crescent, Door #99<br/>Mississauga ON L5R4A2</address>'+
      '</div>'+
      '<table class="table">'+
          '<thead>'+
              '<tr>'+
                  '<th>{$RMA.ItemDescription$}</th>'+
                  '<th>{$RMA.YourProductReturnDetails$}</th>'+
                  '<th class="text-center" style="width: 100px;">{$RMA.ReturnQty$}</th>'+
                  '<th class="text-center" style="width: 130px;">{$RMA.Price$}</th>'+
              '</tr>'+
          '</thead>'+
          '<tbody>'+
              '<tr>'+
                  '<td><h6>'+data.rmaDescription+'</h6><p><abbr>VPN</abbr>: <strong>'+data.MfrPartNbr+'</strong> | <abbr>SKU</abbr>: <strong>'+data.SKU+'</strong> | <abbr>EAN</abbr>: <strong>'+data.EanCode+'</strong><br>{$RMA.InvoiceNumber$}r: <strong>'+data.InvoiceNbr+'</strong></td>'+
                  '<td>Comment</td>'+
                  '<td class="text-center"><strong>'+data.Quantity+'</strong></td>'+
                  '<td class="text-center"><strong>'+data.Price+'</strong></td>'+
              '</tr>'+
              '<tr>'+
                '<td colspan="2"></td>'+
                '<td class="text-center alert-info initialism">{$RMA.Total$}:</td>'+
                '<td class="text-center alert-info">'+data.Total+'</td>'+
              '</tr>'+
          '</tbody>'+
      '</table>';  
      return RMA_details;
    }


$(function() {
  

});

// Date range filter
minDateFilter = "";
maxDateFilter = "";

$.fn.dataTableExt.afnFiltering.push(
  function(oSettings, aData, iDataIndex) {
    if (typeof aData._date == 'undefined') {
      aData._date = new Date(aData[0]).getTime();
    }

    if (minDateFilter && !isNaN(minDateFilter)) {
      if (aData._date < minDateFilter) {
        return false;
      }
    }

    if (maxDateFilter && !isNaN(maxDateFilter)) {
      if (aData._date > maxDateFilter) {
        return false;
      }
    }

    return true;
  }
);
