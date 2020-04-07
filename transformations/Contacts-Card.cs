{% if( DataItemIndex == 0) { "<div class='row'>" } %}
<div class="col-12 col-lg-4 col-sm-6  mb-3">
  <div class="contacts card img-thumbnail animated flipInX mr-3 overflow-hidden h-100">
    <div class="card-img-top">
      {% IsNullOrEmpty(Picture) ? "<img class='img-cover' src='/1IM/oneingram-1.9.13/starter/Portal_Contacts_Small_dummy.jpg' alt= />" : "<img alt='"+Name+"' class='img-cover' src='~/getattachment/" + Picture + "/image.jpg?width=220' />" #%}
    </div>
    <div class="card-body bg-white h-100 z-depth-5 text-truncate">
      <h6 class="card-title heading">{% Name %}</h6>   
      <p class="text-truncate small">
        {% IsNullOrEmpty(Email) ? "" : "<a href='mailto:" + Email + "'><i class='fas fa-envelope mr-3 align-baseline'>&nbsp;</i>" + Email + "</a><br/>" %}
        {% IsNullOrEmpty(Phone) ? "" : "<a href='tel:" + Phone.RegexReplace("[()\[\]\\\/\-\s*]", "") + "'><i class='fas fa-phone mr-3 align-baseline'>&nbsp;</i>" + Phone + "</a><br />" %}
        {% IsNullOrEmpty(MobilePhone) ? "" : "<a href='tel:" + MobilePhone.RegexReplace("[()\[\]\\\/\-\s*]", "") + "'><i class='fas fa-mobile-alt mr-3 align-baseline'>&nbsp;</i>" + MobilePhone + "</a>" %}
      </p>
    </div>    
  </div>
</div>

// CSS
.contacts .card-body {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    -webkit-transition: all .4s ease-in-out;
    transition: all .4s ease-in-out;
    -webkit-transform: translateY(calc(100% - 111));
    transform: translateY(calc(100% - 111px));
    -ms-transform: translateY(100%) translateY(-111px);
}
.contacts.card:hover .card-body {
  -webkit-transform: translateY(0);
    transform: translateY(0);
}