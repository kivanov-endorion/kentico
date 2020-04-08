<div class="row mb-4 pb-4 w-100 wow flipInX {% if(DataItemIndex!=DataItemCount-1){"border-bottom"} %} filter-item {% FormatDateTime(EventDateStart,"yyyy") %} {% FormatDateTime(EventDateStart,"MM") %}" data-parentID="{%NodeParentID%}" data-month="{% FormatDateTime(EventDateStart,"MM") %}" data-year="{% FormatDateTime(EventDateStart,"yyyy") %}">
    <div class="col-xxl-5 col-md-6 col-xs-12">
        <a href="{% GetDocumentUrl() %}">
          {% IsNullOrEmpty(EventTeaserImage) ? 
          Format("<img src='~/1IM/oneingram-1.9.13/global/default_975.jpg' alt='{0}' class='img-fluid' />", EventTitle ) : 
          Format("<img src='~{0}?width=446' alt='{1}' class='img-fluid'/>", GetAttachmentUrlByGUID( EventTeaserImage, NodeAlias ), EventTitle ) %}
        </a>
    </div>

    <div class="col-xxl-7 col-md-6 col-xs-12">
        <div class="d-flex flex-column justify-content-around h-100">
			<h6 class="card-title"><a class="card-link" href="{% GetDocumentUrl() %}">{% EventTitle %}</a></h6>
            <p class="card-text max-lines-3 d-none d-sm-block">{% StripTags(LimitLength(EventTeaserText, 120, "&hellip;", true)) %}</p>
			<div class="d-flex justify-content-between">
                <p><a class="card-link" href="{% GetDocumentUrl() %}" aria-label="{$1IM.ReadMore$}: {% EventTitle %}">{$ 1IM.ReadMore $} &rsaquo;</a></p>
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