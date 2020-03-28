<div class="image-container animated flipInX pb-3 d-none d-lg-block" itemprop="image" itemscope itemtype="http://schema.org/ImageObject">
    {% IfEmpty(EventTeaserImage,"<img src='/1IM/oneingram-1.9.13/global/Logo_Blue_300x175.png' alt='"+ StripTags(NewsTitle) +"' class='img-contain'/>","<img src='/getattachment/" + EventTeaserImage + "?width=975&height=438' alt='" + EventTitle + "' srcset='/getattachment/" + EventTeaserImage + "?width=975&height=438 975w, /getattachment/" + EventTeaserImage + "?width=1950&height=876 1950w' class='img-contain' itemprop='url' />") #%}
</div>
<h1 class="border-bottom-0 d-block display-6 heading mb-2" itemprop="name">{% EventTitle %}</h1>
<div class="text-justify py-3" itemprop="description">
  {% EventDescription %}
</div>