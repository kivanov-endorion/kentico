$(document).ready(function(){
        $(window).scroll(function() {
          // checks if window is scrolled more than 500px, adds/removes solid class
          if($(this).scrollTop() > 200) { 
              $('.navbar').addClass('bg-primary');
          } else {
              $('.navbar').removeClass('bg-primary');
          }
        });
  
  $(document).on('click', '.cta', function () {
      $(this).toggleClass('active');
  });
});