{% if (DataItemIndex==0) {"<div class='row clearfix half-gutters'>"  }#%}
  <div class="col-md-{% ColumnWidth %} col-sm-6 col-xs-12 portal-product  {% if (DataItemIndex!=DataItemCount-1) {""  }#%} ">
      <div class="col-xs-12 push-bottom-half productBox" >
          <div class="row">
            <div class=" col-md-12 col-xs-4">
              <div class="featuredProductImage" style="background-image:url({% ImageLow %});"></div>
            </div>
            
            <div class="col-md-12 col-xs-8">
              <div style="position:relative;width:100%;height:250px;overflow:hidden">
                <div class="hidden-md hidden-lg push-bottom-half"></div>
                <h4 class="text-normal">{% Vendor %} {% Name %}</h4>
                
                <p>SKU: {% SKU %}</p>
                <p>VPN: {% MfrPartNbr %} </p>
                <h5 class="text-normal" style="font-weight:bold;">{% DescriptionShort %}</h5>
              </div>
              
              <div class=" push-bottom-half">
                {% if (CurrentUser.IsAuthenticated) { %}
                
                 <p class="text-center"><span class="price">{% Price %}</span> {% CurrencyCd %} </p>

                {% } #%}
              </div>
              
              <div class="row clearfix push-bottom-half" style="">
                <div class="text-center hidden-xs hidden-sm"><a class='button-flat blue ' target="_blank" href="{% shopurl %}"><i class='fa fa-info-circle'>&nbsp;</i> Details</a></div>
                <div class="hidden-md hidden-lg"><a class='button-flat blue ' target="_blank" href="{% shopurl %}"><i class='fa fa-info-circle'>&nbsp;</i> Details</a></div>
                <!-- <div class="pull-right"><a class='button-flat blue' href="/contentitems/produktdetails.aspx?ccd=DE&sk_sku={% SK_SKU %}"><i class='fa fa-info-circle'></i></a></div> -->
              </div>
            </div>
         </div>
       </div>
  </div>
{% if (DataItemIndex==DataItemCount-1) {"</div>"  }#%}



.featuredProductImage {
    /*float: left; */
    position: relative;
   
    /* width: 140px;*/
    height: 140px;
  
    margin-top: 8px;
    margin-bottom: 6px;
 
    background-position: 50% 50%;
    background-repeat: no-repeat;
  
    -moz-box-shadow: 0 0 5px #ccc;
    -webkit-box-shadow: 0 0 5px #ccc;
    box-shadow: 0 0 5px #fff;
    border: 5px solid #fff;
    background-size:80%;
  
}

.productBox{
  border:1px solid #ccc;
  }

.price{
  font-size:2em
  
  }
  
