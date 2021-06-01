// Get Cookie level; Chech if using OneTrust; Check if dash-domain
using System.Text.RegularExpressions;

int currentCookieLevel = GetCurrentCookieLevel();
bool UseOneTrust = SettingsKeyInfoProvider.GetBoolValue(SiteContext.CurrentSiteName + ".UseOneTrustCookieConsent");
string dashdomain = System.Net.NetworkInformation.IPGlobalProperties.GetIPGlobalProperties().DomainName;
string pattern = @"(-ingrammicro)(-asia)?(-)(eu)?$";
Regex rgx = new Regex(pattern);

if (UseOneTrust && rgx.IsMatch(dashdomain))