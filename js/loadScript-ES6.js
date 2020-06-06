var loadScript = function (src) {
    var tag = document.createElement('script');
    tag.async = false;
    tag.src = src;
    document.getElementsByTagName('body').appendChild(tag);
};
window.addEventListener("load", function () {
    loadScript('https://code.jquery.com/jquery-3.3.1.slim.min.js');
    loadScript('/core/CORE/js/js-bundle-feb-2020.js');
});