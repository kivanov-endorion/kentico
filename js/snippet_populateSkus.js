// 0Z30336;0Z31423;0Z31417;0Z33070;0Z32108;0Z32095;0Z32104;0Z32096;0Z31750;0Z32079;0Z31823;0Z31824;0Z32080;0Z31826;0Z31684;0Z31687;0Z32090;0Z33076;0Z32088;0Z30350

function populateSkus() {
    var time = 500;
    var skus = [];
    skus = prompt("Please enter SKUs", "").split(";");
    //skus = ["0Z30336", "0Z31423"];

$('input#keywordSearch').val(skus[0]);

    $.each(skus, function (i) {

        //console.log(skus[i]);
        setTimeout(function () {
            $('input#keywordSearch').val(skus[i]);
        }, time);
        setTimeout(function () {
            $('#btnKeywordSearch').trigger('click');
        }, time);
        setTimeout(function () {
            $('#table-products').find('.chkProductSelection').eq(0).trigger('click');
        }, time);
        time += 500;
    });
    setTimeout(function () {
        $('#table-products').find('.chkProductSelection').eq(0).trigger('click');
    }, (skus.length * 500) + 2000);
};
populateSkus();