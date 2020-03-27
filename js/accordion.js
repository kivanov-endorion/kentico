<script type="text/javascript">  
  $(document).ready(function(){
      
    $('.articleShow').click(function() {        
        if($(this).next('.articleHide').is(':hidden')) {
              $('.visible-content').slideUp();
              $('.visible-content').removeClass('visible-content');
              $('.selected').removeClass('selected');
              $(this).next('.articleHide').slideDown();
              $(this).next('.articleHide').addClass('visible-content');
              $(this).addClass('selected');
            // Clear all minuses
            $('i.fa.fa-minus-square-o').toArray().forEach(function (obj, index) {
                $(obj).removeClass('fa-minus-square-o').addClass('fa-plus-square-o');
            });
               $(this).find('i.fa.fa-plus-square-o').removeClass('fa-plus-square-o').addClass('fa-minus-square-o');

        } else {
              $(this).next('.articleHide').slideUp();
              $(this).removeClass('selected');
              $(this).find('i.fa.fa-minus-square-o').removeClass('fa-minus-square-o').addClass('fa-plus-square-o');
        }
    });
    
    // Assign the correct icon
    $('i.fa.fa-minus-square-o').toArray().forEach(function (obj, index) {
        if(index > 0) {
            $(obj).removeClass('fa-minus-square-o').addClass('fa-plus-square-o');
        }
    });
    
  });
</script>
