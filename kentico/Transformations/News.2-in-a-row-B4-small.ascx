{%if (DataItemIndex mod 2 == 0) {"<div class='row'>"}#%}
    <div class="col-md-6 col-xs-12 mb-4 filter-item {% FormatDateTime(NewsReleaseDate,"MM") %}" data-parentID="{%NodeParentID%}" data-month="{% FormatDateTime(NewsReleaseDate,"MM") %}" data-year="{% FormatDateTime(NewsReleaseDate,"yyyy") %}">
        <div class="card small-card row no-gutters flex-row mt-4">
            <div class="col-3 wow flipInY h-100"  style="overflow: hidden;">
                <a href="{% GetDocumentUrl() %}" {% IfEmpty(NewsTarget," "," target='" + NewsTarget + "'")%}>
                {% IfEmpty(NewsTeaser,"<img src='~/1IM/oneingram-1.9.13/global/Logo_Blue_300x175.png?width=446' alt='promo-image' class='img-cover h-100' />","<img src='~/getattachment/"+ NewsTeaser + CurrentDocument.NodeAliasPath +"?height=128' alt='" + NewsTitle + "' class='img-cover h-100' srcset='~/getattachment/"+ NewsTeaser + CurrentDocument.NodeAliasPath +"?height=128,~/getattachment/"+ NewsTeaser + CurrentDocument.NodeAliasPath +"?height=256 2x'/>") #%}
                </a>
            </div>
            <div class="col-9 d-flex flex-column justify-content-between p-3">
                <h6 class="card-title"><a class="card-link" href="{% GetDocumentUrl() %}" {% IfEmpty(NewsTarget," "," target='" + NewsTarget + "'")%}>{%NewsTitle%}</a></h6>
                <p class="m-0 text-truncate"><small>{%StripTags(LimitLength(NewsSummary, 60, "&hellip;", true)) %}</small></p>
           
            <div class="d-flex justify-content-end"><time datetime="{% FormatDateTime(NewsReleaseDate,"yyyy-MM-ddThh:mm:ss")%}" class="text-muted small">{% FormatDateTime(NewsReleaseDate,GetResourceString("oneIM.Localdate.short"))#%}</time></div>
        </div>
    </div>
  </div>
{%if (DataItemIndex mod 2 == 1) {"</div>"}#%}