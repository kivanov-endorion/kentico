$(document).ready(function (e) {
    $("#DTProducts").DataTable({
        columns: [
            {
                visible: false
            },
            {
                width: "10%"
            },
            {
                width: "15%"
            },
            {
                width: "55%"
            },
            {
                className: "dt-right",
                width: "5%"
            },
            {
                className: "dt-right",
                width: "15%"
            }
        ],
        info: false,
        ordering: false,
        paging: false,
        searching: false
    });

    {% if (CurrentUser.UserIsDomain) { %}
        if ($("#btnEQM").attr("data") != undefined) {
            window.location = "/CTO/callback?id=" + $("#btnEQM").attr("data");
        }
    {% } %}
});

$(document).on("click", "#btnClose", function (e) {
    window.location = "{% CurrentDocument.Parent.NodeAliasPath %}";
});

$(document).on("click", "#btnOffer", function (e) {
    $("#btnOffer").hide();
    $.getJSON("offer", function (data) {
        if (data.status == "ok")
            alert("An offer request was sent to the Ingram Micro Sales team");
    });
});

$(document).on("click", "#btnSmartQuote", function (e) {
    window.open("smartquote.xls");
});

