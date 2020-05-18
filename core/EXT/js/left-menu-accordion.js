$(document).ready(function () {
    $('.second-menu-item').each(function() {
      if ($(this).next().is('ul.sub-menu')) {
          $(this).find('a').contents().unwrap();
          $(this).addClass('parent');
      }        
      $('.second-menu-item.Highlighted').next().css('display', 'block');
    });
    $('.parent.second-menu-item').click(function(e) {
      e.stopPropagation();
      $(this).toggleClass('Highlighted');
      var subMenu = $(this).next('ul');
      if ($(this).next().is('ul.sub-menu')) {
          $(this).siblings().next('ul').slideUp();
          $(this).siblings().removeClass('Highlighted');
      }
      subMenu.stop(true, true).slideToggle(400);
    });    
    $('.second-menu-item > ul > li').click(function (e) {
      e.stopImmediatePropagation();
    });
});