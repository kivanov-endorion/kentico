var aStatus = [
  { "icon": "fa-exclamation-triangle ", "text": " {$ 1IM.Dashboard.TrackTrace.Damaged $}", "class": "badge-alert" },
  { "icon": "fa-hourglass-half ", "text": " {$ 1IM.Dashboard.TrackTrace.Delayed $}", "class": "badge-warning" },
  { "icon": "fa-check-circle ", "text": " {$ 1IM.Dashboard.TrackTrace.Delivered $}", "class": "badge-success" },
  { "icon": "fa-ban", "text ": " {$ 1IM.Dashboard.TrackTrace.Failed $}", "class": "badge-alert" },
  { "icon": "fa-hand-stop-o ", "text": " {$ 1IM.Dashboard.TrackTrace.Refused $}", "class": "badge-alert" },
  { "icon": "fa-undo ", "text": " {$ 1IM.Dashboard.TrackTrace.Returned $}", "class": "badge-alert" }
];

var aDocuments = [];
aDocuments["coa"] = "{$ 1IM.Dashboard.TrackTrace.Document.coa $}";
aDocuments["dlvnt"] = "{$ 1IM.Dashboard.TrackTrace.Document.dlvnt $}";
aDocuments["pod"] = "{$ 1IM.Dashboard.TrackTrace.Document.pod $}";

var oDates = { year: 'numeric', month: '2-digit', day: '2-digit' };
var oNumbers = { minimumFractionDigits: 3, maximumFractionDigits: 3 };
var sLocale = "{% IMMacros.GetCookieValue("CMSPreferredCulture") #%}";

var sURLVariables = decodeURIComponent(window.location.search.substring(1)).split('&');
var sQuery = "";
for (iI = 0; iI < sURLVariables.length; iI++) {
  sQuery += "&" + sURLVariables[iI].split('=')[0];
  sQuery += "=" + encodeURIComponent(sURLVariables[iI].substr(sURLVariables[iI].split('=')[0].length + 1, sURLVariables[iI].length));
}

$(document).ready(function (e) {
  $("section").hide();
  $.blockUI({
    message: $("#preloadInfo"),
    css: {
      background: "none",
      border: "none",
      color: "white"
    }
  });

  $.getJSON("/api/tracktrace.aspx?" + sQuery, function (data) {
    if ($("#errors div[data='" + data.code + "']").length == 0) {
      $("#shipment").json2html(data.shipment, tData.shipment);
      $("#packages .accordion-group").json2html(data.shipment.packages, tData.package);
      $("section").show();
      $(".status-icon").each(function (iIndex) {
        var sIcon = $(this).attr("data") === "000000" ? "fa-truck" : "";
        $.each($(this).attr("data").split(""), function (iIndex, sData) {
          sIcon += sData == 1 ? aStatus[iIndex].icon : "";
        });
        $(this).addClass(sIcon);
      });
      $(".status-progress").each(function (iIndex) {
        var sIcon = $(this).attr("data") === "000000" ? "fa-arrow-right" : "";
        $.each($(this).attr("data").split(""), function (iIndex, sData) {
          sIcon += sData == 1 ? aStatus[iIndex].icon : "";
        });
        $(this).addClass(sIcon);
      });
      $(".status-text").each(function (iIndex) {
        var sBadge = "";
        var sText = $(this).attr("data") === "000000" ? "{$ 1IM.Dashboard.TrackTrace.Transit $}" : "";
        $.each($(this).attr("data").split(""), function (iIndex, sData) {
          sBadge = sData == 1 ? aStatus[iIndex].class : sBadge;
          sText += sData == 1 ? aStatus[iIndex].text : "";
        });
        $(this).addClass(sBadge);
        $(this).append(sText);
      });
      $.unblockUI();
    } else {
      $("#preloadInfo").html("<h1>{$ 1IM.Dashboard.TrackTrace.Error $}!</h1><h2>" + $("#errors div[data='" + data.code + "']").html() + "!</h2><h3>{$ 1IM.Dashboard.TrackTrace.TryAgain $}</h3>");
      $(".blockUI").css("cursor", "not-allowed");
    }
  });
});

$(document).on("click", ".card-header", function (e) {
  $("div[data-parent='#packages']").not($(this).attr("data-target")).collapse("hide");
});