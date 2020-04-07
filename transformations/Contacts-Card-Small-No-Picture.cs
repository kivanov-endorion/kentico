{% if (DataItemIndex == 0) {"<div class='row contacts>"} %}
    <div class="col-xxl-3 col-lg-6 mb-4">
    <div class="border-top-primary card lift mt-4 no-gutters row overflow-hidden">
        <div class="d-flex flex-column p-3">
            <h6 class="caps card-title mb-0 text-center">{% Name %}</h6>
            <p class="small text-center">{% Speciality %}</p>
        </div>
        <div class="bg-light">
            <p class="align-items-center flex-column h-100 justify-content-around mb-0 p-2">
                {% IsNullOrEmpty(Email) ? "" : "<a class='btn btn-flat d-flex align-items-center' data-original-title='" + Email + "' data-placement='right' data-toggle='tooltip' href='mailto:" + Email + "'><span class='material-icons mr-3'>email</span> " + LimitLength(Email,36,"&hellip;",true) + "</a>" %}
                {% IsNullOrEmpty(Phone) ?  "" : "<a aria-label='" + Phone.RegexReplace(@"([-()+\.])+"," ") + "' class='btn btn-flat d-flex align-items-center position-relative' data-original-title='" + Phone + "' data-placement='right' data-toggle='tooltip' href='tel:" + Phone.RegexReplace("[()\[\]\\\/\-\s*]", "") + "'><span class='material-icons mr-3'>phone</span> " + Phone + "</a>" %}
                {% IsNullOrEmpty(MobilePhone) ? "" : "<a aria-label='" + MobilePhone.RegexReplace(@"([-()+\.])+"," ") + "' class='btn btn-flat d-flex align-items-center' data-original-title='" + MobilePhone + "' data-placement='right' data-toggle='tooltip' href='tel:" + MobilePhone.RegexReplace("[()\[\]\\\/\-\s*]", "") + "'><span class='material-icons mr-3'>smartphone</span> " + MobilePhone + "</a>" %}
            </p>
        </div>
    </div>
</div>
{% if (DataItemIndex == DataItemCount -1) {"</div>"} %}

// CSS
.contacts .col-xxl-3.col-lg-6.mb-4 {
  min-width: 330px;
}