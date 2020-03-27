const carousel = document.querySelectorAll('.carousel');
let isLeaving = false;
let observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
        if (entry.isIntersecting) {
          isLeaving = true;
          entry.target.carousel();
        } else if (isLeaving) {
          isLeaving = false;
          entry.target.carousel('dispose');
        }
    });
})
observer.observe(carousel);