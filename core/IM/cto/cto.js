var j2hDOM = {};

function checkData(sPrefix) {
  var bOK = true;
  $((sPrefix + " input[required]," + sPrefix + " select[required]").trim()).each(function () {
    if (($(this).val() || "").trim() == "")
      bOK = false;
  });
  return bOK;
}

function form2json(sPrefix, oJson) {
  if (!oJson)
    oJson = {};

  $((sPrefix + " input[data-field]," + sPrefix + " select[data-field]").trim()).each(function () {
    console.log($(this).attr("data-field").trim());
    oJson[$(this).attr("data-field").trim()] = ($(this).val() || "").trim();
  });
  return oJson;
}

function parseHTML(sText) {
  return (new DOMParser).parseFromString("<!doctype html><body>" + sText, "text/html").body.textContent;
}

function json2form(oJson, sPrefix) {
  $.each(Object.keys(oJson), function (iKey, sKey) {
    $((sPrefix + " input[data-field='" + sKey + "']," + sPrefix + " select[data-field='" + sKey + "']").trim()).val(parseHTML(oJson[sKey]));
  });
}
function trimJson(obj) {
  if (!Array.isArray(obj) && typeof obj != 'object')
    return obj;

  return Object.keys(obj).reduce(function (acc, key) {
    acc[key.trim()] = typeof obj[key] == 'string' ? obj[key].trim() : trimJson(obj[key]);
    return acc;
  }, Array.isArray(obj) ? [] : {});
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

$(document).ready(function (e) {
  if (getURLParameter("node")) {
    location.href = getURLParameter("node") + (location.href + "&").substring(location.href.indexOf("?")).replace("node=" + getURLParameter("node") + "&", "");
    return;
  }

  $("#cto").hide();

  $("#slidein-ribbon").append(json2html.transform({}, j2hDOM[$("#cto").attr("node") + "Ribbon"]));
  $("#slidein-menu").append(json2html.transform({}, j2hDOM[$("#cto").attr("node") + "SlideIn"]));

  $.getJSON("ajax/slidein", function (data) {
    $.each(data.data, function (iArticle, oArticle) {
      $("#article-" + oArticle.name).html(parseHTML(oArticle.text));
    });

    if ($("#article-ship-countries p").length != 0) {
      oCountries = $("#article-ship-countries p").html().split("<br>");
      $("#article-ship-countries").html("<select class='form-control' id='shipCountry' data-field='shipCountry'></select>");
      $.each(oCountries, function (iItem) {
        $("#shipCountry").append("<option value='" + oCountries[iItem].split("|")[0].trim() + "'>" + oCountries[iItem].split("|")[1].trim() + "</option>");
      });
      $("#shipCountry").val("");
    }
  });

  $("#DTProductList").DataTable({
    columns: [
      {
        data: null,
        render: function (data) {
          if (data.quote)
            return "<br><span class='bold'>" + data.title + "</span>";

          return data.description1 + "<br><span class='bold'>VPN: </span>" + data.mfrPartNbr + " <span class='bold'>SKU: </span>" + data.sku;
        },
        width: "100%"
      },
      {
        className: "text-right text-nowrap",
        data: null,
        render: function (data) {
          if (data.quote)
            return "";

          var iAmount = data.qty * (data.parentQty ? data.parentQty : 1);
          return iAmount + " &times; " + localizePrice(data.price) + "<br><span class='bold'>" + localizePrice(data.price * iAmount) + "</span>";
        }
      }
    ],
    autoWidth: false,
    info: false,
    paging: false,
    ordering: false,
    rowId: "id",
    searching: false
  });
});

