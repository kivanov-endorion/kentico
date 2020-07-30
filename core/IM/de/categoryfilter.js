    
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


    $('.cmdReset').click(function (e) {
        e.preventDefault();

        $.blockUI({
            message: "<div class='spinner-border text-primary' role='status'><span class='sr-only'>{$ 1IM.RMAForm.PleaseWait $}</span></div>",
            css: {
                background: "none",
                border: "none",
                color: "#f4f4f4"
            }
        });


        window.location = window.location.href.split('?')[0];




    });


    $('.cmdTest').click(function (e) {
        e.preventDefault();

        $('#FilterbyMonth_checkbox').click();



    });

    $('.custommenulink').click(function (e) {
       // $(this).removeClass("pulse");

    });

    /*
    var categoryID = getURLParam("categoryID");
    if (categoryID != "") {
        ArrayCategory = categoryID.split("|");
    }

    

    for (n = 0; n < ArrayCategory.length; n++) {

        ArrayItem = ArrayCategory[n].split(",");


        for (z = 0; z < ArrayItem.length; z++) {


            var me = $('#' + ArrayItem[z]);



            //$('#' + ArrayCategory[n]).addClass("Highlighted");
            //me.addClass("Highlighted");
            console.log("Trigger click: "+ArrayItem[z]);
            me.click();

            //me.siblings('[data-filter="all"]').removeClass('Highlighted'); //,[data-filter=""]
        }
    }
   
 */
   
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
    /*
    $('.CategoryListItem').on("cssClassChanged", function () {
        $("[data-filter='all']").removeClass("Highlighted");
        console.log("ClassRemoved");
    })

    $("#YourExampleElementID").bind('cssClassChanged', function () {
        //do stuff here
    });
    */
});


function getURLParam(param) {
   
    var url = new URL(window.location);

    var query_string = url.search;

    var value = url.searchParams.get(param);

    return value;

}

function getAllURLParam() {
    /*
    var url = new URL(window.location);

    var query_string = url.search;

    //var value = url.searchParams.get(param);



    return url.searchParams.getAll;
    */

    var keyPairs = [],
        params = window.location.search.substring(1).split('&');
    for (var i = params.length - 1; i >= 0; i--) {
        keyPairs.push(params[i].split('='));
    };
    return keyPairs;

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

var addUrlParam = function (search, key, val) {
    var newParam = key + '=' + val;
    //var params = '?' + newParam;
    var params="";
    console.log("AddURLParams");

    // If the "search" string exists, then build params from it
    if (search) {
        // Try to replace an existance instance

        if (search.match(new RegExp('([?&])' + key))) {

            search = search.replace(new RegExp('([?&])' + key + '[^&]*'), '$1' + newParam);
        } else {
            search += '&' + newParam;

        }



        // If nothing was replaced, then add the new param to the end
        if (params === search) {
            //params += '&' + newParam;
        }
    } else {
        search += '?' + newParam;

    }

   
    
    return search;
};



/* ******************************************* 
    Isotope Filter
   ******************************************* */

var filters = {};

var categories = {};
var attributes = {};
var comboCategories;


/*  
var oPageInfo = {
            title: null,
            url: location.href
        }
*/

$(function () {
//$(document).ready(function () {

    
    /*
    var $container = $('#event-container');


    $container.isotope({
      itemSelector : '.filter-item',
      layoutMode: 'fitRows'
    });
    $container.isotope('layout');
    */

    // Read filter settings form URL hash parameter and apply
    /*
    var jsonFlt = JSON.parse(getHashFilter());
    if(jsonFlt){
      filters=jsonFlt;
     
      setComboFilter(filters);
      var comboFilter = getComboFilter( filters );
      $container.isotope({ filter: comboFilter });
    }
    */

    var categoryID = "";
    var ArrayCategory = [];
    var ArrayAttributes = [];

    var FilterActive = false;


    categoryID = getURLParam("categoryID");
    if ((categoryID != "") && (categoryID != null)) {
        ArrayCategory = categoryID.split("|");

        // clean up the array from the URL params
        temp = [];
        for (let i of ArrayCategory)
            i && temp.push(i); // copy each non-empty value to the 'temp' array

        ArrayCategory = temp;
    }

    ArrayAttributes = getAllURLParam();

    //attributes=ArrayAttributes;

    //console.log(attributes);

    for (n = 0; n < ArrayAttributes.length; n++) {
        console.log("Read Params");
        if (ArrayAttributes[n] != "") {
        console.log(ArrayAttributes[n]);


        if (ArrayAttributes[n][0] != "categoryID") {
            
            console.log("Key:Val = " + ArrayAttributes[n][0] + " : "+ ArrayAttributes[n][1]);
            
            attributes[ArrayAttributes[n][0]] = [];

            items = ArrayAttributes[n][1].split(",");

            var optionSet = ArrayAttributes[n][0];
            var optionSetCount = items.length;
                       
            $("[data-filter-group='" + optionSet + "']").parent().find("h6").append("<span class='badge badge-pill badge-dark ml-2'>" + optionSetCount + "</span>");
            $("[data-filter-group='" + optionSet + "']").parent().find('[data-filter="all"],[data-filter=""]').removeClass('Highlighted');
            $("[data-filter-group='" + optionSet + "']").parent().find("input").click();


            for (z = 0; z < items.length; z++) {
                $("[data-filter='" + items[z] + "']").addClass("Highlighted");
               
                attributes[ArrayAttributes[n][0]].push(items[z]);
            }

            
            console.log("Att: " + attributes);

            FilterActive = true;

  
            
            //$("[data-filter=""]")


            }

        }

    }




    for (n = 0; n < ArrayCategory.length; n++) {

        ArrayItem = ArrayCategory[n].split(",");


        for (z = 0; z < ArrayItem.length; z++) {


            var me = $('#' + ArrayItem[z]);

            console.log("Trigger click: " + ArrayItem[z]);

            console.log($('#' + ArrayItem[z] + '.CategoryListItem').text());

            var catID = ArrayItem[z];
            var optionSet = me.parents('.option-set');

            var group = optionSet.attr('data-filter-group');

            if (!categories[group]) {
                categories[group] = [];
            }

            categories[group].push(catID);
            me.addClass("Highlighted");

            var optionSetCount = ArrayItem.length;

            //$("[data-filter-group='" + group + "']").addClass("show");
            if ($("[data-filter-group='" + group + "']").parent().find("span.badge").text() == ""){
                $("[data-filter-group='" + group + "']").parent().find("h6").append("<span class='badge badge-pill badge-dark ml-2'>" + optionSetCount + "</span>");
            }
            $("[data-filter-group='" + group + "']").find('[data-filter="all"]').removeClass('Highlighted'); 

            if (z == 0) {
                $("[data-filter-group='" + group + "']").parent().find("input").click();

                FilterActive = true;
            }


            

        }
    }   

    if (FilterActive == true) {

        $("#h1badge").html("Gefilterte Suchergebnisse: ");

        $("a.custommenulink").addClass("pulse");
        //$("a.custommenulink > i").addClass("pulse");


    } else {
        $(".custommenulink").toggleClass('is-open');
        $(".custom-slide-menu").toggleClass('slide-menu-open');   


    }

    var categoryID = getURLParam("categoryID");
    /*
    if (categoryID != "") {
        ArrayCategory = categoryID.split(",");

        for (n = 0; n < ArrayCategory.length; n++) {
            categories["ProductGroups"].push(ArrayCategory[n]);
        }

        comboCategories = getComboFilter(categories);
        $("[id$='txtCategories_txtText']").val(comboCategories);

    }
    */

  
    if (categoryID) {
        //ArrayCategory = categoryID.split(",");
        //categories["ProductGroups"] = ArrayCategory;
        //categories["categoryID"] = ArrayCategory;
       

        comboCategories = getComboFilter(categories);
        $("[id$='txtCategories_txtText']").val(comboCategories);
    }
    

    $('.cmdApplyFilter').click(function(e){
        e.preventDefault();
        console.log("Add Parameters");

        $.blockUI({
            message: "<div class='spinner-border text-primary' role='status'><span class='sr-only'>{$ 1IM.RMAForm.PleaseWait $}</span></div>",
            css: {
                background: "none",
                border: "none",
                color: "#f4f4f4"
            }
        });

        //$("[id$='btnFilter']").trigger("click"); // you want to postback

        // Else, reload page with parameters

        //params = document.location.search;
        var params = "";
        if (comboCategories !== undefined) {
            params = addUrlParam(params, "categoryID", comboCategories);
        }
       

        for (var prop in attributes) {

            console.log("Attr: " + prop);
            console.log("Val: " + attributes[prop]);

            if (attributes[prop] !== undefined) {
                params = addUrlParam(params, prop, attributes[prop]);
            }
        }

        params = params.replace(/[^=&]+=(&|$)/g, "").replace(/&$/, "");

        console.log("URL params: " + params);

        window.location=document.location.pathname + params;
                

    });

    $('.CategoryListItem').click(function (e) {

        console.log("CategoryListItem Click");

        var my = $(this);
        //var my = $(e.target);
        var catID = my.attr("id");
        var optionSet = my.parents('.option-set');
             
        // store filter value in object
        // i.e. filters.color = 'red'
        var group = optionSet.attr('data-filter-group');

        //group="categoryID"

        if (my.attr('data-filter') == "all") { //  || my.attr('data-filter') == "" || my.attr('data-filter') === undefined

            categories[group] = [];
            comboCategories = getComboFilter(categories);

            my.addClass("Highlighted");
            my.parent().find("li.Highlighted").removeClass('Highlighted');
                                             
            $("[id$='txtCategories_txtText']").val(comboCategories);

            e.stopPropagation();

            return;

        }

        if (!categories[group]) {
            categories[group] = [];
        }

        // check if element has already been selected
        var index = categories[group].indexOf(catID);

        console.log("Add Highlight");

        if (index > -1) {
            // remove element from filters
            categories[group].splice(index, 1);
            my.removeClass("Highlighted ");
           
            $("[data-filter-group='" + group + "']").find('[data-filter="all"],[data-filter=""]').addClass('Highlighted');
            
        } else {
            // add element to filters
            categories[group].push(catID);
            my.addClass("Highlighted");
            //my.parent().parent().find('[data-filter="all"],[data-filter=""]').removeClass('Highlighted');

            $("[data-filter-group='" + group + "']").find('[data-filter="all"],[data-filter=""]').removeClass('Highlighted');
        }

     

        comboCategories = getComboFilter(categories);
        $("[id$='txtCategories_txtText']").val(comboCategories);

        console.log("Categories: " + categories);

        e.stopPropagation();
    });

    $('.month-name').click(function (e) {



        var my = $(this);
        //var my = $(e.target);
        var catID = my.attr("data-filter");
        var optionSet = my.parents('.option-set');

        // store filter value in object
        // i.e. filters.color = 'red'
        var group = optionSet.attr('data-filter-group');

        //group="categoryID"

        if (my.attr('data-filter') == "all" || my.attr('data-filter') == "" || my.attr('data-filter') === undefined) {

            attributes[group] = [];

            my.addClass("Highlighted");
            my.siblings().removeClass('Highlighted');

            $('#CurSelection').text(JSON.stringify(attributes));

            $("[id$='txtAttributes_txtText']").val(JSON.stringify(attributes))

            e.stopPropagation();

            return;

        }

        // else go ahead with others


        if (!attributes[group]) {
            attributes[group] = [];
        }

        // check if element has already been selected
        var index = attributes[group].indexOf(catID);

        console.log("Items in Object: " + index);

        if (index > -1) {
            // remove element from filters
            attributes[group].splice(index, 1);
        
            if (attributes[group].length == 0) {
                attributes[group] = undefined;
                my.siblings('[data-filter="all"],[data-filter=""]').addClass('Highlighted');
            }

            my.removeClass("Highlighted");

        } else {
            // add element to filters
            attributes[group].push(catID);
            my.addClass("Highlighted");
            my.siblings('[data-filter="all"],[data-filter=""]').removeClass('Highlighted');
            console.log("#Items: " + attributes[group].length);
        }



        //comboCategories = getComboFilter(categories);
        //$("[id$='txtCategories_txtText']").val(comboCategories);

        console.log("Categories: " + attributes);

        $('#CurSelection').text(JSON.stringify(attributes));

        $("[id$='txtAttributes_txtText']").val(JSON.stringify(attributes))

        e.stopPropagation();
    });

     

    function setComboFilter(filters) {
      
        for (var prop in filters) {
       
         console.log(prop+": "+ filters[ prop ]);
         var items = filters[ prop ].toString().split(",");
         //var items = filters[ prop ];
         
         for ( var i in items ) {
           //$("[data-filter-group='"+prop+"']").find("[data-filter='"+items[i]+"']").addClass("Highlighted");
           //$("[data-filter-group='"+prop+"']").find('[data-filter="all"],[data-filter=""]').removeClass('Highlighted');
           //console.log(items[i]);
         }  
       
        

     }
     
     
    } // end function setComboFilter
  
   function getComboFilter( filters ) {
      var i = 0;
      var comboFilters = [];
      var message = [];
    
       for (var prop in filters) {
           if (filters[prop] != "") {
               message.push(filters[prop].join(','));
           }
        
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
              filterSelectors.push( groupCombo[j] +'|'+ filterGroup[k] ); // [ 1, 2 ]
            }
    
          }
          // apply filter selectors to combo filters for next group
          comboFilters = filterSelectors;
        }
        i++;
      }
    
      //var comboFilter = comboFilters.join(','); 
       var comboFilter = message.join('|'); 

       //$('#CurSelection').text(JSON.stringify(filters));
      
      return comboFilter;
    } // end function getComboFilter
  
    function getHashFilter() {
      // get filter=filterName
      var matches = location.hash.match( /filter=([^&]+)/i );
      var hashFilter = matches && matches[1];
      return hashFilter && decodeURIComponent( hashFilter );
    } // end function getHashFilter


}); // END function


$(function () {
    $(".search-input").on("keyup", function () {
        var value = this.value.toLowerCase().trim();
        $(this).closest(".overflow-y").find(".month-name:not(.reset),.CategoryListItem:not(.reset), a").show().filter(function () {
            return $(this).text().toLowerCase().trim().indexOf(value) == -1;
        }).hide();
    });
})



