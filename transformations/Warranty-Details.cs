{% if(DataItemIndex==0){ %}
<div class="row mb-3">
  <div class="col-md-3 text-center animated slideInLeft">
     <img id="img_{% DataItemIndex %}" class="vendor-img" src="/logos/GetLogo.ashx?name={% + Name %}" alt="{% Name %}" onerror="hideImage('{% DataItemIndex %}')" >
  </div>
  <div class="col-md-8">
  {% } #%}
  
  {% if(DataItemIndex==0){ %}
    <h2 class="display-5">{%Name%}</h2>{% IsNullOrEmpty(Domain) ? "" : " <p class='mt-0'><a href='"+ Domain +"' target='_blank' rel='noopener'>Official Website</a></p>" %}
    <p class="lead">{$ 1IM.warranty_db.productGroups $}:</p>
  {% } #%}
    <div>
      <div class="accordion-1col" >
       
        <div class="articleShow {% if(DataItemIndex==0){"current "}#%}" >
          <p><strong><i class="far fa-minus-square"></i>&ensp;{% ProductGroup %}</strong></p>
        </div>
        <div class="articleHide card bg-light p-3 {% if(DataItemIndex==0){"current visible-content "}#%}" id="{% + ProductGroup.ToString().Replace(" ","") #%}">
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
        {% /* IfEmpty(Attachment,"","<a target='blank' href='https://be.ingrammicro.eu/1IM/oneingram-1.9.13/be/" + Attachment + "'><p class='blue-text'><i class='fa fa-download'>&nbsp;</i> Open Attachment</p></a>") */ #%}         
        {% if(CurrentUser.IsInRole("ntauthority-authenticatedusers")){
            if(!IsNullOrEmpty(InternalInformation)){
              "<div class='mt-4 card bg-white p-3'><h5 class='text-danger'>{$ 1IM.warranty_db.additionalInfo $}</h5>" + InternalInformation +"</div>"
            }
           } 
        #%}
        </div>
        
      </div>
    </div>

{% if(DataItemIndex==(DataItemCount-1)){ %}  
  </div>
</div>
 <div class="row">
  <div class="col-md-3 mb-3">
      <a href='{% DocumentContext.CurrentDocumentParent.NodeAliasPath #%}' class="btn btn-primary">{$ 1IM.warranty_db.goBack $}</a>
  </div>
</div> 
{% } #%}