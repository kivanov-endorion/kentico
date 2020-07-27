{% 
  if( ViewMode == "LiveSite" || ViewMode == "Preview" ) {
       if( Cookies["CMSCookieLevel"] == "1000" ) {
         return false;
       } else {
         return true;
       }
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


// Visibility Condition
{% !domain.Matches("([a-z]){2,9}(-)(ingrammicro)(-asia)?(-)?(eu)?") && CurrentSite.SiteID.ToString().InList("4;19;23;26;27;32;37;38;58;63;71;72".Split(";")) && ViewMode=="LiveSite" #%}


// B4 Cookies (old)
{%if (CurrentSite.SiteID==23 || CurrentSite.SiteID==26 || CurrentSite.SiteID==27 || CurrentSite.SiteID==32 || CurrentSite.SiteID==38 || CurrentSite.SiteID==59 || CurrentSite.SiteID==62 || CurrentSite.SiteID==63 || CurrentSite.SiteID==71) { 
    if(ViewMode=="LiveSite" || ViewMode=="Unknown"){
       return true;
     } else {
       return false;
     }
} 
#%}


// B4 Cookies (legacy)

{%if (CurrentSite.SiteID==23 || CurrentSite.SiteID==26 || CurrentSite.SiteID==27 || CurrentSite.SiteID==32 || CurrentSite.SiteID==38 || CurrentSite.SiteID==59 || CurrentSite.SiteID==62 || CurrentSite.SiteID==63 || CurrentSite.SiteID==71) { return false;} else { 
    if(ViewMode=="LiveSite" || ViewMode="Unknown"){
       if(Cookies["CMSCookieLevel"]=="1000"){
         return false;
       } else { // if CMSCookieLevel is different from 1000 or not set show bannder
         return true;
       }
  } else { // hiden on all other ViewModes
     return false;
  }
} 
#%}