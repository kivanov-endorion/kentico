<cms:CMSWebPartZone ZoneID="zoneHeader" runat="server"  />
<cms:CMSWebPartZone ZoneID="zoneSubHeader" runat="server"  />
<div class="container">
  <div class="row align-items-start"> 
    <aside class="sidebar col-lg-3  align-self-stretch mb-4 mx-auto pt-4 pr-lg-4">
      <div id="filters-container">
        <cms:CMSWebPartZone ZoneID="zoneFilters" runat="server"  />
        <cms:CMSWebPartZone ZoneID="zoneFiltersSub" runat="server"  />
      </div>
    </aside>
    <article class="article col-lg-9 mb-2 pt-4" itemprop="mainEntityOfPage" itemscope itemtype="http://schema.org/Article">
      <cms:CMSWebPartZone ZoneID="zoneArticles" runat="server"  />
      <cms:CMSWebPartZone ZoneID="zoneSub" runat="server"  />
    </article>
  </div>
</div>
<cms:CMSWebPartZone ZoneID="zoneInvisible" runat="server"  />
