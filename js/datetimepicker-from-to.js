// Place div with id datetime on page:
$(document).ready(function(e) {
    $('#datetime').html('<div id="date_filter" class="d-flex">'+
        '<input class="date_range_filter date form-control mr-2" type="text" id="datepicker_from" placeholder="From:" />'+
        '<input class="date_range_filter date form-control" type="text" id="datepicker_to" placeholder="To:" />'+
    '</div>');

    $("#datepicker_from").datetimepicker({
        icons: {
            time: "far fa-clock",
            date: "fas fa-calendar-alt",
            up: "fas fa-arrow-up",
            down: "fas fa-arrow-down"
        },
        format:"DD.MM.YYYY",
        locale: "{%LocalizationContext.CurrentCulture.CultureCode.Split("-")[1]#%}"
    });
    $("#datepicker_to").datetimepicker({
        icons: {
            time: "far fa-clock",
            date: "fas fa-calendar-alt",
            up: "fas fa-arrow-up",
            down: "fas fa-arrow-down"
        },
        format:"DD.MM.YYYY",
        locale: "{%LocalizationContext.CurrentCulture.CultureCode.Split("-")[1]#%}",
        useCurrent: false
    });

    $("#datepicker_from").on("dp.change", function (e) {
        $('#datepicker_to').data("DateTimePicker").minDate(e.date);
        });
    $("#datepicker_to").on("dp.change", function (e) {
        $('#datepicker_from').data("DateTimePicker").maxDate(e.date);
    });
});