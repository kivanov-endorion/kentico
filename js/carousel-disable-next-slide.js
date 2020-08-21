$('.carousel').carousel('pause');
$('.carousel-indicators li:nth-child(2), .carousel-indicators li:nth-child(3)').addClass('disabled');

$('.carousel').carousel({
    wrap: false
  }).on('slid.bs.carousel', function () {
      activeSlide = $('.active');
    if(activeSlide.is( ':first-child' )) {
       $('.carousel-control-prev').hide();
       $('.carousel-control-next').show();
       return;
    } else {
       $('.carousel-control-prev').show();
    }

    if (activeSlide.is( ':nth-child(2)' )) {
       $('.carousel-control-next').hide();
       $('.carousel-control-prev').show();
       return;
    } else {
       $('.carousel-control-next').show();
    }
  });
