{% 
    for(i = 0; i < CurrentDocument.Categories.Count ; i++){ 
        strCAT=strCAT+(CurrentDocument.Categories[i].DisplayName+" | ");
    }
    print(strCAT.ToString().Substring(0,strCAT.LastIndexOf("|")));
#%}

{% 
    foreach (x in TargetMarket.Split("|")) {
        strTM=strTM+GetResourceString("1IM.Targetmarket."+ x)+" | "; // 1IM.Targetmarket.1 = Europe...
    }
    print(strTM.ToString().Substring(0,strTM.LastIndexOf("|")));
#%}

//////////////////////////////////

// Attachments in field Attachments
{% 
    FieldAttachments=IMMacros.GetFieldGUID("oneIM.Product","Attachments");
    Documents[NodeALiasPath].AllAttachments.Where("AttachmentGroupGUID='"+FieldAttachments+"'");
    
    foreach (attachment in Documents[NodeALiasPath].AllAttachments.Where("AttachmentGroupGUID='"+FieldAttachments+"'") ) {
    "<a class='pb-0 pdf' download href='/getattachment/" + attachment.AttachmentGUID + "/" + attachment.AttachmentName + "'>Download datasheet</a>";
    } 
#%}

// GALLERY
//All attachments
{% foreach (attachment in Documents[NodeALiasPath].AllAttachments.Where("AttachmentExtension = '.jpg' OR AttachmentExtension = '.png' ")) {
"<a data-fancybox='gallery' data-type='image' href='/getattachment/" + attachment.AttachmentGUID + "/" + attachment.AttachmentName + "'><img src='/getattachment/" + attachment.AttachmentGUID + "/" + attachment.AttachmentName + "' alt='"+attachment.AttachmentName+"' ></a>"
} #%}

//Attachments in field Gallery
{% 
    FieldAttachments=IMMacros.GetFieldGUID("oneIM.Product","Gallery");
    Documents[NodeALiasPath].AllAttachments.Where("AttachmentGroupGUID='"+FieldAttachments+"'");
    
    foreach (attachment in Documents[NodeALiasPath].AllAttachments.Where("AttachmentGroupGUID='"+FieldAttachments+"' ORDER BY "+attachment.AttachmentName+"") ) {
    "<a data-fancybox='gallery' data-type='image' href='/getattachment/" + attachment.AttachmentGUID + "/" + attachment.AttachmentName + "'><img src='/getattachment/" + attachment.AttachmentGUID + "/" + attachment.AttachmentName + "' alt='"+attachment.AttachmentName+"' ></a>"
    } 
#%}