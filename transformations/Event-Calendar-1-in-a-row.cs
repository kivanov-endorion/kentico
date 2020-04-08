<div class="row mb-3 w-75 filter-item {% FormatDateTime(EventDateStart,"yyyy") %} {% FormatDateTime(EventDateStart,"MM") %}" data-parentID="{%NodeParentID%}" data-month="{% FormatDateTime(EventDateStart,"MM") %}" data-year="{% FormatDateTime(EventDateStart,"yyyy") %}">
    <div style="width:100px;">
        <div class="card small-card text-center img-rounded h-100 shadow-sm {% if(FormatDateTime(GetDate(DateTime.Today),"yyyy-MM-dd") == FormatDateTime(EventDateStart,"yyyy-MM-dd")) {"floatingY"} else {"wow flipInY"} %}" data-wow-delay="{% DataItemIndex * 100 %}ms">
            <div class="card-header bg-primary text-white p-1 caps">
                    {% FormatDateTime(EventDateStart,"MMM").ToUpper() %}
            </div>
            <div class="card-body p-1">
                <h2 class="pt-0">{% FormatDateTime(EventDateStart,"dd") %}</h2>
                <p class="initialism my-0 text-muted">{% FormatDateTime(EventDateStart,"ddd").ToUpper() %}</p>
            </div>
        </div>
    </div>
    <div class="col">
        <div class="card h-100 flex-row align-items-center shadow-sm">
            <div class="card-body">
                <a class="stretched-link card-link" href="{% GetDocumentUrl() %}"><h6>{% EventTitle %}</h6></a>
                {% IfCompare(
                    FormatDateTime(EventDateStart, "d MMMM"),
                    FormatDateTime(EventDateEnd, "d MMMM"),
                    "<time class='text-muted'>" + 
                    IfCompare(
                        FormatDateTime(EventDateStart, "MMMM"), FormatDateTime(EventDateEnd, "MMMM"),
                        FormatDateTime(EventDateStart, "MMM d") + " &ndash; "+ 
                        FormatDateTime(EventDateEnd, "MMM d, yyyy") + "</time>",
                        FormatDateTime(EventDateStart, "MMM d") + "&thinsp;&ndash;&thinsp;"+ 
                        FormatDateTime(EventDateEnd, "d, yyyy") + "</time>"
                    ), 
                    "<time class='text-muted'>" + 
                    FormatDateTime(EventDateStart, GetResourceString("oneIM.Localdate.long")) +
                    "</time>"
                ) %}
            </div>
            <i class="fas fa-angle-right fa-2x text-primary mr-4 opacity d-none d-lg-block"></i>
        </div>
    </div>
</div>