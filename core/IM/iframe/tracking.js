// #region Json2Html
var j2hData = {
  "error": {
    "<>": "div", "id": "dataHeader", "class": "row", "html": [
      {
        "<>": "div", "html": function () {
          var sHtml = "<table>";
          sHtml += "<tr><td><h2>{$ iFrame.Tracking.Error $}</h2></td></tr>";
          sHtml += "<tr><td>" + aError[this.code] + "</td></tr>";
          sHtml += "<tr><td>{$ iFrame.Tracking.Error.TryAgain $}</td></tr>";
          sHtml += "</table>";
          return sHtml;
        }
      },
    ]
  },
  "header": {
    "<>": "div", "id": "dataHeader", "class": "row", "html": [
      {
        "<>": "div", "html": function () {
          var sHtml = "<table>";
          sHtml += "<tr><td><h2>{$ iFrame.Tracking.Status $}:</h2></td><td>" + badgeData("" + this.isDelivered + this.isDamaged + this.isDelayed + this.isFailed + this.isRefused + this.isReturn, true) + "</td></tr>";
          sHtml += "<tr><td>{$ iFrame.Tracking.Id $}:</td><td>" + this.id + "</td></tr>";
          sHtml += "<tr><td>{$ iFrame.Tracking.Weight $}:</td><td>" + localizeNumber(this.weight, 3) + " kg</td></tr>";
          sHtml += "<tr><td>{$ iFrame.Tracking.Carrier $}:</td><td>" + this.carrier + "</td></tr>";
          sHtml += "<tr><td>{$ iFrame.Tracking.Created $}:</td><td>" + moment(this.created).format("L") + "</td></tr>";

          if (this.delivered != "" && this.delivered != undefined)
            sHtml += "<tr><td>{$ iFrame.Tracking.Delivered $}:</td><td>" + moment(this.delivered).format("L") + " " + moment(this.delivered).format("LT") + "</td></tr>";

          if (this.signer != "" && this.signer != undefined)
            sHtml += "<tr><td>{$ iFrame.Tracking.Signer $}:</td><td>" + this.signer + "</td></tr>";
          sHtml += "</table>";

          return sHtml;
        }
      },
      {
        "<>": "div", "html": function () {
          var sHtml = "<table>";
          sHtml += "<tr><td><h2>{$ iFrame.Tracking.Address $}:</h2></td></tr>";
          sHtml += "<tr><td>" + this.address1 + "</td></tr>";
          sHtml += "<tr><td>" + this.attention + "</td></tr>";
          sHtml += "<tr><td>" + this.address2 + "</td></tr>";
          sHtml += "<tr><td>" + this.address3 + "</td></tr>";
          sHtml += "<tr><td>" + this.address4 + "</td></tr>";
          sHtml += "<tr><td>" + this.address5 + "</td></tr>";
          sHtml += "</table>";

          return sHtml;
        }
      },
      {
        "<>": "div", "id": "dataDocuments", "html": function () {
          var iItems = 0;
          $.each(this.documents, function () {
            if (this.handle != "")
              iItems += 1;
          });
          if (iItems == 0)
            return;

          var sHtml = "<table>";
          sHtml += "<tr><td><h2>{$ iFrame.Tracking.Documents $}:</h2></td></tr>";
          $.each(this.documents, function () {
            if (this.handle != "")
              sHtml += "<tr><td><a href='/api/getdocument.aspx?handle=" + this.handle + "' target='_blank'><span class='fa fa-download'></span> " + aDocuments[this.type] + "</a></td></tr>";
          });
          sHtml += "</table>";

          return sHtml;
        }
      },
    ]
  },
  "details": {
    "<>": "div", "class": "row-details w-100", "html": [
      {
        "<>": "table", "id": "DTProduct", "class": "dataTable w-100", "html": [
          {
            "<>": "thead", "html": "<tr><th></th><th></th><th></th></tr>"
          },
          {
            "<>": "tbody", "html": function () {
              return $.json2html(this.products, j2hData.product);
            }
          }
        ]
      }
    ]
  },
  "product": {
    "<>": "tr", "html": [
      {
        "<>": "td", "html": function () {
          var sHtml = "<b style='font-size: 1.2em'>" + this.description1 + " " + this.description2 + "</b>";
          sHtml += "<br><b>VPN:</b> " + this.mfrPart + " | <b>SKU:</b> " + this.sku;
          if (this.eanCode != "")
            sHtml += " | <b>EAN:</b> " + this.eanCode;
          if (this.custPart != "")
            sHtml += " | <b>CPN:</b> " + this.custPart;
          if (this.serials !== undefined) { 
            sHtml += "<br><b>UUID(s):</b> ";
            $.each(this.serials, function (iItem) {
              if (iItem != 0)
                sHtml += " | ";
              sHtml += this.type + ": " + this.id;
            });
          }

          return sHtml;
        }
      },
      {
        "<>": "td", "html": function () {
          var sHtml = "<b>{$ iFrame.Tracking.OrderNumber $}:</b> " + this.orderNbr;
          sHtml += " | <b>{$ iFrame.Tracking.OrderDate $}:</b> " + moment(this.orderDate).format("L");
          if (this.customerPo != "")
            sHtml += "<br><b>{$ iFrame.Tracking.CustPO $}:</b> " + this.customerPo;

          return sHtml;
        }
      },
      {
        "<>": "td", "html": "<b style='font-size: 1.2em'>${quantity}</b>"
      }
    ]
  },
}
// #endregion

var aDocuments = [];
aDocuments["coa"] = "{$ iFrame.Tracking.Documents.coa $}";
aDocuments["dlvnt"] = "{$ iFrame.Tracking.Documents.dlvnt $}";
aDocuments["pod"] = "{$ iFrame.Tracking.Documents.pod $}";

var aError = [];
aError[400] = "{$ iFrame.Tracking.Error.400 $}";
aError[401] = "{$ iFrame.Tracking.Error.401 $}";
aError[504] = "{$ iFrame.Tracking.Error.504 $}";
aError[521] = "{$ iFrame.Tracking.Error.521 $}";
aError[522] = "{$ iFrame.Tracking.Error.522 $}";

var aStatus = [
  { "class": "success", "icon": "fa-check-circle", "text": "{$ iFrame.Tracking.Status.Delivered $}" },
  { "class": "danger", "icon": "fa-exclamation-triangle", "text": " {$ iFrame.Tracking.Status.Damaged $}" },
  { "class": "warning", "icon": "fa-hourglass-half", "text": "{$ iFrame.Tracking.Status.Delayed $}" },
  { "class": "danger", "icon": "fa-ban", "text": "{$ iFrame.Tracking.Status.Failed $}" },
  { "class": "danger", "icon": "fa-hand-paper", "text": "{$ iFrame.Tracking.Status.Refused $}" },
  { "class": "danger", "icon": "fa-undo", "text": "{$ iFrame.Tracking.Status.Returned $}" }
];

var dtPackage;
var dtTracking;
var oData;

function badgeData(sFlags, bText) {
  if (oData.status == 0)
    return "";

  var sBadges = "";
  $.each(sFlags.split(""), function (iIndex, sData) {
    if (sData == 1)
      sBadges += "<span class='badge-pill badge-" + aStatus[iIndex].class + "'><i class='fas " + aStatus[iIndex].icon + "'></i> " + (bText ? aStatus[iIndex].text : "") + "</span><br>";
  });
  if (sBadges == "")
    sBadges = "<span class='badge-pill badge-info'><i class='fas fa-truck'></i> " + (bText ? "{$ iFrame.Tracking.Status.Transit $}" : "") + "</span><br>";
  return sBadges;
}

$(document).ready(function (e) {
  dtPackage = $("#DTPackage").DataTable({
    columns: [
      {
        data: "id",
        title: "{$ iFrame.Tracking.Column.Package $}"
      },
      {
        className: "text-right",
        data: null,
        render: function (data) {
          return data.products.length;
        },
        title: "{$ iFrame.Tracking.Column.Products $}"
      },
      {
        className: "text-right",
        data: null,
        render: function (data) {
          if (data.products.length == 0)
            return "";
          return moment(data.products[0].orderDate).format("L");
        },
        title: "{$ iFrame.Tracking.Column.OrderDate $}"
      },
      {
        className: "text-right",
        data: null,
        render: function (data) {
          if (data.status.length == 0)
            return "";
          var mDateTime = moment(data.status[data.status.length - 1].timeStamp);
          return mDateTime.format("L") + " " + mDateTime.format("LT");
        },
        title: "{$ iFrame.Tracking.Column.LastUpdate $}"
      },
      {
        data: null,
        render: function (data) {
          return badgeData("" + data.isDelivered + data.isDamaged + data.isDelayed + data.isFailed + data.isRefused + data.isReturn, true);
        },
        title: "{$ iFrame.Tracking.Column.Status $}"
      },
    ],
    autoWidth: false,
    info: false,
    ordering: false,
    paging: false,
    rowId: "id",
    searching: false,
  });

  dtTracking = $("#DTTracking").DataTable({
    columns: [  
      {
        className: "text-nowrap",
        data: null,
        render: function (data) {
          return badgeData("" + data.isDelivered + data.isDamaged + data.isDelayed + data.isFailed + data.isRefused + data.isReturn, false);
        },
      },
      {
        data: null,
        render: function (data) {
          var mDateTime = moment(data.timeStamp);
          return mDateTime.format("L") + " " + mDateTime.format("LT") + "<br>" + data.location + "<br>" + data.text;
        },
      },
    ],
    autoWidth: false,
    info: false,
    ordering: false,
    paging: false,
    searching: false,
  });

  $.getJSON("/api/tracking.ashx?shipment=" + getURLParameter("shipment"), function (data) {
    oData = data;
    if (oData.details == 1) {
      $("#resultHeader").json2html(oData.shipment, j2hData.header);
      if ($("#dataDocuments").html() == "")
        $("#dataDocuments").remove();
      $("#dataHeader > div").addClass("col-xs-" + (12 / $("#dataHeader > div").length));

      dtPackage.column(3).visible(oData.status);
      dtPackage.column(4).visible(oData.status);

      dtPackage.rows.add(oData.shipment.packages).draw(false);
    }
    else {
      $("#resultHeader").json2html(oData, j2hData.error);
      $("#DTPackage_wrapper").hide();
    }
    $(".loader").hide();
  });
});

$(document).on("click", "#DTPackage > tbody > tr:not(.row-details)", function (e) {
  var bActive = $(this).hasClass("shown");

  $("#DTPackage tr.shown").removeClass("shown alert-success");
  $("#DTPackage div.row-details").slideUp(function (e) {
    $(this).find("#DTProduct").DataTable().destroy();
  });

  $("#slidein-ribbon #status-open.selected").trigger("click");
  $("#DTPackage_wrapper").removeClass("w-75");

  if (bActive)
    return;

  var oRow = dtPackage.row($(this));
  oRow.child(json2html.transform(oRow.data(), j2hData.details), "no-padding row-details shown").show();

  $("#DTPackage tr.shown div.row-details #DTProduct").DataTable({
    columns: [
      {
        title: "{$ iFrame.Tracking.Product $}"
      },
      {
        title: "{$ iFrame.Tracking.Order $}"
      },
      {
        className: "text-right",
        title: "{$ iFrame.Tracking.Qty $}"
      },
    ],
    autoWidth: false,
    info: false,
    ordering: false,
    paging: false,
    searching: false,
  });

  $(this).addClass("shown alert-success");
  $("#DTPackage tr.shown div.row-details").slideDown();

  if (oData.status == 0)
    return;

  dtTracking.rows().remove();
  dtTracking.rows.add(oRow.data().status).draw(false);
  $("#DTPackage_wrapper").addClass("w-75");
  $("#slidein-ribbon #status-open").trigger("click");

});

$(document).on("click", "#slidein-modal, #slidein-close", function () {
  $("#DTPackage tr.shown").trigger("click");
});