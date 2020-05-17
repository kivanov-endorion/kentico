{% if(DataItemIndex == 0) { %}
<div class="row">
  {% } #%}
  <div class="{% if(DataItemCount > 2) {"col-xxl-4 "} #%}{% if(DataItemCount == 1) {"mx-auto "} #%}col-md-6 col-12 mb-4">
    <div class="card flex-row mt-4 no-gutters row lift h-100" style="max-width: 444px; min-height: 116px;" itemscope itemtype="http://schema.org/Person">
      <div class="col-3 flipInY overflow-hidden wow">
        {% IsNullOrEmpty(Picture) ? "<i class='fa-2x fa-user fas flex-center h-100 text-muted grad-light'></i>" : 
        Format("<img alt='{0}' class='card-img-top h-100 img-cover lazyload' data-src='{1}?width=150' itemprop='image' />", Name, GetAttachmentUrlByGUID( Picture, NodeAlias )) #%}
      </div>
      <div class="col-7 d-flex flex-column p-3">
        <h6 class="card-title" itemprop="name">{% Name %}</h6>
        <p class="small mt-n2" itemprop="jobTitle">{% Speciality + ( IsNullOrEmpty(Department) ? "" : ", " + Department ) %}</p>
      </div>
      <div class="bg-light border-left col-2 shadow-sm-inset">
        <p class="align-items-center d-flex flex-column h-100 justify-content-around">
          {% IsNullOrEmpty(Email) ? "" : Format("<a itemprop='email' content='{0}' class='btn btn-flat btn-floating' data-original-title='{0}' data-placement='right' data-toggle='tooltip' href='mailto:{0}'><span class='material-icons text-muted'>email</span></a>", Email) #%}

          {% IsNullOrEmpty(Phone) ?  "" : Format("<a itemprop='telephone' content='{0}' aria-label='{1}' class='btn btn-flat btn-floating position-relative' data-original-title='{0}' data-placement='right' data-toggle='tooltip' href='tel:{1}'><span class='material-icons text-muted'>phone</span></a>", Phone, Phone.RegexReplace(@"([-()+\.])+", "")) #%}

          {% IsNullOrEmpty(MobilePhone) ? "" : Format("<a itemprop='telephone' content='{0}' aria-label='{1}' class='btn btn-flat btn-floating position-relative' data-original-title='{0}' data-placement='right' data-toggle='tooltip' href='tel:{1}'><span class='material-icons text-muted'>phone</span></a>", MobilePhone, MobilePhone.RegexReplace(@"([-()+\.])+", "")) #%}
        </p>
      </div>
    </div>
  </div>
  {% if(DataItemIndex == DataItemCount - 1) { %}
</div>
{% } #%}