var j2hDOM = {
// #region DOM SlideIn
  selectRibbon: {
  },
  configRibbon: {
    "<>": "div", "id": "slidein-buttons", "html": [
      {
        "<>": "a", "id": "menu-price", "title": "{$ CTO.FTS-P3.Config.Ribbon.PriceSingle.Title $}", "html": "<span class='badge'><b id='ribbon-price'></b><i class='dot-pulse'></i></span>"
      },
      {
        "<>": "a", "id": "menu-save", "href": "#", "title": "{$ CTO.FTS-P3.Config.Ribbon.Save.Title $}", "data-item": "save", "html": [
          {
            "<>": "i", "class": "fas fa-2x fa-list"
          },
          {
            "<>": "sup", "class": "badge badge-pill bg-primary", "id": "configCount"
          }
        ]
      },
      {
        "<>": "a", "id": "menu-sdc", "class": "plain-text", "href": "#", "title": "{$ CTO.FTS-P3.Config.Ribbon.SDC.Title $}", "data-item": "sdc", "text": "SDC"
      },
      {
        "<>": "a", "id": "menu-reset", "title": "{$ CTO.FTS-P3.Config.Ribbon.Reset.Title $}", "html": [
          {
            "<>": "i", "class": "fas fa-2x fa-undo-alt"
          }
        ]
      },
      {
        "<>": "a", "id": "menu-error", "href": "#", "title": "{$ CTO.FTS-P3.Config.Ribbon.Errors.Title $}", "data-item": "error", "html": [
          {
            "<>": "i", "class": "fas fa-2x fa-exclamation-triangle text-danger"
          },
          {
            "<>": "sup", "class": "badge badge-pill bg-danger", "id": "errorCount"
          }
        ]
      }
    ]
  },
  configSlideIn: {
    "<>": "div", "id": "slidein-item", "html": [
      {
        "<>": "div", "id": "slidein-save", "class": "slidein-item CartSettingsPanel", "data-item": "save", "html": [
          {
            "<>": "h2", "text": "{$ CTO.FTS-P3.Config.Ribbon.Save.Title $}"
          },
          {
            "<>": "table", "id": "DTProductList", "class": "w-100", "html": [
              {
                "<>": "tbody"
              },
              {
                "<>": "tfoot", "class": "text-right text-nowrap", "html": [
                  {
                    "<>": "tr", "class": "configAmount", "html": [
                      {
                        "<>": "td", "class": "bold", "text": "{$ CTO.FTS-P3.Config.Ribbon.Save.PriceSingle $}:"
                      },
                      {
                        "<>": "td", "id": "configAmount", "class": "bold"
                      }
                    ]
                  },
                  {
                    "<>": "tr", "html": [
                      {
                        "<>": "td", "class": "bold", "html": "<label for='configQuantity' class='required'>{$ CTO.FTS-P3.Config.Ribbon.Save.Quantity $}:</label>"
                      },
                      {
                        "<>": "td", "html": [
                          {
                            "<>": "input", "id": "configQuantity", "class": "form-control float-right", "type": "number", "value": "1", "step": "1", "min": "1", "max": "999", "required": "true"
                          },
                          {
                            "<>": "div", "class": "arrows", "html": "<div data-step='1'><i class='fas fa-chevron-up'></i></div><div data-step='-1'><i class='fas fa-chevron-down'></i></div>"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "<>": "tr", "class": "configTotal", "html": [
                      {
                        "<>": "td", "class": "bold", "text": "{$ CTO.FTS-P3.Config.Ribbon.Save.PriceTotal $}:"
                      },
                      {
                        "<>": "td", "id": "configTotal", "class": "bold"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "<>": "div", "id": "DTProductSummary", "class": "col-xs-12 mt-3", "html": [
              {
                "<>": "label", "for": "configName", "class": "required", "text": "{$ CTO.FTS-P3.Config.Ribbon.Save.Name $}:"
              },
              {
                "<>": "input", "type": "hidden", "id": "configId", "value": "0"
              }
            ]
          },
          {
            "<>": "div", "id": "DTProductSummary", "class": "col-xs-7", "html": [
              {
                "<>": "input", "type": "text", "id": "configName", "class": "form-control", "required": "true", "size": "35", "placeholder": "{$ CTO.FTS-P3.Config.Ribbon.Save.Name $}"
              }
            ]
          },
          {
            "<>": "div", "class": "col-xs-5 btnSave", "html": [
              {
                "<>": "span", "class": "btn btn-success btn-block", "id": "btnSave", "data-status": "1", "html": "{$ CTO.FTS-P3.Config.Ribbon.Save.Save $} <i class='fas fa-save'></i>"
              }
              /*{
                "<>": "div", "class": "offset-1 col-xs-5", "html": [
                  {
                    "<>": "span", "class": "btn btn-success btn-block", "id": "btnSDC", "data-status": "0", "html": "{$ CTO.FTS-P3.Config.Ribbon.Save.SDC $} <i class='fas fa-file-csv'></i>"
                  }
                ]
              },
              {
                "<>": "div", "class": "col-xs-5", "html": [
                ]
              }*/
            ]
          },
          {
            "<>": "div", "id": "article-save", "class": "col-xs-12 mt-5 text-justify"
          }
        ]
      },
      {
        "<>": "div", "id": "slidein-sdc", "class": "slidein-item CartSettingsPanel", "data-item": "sdc", "html": [
          {
            "<>": "h2", "text": "{$ CTO.FTS-P3.Config.Ribbon.SDC.Title $}"
          },
          {
            "<>": "div", "id": "article-sdc"
          },
          {
            "<>": "div", "id": "article-no-sdc"
          },
          {
            "<>": "div", "class": "offset-7 col-xs-5", "html": [
              {
                "<>": "span", "class": "btn btn-success btn-block", "id": "btnSDC", "data-status": "0", "html": "{$ CTO.FTS-P3.Config.Ribbon.Save.SDC $} <i class='fas fa-file-csv'></i>"
              }
            ]
          }
        ]
      },
      {
        "<>": "div", "id": "slidein-error", "class": "slidein-item CartSettingsPanel", "data-item": "error", "html": [
          {
            "<>": "h2", "text": "{$ CTO.FTS-P3.Config.Ribbon.Errors.Title $}"
          },
          {
            "<>": "table", "id": "DTConfigErrors", "class": "w-100", "html": "<tbody></tbody>"
          }
        ]
      }
    ]
  },
  basketRibbon: {
    "<>": "div", "id": "slidein-buttons", "html": [
      {
        "<>": "a", "id": "menu-basket", "href": "#", "title": "{$ CTO.FTS-P3.Ribbon.Title $}", "data-item": "basket"
      },
    ]
  },
  basketSlideIn: {
    "<>": "div", "id": "slidein-item", "html": [
      {
        "<>": "div", "id": "slidein-basket", "class": "slidein-item CartSettingsPanel", "data-item": "basket", "html": [
          {
            "<>": "h2", "text": "{$ CTO.FTS-P3.Ribbon.Title $}"
          },
          {
            "<>": "table", "id": "DTProductList", "class": "w-100", "html": function () {
              return "<tbody></tbody>" +
                "<tfoot class='text-right text-nowrap'>" +
                  "<tr class='configAmount'>" +
                    "<td class='bold'>{$ CTO.FTS-P3.Ribbon.PriceSingle $}:</td>" +
                    "<td class='bold' id='configAmount'></td>" +
                  "</tr>" +
                  "<tr>" +
                    "<td class='bold'><label for='configQuantity' class='required'>{$ CTO.FTS-P3.Ribbon.Quantity $}:</label></td>" +
                    "<td>" +
                      "<input class='form-control float-right' id='configQuantity' data-field='qty' required='true'>" +
                      "<div class='arrows'><div data-step='1'><i class='fas fa-chevron-up'></i></div><div data-step='-1'><i class='fas fa-chevron-down'></i></div></div>" +
                    "</td>" +
                  "</tr>" +
                  "<tr class='configTotal'>" +
                    "<td class='bold'>{$ CTO.FTS-P3.Ribbon.PriceTotal $}:</td>" +
                    "<td class='bold' id='configTotal'></td>" +
                  "</tr>" +
                "</tfoot>";
            },
          },
          {
            "<>": "div", "id": "DTProductError", "class": "mt-5", "html": "{$ CTO.FTS-P3.Ribbon.Error $}"
          },
          {
            "<>": "div", "id": "DTProductSummary", "class": "mt-5", "html": function () {
              return "<div class='row'>" +
                  "<div class='col-xs-4 pl-0 bold my-auto text-nowrap required'>{$ CTO.FTS-P3.Ribbon.Name $}:</div>" +
                  "<div class='col-xs-8'><input type='text' id='configName' data-field='name' class='form-control' required='true' placeholder='{$ CTO.FTS-P3.Ribbon.Name $}'></div>" +
                  "<input type='hidden' id='configId' data-field='quote' value='0'>" +
                "</div>";
            }
          },
          {
            "<>": "div", "html": [
              {
                "<>": "div", "class": "basketContinue mt-5 row", "id": "basketActions", "html": function () {
                  return "<div class='offset-1 col-xs-5'>" +
                      "<span class='btn btn-primary btn-block mb-4' id='btnSave'>{$ CTO.FTS-P3.Ribbon.Save $} <i class='fas fa-save'></i></span>" +
                      "<span class='btn btn-primary btn-block mb-4' id='btnModify'>{$ CTO.FTS-P3.Ribbon.Change $} <i class='fas fa-tools'></i></span>" +
                      "<span class='btn btn-primary btn-block mb-4' id='btnCopy'>{$ CTO.FTS-P3.Ribbon.Copy $} <i class='fas fa-copy'></i></span>" +
                      "<span class='btn btn-primary btn-block mb-4' id='btnProceed'>{$ CTO.FTS-P3.Ribbon.Order $} <i class='fas fa-cart-arrow-down'></i></span>" +
                    "</div>" +
                    "<div class='col-xs-5'>" +
                      "<span class='btn btn-danger btn-block mb-4' id='btnDelete'>{$ CTO.FTS-P3.Ribbon.Delete $} <i class='fas fa-trash-alt'></i></span>" +
                      "<span class='btn btn-success btn-block mb-4' id='btnSDC'>{$ CTO.FTS-P3.Ribbon.SDC $} <i class='fas fa-file-csv'></i></span>" +
                      "<span class='btn btn-success btn-block mb-4' id='btnExcel'>{$ CTO.FTS-P3.Ribbon.Excel $} <i class='fas fa-file-excel'></i></span>" +
                      //"<span class='btn btn-primary btn-block mb-4' id='btnProject'>{$ CTO.FTS-P3.Ribbon.Project $} <i class='fas fa-star'></i></span>" +
                    "</div>";
                }
              },
              {
                "<>": "div", "class": "basketContinue mt-5 row", "id": "basketOrder", "html": [
                  {
                    "<>": "div", "class": "row", "html": function () {
                      return "<div class='row w-100 bold'>{$ CTO.FTS-P3.Ribbon.Contact $}:</div>" +
                        "<div class='col-xs-4 my-auto required'>{$ CTO.FTS-P3.Ribbon.Contact.Name $}:</div>" +
                        "<div class='col-xs-8'><input class='form-control' id='contactName' data-field='contactName' required='true'></div>" +
                        "<div class='col-xs-4 my-auto required'>{$ CTO.FTS-P3.Ribbon.Contact.Phone $}:</div>" +
                        "<div class='col-xs-8'><input class='form-control' id='contactPhone' data-field='contactPhone' required='true'></div>" +
                        "<div class='col-xs-4 my-auto required'>{$ CTO.FTS-P3.Ribbon.Contact.Email $}:</div>" +
                        "<div class='col-xs-8'><input class='form-control' id='contactEmail' data-field='contactEmail' required='true'></div>";
                    }
                  },
                  {
                    "<>": "div", "class": "row mt-5", "html": function () {
                      return "<div class='row w-100 bold'>{$ CTO.FTS-P3.Ribbon.Delivery $}:</div>" +
                        "<div class='col-xs-4 my-auto'>{$ CTO.FTS-P3.Ribbon.Delivery.Name1 $}:</div>" +
                        "<div class='col-xs-8'><input class='form-control' id='shipName1' data-field='shipName1'></div>" +
                        "<div class='col-xs-4 my-auto'>{$ CTO.FTS-P3.Ribbon.Delivery.Name2 $}:</div>" +
                        "<div class='col-xs-8'><input class='form-control' id='shipName2' data-field='shipName2'></div>" +
                        "<div class='col-xs-4 my-auto'>{$ CTO.FTS-P3.Ribbon.Delivery.Street $}:</div>" +
                        "<div class='col-xs-8'><input class='form-control' id='shipStreet' data-field='shipStreet'></div>" +
                        "<div class='col-xs-4 my-auto'>{$ CTO.FTS-P3.Ribbon.Delivery.ZIP $} / {$ CTO.FTS-P3.Ribbon.Delivery.City $}:</div>" +
                        "<div class='col-xs-2'><input class='form-control' id='shipZip' data-field='shipZip'></div>" +
                        "<div class='col-xs-6'><input class='form-control' id='shipCity' data-field='shipCity'></div>" +
                        "<div class='col-xs-4 my-auto'>{$ CTO.FTS-P3.Ribbon.Delivery.Country $}:</div>" +
                        "<div class='col-xs-8' id='article-ship-countries'></div>";
                    }
                  },
                  {
                    "<>": "div", "class": "offset-2 col-xs-8 my-5", "html": "<span class='btn btn-primary btn-block btnSubmit' id='btnSubmit'>{$ CTO.FTS-P3.Ribbon.Submit $} <i class='fas fa-shopping-cart'></i></span>"
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
        "<>": "a", "id": "menu-orders", "href": "#", "title": "{$ CTO.FTS-P3.Ribbon.Title $}", "data-item": "orders"
      },
    ]
  },
  ordersSlideIn: {
    "<>": "div", "id": "slidein-item", "html": [
      {
        "<>": "div", "id": "slidein-orders", "class": "slidein-item CartSettingsPanel", "data-item": "orders", "html": [
          {
            "<>": "h2", "text": "{$ CTO.FTS-P3.Orders.Ribbon.Title $}"
          },
          {
            "<>": "table", "id": "DTProductList", "class": "w-100", "html": function () {
              return "<tbody></tbody>" +
                "<tfoot class='text-right text-nowrap'>" +
                  "<tr class='configAmount'>" +
                    "<td class='bold'>{$ CTO.FTS-P3.Ribbon.PriceSingle $}:</td>" +
                    "<td class='bold' id='configAmount'></td>" +
                  "</tr>" +
                  "<tr>" +
                    "<td class='bold'><label for='configQuantity' class='required'>{$ CTO.FTS-P3.Ribbon.Quantity $}:</label></td>" +
                    "<td>" +
                      "<input class='form-control float-right' id='configQuantity' readonly='readonly' data-field='qty'>" +
                    "</td>" +
                  "</tr>" +
                  "<tr class='configTotal'>" +
                    "<td class='bold'>{$ CTO.FTS-P3.Ribbon.PriceTotal $}:</td>" +
                    "<td class='bold' id='configTotal'></td>" +
                  "</tr>" +
                "</tfoot>";
            },
          },
          {
            "<>": "div", "id": "DTProductSummary", "class": "mt-5", "html": function () {
              return "<div class='row'>" +
                "<div class='col-xs-4 pl-0 bold my-auto'>{$ CTO.FTS-P3.Ribbon.Name $}:</div>" +
                "<div class='col-xs-8'><input type='text' id='configName' data-field='name' class='form-control' readonly='readonly'></div>" +
                "<input type='hidden' id='configId' data-field='quote' value='0'>" +
                "</div>";
            }
          },/*
          {
            "<>": "div", "class": "row mt-5", "html": function () {
              return "<div class='row w-100 bold'>{$ CTO.FTS-P3.Ribbon.Contact $}:</div>" +
                "<div class='col-xs-4 my-auto'>{$ CTO.FTS-P3.Ribbon.Contact.Name $}:</div>" +
                "<div class='col-xs-8'><input class='form-control readonly' readonly='readonly' id='contactName' data-field='contactName'></div>" +
                "<div class='col-xs-4 my-auto'>{$ CTO.FTS-P3.Ribbon.Contact.Phone $}:</div>" +
                "<div class='col-xs-8'><input class='form-control readonly' readonly='readonly' id='contactPhone' data-field='contactPhone'></div>" +
                "<div class='col-xs-4 my-auto'>{$ CTO.FTS-P3.Ribbon.Contact.Email $}:</div>" +
                "<div class='col-xs-8'><input class='form-control readonly' readonly='readonly' id='contactEmail' data-field='contactEmail'></div>";
            }
          },*/
          {
            "<>": "div", "class": "row mt-5", "html": function () {
              return "<div class='row w-100 bold'>{$ CTO.FTS-P3.Ribbon.Delivery $}:</div>" +
                "<div class='col-xs-4 my-auto'>{$ CTO.FTS-P3.Ribbon.Delivery.Name1 $}:</div>" +
                "<div class='col-xs-8'><input class='form-control' readonly='readonly' id='shipName1' data-field='shipName1'></div>" +
                "<div class='col-xs-4 my-auto'>{$ CTO.FTS-P3.Ribbon.Delivery.Name2 $}:</div>" +
                "<div class='col-xs-8'><input class='form-control' readonly='readonly' id='shipName2' data-field='shipName2'></div>" +
                "<div class='col-xs-4 my-auto'>{$ CTO.FTS-P3.Ribbon.Delivery.Street $}:</div>" +
                "<div class='col-xs-8'><input class='form-control' readonly='readonly' id='shipStreet' data-field='shipStreet'></div>" +
                "<div class='col-xs-4 my-auto'>{$ CTO.FTS-P3.Ribbon.Delivery.ZIP $} / {$ CTO.FTS-P3.Ribbon.Delivery.City $}:</div>" +
                "<div class='col-xs-2'><input class='form-control' readonly='readonly' id='shipZip' data-field='shipZip'></div>" +
                "<div class='col-xs-6'><input class='form-control' readonly='readonly' id='shipCity' data-field='shipCity'></div>" +
                "<div class='col-xs-4 my-auto'>{$ CTO.FTS-P3.Ribbon.Delivery.Country $}:</div>" +
                "<div class='col-xs-8' id='article-ship-countries'></div>";
            }
          },
          {
            "<>": "div", "class": "mt-5 row", "html": function () {
              return "<div class='offset-1 col-xs-5'>" +
                  "<span class='btn btn-primary btn-block mb-4' id='btnCopy'>{$ CTO.FTS-P3.Ribbon.Copy $} <i class='fas fa-copy'></i></span>" +
                "</div>" +
                "<div class='col-xs-5'>" +
                  "<span class='btn btn-success btn-block mb-4' id='btnExcel'>{$ CTO.FTS-P3.Ribbon.Excel $} <i class='fas fa-file-excel'></i></span>" +
                "</div>";
            }
          }
        ]
      }
    ]
  },
// #endregion

// #region DOM Select
  select: {
    "<>": "div", "id": "group-select", "html": [
      {
        "<>": "ul", "class": "nav", "id": "bmGroups", "role": "tablist", "html": function () {
          return $.json2html(this.data, j2hDOM.selectTabs);
        }
      },
      {
        "<>": "div", "class": "tab-content", "id": "bmDetails", "html": function () {
          return $.json2html(this.data, j2hDOM.selectGroups);
        }
      }
    ]
  },
  selectGroups: {
    "<>": "div", "class": "tab-pane fade pb-5", "id": "bmGroup-${id}", "role": "tabpanel", "aria-labelledby": "bmGroup-${id}-tab", "html": [
      {
        "<>": "div", "class": "col-xs-12 group-desc", "html": function () {
          return parseHTML(this.description);
        }
      },
      {
        "<>": "div", "class": "group-items", "html": function () {
          return $.json2html(this.items, j2hDOM.selectModels);
        }
      }
    ]
  },
  selectModels: {
    "<>": "div", "class": "col-xs-12 basemodel", "html": [
      {
        "<>": "div", "class": "row mb-4", "html": [
          {
            "<>": "div", "class": "col-xs-8", "html": "<h3>${name}</h3>"
          },
          {
            "<>": "div", "class": "col-xs-4 text-right", "html": [
              {
                "<>": "span", "class": "btn btn-primary", "data-link": "${id}", "html": "{$ CTO.FTS-P3.Select.Configure $} <i class='fas fa-tools'></i>"
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
              return parseHTML(this.description) + "<li>{$ CTO.FTS-P3.Select.Available $}: <b>" + this.avail + " {$ CTO.FTS-P3.Select.Pieces $}</b></li>";
            }
          }
        ]
      }
    ]
  },
   selectTabs: {
    "<>": "li", "html": [
      {
        "<>": "a", "id": "bmGroup-${id}-tab", "data-toggle": "tab", "href": "#bmGroup-${id}", "role": "tab", "aria-controls": "bmGroup-${id}", "aria-selected": "false", "html": [
          {
            "<>": "span", "html": [
              {
                "<>": "img", "src": "${image}"
              },
            ]
          },
          {
            "<>": "div", "text": "${name}"
          }
        ]
      }
    ]
  },
// #endregion

// #region DOM Config
  config: {
    "<>": "div", "id": "basemodel-config", "html": [
      {
        "<>": "ul", "class": "nav nav-tabs", "id": "cGroups", "role": "tablist", "html": function () {
          return $.json2html(this.data[0].groups, j2hDOM.configTabs);
        }
      },
      {
        "<>": "div", "class": "tab-content", "id": "cGroupItems", "html": function () {
          return $.json2html(this.data[0].groups, j2hDOM.configGroups);
        }
      }
    ]
  },
  configBasemodel: {
    "<>": "div", "class": "row", "id": "bmHeader", "html": [
      {
        "<>": "div", "class": "col-xs-3", "html": [
          {
            "<>": "img", "src": "${image}"
          }
        ]
      },
      {
        "<>": "div", "class": "col-xs-9", "html": function () {
          return "<h3>" + this.name + "</h3>" + parseHTML(this.description);
        }
      }
    ]
  },
  configComponent: {
    "<>": "div", "class": "component", "id": "component-${id}", "html": [
      {
        "<>": "h3", "html": function () {
          //if (this.type == "M")
          return "<i class='errorIndicator text-danger fas fa-exclamation-triangle'></i> " + this.name + " <span style='font-size: 0.75em'>({$ CTO.FTS-P3.Config.DTMax $} " + this.qMax + ")</span>";
          //return "<i class='errorIndicator text-danger fas fa-exclamation-triangle'></i> " + this.name;
        }
      },
      {
        "<>": "table", "class": "DTComponent row-border w-100", "id": "DTComponent-${id}", "data-component": "${id}", "data-type": "${type}", "data-qmin": "${qMin}", "data-qmax": "${qMax}", "html": [
          {
            "<>": "thead", "text": ""
          },
          {
            "<>": "tbody", "text": ""
          }
        ]
      }
    ]
  },
  configGroups: {
    "<>": "div", "class": "tab-pane fade", "id": "cGroup-${id}", "role": "tabpanel", "aria-labelledby": "cGroup-${id}-tab", "html": [
      {
        "<>": "div", "class": "col-xs-12 basemodel", "html": function (oData, iIndex) {
          if (iIndex == 0)
            return $.json2html(oBasemodel.data, j2hDOM.configBasemodel);
        }
      },
      {
        "<>": "div", "class": "col-xs-12 group-items", "html": function () {
          var iGroup = this.id;
          var oItems = oConfig.data.filter(function (e) {
            return e.group == iGroup;
          });
          return $.json2html(oItems, j2hDOM.configComponent);
        }
      },
      {
        "<>": "div", "class": "col-xs-6 mb-4 mt-5 text-left", "html": [
          {
            "<>": "span", "class": "btn btn-primary", "id": "btnPrevious", "html": "<i class='fas fa-chevron-left'></i> {$ CTO.FTS-P3.Config.Previous $}"
          }
        ]
      },
      {
        "<>": "div", "class": "col-xs-6 mb-4 mt-5 text-right", "html": [
          {
            "<>": "span", "class": "btn btn-primary", "id": "btnNext", "html": "{$ CTO.FTS-P3.Config.Next $} <i class='fas fa-chevron-right'></i>"
          },
          {
            "<>": "span", "class": "btn btn-success btnSave ml-3", "id": "btnGotoSave", "html": "{$ CTO.FTS-P3.Config.Finish $} <i class='fas fa-save'></i>"
          }
        ]
      }
    ]
  },
  configTabs: {
    "<>": "li", "class": "nav-item", "html": [
      {
        "<>": "a", "class": "nav-link", "id": "cGroup-${id}-tab", "data-toggle": "tab", "href": "#cGroup-${id}", "role": "tab", "aria-controls": "cGroup-${id}", "aria-selected": "false", "html": "<h4><h3><i class='errorIndicator text-danger fas fa-exclamation-triangle'></i> ${name}</h3></h4>"
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
                "<>": "label", "class": "col-xs-2", "text": "{$ CTO.FTS-P3.Basket.Search $}:"
              },
              {
                "<>": "input", "class": "col-xs-4", "placeholder": "{$ CTO.FTS-P3.Basket.Example $}"
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
        "<>": "div", "class": "row mb-4", "quote": "${quote}", "html": function () {
          var sHTML = "<div class='col-xs-8'><h3>" + this.quote + " - {$ CTO.FTS-P3.Basket.Configuration $} \"" + this.name + "\" {$ CTO.FTS-P3.Basket.Created $} " + this.created + "</h3></div>";
          if (this.status != "") {
            sHTML += "<div class='col-xs-4 text-right'><span class='btn btn-danger btnDelete' quote='" + this.quote + "'>{$ CTO.FTS-P3.Basket.Delete $} <i class='fas fa-trash-alt'></i></span></div>";
          }
          else if (this.code != "SAV") {
            sHTML += "<div class='col-xs-4 text-right'><span class='btn btn-primary btnOpen' quote='" + this.quote + "'>{$ CTO.FTS-P3.Basket.Open $} <i class='fas fa-external-link-square-alt'></i></span></div>";
          }
          else {
            sHTML += "<div class='col-xs-4 text-right'><span class='btn btn-primary mr-2 btnOrder' quote='" + this.quote + "'>{$ CTO.FTS-P3.Basket.Order $} <i class='fas fa-cart-arrow-down'></i></span>";
            sHTML += "<span class='btn btn-primary btnOpen' quote='" + this.quote + "'>{$ CTO.FTS-P3.Basket.Open $} <i class='fas fa-external-link-square-alt'></i></span></div>";
          }
          return sHTML;
        },
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
                return "{$ CTO.FTS-P3.Basket.Error $}";

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
              
              var sHTML = "<li>" + this.codeText + " {$ CTO.FTS-P3.Basket.By $} " + this.user + "</li>";
              sHTML += "<li><b>" + this.qty + "</b> &times; " + this.title + "</li>";
              sHTML += "<li>{$ CTO.FTS-P3.Basket.PriceTotal $}: <b>" + localizePrice(this.total, sCurrencyCd) + "</b></li>";
              sHTML += "<li>{$ CTO.FTS-P3.Basket.Available $}: <b>" + this.avail + " {$ CTO.FTS-P3.Basket.Pieces $}</b></li>";

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
                "<>": "label", "class": "col-xs-2", "text": "{$ CTO.FTS-P3.Basket.Search $}:"
              },
              {
                "<>": "input", "class": "col-xs-4", "placeholder": "{$ CTO.FTS-P3.Basket.Example $}"
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
            "<>": "div", "class": "col-xs-8", "html": "<h3>${quote} - {$ CTO.FTS-P3.Basket.Configuration $} \"${name}\" {$ CTO.FTS-P3.Orders.Ordered $} ${modified}</h3>"
          },
          {
            "<>": "div", "class": "col-xs-4 text-right", "html": [
              {
                "<>": "span", "class": "btn btn-primary btnOpen", "quote": "${quote}", "html": "{$ CTO.FTS-P3.Basket.Open $} <i class='btnOpen fas fa-external-link-square-alt'></i>"
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

              var sHTML = "<li>" + this.codeText + " {$ CTO.FTS-P3.Basket.By $} " + this.user + "</li>";
              sHTML += "<li><b>" + this.qty + "</b> &times; " + this.title + "</li>";
              sHTML += "<li>{$ CTO.FTS-P3.Basket.PriceTotal $}: <b>" + localizePrice(this.price, sCurrencyCd) + "</b></li>";

              return sHTML;
            }
          },
        ]
      }
    ]
  }
// #endregion
};

var iLoaded = 0;
var iPriced = 0;
var oBasemodel;
var oBasket;
var oConfig;
var oError;
var oPrice;
var oSelect;
var sCurrencyCd = "";

function createBOM() {
  var dSDC = 0;
  var dTotal = 0;
  var oDTList = $("#DTProductList").DataTable();
  oDTList.clear();
  $.each(oConfig.data, function (iComponent, oComponent) {
    oComponent.qty = 0;
    var oItems = oComponent.items.filter(function (e) {
      return e.qty != 0;
    });
    $.each(oItems, function (iSelection, oSelection) {
      oComponent.qty += oSelection.qty;
      $.each(oSelection.items, function (iProduct, oProduct) {
        dSDC += oSelection.qty * oProduct.qty * (oProduct.price + oProduct.bonusSDC);
        dTotal += oSelection.qty * oProduct.qty * oProduct.price;
        oProduct.parentQty = oSelection.qty;
        oDTList.row.add(oProduct);
      });
    });
    $("#DTComponent-" + oComponent.id).data("qty", oComponent.qty);
  });
  oDTList.draw(false);
  $("#ribbon-price").html(localizePrice(dTotal, sCurrencyCd));
  $("#configAmount").data("sdc", dSDC).data("total", dTotal).html(localizePrice(dTotal, sCurrencyCd));
  $("#configCount").html(oDTList.rows().count());

  $(".errorIndicator").hide();
  var oDTError = $("#DTConfigErrors").DataTable();
  oDTError.clear();
  $.each(oError.data, function (iRule, oRule) {
    oRule.count = 0;
    $.each(oRule.items, function (iItem, oItem) {
      var iQty = 0;
      $("#DTComponent-" + oItem.parent).DataTable().rows(oItem.type == "S" ? "#" + oItem.id : "").every(function () {
        iQty += this.data().qty;
        if ($("#DTComponent-" + oItem.parent).data("type") == "M" || $("#DTComponent-" + oItem.parent).data("qty") == 0 || this.data().qty != 0)
          iQty += this.data().builtIn;
      });
      oRule.count += (eval(iQty + " " + oItem.operator + " " + oItem.qty) ? 1 : 0);
    });
    if (oRule.count >= oRule.hits) {
      oDTError.row.add(oRule);
      $.each(oRule.items, function () {
        $("#component-" + this.parent + " .errorIndicator").show();
        $("#" + $("#component-" + this.parent).closest(".tab-pane").attr("aria-labelledby") + " .errorIndicator").show();
      });
    }
  });
  oDTError.draw(false);
  $("#menu-error").hide();
  $(".btnSave").show();
  if (oDTError.rows().count() != 0)
    $("#menu-error, .btnSave").toggle();

  $("#errorCount").html(oDTError.rows().count());

  $("#configQuantity").trigger("keyup");
}

function domConfig() {
  if (iLoaded == 3) {
    sCurrencyCd = oConfig.data[0].items[0].items[0].currencyCd;
    $("#cto").json2html(oBasemodel, j2hDOM.config);

    $("#configId").val(oBasemodel.data[0].quote);
    $("#configName").val(oBasemodel.data[0].configuration);
    $("#configQuantity").val(oBasemodel.data[0].qty);

    $(".DTComponent").DataTable({
      columns: [
        {
          data: null,
          render: function (data) {
            return "<span style='font-size: 1.25em'>" + data.name + "</span><br><span class='bold'>VPN: </span>" + data.items[0].mfrPartNbr + " <span class='bold'>SKU: </span>" + data.items[0].sku + (data.items.length > 1 ? " ( +" + (data.items.length - 1) + " {$ CTO.FTS-P3.Config.DTMore $} )" : "");
          }
        },
        {
          className: "text-right",
          data: null,
          render: function (data) {
            var sDisabled = (data.qMin == data.qMax ? "disabled" : "");
            var sTag = "<input class='form-control float-right " + sDisabled + "' type='number' value='" + data.qty + "' step='1' data-qdef='" + data.qDef + "' data-qmin='" + data.qMin + "' data-qmax='" + data.qMax + "' " + sDisabled + ">";
            if (sDisabled == "")
              sTag += "<div class='arrows'><div data-step='1'><i class='fas fa-chevron-up'></i></div><div data-step='-1'><i class='fas fa-chevron-down'></i></div></div>";
            return sTag;
          },
          title: "{$ CTO.FTS-P3.Config.DTQuantity $}",
          width: "125px"
        },
        {
          className: "text-right",
          data: null,
          render: function (data) {
            var iAvail = 9999;
            $.each(data.items, function (iItem, oItem) {
              oItem.parent = data.id;
              iAvail = Math.min(iAvail, oItem.avail);
            });
            data.avail = iAvail;
            return iAvail == 0 ? "<b class='text-danger'>" + iAvail + "</b>" : iAvail;
          },
          title: "{$ CTO.FTS-P3.Config.DTAvailable $}",
          width: "125px"
        },
        {
          className: "text-right",
          data: null,
          render: function (data) {
            var dPrice = 0;
            $.each(data.items, function (iItem, oItem) {
              dPrice += oItem.qty * oItem.price;
            });
            data.price = parseFloat(dPrice.toFixed(2));
            return localizePrice(dPrice, sCurrencyCd) + "<br><span class='bold'>" + localizePrice(data.qty * dPrice, sCurrencyCd) + "</span>";
          },
          title: "{$ CTO.FTS-P3.Config.DTPrice $}",
          width: "125px"
        }
      ],
      autoWidth: false,
      createdRow: function (row, data, index) {
        if (data.builtIn != 0)
          $(row).addClass("builtIn");
      },
      ordering: false,
      rowId: "id",
      searching: false
    });
    $.each(oConfig.data, function (iItem, oItem) {
      $(".DTComponent[data-component='" + oItem.id + "']").DataTable().rows.add(oItem.items).draw(false);
    });
    $(".DTComponent").each(function () {
      if ($(this).DataTable().rows().count() > 10)
        $("#" + $(this).attr("id") + "_info, #" + $(this).attr("id") + "_paginate").show();
    });

    $("#DTConfigErrors").DataTable({
      columns: [
        {
          className: "align-top",
          data: null,
          render: function (data) {
            return "<i class='text-danger fas fa-2x fa-exclamation-triangle'></i>";
          }
        },
        {
          className: "align-top",
          data: null,
          render: function(data) {
            var sError = "";
            $.each(data.items, function (iItem, oItem) {
              var oComponent = oConfig.data.filter(function (e) {
                return e.id == oItem.parent;
              })[0];
              if (sError.indexOf("href='" + oComponent.id + "'") == -1)
              sError += " | <a class='btnError' href='" + oComponent.id + "'>" + oComponent.name + "</a>";
            });
            return data.message + "<br><br>{$ CTO.FTS-P3.Config.ErrorImpacted $}:<br>" + sError.substring(2);
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

    $("#cGroups a").first().trigger("click");
    $(".loader").fadeOut(300);
    $("#cto").fadeIn(300);

    $("#menu-price, #menu-save").show();

    $("#btnSDC").data("total", oBasemodel.data[0].sdc);
    if ($("#btnSDC").data("total") != 0)
      $("#menu-sdc").show();

    createBOM();
  }
}

function updatePrice() {
  if (iPriced == 2) {
    $.each(oPrice.data, function (iSKU, oSKU) {
      $.each(oConfig.data, function () {
        $.each(this.items, function () {
          $.each(this.items, function () {
            if (oSKU.sku == this.sku)
              this.price = oSKU.price;
          });
        });
      });
    });
    $(".DTComponent,#DTProductList").DataTable().draw(false);
    $(".dot-pulse").hide();
  }
}

$(document).ready(function (e) {
  if ($("#cto").attr("node") == "select") {
    $.getJSON("ajax/select", function (data) {
      oSelect = data;
      $("#cto").json2html(oSelect, j2hDOM.select);
      $("#bmGroups a").first().trigger("click");
      $(".loader").fadeOut(300);
      $("#cto").fadeIn(300);
    });
  }

  else if ($("#cto").attr("node") == "config") {
    $("#configId").val(parseInt("0" + getURLParameter("quote")));

    $.getJSON("ajax/basemodel?id=" + getURLParameter("id") + "&quote=" + getURLParameter("quote"), function (data) {
      iLoaded += 1;
      oBasemodel = data;
      domConfig();
    });
    $.getJSON("ajax/config?id=" + getURLParameter("id") + "&quote=" + getURLParameter("quote"), function (data) {
      iLoaded += 1;
      iPriced += 1;
      oConfig = data;
      domConfig();
      updatePrice();
    });
    $.getJSON("ajax/error?id=" + getURLParameter("id"), function (data) {
      iLoaded += 1;
      oError = data;
      domConfig();
    });
    $.getJSON("/api/cto/FTS-P3-Pricing.ashx?id=" + getURLParameter("id"), function (data) {
      iPriced += 1;
      oPrice = data;
      updatePrice();
    });
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

      if (getURLParameter("quote") != "")
        $("#DTBasket .btnOpen[quote='" + getURLParameter("quote") + "']").trigger("click")

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
        $("#DTOrders .btnOpen[quote='" + getURLParameter("quote") + "']").trigger("click")

      $(".loader").fadeOut(300);
      $("#cto").fadeIn(300);
    });
  }

  else {
    $(".loader").fadeOut(300);
    $("#cto").fadeIn(300);
  }
});

// #region DOM Events
$(document).on("click", "#bmDetails .btn", function (e) {
  location = "config?id=" + $(this).data("link");
});

$(document).on("click", "#btnCopy", function (e) {
  $.getJSON("ajax/copy?quote=" + $("#configId").val(), function (data) {
    if (data.status == "ok")
      location.href = "config?id=" + $("#DTBasket,#DTOrders").DataTable().row(".active").data().base + "&quote=" + data.id;
    else
      alert("{$ CTO.FTS-P3.Ribbon.Copy.Error $}");
  });
});

$(document).on("click", "#btnExcel", function (e) {
  location.href = "ajax/export.xlsx?quote=" + $("#configId").val();
});

$(document).on("click", "#btnNext", function (e) {
  var bClick = false;
  $("#cGroups li a").each(function (iGroup, oGroup) {
    if (bClick) {
      $(this).trigger("click");
      $("html").animate({ scrollTop: $("#cGroups").offset().top }, 300);
      return false;
    }
    bClick = $(this).hasClass("active");
  });
});

$(document).on("click", "#btnPrevious", function (e) {
  var bClick = false;
  $($("#cGroups li a").get().reverse()).each(function (iGroup, oGroup) {
    if (bClick) {
      $(this).trigger("click");
      $("html").animate({ scrollTop: $("#cGroups").offset().top }, 300);
      return false;
    }
    bClick = $(this).hasClass("active");
  });
});

$(document).on("click", "#btnGotoSave", function (e) {
  $("#menu-save").trigger("click");
});

$(document).on("click", "#DTBasket .btnDelete", function (e) {
  $("#configId").val($(this).attr("quote"));
  $("#slidein-basket #btnDelete").trigger("click");
});

$(document).on("click", "#DTBasket .btnOpen", function (e) {
  var oDTList = $("#DTProductList").DataTable();
  oDTList.clear();
  $(this).closest("tr").addClass("active");
  oRow = $(this).closest("table").DataTable().row($(this).closest("tr")).data();
  oDTList.rows.add(oRow.items).draw(false);

  $("#slidein-basket .btn, #slidein-basket .arrows, #DTProductList, #DTProductSummary").show();
  $("#slidein-basket input").removeAttr("disabled").removeAttr("readonly").removeClass("readonly");
  $("#DTProductError").hide();

  json2form(oRow, "#slidein-basket");
  $("#btnSDC").data("total", oRow.sdc);
  $("#configAmount").data("sdc", oRow.sdc).data("total", oRow.price).html(localizePrice(oRow.price, sCurrencyCd));
  $("#configQuantity").trigger("keyup");

  if (oRow.status != "")
    $("#slidein-basket .btn, #DTProductList, #DTProductSummary, #DTProductError").not("#btnDelete").toggle();

  else if (oRow.code != "SAV") {
    $("#slidein-basket .btn, #slidein-basket .arrows").not("#btnCopy, #btnExcel").toggle();
    $("#slidein-basket input").attr("disabled", "disabled").attr("readonly", "readonly").addClass("readonly");
  }

  $("#slidein-basket .basketContinue").removeClass("show").hide();
  $("#slidein-basket #basketActions").addClass("show").show();

  $("#menu-basket").trigger("click");
});

$(document).on("click", "#DTBasket .btnOrder", function (e) {
  $("#DTBasket .btnOpen[quote='" + $(this).attr("quote") + "']").trigger("click");
  $("#btnProceed").trigger("click");
});

$(document).on("click", "#DTOrders .btnOpen", function (e) {
  var oDTList = $("#DTProductList").DataTable();
  oDTList.clear();
  $(this).closest("tr").addClass("active");
  var oRow = $(this).closest("table").DataTable().row($(this).closest("tr")).data();
  oDTList.rows.add(oRow.items).draw(false);

  json2form(oRow, "#slidein-orders");
  $("#shipCountry").attr("readonly", "readonly").attr("disabled", "disabled").addClass("readonly");
  $("#configAmount").data("total", oRow.price).html(localizePrice(oRow.price, sCurrencyCd));
  $("#configQuantity").trigger("keyup");

  $("#menu-orders").trigger("click");
});

$(document).on("click", "#slidein-basket #btnDelete", function (e) {
  if (!confirm("{$ CTO.FTS-P3.Ribbon.Delete.Message $}"))
    return false;

  $.getJSON("ajax/delete?quote=" + $("#configId").val(), function (data) {
    if (data.status == "ok")
      window.location.reload();
    else
      alert("{$ CTO.FTS-P3.Ribbon.Delete.Error $}");
  });
});

$(document).on("click", "#slidein-basket #btnSDC", function (e) {
  location.href = "ajax/sdc.csv?quote=" + $("#configId").val();
});

$(document).on("click", "#slidein-basket #btnModify", function (e) {
  location.href = "config?id=" + $("#DTBasket").DataTable().row(".active").data().base + "&quote=" + $("#configId").val();
});

$(document).on("click", "#slidein-basket #btnSave", function (e) {
  if ($("#configName").val().trim() == "") {
    alert("{$ CTO.FTS-P3.Ribbon.Required $}");
    return;
  }

  $.getJSON("ajax/update?quote=" + $("#configId").val() + "&name=" + encodeURIComponent($("#configName").val().trim()) + "&qty=" + $("#configQuantity").val(), function (data) {
    if (data.status == "ok")
      window.location = "basket?quote=" + $("#configId").val();
    else
      alert("{$ CTO.FTS-P3.Ribbon.Save.Error $}");
  });
});

$(document).on("click", "#slidein-basket #btnSubmit", function (e) {
  if (!checkData("#slidein-basket")) {
    alert("{$ CTO.FTS-P3.Ribbon.Required $}");
    return;
  }

  var oOrder = {
    data: form2json("#slidein-basket")
  };

  $.post("ajax/submit", "bom=" + JSON.stringify(oOrder), function (data) {
    if (data.status == "ok") {
      alert("{$ CTO.FTS-P3.Ribbon.Order.Success $}");
      location.href = "orders?quote=" + $("#configId").val();
    } else {
      alert("{$ CTO.FTS-P3.Ribbon.Order.Error $}");
    }
  });
});

$(document).on("click", "#slidein-error .btnError", function (e) {
  e.preventDefault();
  $("#" + $("#component-" + $(this).attr("href")).closest(".tab-pane").attr("aria-labelledby")).trigger("click");
  $("#menu-error").trigger("click");
});

$(document).on("click", "#slidein-ribbon #menu-reset", function (e) {
  e.preventDefault();
  $.each(oConfig.data, function (iComponent, oComponent) {
    $.each(oComponent.items, function (iSelection, oSelection) {
      oSelection.qty = oSelection.qDef;
    });
  });
  $(".DTComponent").DataTable().rows().invalidate();
  createBOM();
});

$(document).on("click", "#slidein-sdc #btnSDC, #slidein-save #btnSave", function (e) {
  var sTodo = $(this).attr("id").toLowerCase().substring(3);

  if (sTodo == "save" && $("#configName").val().trim() == "") {
    alert("Please fill all required fields!");
    return false;
  }

  var oSave = {
    data: {
      id: parseInt($("#configId").val()),
      name: $("#configName").val().trim(),
      qty: parseInt($("#configQuantity").val()),
      status: $(this).data("status"),
      items: []
    }
  };
  $.each(oConfig.data, function (iComponent, oComponent) {
    $.each(oComponent.items, function (iSelection, oSelection) {
      if (oSelection.qty != 0)
        oSave.data.items.push({
          id: oSelection.id,
          qty: oSelection.qty
        });
    });
  });

  $("*").addClass("wait");
  $.post("ajax/save?id=" + getURLParameter("id"), "bom=" + JSON.stringify(oSave), function (data) {
    var iQuote = data.id;
    $("#configId").val(iQuote);
    $("*").removeClass("wait");
    if (sTodo == "sdc")
      location.href = "ajax/sdc.csv?quote=" + iQuote;
    else {
      location.href = "basket?quote=" + iQuote;
    }
  });
});

$(document).on("click", "#btnProceed", function (e) {
  $("#slidein-basket .basketContinue").toggleClass("show").slideToggle(300);
});

$(document).on("click", "#slidein-ribbon a.selected", function (e) {
  $("#DTBasket tr, #DTOrders tr").removeClass("active");
});

$(document).on("click", ".DTComponent .arrows div, #DTProductList .arrows div", function (e) {
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
  $("#configTotal").html(localizePrice(iQty * parseFloat($("#configAmount").data("total")), sCurrencyCd));

  $("#menu-sdc").removeClass("bg-success text-white");
  $("#article-sdc, #btnSDC").hide();
  $("#article-no-sdc").show();
  if (iQty * parseFloat($("#configAmount").data("sdc")) >= $("#btnSDC").data("total")) {
    $("#menu-sdc").addClass("bg-success text-white");
    $("#article-sdc, #article-no-sdc, #btnSDC").toggle();
  }
});

$(document).on("keyup", ".DTComponent input[type='number']", function (e) {
  var oComponent = $(this).closest(".DTComponent");
  var oRow = oComponent.DataTable().row($(this).closest("tr")).data();
  var iQty = parseInt($(this).val()) + oRow.builtIn;

  if (!iQty || isNaN(iQty))
    iQty = 0;

  if ($(oComponent).data("type") == "S" && iQty != 0) {
    oComponent.DataTable().rows().every(function () {
      this.data().qty = 0;
      $(this.node()).find("input").val(0);
    });
  } else {
    var iTotal = iQty;
    oComponent.DataTable().rows().every(function () {
      if (oRow != this.data())
        iTotal += this.data().qty;
    });

    if (iTotal > parseInt(oComponent.data("qmax")))
      iQty -= iTotal - parseInt(oComponent.data("qmax"));
  }

  iQty = Math.min(iQty, oRow.qMax);
  iQty -= oRow.builtIn;
  iQty = Math.max(iQty, oRow.qMin);
  if ($(oComponent).data("type") == "S") {
    iQty = Math.max(iQty, parseInt(oComponent.data("qmin")));
  }

  oRow.qty = iQty;
  $(this).val(iQty);

  oComponent.DataTable().rows($(oComponent).find("tr").not($(this).closest("tr"))).invalidate();
  oComponent.DataTable().cell($(this).closest("tr"), 3).invalidate();
  createBOM();
  $(this).focus();
});

// #endregion