var filters={};

$(function(){
    
    var $container = $('#event-container');


    $container.isotope({
      itemSelector : '.filter-item',
      layoutMode: 'fitRows'
    });
    $container.isotope('layout');
  
    // Read filter settings form URL hash parameter and apply
    var jsonFlt = JSON.parse(getHashFilter());
    if(jsonFlt){
     filters=jsonFlt;
     
      setComboFilter(filters);
      var comboFilter = getComboFilter( filters );
      $container.isotope({ filter: comboFilter });
    }
      

    // filter buttons
    $('.month-name').click(function(){
      var $this = $(this);
      var $optionSet = $this.parents('.option-set');
      var element = $this.attr('data-filter');
      
      
      // store filter value in object
      // i.e. filters.color = 'red'
      var group = $optionSet.attr('data-filter-group');
         
      if(! filters[ group ]){
        filters[ group ]=[];
      }
      
       // check if element has already been selected
      var index = filters[ group ].indexOf(element);
            
      // if found
      //if ((index > -1)&&(filters[ group ].length>1)) {
     if (index > -1) {
         // remove element from filters
         console.log(filters[ group ].length);
         if (filters[ group ].length<2) {
            $this.siblings('[data-filter="all"],[data-filter=""]').addClass('Highlighted');
         }
         filters[ group ].splice(index, 1);
         $this.removeClass('Highlighted');
      }else{
          // add element to filters
          if(group!='vendors' ){
               filters[ group ]=[];
          }
          filters[ group ].push($this.attr('data-filter'));
          $this.addClass('Highlighted');   
      }

      // convert object into array
      
      var isoFilters = [];
      for ( var prop in filters ) {
        if (filters[ prop ].length>0) {
          isoFilters.push( filters[ prop ] );
        }
      }
      
      var selector = '';
      if($this.attr('data-filter')=='all' || $this.attr('data-filter')==''){
          
          filters[ group ]=[];
          $this.addClass('Highlighted');
          $this.siblings('.Highlighted').removeClass('Highlighted');
      
      }else {
          //var selector = isoFilters.join(', ');
          selector = isoFilters.join('');
          if(group!='vendors' ){
            $this.siblings('.Highlighted').removeClass('Highlighted');
          }
          if(selector!=""){
            $this.siblings('[data-filter="all"],[data-filter=""]').removeClass('Highlighted');
          }else{
            $this.siblings('[data-filter="all"],[data-filter=""]').addClass('Highlighted');
          }
         
      }
      
      var comboFilter = getComboFilter( filters );
      
      // Create URL JSON string
      //var stringComboFilter = "/one-im-b4/services-and-trainings/training-and-enablement/solution-center/events#filter="+encodeURIComponent(JSON.stringify(filters));
      var stringComboFilter = "#filter="+encodeURIComponent(JSON.stringify(filters));
      
      // Write current filters to URL hash
      var stateObj = {};
      window.history.pushState(stateObj, 'Title', stringComboFilter);
      
      console.log("Combo: "+ comboFilter);
      console.log("JSON: " + encodeURIComponent(JSON.stringify(filters)));
      
      $("[title='Email']").attr("href",stringComboFilter);
      
      
      $container.isotope({ filter: comboFilter });

      return false;
    });
  
   function setComboFilter ( filters) {
     
     for ( var prop in filters ) {
       
         console.log(prop+": "+ filters[ prop ]);
         var items = filters[ prop ].toString().split(",");
         //var items = filters[ prop ];
         
         for ( var i in items ) {
           $("[data-filter-group='"+prop+"']").find("[data-filter='"+items[i]+"']").addClass("Highlighted");
           $("[data-filter-group='"+prop+"']").find('[data-filter="all"],[data-filter=""]').removeClass('Highlighted');
           //console.log(items[i]);
         }       
     }
     
     
   } // end function setComboFilter
  
   function getComboFilter( filters ) {
      var i = 0;
      var comboFilters = [];
      var message = [];
    
        for ( var prop in filters ) {
        message.push( filters[ prop ].join(' ') );
        var filterGroup = filters[ prop ];
        // skip to next filter group if it doesn't have any values
        if ( !filterGroup.length ) {
          continue;
        }
        if ( i === 0 ) {
          // copy to new array
          comboFilters = filterGroup.slice(0);
        } else {
          var filterSelectors = [];
          // copy to fresh array
          var groupCombo = comboFilters.slice(0); // [ A, B ]
          // merge filter Groups
          for (var k=0, len3 = filterGroup.length; k < len3; k++) {
            for (var j=0, len2 = groupCombo.length; j < len2; j++) {
              filterSelectors.push( groupCombo[j] + filterGroup[k] ); // [ 1, 2 ]
            }
    
          }
          // apply filter selectors to combo filters for next group
          comboFilters = filterSelectors;
        }
        i++;
      }
    
      var comboFilter = comboFilters.join(', ');
      
      return comboFilter;
    } // end function getComboFilter
  
    function getHashFilter() {
      // get filter=filterName
      var matches = location.hash.match( /filter=([^&]+)/i );
      var hashFilter = matches && matches[1];
      return hashFilter && decodeURIComponent( hashFilter );
    } // end function getHashFilter


  });