/* Textarea counter*/
$('#field').on("keyup", function () {
    var max = $(this).attr("maxlength");
    var len = $(this).val().length;
    if (len >= max) {
        $('#charNum').text('You have reached the limit');
    } else {
        var char = max - len;
        $('#charNum').text(char + '/' + max);
    }
});