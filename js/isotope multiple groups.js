$(function(){
    
    var $container = $('#event-container'),
        filters = {};

    $container.isotope({
      itemSelector : '.filter-item',
      layoutMode: 'fitRows'
    });
    $container.isotope('layout');

    // filter buttons
    $('.month-name').click(function(){
      var $this = $(this);
      // don't proceed if already selected
      if ( $this.hasClass('Highlighted') ) {
        //$this.removeClass('Highlighted');
        return;
      }
      
      var $optionSet = $this.parents('.option-set');
      // change selected class
      $optionSet.find('.Highlighted').removeClass('Highlighted');      
      $this.addClass('Highlighted');
      
      
      // store filter value in object
      // i.e. filters.color = 'red'
      var group = $optionSet.attr('data-filter-group');
      filters[ group ] = $this.attr('data-filter');
      // convert object into array
      var isoFilters = [];
      for ( var prop in filters ) {
        isoFilters.push( filters[ prop ] );
      }
      var selector = isoFilters.join('');
      console.log(selector);
      $container.isotope({ filter: selector });

      return false;
    });

  });