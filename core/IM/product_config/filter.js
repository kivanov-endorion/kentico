$(document).ready(function(){
  
	//Carousel functionality
  
	var checkItem = function (){
	  if ($('.carousel-item:first').hasClass('active')) {
		$('button[value="previous"]').addClass('d-none');
		$('button[value="next"]').removeClass('d-none');
		$('button[value="reset"]').addClass('d-none');
	  } else if ($('.carousel-item:last').hasClass('active')) {
		$('button[value="next"]').addClass('d-none');
		$('button[value="reset"]').removeClass('d-none');
	  } else {
		$('button[value="previous"]').removeClass('d-none');
		$('button[value="next"]').removeClass('d-none');
		$('button[value="reset"]').addClass('d-none');
	  }
	};
  
	
  
	checkItem();
  
	//$('.carousel').on('slide.bs.carousel', checkItem );
  
  
  
	//Pause carousel
	$('.carousel').carousel('pause')

	//$('.carousel').carousel({
		//interval : false
	//});
  
	//Prev Button
	$('button[value="previous"]').click(function(){
	  $('.carousel').carousel('prev');
	})
  
	//Next carousel
	$('button[value="next"]').click(function(){
	  $('.carousel').carousel('next')
	})

	//Reset carousel
	$('button[value="reset"]').click(function(){
		$('.carousel').carousel(0)
	})
	
  
	$('.carousel').on('slid.bs.carousel', checkItem);

	//Flip card

	//$('.flip-card').on("click", function () {
		//$(this).toggleClass("is-flipped");
	//})

	//Initial Product Count

	$('#product-count').append($('.filter-item').length);
  
	//Filters
  
	// Declaire Variables
  
	var filters={};
	var $container;
	
	$(function(){
	  
	  var $container = $('#product-container');
  
  
	  $container.isotope({
		itemSelector : '.filter-item',
		layoutMode: 'fitRows'
	  });

	  //$container.isotope('layout');

	 
	  $container.on( 'arrangeComplete', function(){
		// display message box if no filtered items
		console.log($('.filter-item').length);
		console.log($('.filter-item:hidden').length);
		//Product Count
		$('#product-count').empty().append(($('.filter-item').length)-($('.filter-item:hidden').length));
		if(($('.filter-item').length)-($('.filter-item:hidden').length) == 1){
			$('#product-desc').empty().append('Product Available');
		}
		if($('.filter-item').length == $('.filter-item:hidden').length){
			$('#no-items-msg').show();
			$('button[value="next"]').addClass('d-none');
			$('button[value="reset"]').removeClass('d-none');
		} else {
			$('#no-items-msg').hide();
			if(!$('.carousel-item:last').hasClass('active')){
				$('button[value="reset"]').addClass('d-none');
				$('button[value="next"]').removeClass('d-none');				
			}
			
		}
	  });	
	  

	
	  setComboFilter(filters);
	  var comboFilter = getComboFilter( filters );
	  $container.isotope({ filter: comboFilter });

	  var $filterButtons = $('.btn-filter');
	  //Reset Btn
  
	  $('.btn-reset').on( 'click', function() {
		  filters = {};
		  $container.isotope({ filter: '*' });
		  // reset buttons
		  $filterButtons.removeClass('checked');
		  $('#no-items-msg').hide();
	  });
		
  
	  // filter buttons
	  $('.btn-filter').click(function(){

		var $this = $(this);
		var $optionSet = $this.parents('.option-set');
		var element = $this.attr('data-filter');
		
		//Hide Intro text
		$('.intro-text').fadeOut();
		
		// store filter value in object
		// i.e. filters.color = 'red'
		var group = $optionSet.attr('data-filter-group');
		
		if(! filters[ group ]){
		filters[ group ]=[];
		}
		
		// check if element has already been selected
		var index = filters[ group ].indexOf(element);
		console.log(index);	  
		// if found
		if (index > -1) {
		// remove element from filters
		filters[ group ].splice(index, 1);
		$this.removeClass('checked');
		} else {
			// add element to filters
			/*if(group=='all-equipment'){
				filters[ group ]=[];
				filters[ group ].push($this.siblings('.option-set').children('input:not.checked').attr('data-filter'));
				$this.addClass('checked'); 
			}else{*/
				//if(group!='equipment'){
				filters[ group ]=[];
				//}				
				$this.addClass('checked'); 

			if(group=='all-equipment'){
				filters[ 'touch-screen' ]=[];
				filters[ 'sure-view' ]=[];
				filters[ 'lte' ]=[];
				filters[ 'thunderbolt' ]=[];
				//filters[ group ].push($this.parent().siblings('.option-set').children('input:not(.checked)').attr('data-filter'));

			}else{
				filters[ group ].push($this.attr('data-filter'));
			}  
		}

		// convert object into array
		
		var isoFilters = [];
		for ( var prop in filters ) {
		if (filters[ prop ].length>0) {
			isoFilters.push( filters[ prop ] )
		}
		};
	
		if($this.attr('data-filter')=='.all' || $this.attr('data-filter')==''){
			var selector = '';
			filters[ group ]=[];
			$this.addClass('checked');
			$this.siblings('.checked').removeClass('checked');
		
		}else if($this.attr('data-filter')=='.all-equipment'){
			//var selector = '';
			//filters[ group ]=[];
			$this.addClass('checked');
			$this.parent().siblings('.option-set').children('.checked').removeClass('checked');
		}else if($this.hasClass('equipment')){
			if($('input[data-filter=".all-equipment"]').hasClass('checked')){
				$('input[data-filter=".all-equipment"]').removeClass('checked');
			}
		}else {
			var selector = isoFilters.join('');
			//if(group!='equipment'){
			$this.siblings('.checked').removeClass('checked');
			//}
			
			if(filters[ group ]!=""){
			$this.siblings('[data-filter=".all"],[data-filter=""]').removeClass('checked');
			}else{
			$this.siblings('[data-filter=".all"],[data-filter=""]').addClass('checked');
			}
		
		}
		
		var comboFilter = getComboFilter( filters );
		console.log("Combo: "+ comboFilter);


		$container.isotope({ filter: comboFilter });		

		return false;



	  });
	
	 function setComboFilter ( filters) {
	   
	   for ( var prop in filters ) {
		 
		   console.log(prop+": "+ filters[ prop ]);
		   var items = filters[ prop ].toString().split(",");
		   
		   //var items = filters[ prop ];		   
		   for ( var i in items ) {
			 $("[data-filter-group='"+prop+"']").find("[data-filter='"+items[i]+"']").addClass('checked');
			 $("[data-filter-group='"+prop+"']").find('[data-filter=".all"],[data-filter=""]').removeClass('checked');
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
		//console.log(comboFilters);
	   var comboFilter = comboFilters.join(', ');
		
		return comboFilter;
	  } // end function getComboFilter
  
  
	});
   
   })
  