$(document).ready(function (e) {
    if ($(".panel").length <= 1) {
        $("#form").submit();
    } else {
        $("defaultCTO").show();
    }
});

$(document).on("click", "#cto-submit", function (e) {
    $("#form").submit();
});

$(document).on("click", ".opg-submit", function (e) {
    $("input[name='refModelId']").val($(this).data("modelid"));
    $("input[name='opg']").val($(this).data("opg"));
    $("input[name='bundle']").val($(this).data("bundle"));
    $("input[name='gui.display_header']").val("false");
    $("#form").submit();
});

$(document).on("click", ".panel-heading", function (e) {
    var oPanel = $(this);
    oPanel.find(".expander").toggle();

    if (!oPanel.data("loaded")) {
        var oBody = oPanel.closest(".panel").find(".panel-body");
        oBody.html("<div class='col-xs-12' style='text-align: center'><span class='fa fa-3x fa-spinner fa-spin'></span></div>");
        $.getJSON("opgdetails?e=" + oPanel.data("id"), function (data) {
            oPanel.data("loaded", true);
            oBody.html("");
            $.each(data.data, function (iItem, oBundle) {
                oBody.append("<div class='col-xs-6 col-sm-4 col-md-3 col-lg-2 grey' style='text-align: center'><span class='tile-single'><a href='#' class='opg-submit' data-modelid='" + oBundle.modelId + "' data-opg='" + oBundle.opg + "' data-bundle='" + oBundle.bundle + "'><br><h3>OPG " + oBundle.opg + "<br>Bundle " + oBundle.bundle + "</h3>" + oBundle.basemodel + "</a></span></div>");
            });
        });
    }
});