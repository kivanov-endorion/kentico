{%if (DataItemIndex mod 2 == 0) {"<div class='row'>"}#%}
        <div class="col-md-6 col-xs-12 mb-4 filter-item {% FormatDateTime(EventDateStart,"MM") %}" data-parentID="{%NodeParentID%}" data-month="{% FormatDateTime(EventDateStart,"MM") %}" data-year="{% FormatDateTime(EventDateStart,"yyyy") %}">
            <div class="card h-100">
                <div class="view overlay zoom">
                    <a href="{% GetDocumentUrl() %}">
                    {% IfEmpty(EventTeaserImage,"
                    <img src='~/1IM/oneingram-1.9.13/global/Logo_Blue_300x175.png?width=446&amp;height=200' alt='"+EventTitle+"' class='card-img-top' />","<img src='~/getattachment/"+ EventTeaserImage + CurrentDocument.NodeAliasPath +"?width=446&amp;height=200' alt='" + EventTitle + "' class='card-img-top' srcset='~/getattachment/"+ EventTeaserImage + CurrentDocument.NodeAliasPath +"?width=446&amp;height=200,~/getattachment/"+ NewsTeaser + CurrentDocument.NodeAliasPath +"?width=975&amp;height=438 2x'/>") #%}
                    </a>
                </div>
    
                <div class="card-body">
                    <h6 class="card-title"><a class="card-link" href="{% GetDocumentUrl() %}">{%EventTitle%}</a></h6>
    
                    <p class="card-text text-justify max-lines-6">{%StripTags(LimitLength(EventTeaserText, 170, "&hellip;", true))%}</p>
                </div>
    
                <div class="card-footer d-flex justify-content-between bg-transparent border-0"><small><a class="card-link"
                            href="{% GetDocumentUrl() %}">{$1IM.ReadMore$} &gt;</a></small> 
                            {% IfCompare(FormatDateTime(EventDateStart, "d MMMM"), FormatDateTime(EventDateEnd, "d MMMM"), "<time class='small text-muted text-right'>" + FormatDateTime(EventDateStart, GetResourceString("oneIM.Localdate.long")) + " &ndash; "+ FormatDateTime(EventDateStart, GetResourceString("oneIM.Localtime")) +"<br/>" + FormatDateTime(EventDateEnd, GetResourceString("oneIM.Localdate.long")) + " &ndash; "+ FormatDateTime(EventDateEnd, GetResourceString("oneIM.Localtime")) +"</time>", "<time class='small text-muted text-right'>" + FormatDateTime(EventDateStart, GetResourceString("oneIM.Localdate.long")) + "<br/>"+ FormatDateTime(EventDateStart, GetResourceString("oneIM.Localtime"))+ " &ndash; "+FormatDateTime(EventDateEnd, GetResourceString("oneIM.Localtime"))+ "</time>") #%}
                            </div>
            </div>
        </div>
    {%if (DataItemIndex mod 2 == 1) {"</div>"}#%}
