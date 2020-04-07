{% if (DataItemIndex == 0) {"<div class='row contacts'>"} #%}
    <div class="col-xxl-3 col-xl-4 col-lg-6 mb-4 {%if(DataItemcount==1){"mx-auto"}#%}">
    <div class="border-top-primary card lift mt-4 no-gutters row overflow-hidden">      
      {% IsNullOrEmpty(Picture) ? "" : "<div class='d-flex justify-content-around p-3'><div class='overflow-hidden rounded-circle' style='height: 70px;width: 70px;shape-outside: circle();'><img alt='"+ Name +"' class='img-cover' src='~/getattachment/" + Picture + "/image.jpg.aspx?width=70' style='height:100%; width:100%; object-position: 50% 0%;' /></div>" #%}
        <div class="d-flex flex-column {% IsNullOrEmpty(Picture) ? "p-3" : "justify-content-center" %}" style="min-height:124px;">
            <h6 class="caps card-title mb-0 text-center">{% Name %}</h6>
            <p class="small mt-n2 text-center">{% Speciality %}</p>
            {% IsNullOrEmpty(Department) ? "" : "<p class='small mt-n2 text-center'>" + Department + "</p>" %}
            {% IsNullOrEmpty(Description) ? "" : "<summary class='small mt-n2 text-center text-muted'>" + Description + "</summary>" %}
        </div>
      {% IsNullOrEmpty(Picture) ? "" : "</div>" %}
      
        <div class="bg-light">
            <p class="align-items-center flex-column h-100 justify-content-around mb-0 p-2">
                {% IsNullOrEmpty(Email) ? "" : "<a class='btn btn-flat d-flex align-items-center' data-original-title='" + Email + "' data-placement='right' data-toggle='tooltip' href='mailto:" + Email + "'><span class='material-icons mr-3'>email</span> "+LimitLength(Email,36,"&hellip;",true)+"</a>" %}
                {% IsNullOrEmpty(Phone) ?  "" : "<a aria-label='" + Phone.RegexReplace(@"([-()+\/.])+"," ") + "' class='btn btn-flat d-flex align-items-center position-relative' data-original-title='"+Phone+"' data-placement='right' data-toggle='tooltip' href='tel:" + Phone.RegexReplace(@"([-()\/.])+","") + "'><span class='material-icons mr-3'>phone</span> "+Phone+"</a>" #%}
                {% IsNullOrEmpty(MobilePhone) ? "" : "<a aria-label='" + MobilePhone.RegexReplace(@"([-()+\/.])+"," ") + "' class='btn btn-flat d-flex align-items-center' data-original-title='"+MobilePhone+"' data-placement='right' data-toggle='tooltip' href='tel:" + MobilePhone.RegexReplace(@"([-()\/.])+","") + "'><span class='material-icons mr-3'>smartphone</span> "+MobilePhone+"</a>" #%}
            </p>
        </div>
    </div>
</div>
{%if (DataItemIndex == DataItemCount -1) {"</div>"} #%}

// CSS
.card-title {
    min-height: 2.4em;
}
article .contacts .col-xxl-3.col-lg-6.mb-4 {
  min-width: 395px;
}