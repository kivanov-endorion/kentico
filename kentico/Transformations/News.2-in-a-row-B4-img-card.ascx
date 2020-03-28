{%if (DataItemIndex mod 2 == 0) {"<div class='row py-3'>"}#%}
        <div class="col-md-6 col-xs-12 mb-4 filter-item {% IfEmpty(NewsReleaseDate,"",FormatDateTime(NewsReleaseDate,"MM")) %}" data-parentID="{%NodeParentID%}" data-month="{% FormatDateTime(NewsReleaseDate,"MM") %}" data-year="{% FormatDateTime(NewsReleaseDate,"yyyy") %}">
            <div class="card img-card shadow-sm">
                {% IfEmpty(NewsTeaser,"<img src='~/1IM/oneingram-1.9.13/global/Logo_Blue_300x175.png?width=446' alt='promo-image' class='card-top-img img-fluid' />","<img src='~/getattachment/"+ NewsTeaser + CurrentDocument.NodeAliasPath +"?width=446&amp;height=200' alt='" + NewsTitle + "' class='card-top-img img-fluid' srcset='~/getattachment/"+ NewsTeaser + CurrentDocument.NodeAliasPath +"?width=446&amp;height=200,~/getattachment/"+ NewsTeaser + CurrentDocument.NodeAliasPath +"?width=975&amp;height=438 2x'/>") #%}
                
                <div class="card-footer">
                    <h6 class="card-title"><a class="card-link" href="{% GetDocumentUrl() %}">{%NewsTitle%}</a></h6>
                </div>
          </div>
    </div>
{%if (DataItemIndex mod 2 == 1) {"</div>"}#%}