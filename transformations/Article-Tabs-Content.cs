// Article-Tabs-Content
{% (DataItemIndex == 0)  ? "<div class='tab-content' id='pills-tabContent'>" : "" %}
  <div aria-labelledby="pills-{% DataItemIndex + 1%}-tab" class="tab-pane fade text-left {% (DataItemIndex == 0)  ? "active show" : "" %}" id="{% NodeAlias %}" role="tabpanel">
      <div class="row">
          {%IsNullOrEmpty(ArticleTeaserImage) ? 
          Format("<div class='col-xs-12 pr-lg-5 w-100 bg-light text-center px-5 shadow'><h2 class='display-5 py-5 text-center'>{0}</h2>{1}</div>", ArticleName, ArticleText) : 
          Format("<div class='col-lg-6 col-xs-12 pr-lg-5'><h2>{0}</h2>{1}</div>"+
          "<div class='col-lg-6 col-xs-12 nojarallax rounded d-none d-lg-block' "+
          "style='background:url({2}) 50% 50%;'></div>", ArticleName, ArticleText, GetAttachmentUrlByGUID( ArticleTeaserImage, NodeAlias )) %}
      </div>
  </div>
{% (DataItemIndex == DataItemCount - 1)  ? "</div>" : "" %}