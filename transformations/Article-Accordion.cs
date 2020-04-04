{% if( DataItemIndex == 0 ) { %}
<div class="card accordion" id="accordion{% DataItemCount %}">
  <div class="card-body">
    <div class="list-group list-group-flush">
{% } %}
      <div class="list-group-item">
        <a class="d-flex align-items-center text-reset text-decoration-none collapsed" data-toggle="collapse" href="#acc{% ArticleID %}" role="button" aria-expanded="false" aria-controls="acc{% ArticleID %}" data-scroll-ignore>
          <div class="mr-auto">
            <p class="font-weight-600 mb-0">
              {% ArticleTitle %}
            </p>
            {%IsNullOrEmpty(ArticleSubtitle) ? "" : "<p class='small text-muted mb-0'>" + ArticleSubtitle + "</p>" %}
          </div>
          <span class="collapse-chevron text-muted ml-4">
            <i class="fa fa-chevron-down"></i>
          </span>
        </a> 
        <div class="collapse" id="acc{% ArticleID %}" data-parent="#accordion{% DataItemCount %}">
          <div class="py-4">
              {% ArticleText %}
            </div>
        </div>
      </div>
{% if( DataItemIndex == DataItemCount - 1) { %}
    </div>
  </div>
</div>
{% } %}