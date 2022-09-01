var state = {
    tabLinks: document.querySelectorAll('.topics .tab'),
    cards: document.querySelectorAll('.card')
  };
  
  // event listener
  function updateActive(filter) {
    
    state.tabLinks.forEach(function(link) {
      if (link.dataset.tab === filter) {
        link.classList.add('active-tab');
      } else {
        link.classList.remove('active-tab');
      }
    });
    
    state.cards.forEach(function(card) {
      // if all is selected, just clear the display property for all the cards. 
      if (filter === 'all') {
        card.style.display = null;
        return;
      }
      // never reaches here if all was selected
      
      if (card.dataset.tab === filter) {
        card.style.display = null;
      } else {
        card.style.display = "none";
      }
    });
  }
  
  // set up event listener
  state.tabLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      updateActive(link.dataset.tab);
    });
  });