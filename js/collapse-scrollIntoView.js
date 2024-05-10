$(".card.p-1.lift").click(function () {
  $('html, body').animate({
    scrollTop: $(event.target).offset().top
  }, 1000);
});
