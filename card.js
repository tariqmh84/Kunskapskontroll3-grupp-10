// Skapar kort-objekt
// Construtor
function Card(urlSource, id) {
    this.urlSource = urlSource;
    this.id = id;
    this.isFlippedCard = false;
}

// Instans-metod
Card.prototype.flippedCard = function() {
    if (!isFlippedCard) {
        isFlippedCard = true;
        return;
    }

}

export { Card }