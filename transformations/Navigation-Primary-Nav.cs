// oneIM.Container.NavigationHeader_B4
<ul aria-labelledby="nav-{% Documents[NodeAliasPath].Parent.NodeAlias.ToLower() %}" class="dropdown-menu shadow flipInTop">

// oneIM.Container.NavigationFooter_B4
</ul>
</li>

// oneIM.Container.NavigationItem_B4_1 (NodeLevel = 0)
{% if(Documents[NodeAliasPath].Children.Where("ClassName = 'CMS.MenuItem' AND DocumentMenuItemHideInNavigation = ''").Count > 0 && CurrentSite.SiteId != 4) { %}
<li class="nav-item dropdown{% IfCompare(NodeAlias, CurrentDocument.Parent.NodeAlias, "", " active") %}" {% DocumentMenuClass %}>
	<a href="{% GetNavigationUrl() %}" id="{% NodeAlias.ToLower() %}" aria-expanded="false" aria-haspopup="true" class="nav-link dropdown-toggle" data-scroll-ignore data-toggle="dropdown">
		{% (DocumentMenuCaption) ? DocumentMenuCaption : DocumentName %}
	</a>
{% } else {%}
  
  <li class="nav-item{% IfCompare(NodeAlias, CurrentDocument.NodeAlias,"", " active") %}{% if(DocumentMenuItemInactive==true){ " disabled" } else {""} %} {% DocumentMenuClass %}">
    <a class="nav-link" href="{% GetNavigationUrl() %}" id="{% NodeAlias.ToLower() %}"{% if(MenuItemTarget != "") {" target='" + MenuItemTarget + "' rel='noopener'"} else {""} %}{% if(DocumentMenuRedirectUrl.ToString().Contains("#")) {" data-scroll"} else {" data-scroll-ignore"} %}>
		{% (DocumentMenuCaption) ? DocumentMenuCaption : DocumentName %}
    </a>
  </li>
{% } %}

// oneIM.Container.NavigationItem_B4_2 (NodeLevel = 1)
{% if(DocumentMenuClass.Contains("divider") {"<div class='dropdown-divider'></div>"} %}
<li>
    <a class="align-items-center d-flex dropdown-item justify-content-between {% DocumentMenuClass %}" href="{% GetNavigationUrl() %}"{% if(MenuItemTarget != "") {" target='" + MenuItemTarget + "' rel='noopener'"} else {""} %}>
        <span>{% (DocumentMenuCaption) ? DocumentMenuCaption : DocumentName %}</span>
        <span class="badge">{% countPublished = Documents[NodeAliasPath].Children.Where("DocumentCanBePublished = 1 AND GETDATE() BETWEEN ISNULL(DocumentPublishFrom, GETDATE()) AND ISNULL(DocumentPublishTo, GETDATE())").Count;
        if((Documents[NodeAliasPath].Parent.NodeAlias.ToLower() == "news") && (countPublished > 0)) { countPublished } else {""} %}
        </span>
    </a>
</li>