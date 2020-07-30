console.log("************** Okta SignIn (oktaAuth.js) **************");

var OktaDomain = "https://imext-stage.oktapreview.com";
var LogoURL = "/1IM/oneingram-1.9.13/global/Logo_Blue_199x43.png";
var WidgetContainer = "#widget";


$('.cmdLogoff').click(function(e){
    e.preventDefault;
    //oktaSignIn.authClient.signOut();
    
    //return false;
});


var config = {
    // Required config
    //issuer: OktaDomain + '/oauth2/default',
    url: OktaDomain,
    issuer: OktaDomain + '/oauth2/{% Settings.OktaAuthorizationServerId %}',

   
    // Required for login flow using getWithRedirect()
    clientId: '{% Settings.OktaClientId %}',
    redirectUri: '{% Settings.OktaRedirectUri %}',

    // Parse authorization code from hash fragment instead of search query
    responseMode: 'fragment',

    // Configure TokenManager to use sessionStorage instead of localStorage
    tokenManager: {
        storage: 'sessionStorage'
    },

    // Handle session expiration / token renew failure
    onSessionExpired: function () {
        console.log('re-authorization is required');
        authClient.getWithRedirect();
    }
};

var authClient = new OktaAuth(config);


var oktaSignIn = new OktaSignIn({
    baseUrl: OktaDomain,
    redirectUri: '{% Settings.OktaRedirectUri %}',
    logo: LogoURL,
    clientId: '{% Settings.OktaClientId %}',
    authParams: {
        issuer: OktaDomain+'/oauth2/{% Settings.OktaAuthorizationServerId %}',
        responseType: ['token', 'id_token'],
        display: 'page',
        tokenManager: {
                storage: 'sessionStorage'
            },

    }
});


var idToken = authClient.tokenManager.get('idToken')
    .then(idToken => {
        // If ID Token exists, output it to the console
        if (idToken) {
            console.log(`token exists: ${idToken.claims.email}!`);
            // If ID Token isn't found, try to parse it from the current URL

            $('#form').append('<input type="text" name="sessionToken" id="hiddenSessionTokenField" />');
            $('#form').append('<input type="text" name="sessionUserLogin" id="hiddenSessionUserField" />');
            $('#form').append('<input type="text" name="sessionLocalID" id="hiddenSessionLocalID" />');
            $('#form').append('<input type="text" name="OktaClaims" id="hiddenOktaClaims" />');
            var sessionTokenField = $("#hiddenSessionTokenField");
            var sessionUserField = $("#hiddenSessionUserField");
            var sessionLocalID = $("#hiddenSessionLocalID");
            var OktaClaims = $("#hiddenOktaClaims");


            sessionTokenField.val(idToken.idToken);
            sessionUserField.val(idToken.claims.userName);

            
            console.log(JSON.stringify(idToken.claims));
            strOktaClaims=JSON.stringify(idToken.claims);
            OktaClaims.val(JSON.stringify(idToken.claims));
            //sessionUserField.val({% %});  
           
            var form = sessionTokenField.parent();
            //form.action="/special-pages/loginoktacheckin";

           // document.getElementById["form"].action = "/special-pages/loginoktacheckin";
            //document.getElementById["form"].submit();

            //form.submit();
            $("form").submit();

            //console.log("https://starter.ingrammicro.eu/special-pages/loginoktacheckin?"+"sessionToken="+idToken.idToken+"&sessionUserLogin="+idToken.claims.userName+"&OktaClaims="+strOktaClaims);
            
            return;


        } else if (location.hash) {
            authClient.token.parseFromUrl()
                .then(idToken => {
                    console.log(`Token from URL: ${idToken.claims.email}!`);
                    // Store parsed token in Token Manager
                    authClient.tokenManager.add('idToken', idToken);
                    console.log(idToken);

                });
        } else {
            console.log("No Token available");

        }
    });


oktaSignIn.authClient.session.get().then(function (res) {
//authClient.session.get().then(function (res) {

    // Session exists, show logged in state.
    if (res.status === 'ACTIVE') {

        
        authClient.token.getWithRedirect({
              responseType: 'id_token'
        });

        console.log('Welcome back, ' + res.login);

        

        return;
    }
    // No session, show the login form
   
    //window.loaction.href ="{% Settings.OktaIMOnlineLoginPage %}";
   
    oktaSignIn.renderEl(
        { el: WidgetContainer },
        function success(res) {
            // Nothing to do in this case, the widget will automatically redirect
            // the user to Okta for authentication, then back to this page if successful


        },
        function error(err) {
            // handle errors as needed
            console.error(err);
        }
    );
      
});

