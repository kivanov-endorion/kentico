{% if(DataItemIndex == 0) {"<div class='row form-row pb-3'>"} %}
    <div class="col-md-6">
        <div class="card mb-3 p-3 lift">
            <a class="card-link stretched-link pb-0 download small" href="/pages/GetAttachment.ashx?guid={% FileAttachment %}" id="{% FileName.Replace(" ", "-") %}" rel="noopener" target="_blank">{% FileName %}</a>
        </div>
    </div>
{% if(DataItemIndex == DataItemCount -1) {"</div>"} %}