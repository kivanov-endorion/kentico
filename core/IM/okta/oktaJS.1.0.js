console.log("************** Okta SignIn (oktaJS.js) **************");

var OktaDomain = "{% Settings.OktaDomain %}";
var ClientId = "{% Settings.OktaClientId %}";
var RedirectUri = "{% Settings.OktaRedirectUri %}";
var AuthServer ="{% Settings.OktaAuthorizationServerId %}";
//AuthServer="default";

var LogoURL = "/1IM/oneingram-1.9.13/global/Logo_Blue_199x43.png";
var WidgetContainer = "#widget";


$('.xcmdLogoff').click(function(e){
    e.preventDefault;
    oktaSignIn.authClient.signOut();
    
    return false;
});
// responseType: ['token', 'id_token'],
// responseType: ['openid','profile', 'email'],
// responseType: ['token', 'id_token'],
var oktaSignIn = new OktaSignIn({
    baseUrl: OktaDomain,
    logo: LogoURL,
    clientId: ClientId,
    authParams: {
        issuer: OktaDomain+'/oauth2/'+AuthServer,
        responseType: ['code', 'id_token'],
        responseMode: 'fragment',
        display: 'page'
    }
});
if (oktaSignIn.hasTokensInUrl()) {
    oktaSignIn.authClient.token.parseFromUrl().then(function success(tokens) {
        // tokens is or is not an array based on the scopes involved
        tokens = Array.isArray(tokens) ? tokens : [tokens];

        // Save the tokens for later use, for example if the page gets refreshed:
        // Add the token to tokenManager to automatically renew the token when needed
        tokens.forEach(function (token) {
            if (token.idToken) {
                oktaSignIn.authClient.tokenManager.add('idToken', token);
            }
            if (token.accessToken) {
                oktaSignIn.authClient.tokenManager.add('accessToken', token);
            }
        });

        // Say hello to the person who just signed in:
        oktaSignIn.authClient.tokenManager.get('idToken').then(function (idToken) {
            console.log('Hello, ' + idToken.claims.email);
            $('#ResultMsg').text('Welcome back, ' + res.login);

            console.log(res);

            //var form = sessionTokenField.parent();
            //form.submit();
            //$("form").submit();


        });
    },
        function error(err) {
            // handle errors as needed
            console.error(err);
        }
    );
} else {
    oktaSignIn.authClient.session.get().then(function (res) {
        // Session exists, show logged in state.
        if (res.status === 'ACTIVE') {
            console.log('Welcome back, ' + res.login);
            $('#ResultMsg').text('Welcome back, ' + res.login);

             $('form').append('<input type="text" name="sessionToken" id="hiddenSessionTokenField"  />');
                $('form').append('<input type="text" name="sessionUserLogin" id="hiddenSessionUserField" />');
                var sessionTokenField = $("#hiddenSessionTokenField");
                var sessionUserField = $("#hiddenSessionUserField");
                sessionTokenField.val(res.id);
                sessionUserField.val(res.login);

                console.log(res.id);
                console.log(res.login);

                

                //var form = sessionTokenField.parent();
                //form.submit();
                //$('form').submit();

            return;
        }else{
             console.log('Sess Status: ' + res.status);
            $('#ResultMsg').text('Session status: ' + res.status);
        }

        
        // No session, show the login form
        oktaSignIn.renderEl(
            { el: WidgetContainer },
            function success(res) {
                // Nothing to do in this case, the widget will automatically redirect
                // the user to Okta for authentication, then back to this page if successful
                

            },
            function error(err) {
                // handle errors as needed
                console.error(err);
                $('#ResultMsg').text('Errr: ' + err);
            }
        );
    });
}