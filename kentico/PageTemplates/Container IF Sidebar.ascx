{% if(ViewMode=="LiveSite") { %}
{% (MenuItemSidebar!="none" ? "<section class=\"py-3 mt-5\"><div class=\"container\">" : "" ) %}
{% (MenuItemSidebar=="left" ? "<div class=\"row align-items-start flex-lg-row\">" : "" ) %}{% (MenuItemSidebar=="right" ? "<div class=\"row align-items-start flex-lg-row-reverse\">" : "" ) %}
{% (MenuItemSidebar!="none" ? "<aside class=\"sidebar col-lg-3  align-self-stretch mb-4 mx-auto pr-lg-4\">" : "" ) %}
{% } #%}

SIDEBAR

{% if(ViewMode=="LiveSite") { %}
{% (MenuItemSidebar!="none" ? "</aside>" : "" ) %}
{% } #%}



{% if(ViewMode=="LiveSite") { %}
{% (MenuItemSidebar!="none" ? "<article class=\"article col-lg-9 mb-2\">" : "" ) %}
{% } #%}

ARTICLE

{% if(ViewMode=="LiveSite") { %}
{% (MenuItemSidebar!="none" ? "</article>" : "" ) %}
{% (MenuItemSidebar!="none" ? "</div>" : "" ) %}
{% (MenuItemSidebar!="none" ? "</div></section>" : "" ) %}
{% } #%}