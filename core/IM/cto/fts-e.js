$(document).ready(function () {
  $(".loader").fadeOut(300);
  $("#cto").fadeIn(300);
});

$(document).on("click", "#start", function (e) {
  $("#cto").fadeOut(300);
  $(".loader").fadeIn(300);

  parent.postMessage("[iframe]/_layouts/CommerceServer/IM/HPiQuoteHandler.ashx", "*");
  $.getJSON("/api/cto/FTS-E-Punchout.ashx?env=" + getURLParameter("env"), function (data) {
    if (data.error == 0)
      location.href = data.url;

    $("#teaser").hide();
    $(".loader").fadeOut(300);
    $("#cto").fadeIn(300);
  });
});