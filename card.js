// Skapar kort-objekt
// Construtor
function Card(urlSource, id) {
    this.urlSource = urlSource;
    this.id = id;
}

// Instans-metod
Card.prototype.checkSide = function(frontSide) {
    return frontSide = false;
}

export { Card }