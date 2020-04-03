// Attachment-Gallery
{% if (DataItemIndex == 0) { %}
<div class="gallery" id="{% NodeAlias.ToLower() %}">
{% } %}
    {% foreach (attachment in Documents[NodeAliasPath].AllAttachments.Where("AttachmentExtension = '.jpg' AND  ISNULL(AttachmentTitle,'') != 'notingallery' ")) {
        Format("<div class='mb-3 pics animation'>"+
            "<a data-fancybox='gallery' href='/getattachment/{0}/{1}'>"+
                "<img data-src='/getattachment/{0}/{1}?width=200' alt='{1}' class='img-fluid lazyload' >"+
            "</a></div>", attachment.AttachmentGUID, attachment.AttachmentName)
    } %}
{% if (DataItemIndex == DataItemCount - 1) { %}
</div>
{% } %}