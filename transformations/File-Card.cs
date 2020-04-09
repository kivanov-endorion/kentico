<div class="row align-items-center mb-4">
    <div class="col-lg-4">
        <div class="card lift">
            <div class="overflow-hidden" style="height: 63px;">
                <a href="/pages/GetAttachment.ashx?guid={% FileAttachment %}" target="_blank" rel="noopener">
                    <img data-src="/1IM/oneingram-1.9.13/global/default_975.jpg?width=368" alt="{% StripTags(LimitLength(FileName, 60, "&hellip;", true)) %}" class="card-img-top lazyload">
                </a>
            </div>
            <div class="card-body pb-0">
                <h6 class="card-title">
                    <a class="card-link" href="/pages/GetAttachment.ashx?guid={% FileAttachment %}" target="_blank" rel="noopener">{% StripTags(LimitLength(FileName, 60, "&hellip;", true)) %}</a>
                </h6>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                    <a class="card-link pb-0 download small mr-4" download="" href="/pages/GetAttachment.ashx?guid={% FileAttachment %}">{% StripTags(LimitLength(FileName, 60, "&hellip;", true)) %}</a>
                </li>
            </ul>
        </div>
    </div>
    <div class="{% IsNullOrEmpty(FileDescription) ? "col-lg-7" : "col-lg-8" %}">
        {% IsNullOrEmpty(FileDescription) ? "<h6>" + StripTags(FileName).RegexReplace("[_-]", " ") + "</h6>" : FileDescription %}
    </div>
</div>

// used in 1IM.Apple-DPP