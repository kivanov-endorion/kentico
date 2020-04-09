{% (DataItemIndex == 0)  ? "<div class='tab-content' id='maps-tabContent'>" : "" %} 
  <div aria-labelledby="maps-{% DataItemIndex + 1 %}-tab" class="tab-pane fade show text-left {% (DataItemIndex == 0)  ? "active" : "" %}" id="maps-{% DataItemIndex + 1 %}" role="tabpanel">
      <div class="embed-reponsive">
          <iframe allowfullscreen="" class="embed-reponsive-item lazyload" data-src="{% LocationIframeURL %}" rameborder="0" height="400" style="border:0" width="100%" title="{% LocationName %}"></iframe>
      </div>
  </div>
{% (DataItemIndex == DataItemCount - 1)  ? "</div>" : "" %}