// Get Cookie level; Chech if using OneTrust; Check if dash-domain
using System.Text.RegularExpressions;

int currentCookieLevel = GetCurrentCookieLevel();
bool UseOneTrust = SettingsKeyInfoProvider.GetBoolValue(SiteContext.CurrentSiteName + ".UseOneTrustCookieConsent");
string dashdomain = Request.Url.Host;
string pattern = @"^[a-z]{2,20}(-ingrammicro)(-asia)?(-)(eu)?$";
Regex rgx = new Regex(pattern);

if (UseOneTrust && !rgx.IsMatch(dashdomain))


// Add startup scripts
using CMS.Helpers;
using CMS.PortalEngine;

Append("<div id=\"", ShortClientID, "\"></div>");

if (PortalContext.ViewMode != ViewModeEnum.Design)
{
    ScriptHelper.RegisterStartupScript(Page, typeof(string), ShortClientID, "<script src=\"~/pages/GetResource.ashx?js=/1IMv2/core/js/jarallax.min-1.10.7.js\"></script>\r\n");
    ScriptHelper.RegisterStartupScript(Page, typeof(string), "StartUpScript", "$(\".jarallax\").jarallax({ speed: 0.5 });", true);


if (!ScriptHelper.IsClientScriptBlockRegistered(Page, typeof(string), ShortClientID))
    {
        StringBuilder cstext1 = new StringBuilder();
        cstext1.Append("<script type=text/javascript>");
        cstext1.Append("$(\".jarallax\").jarallax({ speed: 0.5 });");
        cstext1.Append("</script>");
        ScriptHelper.RegisterStartupScript(Page, typeof(string), ShortClientID, cstext1.ToString());
    }

}

