{% if (DataItemIndex == 0) { %}
<div class="card accordion" id="event-accordion">
    <div class="card-body">
        <div class="list-group list-group-flush">
{% } %}
            <div class="list-group-item">
                <a class="d-flex align-items-center text-reset text-decoration-none collapsed" data-toggle="collapse" href="#acc-{% DataItemIndex %}" role="button" aria-expanded="false" aria-controls="acc-{% DataItemIndex %}" data-scroll-ignore>
                    <div class="mr-auto">
                        <p class="font-weight-600 mb-0">
                            {% EventTitle %}
                        </p>
                        {% IfCompare(
                            FormatDateTime(EventDateStart, "d MMMM"), 
                            FormatDateTime(EventDateEnd, "d MMMM"), 
                            "<time class='small text-muted'>" + 
                                IfCompare(
                                    FormatDateTime(EventDateStart, "MMMM"), FormatDateTime(EventDateEnd, "MMMM"),
                                    FormatDateTime(EventDateStart, "MMM d") + " &ndash; "+ 
                                    FormatDateTime(EventDateEnd, "MMM d, yyyy") +"</time>",
                                    FormatDateTime(EventDateStart, "MMM d") + "&thinsp;&ndash;&thinsp;"+ 
                                    FormatDateTime(EventDateEnd, "d, yyyy") + "</time>"
                                ), 
                            "<time class='small text-muted'>" + 
                                FormatDateTime(EventDateStart, GetResourceString("oneIM.Localdate.long")) +
                                            "</time>"
                        ) %}
                    </div>
                    <span class="collapse-chevron text-muted ml-4">
                        <i class="fa fa-chevron-down"></i>
                    </span>
                </a>
                <div class="collapse" id="acc-{% DataItemIndex %}" data-parent="#event-accordion">
                    <div class="py-4 row">
                        <div class="col-md-3 {% IsNullOrEmpty(EventTeaserImage) ? "d-none" : "" %}">
                          {% IsNullOrEmpty(EventTeaserImage) ? "' />" : Format("<img src='{0}?width=446' alt='{1}' class='img-fluid'/>", GetAttachmentUrlByGUID( EventTeaserImage, NodeAlias ), EventTitle ) %}
                        </div>
                        <div class="{% IsNullOrEmpty(EventTeaserImage) ? "col-12" : "col-md-9" %}">
                            {% EventDescription %}
                            {% IsNullOrEmpty(EventRegistrationLink) ? "" : Format("<a class='btn btn-sm btn-primary float-right mt-4' href='{0}' target='_blank' aria-label='{1}: {2}'>{1}</a>", EventRegistrationLink, GetResourceString("1IM_RegisterHere"), EventTitle) %}
                        </div>
                    </div>
                </div>
            </div>
{% if (DataItemIndex == DataItemCount - 1) { %} 
        </div>
    </div>
</div>
{% } %}