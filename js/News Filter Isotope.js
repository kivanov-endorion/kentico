{/* Requires Isotope and "/1IMv2/ext/js/imagesloaded.pkgd.min-4.1.4.js" */}

$(document).ready(function(e) {
    $("#news-container").isotope({
		itemSelector: '.filter-item',
		layoutMode: 'fitRows'
    });
	$("#news-container").imagesLoaded(function() {
	  $("#news-container").isotope('layout');
	});
});

// RegEx on keyup
    var qsRegex;
    
    var $quicksearch = $('.quicksearch').keyup( debounce( function() {
    qsRegex = new RegExp( $quicksearch.val(), 'gi' );
 
    $("#news-container").isotope({filter: function() {
        return qsRegex ? $(this).find(".card-text, .card-title").text().match( qsRegex ) : true;
      }
    });
    $("#news-container").isotope();
    }, 200 ) );
  
// RegEx on load
$(document).ready(function(e) {
  qsRegex = new RegExp( $quicksearch.val(), 'gi' );
 
    $("#news-container").isotope({filter: function() {
        return qsRegex ? $(this).find(".card-text, .card-title").text().match( qsRegex ) : true;
      }
    });
    $("#news-container").isotope();
  });
// debounce so filtering doesn't happen every millisecond
function debounce( fn, threshold ) {
    var timeout;
    threshold = threshold || 100;
    return function debounced() {
        clearTimeout( timeout );
        var args = arguments;
        var _this = this;
        function delayed() {
        fn.apply( _this, args );
        }
        timeout = setTimeout( delayed, threshold );
    };
}
    
// Prevent page from submitting by hitting Enter
$(window).keydown(function(event){
    if(event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
});
  $(document).on("click", "#filters-container > div.month-name", function(e) {
    e.preventDefault();
    $("#filters-container > div.month-name").removeClass("Highlighted");
    $(this).addClass("Highlighted");
    
	if ($(this).attr("data-filter") == "") {
      $("#news-container").isotope({filter: ""});
    } else {
      $("#news-container").isotope({filter: "." + $(this).attr("data-filter") });
    }

  });
  
   $(document).on("click", "#years-filter > div.month-name", function(e) {
    e.preventDefault();
    $("#fyears-filter > div.month-name").removeClass("Highlighted");
    $(this).addClass("Highlighted");
    
	if ($(this).attr("data-filter") == "") {
      $("#filters-container").isotope({filter: ""});
    } else {
      $("#filters-container").isotope({filter: "." + $(this).attr("data-year") });
    }

  });