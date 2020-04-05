// 1IM.ContainerB4.Card-Slider
<div class="carousel-item {% (DataItemIndex == 0) ? "active" : "" %}">
    <h6>{% ArticleTitle %}</h6>
    {% ArticleText %}
</div>

// 1IM Card Slider B4 web part container
<div class="card carousel slide {%ContainerCSSClass%}" data-interval="5000" data-keyboard="true" data-touch="true" data-pause="hover" data-ride="carousel" data-wrap="true" id="acc{% if(ID) { ID + LimitLength(StripTags(ContainerTitle).Replace(" ",""), 5, "", true) } else { WebpartControlID + LimitLength(StripTags(ContainerTitle).Replace(" ",""), 5, "", true) } %}">
    <div class="card-header bg-transparent border-bottom-0 flex-between">
        <h6 class="caps text-muted mb-0">{% ContainerTitle %}</h6>
        <div class="flex-between">
            <a class="card-carousel-control-prev" data-scroll-ignore data-slide="prev" data-target="#acc{% if(ID) { ID + LimitLength(StripTags(ContainerTitle).Replace(" ",""), 5, "", true) } else { WebpartControlID + LimitLength(StripTags(ContainerTitle).Replace(" ",""), 5, "", true) } %}" href="#acc{% if(ID) { ID + LimitLength(StripTags(ContainerTitle).Replace(" ",""), 5, "", true) } else { WebpartControlID + LimitLength(StripTags(ContainerTitle).Replace(" ",""), 5, "", true) } %}" role="button">
                <i aria-hidden="true" class="fas fa-chevron-left text-primary"></i>
                <span class="sr-only">Previous</span>
            </a>
            <a class="card-carousel-control-next" data-scroll-ignore data-slide="next" data-target="#acc{% if(ID) { ID + LimitLength(StripTags(ContainerTitle).Replace(" ",""), 5, "", true) } else { WebpartControlID + LimitLength(StripTags(ContainerTitle).Replace(" ",""), 5, "", true) } %}" href="#acc{% if(ID) { ID + LimitLength(StripTags(ContainerTitle).Replace(" ",""), 5, "", true) } else { WebpartControlID + LimitLength(StripTags(ContainerTitle).Replace(" ",""), 5, "", true) } %}" role="button">
                <i aria-hidden="true" class="fas fa-chevron-right text-primary"></i>
                <span class="sr-only">Next</span>
            </a>
        </div>
    </div>
    <div class="card-body carousel-inner">

    </div>
</div>