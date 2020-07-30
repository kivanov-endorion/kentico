function CreateSettings(oSelect, sItems) {
  var sCompanies = $("#dataArray").data("companycd").split("|").sort();
  var sSettings = sItems.split("|").map(Function.prototype.call, String.prototype.trim).sort();
  oSelect.html("");
  $.each(sSettings, function (key, sParameter) {
    if (sParameter.substring(0, 1) == ".") {
      $.each(sCompanies, function (key, sCompany) {
        oSelect.append("<option value='" + sCompany + sParameter + "'>" + sCompany + sParameter + "</option>");
      });
    } else if (sParameter != "") {
      oSelect.append("<option value='" + sParameter + "'>" + sParameter + "</option>");
    }
  });
}

function MoveOrder(oTable, oDiff, oItem) {
  oItem = oItem.triggerRow.data();
  for (var iI = 0; iI < oDiff.length; iI++) {
    var oRow = oTable.DataTable().row(oDiff[iI].node).data();
    if (oItem["DT_RowId"] == oRow["DT_RowId"] && oDiff[iI].oldData != oDiff[iI].newData) {
      $.getJSON("/ajax/cto/move/" + oTable.attr("node") + "?cto=" + $("#dataArray").data("code") + "&id=" + oRow["DT_RowId"] + "&pos=" + oDiff[iI].newData, function (e) {
        oTable.DataTable().ajax.reload();
      });
    }
  }
}

function ReDraw(oTable) {
  if (oTable.DataTable().rows().count() > 10) {
    $("#" + oTable.attr("id") + "_paginate").show();
  } else {
    $("#" + oTable.attr("id") + "_paginate").hide();
  }

  var oDependent = $(".parent-" + oTable.attr("node"));
  oTable.find(".selected").removeClass("selected");
  oDependent.each(function () {
    $(this).attr("data", 0);
    $("#" + $(this).attr("node") + "Menu .itemName").html("");
  });

  if ($("#dataArray").data("matrix") == "True" && oTable.attr("parent") != "") {
    if ($("#DT" + oTable.attr("parent")).DataTable().row("tr.selected").length != 0) {
      if (Math.abs($("#DT" + oTable.attr("parent")).DataTable().row("tr.selected").data()["readOnly"] - (oTable.attr("parent") == "Basemodel" && oTable.attr("id").indexOf("DTBasemodel") == -1 ? 1 : 0)) == 1) {
        oTable.find("tfoot").hide();
      } else {
        oTable.find("tfoot").show();
      }
    }
  }

  if (oTable.attr("data") != 0) {
    oTable.find("tbody tr[id='" + oTable.attr("data") + "']").addClass("selected");
    var sParent = oTable.attr("parent");
    var sTree = "";
    while (sParent != "" && sParent != undefined) {
      sTree += $("#DT" + sParent).attr("data") + "|";
      var sParent = $("#DT" + sParent).attr("parent");
    }
    oDependent.each(function () {
      $(this).DataTable().ajax.url(("/ajax/cto/get/" + ($(this).attr("ajax") != undefined ? $(this).attr("ajax") : $(this).attr("node"))).toLowerCase() + "?cto=" + $("#dataArray").data("code") + "&node=" + $(this).attr("node") + "&id=" + oTable.attr("data") + "&tree=" + sTree).load();
    });
  } else {
    oDependent.DataTable().clear();
    oDependent.DataTable().draw(false);
  }
}

function UpSertData(oRow, sType) {
  var bValid = 1;
  var sData = {};
  var sMessage = "";
  var sUrl = ("/ajax/cto/" + sType + "/" + ($(oRow).closest("table").attr("ajax") != undefined ? $(oRow).closest("table").attr("ajax") : $(oRow).closest("table").attr("node"))).toLowerCase();
  sData["cto"] = $("#dataArray").data("code");
  sData["node"] = $(oRow).closest("table").attr("node");
  if (sType == "add") {
    sData["id"] = $(".dataTable[node='" + $(oRow).closest("table").attr("parent") + "']").attr("data");
  } else {
    sData["id"] = $(oRow).attr("id");
  }

  sData["tree"] = "";
  var sParent = $(oRow).closest("table").attr("parent");
  while (sParent != "" && sParent != undefined) {
    sData["tree"] += $("#DT" + sParent).attr("data") + "|";
    var sParent = $("#DT" + sParent).attr("parent");
  }

  $(oRow).attr("disabled", "disabled");
  $("body").css("cursor", "wait");

  if (sType == "delete") {
    bValid = confirm("Should this value be deleted?");
  } else {
    $(oRow).find("input, select, textarea").each(function () {
      if ((sType == "add" || sType == "edit") && $(this).val() == "" && !$(this).hasClass("optional")) {
        bValid = 0;
        sMessage = "Please enter all values!";
      }
      sData[$(this).attr("name")] = $(this).val();
    });
  }
  if (bValid == 0) {
    $("body").css("cursor", "");
    $(oRow).removeAttr("disabled");
    if (sMessage != "") {
      alert(sMessage);
    }
  } else {
    $.ajax({
      url: sUrl,
      type: "POST",
      data: sData,
      dataType: "json",
      success: function (data) {
        if (data.error == 0) {
          $(".dataTable[node='" + data.type + "']").attr("data", data.id);
          $(".dataTable[node='" + data.type + "']").DataTable().ajax.reload(false);
          $(".sibling-" + data.type).attr("data", 0);
          $(".sibling-" + data.type).DataTable().ajax.reload(false);
          $("#" + data.type + "Menu .itemName").html($(".dataTable[node='" + data.type + "'] tr.selected input[name='name']").val());
        } else {
          alert("There was an error while processing the request!\nPlease try again!");
        }
        $("body").css("cursor", "");
        $(oRow).removeAttr("disabled");
      }
    });
  }
}


$(document).ready(function (e) {
  $(".DTAvailG").DataTable({
    autoWidth: false,
    columns: [
      {
        className: "dt-center",
        data: null,
        orderable: false,
        render: function (data) {
          return "<span class='button icon-file-add' type='add'></span>";
        },
        title: "",
      },
      {
        data: null,
        render: function (data) {
          var sValue = (data["name"] == null ? "" : data["name"]);
          return "<input type='hidden' name='item' value='" + data["DT_RowId"] + "'>" + sValue;
        },
        title: "Name",
        width: "100%",
      },
    ],
    drawCallback: function (s) {
      ReDraw($(this));
    },
    language: {
      url: "/CMSScripts/Custom/jQuery/dataTables.lang/{$ DE_Inside.DataTable.Language $}.js",
    },
    order: [[1, "asc"]],
    processing: true,
  });

  $(".DTAvailR").DataTable({
    autoWidth: false,
    columns: [
      {
        className: "dt-center",
        data: null,
        orderable: false,
        render: function (data) {
          return "<span class='button icon-file-add' type='add'></span>";
        },
        title: "",
      },
      {
        data: null,
        render: function (data) {
          var sValue = (data["multi"] == null ? 0 : data["multi"]);
          return (sValue == 1 ? "Multi" : "Single") + "<br>Select";
        },
        title: "Type",
      },
      {
        data: null,
        render: function (data) {
          var sValue = (data["name"] == null ? "" : data["name"]);
          return "<input type='hidden' name='item' value='" + data["DT_RowId"] + "'>" + sValue;
        },
        title: "Name",
        width: "100%",
      },
    ],
    drawCallback: function (s) {
      ReDraw($(this));
    },
    language: {
      url: "/CMSScripts/Custom/jQuery/dataTables.lang/{$ DE_Inside.DataTable.Language $}.js",
    },
    order: [[2, "asc"]],
    processing: true,
  });

  $(".DTDescription").DataTable({
    autoWidth: false,
    columns: [
      {
        className: "dt-center",
        data: null,
        orderable: false,
        render: function (data) {
          return "<span class='button icon-bin-1' type='delete'></span>";
        },
        title: "",
      },
      {
        data: null,
        render: function (data) {
          var sValue = (data["language"] == null ? "" : data["language"]);
          return "<input type='hidden' name='language' value='" + sValue + "'>" + sValue;
        },
        title: "Language",
        width: "10%",
      },
      {
        data: null,
        render: function (data) {
          var sValue = (data["title"] == null ? "" : data["title"]);
          return "<input type='text' name='title' value='" + sValue + "'>";
        },
        title: "Title",
        width: "15%",
      },
      {
        data: null,
        render: function (data) {
          var sValue = (data["text"] == null ? "" : data["text"]);
          return "<textarea name='text'>" + sValue + "</textarea>";
        },
        title: "Description",
        width: "75%",
      },
    ],
    drawCallback: function (s) {
      ReDraw($(this));
    },
    language: {
      url: "/CMSScripts/Custom/jQuery/dataTables.lang/{$ DE_Inside.DataTable.Language $}.js",
    },
    order: [[1, "asc"]],
    processing: true,
    searching: false,
  });

  $(".DTItemG").DataTable({
    autoWidth: false,
    columns: [
      {
        data: "itemOrder",
        type: "num",
        visible: false,
      },
      {
        className: "dt-center",
        data: null,
        render: function (data) {
          return "<span class='button icon-bin-1' type='delete'></span>&nbsp;&nbsp;<span class='button icon-cursor-move-up-down-1' type=''></span>";
        },
        title: "",
        type: "num",
      },
      {
        data: null,
        orderable: false,
        render: function (data) {
          var sValue = (data["name"] == null ? "" : data["name"]);
          return sValue;
        },
        title: "Name",
        width: "100%",
      },
    ],
    drawCallback: function (s) {
      ReDraw($(this));
    },
    language: {
      url: "/CMSScripts/Custom/jQuery/dataTables.lang/{$ DE_Inside.DataTable.Language $}.js",
    },
    order: [[0, "asc"]],
    ordering: false,
    processing: true,
    rowReorder: {
      dataSrc: "itemOrder",
      selector: ".icon-cursor-move-up-down-1",
    },
  }).on("row-reorder", function (e, details, edit) {
    MoveOrder($(this), details, edit);
  });

  $(".DTItemR").DataTable({
    autoWidth: false,
    columns: [
      {
        className: "dt-center",
        data: null,
        orderable: false,
        render: function (data) {
          return "<span class='button icon-bin-1' type='delete'></span>";
        },
        title: "",
      },
      {
        data: null,
        render: function (data) {
          var sValue = (data["multi"] == null ? 0 : data["multi"]);
          return (sValue == 1 ? "Multi" : "Single") + "<br>Select";
        },
        title: "Type",
      },
      {
        data: null,
        render: function (data) {
          var sValue = (data["name"] == null ? "" : data["name"]);
          return sValue;
        },
        title: "Item",
        width: "100%",
      },
      {
        data: null,
        orderable: false,
        render: function (data) {
          var sValue = (data["type"] == null ? 0 : data["type"]);
          return "<select name='type'><option value='0'" + (sValue == 0 ? " selected" : "") + ">&lt;&gt; - unequal</option><option value='1'" + (sValue == 1 ? " selected" : "") + ">= - equal</option><option value='2'" + (sValue == 2 ? " selected" : "") + ">&lt; - smaller</option><option value='3'" + (sValue == 3 ? " selected" : "") + ">&gt; - greater</option></select>";
        },
        title: "Operator",
      },
      {
        data: null,
        orderable: false,
        render: function (data) {
          var sValue = (data["qty"] == null ? 0 : data["qty"]);
          return "<input type='number' name='qty' value='" + sValue + "'>";
        },
        title: "Qty",
      },
    ],
    drawCallback: function (s) {
      ReDraw($(this));
    },
    language: {
      url: "/CMSScripts/Custom/jQuery/dataTables.lang/{$ DE_Inside.DataTable.Language $}.js",
    },
    order: [[2, "asc"]],
    processing: true,
  });

  $(".DTLocalization").DataTable({
    autoWidth: false,
    columns: [
      {
        className: "dt-center",
        data: null,
        orderable: false,
        render: function (data) {
          return "<span class='button icon-bin-1' type='delete'></span>";
        },
        title: "",
      },
      {
        data: null,
        render: function (data) {
          var sLanguage = (data["language"] == null ? "" : data["language"]);
          var sType = (data["type"] == null ? "" : data["type"]);
          return "<input type='hidden' name='language' value='" + sLanguage + "'>" + sLanguage + "<br><input type='hidden' name='type' value='" + sType + "'>" + sType;
        },
        title: "Language<br>Type",
        width: "10%",
      },
      {
        data: null,
        render: function (data) {
          var sValue = (data["text"] == null ? "" : data["text"]);
          return "<textarea name='text'>" + sValue + "</textarea>";
        },
        title: "Content",
        width: "90%",
      },
    ],
    drawCallback: function (s) {
      ReDraw($(this));
    },
    language: {
      url: "/CMSScripts/Custom/jQuery/dataTables.lang/{$ DE_Inside.DataTable.Language $}.js",
    },
    order: [[1, "asc"]],
    processing: true,
    searching: false,
  });

  $(".DTSetting").DataTable({
    autoWidth: false,
    columns: [
      {
        className: "dt-center",
        data: null,
        orderable: false,
        render: function (data) {
          return "<span class='button icon-bin-1' type='delete'></span>";
        },
        title: "",
      },
      {
        data: null,
        render: function (data) {
          var sValue = (data["setting"] == null ? "" : data["setting"]);
          return "<input type='hidden' name='setting' value='" + sValue + "'>" + sValue;
        },
        title: "Setting",
        width: "25%",
      },
      {
        data: null,
        render: function (data) {
          var sValue = (data["value"] == null ? "" : data["value"]);
          return "<input type='text' name='value' value='" + sValue + "'>";
        },
        title: "Value",
        width: "75%",
      },
    ],
    drawCallback: function (s) {
      ReDraw($(this));
    },
    language: {
      url: "/CMSScripts/Custom/jQuery/dataTables.lang/{$ DE_Inside.DataTable.Language $}.js",
    },
    order: [[1, "asc"]],
    processing: true,
    // searching: false,
  });

  $(".DTSimple").DataTable({
    autoWidth: false,
    columns: [
      {
        data: "itemOrder",
        type: "num",
        visible: false,
      },
      {
        className: "dt-center dt-nowrap",
        data: null,
        render: function (data) {
          return (data["readOnly"] == 1 ? "" : "<span class='button icon-" + (data["active"] == 1 ? "check" : "remove") + "-2' type='status'></span>&nbsp;&nbsp;<span class='button icon-bin-1' type='delete'></span>&nbsp;&nbsp;<span class='button icon-copy-2' type='copy'></span>&nbsp;&nbsp;<span class='button icon-cursor-move-up-down-1' type=''></span> ID: " + data.DT_RowId);
        },
        title: "",
        type: "num",
      },
      {
        data: null,
        render: function (data) {
          var sValue = (data["name"] == null ? "" : data["name"]);
          var sReadOnly = (data["readOnly"] != 1 ? "" : "readonly='readonly' ");
          return "<input type='text' name='name' " + sReadOnly + "value='" + sValue + "'>";
        },
        title: "Name",
        width: "100%",
      },
    ],
    drawCallback: function (s) {
      ReDraw($(this));
    },
    language: {
      url: "/CMSScripts/Custom/jQuery/dataTables.lang/{$ DE_Inside.DataTable.Language $}.js",
    },
    order: [[0, "asc"]],
    ordering: false,
    processing: true,
    rowReorder: {
      dataSrc: "itemOrder",
      selector: ".icon-cursor-move-up-down-1",
    },
  }).on("row-reorder", function (e, details, edit) {
    MoveOrder($(this), details, edit);
  });

  $("#DTComponent").DataTable({
    autoWidth: false,
    columns: [
      {
        data: "itemOrder",
        type: "num",
        visible: false,
      },
      {
        className: "dt-center",
        data: null,
        render: function (data) {
          return (data["readOnly"] == 1 ? "" : "<span class='button icon-" + (data["active"] == 1 ? "check" : "remove") + "-2' type='status'></span>&nbsp;&nbsp;<span class='button icon-bin-1' type='delete'></span>&nbsp;&nbsp;<span class='button icon-files-3' type='copy'></span>&nbsp;&nbsp;<span class='button icon-cursor-move-up-down-1' type=''></span>");
        },
        title: "",
        type: "num",
      },
      {
        data: null,
        render: function (data) {
          var sValue = (data["name"] == null ? "" : data["name"]);
          var sReadOnly = (data["readOnly"] != 1 ? "" : "readonly='readonly' ");
          return "<input type='text' name='name' " + sReadOnly + "value='" + sValue + "'>";
        },
        title: "Name",
        width: "70%",
      },
      {
        data: null,
        render: function (data) {
          var sValue = (data["multi"] == null ? 0 : data["multi"]);
          var sReadOnly = (data["readOnly"] != 1 ? "" : "disabled='disabled' readonly='readonly' ");
          return "<input type='checkbox' name='multi' " + sReadOnly + "value='" + sValue + "' " + (sValue == 1 ? "checked" : "") + ">";
        },
        title: "Multi Select",
        width: "10%",
      },
      {
        data: null,
        render: function (data) {
          var sValue = (data["qtyMin"] == null ? 0 : data["qtyMin"]);
          return "<input type='number' name='min' value='" + sValue + "'>";
        },
        title: "Qty Min",
        width: "10%",
      },
      {
        data: null,
        render: function (data) {
          var sValue = (data["qtyMax"] == null ? 0 : data["qtyMax"]);
          return "<input type='number' name='max' value='" + sValue + "'>";
        },
        title: "Qty Max",
        width: "10%",
      },
    ],
    drawCallback: function (s) {
      ReDraw($(this));
    },
    language: {
      url: "/CMSScripts/Custom/jQuery/dataTables.lang/{$ DE_Inside.DataTable.Language $}.js",
    },
    order: [[0, "asc"]],
    ordering: false,
    processing: true,
    rowReorder: {
      dataSrc: "itemOrder",
      selector: ".icon-cursor-move-up-down-1",
    },
  }).on("row-reorder", function (e, details, edit) {
    MoveOrder($(this), details, edit);
  });

  $("#DTSelection").DataTable({
    autoWidth: false,
    columns: [
      {
        data: "itemOrder",
        type: "num",
        visible: false,
      },
      {
        className: "dt-center",
        data: null,
        render: function (data) {
          return (data["readOnly"] == 1 ? "" : "<span class='button icon-" + (data["active"] == 1 ? "check" : "remove") + "-2' type='status'></span>&nbsp;&nbsp;<span class='button icon-bin-1' type='delete'></span>&nbsp;&nbsp;<span class='button icon-files-3' type='copy'></span>&nbsp;&nbsp;<span class='button icon-cursor-move-up-down-1' type=''></span>");
        },
        title: "",
        type: "num",
      },
      {
        data: null,
        render: function (data) {
          var sValue = (data["name"] == null ? "" : data["name"]);
          var sReadOnly = (data["readOnly"] != 1 ? "" : "disabled='disabled' readonly='readonly' ");
          return "<input type='text' name='name' " + sReadOnly + "value='" + sValue + "'>";
        },
        title: "Name",
        width: "70%",
      },
      {
        data: null,
        render: function (data) {
          var sValue = (data["qtyMin"] == null ? 0 : data["qtyMin"]);
          return "<input type='number' name='min' value='" + sValue + "'>";
        },
        title: "Qty Min",
        width: "10%",
      },
      {
        data: null,
        render: function (data) {
          var sValue = (data["qtyMax"] == null ? 0 : data["qtyMax"]);
          return "<input type='number' name='max' value='" + sValue + "'>";
        },
        title: "Qty Max",
        width: "10%",
      },
      {
        data: null,
        render: function (data) {
          var sValue = (data["qty"] == null ? 0 : data["qty"]);
          return "<input type='number' name='def' value='" + sValue + "'>";
        },
        title: "Qty Default",
        width: "10%",
      },
    ],
    drawCallback: function (s) {
      ReDraw($(this));
    },
    language: {
      url: "/CMSScripts/Custom/jQuery/dataTables.lang/{$ DE_Inside.DataTable.Language $}.js",
    },
    order: [[0, "asc"]],
    ordering: false,
    processing: true,
    rowReorder: {
      dataSrc: "itemOrder",
      selector: ".icon-cursor-move-up-down-1",
    },
  }).on("row-reorder", function (e, details, edit) {
    MoveOrder($(this), details, edit);
  });

  $("#DTProduct").DataTable({
    autoWidth: false,
    columns: [
      {
        className: "dt-center",
        data: "active",
        render: function (data) {
          return "<span class='button icon-" + (data == 1 ? "check" : "remove") + "-2' type='status'></span>&nbsp;&nbsp;<span class='button icon-bin-1' type='delete'></span>";
        },
        title: "",
        type: "num",
      },
      {
        data: null,
        render: function (data) {
          var sValue = (data["sku"] == null ? "" : data["sku"]);
          return "<input type='text' name='sku' value='" + sValue + "' class='optional'>";
        },
        title: "SKU",
        width: "30%",
      },
      /*{
        data: null,
        render: function (data) {
          var sValue = (data["vendor"] == null ? "" : data["vendor"]);
          return "<input type='text' name='vendor' value='" + sValue + "' class='optional'>";
        },
        title: "VendorNbr",
        width: "20%",
      },*/
      {
        data: null,
        render: function (data) {
          var sValue = (data["mfrPart"] == null ? "" : data["mfrPart"]);
          return "<input type='text' name='mfrpart' value='" + sValue + "' class='optional'>";
        },
        title: "MfrPartNbr",
        width: "50%",
      },
      {
        data: null,
        render: function (data) {
          var sValue = (data["qty"] == null ? 0 : data["qty"]);
          return "<input type='number' name='qty' value='" + sValue + "'>";
        },
        title: "Qty",
        width: "10%",
      },
    ],
    drawCallback: function (s) {
      ReDraw($(this));
    },
    language: {
      url: "/CMSScripts/Custom/jQuery/dataTables.lang/{$ DE_Inside.DataTable.Language $}.js",
    },
    order: [[1, "asc"], [3, "asc"]],
    ordering: false,
    processing: true,
  });

  $("#ManufacturerMenu").trigger("click");
  $("#DTManufacturer").DataTable().ajax.url("/ajax/cto/get/manufacturer?cto=" + $("#dataArray").data("code"));

  CreateSettings($("select[name='language']"), "EN - English|FR - French|DE - German|IT - Italian|ES - Spanish");
  CreateSettings($("#DTManufacturerLocalization tfoot select[name='type']"), $("#dataArray").data("manufacturerlocalizations"));
  CreateSettings($("#DTManufacturerSetting tfoot select"), $("#dataArray").data("manufacturersettings"));
  CreateSettings($("#DTBasemodelLocalization tfoot select[name='type']"), $("#dataArray").data("basemodellocalizations"));
  CreateSettings($("#DTBasemodelSetting tfoot select"), $("#dataArray").data("basemodelsettings"));
  CreateSettings($("#DTBasemodelGroupLocalization tfoot select[name='type']"), $("#dataArray").data("basemodelgrouplocalizations"));
  CreateSettings($("#DTComponentLocalization tfoot select[name='type']"), $("#dataArray").data("componentlocalizations"));
  CreateSettings($("#DTComponentSetting tfoot select"), $("#dataArray").data("componentsettings"));
  CreateSettings($("#DTComponentGroupLocalization tfoot select[name='type']"), $("#dataArray").data("componentgrouplocalizations"));
  CreateSettings($("#DTSelectionLocalization tfoot select[name='type']"), $("#dataArray").data("selectionlocalizations"));
  CreateSettings($("#DTSelectionSetting tfoot select"), $("#dataArray").data("selectionsettings"));
  CreateSettings($("#DTProductSetting tfoot select"), $("#dataArray").data("productsettings"));
  CreateSettings($("#DTExclusionLocalization tfoot select[name='type']"), $("#dataArray").data("restrictionlocalizations"));
  CreateSettings($("#DTExclusionSetting tfoot select[name='type']"), $("#dataArray").data("restrictionsettings"));
  CreateSettings($("#DTInclusionSetting tfoot select"), $("#dataArray").data("restrictionsettings"));
});

$(document).on("click", "input[type='checkbox']", function (e) {
  $(this).val($(this).is(":checked") ? "1" : "0");
});

$(document).on("change", "tbody tr[disabled!='disabled'] input, tbody tr[disabled!='disabled'] select, tbody tr[disabled!='disabled'] textarea", function (e) {
  if ($(this).attr("type") == "checkbox") {
    $(this).val($(this).is(":checked") ? "1" : "0");
  }
  UpSertData($(this).closest("tr"), "edit");
});

$(document).on("click", "tr[disabled!='disabled'] .button[type!='']", function (e) {
  UpSertData($(this).closest("tr"), $(this).attr("type"));
});

$(document).on("click", ".btnUpdate", function (e) {
  if (confirm("Should the system start a data update?\nThis can not be undone!", "warning")) {
    $("body").css("cursor", "wait");
    $.getJSON("/ajax/cto/update-v2?cto=" + $("#dataArray").data("code"), function (data) {
      if (data.error == 0) {
        alert("Update finished in " + data.time + "ms!", "success");
      } else {
        alert("There was an error while processing the update!\nPlease try again!", "error");
      }
      $("body").css("cursor", "");
    });
  }
});

$(document).on("click", ".dataTable tbody tr", function (e) {
  var oFocus = $(document.activeElement);
  var oTable = $(this).closest("table");
  if (oTable.attr("data") != $(this).attr("id")) {
    oTable.attr("data", $(this).attr("id"));
    if (oTable.hasClass("primaryTable") && $(this).find("td").eq(1).find("input").val() != undefined) {
      $("#" + oTable.attr("node") + "Menu .itemName").html($(this).find("td").eq(1).find("input").val());
    }
    oTable.DataTable().draw(false);
    if (oTable.DataTable().row("tr.selected").data()["readOnly"] == 1) {
      $("." + oTable.attr("node") + "Localization").hide();
      $("." + oTable.attr("node") + "Setting").hide();
    } else {
      $("." + oTable.attr("node") + "Localization").show();
      $("." + oTable.attr("node") + "Setting").show();
    }
    oFocus.focus();
  }
});

$(document).on("click", ".menuItem", function (e) {
  $(".menuItem").removeClass("menuActive");
  $(this).addClass("menuActive");
  $(".groupItem").hide();
  $("#" + $(this).attr("id").replace("Menu", "Group")).show();
});

$(document).on("click", "#MatrixMenu", function (e) {
  var oBasemodel = new Array();
  var oComponent = new Array();
  var oSelection = new Array();
  var oValues = new Array();
  $.getJSON("/ajax/cto/get/matrix?cto=" + $("#dataArray").data("code") + "&id=" + $("#DTManufacturer").attr("data"), function (data) {
    $.each(data["data"], function (iIndex, oItem) {
      if (oItem["type"] == "B") {
        oBasemodel.push(oItem);
      }
      if (oItem["type"] == "C") {
        oComponent.push(oItem);
      }
      if (oItem["type"] == "S") {
        oSelection.push(oItem);
      }
      if (oItem["type"] == "V") {
        oValues.push(oItem);
      }
    });

    if ($.fn.DataTable.isDataTable('#DTMatrix'))
      $("#DTMatrix").DataTable().destroy();

    $("#DTMatrix thead").html("<tr><th></th></tr>");
    $("#DTMatrix tbody").html("");


    $.each(oBasemodel, function (iIndex, oItem) {
      $("#DTMatrix thead tr").append("<td class='rotate' basemodel='" + oItem["basemodel"] + "'><div>" + oItem["name"] + "</div></td>");
    });

    $.each(oSelection, function (iIndex, oItem) {
      $("#DTMatrix tbody").append("<tr selection='" + oItem["selection"] + "'><td>" + oItem["name"] + "</td></tr>");
      var oLine = $("#DTMatrix tbody tr[selection='" + oItem["selection"] + "']");
      $.each(oBasemodel, function (iIndex, oItem) {
        oLine.append("<td basemodel='" + oItem["basemodel"] + "' selection='" + oLine.attr("selection") + "'>&nbsp;</td>");
      });
    });

    $.each(oValues, function (iIndex, oItem) {
      $("#DTMatrix tbody td[basemodel='" + oItem["basemodel"] + "'][selection='" + oItem["selection"] + "']").addClass("checked");
    });

    $("#DTMatrix").DataTable({
      fixedColumns: {
        leftColumns: 1,
        rightColumns: 0
      },
      paging: false,
      scrollCollapse: true,
      scrollX: true,
      scrollY: "500px",
      sort: false
    });
    $("#DTMatrix_filter").appendTo("#DTMatrix_wrapper .DTFC_LeftHeadWrapper table thead th");
  });
});

$(document).on("click", "#DTMatrix td", function (e) {
  var oMapping = $(this);
  $.getJSON("/ajax/cto/edit/matrix?cto=" + $("#dataArray").data("code") + "&basemodel=" + oMapping.attr("basemodel") + "&selection=" + oMapping.attr("selection"), function (data) {
    oMapping.toggleClass("checked");
  });
});

$(document).on("click", "#DTMatrix_wrapper .DTFC_LeftBodyLiner tr", function (e) {
  if ($("#DTMatrix td[selection='" + $(this).attr("selection") + "']").length == $("#DTMatrix td[selection='" + $(this).attr("selection") + "'].checked").length) {
    $("#DTMatrix td[selection='" + $(this).attr("selection") + "']").trigger("click");
  } else {
    $("#DTMatrix td[selection='" + $(this).attr("selection") + "']").not(".checked").trigger("click");
  }
});

  $(document).on("click", "#DTMatrix_wrapper .dataTables_scrollHeadInner table td", function (e) {
    if ($("#DTMatrix td[basemodel='" + $(this).attr("basemodel") + "']").length == $("#DTMatrix td[basemodel='" + $(this).attr("basemodel") + "'].checked").length) {
      $("#DTMatrix td[basemodel='" + $(this).attr("basemodel") + "']").trigger("click");
  } else {
      $("#DTMatrix td[basemodel='" + $(this).attr("basemodel") + "']").not(".checked").trigger("click");
  }
});