//  {% if(QueryString.type == "iframe") { %}
//  iFrame setup
  
function frameHeader () {
  return $("#page-header").height();
}

function framePosition () {
  return $(".cto-iframe").offset().top - $(document).scrollTop() - $("#page-header").height();
}

function frameResize (iHeight) {
  if (iHeight < 400) {
    iHeight = 400;
  }
  $(".cto-iframe").css("height", iHeight);
}

$(document).ready(function(e) {
  frameResize (400);
});

//  {% } #%}
  
  
//  {% if(QueryString.type == "popup") { %}
//  PopUp setup
  
$(document).ready(function(e) {
  $.blockUI({
    css: {
      cursor: "default",
      height: "90%",
      left: "5%",
      textAlign: "left",
      top: "5%",
      width: "90%"
    },
    message: $(".cto-popup"),
    onBlock: function () {
      window.setInterval(function () { $(".cto-iframe").css("height", $(".blockMsg").height()); }, 500); }
  });
});
  
$(document).on("click", ".cto-popup-close", function(e) {
  $.unblockUI();
  window.history.back();
});
  
//  {% } #%}
