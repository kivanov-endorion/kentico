{% if (DataItemIndex mod 2 == 0) {"<div class='row'>"} %}
<div class="col-md-6 mb-4">
    <div class="card h-100">
        <div class="row no-gutters flex-row align-items-center h-100">
            <div class="col-3">
                <a href="{% GetDocumentUrl() %}" class="d-flex justify-content-center align-items-center flex-column card-link">
                    {% IsNullOrEmpty(EventTitle) ? "" : "<i class='far fa-calendar fa-2x text-warning'></i>" %}
                    {% IsNullOrEmpty(NewsTitle) ? "" : "<i class='far fa-newspaper fa-2x text-success'></i>" %}
                    {% if(ClassName=="CMS.MenuItem")  {"<i class='far fa-file fa-2x text-muted'></i>"} %}
                </a>
            </div>
            <div class="col-9 h-100 d-flex flex-column justify-content-between py-3 pr-4">
                <h6 class="card-title">
                    <a class="card-link stretched-link"
                        href="{% GetDocumentUrl() %}">{% LimitLength(DocumentName, 100, "&hellip;", true) %}</a>
                </h6>
                <div class="d-flex justify-content-end">
                    {% IsNullOrEmpty(EventDateStart) ? "" : IfCompare(FormatDateTime(EventDateStart, "d MMMM"), FormatDateTime(EventDateEnd, "d MMMM"), "<time class='text-muted text-right small'> " + FormatDateTime(EventDateStart, GetResourceString("oneIM.Localdate.short")) + " &ndash; "+ FormatDateTime(EventDateEnd, GetResourceString("oneIM.Localdate.short")) + "</time>", "<time class='text-muted small text-right'>" + FormatDateTime(EventDateStart, GetResourceString("oneIM.Localdate.short")) + "</time>" %}
                    {% IsNullOrEmpty(NewsReleaseDate) ? "" : "<time class='text-muted text-right small'> " + FormatDateTime(NewsReleaseDate, GetResourceString("oneIM.Localdate.short")) +  "</time>" %}
                    {% if(ClassName=="CMS.MenuItem") { "<time class='text-muted text-right small'> " + FormatDateTime(DocumentCreatedWhen, GetResourceString("oneIM.Localdate.short")) +  "</time>"} %}
                </div>
            </div>
        </div>
        <div class="card-footer p-1"><span class="text-hide badge">Categories: </span>
            {% foreach (category in Documents[NodeALiasPath].Categories) {                    
                "<a id='"+Documents[NodeAliasPath].Categories.DataItemIndex+"' href='/one-im-b4"+category.CategoryNamePath.ToLower().Replace(" & ","-and-").Replace(" ", "-")+"' class='badge badge-light' title='" + category.CategoryDisplayName + "'>"+category.CategoryDisplayName+"</a>" 
            } %}
        </div>
    </div>
</div>
{% if (DataItemIndex mod 2 == 1) {"</div>"} %}