$(document).ready(function(){
	$(window).scroll(function(){
		$('.header-bg').css("opacity", 1 - $(window).
		scrollTop() / 700);
	});
});