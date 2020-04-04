{% (DataItemIndex == 0)  ? "<ul class='nav nav-pills mb-5 nav-justified flex-md-row align-items-start' id='pills-tab' role='tablist'>" : "" %} 
    <li class="nav-item text-truncate {% (DataItemIndex == 0)  ? "active" : "" %}">
        <a aria-controls="{% NodeAlias %}" aria-selected="{% (DataItemIndex == 0)  ? "true" : "false" %}" class="nav-link {% (DataItemIndex == 0) ? "active show" : "" %}"
            data-scroll-ignore="" data-toggle="pill" href="#{% NodeAlias %}" id="pills-{% DataItemIndex + 1 %}-tab" role="tab">
            <i class="{% ArticleIcon %} display-6 d-block mx-auto pb-1"></i> 
            <small class="d-none d-lg-inline">{% ArticleName %}</small>
        </a>
    </li>
{% (DataItemIndex == DataItemCount - 1)  ? "</ul>" : "" %}