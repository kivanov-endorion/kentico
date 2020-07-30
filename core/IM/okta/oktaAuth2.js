console.log("************** Okta SignIn (oktaAuth2.js) **************");
var OktaDomain = "{% Settings.OktaDomain %}";
var clientId = "{% Settings.OktaClientId %}";
var redirectUri = "{% Settings.OktaRedirectUri %}";
var LogoURL = "/1IM/oneingram-1.9.13/global/Logo_Blue_199x43.png";
var WidgetContainer = "#widget";


var config = {
    // Required config
    //issuer: OktaDomain + '/oauth2/default',
    issuer: OktaDomain + '/oauth2/{% Settings.OktaAuthorizationServerId %}',

    // Required for login flow using getWithRedirect()
    clientId: '{% Settings.OktaClientId %}',
    redirectUri: '{% Settings.OktaRedirectUri %}',

    // Parse authorization code from hash fragment instead of search query
    //responseMode: 'fragment',

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


var oktaSignIn = new OktaSignIn({
    baseUrl: OktaDomain,
    redirectUri: '{% Settings.OktaRedirectUri %}',
    logo: LogoURL,
    clientId: '{% Settings.OktaClientId %}',
    authParams: {
        issuer: OktaDomain + '/oauth2/{% Settings.OktaAuthorizationServerId %}',
        responseType: ['token', 'id_token'],
        display: 'page',
        tokenManager: {
            storage: 'sessionStorage'
        },

    }
});

// Bootstrap the AuthJS Client
var authClient = new OktaAuth(config);
    
/*
var xauthClient = new OktaAuth({
      // Org URL
      url:  '{% Settings.OktaDomain %}',
      // OpenID Connect APP Client ID
      clientId: '{% Settings.OktaClientId %}',
      // Trusted Origin Redirect URI
      redirectUri: '{% Settings.OktaRedirectUri %}'
    });
*/

    // Attempt to retrieve ID Token from Token Manager
   // var idToken = authClient.tokenManager.get('idToken')

authClient.session.get().then(function (res) {

    // Session exists, show logged in state.
    if (res.status === 'ACTIVE') {
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

            
          sessionTokenField.val(res.id);
          sessionUserField.val(res.login);

          OktaClaims.val(idToken.claims.serialize());
          //sessionUserField.val({% %});
        
          //var form = sessionTokenField.parent();
          //form.submit();
          //$("form#form").submit();  

          $('form').submit();
       


      } else if (location.hash) {
        authClient.token.parseFromUrl()
        .then(idToken => {
          console.log(`Token from URL: ${idToken.claims.email}!`);
          // Store parsed token in Token Manager
          authClient.tokenManager.add('idToken', idToken);
          console.log(idToken);
         
        });
      } else {
        // You're not logged in, you need a sessionToken
        //window.location.replace("{% Settings.OktaIMOnlineLoginPage %}");
        //return;

          

        var username = prompt('What is your username?');
        var password = prompt('What is your password?');

        authClient.signIn({username, password})
        .then(res => {
          if (res.status === 'SUCCESS') {
            authClient.token.getWithRedirect({
              sessionToken: res.sessionToken,
              responseType: 'id_token'
            });
          }
        });



       
      }
    });