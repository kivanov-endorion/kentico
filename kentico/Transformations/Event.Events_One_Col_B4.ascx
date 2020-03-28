<div class="row mb-4 pb-4  wow flipInX {%if(DataItemIndex!=DataItemCount-1){"border-bottom"}#%} filter-item  {% FormatDateTime(EventDateStart,"MM") %}" data-parentID="{%NodeParentID%}" data-month="{% FormatDateTime(EventDateStart,"MM") %}" data-year="{% FormatDateTime(EventDateStart,"yyyy") %}">
    <div class="col-md-6 col-xs-12 pb-3">
        <a href="{% GetDocumentUrl() %}">
            {% IfEmpty(EventTeaserImage,"
            <img src='~/1IM/oneingram-1.9.13/global/Logo_Blue_300x175.png?width=446&amp;height=200' alt='"+EventTitle+"' class='card-img-top' />","<img src='~/getattachment/"+ EventTeaserImage + CurrentDocument.NodeAliasPath +"?width=446&amp;height=200' alt='" + EventTitle + "' class='card-img-top' srcset='~/getattachment/"+ EventTeaserImage + CurrentDocument.NodeAliasPath +"?width=446&amp;height=200,~/getattachment/"+ NewsTeaser + CurrentDocument.NodeAliasPath +"?width=975&amp;height=438 2x'/>") #%}
        </a>
    </div>

    <div class="col-md-6 col-xs-12">
        <div class="d-flex flex-column justify-content-between">
            <h6 class="card-title"><a class="card-link" href="{% GetDocumentUrl() %}">{%EventTitle%}</a></h6>
            <p class="card-text text-justify max-lines-6 d-none d-sm-block">{%StripTags(LimitLength(EventTeaserText, 120, "&hellip;", true)) %} <a class="card-link"
                href="{% GetDocumentUrl() %}">{$1IM.ReadMore$} &gt;</a></p>
            {% IfCompare(FormatDateTime(EventDateStart, "d MMMM"), FormatDateTime(EventDateEnd, "d MMMM"), "<time class='small text-muted text-right'>" + FormatDateTime(EventDateStart, GetResourceString("oneIM.Localdate.long")) + " &ndash; "+ FormatDateTime(EventDateStart, GetResourceString("oneIM.Localtime")) +"<br/>" + FormatDateTime(EventDateEnd, GetResourceString("oneIM.Localdate.long")) + " &ndash; "+ FormatDateTime(EventDateEnd, GetResourceString("oneIM.Localtime")) +"</time>", "<time class='small text-muted text-right'>" + FormatDateTime(EventDateStart, GetResourceString("oneIM.Localdate.long")) + "<br/>"+ FormatDateTime(EventDateStart, GetResourceString("oneIM.Localtime"))+ " &ndash; "+FormatDateTime(EventDateEnd, GetResourceString("oneIM.Localtime"))+ "</time>") #%}
        </div>
    </div>
</div>