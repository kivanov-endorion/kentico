<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<meta name="description" content="{% (DocumentPageDescription) ? StripTags(DocumentPageDescription) : StripTags(MenuItemTeaserText) %}{% (NewsSummary) ? "" : StripTags(NewsSummary) %}{% (EventTeaserText) ? "" : StripTags(EventTeaserText) %}">
<link rel="canonical" href="//{%domain  + GetDocumentUrl()%}">
<!-- PWA -->
<meta name="theme-color" content="#2F75BB"/> 
<link rel="manifest" href="~/manifest.json">
<!-- Apple -->
<link rel="icon" type="image/png" sizes="32x32" href="https://{%domain%}/1IMv2/ext/icons/32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="https://{%domain%}/1IMv2/ext/icons/16x16.png">
<link rel="icon" type="image/png" sizes="192x192" href="https://{%domain%}/1IMv2/ext/icons/192x192.png">
<link rel="mask-icon" href="https://{%domain%}/1IMv2/ext/icons/safari-pinned-tab.svg" color="#5bbad5">
<link rel="apple-touch-icon" href="https://{%domain%}/1IMv2/ext/icons/144x144.png">
<!-- Google -->
<meta property="og:title" content="{% (DocumentPageTitle) ? DocumentPageTitle : DocumentName %}">
<meta property="og:type" content="website">
<meta property="og:url" content="https://{%domain + CurrentDocument.NodeAliasPath#%}">
<meta property="og:image" content="{% (MenuItemImage) ? "https://"+domain+"/getattachment"+NodeAliasPath+"/share.jpg?width=1200&height=627" : "https://"+domain+"/getattachment"+NodeAliasPath+"/"+CurrentDocument.AllAttachments.FirstItem.AttachmentName #%}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="627">
<meta property="og:site_name" content="{%Settings.CMSPageTitlePrefix#%}">
<meta property="fb:app_id" content="250266005122099">
<meta property="og:description" content="{% (DocumentPageDescription) ? StripTags(DocumentPageDescription) : StripTags(MenuItemTeaserText) %}{% (NewsSummary) ? "" : StripTags(NewsSummary) %}{% (EventTeaserText) ? "" : StripTags(EventTeaserText) %}">
<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="{%Settings.CMSPageTitlePrefix#%}">
<meta name="twitter:domain" content="{%domain%}">
<meta name="twitter:title" content="{%(DocumentPageTitle) ? DocumentPageTitle : DocumentName%}">
<meta name="twitter:description" content="{% (DocumentPageDescription) ? StripTags(DocumentPageDescription) : StripTags(MenuItemTeaserText) %}{% (NewsSummary) ? "" : StripTags(NewsSummary) %}{% (EventTeaserText) ? "" : StripTags(EventTeaserText) %}">
<meta name="twitter:image" content="{% (MenuItemImage) ? "https://"+domain+"/getattachment"+NodeAliasPath+"/share.jpg?width=1200&height=627" : "https://"+domain+"/getattachment"+NodeAliasPath+"/"+CurrentDocument.AllAttachments.FirstItem.AttachmentName #%}">
<meta itemprop="image" content="{% (MenuItemImage) ? "https://"+domain+"/getattachment"+NodeAliasPath+"/share.jpg?width=1200&height=627" : "https://"+domain+"/getattachment"+NodeAliasPath+"/"+CurrentDocument.AllAttachments.FirstItem.AttachmentName #%}">