/* KENTICO MACRO REFERENCE */
// BASIC
{? id ?} = {% QueryString.id %} // paramеter in a url
{$ MyKey.SubKey.value $} = {% GetResourceString("MyKey.SubKey.value") %} // localization
{$=Read more|es-ES=Leer más|zh-CN=阅读更多$} // temp localization


// Methods
{% ToString() %}
{% ToLower() %}
{% ToUpper() %}
{% ToInt32() %}
{% ToBool() %}
{% Split("/")[5] %}
{% LimitLength("string", 10 , "…", true) %}
{% StripTags("string<br>") %}
{% Contains("") %} // or Contains(Field,"")
{% NotContains("") %} 
{% StartsWith("") %}
{% EndsWith("") %}
{% Trim() %}
{% TrimStart() %}
{% TrimEnd() %}
{% Replace(" ", "-") %}
{% RegexReplace("\s", "-") %}
{% Filter(AttachmentExtension == ".jpg") %}
{% Where("AttachmentExtension = '.jpg'") %}
{% if( CurrentDocument.Children.ClassNames("CMS.MenuItem;oneIM.News").Count > 0 ) {} %}
{% if( NodeHasChildren ) {} %}
{% CurrentDocument.Children.FirstItem ?? "No child pages" %} // Returns the left if not null, otherwise the right
{% LoremIpsum(1800) %}
{% UrlEncode(URL) %}
{% HTMLEncode("<br>") %}
{% URL|(encode)true %}
{% IsEven(DataItemIndex) %}
{% if( IsDocumentOnSelectedPath() || IsCurrentDocument() ) { "active" } %}
{% CurrentBrowser.IsMobileDevice %}
{% CurrentUser.IsAuthenticated %}
{% if( CurrentBodyClass.Contains("InternetExplorer") ) { } %}

// SQL Escape
{% SQLEscape( QueryString.cat ) %}
{% QueryString["cat"]|(handlesqlinjection)true %}

// Date format
{% GetDateTime(EventDate, "yyyy-MM-dd:HH-mm-ss") %}
{% FormatDateTime(EventDate, "MMMM d") %}
{% FormatDateTime(EventDate, GetResourceString("oneIM.Localdate.long")) %}
{% CurrentDateTime.Year %}
{% CurrentDocument.DocumentModifiedWhen.Format("{0:MM/dd/yyyy}") %}    /* 09/12/2016 */
{% CurrentDocument.DocumentModifiedWhen.Format("{0:T}") %}             /* 1:42:31 PM */

// Format Numbers
{% Price.Format( "{0:C}" ) %}  // 100.000,00 €
{% Format( "{0:C}", 100000 ) %}  // 100.000,00 €
{% Format( "{0:C}", 100000 )|(culture)bg-bg %}  // 100 000,00 лв.
{% Format( "{0:n}", 100000 ) %}    // 100.000.00
{% Format( "{0:n0}", 100000 ) %}   // 100.000 (0 is the number of decimal symbols)
{% Format( "{0:p0}", 0.56 ) %} // 56 %

// GetImage( image, alt, maxsidesize, width, height )
{% GetImage( MenuItemTeaserImage, DocumentName, 0, 600 ) %}
{% if( MenuItemTeaserImage ) { 
    Format("<img alt='{0}' class='img-fluid' src='~/getattachment/{1}/{2}?width=600'>", DocumentName, MenuItemTeaserImage, CurrentDocument.NodeAliasPath.Replace("/","-")) 
} %}

// GetLogo (Vendors)
<img class="wow flipInX" src="~/logos/GetLogo.ashx?name={% DocumentName.Replace(" ","-") #%}&size=120" alt="{% DocumentName %}" data-wow-delay="{% DataItemIndex*100 %}ms">

// Get URL
{% GetDocumentUrl() %}

// Navigation URL (URL or redirect URL)
{% GetNavigationUrl() %}

// If null and compare
{% ( DocumentMenuCaption ) ? DocumentName : DocumentMenuCaption %}
{% IsNullOrEmpty( DocumentMenuCaption ) ? DocumentName : DocumentMenuCaption %}
{% If( DocumentMenuCaption, DocumentMenuCaption, DocumentName ) %} 
{% if( DocumentMenuCaption == null || DocumentMenuCaption == "" ) { DocumentName } else { DocumentMenuCaption } %}
{% IfEmpty( DocumentMenuCaption, DocumentName, DocumentMenuCaption ) %}
{% IfCompare( Documents[NodeAliasPath].DocumentName, CurrentDocument.DocumentName, "", "active" ) %}
{% CurrentDocument.GetValue("NewsTitle", "Default Title") %} // Sets default value if field is null (optional)
{% CurrentDocument.NewsTitle|(default)Default Title %}

// ViewMode: Edit, Design, LiveSite, Preview
{% if( ViewMode=="Edit" || ViewMode=="Design" ) { return true; } else { return false; } %}

// Grouping in transformations + modulo function
{% if( DataItemIndex mod 3 == 0) { "<div class='row'>" } %}
{% if( DataItemIndex mod 3 == 2 || DataItemIndex == DataItemCount - 1 ) { "</div>" } %}
{% if (DataItemIndex + 1 != DataItemCount) {","} %}

// Nested if else statement
{% 
if() {
    return true;
} else {
    if() {
        return true;
    } else {
        return false;
    }
}
%}

// foreach: Categories
{% if( Documents[NodeALiasPath].Categories.Count > 0 ) { 
    foreach ( category in Documents[NodeALiasPath].Categories ) { 
        "<a href='./?categoryname=" + category.CodeName + "'>" + category.DisplayName + "</a>" 
    } 
} %}

// for: Categories
{% 
    for(i = 0; i < Documents[NodeALiasPath].Categories.Count ; i++){ 
        strCAT=strCAT+(Documents[NodeALiasPath].Categories[i].DisplayName+" | ");
    }
    print(strCAT.ToString().Substring(0,strCAT.LastIndexOf("|")));
%}

// foreach: Attachments
{% foreach (attachment in Documents[NodeALiasPath].AllAttachments.Where("AttachmentExtension = '.jpg' OR AttachmentExtension = '.png' ")) {
    Format("<a data-fancybox='gallery' href='/getattachment/{0}/{1}'><img src='/getattachment/{0}/{1}?width=200' alt='{1}' ></a>", attachment.AttachmentGUID, attachment.AttachmentName)
} %}

// foreach: Attachments from specific field
{% 
    FieldAttachments=IMMacros.GetFieldGUID("oneIM.Product","Gallery");
    Documents[NodeALiasPath].AllAttachments.Where("AttachmentGroupGUID='"+FieldAttachments+"'");
    
    foreach (attachment in Documents[NodeALiasPath].AllAttachments.Where("AttachmentGroupGUID='"+FieldAttachments+"'") ) {
        Format("<a data-fancybox='gallery' data-type='image' href='/getattachment/{0}/{1}'><img src='/getattachment/{0}/{1}?width=200' alt='{1}' ></a>", attachment.AttachmentGUID, attachment.AttachmentName)
    } 
%}

// foreach: Tags
{% if( CurrentDocument.Tags.Count != 0 ) { "<i class='ml-3 badge fas fa-tags text-muted' title='Tags'> </i>" } %}
{% foreach (tag in CurrentDocument.Tags) { 
    "<a class='badge-light bg-light-7' href='./?tagid=" + tag.TagId + "'>"+tag.DisplayName+"</a>" 
} %}

// Transform: Tags
{% if( CurrentDocument.DocumentTags ) {
    "<i class='ml-3 badge fas fa-tags text-muted' title='Tags'> </i>" + 
        CurrentDocument.Tags.Transform( "<a class='badge badge-light font-weight-normal initialism' href='./?tagid={#TagId#}'>{#DisplayName#}</a>" )
} %}

// Apply Transformation 
{% Documents[NodeAliasPath].Children.WithAllData.ApplyTransformation("oneIM.ContainerB4.Page-Card-DE-Teaser") %}

// Settings: bool, string
{% return Settings.CustomSettings.MainNavCheckPrevileges.ToBool() %}
{% if( Settings.CustomSettings["LegalDisclosureLink"] ) {} %}

// Page Template
{% if( CurrentDocument.Parent.NodeTemplate.CodeName != "1IMVendorB4" ) { return true; } else { return false; } %}

// Subsite Navigation Root
{% Documents["/" + CurrentDocument.NodeAliasPath.Split("/")[1]].GetValue("SubSiteNavigationRoot","/%") %}

// Form Macros
{% if( Country.Value == "Austria" ){ "28" } %}
{% if( Country.Value.Contains("Austria") ){ "28" } %}

// IMMacros
{% IMMacros.GetPageAttribute("MenuItemTeaserImageContent") %}  // searches up the tree until it finds != null

// TO USE IN PAGE TEMPLATES
<%=CMS.Helpers.ResHelper.GetString( "MyKey.SubKey.value" ) %>
<%=CMS.MacroEngine.MacroResolver.Resolve( "The current user is: {% CurrentUser.UserName %}" ) %>

/* USEFUL DATA */

// LocalizationContext.CurrentCulture
{% LocalizationContext.CurrentCulture.CodeName %} // en-US
{% LocalizationContext.CurrentCulture.CultureAlias %} // en
{% LocalizationContext.CurrentCulture.DisplayName %} // English - United States
{% LocalizationContext.CurrentCulture.CultureShortName %} // English
{% LocalizationContext.CurrentCulture.GetValue("CultureAlias", "en") %}

// Meta data:
{% (DocumentPageTitle) ? DocumentPageTitle : DocumentName %} // title
{% (DocumentPageDescription) ? StripTags(LimitLength(DocumentPageDescription,160,"…",true)) : StripTags(LimitLength(MenuItemTeaserText,160,"…",true)) %} // description
{% Format("https://{0}/getattachment/{1}/share.jpg", domain, 
    if( MenuItemTeaserImage ) {
        MenuItemTeaserImage
    } else {
        if( NewsTeaser ) {
            NewsTeaser
        } else {
            if( EventTeaserImage ) {
                EventTeaserImage
            } else {
                if( BlogPostTeaser ) {
                    BlogPostTeaser
                } else {
                    if( TeaserImage ) {
                        TeaserImage
                    } else {
                        NodeAliasPath.Replace("/","-")
                        }
                    }
                }
            }
        } 
) %} // image
{% CurrentDocument.AllAttachments.Filter(AttachmentGUID == CurrentDocument.MenuItemTeaserImage).FirstItem.AttachmentImageWidth %} // image width

// Aspect ratio for MenuItemTeaserImage
{% Format("/getattachment/{0}/header.jpg",MenuItemTeaserImage) %}
{% Format("padding-top: {0:p};",((CurrentDocument.AllAttachments.Filter(AttachmentGUID == CurrentDocument.MenuItemTeaserImage).FirstItem.AttachmentImageHeight) / (CurrentDocument.AllAttachments.Filter(AttachmentGUID == CurrentDocument.MenuItemTeaserImage).FirstItem.AttachmentImageWidth))).RegexReplace("\s+","") %}



// Site name:
{% SiteContext.CurrentSite.DataContext.Settings.CMSPageTitlePrefix %}

/* CurrentSite.SiteID:
SiteID  SiteName                    SK_Valid
	    all	                        0
2	    nl.ingrammicro.eu	        15
4	    de.ingrammicro.eu	        5
8	    be.ingrammicro.eu	        2
13	    de-inside	                5   
18	    ch.ingrammicro.eu	        4
19	    oneIM (starter)             5   
20	    uk.ingrammicro.eu	        10
21	    hu1.ingrammicro.eu	        22
23	    fr.ingrammicro.eu	        9
24	    at.ingrammicro.eu	        1
25	    dcpos.ingrammicro.eu	    5
26	    ba.ingrammicro.eu	        6
27	    it.ingrammicro.eu	        12
28	    cz.ingrammicro.eu	        50
29	    pl.ingrammicro.eu	        49
31	    al2.ingrammicro.eu	        42
32	    es.ingrammicro.eu	        6
33	    hr.ingrammicro.eu	        44
34	    mk.ingrammicro.eu	        45
35	    rs.ingrammicro.eu	        47
36	    si.ingrammicro.eu	        48
37	    bg.ingrammicro.eu	        32
38	    hu.ingrammicro.eu	        22
40	    fi.ingrammicro.eu	        8
41	    no.ingrammicro.eu	        19
42	    one.ingrammicro.eu	        5
43	    se.ingrammicro.eu	        17
45	    sk1.ingrammicro.eu	        27
47	    th.ingrammicro-asia.com	    65
50	    nz.ingrammicro-asia.com	    62
51	    my.ingrammicro-asia.com	    61
52	    in.ingrammicro-asia.com	    60
53	    id.ingrammicro-asia.com	    59
54	    hk.ingrammicro-asia.com	    58
55	    cn.ingrammicro-asia.com	    57
56	    au.ingrammicro-asia.com	    56
57	    ph.ingrammicro-asia.com	    63
58	    sg.ingrammicro-asia.com	    64
63	    sk.ingrammicro.eu	        27
*/

/* Testing Macros: Go to: System > Macros > Console */