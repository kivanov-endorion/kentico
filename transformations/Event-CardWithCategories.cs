{% if (DataItemIndex == 0) {"<div class='row'>"} %}
  <div class="col-xxl-3 col-lg-4 col-md-6 col-sm-12 mb-4 filter-item {% EventVendors.ToLower().Replace(";"," ")%} {% IsNullOrEmpty(EventDateStart) ? "on-request" : FormatDateTime(EventDateStart,"yyyy") + " " + FormatDateTime(EventDateStart,"MM") %} {% EventOnline.ToLower().Replace("|"," ") %} {% EventType.ToLower().Replace("|"," ") %} certificate-{% EventCertificate.ToLower().Replace("|", " certificate-") %}">
    <div class="card h-100">
        <div class="zoom">
            <a href="{% GetDocumentUrl() %}">
             {% IsNullOrEmpty(EventTeaserImage) ? 
                    Format("<img src='~/1IM/oneingram-1.9.13/global/default_975.jpg' alt='{0}' class='card-img-top' />", EventTitle) : 
                    Format("<img src='{0}?width=446' alt='{1}' class='card-img-top'/>", GetAttachmentUrlByGUID( EventTeaserImage, NodeAlias ), EventTitle ) %}
            </a>
        </div>
        <div class="card-body">
            <h6 class="card-title"><a class="card-link" href="{% GetDocumentUrl() %}">{% EventTitle %}</a></h6>
            <p class="card-text max-lines-6">{% StripTags(LimitLength(EventTeaserText, 170, "&hellip;", true)) %}</p>
        </div>
        <div class="card-footer d-flex justify-content-between bg-transparent border-0">
          <div>
            {% if (Documents[NodeALiasPath].Categories) {  %}
            {% foreach (category in Documents[NodeALiasPath].Categories) {
              if(category.CategoryDescription != "" && !category.CategoryDescription.Contains("fas") && !category.CategoryDescription.Contains("Master")) {
                "<a id='" + Documents[NodeAliasPath].Categories.DataItemIndex + "' href='/one-im-b4" + category.CategoryNamePath.ToLower().Replace(" & ","-and-").Replace(" ", "-").Replace("ä","a") +"' class='box box-" + category.CategoryDescription.ToLower() + " card-link border' title='" + category.CategoryDisplayName + "'>" + category.CategoryDescription + "</a>" 
              } else {
                "<a id='" + Documents[NodeAliasPath].Categories.DataItemIndex + "' href='/one-im-b4" + category.CategoryNamePath.ToLower().Replace(" & ","-and-").Replace(" ", "-").Replace("ä","a") +"' class='badge badge-light' title='" + category.CategoryDisplayName + "'>" + category.CategoryDisplayName +"</a>" 
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
{% if (DataItemIndex == DataItemCount - 1) {"</div>"} %}