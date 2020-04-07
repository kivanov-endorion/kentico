{% if (DataItemIndex == 0) {"<div class='row'>"} else { if (DataItemIndex mod 3 == 0)  {"</div>\n<div class='row'>"}} %}
<div class="col-12 col-lg-4 col-sm-6 {%  if (DataItemIndex mod 3 == 1  || DataItemIndex mod 3 == 2) {"border-left"} %} {% if (DataItemCount == 1) {"mx-auto"} %}">
    <div class="d-flex flex-column mb-3 pr-3 text-center">        
        <div style="width: 150px; height: 150px;" class="lift mx-auto overflow-hidden rounded-circle shadow">
            {% IsNullOrEmpty(Picture) ? "<img class='img-fluid' src='/1IM/oneingram-1.9.13/starter/Portal_Contacts_Small_dummy.jpg?width=150' alt= />" : 
            Format("<img alt='{0}' class='img-fluid' src='{1}?width=150'>", Name, GetAttachmentUrlByGUID( Picture, NodeAlias )) %}
        </div>
            <h5 class="heading mt-4 mb-0 text-center">{% Name %}</h5>   
            {% IsNullOrEmpty(Speciality) ? "" : "<p>" + Speciality + "</p>"%}
            <p class="small">
            {% IsNullOrEmpty(Email) ? "" : "<a href='mailto:" + Email + "' class='btn btn-block btn-flat btn-sm my-0 text-truncate'><i class='fas fa-envelope mr-2 align-baseline'></i>" + Email + "</a>" %}
            {% IsNullOrEmpty(Phone) ? "" : "<a href='tel:" + Phone.RegexReplace("[()\[\]\\\/\-\s*]", "") + "' class='btn btn-block btn-flat btn-sm my-0'><i class='fas fa-phone mr-2 align-baseline'></i>" + Phone + "</a>" %}
            {% IsNullOrEmpty(MobilePhone) ? "" : "<a href='tel:" + MobilePhone.RegexReplace("[()\[\]\\\/\-\s*]", "") + "' class='btn btn-block btn-flat btn-sm my-0'><i class='fas fa-mobile-alt mr-2 align-baseline'></i>" + MobilePhone + "</a>" %}
            
            </p>
    </div>
    </div>
{% (DataItemIndex == DataItemCount - 1)  ? "</div>" : "" %}

