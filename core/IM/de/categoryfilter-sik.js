
$(document).ready(function(){

     /*
    var category="{% 
    if(!IsNullOrEmpty(QueryString.subcategory)){
        QueryString.subcategory
    }else{
        QueryString.category
    }
    @%}";
    */

    
    var categoryID = getURLParam("categoryID");
    ArrayCategory = categoryID.split(",");
    

    for (n = 0; n < ArrayCategory.length; n++) {
        var me = $('#' + ArrayCategory[n]);

        //$('#' + ArrayCategory[n]).addClass("Highlighted");
        me.addClass("Highlighted");
        //me.siblings('[data-filter="all"]').removeClass('Highlighted'); //,[data-filter=""]
    }
   
    if('{% GetDocumentUrl().Split("/")[4]#%}' == ''){
        $("[data-category*='{%GetDocumentUrl().Split(" / ")[3]#%}']").addClass("active");
        $("[data-category*='{% GetDocumentUrl().Split("/")[3]#%}']").siblings(".periodic-table-box-small").addClass("active");
    }
    else
    {
        $("[data-category*='{%GetDocumentUrl().Split(" / ")[3]#%}']").addClass("active");
        $("[data-category*='{% GetDocumentUrl().Split("/")[4]#%}']").addClass("active");
    };


    /* Remove Contact button */
    $("#contact-button, #contacts").addClass("d-none");


    
 
   
}); // END Document ready function


// Create a closure
(function () {
    // Your base, I'm in it!
    var originalAddClassMethod = jQuery.fn.addClass;

    jQuery.fn.addClass = function () {
        // Execute the original method.
        var result = originalAddClassMethod.apply(this, arguments);

        // trigger a custom event
        jQuery(this).trigger('cssClassChanged');

        // return the original result
        return result;
    }
})();

// document ready function
$(function () {

    $('.CategoryListItem').on("cssClassChanged", function () {
        $("[data-filter='all']").removeClass("Highlighted");
        console.log("ClassRemoved");
    })

    $("#YourExampleElementID").bind('cssClassChanged', function () {
        //do stuff here
    });
});


function getURLParam(param) {
   
    var url = new URL(window.location);

    var query_string = url.search;

    var value = url.searchParams.get(param);

    return value;

}

function updateURL(param, value) {
    
    var url = new URL(window.location);

    var query_string = url.search;

    var search_params = new URLSearchParams(query_string);

    // new value of "id" is set to "101"
    search_params.set(param, value);

    // change the search property of the main url
    url.search = search_params.toString();

    // the new url string
    return url.toString();

}



/* ******************************************* 
    Isotope Filter
   ******************************************* */

var filters = {};

var categories = {};
var comboCategories;


  
var oPageInfo = {
            title: null,
            url: location.href
        }


$(function () {

    

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

    var categoryID = getURLParam("categoryID");
    if (categoryID) {
        ArrayCategory = categoryID.split(",");
        categories["ProductGroups"] = ArrayCategory;

        comboCategories = getComboFilter(categories);
        $("[id$='txtCategories_txtText']").val(comboCategories);
    }


    $('.cmdApplyFilter').click(function(e){
        e.preventDefault();

        //$("[id$='btnFilter']").trigger("click"); // you want to postback

        // Else, reload page with parameters
        window.location = updateURL("categoryID", comboCategories);

    });

    $('.CategoryListItem').click(function () {
        var my = $(this);
        var catID = my.attr("id");
        var optionSet = my.parents('.option-set');

        
       


        // store filter value in object
        // i.e. filters.color = 'red'
        var group = optionSet.attr('data-filter-group');


        if (my.attr('data-filter') == "all") {
            categories[group] = [];
        }

        if (!categories[group]) {
            categories[group] = [];
        }

        // check if element has already been selected
        var index = categories[group].indexOf(catID);

        if (index > -1) {
            // remove element from filters
            //categories[group].splice(index, 1);
            
        } else {
            // add element to filters
            /*
            if (group != 'vendors' && group != 'type') {
                categories[group] = [];
            }
            */
            categories[group].push(catID);
        }


        comboCategories = getComboFilter(categories);
        $("[id$='txtCategories_txtText']").val(comboCategories);
        console.log("Categories: " + comboCategories);


    });

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
         //console.log(filters[ group ].length);
         if (filters[ group ].length<2) {
            $this.siblings('[data-filter="all"],[data-filter=""]').addClass('Highlighted');
         }
         filters[ group ].splice(index, 1);
         $this.removeClass('Highlighted');
      } else {
          // add element to filters
          if(group!='vendors' && group!='type'){
               filters[ group ]=[];
          }
          filters[ group ].push($this.attr('data-filter'));
          $this.addClass('Highlighted');   
      }

      // convert object into array
      
      var isoFilters = [];
      for ( var prop in filters ) {
        if (filters[ prop ].length>0) {
          isoFilters.push( filters[ prop ] )
        }
      };
     
      if($this.attr('data-filter')=='all' || $this.attr('data-filter')==''){
          var selector = '';
          filters[ group ]=[];
          $this.addClass('Highlighted');
          $this.siblings('.Highlighted').removeClass('Highlighted');
      
      }else {
          var selector = isoFilters.join('');
          if(group!='vendors' && group!='type'){
            $this.siblings('.Highlighted').removeClass('Highlighted');
          }
          
          if(filters[ group ]!=""){
            $this.siblings('[data-filter="all"],[data-filter=""]').removeClass('Highlighted');
          }else{
            $this.siblings('[data-filter="all"],[data-filter=""]').addClass('Highlighted');
          }
            
      }
      
      var comboFilter = getComboFilter( filters );
      console.log("Combo: "+ comboFilter);
      
      // Create URL JSON string
      //var stringComboFilter = "/one-im-b4/services-and-trainings/training-and-enablement/solution-center/events#filter="+encodeURIComponent(JSON.stringify(filters));
      if(comboFilter!=""){
        var stringComboFilter = "#filter="+encodeURIComponent(JSON.stringify(filters));
      }else{
        var stringComboFilter = "#";
      }
      
      // Write current filters to URL hash
      var stateObj ={}
      //window.history.pushState({state:'new'}, 'Title', stringComboFilter);
      //window.history.replaceState(history.state, '', stringComboFilter);
      //window.history.replaceState({state:'new'}, '', stringComboFilter);
      //window.location.hash=stringComboFilter;
     
      //console.log("JSON: " + encodeURIComponent(JSON.stringify(filters)));
      
      $("[title='Email']").attr("href", "mailto:?subject=Events&body="+encodeURIComponent(window.location.href));
      
      
      $container.isotope({ filter: comboFilter });

      return false;
    });



    

    function setComboFilter(filters) {

        for (var prop in filters) {
       
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
    
      var comboFilter = comboFilters.join(',');
      
      return comboFilter;
    } // end function getComboFilter
  
    function getHashFilter() {
      // get filter=filterName
      var matches = location.hash.match( /filter=([^&]+)/i );
      var hashFilter = matches && matches[1];
      return hashFilter && decodeURIComponent( hashFilter );
    } // end function getHashFilter


  }); // END function



