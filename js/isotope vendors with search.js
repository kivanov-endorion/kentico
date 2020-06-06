$(document).ready(function(e) {
  // Creating filters
    $(".vendorList > span").each(function(i) {
      var sLetter = $(this).attr("class").slice(-1);
      if ($(".vendorFilter > button[data-filter='" + sLetter + "']").length == 0) {
        $(".vendorFilter").append("<button class='btn btn-form' data-filter='" + sLetter + "'>" + sLetter.replace("0", "#") + "</button> ");
      }
    });
    var $first = $(".vendorFilter").find("button[data-filter]").attr("data-filter");
  
  // Init first group
    $(".vendorList").isotope({
      itemSelector: '.filterItem',
      layoutMode: 'fitRows',
      filter: '.startsWith' + $first
    });
    $("button[data-filter='"+$first+"']").addClass("btn-primary");
  
    // RegEx on keyup
     var qsRegex;
    
    var $quicksearch = $('.quicksearch').keyup( debounce( function() {
    qsRegex = new RegExp( $quicksearch.val(), 'gi' );
 
    $(".vendorList").isotope({filter: function() {
      
        return qsRegex ? $(this).text().match( qsRegex ) : true;
      }
    });
    $(".vendorList").isotope();
    }, 200 ) );

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
    
// Filter on click
  $(document).on("click", ".vendorFilter > button", function(e) {
    e.preventDefault();
    $(".vendorFilter > button").removeClass("btn-primary");
    $(this).addClass("btn-primary");
    if ($(this).attr("data-filter") == "") {
      $(".vendorList").isotope({filter: ""});
    } else {
      $(".vendorList").isotope({filter: ".startsWith" + $(this).attr("data-filter")});
      $(".vendorList").isotope();
    }
  });
  
  // Prevent page from submitting by hitting Enter
  $(window).keydown(function(event){
    if(event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
  });
  
});
