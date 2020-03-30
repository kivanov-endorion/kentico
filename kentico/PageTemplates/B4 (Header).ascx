<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<link rel="canonical" href="//{%domain + GetDocumentUrl()%}">
<!-- PWA -->
<meta name="theme-color" content="#2F75BB"/>
<!--<link rel="manifest" href="~/manifest.json">-->
<!-- Apple -->
<link rel="icon" type="image/png" sizes="32x32" href="https://{%domain%}/1IMv2/ext/icons/32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="https://{%domain%}/1IMv2/ext/icons/16x16.png">
<link rel="icon" type="image/png" sizes="192x192" href="https://{%domain%}/1IMv2/ext/icons/192x192.png">
<link rel="mask-icon" href="https://{%domain%}/1IMv2/ext/icons/safari-pinned-tab.svg" color="#5bbad5">
<link rel="apple-touch-icon" href="https://{%domain%}/1IMv2/ext/icons/144x144.png">
<!-- Google -->
<meta property="og:title" content="{% (DocumentPageTitle) ? DocumentPageTitle : DocumentName %}">
<meta property="og:type" content="website">
<meta property="og:url" content="https://{%domain + GetDocumentUrl() %}">
<meta property="og:image" content="{% Format("https://{0}/getattachment/{1}/share.jpg", domain, if( MenuItemTeaserImage ) {MenuItemTeaserImage} else {if( NewsTeaser ) {NewsTeaser} else {if( EventTeaserImage ) {EventTeaserImage} else {if( BlogPostTeaser ) {BlogPostTeaser} else {if( TeaserImage ) {TeaserImage} else {CurrentDocument.AllAttachments.FirstItem.AttachmentGUID}}}}}) #%}">
<meta property="og:image:width" content="{% if( MenuItemTeaserImage ) {CurrentDocument.AllAttachments.Filter(AttachmentGUID == CurrentDocument.MenuItemTeaserImage).FirstItem.AttachmentImageWidth} else {if( NewsTeaser ) {CurrentDocument.AllAttachments.Filter(AttachmentGUID == CurrentDocument.NewsTeaser).FirstItem.AttachmentImageWidth} else {if( EventTeaserImage ) {CurrentDocument.AllAttachments.Filter(AttachmentGUID == CurrentDocument.EventTeaserImage).FirstItem.AttachmentImageWidth} else {if( BlogPostTeaser ) {CurrentDocument.AllAttachments.Filter(AttachmentGUID == CurrentDocument.BlogPostTeaser).FirstItem.AttachmentImageWidth} else {if( TeaserImage ) {CurrentDocument.AllAttachments.Filter(AttachmentGUID == CurrentDocument.TeaserImage).FirstItem.AttachmentImageWidth} else {CurrentDocument.AllAttachments.FirstItem.AttachmentImageWidth}}}}} #%}">
<meta property="og:image:height" content="{% if( MenuItemTeaserImage ) {CurrentDocument.AllAttachments.Filter(AttachmentGUID == CurrentDocument.MenuItemTeaserImage).FirstItem.AttachmentImageHeight} else {if( NewsTeaser ) {CurrentDocument.AllAttachments.Filter(AttachmentGUID == CurrentDocument.NewsTeaser).FirstItem.AttachmentImageHeight} else {if( EventTeaserImage ) {CurrentDocument.AllAttachments.Filter(AttachmentGUID == CurrentDocument.EventTeaserImage).FirstItem.AttachmentImageHeight} else {if( BlogPostTeaser ) {CurrentDocument.AllAttachments.Filter(AttachmentGUID == CurrentDocument.BlogPostTeaser).FirstItem.AttachmentImageHeight} else {if( TeaserImage ) {CurrentDocument.AllAttachments.Filter(AttachmentGUID == CurrentDocument.TeaserImage).FirstItem.AttachmentImageHeight} else {CurrentDocument.AllAttachments.FirstItem.AttachmentImageHeight}}}}} #%}">
<meta property="og:site_name" content="{%SiteContext.CurrentSite.DataContext.Settings.CMSPageTitlePrefix#%}">
<meta property="fb:app_id" content="250266005122099">
<meta property="og:description" content="{% (DocumentPageDescription) ? StripTags(LimitLength(DocumentPageDescription,160,"…",true)) : StripTags(LimitLength(MenuItemTeaserText,160,"…",true)) %}{% (NewsSummary) ? "" : StripTags(LimitLength(NewsSummary,160,"…",true)) %}{% (EventTeaserText) ? "" : StripTags(LimitLength(EventTeaserText,,160,"…",true)) %}">
<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="{%SiteContext.CurrentSite.DataContext.Settings.CMSPageTitlePrefix#%}">
<meta name="twitter:domain" content="{%domain%}">
<meta name="twitter:title" content="{%(DocumentPageTitle) ? DocumentPageTitle : DocumentName%}">
<meta name="twitter:description" content="{% (DocumentPageDescription) ? StripTags(LimitLength(DocumentPageDescription,160,"…",true)) : StripTags(LimitLength(MenuItemTeaserText,160,"…",true)) %}{% (NewsSummary) ? "" : StripTags(LimitLength(NewsSummary,160,"…",true)) %}{% (EventTeaserText) ? "" : StripTags(LimitLength(EventTeaserText,,160,"…",true)) %}">
<meta name="twitter:image" content="{% Format("https://{0}/getattachment/{1}/share.jpg", domain, if( MenuItemTeaserImage ) {MenuItemTeaserImage} else {if( NewsTeaser ) {NewsTeaser} else {if( EventTeaserImage ) {EventTeaserImage} else {if( BlogPostTeaser ) {BlogPostTeaser} else {if( TeaserImage ) {TeaserImage} else {CurrentDocument.AllAttachments.FirstItem.AttachmentGUID}}}}}) #%}">
<meta name="seobility" content="{% settings.CustomSettings.seobilityID #%}">