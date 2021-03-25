var hero_image;

$(document).ready(function () {
    0 != (hero_image = $('.berge')).length && $(window).on("scroll", custom.checkScrollForParallax)
}), custom = {
    checkScrollForParallax: function () {
        oVal = $(window).scrollTop() / 25, hero_image.css({
            backgroundPositionX: "" + oVal + "px"
        })
    }
};

$('.past').click(function(e) {
  $(this).addClass('door-open');
  $(this).find('a').addClass('animated swing');
  $(this).find('a').attr('href', function() {
    return $(this).data('target');        
  }, 2000);
});
  
  

$('.flip-card').on("click", function () {
    $(this).toggleClass("is-flipped");
})
