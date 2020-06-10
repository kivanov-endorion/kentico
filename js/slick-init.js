<script type="text/javascript">
$(document).ready(function(){
  	$('.productCarousel').slick({
	  dots: true,
	  arrows: false,
	  slidesToShow: 4,
  	slidesToScroll: 1,
  	autoplay: true,
  	autoplaySpeed: 1500,
      draggable: true,
      pauseOnHover: true,
      responsive: [
      {
      breakpoint: 1400,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      }
    },
     {   
        breakpoint: 992,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
	});
});
</script>