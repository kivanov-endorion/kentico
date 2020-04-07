{% if(DataItemIndex == 0) {"<div class='row'>"} %}
  <div class="col-lg-4 col-md-6 col-sm-12 p-3">
    <div class="video-heading flex-between p-3 bg-light">
      <h6 class="mb-0">{% VideoTitle %}</h6>
      {% IsNullOrEmpty(VideoDescription) ? "" : "<button type='button' class='btn btn-info text-white' data-toggle='modal' data-target='#ID" + DocumentId + "'><i class='fas fa-info'></i></button>" %}
    </div>
    <!-- Modal -->
    <div class="modal fade" id="ID{% DocumentId %}" tabindex="-1" role="dialog" aria-labelledby="ID{% DocumentId %}" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
             <h6 class="mb-0">{% VideoTitle %}</h6>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
          </div>
          <div class="modal-body">
            {% VideoDescription %}
          </div>
        </div>
      </div>
    </div>
   <div class="embed-responsive{% IsNullOrEmpty(VideoAspectRatio) ? "" : " embed-responsive-" + VideoAspectRatio %}">
     <iframe class="embed-responsive-item{% IsNullOrEmpty(VideoLazyLoad) ? "" : " lazyload" %}{% IsNullOrEmpty(VideoCSSClass) ? "" : VideoCSSClass %}" src="{% VideoURL %}" title="{% VideoTitle %}">
     </iframe>
   </div>
  </div>
{% if(DataItemIndex == DataItemCount-1) {"</div>"} %}

<script>
$(".modal").on('hidden.bs.modal', function (e) {
  $("#ID{% DocumentId %} iframe").attr("src", $("#ID{% DocumentId %} iframe").attr("src"));
});  
</script>