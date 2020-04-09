{% if(DataItemIndex == 0) { "<div class=\"gallery\" id=\"gallery\">" } %}
    <div class="mb-3 pics animation">
        <a data-fancybox="gallery" href="{% GetDocumentUrl() %}">
            <img alt="{% FileName.RegexReplace("[_-]", " ") %}" class="img-fluid" src="{% GetDocumentUrl() %}?width=266" />
        </a>
    </div>
{% if(DataItemIndex == DataItemCount - 1) { %}
</div>
<link href="/1IMv2/ext/css/jquery.fancybox.min-3.3.5.css" rel="stylesheet" />
<script defer src="/1IMv2/ext/js/jquery.fancybox.min-3.3.5.js" type="text/javascript"></script>
{% } %}