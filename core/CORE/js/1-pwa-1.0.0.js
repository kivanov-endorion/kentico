/*(function() {
  'use strict';
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('/service-worker.js')
             .then(function() {
               console.log('[1SW] Registered');
             });
  }
})();
*/

/*window.onpopstate = function (e) {
  if (e.state) {
    document.write(e.state.html);
  }
};
*/

/*
 * $(document).on("click", "a", function(e) {
  var sUrl = $(this).attr("href");
  if (sUrl.indexOf(window.location.hostname) != -1 || (sUrl.indexOf("http://") == -1 && sUrl.indexOf("https://") == -1)) {
    e.preventDefault();
    $("#main").html("<div class='loader'><div class='bouncybox'><div class='square-spin'>&nbsp;</div></div></div>");
    $.get(sUrl, function (sResponse, sStatus, oXhr) {
      window.history.pushState({ "html": sResponse }, "", sUrl);
      document.write(sResponse);
    });
  }
});
*/