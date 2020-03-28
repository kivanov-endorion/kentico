{%if (DataItemIndex mod 2 == 0) {"<div class='row'>"}#%}
    <div class="col-md-6 col-xs-12 mb-4 filter-item {% FormatDateTime(EventDateStart,"MM") %}" data-parentID="{%NodeParentID%}" data-month="{% FormatDateTime(EventDateStart,"MM") %}" data-year="{% FormatDateTime(EventDateStart,"yyyy") %}">
        <div class="card small-card row no-gutters flex-row">
            <div class="col-3 wow flipInY h-100"  style="overflow: hidden;">
                <a href="{% GetDocumentUrl() %}">
                {% IfEmpty(EventTeaserImage,"<img src='~/1IM/oneingram-1.9.13/global/Logo_Blue_300x175.png?width=446' alt='promo-image' class='img-cover h-100' />","<img src='~/getattachment/"+ EventTeaserImage + CurrentDocument.NodeAliasPath +"?height=128' alt='" + EventTitle + "' class='img-cover h-100' srcset='~/getattachment/"+ EventTeaserImage + CurrentDocument.NodeAliasPath +"?height=128,~/getattachment/"+ EventTeaserImage + CurrentDocument.NodeAliasPath +"?height=256 2x'/>") #%}
                </a>
            </div>
            <div class="col-9 d-flex flex-column justify-content-between p-3">
                <h6 class="card-title"><a class="card-link" href="{% GetDocumentUrl() %}">{%EventTitle%}</a></h6>
                
            <div class="d-flex justify-content-end">{% IfCompare(FormatDateTime(EventDateStart, "d MMMM"), FormatDateTime(EventDateEnd, "d MMMM"), "<time class='text-muted text-right small'> " + FormatDateTime(EventDateStart, GetResourceString("oneIM.Localdate.short")) + " &ndash; "+ FormatDateTime(EventDateStart, GetResourceString("oneIM.Localtime")) + "<br />" + FormatDateTime(EventDateEnd, GetResourceString("oneIM.Localdate.short")) + " &ndash; "+ FormatDateTime(EventDateEnd, GetResourceString("oneIM.Localtime")) +"</time>", "<time class='text-muted small text-right'>" + FormatDateTime(EventDateStart, GetResourceString("oneIM.Localdate.short")) + "<br />" + FormatDateTime(EventDateStart, GetResourceString("oneIM.Localtime"))+ " &ndash; "+FormatDateTime(EventDateEnd, GetResourceString("oneIM.Localtime"))+ "</time>") #%}</div>
        </div>
    </div>
  </div>
{%if (DataItemIndex mod 2 == 1) {"</div>"}#%}