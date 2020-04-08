{% if (DataItemIndex == 0) {"<div class='row py-3'>"} %}
        <div class="col-xxl-4 col-md-6 col-xs-12 mb-4 filter-item {% FormatDateTime(EventDateStart,"yyyy") %} {% FormatDateTime(EventDateStart,"MM") %}" data-parentID="{%NodeParentID%}" data-month="{% FormatDateTime(EventDateStart,"MM") %}" data-year="{% FormatDateTime(EventDateStart,"yyyy") %}">
            <div class="card img-card shadow-sm">
                    {% IsNullOrEmpty(EventTeaserImage) ? 
                    Format("<img src='~/1IM/oneingram-1.9.13/global/default_975.jpg' alt='{0}' class='card-img-top img-fluid' />", EventTitle) : 
                    Format("<img src='{0}?width=446' alt='{1}' class='card-img-top img-fluid'/>", GetAttachmentUrlByGUID( EventTeaserImage, NodeAlias ), EventTitle ) %}

              <div class="card-footer">
                    <a class="card-link" href="{% GetDocumentUrl() %}"><h6 class="card-title">{% EventTitle %}</h6></a>
                </div>
          </div>
    </div>
{% if (DataItemIndex == DataItemIndex - 1) {"</div>"} %}