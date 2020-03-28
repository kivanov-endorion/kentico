{%if (DataItemIndex == 0) {"<div class='row'>"}#%}

  {%if (DataItemIndex == 0) { %}
    <div class="col-md-6 col-xs-12">
        <div class="card h-100">
            <div class="view overlay zoom">
                <a href="{% GetDocumentUrl() %}" {% IfEmpty(NewsTarget," "," target='" + NewsTarget + "'")%}>
                {% IfEmpty(NewsTeaser,"<img src='~/1IM/oneingram-1.9.13/global/Logo_Blue_300x175.png?width=446' alt='promo-image' class='card-img-top' />","<img src='~/getattachment/"+ NewsTeaser + CurrentDocument.NodeAliasPath +"?width=446&amp;height=200' alt='" + NewsTitle + "' class='card-img-top' srcset='~/getattachment/"+ NewsTeaser + CurrentDocument.NodeAliasPath +"?width=975&amp;height=438,~/getattachment/"+ NewsTeaser + CurrentDocument.NodeAliasPath +" 2x,~/getattachment/"+ NewsTeaser + CurrentDocument.NodeAliasPath +" 3x'/>") #%}
                </a>
            </div>
            <div class="card-body">
                <h6 class="card-title"><a class="card-link" href="sidebar">{%NewsTitle%}</a></h6>
                <p class="card-text text-justify max-lines-6 d-none d-sm-block">{%StripTags(LimitLength(NewsSummary, 180, "&hellip;", true)) %}</p>
            </div>
            <div class="card-footer d-flex justify-content-between bg-transparent border-0"><small><a class="card-link"
                 href="{% GetDocumentUrl() %}" {% IfEmpty(NewsTarget," "," target='" + NewsTarget + "'")%}>{$1IM.ReadMore$} &gt;</a></small> <time datetime="{% FormatDateTime(NewsReleaseDate,"yyyy-MM-ddThh:mm:ss")#%}" class="text-muted small">{% FormatDateTime(NewsReleaseDate,GetResourceString("oneIM.Localdate.long"))#%}</time></div>
        </div>
    </div>
     <div class="col-md-6 col-xs-12 d-flex flex-column justify-content-between">

  {% } #%}   
      {%if (DataItemIndex != 0) { %}
        <div class="card small-card row no-gutters flex-row">
            <div class="col-3 wow flipInY h-100"  style="overflow: hidden;">
                <a href="{% GetDocumentUrl() %}" {% IfEmpty(NewsTarget," "," target='" + NewsTarget + "'")%}>
                {% IfEmpty(NewsTeaser,"<img src='~/1IM/oneingram-1.9.13/global/Logo_Blue_300x175.png?width=446' alt='promo-image' class='img-cover h-100' />","<img src='~/getattachment/"+ NewsTeaser + CurrentDocument.NodeAliasPath +"?width=335&amp;height=150' alt='" + NewsTitle + "' class='img-cover h-100' srcset='~/getattachment/"+ NewsTeaser + CurrentDocument.NodeAliasPath +"?width=335&amp;height=150,~/getattachment/"+ NewsTeaser + CurrentDocument.NodeAliasPath +"?width=670&amp;height=300 2x'/>") #%}
                </a>
            </div>
            <div class="col-9 d-flex flex-column justify-content-between p-3">
                <h6 class="card-title"><a class="card-link" href="{% GetDocumentUrl() %}" {% IfEmpty(NewsTarget," "," target='" + NewsTarget + "'")%}">{%NewsTitle%}</a></h6>
                <p class="m-0 text-truncate"><small>{%StripTags(LimitLength(NewsSummary, 90, "&hellip;", true)) %}</small></p>
            <div class="d-flex justify-content-end"><time datetime="{% FormatDateTime(NewsReleaseDate,"yyyy-MM-ddThh:mm:ss")#%}" class="text-muted small">{% FormatDateTime(NewsReleaseDate,GetResourceString("oneIM.Localdate.short"))#%}</time></div>
        </div>
      </div>
   {% } #%}

{%if (DataItemIndex == DataItemCount - 1) {"</div></div>"}#%}