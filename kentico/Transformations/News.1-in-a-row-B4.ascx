<div class="row mb-4 pb-4  wow flipInX {%if(DataItemIndex!=DataItemCount-1){"border-bottom"}#%} filter-item {% IfEmpty(NewsReleaseDate,"",FormatDateTime(NewsReleaseDate,"MM")) %}" data-parentID="{%NodeParentID%}" data-month="{% FormatDateTime(NewsReleaseDate,"MM") %}" data-year="{% FormatDateTime(NewsReleaseDate,"yyyy") %}">
        <div class="col-md-6 col-xs-12 pb-3">
            <a href="{% GetDocumentUrl() %}">
            {% IfEmpty(NewsTeaser,"<img src='~/1IM/oneingram-1.9.13/global/Logo_Blue_300x175.png?width=446' alt='promo-image' class='card-img-top' />","<img src='~/getattachment/"+ NewsTeaser + CurrentDocument.NodeAliasPath +"?width=446&amp;height=200' alt='" + NewsTitle + "' class='card-img-top' srcset='~/getattachment/"+ NewsTeaser + CurrentDocument.NodeAliasPath +"?width=446&amp;height=200,~/getattachment/"+ NewsTeaser + CurrentDocument.NodeAliasPath +"?width=975&amp;height=438 2x'/>") #%}
            {% If(NewsCategories) {CurrentDocument.Categories.Transform("<p>{#DisplayName#}</p>")} #%}
          </a>
        </div>
    
        <div class="col-md-6 col-xs-12">
            <div class="d-flex flex-column justify-content-between">
                {% IfEmpty(NewsReleaseDate,"","<time datetime='"+FormatDateTime(NewsReleaseDate,"yyyy-MM-ddThh:mm:ss")+"' class='text-muted small pb-1'>"+FormatDateTime(NewsReleaseDate,GetResourceString("oneIM.Localdate.long"))+"</time>")#%}
                <h6 class="card-title"><a class="card-link" href="{% GetDocumentUrl() %}">{%NewsTitle%}</a></h6>
                <p class="card-text text-justify max-lines-6 d-none d-sm-block">{%StripTags(LimitLength(NewsSummary, 180, "&hellip;", true)) %} <a class="card-link"
                    href="{% GetDocumentUrl() %}">{$1IM.ReadMore$} &gt;</a></p>
            </div>
        </div>
    </div>