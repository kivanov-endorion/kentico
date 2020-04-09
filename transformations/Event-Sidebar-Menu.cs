<a href="{% DocumentContext.CurrentDocumentParent.NodeAliasPath %}" class="month-name Highlighted small mb-5">{$ 1IM.AllEvents $}</a>

{% if (EventDateStart != "") { %}
<h3 class="display-6 display-7 border-bottom py-3">Event details</h3>
<time datetime="{% FormatDateTime(EventDateStart,"yyyy-MM-dd:HH-mm-ss") %}">
  
{% if(FormatDateTime(EventDateStart, "d MMMM") != FormatDateTime(EventDateEnd, "d MMMM")){ %}

  Begin: {% FormatDateTime(EventDateStart, GetResourceString("oneIM.Localdate.short")) %}  {% IfCompare(FormatDateTime(EventDateStart, "HH:mm"),"00:00", " &ndash; " + FormatDateTime(EventDateStart, GetResourceString("oneIM.Localtime")), "") %}<br/>
  End: {% FormatDateTime(EventDateEnd, GetResourceString("oneIM.Localdate.short")) %}  {% IfCompare(FormatDateTime(EventDateEnd, "HH:mm"),"00:00", " &ndash; " + FormatDateTime(EventDateEnd, GetResourceString("oneIM.Localtime")), "") %}

{% }else{ %}

  {% FormatDateTime(EventDateStart, GetResourceString("oneIM.Localdate.long")) %}
  {% FormatDateTime(EventDateStart, GetResourceString("oneIM.Localtime")) + " - " + FormatDateTime(EventDateEnd, GetResourceString("oneIM.Localtime")) %}

{% } %}
</time>



{% IsNullOrEmpty(EventLocation) ? "" : "<details class='my-3' itemprop='Location' itemscope itemtype='http://schema.org/Place' open><summary><address itemprop='address'>" + EventLocation + "</address></summary>" %}
{% IsNullOrEmpty(EventLocationEmbed) ? "" : "<p itemprop='hasMap'>" + EventLocationEmbed + "</p>" %}
{% IsNullOrEmpty(EventLocation) ? "" : "</details>" %}
{% IsNullOrEmpty(EventAttendeeCapacity) ? "" : "<p itemprop='maximumAttendeeCapacity'>" + EventAttendeeCapacity + "</p>" %}
{% IsNullOrEmpty(EventPrice) ? "" : "<p itemprop='offers' itemscope itemtype='http://schema.org/AggregateOffer'>" + EventPrice + "</p>" %}
{% IsNullOrEmpty(EventRegistrationLink) ? "" : "<p class='py-3'><a class='btn btn-primary btn-sm btn-block' target='_blank' rel='noopener' href='" + EventRegistrationLink + "'>{$ 1IM_RegisterHere $}</a></p>" %}

<meta itemprop="startDate" content="{% FormatDateTime(EventDateStart,"yyyy-MM-dd:HH-mm-ss") %}">
<meta itemprop="endDate" content="{% FormatDateTime(EventDateEnd,"yyyy-MM-dd:HH-mm-ss") %}">
<meta itemprop="inLanguage" content="{% CurrentCulture %}">
{% } %}