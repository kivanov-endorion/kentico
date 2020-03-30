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
    <header role="banner" itemscope="itemscope" itemtype="https://schema.org/WPHeader" style="z-index: 30">
        <nav id="primary-nav" class="navbar navbar-expand-xl navbar-dark bg-primary fixed-top" itemscope="itemscope"
            itemtype="https://schema.org/SiteNavigationElement">
            <div class="navbar-toggler cta" id="showRightPush" role="button" aria-label="Menu">
                <div class="toggle-btn">&nbsp;</div>
            </div>
            <div class="container">
              <a class="navbar-brand text-hide" href="/" aria-label="Ingram Micro Logo">
                  <cms:CMSWebPartZone ZoneID="zoneLogo" runat="server" />
              </a>
              <div class="slide-menu d-flex flex-xl-row flex-column justify-content-start align-items-stretch" id="navbarNavDropdown">
                  <cms:CMSWebPartZone ZoneID="zoneMainMenu" runat="server" />
                  <cms:CMSWebPartZone ZoneID="zoneWidgetMainMenu" runat="server" />
              </div>
              <div id="nav-menu-icons" class="d-xl-flex d-none justify-content-around align-items-center">
                <cms:CMSWebPartZone ZoneID="zoneSearch" runat="server" />
                <cms:CMSWebPartZone ZoneID="zoneLogin" runat="server" />
                <cms:CMSWebPartZone ZoneID="zoneLanguage" runat="server" />
              </div>
                <cms:CMSWebPartZone ZoneID="zoneUserMenu" runat="server" />
            </div>
        </nav>
    </header>
    <main class="d-flex flex-column slide-menu-push" id="main" role="main" itemprop="mainContentOfPage" itemtype="https://schema.org/WebPage">
        <cms:CMSWebPartZone ZoneID="zoneContent" runat="server" />
    </main>
    <footer role="contentinfo" itemscope="itemscope" itemtype="http://schema.org/WPFooter" style="z-index: 20">
        <cms:CMSWebPartZone ZoneID="zoneFooter" runat="server" />
    </footer>
</div>

<cms:CMSWebPartZone ZoneID="zoneEOD" runat="server" />