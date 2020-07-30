console.log("************** Okta CheckSession [oktaCheckSession.js] **************");


var UseOkta = "{% Settings.OktaUseOkta %}";

if(UseOkta == "1"){
    var OktaDomain = "{% Settings.OktaDomainSTG %}";
    var ClientId = "{% Settings.OktaClientIdSTG %}";
    var OktaLocalLoginPage ="{% Settings.OktaLocalLoginPageSTG %}";
    
}else{
    var OktaDomain = "{% Settings.OktaDomain %}";
    var ClientId = "{% Settings.OktaClientId %}";
    var OktaLocalLoginPage ="{% Settings.OktaLocalLoginPageSTG %}";
}



//polyfill for IE to support 'find'
if (!Array.prototype.find) {
    Array.prototype.find = function (predicate) {
        if (this === null) {
            throw new TypeError('Array.prototype.find called on null or undefined');
        }
        if (typeof predicate !== 'function') {
            throw new TypeError('predicate must be a function');
        }
        var list = Object(this);
        var length = list.length >>> 0;
        var thisArg = arguments[1];
        var value;

        for (var i = 0; i < length; i++) {
            value = list[i];
            if (predicate.call(thisArg, value, i, list)) {
                return value;
            }
        }
        return undefined;
    };
}
//end polyfill

var isAuthenticated = "{% CurrentUser.IsAuthenticated %}";
isAuthenticated = isAuthenticated === 'True';
var baseUrl = OktaDomain;

var xhr = new XMLHttpRequest();
if ("withCredentials" in xhr) {

    xhr.open('GET', baseUrl + '/api/v1/users/me/appLinks', true);
    xhr.withCredentials = true;
    xhr.send();

    xhr.onload = function () {
        var apps = JSON.parse(this.responseText);
        var found = apps.find(function (app) {
            return app.appInstanceId == ClientId;
        });
        if (found && !isAuthenticated) {
           
           var returnurl = encodeURIComponent(window.location.pathname);
           $.cookie('returnurl', returnurl);

            window.location.href = OktaLocalLoginPage+"?returnurl="+returnurl;
        }
    };

    xhr.onerror = function () {
        if (isAuthenticated) {
            document.getElementById('logoutForm').submit();
        }
    }

}
else {
    console.log("CORS is not supported for this browser!");
}



