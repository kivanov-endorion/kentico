{% if (DataItemIndex == 0) {"<div class='row'>"} %}
    <div class="col-md-6 col-xxl-4 mb-4 filter-item {% FormatDateTime(EventDateStart,"yyyy") %} {% FormatDateTime(EventDateStart,"MM") %}" data-parentID="{% NodeParentID %}" data-month="{% FormatDateTime(EventDateStart,"MM") %}" data-year="{% FormatDateTime(EventDateStart,"yyyy") %}">
        <div class="card">
            <div class="zoom card-top">
                <a href="{% GetDocumentUrl() %}" {% if(DocumentMenuItemInactive == true) {" class=\"disabled\""} else {""} %}>
                {% IsNullOrEmpty(EventTeaserImage) ? 
                    Format("<img src='~/1IM/oneingram-1.9.13/global/default_975.jpg' alt='{0}' class='wrapper' />", EventTitle) : 
                    Format("<img src='{0}?width=446' alt='{1}' class='wrapper'/>", GetAttachmentUrlByGUID( EventTeaserImage, NodeAlias ), EventTitle ) %}
                </a>
            </div>
            <div class="card-body">
                <h6 class="card-title"><a class="card-link {% if(DocumentMenuItemInactive == true) {"disabled"} else {""} %}" href="{% GetDocumentUrl() %}">{% StripTags(LimitLength(EventTitle, 60, "&hellip;", true)) %}</a></h6>
                <p class="small card-text max-lines-3">{% StripTags(LimitLength(EventTeaserText, 170, "&hellip;", true)) %}</p>
            </div>
            <div class="card-footer d-flex justify-content-between bg-transparent border-0">
               <a class="btn btn-primary btn-block {% if(DocumentMenuItemInactive == true) {"disabled"} else {""} %}" href="{% GetDocumentUrl() %}">{$ 1IM.ReadMore $} &rsaquo;</a>
            </div>
      </div>
    </div>
{% if (DataItemIndex == DataItemCount - 1) {"</div>"} %}