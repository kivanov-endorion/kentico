{% if (DataItemIndex == 0) {  %}
<div class="pt-2 {% (DataItemCount < 15) ? "w-50" : "w-100" %} mx-auto wow flipInX">
  <ul class="nav nav-pills pb-3 nav-fill justify-content-around flex-row align-items-start" id="maps-tab" role="tablist">  
{% } %}
    <li class="nav-item {% (DataItemIndex == 0)  ? "active" : "" %}">
        <a aria-controls="maps-{% DataItemIndex+1%}" aria-selected="{% (DataItemIndex == 0)  ? "true" : "false" %}" class="nav-link {% (DataItemIndex == 0)  ? "active" : "" %}"
            data-toggle="pill" href="#maps-{% DataItemIndex + 1 %}" id="maps-{% DataItemIndex+1%}-tab" role="tab" data-scroll-ignore="">
            {% IfEmpty(LocationImage, "<i aria-hidden='true' class='fa fa-map-marker-alt text-danger'></i>", 
            "<img alt='' src='~/CMSPages/GetFile.ashx?guid=" + LocationImage + "' style='width: 30px;height: 30px;' />" ) %}
            {% LocationName %}
        </a>
    </li>
{% (DataItemIndex == DataItemCount - 1)  ? "</ul></div>" : "" %}