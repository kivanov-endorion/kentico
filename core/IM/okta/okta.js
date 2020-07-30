console.log("************** Okta SignIn (okta.js) **************");

var OktaDomain = "https://imext-stage.oktapreview.com";
var LogoURL = "/1IM/oneingram-1.9.13/global/Logo_Blue_199x43.png";

var signIn = new OktaSignIn({
    baseUrl: OktaDomain,
    logo: LogoURL,
});

/*
// Version from Okta developer site.
// https://developer.okta.com/code/javascript/okta_sign-in_widget/

signIn.renderEl({
    el: '#widget'
}, function success(res) {
    if (res.status === 'SUCCESS') {
        console.log('Do something with this sessionToken', res.session.token);
        
    } else {
        // The user can be in another authentication state that requires further action.
        // For more information about these states, see:
        // https://github.com/okta/okta-signin-widget#rendereloptions-success-error
    }
});
*/

// Version from Ingram DemoApp
signIn.renderEl({ el: '#widget' }, function (res) {

    $('form').append('<input type="hidden" name="sessionToken" id="hiddenSessionTokenField" />');
    $('form').append('<input type="hidden" name="sessionUserLogin" id="hiddenSessionUserField" />');
    var sessionTokenField = $("#hiddenSessionTokenField");
    var sessionUserField = $("#hiddenSessionUserField");
    sessionTokenField.val(res.session.token);
    sessionUserField.val(res.user.profile.login);

    console.log(res);

    var form = sessionTokenField.parent();
    form.submit();
    $("form#form1").submit();
}, function (err) {
        alert(err);
        console.error(err);

});



/*
// Version from Okta developer site.
// https://developer.okta.com/code/javascript/okta_sign-in_widget/

signIn.showSignInToGetTokens({
    el: '#widget',

    clientId: '${' + ClientId+'}',

    // must be in the list of redirect URIs enabled for the OIDC app
    redirectUri: '${' + RedirectUri+'}',

    // Return an access token from the authorization server
    getAccessToken: true,

    // Return an ID token from the authorization server
    getIdToken: true,
    scope: 'openid profile'
});
*/


