<%@ Control Language="C#" AutoEventWireup="true" CodeFile="CarouselB4.ascx.cs" Inherits="CarouselB4" %>   


<script type="text/javascript">

$(document).ready(function(){
    
    $(".custom-slide-menu .nav-pills:not(.is-open) .nav-link").on("click", function(){
        $(".custom-slide-menu .nav-pills:not(.is-open)").addClass("is-open").append("<li class=\"close nav-item mt-3\"><i class=\"material-icons\">close</i></li>");   
        $(".custom-slide-menu .tab-content").addClass("slide-menu-open");
    });

    
    $(".custom-slide-menu").on("click", ".close", function(){
        $(".custom-slide-menu .nav-pills").removeClass("is-open");
        $(".custom-slide-menu .tab-content").removeClass("slide-menu-open");
        $(".custom-slide-menu .close").remove();
    })
})
  </script>