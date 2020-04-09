<div class="position-relative">
{% IsNullOrEmpty(FileUrl) ? "" : "<a class='stretched-link' href='" + FileUrl +  "' target='" + FileUrlTarget + "'>" %}
    {% Format("<img src='{0}' class='w-100' alt='{1}'>", GetAttachmentUrlByGUID( FileAttachment, NodeAlias ), FileName) %}
{% IsNullOrEmpty(FileUrl) ? "" : "</a>" %}
    {% if(FileDescription != '') { %}
    <div class="file-description animated slideInDown">
        <div class="container d-flex align-items-center justify-content-center h-100 flex-column text-white text-shadow">
            <div class="vendor-logo card shadow">
                <img class="" src="/logos/GetLogo.ashx?name={% FileDescription.Replace("<p>","".Replace("</p>","".Replace("-",""))) #%}&amp;size=250" alt="{% FileDescription %}">  
            </div>
        </div>
    </div>
    {% } %}
</div>

// CSS
.file-description {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.file-description h1:not([class*=display]) {
  font-size: 4rem;
  font-weight: 700;
}
.file-description .vendor-logo {
  cursor: default;
}