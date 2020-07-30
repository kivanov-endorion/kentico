// #region Global Variables
var sLocale = "{% LocalizationContext.CurrentCulture.CodeName %}";

// #endregion

// #region Generic Functions
function getURLParameter(sName) {
  var sUrl = location.href;
  sName = sName.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + sName + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(sUrl);
  if (!results)
    return ""; // null
  if (!results[2])
    return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function localizeNumber(dDecimal, iDigits) {
  return parseFloat(dDecimal).toLocaleString(sLocale, { minimumFractionDigits: iDigits, maximumFractionDigits: iDigits })
}

function localizePrice(dDecimal, sCurrency) {
  if (sCurrency == "" || sCurrency == undefined)
    sCurrency = "{% CurrentUser.imCurrencyCd %}";
  return parseFloat(dDecimal).toLocaleString(sLocale, { style: "currency", currency: sCurrency })
}
// #endregion

// #region ScrollPosition
window.addEventListener("message", function (e) {
  if (e.origin.indexOf(".ingrammicro.com") != -1 && e.data.substr(0, 11) == "[scrollPos]") {
    var aScroll = e.data.substring(11, e.data.length).split(":");
    var iTop = Math.max(0, parseInt(aScroll[3]) - parseInt(aScroll[1]));
    $("#slidein-ribbon").attr("style", "top: " + iTop + "px !important; height: calc(100% - " + iTop + "px) !important");
  }
}, false);
// #endregion

// #region PlugIn Defaults
$(document).ready(function (e) {
  if ($.isFunction($.fn.dataTable)) //($.fn.dataTable != "undefined")
    $.extend(true, $.fn.dataTable.defaults, {
      dom: "<'row w-100'rt><'d-flex justify-content-between'ilp>",
      language: {
        "{$ 1IM.newUI.DTLanguage $}"
        },
      paging: true,
      pagingType: "full_numbers",
      searching: true,
    });

  if (window.moment)
    moment.locale(sLocale);

  parent.postMessage("[title]" + document.title, "*");
  var sIcon = $("link[rel='icon']").attr("href");
  if (sIcon.indexOf("//{% CurrentSite.SiteName %}/") == -1)
    sIcon = "//{% CurrentSite.SiteName %}" + $("link[rel='icon']").attr("href");
  parent.postMessage("[icon]" + sIcon, "*");
});
// #endregion

// #region DataTables
$(document).on("click", ".dataTables_search .searchItem .reset", function (e) {
  $(this).closest(".searchItem").find("input").val("").trigger("keyup");
});

$(document).on("keyup change", ".dataTables_search .searchItem input", function (e) {
  e.preventDefault();
  if ($(this).val() != "")
    $(this).closest(".searchItem").find(".reset").show()
  else
    $(this).closest(".searchItem").find(".reset").hide()

  if ($(this).closest(".searchItem").attr("column") == "*" || $(this).closest(".searchItem").attr("column") == undefined)
    $("#" + $(this).closest(".dataTables_search").attr("for")).DataTable().search($(this).val()).draw();
});
// #endregion

// #region SlideIn
$(document).on("click", "#slidein-ribbon a[href='#']", function (e) {
  e.preventDefault();
  $("#slidein-item .slidein-item").hide();
  if ($("#slidein-ribbon a.selected").length == 0) {
    $("#slidein-ribbon").toggleClass("open");
    $("#slidein-menu").toggleClass("open");
    $("#slidein-modal").toggle();
    $(this).toggleClass("selected");
    $("#slidein-item .slidein-item[data-item='" + $(this).data("item") + "']").show();
  }
  else if ($(this).hasClass("selected")) {
    $("#slidein-ribbon").toggleClass("open");
    $("#slidein-menu").toggleClass("open");
    $("#slidein-modal").toggle();
    $("#slidein-ribbon a.selected").toggleClass("selected");
  } else {
    $("#slidein-ribbon a.selected").toggleClass("selected");
    $(this).toggleClass("selected");
    $("#slidein-item .slidein-item").hide();
    $("#slidein-item .slidein-item[data-item='" + $(this).data("item") + "']").show();
  }
});

$(document).on("click", "#slidein-ribbon a[href][href!='#']", function (e) {
  e.preventDefault();
  $("#slidein-close").trigger("click");
  $("*").addClass("wait");
  $("#cto").fadeOut(300);
  $(".loader").fadeIn(300).delay(300);
  location = $(this).attr("href");
});

$(document).on("click", "#slidein-close, #slidein-modal", function (e) {
  e.preventDefault();
  $("#slidein-ribbon a.selected").trigger("click");
});

$(document).ready(function (e) {
  $("#slidein-navigation").html($("#tree-navigation").html());
});
// #endregion
