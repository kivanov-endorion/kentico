{% if(DataItemIndex == 0)  { %}
<ul class="nav nav-pills mb-5 nav-justified flex-md-row align-items-start" id="pills-tab" role="tablist">
    {% foreach (a in CurrentDocument.Children.Where("ClassName = 'CMS.Article'")) {
    "<li class='nav-item text-truncate " + (if(a.NodeOrder=="1"){"active"}) + "'>"+
        "<a aria-controls='" + a.NodeAlias + "' aria-selected='" + (if(a.NodeOrder=="1"){"true"}else{"false"}) + "' class='nav-link " + (if(a.NodeOrder=="1"){"active show"}) + "' data-scroll-ignore data-toggle='pill' href='#" + a.NodeAlias + "' id='pills-" + a.ArticleID +"-tab' role='tab'>"+
            "<i class='" + a.DocumentMenuItemImage + " display-6 d-block mx-auto pb-1'></i>"+
            "<small class='d-none d-lg-inline'>" + a.DocumentName + "</small>"+
        "</a>"+
    "</li>"
    } %}
</ul>
{% } #%}

{% (DataItemIndex == 0)  ? "<div class='tab-content' id='pills-tabContent'>" : "" %}
  <div aria-labelledby="pills-{% ArticleID %}-tab" class="tab-pane fade text-left {% (NodeOrder == 1)  ? "active show" : "" %}" id="{% NodeAlias %}" role="tabpanel">
      <div class="row">
          {%IsNullOrEmpty(ArticleTeaserImage) ? 
          Format("<div class='col-xs-12 pr-lg-5 w-100 px-5'><h2 class='py-3 text-center'>{0}</h2>{1}</div>", ArticleName, ArticleText) : Format("<div class='col-lg-6 col-xs-12 pr-lg-5'><h2>{0}</h2>{1}</div>"+
          "<div class='col-lg-6 col-xs-12 nojarallax rounded d-none d-lg-block' "+
          "style='background:url({2}) 50% 50%;'></div>", ArticleName, ArticleText, GetAttachmentUrlByGUID( ArticleTeaserImage, NodeAlias )) #%}
      </div>
  </div>
{% (DataItemIndex == DataItemCount - 1)  ? "</div>" : "" %}