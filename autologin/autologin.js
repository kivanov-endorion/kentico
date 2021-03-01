var oRegions;

function showRegion(sRegion) {
  $(".close-slide").trigger("click");
  $(".country").not("#countries").addClass("disabled");
  $(".region").hide();

  waitFor($("#" + sRegion), function () {
    $("#" + sRegion).show();
    $("#title h3").text(sRegion);
    var oRegion;
    for (var iRegion = 0; iRegion < oRegions.length; iRegion++)
      if (oRegions[iRegion].region == sRegion)
        oRegion = oRegions[iRegion];

    $.each(oRegion.countries, function (iCountry, oCountry) {
      $("#" + oCountry.companyCd).removeClass("disabled").data(oCountry);
    });
  });
}

function waitFor(selector, callback) {
  if ($(selector).length) {
    callback();
  } else {
    setTimeout(function () {
      waitFor(selector, callback);
    }, 100);
  }
};

$(document).ready(function () {
  $("body").append("<div id='countries' class='country p-5 bg-light custom-slide-menu'>&#8203;</div>");
  $.getJSON("/imonline/ajax/1im/autologin", function (response) {
    oRegions = response.data;

    var oHome = $("#{% CurrentUser.imCompanyCd %}".toLowerCase());
    if (oHome) {
      showRegion(oHome.closest(".region").attr("id"));
      oHome.trigger("click");
    }
    else
      showRegion("europe");
  });
});

$(document).on("click", "body", function (e) {
  if (!$("#countries").hasClass("slide-menu-open"))
    return;

  if ($(e.target).closest(".country").length != 0)
    return;

  $(".close-slide").trigger("click");
}); 

$(document).on("click", ".region .country:not(.disabled)", function () {
  $("#countries").html("<button type='button' class='border btn btn-floating close-slide grad-danger text-white' aria-label='Close'><i class='fas fa-times'></i></button>");
  $('#countries').append("<h2 class='mb-5'>" + $(this).data().name + "</h2>");

  $.each($(this).data().logins, function () {
    $('#countries').append("<div class='row list-group list-group-horizontal my-2 position-relative'>" +
      "<div class='col-12 list-group-item mb-3 border'>" +
      "<a class='card-link stretched-link' href='/pages/AutoLogin.ashx?id=" + this.id + "' target='_blank'>" +
      this.env + " | " + this.user +
      "</a></div></div>");
  });

  if (!$('#countries').hasClass('slide-menu-open')) 
    $('#countries').addClass('slide-menu-open');
  
  $('.is-open').removeClass('is-open');
  $(this).addClass('is-open');
});

$(document).on('click', '.close-slide', function () {
  $('#countries').removeClass('slide-menu-open');
  $('.is-open').removeClass('is-open');
});

$(document).on("click", ".card-link", function () {
  // var iRegion = oRegions.findIndex(x => x.region = $(".region:visible").attr("id")); // would be nice, doesn't work in IE
  var iRegion = 0;
  for (iRegion; iRegion < oRegions.length; iRegion++)
    if (oRegions[iRegion].region == $(".region:visible").attr("id"))
      break;

  iRegion += parseInt($(this).attr("data"));
  if (iRegion < 0)
    iRegion = oRegions.length - 1;
  if (iRegion >= oRegions.length)
    iRegion = 0;

  showRegion(oRegions[iRegion].region);
});