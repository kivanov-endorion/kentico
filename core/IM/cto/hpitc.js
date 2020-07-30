var j2hDOM = {
  // #region DOM SlideIn
  basketRibbon: {
    "<>": "div", "id": "slidein-buttons", "html": [
      {
        "<>": "a", "id": "menu-basket", "href": "#", "title": "{$ CTO.HPITC.Ribbon.Title $}", "data-item": "basket"
      },
    ]
  },
  basketSlideIn: {
    "<>": "div", "id": "slidein-item", "html": [
      {
        "<>": "div", "id": "slidein-basket", "class": "slidein-item CartSettingsPanel", "data-item": "basket", "html": [
          {
            "<>": "h2", "text": "{$ CTO.HPITC.Ribbon.Title $}"
          },
          {
            "<>": "table", "id": "DTProductList", "class": "w-100", "html": function () {
              return "<tbody></tbody>" +
                "<tfoot class='text-right text-nowrap'>" +
                  "<tr class='configAmount'>" +
                    "<td class='bold'>{$ CTO.HPITC.Ribbon.PriceSingle $}:</td>" +
                    "<td class='bold' id='configAmount'></td>" +
                  "</tr>" +
                  "<tr>" +
                    "<td class='bold'><label for='configQuantity' class='required'>{$ CTO.HPITC.Ribbon.Quantity $}:</label></td>" +
                    "<td>" +
                      "<input class='form-control float-right' id='configQuantity' data-field='qty'>" +
                      "<div class='arrows'><div data-step='1'><i class='fas fa-chevron-up'></i></div><div data-step='-1'><i class='fas fa-chevron-down'></i></div></div>" +
                    "</td>" +
                  "</tr>" +
                  "<tr class='configTotal'>" +
                    "<td class='bold'>{$ CTO.HPITC.Ribbon.PriceTotal $}:</td>" +
                    "<td class='bold' id='configTotal'></td>" +
                  "</tr>" +
                "</tfoot>";
            },
          },
          {
            "<>": "div", "id": "DTProductError", "class": "mt-5", "html": "{$ CTO.HPITC.Ribbon.Error $}"
          },
          {
            "<>": "div", "id": "DTProductSummary", "class": "mt-5", "html": function () {
              return "<div class='row'>" +
                  "<div class='col-xs-4 pl-0 bold my-auto text-nowrap required'>{$ CTO.HPITC.Ribbon.Name $}:</div>" +
                  "<div class='col-xs-8'><input type='text' id='configName' data-field='name' class='form-control' required='true' placeholder='{$ CTO.HPITC.Ribbon.Name $}'></div>" +
                  "<input type='hidden' id='configId' data-field='quote' value='0'>" +
                "</div>";
            }
          },
          {
            "<>": "div", "class": "row mt-5", "html": function () {
              return "<div class='row w-100 bold'>{$ CTO.HPITC.Ribbon.Project $}:</div>" +
                "<div class='col-xs-4 my-auto'>{$ CTO.HPITC.Ribbon.Project.Nbr $}:</div>" +
                "<div class='col-xs-8'><input class='form-control readonly' readonly='readonly' id='sboNbr' data-field='sboNbr' size='35'></div>" +
                "<div class='col-xs-4 my-auto'>{$ CTO.HPITC.Ribbon.Project.Bundle $}:</div>" +
                "<div class='col-xs-8'><input class='form-control readonly' readonly='readonly' id='sboBundle' data-field='sboBundle' size='35'></div>";
            }
          },
          {
            "<>": "div", "class": "basketContinue mt-5 row", "id": "basketActions", "html": function () {
              return "<div class='offset-1 col-xs-5'>" +
                  "<span class='btn btn-primary btn-block mb-4' id='btnSave'>{$ CTO.HPITC.Ribbon.Save $} <i class='fas fa-save'></i></span>" +
                  "<span class='btn btn-primary btn-block mb-4' id='btnModify'>{$ CTO.HPITC.Ribbon.Change $} <i class='fas fa-tools'></i></span>" +
                  "<span class='btn btn-primary btn-block mb-4' id='btnCopy'>{$ CTO.HPITC.Ribbon.Copy $} <i class='fas fa-copy'></i></span>" +
                  "<span class='btn btn-primary btn-block mb-4' id='btnProceed'>{$ CTO.HPITC.Ribbon.Order $} <i class='fas fa-cart-arrow-down'></i></span>" +
                "</div>" +
                "<div class='col-xs-5'>" +
                  "<span class='btn btn-danger btn-block mb-4' id='btnDelete'>{$ CTO.HPITC.Ribbon.Delete $} <i class='fas fa-trash-alt'></i></span>" +
                  "<span class='btn btn-success btn-block mb-4' id='btnSmartQuote'>{$ CTO.HPITC.Ribbon.SmartQuote $} <i class='fas fa-star'></i></span>" +
                  "<span class='btn btn-success btn-block mb-4' id='btnExcel'>{$ CTO.HPITC.Ribbon.Excel $} <i class='fas fa-file-excel'></i></span>" +
                "</div>";
            }
          },
          {
            "<>": "div", "class": "basketContinue row mt-5", "id": "basketOrder", "html": [
              {
                "<>": "div", "class": "row", "html": function () {
                  return "<div class='row w-100 bold'>{$ CTO.HPITC.Ribbon.Contact $}:</div>" +
                    "<div class='col-xs-4 my-auto required'>{$ CTO.HPITC.Ribbon.Contact.Name $}:</div>" +
                    "<div class='col-xs-8'><input class='form-control' id='contactName' data-field='contactName' required='true'></div>" +
                    "<div class='col-xs-4 my-auto required'>{$ CTO.HPITC.Ribbon.Contact.Phone $}:</div>" +
                    "<div class='col-xs-8'><input class='form-control' id='contactPhone' data-field='contactPhone' required='true'></div>" +
                    "<div class='col-xs-4 my-auto required'>{$ CTO.HPITC.Ribbon.Contact.Email $}:</div>" +
                    "<div class='col-xs-8'><input class='form-control' id='contactEmail' data-field='contactEmail' required='true'></div>";
                }
              },
              {
                "<>": "div", "class": "row mt-5", "html": function () {
                  return "<div class='row w-100 bold'>{$ CTO.HPITC.Ribbon.Delivery $}:</div>" +
                    "<div class='col-xs-4 my-auto'>{$ CTO.HPITC.Ribbon.Delivery.Name1 $}:</div>" +
                    "<div class='col-xs-8'><input class='form-control' id='shipName1' data-field='shipName1'></div>" +
                    "<div class='col-xs-4 my-auto'>{$ CTO.HPITC.Ribbon.Delivery.Name2 $}:</div>" +
                    "<div class='col-xs-8'><input class='form-control' id='shipName2' data-field='shipName2'></div>" +
                    "<div class='col-xs-4 my-auto'>{$ CTO.HPITC.Ribbon.Delivery.Street $}:</div>" +
                    "<div class='col-xs-8'><input class='form-control' id='shipStreet' data-field='shipStreet'></div>" +
                    "<div class='col-xs-4 my-auto'>{$ CTO.HPITC.Ribbon.Delivery.ZIP $} / {$ CTO.HPITC.Ribbon.Delivery.City $}:</div>" +
                    "<div class='col-xs-2'><input class='form-control' id='shipZip' data-field='shipZip'></div>" +
                    "<div class='col-xs-6'><input class='form-control' id='shipCity' data-field='shipCity'></div>" +
                    "<div class='col-xs-4 my-auto'>{$ CTO.HPITC.Ribbon.Delivery.Country $}:</div>" +
                    "<div class='col-xs-8' id='article-ship-countries'></div>";
                }
              },
              {
                "<>": "div", "class": "offset-2 col-xs-8 my-5", "html": "<span class='btn btn-primary btn-block btnSubmit' id='btnSubmit'>{$ CTO.HPITC.Ribbon.Submit $} <i class='fas fa-shopping-cart'></i></span>"
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
        "<>": "a", "id": "menu-orders", "href": "#", "title": "{$ CTO.HPITC.Orders.Ribbon.Title $}", "data-item": "orders"
      },
    ]
  },
  ordersSlideIn: {
    "<>": "div", "id": "slidein-item", "html": [
      {
        "<>": "div", "id": "slidein-orders", "class": "slidein-item CartSettingsPanel", "data-item": "orders", "html": [
          {
            "<>": "h2", "text": "{$ CTO.HPITC.Orders.Ribbon.Title $}"
          },
          {
            "<>": "table", "id": "DTProductList", "class": "w-100", "html": function () {
              return "<tbody></tbody>" +
                "<tfoot class='text-right text-nowrap'>" +
                  "<tr class='configAmount'>" +
                    "<td class='bold'>{$ CTO.HPITC.Ribbon.PriceSingle $}:</td>" +
                    "<td class='bold' id='configAmount'></td>" +
                  "</tr>" +
                  "<tr>" +
                    "<td class='bold'><label for='configQuantity' class='required'>{$ CTO.HPITC.Ribbon.Quantity $}:</label></td>" +
                    "<td>" +
                      "<input class='form-control float-right' id='configQuantity' readonly='readonly' data-field='qty'>" +
                    "</td>" +
                  "</tr>" +
                  "<tr class='configTotal'>" +
                    "<td class='bold'>{$ CTO.HPITC.Ribbon.PriceTotal $}:</td>" +
                    "<td class='bold' id='configTotal'></td>" +
                  "</tr>" +
                "</tfoot>";
            },
          },
          {
            "<>": "div", "id": "DTProductSummary", "class": "mt-5", "html": function () {
              return "<div class='row'>" +
                  "<div class='col-xs-4 pl-0 bold my-auto'>{$ CTO.HPITC.Ribbon.Name $}:</div>" +
                  "<div class='col-xs-8'><input type='text' id='configName' data-field='name' class='form-control' readonly='readonly'></div>" +
                  "<input type='hidden' id='configId' data-field='quote' value='0'>" +
                "</div>";
            }
          },
          {
            "<>": "div", "class": "row mt-5", "html": function () {
              return "<div class='row w-100 bold'>{$ CTO.HPITC.Ribbon.Project $}:</div>" +
                "<div class='col-xs-4 my-auto'>{$ CTO.HPITC.Ribbon.Project.Nbr $}:</div>" +
                "<div class='col-xs-8'><input class='form-control readonly' readonly='readonly' id='sboNbr' data-field='sboNbr' size='35'></div>" +
                "<div class='col-xs-4 my-auto'>{$ CTO.HPITC.Ribbon.Project.Bundle $}:</div>" +
                "<div class='col-xs-8'><input class='form-control readonly' readonly='readonly' id='sboBundle' data-field='sboBundle' size='35'></div>";
            }
          },
          {
            "<>": "div", "class": "row mt-5", "html": function () {
              return "<div class='row w-100 bold'>{$ CTO.HPITC.Ribbon.Contact $}:</div>" +
                "<div class='col-xs-4 my-auto'>{$ CTO.HPITC.Ribbon.Contact.Name $}:</div>" +
                "<div class='col-xs-8'><input class='form-control readonly' readonly='readonly' id='contactName' data-field='contactName'></div>" +
                "<div class='col-xs-4 my-auto'>{$ CTO.HPITC.Ribbon.Contact.Phone $}:</div>" +
                "<div class='col-xs-8'><input class='form-control readonly' readonly='readonly' id='contactPhone' data-field='contactPhone'></div>" +
                "<div class='col-xs-4 my-auto'>{$ CTO.HPITC.Ribbon.Contact.Email $}:</div>" +
                "<div class='col-xs-8'><input class='form-control readonly' readonly='readonly' id='contactEmail' data-field='contactEmail'></div>";
            }
          },
          {
            "<>": "div", "class": "row mt-5", "html": function () {
              return "<div class='row w-100 bold'>{$ CTO.HPITC.Ribbon.Delivery $}:</div>" +
                "<div class='col-xs-4 my-auto'>{$ CTO.HPITC.Ribbon.Delivery.Name1 $}:</div>" +
                "<div class='col-xs-8'><input class='form-control' readonly='readonly' id='shipName1' data-field='shipName1'></div>" +
                "<div class='col-xs-4 my-auto'>{$ CTO.HPITC.Ribbon.Delivery.Name2 $}:</div>" +
                "<div class='col-xs-8'><input class='form-control' readonly='readonly' id='shipName2' data-field='shipName2'></div>" +
                "<div class='col-xs-4 my-auto'>{$ CTO.HPITC.Ribbon.Delivery.Street $}:</div>" +
                "<div class='col-xs-8'><input class='form-control' readonly='readonly' id='shipStreet' data-field='shipStreet'></div>" +
                "<div class='col-xs-4 my-auto'>{$ CTO.HPITC.Ribbon.Delivery.ZIP $} / {$ CTO.HPITC.Ribbon.Delivery.City $}:</div>" +
                "<div class='col-xs-2'><input class='form-control' readonly='readonly' id='shipZip' data-field='shipZip'></div>" +
                "<div class='col-xs-6'><input class='form-control' readonly='readonly' id='shipCity' data-field='shipCity'></div>" +
                "<div class='col-xs-4 my-auto'>{$ CTO.HPITC.Ribbon.Delivery.Country $}:</div>" +
                "<div class='col-xs-8' id='article-ship-countries'></div>";
            }
          },
          {
            "<>": "div", "class": "mt-5", "html": function () {
                return "<div class='offset-1 col-xs-5'></div>" +
                  "<div class='col-xs-5'><span class='btn btn-success btn-block mb-4' id='btnExcel'>{$ CTO.HPITC.Ribbon.Excel $} <i class='fas fa-file-excel'></i></span></div>";
            }
          }
        ]
      }
    ]
  },
  // #endregion

  // #region DOM Config
  config: {
    "<>": "iframe", "id": "ifrCTOHost", "class": "w-100", "style": "height: 1024px", "frameborder": "0", "name": "ifrCTOHost"
  },
  // #endregion

  // #region DOM Projects
  project: {
    "<>": "div", "html": [
      {
        "<>": "div", "class": "dataTables_search", "for": "DTProject", "html": [
          {
            "<>": "div", "class": "searchItem", "html": [
              {
                "<>": "label", "class": "col-xs-2", "text": "{$ CTO.HPITC.Project.Search $}:"
              },
              {
                "<>": "input", "class": "col-xs-4", "placeholder": "{$ CTO.HPITC.Project.Example $}"
              },
              {
                "<>": "i", "class": "fas fa-2x fa-times reset"
              }
            ]
          },
        ]
      },
      {
        "<>": "table", "class": "DTBasket row-border w-100", "id": "DTProject", "html": [
          {
            "<>": "tbody", "text": ""
          }
        ]
      }
    ]
  },
  projectData: {
    "<>": "div", "class": "row", "html": [
      {
        "<>": "div", "class": "col-xs-12 mb-5 pb-5 px-0 opg-header", "data-opg": "${opg}", "html": [
          {
            "<>": "div", "class": "p-3 alert-success", "html": "<h2>{$ CTO.HPITC.Project.OPG $} ${opg} - ${name}</h2><h3>{$ CTO.HPITC.Project.EndCust $}: ${endCust}</h3>"
          }
        ]
      },
      {
        "<>": "div", "class": "col-xs-2 pl-5", "html": "{$ CTO.HPITC.Project.Bundle $}<br><b>${nbr}</b>"
      },
      {
        "<>": "div", "class": "col-xs-7", "html": "${description}<br>${basemodel}"
      },
      {
        "<>": "div", "class": "col-xs-3 text-right", "html": [
          {
            "<>": "span", "class": "btn btn-primary btnConfig", "href": "opg=${opg}&bundle=${nbr}&start=${start}", "html": "{$ CTO.HPITC.Project.Configure $} <i class='btnConfig fas fa-tools'></i>"
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
                "<>": "label", "class": "col-xs-2", "text": "{$ CTO.HPITC.Basket.Search $}:"
              },
              {
                "<>": "input", "class": "col-xs-4", "placeholder": "{$ CTO.HPITC.Basket.Example $}"
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
        "<>": "div", "class": "row mb-4", "html": [
          {
            "<>": "div", "class": "col-xs-8", "html": "<h3>${quote} - {$ CTO.HPITC.Basket.Configuration $} \"${name}\" {$ CTO.HPITC.Basket.Created $} ${created}</h3>"
          },
          {
            "<>": "div", "class": function () {
              if (this.status == "")
                return "hide";
              return "col-xs-4 text-right";
            }, "html": [
              {
                "<>": "span", "class": "btn btn-danger btnDelete", "quote": "${quote}", "html": "{$ CTO.HPITC.Basket.Delete $} <i class='fas fa-trash-alt'></i>"
              }
            ]
          },
          {
            "<>": "div", "class": function () {
              if (this.status != "")
                return "hide";
              return "col-xs-4 text-right";
            }, "html": [
              {
                "<>": "span", "class": "btn btn-primary mr-2 btnOrder", "quote": "${quote}", "html": "{$ CTO.HPITC.Basket.Order $} <i class='fas fa-cart-arrow-down'></i>"
              },
              {
                "<>": "span", "class": "btn btn-primary btnOpen", "quote": "${quote}", "html": "{$ CTO.HPITC.Basket.Open $} <i class='fas fa-external-link-square-alt'></i>"
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
                "<>": "img", "src": "${image}"
              }
            ]
          },
          {
            "<>": "div", "class": "col-xs-9", "html": function () {
              if (this.status != "")
                return "{$ CTO.HPITC.Basket.Error $}";

              var iAvail = 9999;
              var iQty = this.qty;
              var dPrice = 0;
              var dSDC = 0;
              $.each(this.items, function () {
                iAvail = Math.min(iAvail, parseInt(this.avail / this.qty));
                dPrice += this.price * this.qty;
                dSDC += (this.price + this.bonusSDC) * this.qty;
                this.qtyParent = iQty;
              });
              this.avail = iAvail;
              this.price = parseFloat((dPrice).toFixed(2));
              this.sdc = parseFloat((dSDC).toFixed(2));
              this.total = this.price * this.qty;

              var sHTML = "<li><b>" + this.qty + "</b> &times; " + this.title + "</li>";
              sHTML += "<li>{$ CTO.HPITC.Basket.PriceTotal $}: <b>" + localizePrice(this.total) + "</b></li>";
              //sHTML += "<li>{$ CTO.HPITC.Basket.Available $}: <b>" + this.avail + " {$ CTO.HPITC.Basket.Pieces $}</b></li>";

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
                "<>": "label", "class": "col-xs-2", "text": "{$ CTO.HPITC.Orders.Search $}:"
              },
              {
                "<>": "input", "class": "col-xs-4", "placeholder": "{$ CTO.HPITC.Orders.Example $}"
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
            "<>": "div", "class": "col-xs-8", "html": "<h3>${quote} - {$ CTO.HPITC.Orders.Configuration $} \"${name}\" {$ CTO.HPITC.Orders.Ordered $} ${modified}</h3>"
          },
          {
            "<>": "div", "class": "col-xs-4 text-right", "html": [
              {
                "<>": "span", "class": "btn btn-primary btnOpen", "quote": "${quote}", "html": "{$ CTO.HPITC.Orders.Open $} <i class='btnOpen fas fa-external-link-square-alt'></i>"
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
                "<>": "img", "src": "${image}"
              }
            ]
          },
          {
            "<>": "div", "class": "col-xs-9", "html": function () {
              var dPrice = 0;
              $.each(this.items, function () {
                dPrice += this.price * this.qty;
              });
              this.price = parseFloat((dPrice * this.qty).toFixed(2));

              var sHTML = "<li><b>" + this.qty + "</b> &times; " + this.title + "</li>";
              sHTML += "<li>{$ CTO.HPITC.Orders.PriceTotal $}: <b>" + localizePrice(this.price) + "</b></li>";

              return sHTML;
            }
          },
        ]
      }
    ]
  }
  // #endregion
};

var dtList;

$(document).ready(function (e) {
  if ($("#cto").attr("node") == "config") {
    $("#cto").json2html({}, j2hDOM.config);
    $.getJSON("ajax/config?" + (window.location.href + "?").split("?")[1], function (data) {
      $.each(data, function () {
        $("form").prepend("<input type='hidden' id='handshake-" + this.parameter.replace(".", "_") + "' name='" + this.parameter + "' value='" + this.value + "'>");
      });
      $("form").attr("action", $("#handshake-_action").val());
      $("form").attr("method", "POST");
      $("form").attr("target", "ifrCTOHost");

      $("form").submit();

      $(".header").hide();
      $(".loader").fadeOut(300);
      $("#cto").fadeIn(300);
    });
  }

  else if ($("#cto").attr("node") == "projects") {
    $.getJSON("ajax/opg", function (data) {
      oProjects = data;
      $("#cto").json2html(oProjects, j2hDOM.project);

      dtList = $("#DTProject").DataTable({
        columns: [
          {
            data: null,
            render: function (data) {
              return json2html.transform(data, j2hDOM.projectData);
            },
            width: "100%"
          }
        ],
        autoWidth: false,
        ordering: false,
        rowId: "id",
      }).on("draw draw.dt", function () {
        if (dtList.page.info().pages <= 1)
          $(".dataTables_paginate").css("visibility", "hidden");
        else
          $(".dataTables_paginate").css("visibility", "");

        var sOpg = "";
        $("#DTProject tbody .opg-header").show();
        $("#DTProject tbody .opg-header").each(function () {
          if (sOpg != $(this).data("opg"))
            sOpg = $(this).data("opg");
          else
            $(this).hide();
        });
      });

      $.each(oProjects.data, function (iOpg, oOpg) {
        $.each(oOpg.items, function () {
          this.opg = oOpg.nbr;
          this.name = oOpg.description;
          this.endCust = oOpg.endCust;
          dtList.row.add(this);
        });
      });
      dtList.draw(false);

      $(".loader").fadeOut(300);
      $("#cto").fadeIn(300);
    });
  }

  else if ($("#cto").attr("node") == "callback") {
    $("#slidein-ribbon").hide();
    window.parent.location = "basket?quote=-1";
  }

  else if ($("#cto").attr("node") == "basket") {
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

      if (getURLParameter("quote") == "-1")
        $("#DTBasket .btnOpen").first().trigger("click");
      else if (getURLParameter("quote") != "")
        $("#DTBasket .btnOpen[quote='" + getURLParameter("quote") + "']").trigger("click");

      $(".loader").fadeOut(300);
      $("#cto").fadeIn(300);

    });
  }

  else if ($("#cto").attr("node") == "orders") {
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

      if (getURLParameter("quote") != "")
        $("#DTOrders .btnOpen[quote='" + getURLParameter("quote") + "']").trigger("click");

      $(".loader").fadeOut(300);
      $("#cto").fadeIn(300);
    });
  }

  else {
    $(".loader").fadeOut(300);
    $("#cto").fadeIn(300);
  }
});

$(document).on("click", "#DTBasket .btnDelete", function (e) {
  $("#configId").val($(this).attr("quote"));
  $("#slidein-basket #btnDelete").trigger("click");
});

$(document).on("click", "#DTBasket .btnOpen", function (e) {
  var oRow = $(this).closest("tr");
  waitFor($("#shipCountry option"), function () {
    var oDTList = $("#DTProductList").DataTable();
    oDTList.clear();
    $(oRow).addClass("active");
    oRow = $("#DTBasket").DataTable().row($(oRow)).data();
    oDTList.rows.add(oRow.items).draw(false);

    $("#slidein-basket .btn, #DTProductList, #DTProductSummary").show();
    $("#DTProductError").hide();

    json2form(oRow, "#slidein-basket");
    $("#configAmount").data("total", oRow.price).html(localizePrice(oRow.price));
    $("#configQuantity").val(oRow.qty).trigger("keyup");

    if (oRow.status != "")
      $("#slidein-basket .btn, #DTProductList, #DTProductSummary, #DTProductError").not("#btnDelete").toggle();

    $("#slidein-basket .basketContinue").removeClass("show").hide();
    $("#slidein-basket #basketActions").addClass("show").show();

    $("#menu-basket").trigger("click");
  });
});

$(document).on("click", "#DTBasket .btnOrder", function (e) {
  $("#DTBasket .btnOpen[quote='" + $(this).attr("quote") + "']").trigger("click");
  $("#btnProceed").trigger("click");
});

$(document).on("click", "#DTOrders .btnOpen", function (e) {
  var oRow = $(this).closest("tr");
  waitFor($("#shipCountry option"), function () {
    var oDTList = $("#DTProductList").DataTable();
    oDTList.clear();
    $(oRow).addClass("active");
    oRow = $("#DTOrders").DataTable().row($(oRow)).data();
    oDTList.rows.add(oRow.items).draw(false);

    json2form(oRow, "#slidein-orders");
    $("#shipCountry").attr("readonly", "readonly").attr("disabled", "disabled").addClass("readonly");
    $("#configAmount").data("total", oRow.price).html(localizePrice(oRow.price));
    $("#configQuantity").trigger("keyup");
    $("#menu-orders").trigger("click");
  });
});

$(document).on("click", "#DTProject .btnConfig", function (e) {
  window.location = "config?" + $(this).attr("href");
});

$(document).on("click", "#btnCopy", function (e) {
  $.getJSON("ajax/copy?quote=" + $("#configId").val(), function (data) {
    if (data.status == "ok")
      location.href = "config?id=" + $("#DTBasket").DataTable().row(".active").data().base + "&quote=" + data.id;
    else
      alert("{$ CTO.HPITC.Ribbon.Copy.Error $}");
  });
});

$(document).on("click", "#slidein-basket #btnDelete", function (e) {
  if (!confirm("{$ CTO.HPITC.Ribbon.Delete.Message $}"))
    return false;

  $.getJSON("ajax/delete?quote=" + $("#configId").val(), function (data) {
    if (data.status == "ok")
      window.location.reload();
    else
      alert("{$ CTO.HPITC.Ribbon.Delete.Error $}");
  });
});

$(document).on("click", "#btnExcel", function (e) {
  location.href = "ajax/export?quote=" + $("#configId").val();
});

$(document).on("click", "#slidein-basket #btnSave", function (e) {
  if ($("#configName").val().trim() == "") {
    alert("{$ CTO.HPITC.Ribbon.Required $}");
    return;
  }

  $.getJSON("ajax/save?quote=" + $("#configId").val() + "&name=" + encodeURIComponent($("#configName").val().trim()) + "&qty=" + $("#configQuantity").val(), function (data) {
    if (data.status == "ok")
      window.location = "basket?quote=" + $("#configId").val();
    else
      alert("{$ CTO.HPITC.Ribbon.Save.Error $}");
  });
});

$(document).on("click", "#slidein-basket #btnSmartQuote", function (e) {
  location.href = "ajax/smartquote.xlsx?quote=" + $("#configId").val();
});

$(document).on("click", "#slidein-basket #btnModify", function (e) {
  location.href = "config?quote=" + $("#configId").val();
});

$(document).on("click", "#slidein-basket #btnSubmit", function (e) {
  if (!checkData("#slidein-basket")) {
    alert("{$ CTO.HPITC.Ribbon.Required $}");
    return;
  }

  var oOrder = {
    data: form2json("#slidein-basket")
  };
  $.post("ajax/submit", "bom=" + JSON.stringify(oOrder), function (data) {
    if (data.status == "ok") {
      alert("{$ CTO.HPITC.Ribbon.Order.Success $}");
      location.href = "orders?quote=" + $("#configId").val();
    } else {
      alert("{$ CTO.HPITC.Ribbon.Order.Error $}");
    }
  });
});

$(document).on("click", "#btnProceed", function (e) {
  $("#slidein-basket .basketContinue").toggleClass("show").slideToggle(300);
});

$(document).on("click", "#slidein-ribbon a.selected", function (e) {
  $("#DTBasket tr, #DTOrders tr").removeClass("active");
});

$(document).on("click", "#DTProductList .arrows div", function (e) {
  var oInput = $(this).closest("td").find("input");
  oInput.val(parseInt(oInput.val()) + parseInt($(this).data("step")));
  oInput.trigger("keyup");
});

$(document).on("keyup", "#configQuantity", function (e) {
  var iQty = Math.max(1, parseInt($(this).val()));
  var iQty = Math.min(999, iQty);
  if (isNaN(iQty))
    iQty = 1;

  $(this).val(iQty);
  $("#configTotal").html(localizePrice(iQty * parseFloat($("#configAmount").data("total"))));
});

