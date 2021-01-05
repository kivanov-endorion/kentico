/* KENTICO MACRO REFERENCE */
// BASIC
{? id ?} = {% QueryString.id %} // paramеter in a url
{$ MyKey.SubKey.value $} // localization
{% GetResourceString("MyKey.SubKey.value") %}
{$=Read more|es-ES=Leer más|zh-CN=阅读更多$} // temp localization


// Methods
{% ToString() %}
{% ToLower() %}
{% ToUpper() %}
{% ToInt32() %}
{% ToBool() %}
{% Split("/")[5] %}
{% LimitLength("string", 10 , "…", true) %} // true if whole words
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
{% Where("AttachmentExtension = '.jpg'") %} // SQL syntax
{% TopN(1) %}
{% OrderBy("EventDateStart ASC") %}
{% ClassNames("CMS.MenuItem;oneIM.News") %}
{% CurrentDocument.ClassName.InList("cms.menuitem;cms.root".Split(";")) %}
{% if ( NodeHasChildren ) {} %}
{% LoremIpsum(1800) %}
{% UrlEncode(URL) %}
{% HTMLEncode("<br>") %} // or "<br>"|(encode)true
{% IsEven(DataItemIndex) %}
{% if ( IsDocumentOnSelectedPath() || IsCurrentDocument() ) { "active" } %}
{% CurrentBrowser.IsMobileDevice %}
{% CurrentUser.IsAuthenticated %}
{% if ( CurrentBodyClass.Contains("InternetExplorer") ) { } %}
{% GetRandomInt() %}

// SQL Escape
{% SQLEscape( QueryString.cat ) %}
{% QueryString["cat"]|(handlesqlinjection)true %}

// Date format
{% CurrentDateTime.Year %}
{% DateTime.Now.ToString("yyyy-MM-dd h:mm tt") %}
{% GetDateTime(EventDate, "dddd") %} // Wednesday
{% FormatDateTime(EventDate, "MMMM d") %} // April 1
{% FormatDateTime(EventDate, GetResourceString("oneIM.Localdate.long")) %} // Apr 01, 2020
{% EventDate.ToShortDateString() %} // 4/1/2020
{% EventDate.Format("{0:MM/dd/yyyy}") %} // 09/12/2016
{% EventDate.Format("{0:T}") %} // 1:42:31 PM
{% EventDate.ToShortTimeString() %} // 3:22 PM
{% ToTimeSpan(CurrentDateTime - DocumentModifiedWhen).Days %}

// Format Numbers
{% Price.Format( "{0:C}" ) %}  // $100,000.00
{% Format( "{0:C}", 100000 ) %}  //$100,000.00
{% Format( "{0:C}", 100000 )|(culture)bg-bg %}  // 100 000,00 лв.
{% Format( "{0:n}", 100000 ) %}    // 100,000.00
{% Format( "{0:n0}", 100000 ) %}   // 100,000 (0 is the number of decimal symbols)
{% Format( "{0:p0}", 0.56 ) %} // 56 %
{% FormatNotEmpty( "{0:n0}", 1000, 0 ) %} // 1000 or 0

// GetImage( image, alt, maxsidesize, width, height )
{% GetImage( MenuItemTeaserImage, DocumentName, 0, 600, 300 ) %}

// Get attachment (image) URL
{% GetAttachmentUrlByGUID( MenuItemTeaserImage, NodeAlias ) %}
{% if ( MenuItemTeaserImage ) { 
    Format("<img alt='{0}' class='img-fluid lazyload' data-src='{1}?width=600'>", DocumentName, GetAttachmentUrlByGUID( MenuItemTeaserImage, NodeAlias ))
} %}

// GetEditableImage ( image, alt, size, width, height )
{% GetEditableImage(EditableImage, "alt", 0, 300, 150) %}

// GetEditableImage URL
{% GetEditableImageUrl(EditableImage) %}
{% if ( EditableImage ) {
    Format("<img alt='{1}' class='img-fluid lazyload' data-src='{0}?width=600'>", GetEditableImageUrl(EditableImage).Split("?")[0], WebPart.GetValue("EditableImage", "WebpartControlID"))
} %}

// GetLogo (Vendors)
<img class="wow flipInX" src="/logos/GetLogo.ashx?name={% NodeAlias.Replace("-","") %}&size=120" alt="{% DocumentName %}" data-wow-delay="{% DataItemIndex*100 %}ms">

// Get URL
{% GetDocumentUrl() %}

// Navigation URL (URL or redirect URL)
{% GetNavigationUrl() %}

// If null and compare
{% if ( DocumentMenuCaption == null || DocumentMenuCaption == "" ) { DocumentName } else { DocumentMenuCaption } %}
{% IsNullOrEmpty( DocumentMenuCaption ) ? DocumentName : DocumentMenuCaption %}
{% IfEmpty( DocumentMenuCaption, DocumentName, DocumentMenuCaption ) %}
{% if ( DocumentMenuCaption, DocumentMenuCaption, DocumentName ) %} 
{% ( DocumentMenuCaption ) ? DocumentName : DocumentMenuCaption %}
{% DocumentMenuCaption ?? DocumentName %} // Returns the left if not null, otherwise the right. Empty strings are not considered as null
{% CurrentDocument.GetValue("DocumentMenuCaption", DocumentName) %} // Sets default value if field is null (optional)
{% CurrentDocument.NewsTitle|(default)Default Title %}
{% IfCompare( Documents[NodeAliasPath].DocumentName, CurrentDocument.DocumentName, String.Empty, "active" ) %} // item, item, if not equal, if equal; String.Empty = ""

// ViewMode: Edit, Design, LiveSite, Preview
{% if ( ViewMode=="Edit" || ViewMode=="Design" ) { return false; } else { return true; } %}

// Grouping in transformations + modulo function
{% if ( DataItemIndex mod 3 == 0) { "<div class='row'>" } %}
{% if ( DataItemIndex mod 3 == 2 || DataItemIndex == DataItemCount - 1 ) { "</div>" } %}
{% if ( DataItemIndex + 1 != DataItemCount ) { "," } %}

// Nested if else statement
{% 
if () {
    return true;
} else {
    if () {
        return true;
    } else {
        return false;
    }
}
%}
// Nested ternary ( right-associative)
{% value == 0 ? 0 : value == 1 ? 1 : 2 %}

// foreach: Categories
{% if ( Documents[NodeALiasPath].Categories.Count > 0 ) { 
    foreach ( category in Documents[NodeALiasPath].Categories ) { 
        "<a href='./?categoryname=" + category.CodeName + "'>" + category.DisplayName + "</a>" 
    } 
} %}

// for: Categories
{% 
    for (i = 0; i < Documents[NodeALiasPath].Categories.Count ; i++){ 
        strCAT=strCAT+(Documents[NodeALiasPath].Categories[i].DisplayName+" | ");
    }
    print(strCAT.ToString().Substring(0,strCAT.LastIndexOf("|")));
%}

/* AttachmentDescription, AttachmentExtension, AttachmentGUID, AttachmentImageWidth, AttachmentImageHeight, AttachmentMimeType, AttachmentName, AttachmentSize */

// foreach: Attachments
{% foreach (attachment in Documents[NodeALiasPath].AllAttachments.Where("AttachmentExtension = '.jpg' OR AttachmentExtension = '.png' ")) {
    Format("<a data-fancybox='gallery' href='/getattachment/{0}/{1}'><img src='/getattachment/{0}/{1}?width=200' alt='{1}' ></a>", attachment.AttachmentGUID, attachment.AttachmentName)
} %}

{% foreach (attachment in Documents[NodeALiasPath].AllAttachments.Where("AttachmentExtension = '.pdf' OR AttachmentExtension = '.pptx' OR AttachmentExtension = '.docx' ")) {
    Format("<p><a class='{2}' target='_blank' href='/getattachment/{0}/{1}'>{1}</a></p>", attachment.AttachmentGUID, attachment.AttachmentName, attachment.AttachmentExtension.Replace(".","").Replace("x",""))
} %}

// foreach: Attachments from specific field
{% 
    FieldAttachments=IMMacros.GetFieldGUID("oneIM.Product","Gallery");
    Documents[NodeALiasPath].AllAttachments.Where("AttachmentGroupGUID='"+FieldAttachments+"'");
    
    foreach (attachment in Documents[NodeALiasPath].AllAttachments.Where("AttachmentGroupGUID='"+FieldAttachments+"'") ) {
        Format("<a data-fancybox='gallery' data-type='image' href='/getattachment/{0}/{1}'><img src='/getattachment/{0}/{1}?width=200' alt='{1}' ></a>", attachment.AttachmentGUID, attachment.AttachmentName)
    } 
%}

// foreach: Keywords
{% if ( DocumentPageKeyWords ) { "<i class='ml-3 badge fas fa-tags text-muted' title='Keywords'> </i>" } %}
{% foreach (keyword in DocumentPageKeyWords.Replace("\"","").Split(",")) { 
    "<a class='badge badge-light' href='/special-pages/search?searchtext="+keyword+"'>"+keyword+"</a>" 
} %}

// foreach: Tags
{% if ( CurrentDocument.Tags.Count != 0 ) { "<i class='ml-3 badge fas fa-tags text-muted' title='Tags'> </i>" } %}
{% foreach (tag in CurrentDocument.Tags) { 
    "<a class='badge badge-light' href='./?tagid=" + tag.TagId + "'>"+tag.DisplayName+"</a>" 
} %}

// Transform: Tags
{% if ( CurrentDocument.DocumentTags ) {
    "<i class='ml-3 badge fas fa-tags text-muted' title='Tags'> </i>" + 
        CurrentDocument.Tags.Transform( "<a class='badge badge-light font-weight-normal initialism' href='./?tagid={#TagId#}'>{#DisplayName#}</a>" )
} %}

// Apply Transformation 
{% Documents[NodeAliasPath].Children.WithAllData.ApplyTransformation("oneIM.ContainerB4.Page-Card-DE-Teaser") %}

// Settings: bool, string
{% return Settings.CustomSettings.MainNavCheckPrevileges.ToBool() %}
{% if ( Settings.CustomSettings["LegalDisclosureLink"] ) {} %}

// Page Template
{% if ( CurrentDocument.NodeTemplate.CodeName != "1IMVendorB4" ) { return true; } else { return false; } %}

// Subsite Navigation Root
{% Documents["/" + CurrentDocument.NodeAliasPath.Split("/")[1]].GetValue("SubSiteNavigationRoot","/%") %}
{% IMMacros.GetPageAttribute("SubSiteNavigationRoot","oneIM.subSite")|(default)/% %} // enhanced

// IMMacros
{% IMMacros.GetPageAttribute("MenuItemTeaserImageContent") %}  // searches up the tree until it finds != null


/* USEFUL DATA */

// LocalizationContext
{% LocalizationContext.PreferredCultureCode %} // en-US (by default or when set by Language Selector)
{% LocalizationContext.CurrentCulture.CodeName %} // en-US
{% LocalizationContext.CurrentCulture.CultureAlias %} // en
{% LocalizationContext.CurrentCulture.DisplayName %} // English - United States
{% LocalizationContext.CurrentCulture.CultureShortName %} // English
{% LocalizationContext.CurrentCulture.GetValue("CultureAlias", "en") %}
{% LocalizationContext.CurrentCulture.CultureAlias ?? "en" %}
// Language flag
{% Format("<img src='/CMSPages/GetResource.ashx?image={0}{1}.png' alt='{1}'>", URLEncode("[Images.zip]/Flags/16x16/"), LocalizationContext.CurrentCulture.CultureCode) %}

// Meta data:
{% DocumentPageTitle ?? DocumentName %} // title
{% (DocumentPageDescription ?? MenuItemTeaserText).StripTags().LimitLength(160,"…",true) %} // description
{% GetAttachmentUrlByGUID( MenuItemTeaserImage ?? NewsTeaser ?? EventTeaserImage ?? BlogPostTeaser ?? TeaserImage ?? CurrentDocument.AllAttachments.FirstItem.AttachmentGUID, NodeAlias ) %} // image
{% CurrentDocument.AllAttachments.Filter(AttachmentGUID == CurrentDocument.MenuItemTeaserImage).FirstItem.AttachmentImageWidth %} // image width

// Aspect ratio for MenuItemTeaserImage
{% Format("padding-top: {0:p};",((CurrentDocument.AllAttachments.Filter(AttachmentGUID == CurrentDocument.MenuItemTeaserImage).FirstItem.AttachmentImageHeight) / (CurrentDocument.AllAttachments.Filter(AttachmentGUID == CurrentDocument.MenuItemTeaserImage).FirstItem.AttachmentImageWidth))).RegexReplace("\s+","") %}

// Check if published
{% Documents[NodeAliasPath].Children.Where("DocumentCanBePublished = 1 AND GETDATE() BETWEEN ISNULL(DocumentPublishFrom, GETDATE()) AND ISNULL(DocumentPublishTo, GETDATE())") %}


// Site name:
{% SiteContext.CurrentSite.DataContext.Settings.CMSPageTitlePrefix %}

/* CurrentSite.SiteID:
SiteID  SiteName            SK_Valid    B4
	    all	                0
2	    nl	                15
4	    de	                5           *
8	    be	                2
13	    de-inside	        5   
19	    oneIM (starter)     5           *
20	    uk	                10
23	    fr	                9           *
24	    at	                1
25	    al	                5
26	    ch	                4           *
27	    it	                12          *
28	    cz	                50
29	    pl	                49
32	    es	                6           *
33	    hr	                44
34	    mk	                45
35	    rs	                47
36	    si	                48
37	    bg	                32          *
38	    hu	                22          *
40	    fi	                8           *
41	    no	                19          *
42	    one	                5
43	    se	                17          *
47	    th	                65
50	    nz	                62
51	    my	                61          *
52	    in	                60
53	    id	                59
54	    hk	                58          *
55	    cn	                57          *
56	    au	                56
57	    ph	                63
58	    sg	                64          *
59      financing (emea)                *
62      financing (apac)                *
63	    sk	                27          *
68      ro                  46          *
70      dk                  7           *
71      dcpos               5           *
72      il                  29          *
73      solutions           10          *
*/

/* Testing Macros: Go to: System > Macros > Console */


// CurrentDocument
// NOTE: CurrentDocument is only available on the live or preview site. Replace with EditedObject, if needed

{% DocumentName %}
{% DocumentCreatedWhen %}
{% DocumentModifiedWhen %}
{% DocumentCulture %}
{% DocumentCanBePublished %}
{% DocumentMenuCaption %}
{% DocumentMenuItemHideInNavigation %}
{% if (DocumentMenuItemInactive == true) {} %}
{% DocumentMenuRedirectToFirstChild %}
{% DocumentMenuRedirectUrl %}

{% DocumentMenuStyle %} // these also have Highlighted variants
{% DocumentMenuClass %}
{% DocumentMenuItemImage %}
{% DocumentMenuItemLeftImage %}
{% DocumentMenuItemRightImage %}

// Check if CurrentDocument is on path
{% if ( IsDocumentOnSelectedPath() || IsCurrentDocument() ) { "active" } %}
{% IfCompare( NodeAliasPath, CurrentDocument.NodeAliasPath, "", "active" ) %}
{% if( CurrentDocument.NodeAliasPath.Contains(NodeAliasPath) ) { "active" } %}

{% NodeAlias %}
{% NodeAliasPath %}
{% NodeID %}
{% NodeHasChildren %} // = Documents.Where("NodeID = " + NodeID).FirstItem.Children.Count > 0
{% NodeLevel %}
{% NodeOrder %}
{% NodeParentID %}
{% NodeInheritPageTemplate %}
{% DocumentContext.CurrentDocumentParent.NodeAliasPath %} // Parent URL

// MenuItem (Page)

{% MenuItemTeaserImage %}
{% MenuItemTeaserImageMobile %}
{% MenuItemTeaserImageContent %}
{% MenuItemTeaserText %}
{% MenuItemIconClass %}
{% MenuItemName %}
{% MenuItemTarget %}
{% Breadcrumbs %}
{% MenuItemGroup %} // options: top, footer, left, inline, category, none
{% MenuItemSidebar %} // options: left, right, none
{% MenuItemHorizontalSublNavigation %}
{% MenuItemSubNavigation %} // options: pathHorizontal, pathHeaderImg, categoriesHeaderImg
{% MenuItemTransformation %} // visible for News, Events, Products page templates

{% CurrentDocType %}

{% CurrentURL %}
{% AbsoluteURL %} // Note: gets the dash domain URL
{% GetAbsoluteUrl(URL) %}

// Related documents
{% Documents[NodeAliasPath].RelatedDocuments["isrelatedto"] %}

// Requires authentication
{% CurrentDocument.IsSecuredNode %}

// Categories
{% CategoryID %}
{% CategoryDisplayName %}
{% CategoryName %}
{% CategoryDescription %}
{% CategoryLevel %}
{% CategorySiteID %}
{% CategoryParentID %}
{% CurrentDocument.IsInCategories("ABC;ABCD") %}


/* WEBPARTS / WIDGETS */

{% WebpartControlID %}
{% WebpartType %}

// Check if widget / web part is on page
{% DocumentContext.CurrentPageInfo.DocumentContent.Contains("On_lineFormPlus") %} // for editable widgets
{% DocumentContext.CurrentTemplate.PageTemplateWebParts.Contains("On_lineFormPlus") %} // for webparts

// Repeater values
{% WebPart.GetValue("Repeater", "ContainerTitle") %}
{% WebPart.GetValue("Repeater", "Path") %}
{% WebPart.GetValue("Repeater", "ClassNames") %}
{% WebPart.GetValue("Repeater", "maxRelativeLevel") %}
{% WebPart.GetValue("Repeater", "selectOnlyPublished") %}
{% WebPart.GetValue("Repeater", "TransformationName") %}
{% WebPart.GetValue("Repeater", "Visible") %}
{% WebPart.GetValue("StaticHTML_1", "isWidget") %}

// EditableImage values
{% WebPart.GetValue("EditableImage", "DefaultImage") %}
{% WebPart.GetValue("EditableImage", "AlternateText") %}
{% WebPart.GetValue("EditableImage", "ImageCssClass") %}
{% WebPart.GetValue("EditableImage", "ImageStyle") %}

// Webpart / Widget Zones
{% WebPartZone.GetValue("zoneWidgetA", "ContentBefore") %}
{% WebPartZone.GetValue("zoneWidgetA", "WidgetZoneType") %} // None, Editor, etc.




/* EVENTS */

// Event Teaser Image
{% IsNullOrEmpty(EventTeaserImage) ? 
    Format("<img src='~/1IM/oneingram-1.9.13/global/default_975.jpg' alt='{0}' class='img-fluid' />", EventTitle) : 
    Format("<img src='{0}?width=446' alt='{1}' class='img-fluid'/>", GetAttachmentUrlByGUID( EventTeaserImage, NodeAlias ), EventTitle ) %}

// Feb 26 – Mar 26, 2020
// 10:00 AM – 10:00 AM
{% if (EventDateStart || EventDateEnd) {
    IfCompare(
        FormatDateTime(EventDateStart, "d MMMM"), 
        FormatDateTime(EventDateEnd, "d MMMM"), 
        "<time class='small text-muted text-right'>" + 
            IfCompare(
                FormatDateTime(EventDateStart, "MMMM"), FormatDateTime(EventDateEnd, "MMMM"),
                FormatDateTime(EventDateStart, "MMM d") + "&thinsp'&ndash;&thinsp'"+ 
                FormatDateTime(EventDateEnd, "MMM d, yyyy") +"<br/>",
                FormatDateTime(EventDateStart, "MMM d") + " &ndash; "+ 
                FormatDateTime(EventDateEnd, "d, yyyy") +"<br/>"
            ) +        
            FormatDateTime(EventDateStart, GetResourceString("oneIM.Localtime")) + " &ndash; "+ 
            FormatDateTime(EventDateEnd, GetResourceString("oneIM.Localtime")) +"</time>", 
        "<time class='small text-muted text-right'>" + 
            FormatDateTime(EventDateStart, GetResourceString("oneIM.Localdate.long")) + "<br/>"+ 
            FormatDateTime(EventDateStart, GetResourceString("oneIM.Localtime"))+ " &ndash; "+
            FormatDateTime(EventDateEnd, GetResourceString("oneIM.Localtime"))+ "</time>"
    )
} %}

/* Add Categories as Breadcrumbs */
<span class="CMSBreadCrumbsCurrentItem">
{% if ( CurrentDocument.Categories.Count > 0 ) { 
    foreach ( category in CurrentDocument.Categories ) { 
        Format("<a href='/one-im-b4{0}?categoryID={1}' title='{2}'>{2}</a>", 
        category.CategoryNamePath.ToLower().Replace(" & ","-and-").Replace(" ", "-"),
        category.ID,
        category.CategoryDisplayName)
    } 
} %}
{% CurrentDocument.DocumentName %}
</span>

// Gets the path of the parent master page
{%
    node = Documents[NodeAliasPath];
    while (!node.NodeTemplate.PageTemplateShowAsMasterTemplate && !node.DocumentPageTemplate.PageTemplateShowAsMasterTemplate) {
        node = node.Parent;
    }
    node.NodeAliasPath + "/%"; 
%}

// Contacts with related vendors
{% foreach ( vendor in Documents[NodeAliasPath].RelatedDocuments["VendorCardContact"] ) { 
    vendor.DocumentName.InList(CurrentDocument.RelatedDocuments.isrelatedto) ? Format("<p class='small mt-n2 text-center'>{0}</p>",vendor.DocumentName) : ""
} %}


// Search index per site
{% "1IM-" + ToUpper(domain.RegexReplace("(-corp)?(-|.)(endorion)(-asia)?(-|.)?(com|eu)?","")) + "-Search" %}

// Cookie visibility
{% !domain.Matches("[a-z]{2}(-)(endorion)(-asia)?(-)?(eu)?") && CurrentSite.SiteID.ToString().InList("4;19;23;26;27;32;37;38;58;63;71;72".Split(";")) && ViewMode=="LiveSite" %}

// Check if children of type
{% CurrentDocument.AllChildren.ClassNames("CMS.SimpleArticle;oneIM.EmbedVideo").Count>0 %}

// Check if document has teaser image
{% if( Documents[NodeAliasPath].GetValue("MenuItemTeaserImage", false) != false) %}

// Generate random number
{% String.FormatString("{0:yyyyMMddhhmmssfffff}", CurrentDateTime) + Math.GetRandomInt(10000, 99999) %}