$(document).ready(function(){
    var isDirty=false;
       
    function Dirty(){
        var rtrnVal=false;
        if(isDirty){
          if(!confirm('You have unsaved changes! If you procede your changes will be lost!')){
             rtrnVal=true;
          }
          
        }
      
        return rtrnVal;   
      
    } // end function dirty
  
    function setDirty(){
        isDirty=true;
      
         $('#msgbox-text').text('You have unsaved changes on the page.');
         $('#msgbox').addClass('alert alert-info');
      
      
    }
  
  
    var info = $('.InfoLabel').text();
    if(info!=''){
      toastr["info"](info, "");
    }
  
    $('.cmdPostback').click(function(e){
      
        table1.ajax.reload();
    
    
    });
  
    $('.bttnSave').click(function(e){
      e.preventDefault();
        
      $('.btn-primary').trigger('click');
    
    });
  
    $('.cmdReturn').click(function(e){      
      if(Dirty()){return false;}
    });
  
    $('.customer_po_nbr').change(function(e){
       setDirty();    
    });
  
    $('.cmdNew').click(function(e){
        e.preventDefault();
        
        var href = $(this).attr("href");
               
        $.fancybox.open({
            href: href,
            type: 'iframe',
            padding: 5,
            beforeClose: function() {parent.location.reload(true)},
            closeClick: true
        });
        //  beforeClose: function() {parent.location.reload(true)},
    
    });
  
    $('.cmdEdit').click(function(e){
        e.preventDefault();
        
        var myValue= $('#AccountID').data('info');
       
        if(myValue.ItemID){
        var href = $(this).attr("href")+myValue.ItemID;
               
          $.fancybox.open({
              href: href,
              type: 'iframe',
              padding: 5,
              beforeClose: function() {parent.location.reload(true)},
              closeClick: true
          });
          //  beforeClose: function() {parent.location.reload(true)},
        }else{
                        
        } // endif
    
    
    });
  
    $('.cmdAddProduct').click(function(e){
        e.preventDefault();
       
        if(Dirty()){return false;}
       
      
         
        var myValue= $('#report tbody').find('tr:first').data('info');
      
        //var myValue= $('#report').find('tr.selected').attr('id'); 
       
        //var href = $(this).attr("href")+myValue.AccountID+'&ItemID='+myValue.ItemID;
        var href = $(this).attr("href")+'?ItemID='+myValue.ItemID;
        

        console.log(href);
     
        if(myValue.AccountID){
                      
          $('#slideInDlg').attr('src',href);
        
          
        }else{
                        
        } // endif
    
  
    });
  
    $('.cmdAddProductOld').click(function(e){
        e.preventDefault();
       
        if(Dirty()){return false;}
       
      
         
        var myValue= $('#report tbody').find('tr:first').data('info');
       
        //var href = $(this).attr("href")+myValue.AccountID+'&ItemID='+myValue.ItemID;
        var href = $(this).attr("href")+'?ItemID='+myValue.ItemID;
        
     
        if(myValue.AccountID){
                      
          $.fancybox.open({
              href: href,
              type: 'iframe',
              padding: 5,
              closeClick: false,
              width: '95%',
              height:'80%',
              autoSize : false,
              beforeClose: function() {parent.location.reload(true)},
          });
          //  beforeClose: function() {parent.location.reload(true)},
        
          
        }else{
                        
        } // endif
    
  
    });
 
    $('.cmdSubmit').click(function(e){
        e.preventDefault();
        console.log("Test");
        // chjeck of changes
        if(Dirty()){return false;}
        
        // check of empty lines in report and raise error.
        var error=false;
        var line_nbrs="";
        var line_cnt=0;
        $('.editNum').each(function( index ){
            var line = index+1;
            line_cnt=line_cnt+line;
            if(($(this).val()=="") || ($(this).val()=="0")){
                line_nbrs=line_nbrs+line+', ';
                //toastr["error"]("Report line "+line+" missing quantity.", "");
                error=true;
            } // end if value
        
        });
        // if error abandon event
        if(error){ 
          line_nbrs=line_nbrs.substring(0,line_nbrs.length-2);
          toastr["error"]("Missing quantity in line(s):  "+line_nbrs+".", "Can't submit report");
          return false; 
        }
        
        if(!line_cnt){ 
          toastr["error"]("Report is empty. You may want to submit a zero report.", "Can't submit report");
          return false; 
        }
   
        var myValue= $('#report tbody').find('tr:first').data('info');  
        
        if((myValue!==undefined)&&(myValue.ItemID)){
            var msg='<p>Do you want to submit report?</p>';
            msg=msg+'<p>Report ID: '+myValue.ItemID+'</p>';
            msg=msg+'<p>Report: '+myValue.Report+'</p>';
          
            BootstrapDialog.confirm({
                title: 'Submit report',
                message: msg,
                type: BootstrapDialog.TYPE_INFO, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
                draggable: true, // <-- Default value is false
                btnCancelLabel: 'Cancel', // <-- Default value is 'Cancel',
                btnCancelClass: 'btn-info', // <-- If you didn't specify it, dialog type will be used,
                btnOKLabel: 'Yes', // <-- Default value is 'OK',
                btnOKClass: 'btn-info', // <-- If you didn't specify it, dialog type will be used,
                callback: function(result) {
                    // result will be true if button was click, while it will be false if users close the dialog directly.
                    if(result) {
                        var request = "/lmc/ajax/submitreport.aspx?ItemID="+myValue.ItemID;
                         // submit the report
                      
                         $.get( request, function( data ) {
                             toastr["success"](data, "");
                             location.reload();
                             //$( "#tbl_datatable_1" ).trigger( "removeSelectedItem" );
                         });
                       
                      
                    }// end if result
                }
            }); // end 1st Dlg
          
        }else{
            toastr["info"]("Please select a report", "");    
        } // end if
    
    });
    
    $('.cmdSubmitZero').click(function(e){
        e.preventDefault();
        if(Dirty()){return false;}
      
        // check of empty lines in report and raise error.
        var error=false;
        var line_cnt=0;
        $('.editNum').each(function( index ){
            line_cnt++;
        });
        // if error abandon event
        if(line_cnt){
           toastr["error"]("Report contains "+line_cnt+" line(s)", "Can't submit zero report");
           return false; 
        
        }
      
      
        //alert('Work in progress ;-)');
        //return false;
      
        var myValue= $('#report tbody').find('tr:first').data('info');  
     
        if((myValue!==undefined)&&(myValue.ItemID)){
          
            var msg='<p>Do you want to submit as ZERO report?</p>';
            msg=msg+'<p>Report ID: '+myValue.ItemID+'</p>';
            msg=msg+'<p>Report: '+myValue.Report+'</p>';
          
            BootstrapDialog.confirm({
                title: 'ZERO report',
                message: msg,
                type: BootstrapDialog.TYPE_INFO, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
                draggable: true, // <-- Default value is false
                btnCancelLabel: 'No', // <-- Default value is 'Cancel',
                btnCancelClass: 'btn-info',
                btnOKLabel: 'Yes', // <-- Default value is 'OK',
                btnOKClass: 'btn-info', // <-- If you didn't specify it, dialog type will be used,
                callback: function(result) {
                    // result will be true if button was click, while it will be false if users close the dialog directly.
                    if(result) {
                        // Check if report is empty
                        //if(myValue.Lines==0){ // Submit report
                             
                             var request = "/lmc/ajax/zeroreport.aspx?ItemID="+myValue.ItemID;
              
                             $.get( request, function( data ) {
                                 toastr["success"](data+' Report submitted', "");
                                 $( "#tbl_datatable_1" ).trigger( "removeSelectedItem" );
                                 location.reload();
                             });
                        /*  
                        }else{ // if not, ask if lines should be deleted
                          
                          BootstrapDialog.confirm({
                          title: 'ZERO report',
                          message: 'Report needs to be emptly to submit as ZERO. Do you want to delete all lines?',
                          type: BootstrapDialog.TYPE_WARNING, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
                          draggable: true, // <-- Default value is false
                          btnCancelLabel: 'Yes', // <-- Default value is 'Cancel',
                          btnOKLabel: 'No', // <-- Default value is 'OK',
                          btnOKClass: 'btn-warning', // <-- If you didn't specify it, dialog type will be used,
                          callback: function(result){
                              if(result) { // if no
                                 //return false;
                              }else {
                                  
                                  var request = "/lmc/ajax/deletereportlines.aspx?ItemID="+myValue.ItemID;
              
                                  $.get( request, function( data ) {
                                      toastr["success"](data+' items deleted', "");
                                      
                                      // submit as zero report
                                      var request = "/lmc/ajax/zeroreport.aspx?ItemID="+myValue.ItemID;
              
                                      $.get( request, function( data ) {
                                          toastr["success"](data+' Report submitted', "");
                                          $( "#tbl_datatable_1" ).trigger( "removeSelectedItem" );
                                          location.reload();
                                      });
                                  });
                                
                               
                              }
                            }
                          }); // End 2nd Dlg
                        
                         
                        } // end if Lines==0;
                        */
                    }else {
                        //return false;
                    }
                }
            }); // end 1st Dlg
         }else{
             toastr["info"]("Please select a report", "");             
         } // endif
  
   });
  
 
  
})