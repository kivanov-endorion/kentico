{% if (EventDateStart != "") { %}
<h3 class="display-6 display-7 pt-3">Event details</h3>
<p><time datetime="{% FormatDateTime(EventDateStart,"yyyy-MM-dd:HH-mm-ss") %}">
  <i class="fas fa-calendar-alt text-muted" style='margin-left:-2em;' title='Date'>&nbsp;</i><span style="padding-left: 0.9em;">

{% if(FormatDateTime(EventDateStart, "d MMMM") != FormatDateTime(EventDateEnd, "d MMMM")){ %}

  Begin: {% FormatDateTime(EventDateStart, GetResourceString("oneIM.Localdate.long")) %} - {% GetDateTime(EventDateStart, GetResourceString("oneIM.Localtime")) %}<br/>
  End: {% FormatDateTime(EventDateEnd, GetResourceString("oneIM.Localdate.long")) %} - {% FormatDateTime(EventDateEnd, GetResourceString("oneIM.Localtime")) %}

{% }else{ %}

  {% FormatDateTime(EventDateStart, GetResourceString("oneIM.Localdate.long")) %}
  {% FormatDateTime(EventDateStart, GetResourceString("oneIM.Localtime"))+ " - "+FormatDateTime(EventDateEnd, GetResourceString("oneIM.Localtime"))%}

{% } #%}
  </span>
</time></p>

{% IfEmpty(EventLocation,"","<details class='mb-3' itemprop='Location' itemscope itemtype='http://schema.org/Place'><summary><i class='fas fa-map-marker-alt text-muted' title='Location' style='margin-left:-1.7em;'>&nbsp;</i><span class='pl-3' itemprop='address'>" + EventLocation + "</span></summary>") #%}
{% IfEmpty(EventLocationEmbed,"","<p itemprop='hasMap'>" + EventLocationEmbed + "</p>") %}
{% IfEmpty(EventLocation,"","</details>") %}
{% IfEmpty(EventAttendeeCapacity,"","<p><i class='fas fa-users text-muted' title='Capacity' style='margin-left:-2em;'>&nbsp;</i><span class='pl-2' itemprop='maximumAttendeeCapacity'>" + EventAttendeeCapacity + "</span></p>") %}
{% IfEmpty(EventPrice,"","<p itemprop='offers' itemscope itemtype='http://schema.org/AggregateOffer'><i class='fas fa-dollar-sign text-muted' title='Price' style='margin-left:-1.3em;'>&nbsp;</i><span class='pl-2'>" + EventPrice + "</span></p>") #%}
{% IfEmpty(EventRegistrationLink, "","<p class='py-3'><a class='btn btn-primary btn-sm btn-block' target='_blank' href='" + EventRegistrationLink + "'>{$ 1IM_RegisterHere $}</a></p>")#%}

<meta itemprop="startDate" content="{% FormatDateTime(EventDateStart,"yyyy-MM-dd:HH-mm-ss") %}">
<meta itemprop="endDate" content="{% FormatDateTime(EventDateEnd,"yyyy-MM-dd:HH-mm-ss") %}">
<meta itemprop="inLanguage" content="{%CurrentCulture%}">
{% } #%}

<a href="{% DocumentContext.CurrentDocumentParent.NodeAliasPath #%}"><div class="month-name" data-month="" data-year="">{$1IM.Events$}</div></a>