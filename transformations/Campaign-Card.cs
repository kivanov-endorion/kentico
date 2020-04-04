// Campaign-Card
{% if( DataItemIndex == 0 ){ %}
<div class="row">
{% } %}
    <div class="col-xxl-3 col-xl-4 col-lg-6 col-sm-12 mb-4">
        <div class="card lift">
            <div class="overflow-hidden" style="height: 150px;">
                <a href="{% GetDocumentUrl() %}">
                    {% IsNullOrEmpty(CampaignImage) ? "<img data-src='~/1IM/oneingram-1.9.13/global/default_975.jpg?width=446' alt='" + CampaignName + "' class='card-img-top lazyload' />" : 
                    Format("<img alt='{0}' class='card-img-top lazyload' data-src='{1}?width=446'>", CampaignName, GetAttachmentUrlByGUID( CampaignImage, NodeAlias )) %}
                </a>
            </div>
            <div class="card-body">
                <h6 class="card-title"><a class="card-link" href="{% GetDocumentUrl() %}">{% CampaignName %}</a></h6>
                <p class="card-text d-none d-sm-block text-line-3">
                    <span class="max-lines-3">{% StripTags(LimitLength(CampaignTeaserText, 185, "&hellip;", true)) %}</span>
                </p>
            </div>
            <div class="card-footer d-flex justify-content-between bg-transparent border-0">
                <div>
                    {% if ( Documents[NodeALiasPath].Categories) {  %}
                        {% foreach (category in Documents[NodeALiasPath].Categories) { 
                            if( CurrentSite.SiteID == 2 ) {
                                Format("<a href='/one-im-b4{0}' class='badge badge-light' title='{1}'>{1}</a>", category.CategoryNamePath.ToLower().Replace("merk","maas").Replace(" & ","-and-").Replace(" ", "-"), category.CategoryDisplayName);
                            } else {
                                Format("<a href='/special-pages/search?searchtext={0}' class='badge badge-light' title='{0}'>{0}</a>", category.CategoryDisplayName);
                            }
                        } %}
                    {% } %}
                </div> 
                {% if (CampaignValidFrom || CampaignValidTo) {
                    IfCompare(
                        FormatDateTime(CampaignValidFrom, "d MMMM"), FormatDateTime(CampaignValidTo, "d MMMM"), 
                        "<time class='small text-muted text-right'>" + 
                            IfCompare(
                                FormatDateTime(CampaignValidFrom, "MMMM"), FormatDateTime(CampaignValidTo, "MMMM"),
                                FormatDateTime(CampaignValidFrom, "MMM d") + "&thinsp'&ndash;&thinsp'"+ 
                                FormatDateTime(CampaignValidTo, "MMM d, yyyy") +"</time>",
                                FormatDateTime(CampaignValidFrom, "MMM d") + " &ndash; "+ 
                                FormatDateTime(CampaignValidTo, "d, yyyy") +"</time>"
                            ), 
                        "<time class='small text-muted text-right'>" + FormatDateTime(CampaignValidFrom, GetResourceString("oneIM.Localdate.long")) + "</time>"
                    )
                } %}
            </div>
        </div>
    </div>
{% if( DataItemIndex == DataItemCount-1 ){ %}
</div>
{% } %}