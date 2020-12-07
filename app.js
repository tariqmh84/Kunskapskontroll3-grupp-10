// Importerar filen card
import { Card } from './card.js';


// Declare variables som ska använda
let apiKey = '0133bc1fb6266761784237b4007a7c13';
let getDataBtn = document.querySelector('#searchdiv');
let input = document.querySelector('#searchterm');
let imgWrappers = document.querySelector('.game-container');
let spinner = document.querySelector(".spinner");
let countDown = document.getElementById('time');
let submitBtn = document.querySelector('#submit');
let card = {};
let cards = [];
let chosenCards = [];
let numberOfSuccess = 0;
let time;
let counter;

// Selectar elementet #score
let score = document.querySelector('#score');


// spinner disable
spinner.style.display = 'none';

// Event EventListener så användaren kan hämta olika typer av images korter
getDataBtn.addEventListener('submit', getCards);

// Listener som tar hand om data fetching och sortering
function getCards(event) {
    event.preventDefault();
    let inputVal = input.value;
    spinner.style.display = 'block';
    // URL variables för flexibilitet
    let fetchedURL = "https://www.flickr.com/services/rest/?method=flickr.photos.search";
    fetchedURL += "&api_key=" + apiKey;
    fetchedURL += "&tags=" + inputVal;
    fetchedURL += "&per_page=12"
    fetchedURL += "&format=json";
    fetchedURL += "&nojsoncallback=1";

    // Skapa en Array som ska vi pusha alla fotorna i
    let cardsArray = [];
    // Skapar en fetch
    fetch(fetchedURL).then(
            function(response) {

                // Errorhantering3
                if (inputVal == '') {
                    throw 'Search term can not be empty';
                } else {
                    if (response.status === 100) {
                        throw 'The API key passed was not valid or has expired';
                    } else if (response.status === 105) {
                        throw 'The requested service is temporarily unavailable'
                    } else if (response.status === 106) {
                        throw 'The requested operation failed due to a temporary issue.'
                    } else if (response.status === 111) {
                        throw 'The requested response format was not found'
                    } else if (response.status === 112) {
                        throw 'The requested method was not found'
                    } else if (response.status === 114) {
                        throw 'The SOAP envelope send in the request could not be parsed.'
                    } else if (response.status === 115) {
                        throw 'The XML-RPC request document could not be parsed.'
                    } else if (response.status === 116) {
                        throw 'One or more arguments contained a URL that has been used for absure on Flickr.'
                    } else if (response.status >= 200 && response.status <= 299) {
                        return response.json();
                    }
                };

            }
        ).then(data => {
            // Skapar en for-loop
            for (let i = 0; i < data.photos.photo.length; i++) {
                let id = data.photos.photo[i].id;
                let server = data.photos.photo[i].server;
                let secret = data.photos.photo[i].secret;
                let cardImageSrc = `http://live.staticflickr.com/${server}/${id}_${secret}_q.jpg`;
                // Skapa Card object
                card = new Card(id, cardImageSrc);
                // Pushar in bilderna i arrayn
                cardsArray.push(card);
            }



            // Välja 12 sticker av fotona och dubblar dem och ligga dem i DOM
            let pickedCards = cardsArray.splice(0, 12);
            // Duplicate Fotona
            let dupelicateCardsArr = pickedCards.reduce(function(res, current) {
                return res.concat([current, current]);
            }, []);

            //Randomiz arrayen
            let randomizedCards = dupelicateCardsArr.sort(() => Math.random() - 0.5);

            // generate korter från arrayen
            spinner.style.display = 'none';
            generateCards(randomizedCards);
            cards = document.querySelectorAll('.card');
            addEventListenerAll();
            startTimer();
        })
        .catch((err) => alert(err));
}

// Skapar en loop som skapar frontSide och Backside av korten.
function generateCards(arr) {
    for (let item of arr) {
        let card_element = item.createCard();
        imgWrappers.appendChild(card_element);

    }
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
        removeListener(this);
    }
    if (chosenCards.length == 2) {
        removeListenersAll();
        checkIfCardsMAtch();
    }
}

// Skapar funktioner för att korten ska vändas när spelaren klickar på ett kort. 
function addEventListenerAll() {
    cards.forEach(elm => elm.addEventListener('click', doFlip));
}

function removeListenersAll() {
    cards.forEach(elm => elm.removeEventListener('click', doFlip));
}

function removeListener(item) {

    item.removeEventListener('click', doFlip);
}

// Skapar en funktionen för att om korten inte matchar så ska korten vändas tillbaka.
// Sätter en timer på hur länge korten syns innan dem vänds tillbaka.
function checkIfCardsMAtch() {
    if (chosenCards[0].dataset.num === chosenCards[1].dataset.num) {
        setTimeout(hideCards, 500);
        numberOfSuccess++;
        score.innerHTML = `Score: ${numberOfSuccess}`;
    } else {
        setTimeout(resetCards, 500);
    }
}

// Denna funktionen gör att korten visas när spelaren klickar.
function hideCards() {
    chosenCards[0].style.opacity = 0.5;
    chosenCards[1].style.opacity = 0.5;
    addEventListenerAll();
    chosenCards = new Array();
}

// Skapar en funktion som vänder tillbaka korten om det inte är en match.
function resetCards() {
    chosenCards[0].classList.remove('active');
    chosenCards[1].classList.remove('active');
    addEventListenerAll();
    chosenCards = new Array();
}

// Tiden räknar ner från 60 sekunder när användaren klickar på start-knappen.
function startTimer() {
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.3';
    let startMinute = 1;
    time = startMinute * 60;
    counter = setInterval(updateCountDown, 1000);
    counter;

    function updateCountDown() {
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;
        countDown.innerHTML = `Time: ${minutes}: ${seconds}`;
        time--;
        checkTheResult();
    }
}

// Skapar en function för alerten som dyker upp när tiden är slut. Funktionen visar hur många poäng spelaren fick.
function checkTheResult() {
    if (time == -2 && numberOfSuccess < 12) {
        alert(`Time is out! Your Score is ${numberOfSuccess} Try again!`);
        resetGame();
    } else if (time == -2 && numberOfSuccess == 12) {
        alert(`Congratulation! Your Score is ${numberOfSuccess} You won the game`);
        resetGame();
    } else if (time > -2 && numberOfSuccess == 12) {
        alert(`Congratulation! Your Score is ${numberOfSuccess} You won the game`);
        resetGame();
    }
}

// Skapar en funktion till reset när tiden är ute och spelet är slut.
function resetGame() {
    numberOfSuccess = 0;
    imgWrappers.innerHTML = '';
    submitBtn.disabled = false;
    submitBtn.style.opacity = '1';
    // Återställer tiden och poängen till 0 och 60 sek.
    clearInterval(counter);
    time = 60;
    countDown.innerHTML = `Time: 60 sek`;
    score.innerHTML = `Score: 0`

}