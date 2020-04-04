{% if( DataItemIndex == 0 ) { "<div class='row'>" } %}
<div class="col-xl-6 mb-5">
  <div class="card hoverable h-100">    
    <div class="card-body">     
      <div class="d-flex flex-center flex-column justify-content-between">
        <i class="animated {% ArticleIcon %} grad-primary icon mt-n5 rotateIn rounded-circle shadow-sm text-light">&#8202;</i>
        <h6 class="caps card-title text-primary">{% DocumentName %}</h6>
        {% ArticleTeaserText %}
        {% ArticleText %}
      </div>
    </div>
  </div>
</div>
{% if( DataItemIndex == DataItemCount - 1) { "</div>" } %}