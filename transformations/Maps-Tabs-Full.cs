{% (DataItemIndex == 0)  ? "<div class='tab-content' id='maps-tabContent'>" : "" %} 
  <div aria-labelledby="maps-{% NodeOrder %}-tab" class="tab-pane fade show text-left {% (NodeOrder == 1)  ? "active" : "" %}" id="maps-{% NodeOrder %}" role="tabpanel">
      <div class="embed-reponsive">
          <iframe allowfullscreen="" class="embed-reponsive-item lazyload" data-src="{% LocationIframeURL %}" rameborder="0" height="400" style="border:0" width="100%" title="{% LocationName %}"></iframe>
      </div>
  </div>
{% (DataItemIndex == DataItemCount - 1)  ? "</div>" : "" %}
{% if (DataItemIndex == DataItemCount - 1) { %}
<div class="pt-2 {% (DataItemCount < 15) ? "w-50" : "w-100" %} mx-auto wow flipInX">
    <ul class="nav nav-pills pb-3 nav-fill justify-content-around flex-row align-items-start" id="maps-tab" role="tablist">  
        {% foreach (a in Documents["/content-items/locations"].Children.Where("ClassName = 'oneIM.CorporateLocation'")) {
        "<li class='nav-item " + (if(a.NodeOrder=="1"){"active"}) + "'>"+
            "<a aria-controls='maps-" + a.NodeOrder + "' aria-selected='" + (if(a.NodeOrder=="1"){"true"}else{"false"}) + "' class='nav-link " + (if(a.NodeOrder=="1"){"active"}) + "'"+
                "data-toggle='pill' href='#maps-" + a.NodeOrder + "' id='maps-" + a.NodeOrder + "-tab' role='tab' data-scroll-ignore>"+
                "<i aria-hidden='true' class='fa fa-map-marker-alt text-danger'></i>"+
                a.DocumentName +
            "</a>"+
        "</li>"
        } %}
    </ul>
</div>    
{% } %}