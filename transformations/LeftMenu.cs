
// DE.transformations.LeftMenu_FirstLevelItem
<li class='{% if(CurrentDocument.NodeAliasPath.Contains(NodeAliasPath)) { "second-menu-item Highlighted" } else { "second-menu-item" } #%} {% DocumentMenuClass %} {% if(DocumentMenuItemInactive==true){ "disabled" } else {""} #%}'>
  {% if(!DocumentMenuItemInactive){ %} 
  <a class="d-flex align-items-center justify-content-between {% IsNullOrEmpty(DocumentMenuRedirectUrl) ? "" : "ext" %}" href='{% GetNavigationUrl() %}'  {% IsNullOrEmpty(MenuItemTarget) ? "" : "target='" + MenuItemTarget + "'" %}>
  {% } #%}
  {%  MenuItemName %}
  {% if(!DocumentMenuItemInactive){ %}
  </a>
  {% } #%}
</li>

// DE.transformations.SecondLevelItem
<li class='{% IfCompare(NodeAliasPath, CurrentDocument.NodeAliasPath, "second-menu-item", "second-menu-item Highlighted") #%} {% if(DocumentMenuItemInactive==true){ "disabled" } else {""} #%}'>
  {% if(!DocumentMenuItemInactive){ %}
  <a class="d-flex align-items-center justify-content-between {% IsNullOrEmpty(DocumentMenuRedirectUrl) ? "" : "ext" %}" href='{% GetNavigationUrl() %}'   {% IfEmpty(MenuItemTarget,"","target='"+MenuItemTarget+"'") %} #%}>
  {% } #%}
    {% DocumentName %}
  {% if(!DocumentMenuItemInactive){ %}
  </a>
  {% } #%}
</li>

// JS
<script type="text/javascript">
  $(document).ready(function () {
    $('.second-menu-item').each(function () {
      $(this).next('ul').css('display', 'none');
      if ($(this).next().is('ul.sub-menu')) {
        $(this).find('a').contents().unwrap();
        $(this).append('<i class="fas fa-chevron-down float-right pt-1 text-primary"></i>');
      }
    });
    $('.sidebar a').each(function () {
      if (this.href == window.location.href) {
        var granddad = $(this).parent().parent();
        $(granddad).css('display', 'block');
        $(granddad).prev().find('i').removeClass('fa-chevron-down').addClass('fa-chevron-up');
        $(granddad).prev().addClass('Highlighted');
      }
    });
    $('.second-menu-item').click(function (e) {
      e.stopPropagation();
      $(this).find('i').toggleClass('fa-chevron-down').toggleClass('fa-chevron-up');
      var subMenu = $(this).next('ul');
      if ($(this).next().is('ul.sub-menu')) {
        $(this).siblings().next('ul').slideUp();
        $(this).siblings().find('i').toggleClass('fa-chevron-down').toggleClass('fa-chevron-up');
      }
      subMenu.stop(true, true).slideToggle(400);
    });    
    $('.second-menu-item > ul > li').click(function (e) {
      e.stopImmediatePropagation();
    });
  });
</script>