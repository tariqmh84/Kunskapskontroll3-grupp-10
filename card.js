// Skapar kort-objekt
// Construtor
function Card(id, urlSource) {
    this.id = id;
    this.urlSource = urlSource;
    this.isFlippedCard = false;
}

// Instans-metod
Card.prototype.flippedCard = function() {
    return this.id;
}

export { Card }