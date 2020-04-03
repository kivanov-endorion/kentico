// 1IM.ContainerB4.Navigation-Header
<ul aria-labelledby="btn-{% Documents[NodeAliasPath].Parent.NodeAlias.ToLower() %}" class="dropdown-menu shadow">

// oneIM.ContainerB4.Navigation-Footer
</ul>
</li>

// oneIM.ContainerB4.Navigation-Item-1 (NodeLevel = 0)
{% if(Documents[NodeAliasPath].Children.Where("ClassName = 'CMS.MenuItem' AND DocumentMenuItemHideInNavigation = ''").Count > 0) { %}
<li class="nav-item dropdown">
	<a class="{% IfCompare(DocumentName, CurrentDocument.DocumentName,"", "active") %}" href="{% GetNavigationUrl() %}" id="btn-{% NodeAlias.ToLower() %}" 
    {%IsNullOrEmpty(MenuItemTarget) ? "" : "target='" + MenuItemTarget + "' rel='noopener'" %} aria-expanded="false" aria-haspopup="true" class="nav-link dropdown-toggle" data-scroll-ignore data-toggle="dropdown">
      {% (MenuItemIconClass.Contains("fas-")) ? "" : "<i class='" + MenuItemIconClass + " mr-2'></i>" %}
      {% IsNullOrEmpty(DocumentMenuCaption) ? DocumentName : DocumentMenuCaption %}
	</a>
{% } else {%}
<li class="nav-item {% if(DocumentMenuItemInactive==true){ "disabled" } else {""} %}">
  <a class="nav-link" class="{% IfCompare(DocumentName, CurrentDocument.DocumentName,"", "active") %}" href="{% GetNavigationUrl() %}"{%IsNullOrEmpty(MenuItemTarget) ? "" : " target='" + MenuItemTarget + "' rel='noopener'" %}{% if(DocumentMenuRedirectUrl.ToString().Contains("#")) {" data-scroll"} else {" data-scroll-ignore"} %}>
      {% (MenuItemIconClass.Contains("fas-")) ? "" : "<i class='" + MenuItemIconClass + " mr-2'></i>" %} 
      {% IsNullOrEmpty(DocumentMenuCaption) ? DocumentName : DocumentMenuCaption %}
  </a>
</li>
{% } %}

// oneIM.ContainerB4.Navigation-Item-2 (NodeLevel = 1)
<li>
    <a class="align-items-center d-flex dropdown-item justify-content-between" href="{% GetNavigationUrl() %}"{%IsNullOrEmpty(MenuItemTarget) ? "" : " target='" + MenuItemTarget + "' rel='noopener'" %}>
        <span>{% IsNullOrEmpty(DocumentMenuCaption) ? DocumentName : DocumentMenuCaption %}</span>
        <span class="badge">
        {% countPublished = Documents[NodeAliasPath].Children.Where("DocumentCanBePublished = 1 AND GETDATE() BETWEEN ISNULL(DocumentPublishFrom, GETDATE()) AND ISNULL(DocumentPublishTo, GETDATE())").Count;
        if((Documents[NodeAliasPath].Parent.NodeAlias == "news") && (countPublished > 0)) { countPublished } else {""} %}
        </span>
    </a>
</li>