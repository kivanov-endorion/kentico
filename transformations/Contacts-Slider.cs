{% if (DataItemIndex == 0) {"<div class='carousel slide' data-ride='carousel' id='contact-cards'><div class='carousel-inner'>"} %}
{% if (DataItemIndex == 0) {"<div class='carousel-item active'>"} else {"<div class='carousel-item'>"} %}
<div class="card m-auto shadow" style="width: 550px;">
    <div class="media flex-column flex-lg-row align-items-center">
      {%IsNullOrEmpty(Picture) ? "" : 
      Format("<img alt='{0}'class='img-fluid d-none d-lg-inline justify-self-left align-self-start mr-1' src='{1}?width=200' style='width: 12em;' />", Name, GetAttachmentUrlByGUID( Picture, NodeAlias )) %}    
      <div class="media-body text-truncate">
          <div class="card-body">
            <strong>{% Name %}</strong>
            <p class="text-truncate small">{% Speciality %}{% IsNullOrEmpty(Department) ? "" : ", " + Department %}</p>
            <p class="text-truncate">
              {% IsNullOrEmpty(MobilePhone) ? "" : "<a href='tel:" + MobilePhone + "'><i class='fas fa-phone mr-3 align-baseline text-muted fa-sm'></i>" + MobilePhone + "</a><br/>" %}
              {% IsNullOrEmpty(Phone) ? "" : "<a href='tel:" + Phone + "'><i class='fas fa-phone mr-3 align-baseline text-muted fa-sm'></i>" + Phone + "</a><br/>" %}
              {% IsNullOrEmpty(Email) ? "" : "<a href='mailto:" + Email + "'><i class='fas fa-envelope mr-3 align-baseline text-muted fa-sm'></i>" + Email + "</a><br/>" %}
              {% IsNullOrEmpty(Profile) ? "" : "<a href='" + Profile + "'><i class='fab fa-linkedin mr-3 align-baseline text-muted fa-sm'></i>" + Profile + "</a>" %}
            </p>
          </div>
      </div>
    </div>
</div>
</div>
{% if (DataItemIndex == DataItemCount - 1) { %}
</div>
{% if (DataItemCount > 1 ) { %}
<a class="carousel-control-prev" data-scroll-ignore data-slide="prev" data-target="#contact-cards" href="#contact-cards" role="button"><i class="fas fa-chevron-left text-primary fa-2x"></i></a>
<a class="carousel-control-next" data-scroll-ignore data-slide="next" data-target="#contact-cards" href="#contact-cards" role="button"><i class="fas fa-chevron-right text-primary fa-2x"></i></a>
{% } %}
</div>
{% } %}