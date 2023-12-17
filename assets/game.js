const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let firstCard, secondCard;

function flipCard() { // Context: "this" will refer to the clicked card's element
    
    this.classList.toggle('flip'); // toggle 'flip' in this' class

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
    setTimeout(() => {
        first.classList.remove('flip');
        second.classList.remove('flip');
    }, 1000) // TimeOut intented to see which was the wrong card
}

cards.forEach(card => card.addEventListener('click', flipCard));

