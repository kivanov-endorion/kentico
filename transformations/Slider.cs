{% if (DataItemIndex == 0) { %}
<div class="carousel slide d-none d-md-block" data-ride="carousel" data-interval="0" data-pause="hover" data-wrap="true" data-keyboard="true"
    id="slide{% DataItemCount %}">
    <div class="carousel-inner" style="height: 400px;">
{% } %}
      <div class="carousel-item {% if(DataItemIndex == 0) {"active"} %} {% if (SliderOverlay!="none") { "img-overlay " + SliderOverlay } %}">
        <div class="text-center">
          {% IsNullOrEmpty(SliderURL) ? "" : "<a href='" + SliderURL + "' target='" + SliderURLTarget + "'>"%}
            <img src="{% GetAttachmentUrlByGUID( SliderImage, NodeAlias ) %}" alt class="img-cover">
            {% if (SliderText) { %}
            <div class="carousel-caption d-none d-md-block">
              {% SliderText %}
            </div>
            {% } %}
          {% IsNullOrEmpty(SliderURL) ? "" : "</a>" %}
        </div>
      </div>
 {% if (DataItemIndex == DataItemCount - 1) { %}
      {% if (DataItemCount > 1) { %}
      <a class="carousel-control-prev animated fadeIn" data-scroll-ignore href="#slide{% DataItemCount %}" data-target="#slide{% DataItemCount %}"
            role="button" data-slide="prev">
            <i class="fas fa-chevron-left text-primary fa-2x opacity" aria-hidden="true"></i>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next animated fadeIn" data-scroll-ignore href="#slide{% DataItemCount %}" data-target="#slide{% DataItemCount %}"
            role="button" data-slide="next">
            <i class="fas fa-chevron-right text-primary fa-2x opacity" aria-hidden="true"></i>
            <span class="sr-only">Next</span>
        </a>
      {% } %}
    </div>
</div>
{% } %}