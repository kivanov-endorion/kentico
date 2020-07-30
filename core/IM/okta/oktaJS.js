console.log("************** Okta SignIn (oktaJS.js) **************");

var UseOkta = "{% Settings.OktaUseOkta %}";

if(UseOkta == "1"){
    var OktaDomain = "{% Settings.OktaDomainSTG %}";
    var ClientId = "{% Settings.OktaClientIdSTG %}";
    var RedirectUri = "{% Settings.OktaRedirectUriSTG %}";
    var AuthServer ="{% Settings.OktaAuthorizationServerIdSTG %}";
    var PostLogoutRedirectUri ="{% Settings.OktaPostLogoutRedirectUriSTG %}";
    var OktaIMOnlineLoginPage = "{% Settings.OktaIMOnlineLoginPageSTG %}";
    var OktaLoginMethod ="{% Settings.OktaLoginMethodSTG %}";
}else{
    var OktaDomain = "{% Settings.OktaDomain %}";
    var ClientId = "{% Settings.OktaClientId %}";
    var RedirectUri = "{% Settings.OktaRedirectUri %}";
    var AuthServer ="{% Settings.OktaAuthorizationServerId %}";
    var PostLogoutRedirectUri ="{% Settings.OktaPostLogoutRedirectUri %}";
    var OktaIMOnlineLoginPage = "{% Settings.OktaIMOnlineLoginPage %}";
    var OktaLoginMethod ="{% Settings.OktaLoginMethod %}";
}
const parsedUrl = new URL(window.location.href);
var postloginurl = decodeURIComponent(parsedUrl.searchParams.get("returnurl"));

var CurSite = parsedUrl.protocol +"//"+ parsedUrl.hostname;
var URLTransformUsername= CurSite+ "/pages/oktatransformusername.ashx";


var LogoURL = "/1IM/oneingram-1.9.13/global/Logo_Blue_199x43.png";
var WidgetContainer = "#widget";

if((postloginurl!="") && (postloginurl!="null")){
    $.cookie('postloginurl',postloginurl, { path: '/' });   
}  

$('.cmdUserInfo').click(function(e){
    e.preventDefault();
    // In this case, the ID token is stored under the 'myIdToken' key
    var idToken = oktaSignIn.authClient.tokenManager.get('idToken');
    var accessToken = oktaSignIn.authClient.tokenManager.get('accessToken');

    oktaSignIn.authClient.token.getUserInfo(accessToken, idToken)
    .then(function(user) {
      // user has details about the user
      console.log("UserInfo");
    });

}); // END Logoff


$('.cmdLogoff').click(function(e){
    e.preventDefault();
    // In this case, the ID token is stored under the 'myIdToken' key
    var idToken = oktaSignIn.authClient.tokenManager.get('idToken');

    // Do sign out
    oktaSignIn.authClient.signOut({
        idToken: idToken,
        postLogoutRedirectUri: PostLogoutRedirectUri
    })
    .then(() => {
        window.location.reload(); // optional
    })
    .catch(e => {
        if (e.xhr && e.xhr.status === 429) {
        // Too many requests
        }
    });

}); // END Logoff


// responseType: ['token', 'id_token'],
// responseType: ['openid','profile', 'email'],
// responseType: ['token', 'id_token'],
// state: returnurl,
var oktaSignIn = new OktaSignIn({
    baseUrl: OktaDomain,
    redirectUri: RedirectUri,
    logo: LogoURL,
    clientId: ClientId,
   
    authParams: {
        issuer: OktaDomain+'/oauth2/'+AuthServer,
        responseType: ['token','id_token'],
        responseMode: 'fragment',
        display: 'page'
    },
    processCreds: function (creds, callback) {
                var jsonData = JSON.stringify({ 'userName': creds.username });
                
                $.ajax({
                    url: URLTransformUsername,
                    data: jsonData,
                    dataType: 'json',
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8',
                    success: function (data) {
                        console.log("Trnsform Success: "+data.UserName);
                        transformedUsername = data.UserName;
                        callback();
                    },
                    error: function (e) {
                        console.log("Trnsform Err: "+e);
                        transformedUsername = creds.username;
                        callback();
                    }
                });
            },
    transformUsername: function (u, o) {
        return transformedUsername ? transformedUsername : u;
    }
/*,
    helpLinks: {
        help: 'https://example.com/help',
        forgotPassword: 'https://example.com/forgot-password',
        unlock: 'https://example.com/unlock-account',
        custom: [
          {
            text: 'What is Okta?',
            href: 'https://example.com/what-is-okta'
          },
          {
            text: 'Example Portal',
            href: 'https://example.com'
          }
        ]
      },
*/
});

// Check if id_token or accessToken in URL
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
            var rtrnMsg = `Hello:  ${idToken.claims.name}<br />E-Mail:  ${idToken.claims.email}<br/>Username:  ${idToken.claims.preferred_username}`;
           
            $('#ResultMsg').html(rtrnMsg);
            //idToken: idToken.idToken,
            var oUser = { 
                   
                   preferred_username: idToken.claims.preferred_username,
                   firstName: idToken.claims.firstName,
                   lastName: idToken.claims.lastName,
                   email: idToken.claims.email,
                   companyName: idToken.claims.companyName,
                   countryCode: idToken.claims.countryCode,
                   imResellerId: idToken.claims.imResellerId,
                   locale: idToken.claims.locale
                };

            console.log(oUser);

            var szUser = encodeURI(JSON.stringify(oUser));

            console.log(szUser);

            $('#form').append(`<input type="text" name="idToken" id="idToken" value="${idToken.idToken}" />`);
            $('#form').append(`<input type="text" name="szUser" id="szUser" value="${szUser}"  />`);        
   
            $("form").submit();


        });
    },
        function error(err) {
            // handle errors as needed
            console.error(err);
        }
    );
// If no token provided..
} else {
    // check for session
    oktaSignIn.authClient.session.get().then(function (res) {
        // Session exists, show logged in state.
        if (res.status === 'ACTIVE') {

            // if active session exists get the token with redirect
            //responseMode: 'form_post',
            oktaSignIn.authClient.token.getWithRedirect({
                sessionToken: res.sessionToken,
                responseType: 'id_token',
                responseMode: 'form_post',
                scopes: ['openid','email','profile']
            });

            /*
            console.log('Welcome back, ' + res.login);
            $('#ResultMsg').text('Welcome back, ' + res.login);
            */

            return;
        } else {
            // session is inactive
            $('.cmdIMOnline').removeClass("hide");
            console.log('Sess Status: ' + res.status);
            $('#ResultMsg').text('Session status: ' + res.status);

            
        }
/*
        if(postloginurl!=""){
            $.cookie('postloginurl',postloginurl,{ path: '/' });   
        }    
*/
        if(OktaLoginMethod=="IMOnline"){

            // redirect to IM Online
            console.log("IM Online: " + OktaIMOnlineLoginPage+ClientId);
            window.location = OktaIMOnlineLoginPage+ClientId;
            
            return; 
        }

        if(OktaLoginMethod=="OktaPortal"){
    
            // redirect to OktaPortal
            console.log("OktaPortal: " + OktaIMOnlineLoginPage+ClientId);
            window.location = OktaDomain; //+"?clientId="+ClientId;
            return; 
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
                console.log(err);
                $('#ResultMsg').text('Errr: ' + err);
            }
        );
       
    });
}