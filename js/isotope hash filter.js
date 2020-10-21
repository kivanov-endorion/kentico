$(document).ready(function(){
    
    /* Isotope.Item.prototype._create = function() {
         // assign id, used for original-order sorting
         this.id = this.layout.itemGUID++;
         // transition objects
         this._transn = {
           ingProperties: {},
           clean: {},
           onEnd: {}
         };
         this.sortData = {};
       };
       
       Isotope.Item.prototype.layoutPosition = function() {
         this.emitEvent( 'layout', [ this ] );
       };
       
       Isotope.prototype.arrange = function( opts ) {
         // set any options pass
         this.option( opts );
         this._getIsInstant();
         // just filter
         this.filteredItems = this._filter( this.items );
         // flag for initalized
         this._isLayoutInited = true;
       };
   
   
       
       // layout mode that does not position items
       Isotope.LayoutMode.create('none');*/
   
       var $grid = $("#promotions-list");
   
     $("#promotions-list .filter-item").each(function(i){
         /*$(this).css('height','clamp(361px, 420px, 396px)');*/
         var vendorName = $(this).attr("data-vendor");
         var vendorFilter = vendorName.toLowerCase().replace(" ","-");
   
         //add available vendors to filter
         if($("#vendor-filter>li[data-filter='" + vendorFilter +"']").length === 0){
             $("#vendor-filter").append("<li class='CategoryListItem' data-filter='" + vendorFilter + "'>" + vendorName + "</li>");
         }
     });
   
   var hashFilter = window.location.hash.substring(1);
   if(hashFilter != ''){
     $('#vendor-filter').find('li[data-filter='+hashFilter+']').siblings('.Highlighted').removeClass('Highlighted');
     $('#vendor-filter').find('li[data-filter='+hashFilter+']').addClass('Highlighted');
     $grid.isotope({
       itemSelector : '.filter-item',
       layoutMode: 'fitRows',
      filter: '.' + hashFilter
     });
   }
   
   
     $(document).on("click", "#vendor-filter>li", function(e) {
   
       e.preventDefault();
   
       var filterAttr = $(this).attr('data-filter');
       // set filter in hash
       location.hash = encodeURIComponent( filterAttr );
       console.log(location.hash = encodeURIComponent( filterAttr ));
   
       $("#vendor-filter> li").removeClass("Highlighted");
       $(this).addClass("Highlighted");
       if ($(this).attr("data-filter") == "") {
           $grid.isotope({filter: ""});
       } else {
           $grid.isotope({filter: "." + $(this).attr("data-filter")});
       }     
     });
    
     $grid.isotope({
       itemSelector : '.filter-item',
       layoutMode: 'fitRows'
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
   
   });
   
   