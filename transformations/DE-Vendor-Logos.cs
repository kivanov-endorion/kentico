{% if(DataItemIndex == 0) { "{\"items\": [" %}
{"ArticleTitle":"{% ArticleTitle.Replace(" ","-") %}","ArticleText":"{% ArticleText.Replace("\"","'").Replace("~","").RegexReplace("\r\n","") %}"}
{% if (DataItemIndex + 1 != DataItemCount) {","} %}
{% if (DataItemIndex + 1 == DataItemCount) {"]}"} %}