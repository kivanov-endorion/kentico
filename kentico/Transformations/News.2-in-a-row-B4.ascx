{%if (DataItemIndex mod 2 == 0) {"<div class='row'>"}#%}
    <div class="col-md-6 col-xs-12 mb-4 filter-item {% IfEmpty(NewsReleaseDate,"",FormatDateTime(NewsReleaseDate,"MM")) %}" data-parentID="{%NodeParentID%}" data-month="{% FormatDateTime(NewsReleaseDate,"MM") %}" data-year="{% FormatDateTime(NewsReleaseDate,"yyyy") %}">
        <div class="card h-100">
            <div class="view overlay zoom">
                <a href="{% GetDocumentUrl() %}">
                {% IfEmpty(NewsTeaser,"<img src='~/1IM/oneingram-1.9.13/global/Logo_Blue_300x175.png?width=446' alt='promo-image' class='card-img-top' />","<img src='~/getattachment/"+ NewsTeaser + CurrentDocument.NodeAliasPath +"?width=446&amp;height=200' alt='" + NewsTitle + "' class='card-img-top' srcset='~/getattachment/"+ NewsTeaser + CurrentDocument.NodeAliasPath +"?width=446&amp;height=200,~/getattachment/"+ NewsTeaser + CurrentDocument.NodeAliasPath +"?width=975&amp;height=438 2x'/>") #%}
                </a>
            </div>
            <div class="card-body">
                <h6 class="card-title"><a class="card-link" href="{% GetDocumentUrl() %}">{%NewsTitle%}</a></h6>
                <p class="card-text text-justify max-lines-6 d-none d-sm-block">{%StripTags(LimitLength(NewsSummary, 180, "&hellip;", true)) %}</p>
            </div>
            <div class="card-footer d-flex justify-content-between bg-transparent border-0"><small><a class="card-link"
                 href="{% GetDocumentUrl() %}">{$1IM.ReadMore$} &gt;</a></small> 
                 {% IfEmpty(NewsReleaseDate,"","<time datetime='"+FormatDateTime(NewsReleaseDate,"yyyy-MM-ddThh:mm:ss")+"' class='text-muted small'>"+FormatDateTime(NewsReleaseDate,GetResourceString("oneIM.Localdate.long"))+"</time>")#%}
        </div>
      </div>
    </div>
{%if (DataItemIndex mod 2 == 1) {"</div>"}#%}