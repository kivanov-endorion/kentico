// TO USE IN PAGE TEMPLATES
<%=CMS.Helpers.ResHelper.GetString( "MyKey.SubKey.value" ) %>
<%=CMS.MacroEngine.MacroResolver.Resolve( "The current user is: {% CurrentUser.UserName %}" ) %>
<%= (CurrentDocument.ClassName.ToLower()=="oneim.event") ? "itemscope itemtype=\"http://schema.org/Event\"" : ""  %>

// TO USE IN WEB PARTS

// Add JS file
using CMS.Helpers;
ScriptHelper.RegisterScriptFile(Page, "/1IMv2/core/js/jquery-3.4.1.min.js", true); // true if minify
ScriptHelper.RegisterScriptFromFile(Page, "/1IMv2/core/js/jquery-3.4.1.min.js");
ScriptHelper.RegisterStartupScript(Page, "/1IMv2/core/js/jquery-3.4.1.min.js");

// Add CSS link
using CMS.Base.Web.UI;
CssRegistration.RegisterCssLink(Page, "/1IMv2/core/css/animate.css");

// Add META tags and CSS stylesheets
String FacebookOpenGraph = ""; String cssInline = "";
FacebookOpenGraph += "<meta property=\"og:title\" content=\"" + Title + "\" >";
cssInline += "<style type=\"text/css\"></style>";
Page.Header.Controls.Add(new LiteralControl(FacebookOpenGraph));
Page.Header.Controls.Add(new LiteralControl(cssInline));

// Other Methods for web parts:
GetNotEmpty(MenuItemTeaserImage,"default")
GetLink(URL, string, "noopener")
FixUrl(URL) // FixUrl: & to &amp; etc.
EnsureImageDimensions(width, height, maxSideSize)
GetConvertedImage(Jpeg,72) // convert to jpg
GetGrayscaledImage()
GetResizedImage(width, height)
IsImage(jpg)
EnsureMaximumLineLength("",100,"<br>")
IsAnchor() // Returns true for url's starting with hash (#) character.


// Replace .webp with .jpg
if ( BackgroundImage.Contains(".webp") && CMS.DocumentEngine.DocumentContext.CurrentBodyClass.Contains("InternetExplorer") )
{
    cssinline += "background-image:url(" + MobileBackgroundImage.Replace(".webp", ".jpg") + ");";
}
else
{
    cssinline += "background-image:url(" + MobileBackgroundImage + ");";
}

// Webpart in ASCX Transformation:
<%@ Register Src="/1IM/oneingram-1.9.13/aspx/webparts/IMOnlineBasket.ascx" TagName="Basket" TagPrefix="uc2"  %>
<uc2:Basket ID="Basket1" runat="server" SKU='<%# Eval("PromotionproductSKU").ToString() %>' Qty='<%# ValidationHelper.GetInteger(Eval("PromotionproductQuantity"),0) %>' />

