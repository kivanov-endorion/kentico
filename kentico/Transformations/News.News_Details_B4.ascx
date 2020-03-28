<div class="image-container animated flipInX pb-3 d-none d-lg-block" itemprop="image" itemscope itemtype="http://schema.org/ImageObject">
    {% IfEmpty(NewsTeaser,"<img src='~/1IM/oneingram-1.9.13/global/Logo_Blue_300x175.png' alt='"+ StripTags(NewsTitle) +"'
        class='img-fluid' />","<img src='~/getattachment/" + NewsTeaser + "?width=975&height=438' alt='" + NewsTitle + "'
        srcset='~/getattachment/" + NewsTeaser + "' alt='" + NewsTitle + "?width=975&height=438, ~/getattachment/" + NewsTeaser + "'
        alt='" + NewsTitle + "?width=1950&height=876 2x' class='img-contain' itemprop='url' />") #%}
</div>
<h1 class="border-bottom-0 d-block display-6 heading mb-2" itemprop="headline">{% NewsTitle %}</h1>
<time class="small text-muted" itemprop="datePublished" datetime="{% FormatDateTime(NewsReleaseDate,"
    yyyy-MM-dd:HH-mm-ss") %}"><i class="far fa-calendar">&nbsp;</i>&ensp;{% FormatDateTime(NewsReleaseDate,
    GetResourceString("oneIM.Localdate.long")#%}</time> | {%CurrentDocument.Tags.Transform("<a class='badge badge-pill badge-light text-uppercase'
    href='/special-pages/search?searchtext={#DisplayName#}'>{#DisplayName#}</a>") #%}
<div class="text-justify py-3" itemprop="articleBody">{% NewsText %}</div>
<meta itemprop="author" content="Ingram Micro">
<meta itemprop="inLanguage" content="{%CurrentCulture%}">
<meta itemprop="dateModified" content="{%FormatDateTime(DocumentModifiedWhen," yyyy-MM-dd:HH-mm-ss")%}">