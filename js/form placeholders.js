$(document).ready(function() {
    if($(".form-email").val() == ""){
       $(".form-email").val("E-mail*");
    }
 
    if($('.form-email').val() != "E-mail*") {
       $('.form-email').removeClass('WatermarkText');  
    }
 
    $(".form-email").focus(function(){
       if($(".form-email").val() == "E-mail*"){
           $(".form-email").val("").removeClass('WatermarkText');
         }
    });
    $('.form-email').blur(function(){
       if($(".form-email").val() == ""){
           $(".form-email").val("E-mail*").addClass('WatermarkText');
         }
    });
     
    $('.form-email').keypress(function(){  
       $(this).removeClass('WatermarkText');  
    });
});