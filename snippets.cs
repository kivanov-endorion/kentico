// TO USE IN PAGE TEMPLATES
<%=CMS.Helpers.ResHelper.GetString( "resourcestringname" )%>
<%=CMS.MacroEngine.MacroResolver.Resolve( "The current user is: {% CurrentUser.UserName %}" ) %>

// BASIC
{% macro expression %}
{? id ?} = {% QueryString.id %} // paramеter in a url
{$ localization string $} = {% GetResourceString("MyKey.SubKey.value") %}
{$=Read more|ES=Leer más|zh-CN=阅读更多$} // temp localization
{% string.ToString().ToUpper().ToLower() %}
{% number.ToInt32() %}
{% boolean.ToBool() %}

// Methods
{% Split("/")[5] %}
{% LimitLength("string", 10 , "&hellip;", true) %}
{% StripTags("string") %}
{% Contains(Field,"") %} {% NotContains(Field,"") %} // or Field.Contains("")
{% Trim() %} {% TrimStart() %} {% TrimEnd() %}
{% ToLower() %} {% ToUpper() %}
{% Replace(" ", "-") %} {% RegexReplace("\s*", "-") %}
{% if( CurrentDocument.Children.Where("ClassName = 'CMS.MenuItem'").Count > 0 ) {} %}
{% if( CurrentDocument.Children.ClassNames("CMS.MenuItem;oneIM.News").Count > 0 ) {} %}
{% CurrentDocument.Children.FirstItem ?? "No child pages" %} // Returns the left if not null, otherwise the right
{% CurrentDocument.GetValue("NewsTitle","Default Title") %} // Sets default value if field is null
{% LoremIpsum(1800) %}
{% UrlEncode(URL) %}
{% IsEven(DataItemIndex) %}

// SQL Escape
{% SQLEscape( QueryString.cat ) %}
{% QueryString["cat"]|(handlesqlinjection)true %}

// Date format
{% GetDateTime("EventDate", "yyyy-MM-dd:HH-mm-ss") %}
{% CurrentDateTime.Year#%}
{% CurrentDocument.DocumentModifiedWhen.Format("{0:MM/dd/yyyy}") %}    /* 09/12/2016 */
{% CurrentDocument.DocumentModifiedWhen.Format("{0:T}") %}             /* 1:42:31 PM */
{% FormatDateTime(EventDate, "MMMM d") %}
{% FormatDateTime(EventDate, GetResourceString("oneIM.Localdate.long"))#%}

/* Format Numbers */
{% String.Format("{0:n}", Int64.Parse(Field.ToString())) %}    // 100,000.00
{% String.Format("{0:n0}", Int64.Parse(Field.ToString())) %}   // 100,000
{% String.Format("{0:C}", TotalPriceIncludingOptions) %}

// GetImage( image, alt, maxsidesixe, width, height )
{% GetImage( MenuItemTeaserImage, DocumentName, 0, 600 ) %}
{% if( MenuItemTeaserImage ) { "<img alt src='~/getattachment/"+ MenuItemTeaserImage + "/"+ CurrentDocument.NodeAliasPath.Replace("/","-")+"?height=600'>" } %}

// GetLogo (Vendors)
<img class="wow flipInX" src="~/logos/GetLogo.ashx?name={% DocumentName.Replace(" ","-") #%}&size=120" alt="{% DocumentName %}" data-wow-delay="{% DataItemIndex*100 %}ms">

// NAVIGATION URL
{% GetNavigationUrl() %} {% GetDocumentUrl() %}

// If null and compare
{% ( DocumentMenuCaption ) ? DocumentMenuCaption : DocumentName %}
{% IsNullOrEmpty( DocumentMenuCaption ) ? DocumentName : DocumentMenuCaption %}
{% If( DocumentMenuCaption, DocumentMenuCaption, DocumentName ) %} 
{% if( DocumentMenuCaption == null || DocumentMenuCaption == "" ) {} %}
{% IfEmpty( DocumentMenuCaption, DocumentName, DocumentMenuCaption ) %}
{% IfCompare( DocumentName, CurrentDocument.DocumentName,"", "active" ) %} 

// Settings: bool, string
{% return settings.CustomSettings.MainNavCheckPrevileges.ToBool() %}
{% if( SiteContext.CurrentSite.DataContext.Settings.CustomSettings["LegalDisclosureLink"] ) {} %}

// ViewMode: Edit, Design, LiveSite, Preview
{% if( ViewMode=="Edit" || ViewMode=="Design" ) { return true; } else { return false; } %}

// Grouping in transformations + modulo function
{% if( DataItemIndex mod 3 == 0) { "<div class='row'" } %}
{% if( DataItemIndex mod 3 == 2 || DataItemIndex == DataItemCount-1 ) { "</div>" } %}

// Page Template
{% if( CurrentDocument.Parent.NodeTemplate.CodeName != "1IMVendorB4" ) { return true; } else { return false; } %}

// Subsite Navigation Root
{% Documents["/" + CurrentDocument.NodeAliasPath.Split("/")[1]].GetValue("SubSiteNavigationRoot","/%") %}

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

// foreach: Tags
{% if( Documents[NodeALiasPath].Tags.Count != 0 ) { "<i class='ml-3 badge fas fa-tags text-muted' title='Tags'> </i>" } %}
{% foreach (tag in Documents[NodeALiasPath].Tags) { 
    "<a class='badge-light bg-light-7' href='/special-pages/search?searchtext='>"+tag.DisplayName+"</a>" 
} %}

// foreach: Attachments
{% foreach (attachment in Documents[NodeALiasPath].AllAttachments.Where("AttachmentExtension = '.jpg' OR AttachmentExtension = '.png' ")) {
    "<a data-fancybox='gallery' href='/getattachment/" + attachment.AttachmentGUID + "/" + attachment.AttachmentName + "'>"+
        "<img src='/getattachment/" + attachment.AttachmentGUID + "/" + attachment.AttachmentName + "' alt='"+attachment.AttachmentName+"' >"+
    "</a>"
} %}

// foreach: Attachments from specific field
{% 
    FieldAttachments=IMMacros.GetFieldGUID("oneIM.Product","Gallery");
    Documents[NodeALiasPath].AllAttachments.Where("AttachmentGroupGUID='"+FieldAttachments+"'");
    
    foreach (attachment in Documents[NodeALiasPath].AllAttachments.Where("AttachmentGroupGUID='"+FieldAttachments+"'") ) {
    "<a data-fancybox='gallery' data-type='image' href='/getattachment/" + attachment.AttachmentGUID + "/" + attachment.AttachmentName + "'>"+
    "<img src='/getattachment/" + attachment.AttachmentGUID + "/" + attachment.AttachmentName + "' alt='"+attachment.AttachmentName+"' ></a>" } 
%}

// Apply Transformation 
{% Documents[NodeAliasPath].Children.WithAllData.ApplyTransformation("Containerb4.Accordion") %}

// Transform: Tags
{% if( CurrentDocument.DocumentTags ) {
    "<i class=\"ml-3 badge fas fa-tags text-muted\" title=\"Tags\"> </i>" + 
        CurrentDocument.Tags.Transform( "<a class='badge badge-light font-weight-normal initialism ' href='../?tagid={#TagId#}'>{#DisplayName#}</a>" )
} else {""} %}

/* Form Macros */
{% if( Country.Value=="Austria" ){ "28" } %}
{% if( Country.Value.Contains("Austria") ){ "28" } %}

/* ADVANCED */
// Check if web part is present on page
{% if( DocumentContext.CurrentDocument.DocumentWebParts.ToString().ToLower().Contains("bizform") ) { return true; } else { return false; } %}

// Check if web part contains content, hide if no content 
{% if ((et_sc != null && et_sc.Trim() != "") == False) { "Full-width" } else {} %}

// Do NOT show if DocumentName is equal to "Home"
{% DocumentName|(notequals)Home|(truevalue){?param?} %}

// Show if DocumentName is equal to "Home"
{% DocumentName|(equals)Home|(truevalue){?param?} %}

// Hide page(s) in the /Landing-Pages directory
{% CurrentDocument.NodeAliasPath|(Contains)Landing-Pages|(not) %}

// Sets the culture when formatting dates and numbers
{% DocumentPublishFrom|(culture)en-us %}