{% if (DataItemIndex == 0)  {"<div class='form-row'>"} %}
<div class="col-xl-6 col-12 mb-2 filter-item {%EventVendors.ToString().ToLower().Replace(" ","-").Replace(";"," ")%} {% IsNullOrEmpty(EventDateStart) ? "on-request" : FormatDateTime(EventDateStart,"yyyy") + " " + FormatDateTime(EventDateStart,"MM") %} {%EventOnline.ToString().ToLower().Replace("|"," ")%} {%EventSubject.ToString().ToLower().Replace("|"," ")%} {%EventType.ToString().ToLower().Replace("|"," ")%} certificate-{%EventCertificate.ToString().ToLower().Replace("|", " certificate-") %}
{% if ( Documents[NodeALiasPath].Categories) {  %}
  {% foreach (category in Documents[NodeALiasPath].Categories) {category.CodeName} %}
{% } %}" data-parentID="{% NodeParentID %}" data-month="{% IsNullOrEmpty(EventDateStart) ? "on-request" : FormatDateTime(EventDateStart,"MM") %}" data-year="{% FormatDateTime(EventDateStart,"yyyy") %}">
    <div class="form-row">
        <div class="col-3">
            <div class="card small-card text-center img-rounded shadow-sm">
                <div class="card-header bg-primary text-white p-1 caps">
                        {% IsNullOrEmpty(EventDateStart) ? "<small class='initialism'>" + GetResourceString("1IM.OnRequest") + "</small>" : FormatDateTime(EventDateStart,"MMM").ToUpper() %}
                </div>
                <div class="card-body p-1">
                    <h2 class="pt-0">{% FormatDateTime(EventDateStart,"dd") %}</h2>
                    <p class="initialism my-0 text-muted">{% IsNullOrEmpty(EventDateStart) ? "<i class='fas fa-calendar-alt fa-3x' aria-hidden='true'>&hairsp;</i>" : FormatDateTime(EventDateStart,"ddd").ToUpper() %}</p>
                </div>
            </div>
        </div>
        <div class="col">
            <div class="card small-card shadow-sm">
                {% if(FormatDateTime(GetDate(DateTime.Today),"yyyy-MM-dd") == FormatDateTime(EventDateStart,"yyyy-MM-dd")) { "<div class='ribbon'><span>{$ 1IM_Today $}</span></div>" } %}
                <div class="card-body">
                    <h6 class="card-title mb-0"><a class="card-link" href="{% GetDocumentUrl() %}">{% EventTitle %}</a></h6>
                </div>
                <div class="card-footer border-top-0 bg-transparent pt-0">
                    <div>
                        {% if (Documents[NodeALiasPath].Categories && CurrentSite.SiteID == 4) { 
                            foreach (category in Documents[NodeALiasPath].Categories) {
                                if(category.CategoryDescription.Length == 2 || category.CategoryDescription.Length == 3){
                                    "<a id='" + Documents[NodeAliasPath].Categories.DataItemIndex + "' href='/one-im-b4" + category.CategoryNamePath.ToLower().Replace(" & ","-and-").Replace(" ", "-") + "' class='box box-" + category.CategoryDescription.ToLower() + " card-link border' title='" + category.CategoryDisplayName + "'>" + category.CategoryDescription + "</a>" 
                                }
                            }
                         %}
                    </div> 
                </div>
            </div>
        </div>
    </div>
</div>
{% if (DataItemIndex == DataItemCount - 1) {"</div>"}%}