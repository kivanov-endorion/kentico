{% if(DataItemIndex == 0) {%}
<div class="periodic-table {% if((CurrentDocument.DocumentName == "Services & Trainings") || (CurrentDocument.ClassName!="cms.menuItem")) {"services"} %}">
<div>
{% } #%}

{% if(IMMacros.IsGroupChange("CatGroup",CatGroup)){ %}
    </div><div class="periodic-table-group box-{% CategoryCSSClass %} {% if(CurrentDocument.Categories.FirstItem.CategoryParent.CategoryDescription.ToLower()==CategoryCSSClass){"active"}#%} filter-item">
    
{% } #%}
    

{% if(CategoryLevel.ToString()=="1") { %}
   <a href="/one-im-b4{%CategoryNamePath.ToLower().Replace(" & ","-and-").Replace(" ","-")%}" data-category="{%CategoryName.ToLower()%}" class="periodic-table-box {%CategoryName.ToLower()%}"><span class="count animated zoomIn"></span> <span>{% CategoryDescription %}</span> <small>{% CategoryDisplayName.Replace(" "," <wbr>")%}</small></a> 

<script>
  $(document).ready(function(){
      var catCount = $(".box-{% CategoryCSSClass %} > a:not([style*='visibility: hidden'])").length-1
    //var catCount = $(".box-{% CategoryCSSClass %} > a:not(.d-none)").length-1
      $(".box-{% CategoryCSSClass %} .count").html(catCount);
   });
</script>

{% } #%} 

{% if (CategoryLevel == 2 && CategoryOrder == 2 && CategoryOdd == 1) { %}
  <a href="#" class="periodic-table-box periodic-table-box-small" style="visibility: hidden;"></a>
{% } #%}

{% if (CategoryLevel.ToString()=="2" ) { %}
  <a href="/one-im-b4{%CategoryNamePath.ToLower().Replace(" & ","-and-").Replace(" ","-")%}" data-category="{%CategoryName.ToLower()%}" class="periodic-table-box periodic-table-box-small {%CategoryName.ToLower()%}" data-toggle="tooltip" data-placement="top" title="{% CategoryDisplayName %}">{% CategoryDescription %}</a>
{% } #%}
  
{% if(DataItemIndex == DataItemCount-1) {%}
</div>
</div>
{% } #%}