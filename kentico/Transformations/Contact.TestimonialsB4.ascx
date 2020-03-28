{% if (DataItemIndex == 0) {"<div class='carousel slide' data-ride='carousel' id='testimonials'><div class='carousel-inner'>"} #%}
{% if (DataItemIndex == 0) {"<div class='carousel-item active'>"} else {"<div class='carousel-item'>"} #%}

<div class="card w-75 m-auto shadow">
    <div class="media flex-column flex-lg-row align-items-center">
        <img alt="{% Name %}"
             class="img-fluid d-none d-lg-inline justify-self-left align-self-start mr-1 "
             src="~/CMSPages/GetFile.aspx?guid={% Picture %}" />
        <div class="media-body p-4 text-center">
            <h4>{% Name %}</h4>
            <p class="mt-0">{% Speciality %}{% IfEmpty(Department,"",", " + Department +)%}</p>
            {% Description %}
      </div>
    </div>
</div>
</div>
{% if (DataItemIndex == DataItemCount - 1) { %}
</div>
<a class="carousel-control-prev" data-scroll-ignore data-slide="prev" data-target="#testimonials" href="#testimonials" role="button"><i class="fas fa-chevron-left text-primary fa-2x">&nbsp;</i></a>
<a class="carousel-control-next" data-scroll-ignore data-slide="next" data-target="#testimonials" href="#testimonials" role="button"><i class="fas fa-chevron-right text-primary fa-2x">&nbsp;</i></a>
</div>
{% } #%}