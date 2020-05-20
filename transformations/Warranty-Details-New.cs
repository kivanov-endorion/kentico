{% if (DataItemIndex == 0){ %}
<div class="row mb-3">
  <div class="col-md-3 text-center animated slideInLeft">
     <img id="img_{% DataItemIndex %}" class="vendor-img" src="/logos/GetLogo.ashx?name={% + Name %}" alt="{% Name %}" onerror="hideImage('{% DataItemIndex %}')" >
  </div>
  <div class="col-md-8">
{% } #%}

{% if (DataItemIndex == 0) { %}
<div class="card accordion bg-light" id="accordion">
    <div class="card-body">
        <div class="mb-4 text-center">
            <h2 class="display-5">{% Name %}</h2>{% IsNullOrEmpty(Domain) ? "" : " <p class='mt-0'><a href='"+ Domain +"' target='_blank' rel='noopener'>Official Website</a></p>" %}
            <p class="lead">{$ 1IM.warranty_db.productGroups $}:</p>
        </div>
        <div class="list-group list-group-flush">
{% } %}
            <div class="list-group-item">
                <a class="d-flex align-items-center text-reset text-decoration-none {% if (DataItemIndex != 0) { "collapsed" } %}" 
                data-toggle="collapse" href="#acc-{% DataItemIndex %}" role="button" aria-expanded="{% if (DataItemIndex != 0) { "false" } else {"true"} %}" aria-controls="acc-{% DataItemIndex %}" data-scroll-ignore>
                    <div class="mr-auto">
                        <p class="font-weight-600 mb-0">
                            {% ProductGroup %}
                        </p>
                    </div>
                    <span class="collapse-chevron text-muted ml-4">
                        <i class="fa fa-chevron-down"></i>
                    </span>
                </a>
                <div class="collapse {% if (DataItemIndex == 0) { "show" } %}" id="acc-{% DataItemIndex %}" data-parent="#accordion">
                    <div class="py-4 row">
                        <div class="col-12">
                            
                            <h6 class="caps">{$ 1IM.warranty_db.DOA $}</h6>
                            <p><strong>{$ 1IM.warranty_db.firstContactDOA $}:</strong> {% DOAContact %} </p>
                            <p><strong>{$ 1IM.warranty_db.periodDOA $}:</strong> {% DOAPeriod %} </p>
                            {% IsNullOrEmpty(DOAProcedure) ? "" : "<p><strong>{$ 1IM.warranty_db.procedureDOA $}:</strong>" + DOAProcedure+ " </p>"#%}
                            <h6 class="caps">{$ 1IM.warranty_db.warrantyManagement $}</h6>
                            <p><strong>{$ 1IM.warranty_db.firstContactWarrantyClaim $}:</strong> {% WarrantyContact %} </p>
                            <p><strong>{$ 1IM.warranty_db.periodWarranty $}:</strong> {% WarrantyPeriod %} </p>
                            <p><strong>{$ 1IM.warranty_db.procedureWarranty $}:</strong> {% WarrantyProcedure %} </p>
                            {% IsNullOrEmpty(Action) ? "" : "<p><strong>{$ 1IM.warranty_db.otherAction $}:</strong> " + Action + " </p>" #%}
                            {% IsNullOrEmpty(Remarks) ? "" : "<p><strong>{$ 1IM.warranty_db.otherInfo $}:</strong> " + Remarks + " </p>" #%}
                            
                            {% if (!IsNullOrEmpty(Uploads)) { %}
                                <h6 class="caps">{$ 1IM.warranty_db.attachments $}</h6>
                                <p><a class='text-primary' target='blank' rel='noopener' href='/pages/getattachment.ashx?guid={% Uploads %}'><i class='fas fa-download'></i> {$ 1IM.warranty_db.downloadAttachment $}</a></p>    
                            {% } #%}
                            {% if(CurrentUser.IsInRole("ntauthority-authenticatedusers")){
                                if(!IsNullOrEmpty(InternalInformation)){
                                "<div class='mt-4 card bg-white p-3'><h5 class='text-danger'>{$ 1IM.warranty_db.additionalInfo $}</h5>" + InternalInformation +"</div>"
                                }
                            } 
                            #%}
                            
                        </div>
                    </div>
                </div>
            </div>
{% if (DataItemIndex == DataItemCount - 1) { %} 
        </div>
        <p class="text-center"><a href='{% DocumentContext.CurrentDocumentParent.NodeAliasPath #%}' class="btn btn-primary mt-5">{$ 1IM.warranty_db.goBack $}</a></p>
    </div>
</div>
{% } %}
