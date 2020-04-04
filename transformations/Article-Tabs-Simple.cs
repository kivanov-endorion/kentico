{% if(DataItemIndex == 0)  { %}
<ul class="nav mb-3 flex-column flex-sm-row border-bottom" id="pills-tab" role="tablist">
    {% foreach (a in CurrentDocument.Children.Where("ClassName = 'CMS.SimpleArticle'")) {
    "<li class='nav-item text-truncate " + (if(a.NodeOrder=="1"){"active"}) + "'>"+
        "<a aria-controls='" + a.NodeAlias + "' aria-selected='" + (if(a.NodeOrder=="1"){"true"}else{"false"}) + "' class='nav-link caps px-2 " + (if(a.NodeOrder=="1"){"active show"}) + "' data-scroll-ignore data-toggle='pill' href='#" + a.NodeAlias + "' id='pills-" + a.ArticleID +"-tab' role='tab'>"+
            "<small>" + a.DocumentName + "</small>"+
        "</a>"+
    "</li>"
    } %}
</ul>
{% } %}

{% (DataItemIndex == 0)  ? "<div class='tab-content' id='pills-tabContent'>" : "" %}
    <div aria-labelledby="pills-{% ArticleID %}-tab" class="tab-pane fade {% (NodeOrder == 1)  ? "active show" : "" %}" id="{% NodeAlias %}" role="tabpanel">
        <div class='pt-3'>{% ArticleText %}</div>
    </div>
{% (DataItemIndex == DataItemCount - 1)  ? "</div>" : "" %}

// CSS
.nav-link {
  border-bottom: 2px solid transparent;
  transition: border-bottom .3s ease-in-out;
}
.nav-link.active, .nav-link:hover, .nav-link.focus {
  border-bottom: 2px solid #2f75bb;
}