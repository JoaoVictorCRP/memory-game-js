const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false; // In case its not a match, the board must be locked. (So the card finishes unfliping)
let firstCard, secondCard;

(function shuffleCards(){
    cards.forEach(card => {
        let randomPosition = Math.floor((Math.random() * 12));
        card.style.order = randomPosition; // Using order property from flexBox;
    });
}) (); // IIFE

function flipCard() { // Context: "this" will refer to the clicked card's element
    
    if(lockBoard) return;
    if(this === firstCard) return; // Preventing double-click on the same card

    this.classList.toggle('flip'); // toggle "flip" in this' class

    if(!hasFlippedCard){
        // First card selected
        hasFlippedCard = true;
        firstCard = this;
        return
    } else {
        // Second card selected
        hasFlippedCard = false;
        secondCard = this

        matchCheck(firstCard, secondCard);
    };
}

function matchCheck (first, second){
    let isMatch = first.dataset.image ===
    second.dataset.image;

    isMatch ? disableCards(first, second) : unflipCards(first, second);
};

function disableCards(first, second){
    first.removeEventListener('click', flipCard); // Once the pairs are found there will be no more clicking!
    second.removeEventListener('click',flipCard);
}

function unflipCards(first, second) {
    lockBoard = true;

    setTimeout(() => {
        first.classList.remove('flip');
        second.classList.remove('flip');
        
        resetBoard();
    }, 1000) // TimeOut intented to see which was the wrong card
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

cards.forEach(card => card.addEventListener('click', flipCard));

