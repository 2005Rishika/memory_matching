// script.js
document.addEventListener('DOMContentLoaded', function () {
  const themes = [
    ['🍎', '🍌', '🍒', '🍇', '🍓', '🍊', '🍉', '🍍'],
    ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'],
    ['🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑']
  ];

  const shuffleArray = array => array.sort(() => Math.random() - 0.5);

  const generateCards = theme => {
    const cards = theme.concat(theme);
    return shuffleArray(cards);
  };

  const createCardElement = (value, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.index = index;
    card.textContent = value;
    card.addEventListener('click', handleCardClick);
    return card;
  };

  const handleCardClick = event => {
    const selectedCard = event.target;
  
    // Avoid handling clicks on already matched or hidden cards
    if (selectedCard.classList.contains('matched') || selectedCard.classList.contains('hidden')) {
      return;
    }
  
    selectedCard.classList.toggle('selected');
  
    const selectedCards = document.querySelectorAll('.selected');
  
    if (selectedCards.length >= 2) {
      setTimeout(() => {
        checkCardPair(selectedCards);
        selectedCards.forEach(card => card.classList.remove('selected'));
      }, 1000);
    }
  };
  
  const checkCardPair = selectedCards => {
    const cardValues = Array.from(selectedCards).map(card => card.textContent);
  
    if (cardValues.every(value => value === cardValues[0])) {
      selectedCards.forEach(card => card.classList.add('matched', 'hidden'));
      checkGameCompletion();
    } else {
      markWrong(selectedCards);
    }
  };
  

  const markWrong = cards => {
    cards.forEach(card => card.classList.add('wrong'));
    setTimeout(() => {
      cards.forEach(card => card.classList.remove('wrong'));
    }, 1000);
  };

  const checkGameCompletion = () => {
    const allCards = document.querySelectorAll('.card');
    const matchedCards = document.querySelectorAll('.matched');

    if (allCards.length === matchedCards.length) {
      alert('Congratulations! You have matched all the cards.');
    }
  };

  const initializeGame = () => {
    const themeIndex = Math.floor(Math.random() * themes.length);
    const selectedTheme = themes[themeIndex];
    const cards = generateCards(selectedTheme);
    const gameBoard = document.getElementById('game-board');

    cards.forEach((value, index) => {
      const card = createCardElement(value, index);
      gameBoard.appendChild(card);
    });
  };

  initializeGame();
});
