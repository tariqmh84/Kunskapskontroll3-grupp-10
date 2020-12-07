// Skapar kort-objekt
// Construtor
function Card(id, urlSource) {
    this.id = id;
    this.urlSource = urlSource;
    this.isFlippedCard = false;
}

// Instans-metod
Card.prototype.createCard = function() {
    let cardDiv = document.createElement('div');
    cardDiv.classList = 'card';
    cardDiv.dataset.num = this.id;
    let cardDivfront = document.createElement('div');
    cardDivfront.classList = 'card-face front';
    let cardDivBack = document.createElement('div');
    cardDivBack.classList = 'card-face back';
    let imgCard = document.createElement('img');
    imgCard.src = this.urlSource;
    imgCard.classList = 'back';
    cardDiv.appendChild(cardDivfront);
    cardDiv.appendChild(cardDivBack);
    cardDivBack.appendChild(imgCard);
    return cardDiv;
}

export { Card }