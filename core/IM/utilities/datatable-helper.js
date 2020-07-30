$(document).ready(function () {

    $('.cmdUpload').click(function (e) {
        e.preventDefault();

        var tablename = $(this).attr('href');

        $(".excelImportTool select option[value='" + tablename + "']").attr('selected', true);
        //$(".excelImportTool input[name*='$txtDatasheetName']").val('{$=Table1||de-de=Tabelle1|en-us=table1$}');


        $('#uploadExcel').slideToggle();

    });


    $('.cmdCancelUpload').click(function (e) {
        e.preventDefault();

        $('#uploadExcel').slideUp();

    });

    // Delete item form a table
    $('.cmdDeleteItem').click(function (e) {
        e.preventDefault();

        var setting = $(this).data('info');


        var myValue = $('#' + setting.table).find('tr.selected').data('info');

        var ItemID = 0;

        if (myValue === undefined) {
            ItemID = $('#' + setting.table).find('tr.selected').attr('id');
        } else {
            ItemID = myValue.ItemID
        }
        

        if (ItemID != 0) {

            //if(confirm("Do you really want to delete this item?")){
            var request = "/lmc-admin/ajax/delete_item.aspx?service=" + setting.service + "&ItemID=" + ItemID;

            $.get(request, function (data) {
                toastr["success"](data + " Item(s) deleted", "");

                $('#' + setting.table).find('tr.selected').fadeOut("slow", function () {
                    $(this).next().addClass('selected');
                    var table = $('#' + setting.table).DataTable();
                    table
                        .row('tr.selected')
                        .remove()
                        .draw();
                });

            });

            //} // end if confirm

        } else {
            toastr["info"]("Please select item", "");
        } // endif


    }); // end cmdDelete


  $('table.datatable tbody').on( 'click', 'tr', function () {
      if ( $(this).hasClass('selected') ) {
          $(this).removeClass('selected');
      } else {
          $(this).parent().find('tr.selected').removeClass('selected');
          $(this).addClass('selected');
      }
   });
  
   $('table.dblClick tbody ').on( 'dblclick', 'tr', function () {
      $(this).parent().find('tr.selected').removeClass('selected');
      $(this).addClass('selected');
      $('.cmdEdit').trigger('click');
   });

}); // End of script