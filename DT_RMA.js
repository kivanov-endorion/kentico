//flag for user rights
var myBool = '{% CurrentUser.IsInRole("ntauthority-authenticatedusers", "CMSGlobalAdministrator") #%}';
var bshow = (myBool == 'True');

$(document).ready(function(e) 
{
  
    // RMA datatable
    var tbl_rma=$("#DT_RMA").DataTable({
      dom: '<<".d-flex justify-content-between align-items-center"<"#search.d-flex">f><t><"d-flex justify-content-between"ilp>>',
      ajax: "/content-items/ajax/dashboard/erma/overview",
      pageLength: 25,
      lengthMenu: [25, 50, 75, 100, 150, 200, 250],
      language: {
        url: "~/1IM/dataTables-1.10.12/lang/{$ DataTable.Language $}.js",
      }, 
      order: [[3, "asc"]],
      //scrollX: false,
      //scrollCollapse : true,
      responsive: true,
      autoWidth: true,
      deferRender: true,
      columns: [
        {
          className: "details-control",
          orderable: false,
          data: null,
          defaultContent: "",
          render: function () {
              return '<i class="fas fa-plus-square" aria-hidden="true"></i>';
          },
          width: "15px"
        },
        {
          data: "rmaNumber",
          title: "{$RMA.RMA-Number$}",
          name: "rmaNumber",
          width: "160px",
          searchable: true,
          visible: bshow //invisible if insufficient rights
        },
        {
          class: "reference",
          data: "reference",
          name: "reference",
          title: "{$RMA.Reference-Number$}",
          //orderable: false,
          width: "120px",
          visible: bshow //invisible if insufficient rights
        },
        {
          className: "entryDate",
          data: "entryDate",
          name: "entryDate",
          title: "{$RMA.Date$}",
          type: "date",
          width: "100px",
          visible: bshow //invisible if insufficient rights
        },
        {
          className: "items",
          data: "items",
          name: "items",
          title: "{$RMA.Number-of-items$}",
          type: "num",
          width: "100px",
          visible: bshow //invisible if insufficient rights
        },
        {
          className: "returnReason",
          data: "returnReason",
          name: "returnReason",
          title: "{$RMA.Return-Reason$}",
          visible: bshow //invisible if insufficient rights
        },
        {
          className: "status",
          data: "status",
          name: "status",
          title: "Status",
          width: "100px",
          visible: bshow //invisible if insufficient rights
        }
      ]
    }); // end RMA_tbl
  
    tbl_rma.on( 'draw', function () {
        $('#search')
          .html('<select class="form-control custom mr-2">'+
                '<option value="rma">RMA Number</option>'+
                '<option value="ref">Reference number</option>'+
                '</select>'+
                '<input type="search" id="rma_search" placeholder="Search by RMA No." class="form-control">'+
                '<input type="search" id="ref_search" placeholder="Search by Ref. No." class="form-control d-none">');
        $('#search').on('change', function(){
          if($('#search').val() == 'rma') {
              $('#rma_search').removeClass('d-none'); 
              $('#ref_search').addClass('d-none'); 
              
          } 
          else {
              $('#rma_search').addClass('d-none'); 
              $('#ref_search').removeClass('d-none');
              
          } 
      });
    } );
  
    
  $('#rma_search').on( 'keyup', function () {
    tbl_rma
        .columns( 2 )
        .search( this.value )
        .draw();
  });
  $('#ref_search').on( 'keyup', function () {
    tbl_rma
        .columns( 3 )
        .search( this.value )
        .draw();
  });
  
  // Add event listener for opening and closing details
    $('#DT_RMA tbody').on('click', 'td.details-control', function () {
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

    table.on("user-select", function (e, dt, type, cell, originalEvent) {
        if ($(cell.node()).hasClass("details-control")) {
            e.preventDefault();
        }
    });
  
  
}); // End on document ready


function format(data){
    
    // `data` is the original data object for the row
  var RMA_details = '<div class="alert-success p-3 mb-3">Your RMA Request <strong class="caps">'+data.rmaNumber+'</strong>, submitted on '+data.entryDate+', is in <strong>'+data.status+'</strong> status</div>'+
  '<div class="alert-info p-3">'+
  '<p><strong>Return Instructions</strong>: A confirmation notificaton has been sent to your email address with details on your <abbr>RMA</abbr> and return guidelines.</p>'+
  '<p class="mb-0">For stock balance RMA’s please ship to your nearest Ingram Micro Warehouse &amp; for all other RMA’s ship to:</p>'+
  '<address>Ingram Micro Returns (Ref. # '+data.reference+')<br/>88 Foster Crescent, Door #99<br/>Mississauga ON L5R4A2</address>'+
  '</div>'+
  '<table class="table">'+
      '<thead>'+
          '<tr>'+
              '<th>Item Description</th>'+
              '<th>Your Product Return Details</th>'+
              '<th class="text-right" style="width: 100px;">Return Qty</th>'+
              '<th class="text-right" style="width: 130px;">Unit Price</th>'+
          '</tr>'+
      '</thead>'+
      '<tbody>'+
          '<tr>'+
              '<td>'+data.returnReason+'</td>'+
              '<td>'+data.description+'</td>'+
              '<td class="text-right">'+data.items+'</td>'+
              '<td class="text-right">'+data.price+'</td>'+
          '</tr>'+
      '</tbody>'+
  '</table>';  
  return RMA_details;
}
