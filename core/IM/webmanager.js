// /pages/GetResource.ashx?js=saxb%2BNFwG%2FCFGrJxDLj56OSYedB3NBUarmGObBYspBtlWz6aQShjCdYosHz%2BHxx%2B

var oneIMAdData;
var sRoot = "//{% CurrentSite.SiteName %}/";

//  Load all running banners for current url
function oneIMAdReceiver() {
  $.getJSON(sRoot + "api/webmanager/fullpage.ashx?referrer=" + encodeURIComponent(window.location.href) + "&logged=" + (varUserId == "" ? 0 : 1), function (data) {
    oneIMAdData = data.banner;
    oneIMAdCreator();
  });
}


//  Loop Ad Data object - check if selector exists and oneIM banners haven't been created yet
function oneIMAdCreator() {
  mObserver.disconnect();
  $.each(oneIMAdData, function () {
    if ($(this.selector).length != 0 && $(this.selector + " a.oneIMBanner").length == 0) {
      if ($(this.selector).hasClass("carousel"))
        oneIMCarousel(this);
      else
        oneIMStatic(this);
    }
  });
  mObserver.observe(document, { childList: true, subtree: true });
}

//  Create carousel banner 
function oneIMCarousel(oAd) {
  var sId = oAd.selector;
  $(sId).html("<ol class='carousel-indicators'></ol>");
  $(sId).append("<div class='carousel-inner' role='listbox'></div>");
  $(sId).append("<a class='left carousel-control' href='" + sId + "' role='link' data-slide='prev' style='display: none;'><span class='far fa-chevron-left glyphicon glyphicon-chevron-left color-font-blue' aria-hidden='true'></span></a>");
  $(sId).append("<a class='right carousel-control' href='" + sId + "' role='link' data-slide='next' style='display: none;'><span class='far fa-chevron-right glyphicon glyphicon-chevron-right color-font-blue' aria-hidden='true'></span></a>");

  $.each(oAd.items, function (iItem) {
    $(sId + " .carousel-inner").append("<div class='item center-img'>" + oneIMBanner(this, false) + "</div>");
    $(sId + " .carousel-indicators").append("<li data-target='" + sId + "' data-slide-to='" + iItem + "' class=''></li>");
  });
  $(sId + " .carousel-inner .item").first().addClass("active");
  $(sId + " .carousel-indicators li").first().addClass("active");
}

//  Create static banner - arrange position by item count and center items
function oneIMStatic(oAd) {
  var sId = oAd.selector;
  $(sId).html("");
  $.each(oAd.items, function () {
    if ($(sId).prop("tagName").toLowerCase() == "a")
      $(sId).html(oneIMBanner(this, true));
      //$(sId).replaceWith(oneIMBanner(this, true));
    else
      $(sId).append("<span class='inline center' style='max-width: " + (100 / oAd.items.length) + "%'>" + oneIMBanner(this, true) + "</span>");
  });
}

//  Create banner item - link incl image and campaign information
function oneIMBanner(oBanner, bBanner) {
  return "<a class='oneIMBanner " + oBanner.addClass + (bBanner ? " CMSBanner Banner" : "") + "' href='" + sRoot + "pages/webmanager/redirect.ashx?id=" + oBanner.booking + "' target='" + oBanner.target + "' data-name='" + oBanner.zone + "' data-campaign='" + oBanner.campaign + "'><img src='" + sRoot + "pages/webmanager/image.ashx?id=" + oBanner.booking + "' alt='Anzeige' title='' border='0'></a>";
}

//  Start up after document ready - include css
$(document).ready(function () {
  $("head").append("<link href='" + sRoot + "pages/GetResource.ashx?css=saxb%2BNFwG%2FCFGrJxDLj56OSYedB3NBUarmGObBYspBuvIdCa9QsGtXddhr2%2FMXt9' rel='stylesheet' type='text/css'>");
  $("a.bannerWebManager").remove();
  oneIMAdReceiver();
});

//  listen for url rewrite - search result page
if ("onhashchange" in window) {
  $(window).on("hashchange", function () {
    oneIMAdReceiver();
  });
}

//  listen for DOM changes - async ad loading scripts
MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
var mObserver = new MutationObserver(function () {
  oneIMAdCreator();
});
