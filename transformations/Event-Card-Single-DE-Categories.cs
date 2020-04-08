<div class="card h-100">
    <div class="zoom">
        <a href="{% GetDocumentUrl() %}">
        {% IsNullOrEmpty(EventTeaserImage) ? 
            Format("<img src='~/1IM/oneingram-1.9.13/global/default_975.jpg' alt='{0}' class='card-img-top' />", EventTitle) : 
            Format("<img src='{0}?width=446' alt='{1}' class='card-img-top'/>", GetAttachmentUrlByGUID( EventTeaserImage, NodeAlias ), EventTitle ) %}
        </a>
    </div>
    <div class="card-body">
        <h6 class="card-title pb-0"><a class="card-link" href="{% GetDocumentUrl() %}">{% EventTitle %}</a></h6>
        <p class="card-text max-lines-6">{% StripTags(LimitLength(EventTeaserText, 170, "&hellip;", true)) %}</p>
    </div>
    <div class="card-footer d-flex justify-content-between bg-transparent border-0">
        <div class="d-flex justify-content-between" >
        {% if(Documents[NodeALiasPath].Categories) {  %}
            {% foreach (category in Documents[NodeALiasPath].Categories) { 
                if(category.CategoryDescription) {
                    "<a href='/one-im-b4" + category.CategoryNamePath.ToLower().Replace(" & ","-and-").Replace(" ", "-")+"' class='box box-" + category.CategoryDescription.ToLower() + " card-link' title='" + category.CategoryDisplayName + "'>" + category.CategoryDescription + "</a>" 
                } else {
                    "<a href='/one-im-b4" + category.CategoryNamePath.ToLower().Replace(" & ","-and-").Replace(" ", "-")+"' class='badge badge-light' title='" + category.CategoryDisplayName + "'>" + category.CategoryDisplayName + "</a>" 
                }
            } %}
        {% } %}
        </div> 
        {% IfCompare(
            FormatDateTime(EventDateStart, "d MMMM"), 
            FormatDateTime(EventDateEnd, "d MMMM"), 
            "<time class='small text-muted text-right'>" + 
                IfCompare(
                    FormatDateTime(EventDateStart, "MMMM"), FormatDateTime(EventDateEnd, "MMMM"),
                    FormatDateTime(EventDateStart, "MMM d") + " &ndash; "+ 
                    FormatDateTime(EventDateEnd, "MMM d, yyyy") +"</time>",
                    FormatDateTime(EventDateStart, "MMM d") + "&thinsp;&ndash;&thinsp;"+ 
                    FormatDateTime(EventDateEnd, "d, yyyy") + "</time>"
                ), 
            "<time class='small text-muted text-right'>" + 
                FormatDateTime(EventDateStart, GetResourceString("oneIM.Localdate.long")) +
                            "</time>"
        ) %}
    </div>
</div>