// #region Json2Html
var j2hData = {
  "details": {
    "<>": "div", "id": "row-${id}", "class": "row-details w-100", "html": [
      {
        "<>": "table", "id": "DT_Row-${id}", "class": "item-details w-100", "html": [
          {
            "<>": "thead", "html": "<tr><th></th><th></th><th></th><th></th><th></th></tr>" 
          },
          {
            "<>": "tbody", "html": function () {
              return $.json2html(this.items, j2hData.line);
            }
          }
        ]
      }
    ]
  },
  "line": {
    "<>": "tr", "html": [
      {
        "<>": "td", "html": function () {
          var sHtml = "<b style='font-size: 1.2em'>" + this.description + "</b><br><b>VPN:</b> " + this.mfrPartNbr + " | <b>SKU:</b> " + this.sku;
          if (this.eanCode != "")
            sHtml += " | <b>EAN:</b> " + this.eanCode;
          if (this.custPartNbr != "")
            sHtml += " | <b>CPN:</b> " + this.custPartNbr;
          if (this.serialNbr != "")
            sHtml += "<br><b>{$ iFrame.RMA-2-1.Serials $}:</b> " + this.serialNbr;
          if (this.invoiceNbr != "" || this.custPO != "")
            sHtml += "<br>";
          if (this.invoiceNbr != "") {
            sHtml += "<b>{$ iFrame.RMA-2-1.InvoiceNumber $}:</b> " + this.invoiceNbr;
            if (this.invoiceDate != "")
              sHtml +=  " | <b>{$ iFrame.RMA-2-1.InvoiceDate $}:</b> " + moment(this.invoiceDate).format("L");
          }
          if (this.invoiceNbr != "" && this.custPO != "")
            sHtml += " | ";
          if (this.custPO != "")
            sHtml += "<b>{$ iFrame.RMA-2-1.OrderNbr $}:</b> " + this.custPO;

          return sHtml;
        } 
      },
      {
        "<>": "td", "html": function () {
          var sHtml = "<b>{$ iFrame.RMA-2-1.ReturnReason $}:</b> " + this.reasonText;
          if (this.process != "")
            sHtml += "<br><b>{$ iFrame.RMA-2-1.Process $}:</b> " + this.process;
          if (this.rmaId != "")
            sHtml += "<br><b>{$ iFrame.RMA-2-1.RMAId $}:</b> " + this.rmaId;
          if (this.rmaImpulse != "")
            sHtml += "<br><b>{$ iFrame.RMA-2-1.RMANumber $}:</b> " + this.rmaImpulse;

          return sHtml;
        }
      },
      {
        "<>": "td", "html": function () {
          return $.json2html(this.documents, j2hData.document);
        }
      },
      {
        "<>": "td", "html": "<b style='font-size: 1.2em'>${qty}</b>"
      },
      {
        "<>": "td", "text": "${status}"
      }
    ]
  },
  "document": {
    "<>": "div", "html": function () {
      var sLink = "<a target='_blank' title='" + this.name + "' href='";
      if (this.type == "D") {
        sLink += "/api/GetDocument.ashx?handle=" + this.id;
        if (this.name.length > 32) {
          var sExtension = this.name.substring(this.name.lastIndexOf("."), this.name.length);
          this.name = this.name.substr(0, 29 - sExtension.length) + "..." + sExtension;
        }
      }
      if (this.type == "T") {
        sLink += 'https:{% Documents["/IMonline"].GetValue("SubSiteNavigationRoot") %}/_layouts/commerceserver/im/Externalhost.aspx?site=trackandtrace&shipment=' + this.id;
        this.name = "{$ iFrame.RMA-2-1.Tracking $}";
      }
      sLink += "'><i class='fas " + this.icon + "'></i> " + this.name + "</a>";
      return sLink;
    },
  }
}
// #endregion

var dtRMA;

function collapseDetails() {
  $("#DT_RMA tbody tr[id!='" + dtRMA.activeRow + "']").removeClass("shown alert-success");
  dtRMA.rows().every(function () {
    if (dtRMA.activeRow != this.data().id) {
      $(this.node()).removeClass("shown alert-success");
      $("#DT_Row-" + this.data().id).DataTable().destroy();
      this.child.hide();
    }
  });
}

$(document).ready(function (e) {
  $("#searchFrom").datetimepicker({
    format: "L",
    locale: "{% LocalizationContext.CurrentCulture.CultureCode %}",
  });

  $("#searchTo").datetimepicker({
    format: "L",
    locale: "{% LocalizationContext.CurrentCulture.CultureCode %}",
  });

  dtRMA = $("#DT_RMA").DataTable({
    columns: [
      {
        data: "id",
        title: "{$ iFrame.RMA-2-1.ProcessId $}",
      },
      {
        data: "reference",
        title: "{$ iFrame.RMA-2-1.Reference $}",
      },
      {
        className: "text-center",
        data: "created",
        render: function (data, type) {
          if (type == "sort" || type == "type")
            return data;
          return moment(data).format("L");
        },
        title: "{$ iFrame.RMA-2-1.Date $}",
      },
      {
        data: "status",
        orderable: false,
        title: "{$ iFrame.RMA-2-1.Status $}"
      },
      {
        data: null,
        render: function (data) {
          var sIndex = "";
          $.each(data.items, function () {
            sIndex += this.mfrPartNbr + " " + this.sku + " " + this.eanCode + " " + this.custPartNbr + " " + this.description + " " + this.invoiceNbr + " " + this.invoiceDate + " " + this.custPO + " " + this.serialNbr + " " + this.statusText + " " + this.reasonCode + " " + this.reasonText + " " + this.rmaId;
          });
          return sIndex;
        },
        visible: false
      }
    ],
    ajax: {
      url: '/' + location.pathname.split("/")[1] + '/ajax/erma/overview{% if(CurrentUser.UserIsDomain) {"?customer=' + getURLParameter('customer') + '"} %}',
    },
    autoWidth: false,
    order: [[2, "desc"]],
    rowId: "id",

  }).on("init", function (e) {
    var sDateMin = "9";
    var sDateMax = "0";

    dtRMA.rows().every(function () {
      sDateMin = (sDateMin > this.data().created ? this.data().created : sDateMin);
      sDateMax = (sDateMax < this.data().created ? this.data().created : sDateMax);

    }).on("draw length.dt order.dt page.dt search.dt", function () {
      collapseDetails();
      if (dtRMA.page.info().pages <= 1)
        $(".dataTables_paginate").css("visibility", "hidden");
      else
        $(".dataTables_paginate").css("visibility", "");

      if (dtRMA.page.info().pages == 0) {
        $(dtRMA.nodes()).find("td.dataTables_empty").html(dtRMA.i18n("sEmptyTable"));

        var bActive = (3 != $("#searchStatus").selectpicker("val").length);
        if ($("#searchFrom").data("DateTimePicker").date() != null)
          bActive |= ($("#searchFrom").data("DateTimePicker").date()._i != $("#searchFrom").data("DateTimePicker").minDate()._i);
        if ($("#searchTo").data("DateTimePicker").date() != null)
          bActive |= ($("#searchTo").data("DateTimePicker").date()._i != $("#searchTo").data("DateTimePicker").maxDate()._i);

        if (bActive)
          $(dtRMA.nodes()).find("td.dataTables_empty").html(dtRMA.i18n("sEmptyTable") + "<br><a id='searchAgain' href='#'>{$ iFrame.RMA-2-1.Result.Empty $}</a>");
      }
    });

    if (!$("#searchFrom").data("DateTimePicker").minDate()) {
      $("#searchFrom").data("DateTimePicker").date(moment(sDateMin));
      $("#searchFrom").data("DateTimePicker").minDate(moment(sDateMin));
      $("#searchTo").data("DateTimePicker").date(moment(sDateMax));
      $("#searchTo").data("DateTimePicker").maxDate(moment(sDateMax));
    }
  });

  $.fn.dataTableExt.afnFiltering.push(
    function (oSettings, aData, iIndex) {
      var bShow = false;
      if (dtRMA.row(iIndex).data()) {
        var oRow = dtRMA.row(iIndex).data();
        $.each($("#searchStatus").selectpicker("val"), function () {
          bShow |= (oRow.status == this);
        });

        if ($("#searchFrom").data("DateTimePicker").date() != null && $("#searchTo").data("DateTimePicker").date() != null) {
          var sDateFrom = $("#searchFrom").data("DateTimePicker").date().format("YYYY-MM-DD");
          var sDateTo = $("#searchTo").data("DateTimePicker").date().format("YYYY-MM-DD");
          bShow &= (oRow.created >= sDateFrom || sDateFrom == "") && (oRow.created <= sDateTo || sDateTo == "");
        }
      }

      return bShow;
    }
  );

  $(".loader").hide();
});

$(document).on("click", "#DT_RMA > tbody > tr:not(.row-details)", function (e) {
  if ($(this).find("#searchAgain").length != 0) {
    $("#searchFrom").data("DateTimePicker").date($("#searchFrom").data("DateTimePicker").minDate());
    $("#searchTo").data("DateTimePicker").date($("#searchTo").data("DateTimePicker").maxDate());
    $("#searchStatus").selectpicker("selectAll");
  } else {
    var oRow = dtRMA.row($(this));
    dtRMA.activeRow = oRow.child.isShown() ? "" : oRow.data().id;

    $("#DT_RMA tbody tr[id!='" + dtRMA.activeRow + "'] div.row-details").slideUp(function (e) {
      collapseDetails();
    });

    if (dtRMA.activeRow != "") {
      oRow.child(json2html.transform(oRow.data(), j2hData.details), "no-padding row-details").show();
      $("#DT_Row-" + oRow.data().id).DataTable({
        columns: [
          {
            title: "{$ iFrame.RMA-2-1.Product $}"
          },
          {
            title: "{$ iFrame.RMA-2-1.ReturnDetails $}"
          },
          {
            title: "{$ iFrame.RMA-2-1.Documents $}"
          },
          {
            className: "text-right",
            title: "{$ iFrame.RMA-2-1.ReturnQty $}"
          },
          {
            className: "text-right text-nowrap",
            title: "{$ iFrame.RMA-2-1.Status $}"
          },
        ],
        autoWidth: false,
        info: false,
        ordering: false,
        paging: false,
        searching: false,
      });
      $(this).addClass("shown alert-success");
      $("#DT_RMA tbody tr div[id='row-" + dtRMA.activeRow + "']").slideDown();
    }
  }
});

$(document).on("changed.bs.select", "#searchStatus", function (e) {
  if ($("#searchStatus").selectpicker("val").length == 0)
    $("#searchStatus").selectpicker("selectAll");

  if (dtRMA)
    dtRMA.draw(false);
});

$(document).on("dp.change keyup", ".datetimepicker", function (e) {
  if (dtRMA)
    dtRMA.draw(false);
});
