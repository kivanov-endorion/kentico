//section json2html
var tData = {
  'config': {"<>":"div","id":"${id}","base":"${base}","class":"highlight row detailsConfig","html":[
    {"<>":"span","class":"fa fa-2x actions configActions","type":"C","item":"${id}","html":[
      {"<>":"span","class":"fa-copy bCopy","title":"{$ 1IM.CTO.Copy $}"},
      {"<>":"span","class":"fa-cogs bEdit","title":"{$ 1IM.CTO.Edit $}"},
      {"<>":"span","class":"fa-trash bDialog","title":"{$ 1IM.CTO.Delete $}"},
      {"<>":"span","class":"fa-folder-open bDialog","dialog":"move","title":"{$ 1IM.CTO.Move $}"}
    ]},
    {"<>":"h4","class":"col-xs-12","text":"${name}"},
    {"<>":"div","class":"col-xs-1","text":"{$ 1IM.CTO.Name $}:"},
    {"<>":"div","class":"col-xs-5 savedAs","html":[
      {"<>":"input","class":"form-control","type":"text","value":"${savedAs}"}
    ]},
    {"<>":"div","class":"col-xs-1","text":"{$ 1IM.CTO.Quantity $}:"},
    {"<>":"div","class":"col-xs-2","html":[
      {"<>":"input","class":"form-control number","type":"number","min":"1","max":"999","step":"1","value":"${qty}"}
    ]},
    {"<>":"div","class":"col-xs-1","text":"{$ 1IM.CTO.Price $}:"},
    {"<>":"div","class":"col-xs-2 number sumConfig","html":function(){
      var dPrice = 0;
      $.each(this.items, function(iIndex, oItem){
        dPrice += parseInt(oItem.qty) * parseFloat(oItem.price);
      });
      return dPrice.toLocaleString(sCulture, {style: "currency", currency: sCurrency}) + "<br><b>" + (dPrice * this.qty).toLocaleString(sCulture, {style: "currency", currency: sCurrency}) + "</b>";
    }},
    {"<>":"em","class":"col-xs-12","html":function() {
      return "Show product details (" + this.items.length + ") <span class='fa fa-chevron-down'></span>";
    }},
    {"<>":"div","class":"col-xs-12 detailsProduct","html":[
      {"<>":"table","html":[
        {"<>":"thead","html":[
          {"<>":"tr","html":[
            {"<>":"th","html":"{$ 1IM.CTO.SKU $}<br>{$ 1IM.CTO.MfrPartNbr $}"},
            {"<>":"th","text":"{$ 1IM.CTO.Description $}"},
            {"<>":"th","class":"number","text":"{$ 1IM.CTO.Quantity $}"},
            {"<>":"th","class":"number","text":"{$ 1IM.CTO.Available $}"},
            {"<>":"th","class":"number","html":"{$ 1IM.CTO.Price $}<br>{$ 1IM.CTO.Total $}"}
          ]}
        ]},
        {"<>":"tbody","html":function(){
          return $.json2html(this.items, tData.product);
        }}
      ]}
    ]}
  ]},
  
  'overview': {"<>":"div","html":[
    {"<>":"div","class":"col-xs-1","html":function(){
      if (this.status == 1) {
        return "<span class='fa fa-2x fa-lock' title='{$ 1IM.CTO.Status.Lock $}'></span>";
      } else if (this.status == 3) {
        return "<span class='fa fa-2x fa-money' title='{$ 1IM.CTO.Status.Order $}'></span>";
      } 
      return "";
    }},
    {"<>":"div","class":"col-xs-8 dropDown","html":[
      {"<>":"h3","text":"${name}"},
      {"<>":"span","class":"item-count","html":"{$ 1IM.CTO.SystemCount $} <span class='fa fa-chevron-down'></span>"}
    ]},
    {"<>":"div","class":"col-xs-3 dropDown number","html":function(){
      var dPrice = parseFloat(this.total);
      return "<h2 class='sumTotal'>" + dPrice.toLocaleString(sCulture, {style: "currency", currency: sCurrency}) + "</h2>";
    }},
    {"<>":"div","class":"col-xs-12 details","style":"display: none","html":[
      {"<>":"div","class":"pull-left actions groupActions","type":"G","item":"${DT_RowId}","html":[
        {"<>":"div","class":"btn btn-success template bUnlock","title":"{$ 1IM.CTO.Unlock $}","html":"<span class='fa fa-unlock-alt' title='{$ 1IM.CTO.Unlock $}'></span> {$ 1IM.CTO.btn.Unlock $}"},
        {"<>":"div","class":"btn btn-success normal bLock","title":"{$ 1IM.CTO.Lock $}","html":"<span class='fa fa-lock'></span> {$ 1IM.CTO.btn.Lock $}"},
        {"<>":"div","class":"btn btn-success normal bDialog","dialog":"rename","title":"{$ 1IM.CTO.Rename $}","html":"<span class='fa fa-edit'></span> {$ 1IM.CTO.Rename $}"},
        {"<>":"div","class":"btn btn-success normal template history bCopy","title":"{$ 1IM.CTO.Copy $}","html":"<span class='fa fa-copy'></span> {$ 1IM.CTO.Copy $}"},
        {"<>":"div","class":"btn btn-success normal bDialog","dialog":"delete","title":"{$ 1IM.CTO.Delete $}","html":"<span class='fa fa-trash'></span> {$ 1IM.CTO.btn.Delete $}"},
        {"<>":"div","class":"btn btn-success normal history bExport","title":"{$ 1IM.CTO.Export.Excel $}","html":"<span class='fa fa-file-excel-o'></span> {$ 1IM.CTO.btn.Export $}"},
{% if(CurrentUser.UserIsDomain) { %}
        {"<>":"div","class":"btn btn-success normal bDialog","dialog":"transfer","title":"{$ 1IM.CTO.Transfer $}","html":"<span class='fa fa-window-restore'></span> {$ 1IM.CTO.btn.Transfer $}"}
{% } else { %}
        {"<>":"div","class":"btn btn-success normal bDialog","dialog":"order","title":"{$ 1IM.CTO.Order $}","html":"<span class='fa fa-money'></span> {$ 1IM.CTO.btn.Order $}"}
{% } #%}
      ]},
      {"<>":"hr","class":"push-top push-bottom"}
    ]}
  ]},
  
  'product': {"<>":"tr","html":[
    {"<>":"td","html":"${sku}<br>${mfrPart}"},
    {"<>":"td","html":"${descr1}<br>${descr2}"},
    {"<>":"td","class":"number","text":"${qty}"},
    {"<>":"td","class":"number","html":function(){
      return (this.avail == 0 ? "<b style='color: red;'>" + this.avail + "</b>" : this.avail);
    }},
    {"<>":"td","class":"number","html":function(){
      return parseFloat(this.price).toLocaleString(sCulture, {style: "currency", currency: sCurrency}) + "<br><b>" + (parseInt(this.qty) * parseFloat(this.price)).toLocaleString(sCulture, {style: "currency", currency: sCurrency}) + "</b>";
    }}
  ]}
};
//endsection

/********************************
**                             **
**  Actual script starts here  **
**                             **
********************************/

var aS = ["normal", "template", "history", "history"];

function calcGroup(dGroup) {
  var dSum = 0;
  var dtGroup = $("#DTBasket").DataTable().row(dGroup).data();

  $.each(dtGroup.details, function(iItem, oItem) {
    var dPrice = 0;
    $.each(oItem.items, function(iLine, oLine) {
      dPrice += oLine.price * oLine.qty;
    });
    dSum += dPrice * oItem.qty;
  });
  dGroup.find(".sumTotal").html(dSum.toLocaleString(sCulture, {style: "currency", currency: sCurrency}));
}

function sendRequest(sUri) {
  $.unblockUI();
  $.blockUI({
    message: $("#loadingScreen").clone(),
    css: {
      background: "none",
      border: "none",
      color: "white"
    },
    onBlock: function() {
      $(".blockUI.blockMsg").css("top", iTop + "px");
    }
  });
  $.getJSON("/cto/ajax/{% CurrentDocument.Parent.Code.ToLower() #%}/" + sUri, function(data) {
    $.unblockUI();
    if (data.success == 1) {
      $("#DTBasket").DataTable().ajax.reload().on("draw", function() {
        $("#DTBasket .dropDown").first().trigger("click");
        $("#DTBasket").DataTable().off("draw");
      });
    }
  });
}

$(document).ready(function(e) {
  iTop = (document.getElementsByTagName("html")[0].scrollHeight - $("#loadingScreen")[0].scrollHeight) / 2;
  $(".dialog").hide();

  $("#DTBasket").DataTable({
    ajax: "/cto/ajax/{% CurrentDocument.Parent.Code.ToLower() #%}/list",
    autoWidth: false,
    columns: [
      {
        data: "timeStamp",
        visible: false
      },
      {
        data: null,
        orderable: false,
        render: function(data) {
          return json2html.transform(data, tData.overview);
        }
      }
    ],
    drawCallback: function(settings) {
      $("#moveGroup").editableSelect("clear");
      $.each($("#DTBasket").DataTable().data(), function(iCount, oItem) {
        if (oItem.status == 0) {
          $("#moveGroup").editableSelect("add", oItem.name);
        }
      });
    },
    initComplete: function(settings, json) {
      $("#DTBasket_length").find("select").addClass("form-control");
      $("#DTBasket_filter").find("input").addClass("form-control");
      
      $("#moveGroup").editableSelect({
        effects: 'slide'
      });
    },
    language: {
      url: "/1IM/dataTables-1.10.12/lang/{$ DataTable.Language $}.js",
    },
    order: [[0, "desc"]],
  });
});

$(document).on("change", ".detailsConfig input", function(e) {
  var dtItem;
  
  var dItem = $(this).closest(".detailsConfig");
  var dtGroup = $("#DTBasket").DataTable().row(dItem.closest("tr")).data();
  
  $.each(dtGroup.details, function(iItem, oItem) {
    var dPrice = 0;
    if (oItem.id == dItem.attr("id")) {
      oItem.name = $(dItem.find("input")[0]).val();
      oItem.qty = $(dItem.find("input")[1]).val();
      dtGroup.details[iItem] = oItem;
      dtItem = oItem;
    }
    $.each(oItem.items, function(iLine, oLine) {
      dPrice += oLine.price * oLine.qty;
    });
    if (oItem.id == dItem.attr("id")) {
      dItem.find(".sumConfig b").html((dPrice * oItem.qty).toLocaleString(sCulture, {style: "currency", currency: sCurrency}));
    }
  });
  calcGroup(dItem.closest("tr"));
  
  $.blockUI({
    message: $("#loadingScreen").clone(),
    css: {
      background: "none",
      border: "none",
      color: "white"
    },
    onBlock: function() {
      $(".blockUI.blockMsg").css("top", iTop + "px");
    }
  });
  $.getJSON("/cto/ajax/{% CurrentDocument.Parent.Code.ToLower() #%}/update?id=" + dtItem.id + "&name=" + encodeURIComponent(dtItem.name) + "&qty=" + dtItem.qty, function(data) {
    $.unblockUI();
  });
});

$(document).on("click", "#btnDelete", function(e) {
  sendRequest("delete?id=" + $(this).attr("item") + "&type=" + $(this).attr("type"));
});

$(document).on("click", "#btnMove", function(e) {
  if ($("#moveGroup").val() == "") {
    $("#moveGroup").val("Configurations " + new Date().toISOString().slice(0, 10));
  }
  sendRequest("delete?id=" + $(this).attr("item") + "&name=" + encodeURIComponent($("#moveGroup").val()));
});

$(document).on("click", "#btnOffer", function(e) {
  sendRequest("offer?id=" + $(this).closest("tr").attr("id"));
});

$(document).on("click", "#btnOrder", function(e) {
  sendRequest("order?id=" + $(this).closest("tr").attr("id"));
});

$(document).on("click", "#btnRename", function(e) {
  if ($("#renameGroup").val() == "") {
    $("#renameGroup").val("Configurations " + new Date().toISOString().slice(0, 10));
  }
  sendRequest("rename?id=" + $(this).attr("item") + "&name=" + encodeURIComponent($("#renameGroup").val()));
});

$(document).on("click", ".btnCancel", function(e) {
  $.unblockUI();
});

$(document).on("click", ".bCopy", function(e) {
  sendRequest("copy?id=" + $(this).closest(".actions").attr("item") + "&type=" + $(this).closest(".actions").attr("type"));
});

$(document).on("click", ".bDialog", function(e) {
  $("#" + $(this).attr("dialog") + "Dialog").find(".btn").attr("type", $(this).closest(".actions").attr("type"));
  $("#" + $(this).attr("dialog") + "Dialog").find(".btn").attr("item", $(this).closest(".actions").attr("item"));
  $.blockUI({
    message: $("#" + $(this).attr("dialog") + "Dialog").clone(),
    css: {
      left: '20%',
      padding: 25,
      width: '60%',
    }
  });
});

$(document).on("click", ".bEdit", function(e) {
  window.location = "config?id=" + $(this).closest(".detailsConfig").attr("base") + "&order=" + $(this).closest(".detailsConfig").attr("id");
});

$(document).on("click", ".bExportSDC", function(e) {
  window.open("/cto/ajax/{% CurrentDocument.Parent.Code.ToLower() #%}/export-sdc.csv?id=" + $(this).closest("tr").attr("id") + "&download", "_self");
});

$(document).on("click", ".bLock", function(e) {
  sendRequest("lock?id=" + $(this).closest("tr").attr("id"));
});

$(document).on("click", ".bUnlock", function(e) {
  sendRequest("unlock?id=" + $(this).closest("tr").attr("id"));
});

$(document).on("click", ".dropDown", function(e) {
  var dtGroup = $("#DTBasket").DataTable().row($(this).closest("tr")).data();
  var dItem = $("#" + dtGroup.DT_RowId).find(".details");
  if (dItem.is(":visible")) {
    dItem.slideUp(500);
  } else {
    $(".details").slideUp(500);
    
    if (dtGroup.details == "") {
      $.blockUI({
        message: $("#loadingScreen").clone(),
        css: {
          background: "none",
          border: "none",
          color: "white"
        },
        onBlock: function() {
          $(".blockUI.blockMsg").css("top", iTop + "px");
        }
      });
      $.getJSON("/cto/ajax/{% CurrentDocument.Parent.Code.ToLower() #%}/basket?id=" + dtGroup.DT_RowId, function(data) {
        $.unblockUI();
        dtGroup.details = data.data;
        //$("#DTBasket").DataTable().row("#" + dtGroup.DT_RowId).data(dtGroup);
        dItem.prepend(json2html.transform(dtGroup.details, tData.config));
        $(".detailsProduct").hide();
        dItem.find(".groupActions div").hide();
        dItem.find(".groupActions ." + aS[dtGroup.status]).show();
        if (dtGroup.status != 0) {
          dItem.find("input").attr("readonly", "readonly");
        }
        dItem.slideDown(500);
      });
    
    } else {
      dItem.slideDown(500);
    }
  }
  $(".detailsProduct").hide();
});

$(document).on("click", ".detailsConfig em", function(e) {
  var dDetails = $(this).closest(".detailsConfig").find(".detailsProduct");
  if (dDetails.is(":visible")) {
    $(".detailsProduct").slideUp(500);
  } else {
    $(".detailsProduct").slideUp(500);
    dDetails.slideDown(500);
  }
});

$(document).on("mouseenter", ".detailsConfig", function(e) {
  $(".configActions").not($(this).find(".configActions")).hide(250);

  var dtGroup = $("#DTBasket").DataTable().row($(this).closest("tr")).data();
  if (dtGroup.status == 0) {
    $(this).find(".configActions").show(250);
  }
});