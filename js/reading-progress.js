/* 
    <progress value="0" id="progressBar" class="flat">
        <div class="progress-container">
            <span class="progress-bar"></span>
        </div>
    </progress> 
*/

$(document).ready(function () {

    var getMax = function () {
        return $(document).height() - $(window).height();
    };

    var getValue = function () {
        return $(window).scrollTop();
    };
    var progressBar = {};

    if ('max' in document.createElement('progress')) {
        // Browser supports progress element
        progressBar = $('progress');

        // Set the Max attr for the first time
        progressBar.attr({
            max: getMax()
        });

        $(document).on('scroll', function () {
            // On scroll only Value attr needs to be calculated
            progressBar.attr({
                value: getValue()
            });
        });

        $(window).resize(function () {
            // On resize, both Max/Value attr needs to be calculated
            progressBar.attr({
                max: getMax(),
                value: getValue()
            });
        });
    } else {
        progressBar = $('.progress-bar');
        var max = getMax(),
            value, width;

        var getWidth = function () {
            // Calculate width in percentage
            value = getValue();
            width = (value / max) * 100;
            width = width + '%';
            return width;
        };

        var setWidth = function () {
            progressBar.css({
                width: getWidth()
            });
        };

        $(document).on('scroll', setWidth);
        $(window).on('resize', function () {
            // Need to reset the Max attr
            max = getMax();
            setWidth();
        });
    }
});