Dropzone.autoDiscover = false;
    
var tblAttachments;

$(document).ready(function () {

    var uploadPath = "/1IM/oneingram-1.9.13/aspx/pages/dropattachment.aspx";
    var refID = "0";
    var fileGroupID = "{%IMMacros.GetSessionID()#%}";
        
    var table2Update = "";

    var acceptedTypes = ".pdf";

    var acceptedTypesAtt = ".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.bmp,.gif,.jpg,.jpeg,.png,.msg";
    var SuccessCnt = 0;
    
    var myDropzoneAtt = new Dropzone("div#uploaderAtt", {
        url: uploadPath,
        params: {
            "ReferenceID": refID,
            "GroupID": fileGroupID,
            "SourceObject": SourceObject,

        },
        acceptedFiles: acceptedTypesAtt,
        maxFilesize: 10, // MB
        autoProcessQueue: true,

    });


    myDropzoneAtt.on("complete", function (file) {
        //myDropzoneAtt.removeFile(file);
    });

    myDropzoneAtt.on("success", function (file) {
        /* Maybe display some more file information on your page */
        SuccessCnt++;
        $('#DT_Attachments').DataTable().ajax.reload();
        myDropzoneAtt.removeFile(file);
    });

    myDropzoneAtt.on("queuecomplete", function (file) {
        /* Maybe display some more file information on your page */

        //toastr["info"]("{$ 1IM.Dashboard.CCP.msg.upload.success $}: " + SuccessCnt, "");

    });

    myDropzoneAtt.on("error", function (file, msg) {
        /* Maybe display some more file information on your page */
        /*
         file.previewElement.addEventListener("click", function() {
            myDropzone.removeFile(file);
         });
        */
        toastr["info"](msg + " only: " + acceptedTypesAtt, "");
    });

})




var icons = [];
  icons['.pdf']='-pdf';
  icons['.xls']='-excel';
  icons['.xlsx']='-excel';
  icons['.doc']='-word';
  icons['.docx']='-word';
  icons['.ppt']='-powerpoint';
  icons['.pptx']='-powerpoint';
  icons['.zip']='-zip';
  icons['.msg']='-text';
 
  //fa-file-image
  icons['.jpg']='-image';
  icons['.jpeg']='-image';
  icons['.gif']='-image';
  icons['.png']='-image';
  icons['.bmp']='-image';
  icons['.tif']='-image';  
  
  
  //delete attachments
    $(document).on("click", "#DT_Attachments .button[type='delete']", function(e) {
      var myValue= $(this).closest("tr").attr("id"); 
      //var ajax="/content-items/ajax/customerservice/formdamageattachmentsdelete?ItemID="+myValue;
      var sUrl = "~/content-items/ajax/customerservice/formdamageattachmentsdelete?ItemID="+myValue;
    
      
      var me=this;
      $.getJSON(sUrl, function(){
           toastr["info"]("{$ 1IM.Dashboard.CCP.msg.delete.success $}", "");
           $("#DT_Attachments").DataTable().row($(me).closest("tr")).remove().draw();
      
      })
      .fail(function() {
          toastr["error"]("{$ 1IM.Dashboard.CCP.msg.delete.failed $}", "");
      });
      
      
    });
  
    
   tblAttachments = $("#DT_Attachments").DataTable({
     ajax: "/content-items/ajax/customerservice/formdamagegetattachments?SourceObject="+SourceObject,
     "paging":   false,
     "ordering": false,
     "info":     false,
     searching: false,
     columns: [
       {
         class:"hide",
         title:"ID", 
         data: "DT_RowId",
       },
       {
        class:"dt-center",
        title:"",  
        data: "FileExtension",
        render: function ( data, type, row, meta ) {
           var iconClass="-o";
           if (typeof icons[data]!=="undefined"){iconClass=icons[data];}
             return '<span><i class="fa  fa-file'+iconClass+'"></i>';
        },
        width: "50",
          
       },
       {
        class:"dt-head-left",
        title:"{$ 1IM.RMAForm.FileName $}",  
        data: "FileName",
        render: function ( data, type, row, meta ) {
              return '<a href="/1IM/oneingram-1.9.13/aspx/pages/getattachment.aspx?guid='+row.ItemGUID+'" target="_blank">'+data+'</a>';
        },
       },
       {
         class:"dt-right",
         title:"{$ 1IM.RMAForm.ItemCreatedWhen $}",  
         data: "ItemCreatedWhen", 
       },
       {
         class:"dt-right",
         title:"{$ 1IM.RMAForm.FileSize $}", 
         data: "FileSize",
       },
       {
        class:"dt-center",
        title:"",  
        data: "",
        render: function ( data, type, row, meta ) {
          
             //return '<span class="button fa fa-2x fa-remove" type="delete"></span>';
          return '<span><i class="button fa fa-trash cmdDeleteFile"></i></span>';
        },
        
        width: "50",
          
       }
      ],
     language: {
        url: "/CMSScripts/Custom/jQuery/dataTables.lang/{$ DE_Inside.DataTable.Language $}.js",
      },
        
   });
  
  function myFunction() {
        $(this).closest('span').closest('button').closest('div').remove();
    }
   
   //delete attachment
   
     //$('.cmdDelete').click(function(e){
  //function deleteAttachment(){
  $(document).on("click", ".cmdDeleteFile", function(e) {
  e.preventDefault();
     
       // #DT_Attachments
       var myValue= $('#DT_Attachments').find('tr.selected').attr('id'); 

       if (myValue >= 0) { // if we have an ID selected     
       
       if(confirm("{$ 1IM.msg.ConfirmDeleteAttachment $}")){
         
       var ajax="/content-items/ajax/customerservice/formdamageattachmentsdelete?ItemID="+myValue;
       $.get(ajax,function(data){
         
         if(data == 1){
          tblAttachments.ajax.reload();
         }
         else{
             toastr["error"]("{$ 1IM.RMAForm.Error.NoRecord $}", "");
           //alert('{$ 1IM.RMAForm.Error.NoRecord $}');
         }
 
       }
            )
       }
       else{
         return false;
       }

     } else {

        toastr["error"]("{$ 1IM.RMAForm.Error.NoRecordSelected $}", "");

     }
  
  
     }); 

  // End of script