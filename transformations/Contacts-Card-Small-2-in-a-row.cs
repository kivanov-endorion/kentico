{% if(DataItemIndex == 0) { %}
<div class="row">
  {% } %}
  <div class="col-xxl-4 col-md-6 col-xs-12 mb-4">
    <div class="card flex-row mt-4 no-gutters row lift h-100">
      <div class="col-3 flipInY overflow-hidden wow">
        {% IsNullOrEmpty(Picture) ? "<img class='card-img-top h-100 img-cover' src='/1IM/oneingram-1.9.13/starter/Portal_Contacts_Small_dummy.jpg' alt='Contact image dummy' />" : 
        Format("<img alt='{0}' class='card-img-top h-100 img-cover lazyload' data-src='{1}?width=150' />", Name, GetAttachmentUrlByGUID( Picture, NodeAlias )) %}
      </div>
      <div class="col-7 d-flex flex-column p-3">
        <h6 class="card-title">{% Name %}</h6>
        <p class="small mt-n2">{% Speciality %}</p>
      </div>
      <div class="bg-light border-left col-2 shadow-sm-inset">
        <p class="align-items-center d-flex flex-column h-100 justify-content-around">
          {% IsNullOrEmpty(Email) ? "" : "<a class='btn btn-flat btn-floating' data-original-title='" + Email + "' data-placement='right' data-toggle='tooltip' href='mailto:" + Email + "'><span class='material-icons text-muted'>email</span></a>" %}
          {% IsNullOrEmpty(Phone) ?  "" : "<a aria-label='" + Phone.RegexReplace(@"([-()+\.])+"," ") + "' class='btn btn-flat btn-floating position-relative' data-original-title='"+ Phone +"' data-placement='right' data-toggle='tooltip' href='tel:" + Phone.RegexReplace("[()\[\]\\\/\-\s*]", "") + "'><span class='material-icons text-muted'>phone</span></a>" %}
          {% IsNullOrEmpty(MobilePhone) ? "" : "<a aria-label='" + MobilePhone.RegexReplace(@"([-()+\.])+"," ") + "' class='btn btn-flat btn-floating' data-original-title='"+ MobilePhone +"' data-placement='right' data-toggle='tooltip' href='tel:" + MobilePhone.RegexReplace("[()\[\]\\\/\-\s*]", "") + "'><span class='material-icons text-muted'>smartphone</span></a>" %}
        </p>
      </div>
    </div>
  </div>
  {% if(DataItemIndex == DataItemCount - 1) { %}
</div>
{% } %}