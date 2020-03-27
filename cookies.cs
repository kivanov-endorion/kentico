{% 
  if(ViewMode=="LiveSite" || ViewMode=="Preview"){
    /*
    if(SiteContext.CurrentSite.DataContext.Settings.CustomSettings["UseCookieConsent"]=="True")
    {
    */
       if(Cookies["CMSCookieLevel"]=="1000"){
         return false;
       } else { // if CMSCookieLevel is different from 1000 or not set show bannder
         return true;
       }
    /* 
    }else{
       return false; 
     }
    */
  } else { 
     return false;
  }

%}

// COOKIE LEVELS

// -1000 - absolutely no cookies
// -100 - no cookies
// 0 - essential cookies
// 100 - editor level
// 200 - visitor level
// 1000 - all cookies
// not registered cookies (third part) - considered 200 level