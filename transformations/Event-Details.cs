<div class="image-container animated flipInX pb-3 d-none d-lg-block" itemprop="image" itemscope itemtype="http://schema.org/ImageObject">
    {% IsNullOrEmpty(EventTeaserImage) ? "<img src='/1IM/oneingram-1.9.13/global/default_975.jpg' alt='"+ StripTags(EventTitle) + "' class='img-contain'/>" : 
    Format("<img src='{0}?width=975&height=438' alt='{1}' class='img-contain' itemprop='url' />", GetAttachmentUrlByGUID( EventTeaserImage, NodeAlias ), EventTitle) %}
</div>
<h1 class="border-bottom-0 d-block display-6 heading mb-2" itemprop="name">{% EventTitle %}</h1>
<p class="small text-muted caps category">
{% foreach (tag in Documents[NodeALiasPath].Tags) {  "<a class=\"badge-light bg-light-7\" href=\"/special-pages/search?searchtext=\">" + tag.DisplayName + "</a>"   } #%}
</p>
<div class="text-justify py-3" itemprop="description">
  {% EventDescription %}
</div>