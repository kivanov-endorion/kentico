<cms:CMSWebPartZone ZoneID="zoneHeader" runat="server"  />
<cms:CMSWebPartZone ZoneID="zoneSubHeader" runat="server"  />
<div class="container">
  <div class="row align-items-start" itemscope itemtype="http://schema.org/Event"> 
    <aside class="sidebar col-lg-3  align-self-stretch mb-4 mx-auto pt-4 pr-lg-4">
      <div id="filters-container">
        <cms:CMSWebPartZone ZoneID="zoneFilters" runat="server"  />
      </div>
      <div id="events-box">
        <cms:CMSWebPartZone ZoneID="zoneFiltersSub" runat="server"  />
      </div>
    </aside>
    <article class="article col-lg-9 mb-2 pt-4">
      <cms:CMSWebPartZone ZoneID="zoneArticles" runat="server"  />
      <cms:CMSWebPartZone ZoneID="zoneSub" runat="server"  />
    </article>
  </div>  
</div>

<cms:CMSWebPartZone ZoneID="zoneInvisible" runat="server"  />

