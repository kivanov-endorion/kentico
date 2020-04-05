// 1IM Read more Web part container
<div id="{% if(ID){ID}else{WebpartControlID}@%}" class="read-more">
    <div class="{%if(ViewMode=="LiveSite") { "collapse" } @%} position-relative read-more-collapse" id="collapse{% if(ID){ID}else{WebpartControlID}@%}">
  □
</div>
    <p class="text-center"><a class="collapsed tip-more font-weight-600 display-7" data-scroll-ignore
            data-toggle="collapse" href="#collapse{% if(ID){ID}else{WebpartControlID}@%}" aria-expanded="false"
            aria-controls="collapse{% if(ID){ID}else{WebpartControlID}@%}"><span></span></a></p>
</div>


/* Read More button NEW */

.read-more>div.collapse:not(.show) {
  min-height: 250px;
  height: 250px !important;
  overflow: hidden;  
  display: block;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  transition: all .3s;
}

.read-more>div.collapse:not(.show)::after {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to bottom, transparent 75%, white);
  content: '';
  transition: all .3s;
}

.read-more>div.collapsing {
    min-height: 250px !important;
}

.read-more-collapse:empty, 
.read-more-collapse:empty + p {
  display: none !important;
  height: 0 !important;
}

.tip-more.collapsed span:before {
    content: 'Mehr'
}

.tip-more:not(.collapsed) span:before {
    content: 'Weniger'
}
