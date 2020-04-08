{% if (DataItemIndex mod 2 == 0) {"<div class='row'>"} %}
    <div class="col-md-6 col-xs-12 mb-4 filter-item {% FormatDateTime(EventDateStart,"yyyy") %} {% FormatDateTime(EventDateStart,"MM") %}" data-parentID="{% NodeParentID %}" data-month="{% FormatDateTime(EventDateStart,"MM") %}" data-year="{% FormatDateTime(EventDateStart,"yyyy") %}">
        <div class="card h-100">
            <div class="zoom">
                <a href="{% GetDocumentUrl() %}">
                {% IsNullOrEmpty(EventTeaserImage) ? 
                    Format("<img src='~/1IM/oneingram-1.9.13/global/default_975.jpg' alt='{0}' class='card-img-top' />", EventTitle) : 
                    Format("<img src='{0}?width=446' alt='{1}' class='card-img-top'/>", GetAttachmentUrlByGUID( EventTeaserImage, NodeAlias ), EventTitle ) %}
                </a>
            </div>
            <div class="card-body">
                <h6 class="card-title"><a class="card-link" href="{% GetDocumentUrl() %}">{% EventTitle %}</a></h6>
                <p class="card-text max-lines-3">{% StripTags(LimitLength(EventTeaserText, 170, "&hellip;", true)) %}</p>
            </div>
            <div class="card-footer d-flex justify-content-between bg-transparent border-0">
                <small><a class="card-link" href="{% GetDocumentUrl() %}">{$ 1IM.ReadMore $} &rsaquo;</a></small>
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
{% if (DataItemIndex mod 2 == 1) {"</div>"} %}