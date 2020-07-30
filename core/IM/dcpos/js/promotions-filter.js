$(document).ready(function(){

    $("#promotions-list>.filter-item").each(function(i){
        $(this).css('height','clamp(361px, 420px, 396px)');
        var vendorName = $(this).attr("data-vendor");
        var vendorFilter = vendorName.toLowerCase().replace(" ","-");
        console.log(vendorFilter);

        if($("#vendor-filter>li[data-filter='" + vendorFilter +"']").length === 0){
            $("#vendor-filter").append("<li class='CategoryListItem' data-filter='" + vendorFilter + "'>" + vendorName + "</li>");
        }
    });
    
    var $grid = $("#promotions-list").isotope({
        itemSelector : '.filter-item',
        layoutMode: 'fitRows'
    });
    
    $grid.imagesLoaded().progress( function() {
        $grid.isotope('layout');
    });

    var prevScrollTop = $(window).scrollTop()
    $(window).scroll(function () {
        var currentScrollTop = $(this).scrollTop()
        if (currentScrollTop >= prevScrollTop && currentScrollTop > 600) {
            $grid.isotope('layout');
        } else {
            return
        }
        prevScrollTop = currentScrollTop;
        $(window).off('scroll');
    });

    $(document).on("click", "#vendor-filter>li", function(e) {
        e.preventDefault();
        $("#vendor-filter> li").removeClass("Highlighted");
        $(this).addClass("Highlighted");
        if ($(this).attr("data-filter") == "") {
            $grid.isotope({filter: ""});
        } else {
            $grid.isotope({filter: "." + $(this).attr("data-filter")});
        }
    });

});

