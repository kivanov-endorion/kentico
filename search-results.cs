// ASCX Transformation: CMS.Root.SmartSearchResults

<section class="row mb-5">
    <aside class="col-1 d-none d-md-block animated zoomInRight"><svg class="donut" height="50px" viewbox="0 0 42 42" width="50px">
            <circle class="donut-hole" cx="21" cy="21" fill="#fff" r="15.91549430918954"></circle>
            <circle class="donut-ring" cx="21" cy="21" fill="transparent" r="15.91549430918954" stroke="#d2d3d4"
                stroke-width="3"></circle>
            <circle class="donut-segment" cx="21" cy="21" fill="transparent" r="15.91549430918954" stroke="rgba(23,162,185,0.5)"
                stroke-dasharray="<%# Convert.ToInt32(ValidationHelper.GetDouble(Eval("Score"),0.0)*100)%> <%# Convert.ToInt32(100-(ValidationHelper.GetDouble(Eval("Score"),0.0)*100))%>" stroke-dashoffset="25" stroke-width="3"></circle>
            <g class="chart-text"> <text class="chart-number" x="50%" y="55%">
                    <%# Convert.ToInt32(ValidationHelper.GetDouble(Eval("Score"),0.0)*100)%>% </text> </g>
        </svg></aside>

    <article class="col-11 small">
        <h5 class="my-0 border-bottom"><a class="card-link" href="<%# SearchResultUrl(true) %>"><%#SearchHighlight(HTMLEncode(CMS.ExtendedControls.ControlsHelper.RemoveDynamicControls(DataHelper.GetNotEmpty(Eval("Title"), "/"))), "<mark class=\"font-weight-bold\">", "</mark>")%></a></h5>

        <p class="text-info my-1 text-truncate"><%# SearchHighlight(SearchResultUrl(true),"<strong>","</strong>")%></p>

        <p class="mb-1 text-justify max-lines-3"><%#SearchHighlight(HTMLEncode(TextHelper.LimitLength(HttpUtility.HtmlDecode(StripTags(CMS.ExtendedControls.ControlsHelper.RemoveDynamicControls(GetSearchedContent(DataHelper.GetNotEmpty(Eval("Content"), ""))))), 280, "&hellip;")), "<mark class=\"font-weight-bold\">", "</mark>")%></p>
        <time class="text-muted" datetime="<%# GetDateTimeString(ValidationHelper.GetDateTime(Eval("Created"), DateTimeHelper.ZERO_TIME).ToString("yyyy-MM-ddTHH:mm:ssZ"), true) %>" style="font-variant: all-small-caps;"><%# GetDateTimeString(ValidationHelper.GetDateTime(Eval("Created"), DateTimeHelper.ZERO_TIME), true) %></time>
    </article>
</section>