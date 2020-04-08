{% if (DataItemIndex mod 2 == 0) {"<div class='row'>"} %}
    <div class="col-md-6 col-xs-12 mb-4 filter-item {% FormatDateTime(EventDateStart,"yyyy") %} {% FormatDateTime(EventDateStart,"MM") %}" data-parentID="{%NodeParentID%}" data-month="{% FormatDateTime(EventDateStart,"MM") %}" data-year="{% FormatDateTime(EventDateStart,"yyyy") %}">
        <div class="card small-card row no-gutters flex-row">
            <div class="col-3 wow flipInY h-100 overflow-hidden">
                <a href="{% GetDocumentUrl() %}">
                {% IfEmpty(EventTeaserImage, "<img src='~/1IM/oneingram-1.9.13/global/Logo_Blue_300x175.png?width=446' alt='promo-image' class='img-cover h-100' />",
                Format("<img src='{0}?height=128' alt='{1}' class='img-cover h-100' />", GetAttachmentUrlByGUID( EventTeaserImage, NodeAlias ), EventTitle)) %}
                </a>
            </div>
            <div class="col-9 d-flex flex-column justify-content-between p-3">
                <h6 class="card-title"><a class="card-link stretched-link" href="{% GetDocumentUrl() %}">{% EventTitle %}</a></h6>
            <div class="d-flex justify-content-end">
            {% IfCompare(
                    FormatDateTime(EventDateStart, "d MMMM"), FormatDateTime(EventDateEnd, "d MMMM"), 
                    "<time class='small text-muted text-right'>" + 
                        IfCompare(
                            FormatDateTime(EventDateStart, "MMMM"), FormatDateTime(EventDateEnd, "MMMM"),
                            FormatDateTime(EventDateStart, "MMM d") + " &ndash; "+ 
                            FormatDateTime(EventDateEnd, "MMM d, yyyy") +"<br/>",
                            FormatDateTime(EventDateStart, "MMM d") + "&thinsp;&ndash;&thinsp;"+ 
                            FormatDateTime(EventDateEnd, "d, yyyy") +"<br/>"
                        ) +
                        FormatDateTime(EventDateStart, GetResourceString("oneIM.Localtime")) + " &ndash; "+ 
                        FormatDateTime(EventDateEnd, GetResourceString("oneIM.Localtime")) +"</time>", 
                    "<time class='small text-muted text-right'>" + 
                        FormatDateTime(EventDateStart, GetResourceString("oneIM.Localdate.short")) + "<br/>"+ 
                        FormatDateTime(EventDateStart, GetResourceString("oneIM.Localtime"))+ " &ndash; "+
                        FormatDateTime(EventDateEnd, GetResourceString("oneIM.Localtime"))+ "</time>"
                ) %}
            </div>
        </div>
    </div>
  </div>
{% if (DataItemIndex mod 2 == 1) {"</div>"} %}