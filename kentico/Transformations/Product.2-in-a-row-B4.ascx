{%if (DataItemIndex mod 3 == 0) {"<div class='row products'>"}#%}
    <div class="col-md-6 col-xs-12 mb-4 filter-item {% IfEmpty(Vendor,"",Vendor%}">
        <div class="card h-100">
            <div class="view overlay zoom">
                {% IfEmpty(Image,"<img src='~/1IM/oneingram-1.9.13/global/Logo_Blue_300x175.png?width=446' alt='product image' class='card-img-top' />","<img src='"+ Image + "?width=446' alt='" + Name + "' class='card-img-top img-contain' srcset='"+ Image + CurrentDocument.NodeAliasPath +"?width=446,"+ Image + CurrentDocument.NodeAliasPath +"?width=975'/>") #%}
            </div>
            <div class="card-body">
                <h6 class="card-title mb-0"><a class="card-link" href="{% GetDocumentUrl() %}">{%Name%}</a></h6>
                <p class="small text-muted">SKU: {% SKU %} | VPN: {% VPN %}</p>
                <p class="card-text text-justify max-lines-6 d-none d-sm-block">{%StripTags(LimitLength(TeaserText, 180, "&hellip;", true)) %}</p>
            </div>
            <div class="card-footer d-flex justify-content-between bg-transparent border-0">
              <a class="btn btn-primary btn-sm" role="button" href="{% OrderLink %}">{%OrderText%}</a>
              <h4 class="font-weight-lighter">{%Currency + " " + Price %}</h4>

        </div>
      </div>
    </div>
{%if (DataItemIndex mod 3 == 1) {"</div>"}#%}