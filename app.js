import { Card } from './card.js';
// Declare variables som ska använda
let apiKey = '0133bc1fb6266761784237b4007a7c13';
let getDataBtn = document.querySelector('#searchdiv');
let inputVal = document.querySelector('#searchterm');
let imgWrappers = document.querySelector('.game-container');
let card = {};
let cards = [];
let chosenCards = [];

// Event EventListener så användaren kan hämta olika typer av images korter
getDataBtn.addEventListener('submit', getCards);

// Listener som tar hand om data fetching och sortering
function getCards(event) {
    event.preventDefault();
    // URL variables för flexibilitet
    let fetchedURL = "https://www.flickr.com/services/rest/?method=flickr.photos.search";
    fetchedURL += "&api_key=" + apiKey;
    fetchedURL += "&tags=" + inputVal.value;
    fetchedURL += "&per_page=12"
    fetchedURL += "&format=json";
    fetchedURL += "&nojsoncallback=1";

    // Skapa en Array som ska vi pusha alla fotorna i
    let imageArray = [];
    // Skapar en fetch
    fetch(fetchedURL).then(
        function(response){

            // Errorhantering3
            if(response.status === 100){
                throw 'The API key passed was not valid or has expired';
            }else if(response.status === 105){
                throw 'The requested service is temporarily unavailable'
            }else if(response.status === 106){
                throw 'The requested operation failed due to a temporary issue.'
            }else if(response.status === 111){
                throw 'The requested response format was not found'
            }else if(response.status === 112){
                throw 'The requested method was not found'
            }else if(response.status === 114){
                throw 'The SOAP envelope send in the request could not be parsed.'
            }else if(response.status === 115){
                throw 'The XML-RPC request document could not be parsed.'
            }else if(response.status === 116){
                throw 'One or more arguments contained a URL that has been used for absure on Flickr.'
            }else {
                return response.json();
            }
        }
    ).then(data => {
            // Skapar en for-loop
            for (let i = 0; i < data.photos.photo.length; i++) {
                let id = data.photos.photo[i].id;
                let server = data.photos.photo[i].server;
                let secret = data.photos.photo[i].secret;
                let imageSrc = `http://live.staticflickr.com/${server}/${id}_${secret}_q.jpg`;
                // Skapa Card object
                card = new Card(id, imageSrc);
                // Pushar in bilderna i arrayn
                imageArray.push(card);
            }

            // Välja 12 sticker av fotona och dubblar dem och ligga dem i DOM
            let pickedImages = imageArray.splice(0, 12);
            // Duplicate Fotona
            let dupelicateElementArr = pickedImages.reduce(function(res, current) {
                return res.concat([current, current]);
            }, []);

            //Randomiz arrayen
            let randomizedArr = dupelicateElementArr.sort(() => Math.random() - 0.5);

            // generate korter från arrayen
            generateCardsImg(randomizedArr);
            cards = document.querySelectorAll('.card');
            addEventListenerAll();
            startTimer();
        })
        .catch((err) => console.log(err));
}

// Skapar en function för att korten inte ska synas direkt när man klickar på start.
// När användaren klickar på ett kort vänder den sida och en bild syns.
function doFlip() {
    if (this.classList.contains('active')) {
        this.classList.remove('active')
    } else {
        this.classList.add('active');
    }
    if (chosenCards.indexOf(this) == -1) {
        chosenCards.push(this);
        console.log(chosenCards)
        removeListeners(this);
    }
    if (chosenCards.length == 2) {
        removeListenersAll();
        checkIfCardsMAtch();
    }
}

function addEventListenerAll() {
    cards.forEach(elm => elm.addEventListener('click', doFlip));
}

function removeListenersAll() {
    cards.forEach(elm => elm.removeEventListener('click', doFlip));
}

function removeListeners(item) {
    item.removeEventListener('click', doFlip);
}

function checkIfCardsMAtch() {
    if (chosenCards[0].children[1].children[0].currentSrc == chosenCards[1].children[1].children[0].currentSrc) {
        setTimeout(hideCards, 500);
    } else {
        setTimeout(resetCards, 500);
    }
}

function hideCards() {
    chosenCards[0].style.opacity = 0.5;
    chosenCards[1].style.opacity = 0.5;
    addEventListenerAll();
    chosenCards = new Array();
}

function resetCards() {
    chosenCards[0].classList.remove('active');
    chosenCards[1].classList.remove('active');
    addEventListenerAll();
    chosenCards = new Array();
}

// Tiden räknar ner från 60 sekunder när användaren klickar på start-knappen.
function startTimer() {
    document.querySelector('#submit').disabled = true;
    let startMinute = 1;
    let time = startMinute * 60;
    let countDown = document.getElementById('time');
    setInterval(updateCountDown, 1000);

    function updateCountDown() {
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;
        countDown.innerHTML = `${minutes}: ${seconds}`;
        time--;
        if (time === -2) {
            alert('Game over!');
            imgWrappers.innerHTML = '';
            document.querySelector('#submit').disabled = false;
        }
    }
}

// Skapar en loop som skapar frontSide och Backside av korten.
function generateCardsImg(arr) {
    for (let item of arr) {
        let cardDiv = document.createElement('div');
        cardDiv.classList = 'card';
        let cardDivfront = document.createElement('div');
        cardDivfront.classList = 'card-face front';
        let cardDivBack = document.createElement('div');
        cardDivBack.classList = 'card-face back';
        let img = document.createElement('img');
        img.src = item.urlSource;
        img.classList = 'back';
        imgWrappers.appendChild(cardDiv);
        cardDiv.appendChild(cardDivfront);
        cardDiv.appendChild(cardDivBack);
        cardDivBack.appendChild(img);

    }
}


// När användaren hittar ett par för h*n 1 poäng.
let score = document.querySelector('#score');

