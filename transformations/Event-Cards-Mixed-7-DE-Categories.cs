{% if (DataItemIndex == 0) {"<div class='row'>"} %}
  {% if (DataItemIndex == 0) { %}
  <div class=" col-xxl-3 col-xl-4 col-lg-6 col-md-12 mx-auto mb-2">
    <div class="card h-100">
        <div class="zoom">
            <a href="{% GetDocumentUrl() %}">
            {% IsNullOrEmpty(EventTeaserImage) ? 
                    Format("<img src='~/1IM/oneingram-1.9.13/global/default_975.jpg' alt='{0}' class='card-img-top' />", EventTitle) : 
                    Format("<img src='{0}?width=446' alt='{1}' class='card-img-top'/>", GetAttachmentUrlByGUID( EventTeaserImage, NodeAlias ), EventTitle ) %}
            </a>
        </div>
        <div class="card-body">
            <h6 class="card-title pb-0"><a class="card-link" href="{% GetDocumentUrl() %}">{% EventTitle %}</a></h6>
            <p class="card-text max-lines-6">{% StripTags(LimitLength(EventTeaserText, 170, "&hellip;", true)) %}</p>
        </div>
        <div class="card-footer d-flex justify-content-between bg-transparent border-0">
          <div class="d-flex justify-content-between" >
            {% if(Documents[NodeALiasPath].Categories) {  %}
              {% foreach (category in Documents[NodeALiasPath].Categories) { 
                  if(category.CategoryDescription != "" && !category.CategoryDescription.Contains("fas") && !category.CategoryDescription.Contains("Master")) {
                      "<a href='/one-im-b4" + category.CategoryNamePath.ToLower().Replace(" & ","-and-").Replace(" ", "-") + "' class='box box-" + category.CategoryDescription.ToLower() + " card-link' title='" + category.CategoryDisplayName + "'>" + category.CategoryDescription + "</a>" 
                  } else {
                      "<a href='/one-im-b4" + category.CategoryNamePath.ToLower().Replace(" & ","-and-").Replace(" ", "-") + "' class='badge badge-light' title='" + category.CategoryDisplayName + "'>" + category.CategoryDisplayName + "</a>" 
                  }
              } %}
            {% } %}
          </div> 
          {% IfCompare(
          FormatDateTime(EventDateStart, "d MMMM"),
          FormatDateTime(EventDateEnd, "d MMMM"),
          "<time class='small text-muted text-right'>" + 
          IfCompare(
          FormatDateTime(EventDateStart, "MMMM"), FormatDateTime(EventDateEnd, "MMMM"),
          FormatDateTime(EventDateStart, "MMM d") + " &ndash; "+ 
          FormatDateTime(EventDateEnd, "MMM d, yyyy") + "</time>",
          FormatDateTime(EventDateStart, "MMM d") + "&thinsp;&ndash;&thinsp;"+ 
          FormatDateTime(EventDateEnd, "d, yyyy") + "</time>"
          ), 
          "<time class='small text-muted text-right'>" + 
          FormatDateTime(EventDateStart, GetResourceString("oneIM.Localdate.long")) +
          "</time>"
          ) %}
        </div>
    </div>  
  </div>
  <div class="col-xxl-9 col-xl-8 col-lg-6 col-md-12 d-flex flex-column {%If ((DataItemCount-1) <= 4) { "justify-content-start"} else { "justify-content-between"} %}">
  {% } %}   
  {%if (DataItemIndex != 0)  { %}
      {%if (DataItemIndex mod 2 == 1)  {"<div class='form-row'>"} %}
        <div class="col-xl-6 col-12 mb-2 {% if (DataItemIndex != 0)  { "d-none d-md-block" } %}">
            <div class="form-row">
               <div class="col-3">
                  <div class="card small-card text-center img-rounded shadow-sm wow flipInY" data-wow-delay="{% DataItemIndex * 100 %}ms">
                      <div class="card-header bg-primary text-white p-1 caps">
                              {% IsNullOrEmpty(EventDateStart) ? "<small class='initialism'>" + GetResourceString("1IM.OnRequest") + "</small>" : FormatDateTime(EventDateStart,"MMM").ToUpper() %}
                      </div>
                      <div class="card-body p-1">
                          <h2 class="pt-0">{% FormatDateTime(EventDateStart,"dd") %}</h2>
                          <p class="initialism my-0 text-muted">{% IsNullOrEmpty(EventDateStart) ? "<i class='fas fa-calendar-alt fa-3x' aria-hidden='true'></i>" : FormatDateTime(EventDateStart,"ddd").ToUpper() %}</p>
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
                             {%if (Documents[NodeALiasPath].Categories) {  %}
                                  {% foreach (category in Documents[NodeALiasPath].Categories) {
                                    if(category.CategoryDescription != "" && !category.CategoryDescription.Contains("fas") && !category.CategoryDescription.Contains("Master")) {
                                      "<a id='" + Documents[NodeAliasPath].Categories.DataItemIndex+"' href='/one-im-b4"+category.CategoryNamePath.ToLower().Replace(" & ","-and-").Replace(" ", "-") + "' class='box box-" + category.CategoryDescription.ToLower() + " card-link border' title='" + category.CategoryDisplayName + "'>" + category.CategoryDescription + "</a>" 
                                    } else {
                                      "<a id='" + Documents[NodeAliasPath].Categories.DataItemIndex+"' href='/one-im-b4"+category.CategoryNamePath.ToLower().Replace(" & ","-and-").Replace(" ", "-") + "' class='badge badge-light' title='" + category.CategoryDisplayName + "'>" + category.CategoryDisplayName + "</a>" 
                                    }
                                  } %}
                             {% } %}
                          </div> 
                        </div>
                    </div>
               </div>
            </div>
        </div>
     {% if (DataItemIndex mod 2 == 0) {"</div>"} %}
   {% } %}
{% if (DataItemIndex == DataItemCount - 1) {"</div></div>"} %}