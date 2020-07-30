var j2hDOM = null;
var rSearch = null;

function loadCTO() {
  $("#cto-list").html("");
  $.getJSON("ajax/cto?company=" + $("#company").val(), function (data) {
    $.each(data, function () {
      $("#cto-list").append("<div class='col-xs-4'><a href='" + this.path + "'><div class='col-xs-12 p-4 text-center bg-light'><img src='/logos/GetLogo.ashx?name=" + this.logo + "&size=150'><br>" + this.name + "</a></div></div>");
    });
  });
}

$(document).ready(function (e) {
  $("#cto").hide();

  if ($("#cto").attr("node") == "landing-page") {
    if ($("#data-redirect").attr("data") != "") {
      window.location = $("#data-redirect").attr("data");
      return;
    }

    $("#customer").autoComplete({
      autoFocus: true,
      minLength: 3,
      preventEnter: true,
      resolverSettings: {
        requestThrottling: 250,
        url: "ajax/customer",
      },
    });

    if ($("#data-customer").attr("data") != "0") {
      $("#company").val($("#data-company").attr("data"));
      $("#zone-select").hide();
      loadCTO();
    }
    else
      $("#company").trigger("change");

    $(".loader").fadeOut(300);
    $("#cto").fadeIn(300);
  }

  if ($("#cto").attr("node") == "callback") {
    $.getJSON("/systemTasks/cto.ashx?id=" + getURLParameter("id") + "&quote=" + getURLParameter("quote"), function (data) {
      $("form").attr("action", data.urlPunchback);
      $("form").append("<textarea name='bom'>" + JSON.stringify(data) + "</textarea>");
      $("form").submit();
    });
  }
});

$(document).on("change", "#company", function (e) {
  $("#cto-list").hide();
  $("#customer").data("autoComplete")._selectedItem = null;
  $("#customer").val("").focus();
  loadCTO();
});

$(document).on("autocomplete.select", "#customer", function (e, item) {
  if (item != null) {
    $.getJSON("ajax/session?customer=" + item.value, function () {
      $("#cto-list").show();
    });
  }
});

$(document).on("keydown", "#customer", function (e) {
  if (e.keyCode == 13)
    e.preventDefault();
});