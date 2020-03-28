<script runat="server">
protected void Page_Load(object sender, EventArgs e)
{
    if (CurrentDocument != null)
    {          
        CMS.UIControls.ContentPage page= this.Page as CMS.UIControls.ContentPage;
        if (page != null)
        {
            string lang= CMS.Localization.LocalizationContext.CurrentCulture.CultureCode;
            page.XmlNamespace += " lang=\"" + lang + "\"";
        }
    }
}
</script>
<cms:CMSWebPartZone ZoneID="zoneTop" runat="server" />
<cms:CMSWebPartZone ZoneID="zoneConditionalAssets" runat="server" />
<div class="wrapper">
    <header role="banner" itemscope="itemscope" itemtype="https://schema.org/WPHeader">
        <nav id="primary-nav" class="navbar navbar-expand-xl navbar-dark bg-primary fixed-top" itemscope="itemscope"
            itemtype="https://schema.org/SiteNavigationElement">
            <button class="navbar-toggler cta" type="button" id="showRightPush" role="button" aria-label="Menu">
                <div class="toggle-btn">&nbsp;</div>
            </button>
            <div class="container">
              <a class="navbar-brand" href="/" aria-label="Ingram Micro Logo">
                  <cms:CMSWebPartZone ZoneID="zoneLogo" runat="server" />
              </a>
              <div class="slide-menu d-flex flex-xl-row flex-column justify-content-start align-items-stretch" id="navbarNavDropdown">
                  <cms:CMSWebPartZone ZoneID="zoneMainMenu" runat="server" />
              </div>
              <div id="nav-menu-icons" class="d-xl-flex d-none justify-content-around align-items-center">
                <cms:CMSWebPartZone ZoneID="zoneSearch" runat="server" />
                <cms:CMSWebPartZone ZoneID="zoneLogin" runat="server" />
                <cms:CMSWebPartZone ZoneID="zoneLanguage" runat="server" />
              </div>
              <div class="navbar-nav usermenulink"><a class="nav-link" role="button" href="#" data-scroll-ignore aria-label="User menu"><i class="fas fa-user" data-fa-transform="grow-1">&nbsp;</i></a></div>
              <div class="user-slide-menu d-flex d-xl-none flex-column justify-content-start align-items-stretch" id="user-slide-menu">
                <cms:CMSWebPartZone ZoneID="zoneUserMenu" runat="server" />
              </div>
            </div>
        </nav>
    </header>
    <main class="d-flex flex-column slide-menu-push" role="main" itemprop="mainContentOfPage" itemtype="https://schema.org/WebPage">
        <cms:CMSWebPartZone ZoneID="zoneContent" runat="server" />
    </main>
    <footer role="contentinfo" itemscope="itemscope" itemtype="http://schema.org/WPFooter">
        <cms:CMSWebPartZone ZoneID="zoneFooter" runat="server" />
    </footer>
</div>