// /pages/GetResource.ashx?js=saxb%2BNFwG%2FCFGrJxDLj56ME6rdcpPbcsXQzc74aLP5lNoiCX7F1ZmVvhbZfuTu7f

function oneIMLoaded() {
  // Check function if oneIM is loaded or blocked by ad/privacy extensions
  return true;
}

function getURLParameter(sName) {
  sName = sName.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + sName + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(sUrl);
  if (!results)
    return null;
  if (!results[2])
    return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function addParameter(sName, sValue) {
  if (!getURLParameter(sName))
    return "&" + sName + "=" + encodeURIComponent(sValue);
  return "";
}

var sUrl = window.location.href;
var sParameter = sUrl.split("?")[1] || "";
sParameter = sParameter.replace(sParameter.split("&")[0] || "", "");

if (window.top != window.self) {
  $("html, body").addClass("hide");
  $("html, body", window.parent).addClass("hide");
  window.parent.location = window.location.href;
}
//else if ((varUser || "") == "" && $("#ifrExternalHost")) {
else if (typeof varUser !== 'undefined') {
  if (varUser == "" && $("#ifrExternalHost"))
    window.location = "/Site/Login?returnurl=" + encodeURIComponent(window.location.href);
}
else {
  //window.history.pushState({}, document.title, window.location.href.split("?")[0] + "?page=" + getURLParameter("page"));
}

$("document").ready(function () {
  $("html").data("title", $("title").html());

  if (!$("#ifrExternalHost"))
    return;

  $("#ifrExternalHost").attr("name", "ifrExternalHost");
  $("#ifrExternalHost").css("height", "200px");
  //$("#ifrExternalHost").attr("sandbox", "allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-same-origin allow-scripts allow-top-navigation");
  $("#ifrExternalHost").attr("src", $("#ifrExternalHost").data("src") + (($("#ifrExternalHost").data("src") || "").indexOf("?") == -1 ? "?" : "") + sParameter + addParameter("lang", $.cookie("CMSPreferredCulture")) + addParameter("a1", varCountry) + addParameter("a2", varCompany) + addParameter("a3", varResellerId) + addParameter("a4", varFirstName) + addParameter("a5", varLastName) + addParameter("a6", varEmailAddress) + addParameter("T1", varTimeStamp) + addParameter("a7", varCurrentLanguage) + addParameter("a8", varResellerCompanyName) + addParameter("a9", varPhoneNumber) + addParameter("a10", varAddressLine1) + addParameter("a11", varCity) + addParameter("a12", varState) + addParameter("a13", varPostalCode) + addParameter("im2", varUser) + addParameter("c1", $("#attach").data("c1")));
});

$(document).on("scroll", function (e) {
  if (!$("#ifrExternalHost"))
    return;

  document.getElementById("ifrExternalHost").contentWindow.postMessage("[scrollPos]" + $("#ifrExternalHost").offset().left + ":" + $("#ifrExternalHost").offset().top + ":" + $(document).scrollLeft() + ":" + $(document).scrollTop(), "*");
});

window.addEventListener("message", function (e) {
  if (!$("#ifrExternalHost"))
    return;

  if (e.origin.indexOf(".ingrammicro.com") == -1 && e.origin.indexOf(".ingrammicro.eu") == -1 && e.origin.indexOf(".ingrammicro-asia.com") == -1)
    return;

  var sTodo = {
    parameter: e.data.substr(0, e.data.indexOf("]") + 1),
    value: e.data.substr(e.data.indexOf("]") + 1)
  };
  
  if (sTodo.parameter == "[title]") {
    $("title").html(/*$("html").data("title") + " - " + */sTodo.value);
  }
  if (sTodo.parameter == "[icon]") {
    $("link[rel*='icon']").attr("href", sTodo.value);
  }
  if (sTodo.parameter == "[iframe]") {
    $("body").append("<iframe class='xhide' src='" + sTodo.value + "'></iframe>");
  }
  if (sTodo.parameter == "[add2basket]") {
    //;
  }
}, false);
