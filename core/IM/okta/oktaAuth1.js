console.log("************** Okta SignIn (oktaAuth1.js) **************");
var OktaDomain = "{% Settings.OktaDomain %}";
//var OktaDomain = "https://myaccount-stage.ingrammicro.com";
var AuthServerID= "{% Settings.OktaAuthorizationServerId %}";
var ClientID = "{% Settings.OktaClientId %}";
var RedirectURI = "{% Settings.OktaRedirectUri %}";
var LogoURL = "/1IM/oneingram-1.9.13/global/Logo_Blue_199x43.png";
var WidgetContainer = "#widget";
RedirectURI="https://starter.ingrammicro.eu/special-pages/autologinokta";

// Bootstrap the AuthJS Client
    var authClient = new OktaAuth({
      // Org URL
      //url: 'https://${yourOktaDomain}',
      issuer: OktaDomain+'/oauth2/'+AuthServerID,
      // OpenID Connect APP Client ID
      clientId: ClientID,
      // Trusted Origin Redirect URI
      redirectUri: RedirectURI
    });
    // Attempt to retrieve ID Token from Token Manager
    var idToken = authClient.tokenManager.get('idToken')
    .then(idToken => {
      // If ID Token exists, output it to the console
      if (idToken) {
        console.log(`hi ${idToken.claims.email}!`);
        window.location="https://esecommercestg.ingrammicro.com/";
      // If ID Token isn't found, try to parse it from the current URL
      } else if (location.hash) {
        authClient.token.parseFromUrl()
        .then(idToken => {
          console.log(`hi ${idToken.claims.email}!`);
          // Store parsed token in Token Manager
          authClient.tokenManager.add('idToken', idToken);
          console.log(idToken);
          
        });
      } else {
        // You're not logged in, you need a sessionToken
        var username = "amartinez-stg1";
        var password = "Alex@123";

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