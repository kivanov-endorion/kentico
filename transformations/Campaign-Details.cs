// Campaign-Details
<div class="row">
    <div class="col-md-8">
        <h1 class="border-bottom-0 d-block display-6 heading my-4" itemprop="headline">{% CampaignName %}</h1>
    {% if (CampaignValidFrom || CampaignValidTo) {
        IfCompare(
            FormatDateTime(CampaignValidFrom, "d MMMM"), FormatDateTime(CampaignValidTo, "d MMMM"), 
            "<time class='small text-muted text-right' datetime='" + FormatDateTime(CampaignValidFrom,"yyyy-MM-dd:HH-mm-ss") + "'>" + 
                IfCompare(
                    FormatDateTime(CampaignValidFrom, "MMMM"), FormatDateTime(CampaignValidTo, "MMMM"),
                    FormatDateTime(CampaignValidFrom, "MMM d") + "&thinsp'&ndash;&thinsp'"+ 
                    FormatDateTime(CampaignValidTo, "MMM d, yyyy") +"</time>",
                    FormatDateTime(CampaignValidFrom, "MMM d") + " &ndash; "+ 
                    FormatDateTime(CampaignValidTo, "d, yyyy") +"</time>"
                ), 
            "<time class='small text-muted text-right' datetime='" + FormatDateTime(CampaignValidFrom,"yyyy-MM-dd:HH-mm-ss") + "'>" + 
                FormatDateTime(CampaignValidFrom, GetResourceString("oneIM.Localdate.long")) + "</time>"
        )
    } %}
        <div class="image-container animated flipInX py-3">
        {% IsNullOrEmpty(CampaignImage) ? "<img data-src='~/1IM/oneingram-1.9.13/global/default_975.jpg' alt='" + StripTags(CampaignName) + "' class='img-fluid lazyload' />" : Format("<img alt='{0}' class='img-contain lazyload' data-src='{1}?height=438'>", CampaignName, GetAttachmentUrlByGUID( CampaignImage, NodeAlias )) %}
        </div>
        <div class="py-3">{% CampaignDescription %}</div>
    </div>
    <div class="col-md-4 border-left grad-lighter">
        <h6 class="initialism pt-4">Download:</h6>
        <div class="row form-row pb-3">  
        {% 
            FieldAttachments = IMMacros.GetFieldGUID("oneIM.Campaign","CampaignAttachments");
            foreach (attachment in Documents[NodeALiasPath].AllAttachments.Where("AttachmentGroupGUID='" + FieldAttachments + "'") ) {
                "<div class='col-12'><div class='card mb-3 p-3 lift'><a id='" + attachment.AttachmentID + "' class='card-link stretched-link pb-0 download small "+
                attachment.AttachmentExtension.Replace(".","") + " mr-4' download href='/pages/GetAttachment.aspx?guid=" + attachment.AttachmentGUID + "/" + 
                attachment.AttachmentName + "'>" + attachment.AttachmentName + " (" + Format(attachment.AttachmentSize/1024/1024, "{0:n1} MB") + ")</a></div></div>";
            } 
        %}
        </div>
    </div>
</div>


{% if((CurrentDocument.DocumentTags.Count > 0) || (CurrentDocument.Categories.Count > 0)) {
    "<div class='bg-light p-3 card flex-row align-items-center mb-5 justify-content-between'>"
} %}
    {% if(CurrentDocument.Categories.Count > 0) {
        "<div><i class='ml-3 badge fas fa-bookmark text-muted' title='Categories'></i>" + CurrentDocument.Categories.Transform("<a class='badge badge-light font-weight-normal initialism' href='/special-pages/search?searchtext={#DisplayName#}'>{#DisplayName#}</a>")+"</div>" 
    } else {""} %}
    {% if(CurrentDocument.DocumentTags.Count > 0) {
        "<div><i class='ml-3 badge fas fa-tags text-muted' title='Tags'></i>" + CurrentDocument.Tags.Transform("<a class='badge badge-light font-weight-normal initialism ' href='../?tagid={#TagId#}'>{#DisplayName#}</a>")+"</div>" 
    } else {""} %}
{% if((CurrentDocument.DocumentTags.Count > 0) || (CurrentDocument.Categories.Count > 0 )) {"</div>"} %}