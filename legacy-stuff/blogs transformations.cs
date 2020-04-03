// BLOGS

<div class="col-md-6 blog push-bottom">
{% if (BlogPostTeaser.ToString() != "") { ResolveMacros("\n      <a href='" + GetDocumentUrl() + "'><img src=\"/getattachment/{% BlogPostTeaser %\}/Teaser.aspx\" alt=\"{% BlogPostTitle %\}\"></a>\n") } else { 
  myPath = "/" + NodeAliasPath.Split("/")[1];
  myPath += "/" + NodeAliasPath.Split("/")[2];
  myPath += "/" + NodeAliasPath.Split("/")[3];
  if (Documents[myPath].BlogTeaser.ToString() != "") { ResolveMacros("\n      <img src=\"/getattachment/{% Documents[myPath].BlogTeaser %\}/Teaser.aspx\" alt=\"{% BlogPostTitle %\}\">\n")   }
} #%}
    <section class="blog-title">{% StripTags(BlogPostTitle) %}</section>
    <section class="blog-summary">{% LimitLength(StripTags(BlogPostSummary), 300, "…", true)%} {% IfEmpty((BlogPostBody), "", "<a href='" + GetDocumentUrl() + "'> More <i class='fa fa-angle-double-right'></i></a>" )%}</section>
    <div class="row clearfix blog-info push-top push-bottom">
       <div class="col-xs-10"><i class="fa fa-calendar-check-o"></i> {% FormatDateTime(BlogPostDate, "dd MMMM yyyy") %}</div>
       <div class="col-xs-2 text-right"><a href="{% GetDocumentUrl() %}"><i class="fa fa-comments-o"></i> <span>{% GetBlogCommentsCount(DocumentID, NodeAliasPath) %}</span></a></div>
     </div>
</div




// BLOG DETAILS

<div class="col-md-12 blog">
{% if (BlogPostTeaser.ToString() != "") { ResolveMacros("\n<img src=\"/getattachment/{% BlogPostTeaser %\}/Teaser.aspx\" alt=\"{% BlogPostTitle %\}\">\n") } else { 
  myPath = "/" + NodeAliasPath.Split("/")[1];
  myPath += "/" + NodeAliasPath.Split("/")[2];
  myPath += "/" + NodeAliasPath.Split("/")[3];
  if (Documents[myPath].BlogTeaser.ToString() != "") { ResolveMacros("\n<img src=\"/getattachment/{% Documents[myPath].BlogTeaser %\}/Teaser.aspx\" alt=\"{% BlogPostTitle %\}\">\n")   }
} #%}
    <section class="blog-title">{% StripTags(BlogPostTitle) %}</section>
    <section class="blog-body">{% BlogPostBody %}</section>
    <div class="row clearfix blog-info push-top push-bottom">
       <div class="col-xs-5"><i class="fa fa-calendar-check-o"></i> {% FormatDateTime(BlogPostDate, "dd MMMM yyyy") %}
       </div>
       <div class="col-xs-5">
        <span class="a2a_kit a2a_kit_size_24 a2a_default_style">
          <a class="a2a_button_facebook"></a>
          <a class="a2a_button_twitter"></a>
          <a class="a2a_button_linkedin"></a>
          <a class="a2a_button_google_plus"></a>
        </span>
        <script>
        var a2a_config = a2a_config || {};
        a2a_config.num_services = 4;
        </script>
        <script async src="https://static.addtoany.com/menu/page.js"></script>
      </div>
      <div class="col-xs-2 text-right"><a href="{% GetDocumentUrl() %}"><i class="fa fa-comments-o"></i> <span>{% GetBlogCommentsCount(DocumentID, NodeAliasPath) %}</span></a></div>
    </div>
  </div>



  <div class="image-container animated flipInX pb-3 d-none d-lg-block" itemprop="image" itemscope itemtype="http://schema.org/ImageObject">
    {% IfEmpty(NewsTeaser,"<img src='~/1IM/oneingram-1.9.13/global/Logo_Blue_300x175.png' alt='"+ StripTags(BlogPostTitle) +"' class='img-fluid'/>","<img src='~/getattachment/" + BlogPostTeaser + "?width=975&height=438' alt='" + BlogPostTitle + "' srcset='~/getattachment/" + BlogPostTeaser + "' alt='" + BlogPostTitle + "?width=975&height=438, ~/getattachment/" + BlogPostTeaser + "' alt='" + BlogPostTitle + "?width=1950&height=876 2x' class='img-contain' itemprop='url' />") #%}
</div>
<h1 class="border-bottom-0 d-block display-6 heading mb-2" itemprop="headline">{% BlogPostTitle %}</h1>
<time class="small text-muted" itemprop="datePublished" datetime="{% FormatDateTime(BlogPostDate,"yyyy-MM-dd:HH-mm-ss") %}"><i class="far fa-calendar">&nbsp;</i>&ensp;{% FormatDateTime(BlogPostDate, GetResourceString("oneIM.Localdate.long")#%}</time> | {%CurrentDocument.Tags.Transform("<a class='badge badge-pill badge-light text-uppercase' href='/special-pages/search?searchtext={#DisplayName#}'>{#DisplayName#}</a>") #%}
<div class="text-justify py-3" itemprop="articleBody">{% BlogPostBody %}</div>
<p><a href="{% GetDocumentUrl() %}"><i class="fa fa-comments-o"></i> <span>{% GetBlogCommentsCount(DocumentID, NodeAliasPath) %}</span></a></p>
<meta itemprop="author" content="Ingram Micro">
<meta itemprop="inLanguage" content="{%CurrentCulture%}">
<meta itemprop="dateModified" content="{%FormatDateTime(DocumentModifiedWhen,"yyyy-MM-dd:HH-mm-ss")%}">



// COMMENTS

{% If(BlogPostAllowComments == True ) {return True} else {return False} #%}

// COMMENT VIEW WEB PART

// MessageBoard WEB PART

// BLogsComments Trasnformation:


<%@ Register Src="~/CMSModules/MessageBoards/Controls/MessageActions.ascx" TagName="MessageActions" TagPrefix="cms" %>
<%@ Register Src="~/CMSModules/AbuseReport/Controls/InlineAbuseReport.ascx" TagName="AbuseReport" TagPrefix="cms" %>
<div class="CommentDetail business-style">
  <div class="comment-header">
    <span class="comment-user-name"><%# IfEmpty(Eval("MessageURL"), TrimSitePrefix(Eval("MessageUserName", true)), "<a href=\"" + Eval("MessageURL", true) + "\" target=\"_blank\"" + IfCompare(HTMLHelper.UseNoFollowForUsersLinks(CMS.SiteProvider.SiteContext.CurrentSiteName), true, "", " rel=\"nofollow noopener\" ") + ">" + TrimSitePrefix(Eval("MessageUserName", true)) + "</a>")%>  </span>
     <span class="comment-details">posted on
      <strong><%# GetDateTime(Eval("MessageInserted")).ToString("d MMMM yyyy (HH:mm)") %></strong> :      
    </span>
  </div>
  <div class="comment-body">
    <%# TextHelper.EnsureLineEndings(Convert.ToString(Eval("MessageText", true)), "<br />")%>
  </div>
  <div class="comment-actions">
    <cms:MessageActions ID="messageActions" runat="server" />
    <div class="report">
      <cms:AbuseReport ID="ucInlineAbuseReport" runat="server" ReportObjectType="board.message" ReportObjectID='<%# Eval("MessageID") %>'  ReportTitle='<%# "Message board abuse report: " + Eval("MessageText") %>' CMSPanel-SecurityAccess="AuthenticatedUsers" />
    </div>    
  </div>
</div>


// LEFT menu oneIM.Container.BlogsMenu transformation

<div id="left-menu">
  <h3>Blog posts by month </h3>
  <ul id="menuElem">
  </ul>
</div>


<div class="BlogPDateWhole">
    Posted: <span class="BlogPDate">{% BlogPostDate %}</span> by 
<strong>{% BlogFunctions.GetUserFullName(DocumentCreatedByUserID) %}</strong> | with 
<a href="{% GetDocumentUrl() %}">{% BlogFunctions.GetBlogCommentsCount(DocumentID,NodeAliasPath) %} comments</a><br />{% IfEmpty(DocumentTags,"","Filed under: " + BlogFunctions.GetDocumentTags(DocumentTagGroupID, DocumentTags, "~/Blogs/My-blog-1.aspx")) %}
</div>

BLOG CLASSES

<li><a href="<%# GetDocumentUrl() %>"> <i class="fas fa-calendar"></i> <%# Eval("BlogMonthName", true) %> / 
<asp:Label ID="lblPostCount" runat="server" EnableViewState="false"></asp:Label> 
{% GetBlogCommentsCount(DocumentID, NodeAliasPath) %} posts</a></li>
<style>

  /* Blog Comments */
.BlogCommentsTitle {
  display: none;
}

.CommentDetail {
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: #f8f9fa;
}

.CommentUserName {
  text-transform: uppercase;
  font-weight: 600;
}

.CommentDate {
  font-size: .85em;
  color: #6c757d;
}

.buttonpedding {
  margin-top: 1.5rem!important;
  border-top: 1px solid #dee2e6
}

.CommentAction {
  display: inline-block;
    padding: .25em .4em;
    font-size: 75%;
    font-weight: 700;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: .25rem;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    color: #fff;
    background-color: #6c757d;
}

[id*=pnlComment] {
  position: relative;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0,0,0,.125);
    border-radius: .25rem;
    margin-top: 1.5rem;
    box-shadow: 0 .125rem .25rem rgba(0,0,0,.075)!important;
    -webkit-animation: 1s slideInUp;
    animation: 1s slideInUp;
}

.blog-leave-comment {
  padding: .75rem 1.25rem;
    margin-bottom: 0;
    background-color: rgba(0,0,0,.03);
    border-bottom: 1px solid rgba(0,0,0,.125);
  margin-bottom: -1px;
  border-radius: calc(.25rem - 1px) calc(.25rem - 1px) 0 0;
  width: 100%!important;
}

[id*=commentView] .form-horizontal {
  -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    padding: 1.25rem;
}

[id*=pnlComment] {
  position: relative;
    padding: .75rem 1.25rem;
    margin-bottom: 1rem;
    border: 1px solid transparent;
    border-radius: .25rem;
    color: #856404;
    background-color: #fff3cd;
    border-color: #ffeeba;
    -webkit-box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12), 0 1px 5px 0 rgba(0,0,0,.2);
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12), 0 1px 5px 0 rgba(0,0,0,.2);
}
</style>