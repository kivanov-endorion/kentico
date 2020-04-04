{% if( DataItemIndex == 0 ) { "<div class='row'>" } %}
    <div class="flip-card-scene col-xxl-3 col-lg-6 mb-4">
        <div class="flip-card card row no-gutters flex-row mt-4 border text-muted">
          <div class="flip-card-face flip-card-face-front">
              <div class="wow flipInY h-100 overflow-hidden flex-center face-img">
				{% IsNullOrEmpty(ArticleTeaserImage) ? "<i class='" + ArticleIcon + " w-100 h-100 flex-center bg-light fa-4x'></i>" : 
                Format("<img alt='{0}' class='img-contain lazyload' data-src='{1}?width=200'>", DocumentName, GetAttachmentUrlByGUID( ArticleTeaserImage, NodeAlias )) %} 
              </div>
              <div class="d-flex flex-column jusify-content-around align-items-center px-2 face-content">
                  <h6 class="card-title mb-0">{% DocumentName %}</h6>
              </div>
          </div>          
          <div class="flip-card-face flip-card-face-back p-3">
			{% ArticleTeaserText %}
          </div>
        </div>
    </div>
{% if(DataItemIndex == DataItemCount - 1) { "</div>" } %}

// CSS
.card.flip-card {
    border: none;
}

.flip-card-scene {
    width: 100%;
    min-height: 6rem;
    display: inline-block;
    margin-bottom: 1em;
}

.flip-card {
    width: 100%;
    height: 100%;
    -webkit-transition: all 1s;
    -o-transition: all 1s;
    transition: all 1s;
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    cursor: pointer;
    position: relative;
}

.flip-card-face-front {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    text-align: center;
}

.flip-card-face {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
}

.flip-card-face-front .face-img {
  -ms-flex: 0 0 10rem; 
  flex: 0 0 10rem;
}

.flip-card-face-front .face-content {
  -ms-flex: 1 1 100%; 
  flex: 1 1 100%;
  word-break: break-word;
}

.flip-card-face-back {
    -webkit-transform: rotateX(180deg);
    transform: rotateX(180deg);
    background: linear-gradient(rgba(248,249,250,.3),rgba(248,249,250,.5)) repeat 50% 50%;
}

.flip-card.is-flipped {
    -webkit-transform: rotateX(180deg);
    transform: rotateX(180deg);
}

.flip-card.is-flipped .flip-card-face {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
}

.flip-card.is-flipped .flip-card-face-back {
    overflow-y: auto;
}

.flip-cards-services .flip-card {
    border: 2px solid #fff;
}

.flip-card ul, .flip-card p  {
    font-size: 1rem !important;
}

.logo-white {
    filter: grayscale(1) brightness(0) invert(1);
}

/* Scrollbar #*/
.flip-card.is-flipped .flip-card-face-back {
    -ms-overflow-style: -ms-autohiding-scrollbar;
    -ms-scrollbar-track-color: #dedede;
    -ms-scrollbar-base-color: #dedede;
    -ms-scrollbar-highlight-color: #dedede;
    -ms-scrollbar-face-color: #dedede;
    -ms-scrollbar-arrow-color: #dedede;
    scrollbar-gutter: always;
}

.flip-card.is-flipped .flip-card-face-back::-webkit-scrollbar {
    width: 8px !important;
    height: 8px !important;
    background: #dedede !important;
    border-width: 1px !important;
    border-style: solid !important;
    border-color: #dedede !important;
    border-image: initial !important;
}

.flip-card.is-flipped .flip-card-face-back::-webkit-scrollbar-button {
    display: none !important;
}

.flip-card.is-flipped .flip-card-face-back::-webkit-scrollbar-track {
    background: #e2eef7 !important;
}

.flip-card.is-flipped .flip-card-face-back::-webkit-scrollbar-thumb {
    min-height: 28px !important;
    background: #dedede !important;
}

.InternetExplorer .flip-card.is-flipped .flip-card-face {
    -webkit-backface-visibility: visible;
    backface-visibility: visible;
}

.InternetExplorer .flip-card.is-flipped .flip-card-face-back {
    opacity: 1;
    transition: all .3s .3s;
}

.InternetExplorer .flip-card .flip-card-face-back {
    opacity: 0;
    transition: all .3s .3s;
}

.InternetExplorer .flip-card.is-flipped .flip-card-face-front {
    opacity: 0;
    transition: all .3s .3s;
}

.InternetExplorer .flip-card-face-front {
    transition: all .3s .3s;
}