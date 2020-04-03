// Banners-DE-Services
{% if(DataItemIndex == 0) { "<div class='row pt-4 pb-3'>" } %}
    <div class="col-xxl-3 col-xl-4 col-lg-6 col-sm-12 mb-4">
           {% IsNullOrEmpty(SliderURL) ? "" : "<a href='" + SliderURL + "' target='" + SliderURLTarget + "'>" %}
            {% IsNullOrEmpty(SliderImage) ? "" : 
            Format("<img alt='{0}' class='img-fluid lift lazyload' data-src='{1}?width=446'>", DocumentName, GetAttachmentUrlByGUID( SliderImage, NodeAlias )) %}
          {% IsNullOrEmpty(SliderURL) ? "" : "</a>" }
    </div>
{% if(DataItemIndex == DataItemCount - 1) { "</div>" } %}