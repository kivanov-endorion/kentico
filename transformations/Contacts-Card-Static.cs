{% if (DataItemIndex == 0) {"<div class='row'>"} %}
    <div class="col-lg-4 col-md-6 col-sm-12 mb-4">
    <div class="card lift mt-4" xstyle="width: 330px;">
      <div class="card-img-top img-cover overflow-hidden" style="height: 250px;">
        {% IsNullOrEmpty(Picture) ? "<img class='img-fluid w-100' src='/1IM/oneingram-1.9.13/starter/Portal_Contacts_Small_dummy.jpg' alt= />" : 
        "<img alt='" + Name + "' class='img-fluid w-100' src='~/getattachment/" + Picture + "/image.jpg' />" %}
      </div>
        <div class="p-3 small">
            <h6 class="caps card-title text-center">{% Name %}</h6>
            <p class="text-center">{% Speciality %}</p>
        </div>
        <div class="bg-light overflow-hidden">
            <p class="align-items-center flex-column h-100 justify-content-around mb-0 p-2">
                {% IsNullOrEmpty(Email) ? "" : "<a class='btn btn-flat btn-sm d-flex align-items-center' href='mailto:" + Email + "'><span class='material-icons mr-3'>email</span> "+LimitLength(Email,36,"&hellip;",true)+"</a>" %}
                {% IsNullOrEmpty(Phone) ?  "" : "<a aria-label='" + Phone.RegexReplace(@"([-()+\.])+"," ") + "' class='btn btn-flat btn-sm d-flex align-items-center position-relative' href='tel:" + Phone.RegexReplace(@"([-()\.])+","") + "'><span class='material-icons mr-3'>phone</span> "+Phone+"</a>" #%}
                {% IsNullOrEmpty(MobilePhone) ? "" : "<a aria-label='" + MobilePhone.RegexReplace(@"([-()+\.])+"," ") + "' class='btn btn-flat btn-sm d-flex align-items-center' href='tel:" + MobilePhone.RegexReplace(@"([-()\.])+","") + "'><span class='material-icons mr-3'>smartphone</span> "+MobilePhone+"</a>" #%}
            </p>
        </div>
    </div>
</div>
{%if (DataItemIndex == DataItemCount -1) {"</div>"} %}