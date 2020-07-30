var j2hDOM = {
  // #region DOM SlideIn
  basketRibbon: {
    "<>": "div", "id": "slidein-buttons", "html": [
      {
        "<>": "a", "id": "menu-basket", "href": "#", "title": "{$ CTO.DellPQ.Ribbon.Title $}", "data-item": "basket"
      },
    ]
  },
  basketSlideIn: {
    "<>": "div", "id": "slidein-item", "html": [
      {
        "<>": "div", "id": "slidein-basket", "class": "slidein-item CartSettingsPanel", "data-item": "basket", "html": [
          {
            "<>": "h2", "text": "{$ CTO.DellPQ.Ribbon.Title $}"
          },
          {
            "<>": "table", "id": "DTProductList", "class": "w-100", "html": function () {
              return "<tbody></tbody>" +
                "<tfoot class='text-right text-nowrap'>" +
                "<tr class='configTotal'>" +
                "<td class='bold'>{$ CTO.DellPQ.Ribbon.PriceTotal $}:</td>" +
                "<td class='bold' id='configTotal'></td>" +
                "</tr>" +
                "</tfoot>";
            },
          },
          {
            "<>": "div", "id": "DTProductSummary", "class": "mt-5", "html": function () {
              return "<div class='row'>" +
                "<div class='col-xs-4 pl-0 bold my-auto text-nowrap required'>{$ CTO.DellPQ.Ribbon.Name $}:</div>" +
                "<div class='col-xs-8'><input type='text' id='configName' data-field='name' class='form-control' required='true' placeholder='{$ CTO.DellPQ.Ribbon.Name $}'></div>" +
                "<input type='hidden' id='configId' data-field='id' value='0'>" +
                "</div>";
            }
          },
          {
            "<>": "div", "html": [
              {
                "<>": "div", "class": "basketContinue mt-5 row", "id": "basketActions", "html": function () {
                  return "<div class='offset-1 col-xs-5'>" +
                    "<span class='btn btn-primary btn-block mb-4' id='btnSave'>{$ CTO.DellPQ.Ribbon.Save $} <i class='fas fa-save'></i></span>" +
                    "<span class='btn btn-primary btn-block mb-4' id='btnCopy'>{$ CTO.DellPQ.Ribbon.Copy $} <i class='fas fa-copy'></i></span>" +
                    "<span class='btn btn-primary btn-block mb-4' id='btnProceed'>{$ CTO.DellPQ.Ribbon.Order $} <i class='fas fa-cart-arrow-down'></i></span>" +
                    "</div>" +
                    "<div class='col-xs-5'>" +
                    "<span class='btn btn-danger btn-block mb-4' id='btnDelete'>{$ CTO.DellPQ.Ribbon.Delete $} <i class='fas fa-trash-alt'></i></span>" +
                    "<span class='btn btn-success btn-block mb-4' id='btnExcel'>{$ CTO.DellPQ.Ribbon.Excel $} <i class='fas fa-file-excel'></i></span>" +
                    "</div>";
                }
              },
              {
                "<>": "div", "class": "basketContinue mt-5 row", "id": "basketOrder", "html": [
                  {
                    "<>": "div", "class": "row", "html": function () {
                      return "<div class='row w-100 bold'>{$ CTO.DellPQ.Ribbon.Contact $}:</div>" +
                        "<div class='col-xs-4 my-auto required'>{$ CTO.DellPQ.Ribbon.Contact.Name $}:</div>" +
                        "<div class='col-xs-8'><input class='form-control' id='contactName' data-field='contactName' required='true'></div>" +
                        "<div class='col-xs-4 my-auto required'>{$ CTO.DellPQ.Ribbon.Contact.Phone $}:</div>" +
                        "<div class='col-xs-8'><input class='form-control' id='contactPhone' data-field='contactPhone' required='true'></div>" +
                        "<div class='col-xs-4 my-auto required'>{$ CTO.DellPQ.Ribbon.Contact.Email $}:</div>" +
                        "<div class='col-xs-8'><input class='form-control' id='contactEmail' data-field='contactEmail' required='true'></div>";
                    }
                  },
                  {
                    "<>": "div", "class": "row mt-5", "html": function () {
                      return "<div class='row w-100 bold'>{$ CTO.DellPQ.Ribbon.Delivery $}:</div>" +
                        "<div class='col-xs-4 my-auto'>{$ CTO.DellPQ.Ribbon.Delivery.Name1 $}:</div>" +
                        "<div class='col-xs-8'><input class='form-control' id='shipName1' data-field='shipName1'></div>" +
                        "<div class='col-xs-4 my-auto'>{$ CTO.DellPQ.Ribbon.Delivery.Name2 $}:</div>" +
                        "<div class='col-xs-8'><input class='form-control' id='shipName2' data-field='shipName2'></div>" +
                        "<div class='col-xs-4 my-auto'>{$ CTO.DellPQ.Ribbon.Delivery.Street $}:</div>" +
                        "<div class='col-xs-8'><input class='form-control' id='shipStreet' data-field='shipStreet'></div>" +
                        "<div class='col-xs-4 my-auto'>{$ CTO.DellPQ.Ribbon.Delivery.ZIP $} / {$ CTO.DellPQ.Ribbon.Delivery.City $}:</div>" +
                        "<div class='col-xs-2'><input class='form-control' id='shipZip' data-field='shipZip'></div>" +
                        "<div class='col-xs-6'><input class='form-control' id='shipCity' data-field='shipCity'></div>" +
                        "<div class='col-xs-4 my-auto'>{$ CTO.DellPQ.Ribbon.Delivery.Country $}:</div>" +
                        "<div class='col-xs-8' id='article-ship-countries'></div>";
                    }
                  },
                  {
                    "<>": "div", "class": "offset-2 col-xs-8 my-5", "html": "<span class='btn btn-primary btn-block btnSubmit' id='btnSubmit'>{$ CTO.DellPQ.Ribbon.Submit $} <i class='fas fa-shopping-cart'></i></span>"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  ordersRibbon: {
    "<>": "div", "id": "slidein-buttons", "html": [
      {
        "<>": "a", "id": "menu-orders", "href": "#", "title": "{$ CTO.DellPQ.Ribbon.Title $}", "data-item": "orders"
      },
    ]
  },
  ordersSlideIn: {
    "<>": "div", "id": "slidein-item", "html": [
      {
        "<>": "div", "id": "slidein-orders", "class": "slidein-item CartSettingsPanel", "data-item": "orders", "html": [
          {
            "<>": "h2", "text": "{$ CTO.DellPQ.Orders.Ribbon.Title $}"
          },
          {
            "<>": "table", "id": "DTProductList", "class": "w-100", "html": function () {
              return "<tbody></tbody>" +
                "<tfoot class='text-right text-nowrap'>" +
                "<tr class='configTotal'>" +
                "<td class='bold'>{$ CTO.DellPQ.Ribbon.PriceTotal $}:</td>" +
                "<td class='bold' id='configTotal'></td>" +
                "</tr>" +
                "</tfoot>";
            },
          },
          {
            "<>": "div", "id": "DTProductSummary", "class": "mt-5", "html": function () {
              return "<div class='row'>" +
                "<div class='col-xs-4 pl-0 bold my-auto'>{$ CTO.DellPQ.Ribbon.Name $}:</div>" +
                "<div class='col-xs-8'><input type='text' id='configName' data-field='name' class='form-control' readonly='readonly'></div>" +
                "<input type='hidden' id='configId' data-field='id' value='0'>" +
                "</div>";
            }
          },
          {
            "<>": "div", "class": "row mt-5", "html": function () {
              return "<div class='row w-100 bold'>{$ CTO.DellPQ.Ribbon.Contact $}:</div>" +
                "<div class='col-xs-4 my-auto'>{$ CTO.DellPQ.Ribbon.Contact.Name $}:</div>" +
                "<div class='col-xs-8'><input class='form-control readonly' readonly='readonly' id='contactName' data-field='contactName'></div>" +
                "<div class='col-xs-4 my-auto'>{$ CTO.DellPQ.Ribbon.Contact.Phone $}:</div>" +
                "<div class='col-xs-8'><input class='form-control readonly' readonly='readonly' id='contactPhone' data-field='contactPhone'></div>" +
                "<div class='col-xs-4 my-auto'>{$ CTO.DellPQ.Ribbon.Contact.Email $}:</div>" +
                "<div class='col-xs-8'><input class='form-control readonly' readonly='readonly' id='contactEmail' data-field='contactEmail'></div>";
            }
          },
          {
            "<>": "div", "class": "row mt-5", "html": function () {
              return "<div class='row w-100 bold'>{$ CTO.DellPQ.Ribbon.Delivery $}:</div>" +
                "<div class='col-xs-4 my-auto'>{$ CTO.DellPQ.Ribbon.Delivery.Name1 $}:</div>" +
                "<div class='col-xs-8'><input class='form-control' readonly='readonly' id='shipName1' data-field='shipName1'></div>" +
                "<div class='col-xs-4 my-auto'>{$ CTO.DellPQ.Ribbon.Delivery.Name2 $}:</div>" +
                "<div class='col-xs-8'><input class='form-control' readonly='readonly' id='shipName2' data-field='shipName2'></div>" +
                "<div class='col-xs-4 my-auto'>{$ CTO.DellPQ.Ribbon.Delivery.Street $}:</div>" +
                "<div class='col-xs-8'><input class='form-control' readonly='readonly' id='shipStreet' data-field='shipStreet'></div>" +
                "<div class='col-xs-4 my-auto'>{$ CTO.DellPQ.Ribbon.Delivery.ZIP $} / {$ CTO.DellPQ.Ribbon.Delivery.City $}:</div>" +
                "<div class='col-xs-2'><input class='form-control' readonly='readonly' id='shipZip' data-field='shipZip'></div>" +
                "<div class='col-xs-6'><input class='form-control' readonly='readonly' id='shipCity' data-field='shipCity'></div>" +
                "<div class='col-xs-4 my-auto'>{$ CTO.DellPQ.Ribbon.Delivery.Country $}:</div>" +
                "<div class='col-xs-8' id='article-ship-countries'></div>";
            }
          },
          {
            "<>": "div", "class": "mt-5 row", "html": function () {
              return "<div class='offset-1 col-xs-5'>" +
                "<span class='btn btn-primary btn-block mb-4' id='btnCopy'>{$ CTO.DellPQ.Ribbon.Copy $} <i class='fas fa-copy'></i></span>" +
                "</div>" +
                "<div class='col-xs-5'>" +
                "<span class='btn btn-success btn-block mb-4' id='btnExcel'>{$ CTO.DellPQ.Ribbon.Excel $} <i class='fas fa-file-excel'></i></span>" +
                "</div>";
            }
          }
        ]
      }
    ]
  },
  // #endregion

  // #region DOM Basket
  basket: {
    "<>": "div", "html": [
      {
        "<>": "div", "class": "dataTables_search", "for": "DTBasket", "html": [
          {
            "<>": "div", "class": "searchItem", "html": [
              {
                "<>": "label", "class": "col-xs-2", "text": "{$ CTO.DellPQ.Basket.Search $}:"
              },
              {
                "<>": "input", "class": "col-xs-4", "placeholder": "{$ CTO.DellPQ.Basket.Example $}"
              },
              {
                "<>": "i", "class": "fas fa-2x fa-times reset"
              }
            ]
          },
        ]
      },
      {
        "<>": "table", "class": "DTBasket row-border w-100", "id": "DTBasket", "html": [
          {
            "<>": "tbody", "text": ""
          }
        ]
      }
    ]
  },
  basketData: {
    "<>": "div", "html": [
      {
        "<>": "div", "class": "row mb-4", "quote": "${id}", "html": function () {
          var sHTML = "<div class='col-xs-8'><h3>" + this.id + " - {$ CTO.DellPQ.Basket.Configuration $} \"" + this.name + "\" {$ CTO.DellPQ.Basket.Created $} " + this.created + "</h3></div>";
          if (this.status != "") {
            sHTML += "<div class='col-xs-4 text-right'><span class='btn btn-danger btnDelete' id='" + this.id + "'>{$ CTO.DellPQ.Basket.Delete $} <i class='fas fa-trash-alt'></i></span></div>";
          }
          else if (this.code != "SAV") {
            sHTML += "<div class='col-xs-4 text-right'><span class='btn btn-primary btnOpen' id='" + this.id + "'>{$ CTO.DellPQ.Basket.Open $} <i class='fas fa-external-link-square-alt'></i></span></div>";
          }
          else {
            sHTML += "<div class='col-xs-4 text-right'><span class='btn btn-primary mr-2 btnOrder' id='" + this.id + "'>{$ CTO.DellPQ.Basket.Order $} <i class='fas fa-cart-arrow-down'></i></span>";
            sHTML += "<span class='btn btn-primary btnOpen' id='" + this.id + "'>{$ CTO.DellPQ.Basket.Open $} <i class='fas fa-external-link-square-alt'></i></span></div>";
          }
          return sHTML;
        },
      },
      {
        "<>": "div", "class": "row", "html": [
          {
            "<>": "div", "class": "col-xs-3", "html": [
              {
                "<>": "img", "src": function () {
                  return this.items[0].image;
                }
              }
            ]
          },
          {
            "<>": "div", "class": "col-xs-9", "html": function () {
              if (this.status != "")
                return "{$ CTO.DellPQ.Basket.Error $}";

              var iAvail = 9999;
              var dPrice = 0;
              $.each(this.items, function (iQuote, oQuote) {
                $.each(oQuote.items, function () {
                  iAvail = Math.min(iAvail, parseInt(this.avail / this.qty));
                  dPrice += this.price * this.qty * oQuote.qty;
                });
              });
              this.avail = iAvail;
              this.price = parseFloat(dPrice.toFixed(2));

              var sHTML = "<li>" + this.codeText + " {$ CTO.DellPQ.Basket.By $} " + this.user + "</li>";
              sHTML += "<li><b>" + this.items.length + "</b> {$ CTO.DellPQ.Basket.Systems $}</li>";
              sHTML += "<li>{$ CTO.DellPQ.Basket.PriceTotal $}: <b>" + localizePrice(this.price) + "</b></li>";
              sHTML += "<li>{$ CTO.DellPQ.Basket.Available $}: <b>" + this.avail + " {$ CTO.DellPQ.Basket.Pieces $}</b></li>";

              return sHTML;
            }
          },
        ]
      }
    ]
  },
  // #endregion

  // #region DOM Orders
  orders: {
    "<>": "div", "html": [
      {
        "<>": "div", "class": "dataTables_search", "for": "DTOrders", "html": [
          {
            "<>": "div", "class": "searchItem", "html": [
              {
                "<>": "label", "class": "col-xs-2", "text": "{$ CTO.DellPQ.Basket.Search $}:"
              },
              {
                "<>": "input", "class": "col-xs-4", "placeholder": "{$ CTO.DellPQ.Basket.Example $}"
              },
              {
                "<>": "i", "class": "fas fa-2x fa-times reset"
              }
            ]
          },
        ]
      },
      {
        "<>": "table", "class": "DTBasket row-border w-100", "id": "DTOrders", "html": [
          {
            "<>": "tbody", "text": ""
          }
        ]
      }
    ]
  },
  orderData: {
    "<>": "div", "html": [
      {
        "<>": "div", "class": "row mb-4", "html": [
          {
            "<>": "div", "class": "col-xs-8", "html": "<h3>${id} - {$ CTO.DellPQ.Basket.Configuration $} \"${name}\" {$ CTO.DellPQ.Orders.Ordered $} ${modified}</h3>"
          },
          {
            "<>": "div", "class": "col-xs-4 text-right", "html": [
              {
                "<>": "span", "class": "btn btn-primary btnOpen", "id": "${id}", "html": "{$ CTO.DellPQ.Basket.Open $} <i class='btnOpen fas fa-external-link-square-alt'></i>"
              }
            ]
          }
        ]
      },
      {
        "<>": "div", "class": "row", "html": [
          {
            "<>": "div", "class": "col-xs-3", "html": [
              {
                "<>": "img", "src": function () {
                  return this.items[0].image;
                }
              }
            ]
          },
          {
            "<>": "div", "class": "col-xs-9", "html": function () {
              var dPrice = 0;
              $.each(this.items, function (iQuote, oQuote) {
                $.each(oQuote.items, function () {
                  dPrice += this.price * this.qty * oQuote.qty;
                });
              });
              this.price = parseFloat(dPrice.toFixed(2));

              var sHTML = "<li>" + this.codeText + " {$ CTO.DellPQ.Basket.By $} " + this.user + "</li>";
              sHTML += "<li><b>" + this.items.length + "</b> {$ CTO.DellPQ.Basket.Systems $}</li>";
              sHTML += "<li>{$ CTO.DellPQ.Basket.PriceTotal $}: <b>" + localizePrice(this.price) + "</b></li>";

              return sHTML;
            }
          },
        ]
      }
    ]
  }
  // #endregion
};

$(document).ready(function () {
  if (getURLParameter("env")) {
    $("a[href!='#']").each(function () {
      var sHref = $(this).attr("href");
      sHref += (sHref.indexOf("?") == -1 ? "?" : "&") + "env=" + getURLParameter("env");
      $(this).attr("href", sHref);
    });
  }

  if ($("#cto").attr("node") == "config") {
    $("div.header, #teaser").hide();
    $.getJSON("/api/cto/DellPQ-Punchout.ashx?env=" + getURLParameter("env"), function (data) {
      if (data.error == 0)
        $("#cto").html("<iframe id='ifrCTOHost' name='ifrCTOHost' class='w-100' style='height: 1024px' frameborder=0 src='" + data.url + "'></iframe>");
      // sandbox='allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-same-origin allow-scripts allow-top-navigation'

      iFrameResize({ }, '#ifrCTOHost');
      $(".loader").fadeOut(300);
      $("#cto").fadeIn(300);
    });
    return;
  }

  if ($("#cto").attr("node") == "basket") {
    $.getJSON("ajax/basket", function (data) {
      oBasket = data;
      $("#cto").json2html(oBasket, j2hDOM.basket);

      $("#DTBasket").DataTable({
        columns: [
          {
            data: null,
            render: function (data) {
              return json2html.transform(data, j2hDOM.basketData);
            },
            width: "100%"
          }
        ],
        autoWidth: false,
        ordering: false,
        rowId: "id",
      });
      $("#DTBasket").DataTable().rows.add(oBasket.data).draw(false);
      if ($("#DTBasket").DataTable().rows().count() > 10)
        $("#DTBasket_paginate, #DTBasket_info").show();

      if (getURLParameter("id") != "")
        $("#DTBasket .btnOpen[id='" + getURLParameter("id") + "']").trigger("click")

      $(".loader").fadeOut(300);
      $("#cto").fadeIn(300);
    });
    return;
  }

   if ($("#cto").attr("node") == "orders") {
    $.getJSON("ajax/orders", function (data) {
      oBasket = data;
      $("#cto").json2html(oBasket, j2hDOM.orders);

      $("#DTOrders").DataTable({
        columns: [
          {
            data: null,
            render: function (data) {
              return json2html.transform(data, j2hDOM.orderData);
            },
            width: "100%"
          }
        ],
        autoWidth: false,
        ordering: false,
        rowId: "id",
      });
      $("#DTOrders").DataTable().rows.add(oBasket.data).draw(false);
      if ($("#DTOrders").DataTable().rows().count() > 10)
        $("#DTOrders_paginate, #DTOrders_info").show();

      if (getURLParameter("id") != "")
        $("#DTOrders .btnOpen[id='" + getURLParameter("id") + "']").trigger("click")

      $(".loader").fadeOut(300);
      $("#cto").fadeIn(300);
    });
    return;
  }

  /*if ($("#cto").attr("node") == "imonline") {
    $.getJSON("ajax/transfer?id=" + getURLParameter("id"), function (data) {
      $.post("{% Settings.IMOnline %}site/BasketServiceApi/AddToBasketAsync", data, function (data) {
        alert(JSON.stringify(data));
      });
    });
    return;
  }*/

  $(".loader").fadeOut(300);
  $("#cto").fadeIn(300);
});

$(document).on("click", "#DTBasket .btnDelete", function (e) {
  $("#configId").val($(this).attr("id"));
  $("#slidein-basket #btnDelete").trigger("click");
});

$(document).on("click", "#DTBasket .btnOpen", function (e) {
  oRow = $("#DTBasket").DataTable().row($(this).closest("tr")).data();
  waitFor($("#shipCountry option"), function () {
    var oDTList = $("#DTProductList").DataTable();
    oDTList.clear();
    $(this).closest("tr").addClass("active");
    $.each(oRow.items, function () {
      oDTList.row.add(this);
      oDTList.rows.add(this.items).draw(false);
    });

    $("#slidein-basket input").removeAttr("disabled").removeAttr("readonly").removeClass("readonly");

    json2form(oRow, "#slidein-basket");
    $("#configTotal").data("total", oRow.price).html(localizePrice(oRow.price));

    $("#slidein-basket .basketContinue").removeClass("show").hide();
    $("#slidein-basket #basketActions").addClass("show").show();

    $("#menu-basket").trigger("click");
  });
});

$(document).on("click", "#DTBasket .btnOrder", function (e) {
  $("#DTBasket .btnOpen[id='" + $(this).attr("id") + "']").trigger("click");
  $("#btnProceed").trigger("click");
});

$(document).on("click", "#DTOrders .btnOpen", function (e) {
  var oRow = $("#DTOrders").DataTable().row($(this).closest("tr")).data();
  waitFor($("#shipCountry option"), function () {
    var oDTList = $("#DTProductList").DataTable();
    oDTList.clear();
    $(this).closest("tr").addClass("active");
    $.each(oRow.items, function () {
      oDTList.row.add(this);
      oDTList.rows.add(this.items).draw(false);
    });

    json2form(oRow, "#slidein-orders");
    $("#shipCountry").attr("readonly", "readonly").attr("disabled", "disabled").addClass("readonly");
    $("#configTotal").data("total", oRow.price).html(localizePrice(oRow.price));

    $("#menu-orders").trigger("click");
  });
});

$(document).on("click", "#btnCopy", function (e) {
  $.getJSON("ajax/copy?id=" + $("#configId").val(), function (data) {
    if (data.status == "ok")
      location.href = "basket?id=" + data.id;
    else
      alert("{$ CTO.DellPQ.Ribbon.Copy.Error $}");
  });
});

$(document).on("click", "#btnDelete", function (e) {
  if (!confirm("{$ CTO.DellPQ.Ribbon.Delete.Message $}"))
    return false;

  $.getJSON("ajax/delete?id=" + $("#configId").val(), function (data) {
    if (data.status == "ok")
      window.location.reload();
    else
      alert("{$ CTO.DellPQ.Ribbon.Delete.Error $}");
  });
});

$(document).on("click", "#btnExcel", function (e) {
  location.href = "ajax/export.xlsx?id=" + $("#configId").val();
});

$(document).on("click", "#btnSave", function (e) {
  if ($("#configName").val().trim() == "") {
    alert("{$ CTO.DellPQ.Ribbon.Required $}");
    return;
  }

  $.getJSON("ajax/update?id=" + $("#configId").val() + "&name=" + encodeURIComponent($("#configName").val().trim()), function (data) {
    if (data.status == "ok")
      window.location = "basket?id=" + $("#configId").val();
    else
      alert("{$ CTO.DellPQ.Ribbon.Save.Error $}");
  });
});

$(document).on("click", "#btnSubmit", function (e) {
  if (!checkData("#slidein-basket")) {
    alert("{$ CTO.DellPQ.Ribbon.Required $}");
    return;
  }

  var oOrder = {
    data: form2json("#slidein-basket")
  };
  $.post("ajax/submit", "bom=" + JSON.stringify(oOrder), function (data) {
    if (data.status == "ok") {
      alert("{$ CTO.DellPQ.Ribbon.Order.Success $}");
      location.href = "orders?id=" + $("#configId").val();
    } else {
      alert("{$ CTO.DellPQ.Ribbon.Order.Error $}");
    }
  });
});

$(document).on("click", "#btnProceed", function (e) {
  $("#slidein-basket .basketContinue").toggleClass("show").slideToggle(300);
});

$(document).on("click", "#slidein-ribbon a.selected", function (e) {
  $("#DTBasket tr, #DTOrders tr").removeClass("active");
});
