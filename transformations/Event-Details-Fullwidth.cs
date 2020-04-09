<div class="pt-4 mb-2">
  <div class="d-flex form-row align-items-center justify-content-between py-3">
    <h1 class="border-bottom-0 d-block display-6 mb-2" itemprop="name">
      {% EventTitle %}
    </h1>
     {% !IsNullOrEmpty(EventRegistrationLink || EventContactEMail) {print("<p class='text-right mr-2' itemprop='registration'>");} %}
     {% IsNullOrEmpty(EventRegistrationLink) ? (IsNullOrEmpty(FormName) ? "" : "<a class='btn btn-primary btn-lg' href='#registration-form'>" + GetResourceString("1IM_RegisterHere") + "</a>") : "<a target='_blank' class='btn btn-primary btn-lg' href='" + EventRegistrationLink + "'>" + GetResourceString("1IM_RegisterHere") + "</a>" %}
     {% IsNullOrEmpty(EventContactEMail) ? "" : "<a class='btn btn-primary btn-lg' href='mailto:" + EventContactEMail + "'>" + GetResourceString("1IM.ContactUs") + "</a>" %}
     {% !IsNullOrEmpty(EventRegistrationLink || EventContactEMail) {print("</p>");} %}
  </div>

  <div class="d-block d-lg-flex form-row justify-content-between py-3">         
    {% IsNullOrEmpty(EventLocation) ? "" : "<div class='col'><div class='border-left-primary card grad-lighter mb-1 p-3 h-100 shadow'><h6 class='initialism'><i class='fas fa-map-marker-alt' aria-hidden='true'>&nbsp;</i> " + GetResourceString("1IM_Location") + "</h6><address itemprop='address'>" + EventLocation + "</address></div></div>" %}
          
    {% !IsNullOrEmpty(EventDuration || EventDateStart) {print ("<div class='col'><div class='border-left-primary card grad-lighter mb-1 p-3 h-100 shadow'><h6 class='initialism'><i class='fas fa-calendar-alt' aria-hidden='true'>&nbsp;</i> " + GetResourceString("1IM.Event.Duration") + "</h6>");} %}

    {% IsNullOrEmpty(EventDuration) ? "" : EventDuration + "<br />" %}

    {% IsNullOrEmpty(EventDateStart) ? GetResourceString("1IM.OnRequest") : IfCompare(FormatDateTime(EventDateStart, "d MMMM"), FormatDateTime(EventDateEnd, "d MMMM"), "<time>" + IfCompare(FormatDateTime(EventDateStart, "HH:mm"),"00:00","","<br>") + FormatDateTime(EventDateStart, GetResourceString("oneIM.Localdate.short")) + IfCompare(FormatDateTime(EventDateStart, "HH:mm"),"00:00", " &ndash; " + FormatDateTime(EventDateStart, GetResourceString("oneIM.Localtime")) + "<br>", " &ndash; ")  + FormatDateTime(EventDateEnd, GetResourceString("oneIM.Localdate.short")) + IfCompare(FormatDateTime(EventDateEnd, "HH:mm"),"00:00", " &ndash; " + FormatDateTime(EventDateEnd, GetResourceString("oneIM.Localtime")), "") +"</time>", "<time>" + FormatDateTime(EventDateStart, GetResourceString("oneIM.Localdate.short")) + "<br />" + FormatDateTime(EventDateStart, GetResourceString("oneIM.Localtime"))+ " &ndash; "+FormatDateTime(EventDateEnd, GetResourceString("oneIM.Localtime"))+ "</time>") %}

    {% !IsNullOrEmpty(EventDuration || EventDateStart) {print ("</div></div>");} %}
    
    {% IsNullOrEmpty(EventPrice) ? "" : "<div class='col'><div class='border-left-primary card grad-lighter mb-1 p-3 h-100 shadow'><h6 class='initialism'><i class='fas fa-cash-register' aria-hidden='true'>&nbsp;</i> Preis</h6>" + EventPrice + "</div></div>" %}
 
  </div>
  
  <div class="text-justify py-3" itemprop="description">
    {% EventDescription %}
  </div>
  
  {% IsNullOrEmpty(EventLocationEmbed) ? "" : "<section class='break-free' id='location'><div class='embed-reponsive'><iframe class='embed-reponsive-item lazyload' frameborder='0' height='400' style='border:0' width='100%' data-src='" + EventLocationEmbed + "'></iframe></div></section>" %}
  
  
</div>
{% if(CurrentDocument.Categories.Count > 0) {"<div class='bg-light p-3 card flex-row align-items-center my-5 "} %}
{% if(CurrentDocument.Categories.Count > 0) { " justify-content-center'>"}  %}
{% if(CurrentDocument.Categories.Count > 0 && CurrentDocument.NodeAliasPath.ToLower().Contains("services-and-trainings")) {"<div>"+CurrentDocument.Categories.Transform("<a class='card-link border box box-{#CategoryDescription.ToLower()#} ' href='./?cat={#DisplayName#}' title='{#DisplayName#}'>{#CategoryDescription#}</a>")+"</div>" } else {""} %}
{% if(CurrentDocument.Categories.Count > 0 && !CurrentDocument.NodeAliasPath.ToLower().Contains("services-and-trainings")) {"<div><i class=\"ml-3 badge fas fa-bookmark text-muted\" title=\"Categories\"> </i>" + CurrentDocument.Categories.Transform("<a class='badge badge-light font-weight-normal initialism ' href='./?cat={#DisplayName#}'>{#DisplayName#}</a>")+"</div>" } else {""} %}
{% if(CurrentDocument.Categories.Count > 0) {"</div>"} %}