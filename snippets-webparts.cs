// Get Cookie level; Chech if using OneTrust; Check if dash-domain
using System.Text.RegularExpressions;

int currentCookieLevel = GetCurrentCookieLevel();
bool UseOneTrust = SettingsKeyInfoProvider.GetBoolValue(SiteContext.CurrentSiteName + ".UseOneTrustCookieConsent");
string dashdomain = Request.Url.Host;
string pattern = @"^[a-z]{2,20}(-ingrammicro)(-asia)?(-)(eu)?$";
Regex rgx = new Regex(pattern);

if (UseOneTrust && !rgx.IsMatch(dashdomain))