// Skapar kort-objekt
// Construtor
function Card(urlSource, id, animation) {
    this.urlSource = urlSource;
    this.id = id;
    this.frontSide = false;
    this.backSide = false;
    //this.animation = animation;
}

// Instans-metod
Card.prototype.checkSide = function(frontSide) {
    return frontSide = false;
}

Card.prototype.side = function(backSide){
    return backSide = false;
}

/* Card.prototype.animation = function(ani){
    return ani * 180;
} */

export { Card }