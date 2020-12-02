// Declare variables som ska använda
let apiKey = '0133bc1fb6266761784237b4007a7c13';
let getDataBtn = document.querySelector('#searchdiv');
let inputVal = document.querySelector('#searchterm');
let imgWrappers = document.querySelector('.game-container');

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
    fetch(fetchedURL)
        .then(response => response.json())
        .then(data => {

            // Skapar en for-loop
            for (let i = 0; i < data.photos.photo.length; i++) {
                let image = `http://live.staticflickr.com/${data.photos.photo[i].server}/${data.photos.photo[i].id}_${data.photos.photo[i].secret}_q.jpg`;

                // Pushar in bilderna i arrayn
                imageArray.push(image);

            }
            // Välja 12 sticker av fotona och dubblar dem och ligga dem i DOM
            let pickedImages = imageArray.splice(0, 12);
            for (let item of pickedImages) {
                for (let j = 0; j < 2; j++) {
                    let cardDiv = document.createElement('div');
                    cardDiv.classList = 'card';
                    let img = document.createElement('img');
                    img.src = item;
                    imgWrappers.appendChild(cardDiv);
                    cardDiv.appendChild(img);
                }
            }
            console.log(imageArray)
        })
        .catch((err) => console.log(err));
}

// När användaren klickar på sitt första valda kort, börjar tiden att ticka neråt.

// För varje 'miss' läggs det till ett under Attempts.

// När användaren hittar ett par för hon 1 poäng.

let score = document.querySelector('#score');


