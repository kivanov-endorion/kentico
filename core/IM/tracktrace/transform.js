var tData = {
  'shipment': {
    "<>": "div", "class": "row highlight", "html": [
      {
        "<>": "div", "class": "col-sm-6 col-md-3 col-xs-12", "html": [
          {
            "<>": "h2", "html": [
              { "<>": "div", "text": "{$ 1IM.Dashboard.TrackTrace.Shipment $}" },
              { "<>": "div", "class": "badge status-text", "data": "${isDamaged}${isDelayed}${isDelivered}${isFailed}${isRefused}${isReturn}" }
            ]
          },
          { "<>": "div", "class": "shlabel push-top", "text": "{$ 1IM.Dashboard.TrackTrace.Address $}:" },
          {
            "<>": "div", "class": "text-muted small", "html": [
              { "<>": "div", "text": "${address1}" },
              { "<>": "div", "text": "${attention}" },
              { "<>": "div", "text": "${address2}" },
              { "<>": "div", "text": "${address3}" },
              { "<>": "div", "text": "${address4}" },
              { "<>": "div", "text": "${address5}" }
            ]
          }
        ]
      },
      {
        "<>": "div", "class": "col-sm-6 col-md-3 col-xs-12", "html": [
          { "<>": "div", "class": "shlabel", "text": "{$ 1IM.Dashboard.TrackTrace.Id $}:" },
          { "<>": "div", "class": "blockquote", "text": "${id}" },
          { "<>": "div", "class": "shlabel", "text": "{$ 1IM.Dashboard.TrackTrace.Weight $}:" },
          {
            "<>": "div", "class": "blockquote", "text": function () {
              return parseFloat(this.weight).toLocaleString(sLocale, oNumbers) + " kg";
            }
          },
          { "<>": "div", "class": "shlabel", "text": "{$ 1IM.Dashboard.TrackTrace.Carrier $}:" },
          { "<>": "div", "class": "blockquote", "text": "${carrier}" }
        ]
      },
      {
        "<>": "div", "class": "col-sm-6 col-md-3 col-xs-12", "html": [
          { "<>": "div", "class": "shlabel", "text": "{$ 1IM.Dashboard.TrackTrace.Shipped $}:" },
          {
            "<>": "div", "class": "blockquote", "text": function () {
              if (this.created == "")
                return "";
              var oDate = new Date(this.created);
              return oDate.toLocaleDateString(sLocale, oDates);
            }
          },
          {
            "<>": "div", "class": "shlabel", "text": function () {
              if (this.hasOwnProperty("delivered") && this.delivered != "")
                return "{$ 1IM.Dashboard.TrackTrace.Delivered $}:";
            }
          },
          {
            "<>": "div", "class": "blockquote", "text": function () {
              if (!this.hasOwnProperty("delivered") || this.delivered == "")
                return "";
              var oDate = new Date(this.delivered);
              return oDate.toLocaleDateString(sLocale, oDates) + " " + oDate.toLocaleTimeString(sLocale);
            }
          },
          {
            "<>": "div", "class": "shlabel", "text": function () {
              if (this.hasOwnProperty("signer") && this.signer != "")
                return "{$ 1IM.Dashboard.TrackTrace.HandedTo $}:"
            }
          },
          { "<>": "div", "class": "blockquote", "text": "${signer}" }
        ]
      },
      {
        "<>": "div", "class": "col-sm-6 col-md-3 col-xs-12", "html": [
          {
            "<>": "div", "class": "shlabel", "text": function () {
              return (this.documents.length != 0 ? "{$ 1IM.Dashboard.TrackTrace.Documents $}:" : "");
            }
          },
          {
            "<>": "div", "html": function () {
              return $.json2html(this.documents, tData.document);
            }
          }
        ]
      },
    ]
  },

  'package': {
    "<>": "div", "class": "card", "html": [
      {
        "<>": "div", "id": "head${id}", "class": "card-header d-flex small", "data-toggle": "collapse", "data-target": "#card${id}", "aria-expanded": "false", "aria-controls": "card${id}", "html": [
          {
            "<>": "div", "class": "col-sm-5", "html": [
              { "<>": "b", "html": "{$ 1IM.Dashboard.TrackTrace.Package $} ${id}<br>" },
              {
                "<>": "span", "html": function () {
                  if (this.products.length == 0)
                    return "";
                  return "- " + this.products[0].vendor + " " + this.products[0].description1 + " <br>";
                }
              },
              {
                "<>": "em", "text": function () {
                  return (this.products.length == 1 ? "{$ 1IM.Dashboard.TrackTrace.ShowDetails $}" : "{$ 1IM.Dashboard.TrackTrace.ShowAll $} (" + this.products.length + ")");
                }
              }
            ]
          },
          {
            "<>": "div", "class": "col-sm-3 col-xs-6", "html": [
              { "<>": "b", "html": "{$ 1IM.Dashboard.TrackTrace.OrderDate $}:<br>" },
              {
                "<>": "span", "text": function () {
                  if (this.products.length == 0)
                    return "";
                  var oDate = new Date(this.products[0].orderDate);
                  return oDate.toLocaleDateString(sLocale, oDates);
                }
              }
            ]
          },
          {
            "<>": "div", "class": "col-sm-3 col-xs-5", "html": [
              { "<>": "b", "html": "{$ 1IM.Dashboard.TrackTrace.LastUpdate $}:<br>" },
              {
                "<>": "span", "text": function () {
                  if (this.status.length == 0)
                    return "";
                  var oDate = new Date(this.status[this.status.length - 1].timeStamp);
                  return oDate.toLocaleDateString(sLocale, oDates) + " " + oDate.toLocaleTimeString(sLocale);
                }
              }
            ]
          },
          {
            "<>": "div", "class": "col-xs-1", "html": [
              { "<>": "i", "class": "pull-right text-muted status-icon fa fa-3x", "data": "${isDamaged}${isDelayed}${isDelivered}${isFailed}${isRefused}${isReturn}" }
            ]
          }
        ]
      },
      {
        "<>": "div", "id": "card${id}", "class": "collapse", "data-parent": "#packages", "aria-labelledby": "head${id}", "html": [
          {
            "<>": "div", "class": "card-body", "html": [
              { 
                "<>": "table", "class": function () {
                  return "table table-responsive table-borderless small tracking-history " + (this.status.length == 0 ? " hidden" : "");
                }, "html": [
                  {
                    "<>": "thead", "html": [
                      {
                        "<>": "tr", "html": [
                          { "<>": "th", "colspan": "99", "text": "{$ 1IM.Dashboard.TrackTrace.History $}" }
                        ]
                      }
                    ]
                  },
                  {
                    "<>": "tbody", "class": "highlight", "html": [
                      {
                        "<>": "tr", "html": function () {
                          return $.json2html(this.status, tData.status);
                        }
                      },
                    ]
                  }
                ]
              },
              {
                "<>": "table", "class": "table table-hover small", "html": [
                  {
                    "<>": "thead", "html": [
                      {
                        "<>": "tr", "html": [
                          { "<>": "th", "text": "{$ 1IM.Dashboard.TrackTrace.Product $}" },
                          { "<>": "th", "text": "{$ 1IM.Dashboard.TrackTrace.Qty $}" },
                          { "<>": "th", "text": "{$ 1IM.Dashboard.TrackTrace.OrderNo $}" }
                        ]
                      }
                    ]
                  },
                  {
                    "<>": "tbody", "html": function () {
                      return $.json2html(this.products, tData.product);
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },

  'status': {
    "<>": "td", "html": [
      {
        "<>": "div", "style": "text-align: center;", "html": [
          { "<>": "span", "class": "status-progress fa", "data": "${isDamaged}${isDelayed}${isDelivered}${isFailed}${isRefused}${isReturn}" }
        ]
      },
      { "<>": "div", "text": "${location}" },
      {
        "<>": "div", "text": function () {
          var oDate = new Date(this.timeStamp);
          return oDate.toLocaleDateString(sLocale, oDates) + " " + oDate.toLocaleTimeString(sLocale);
        }
      },
      { "<>": "div", "text": "${text}" }
    ]
  },

  'product': {
    "<>": "tr", "html": [
      {
        "<>": "td", "html": [
          { "<>": "b", "html": "${vendor} ${description1} ${description2}<br>" },
          {
            "<>": "span", "class": "text-muted", "html": [
              { "<>": "abbr", "title": "{$ 1IM.Dashboard.TrackTrace.IMSKU $}", "text": "SKU" },
              { "<>": "span", "text": ": ${sku} | " },
              { "<>": "abbr", "title": "{$ 1IM.Dashboard.TrackTrace.VPN $}", "text": "VPN" },
              { "<>": "span", "text": ": ${mfrPart} | " },
              { "<>": "abbr", "title": "{$ 1IM.Dashboard.TrackTrace.UUID $}", "text": "UUID" },
              { "<>": "span", "text": ": " },
              {
                "<>": "span", "html": function () {
                  return $.json2html(this.serials, tData.serial);
                }
              }
            ]
          }
        ]
      },
      { "<>": "td", "text": "${quantity}" },
      {
        "<>": "td", "html": [
          {
            "<>": "span", "class": "text-muted", "html": [
              { "<>": "abbr", "title": "{$ 1IM.Dashboard.TrackTrace.OrderNbr $}", "text": "IM" },
              { "<>": "span", "html": ": ${orderNbr}<br>" },
              { "<>": "abbr", "title": "{$ 1IM.Dashboard.TrackTrace.CustPO $}", "text": "Cust" },
              { "<>": "span", "text": ": ${customerPo}" }
            ]
          }
        ]
      }
    ]
  },

  'serial': { "<>": "span", "text": "${type} - ${id} | " },

  'document': {
    "<>": "div", "class": "blockquote", "html": function () {
      if (this.handle != "") {
        return "<a href=\"/api/getdocument.aspx?" + sQuery + "&handle=" + this.handle + "\" target=\"_blank\"><span class=\"fa fa-download\"></span> " + aDocuments[this.type] + "</a>";
      }
    }
  }
}