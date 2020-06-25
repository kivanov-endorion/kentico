<section id="{% IsNullOrEmpty(ContainerTitle) ? "slickslider" + GetRandomInt() : ContainerTitle %}" class="{% ContainerCSSClass %}">
  □
</section>

<link type="text/css" rel="stylesheet" href="/1IMv2/ext/css/slick-1.8.1.css">
<script src="/1IMv2/ext/js/slick.min-1.6.0.js"></script>

<script>
$(document).ready(function(){
  $('#{% IsNullOrEmpty(ContainerTitle) ? "slickslider" + GetRandomInt() : ContainerTitle %}').slick({
    dots: true,
    dotsClass: 'carousel-indicators dropped',
    arrows: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    accessibility: true,
    autoplay: true,
    autoplaySpeed: 6000,
    draggable: true,
    fade: false,
    pauseOnHover: true,
    swipe: true
  });
});
</script>