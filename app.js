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

            // Detta kanske är bra att ha med? 
           /*  let serverId = data.photos.photo[0].server;
            let id = data.photos.photo[0].id;
            let secret = data.photos.photo[0].secret; */

            // Skapar en for-loop
            for (let i = 0; i < data.photos.photo.length; i++) {
                let image = `http://live.staticflickr.com/${data.photos.photo[i].server}/${data.photos.photo[i].id}_${data.photos.photo[i].secret}_q.jpg`;

                // Pushar in bilderna i arrayn
                imageArray.push(image);

            }
            // Välja 12 sticker av fotona och dubblar dem och ligga dem i DOM
            let pickedImages = imageArray.splice(0, 12);
            // Duplicate Fotona
            let dupelicateElementArr = pickedImages.reduce(function(res, current) {
                return res.concat([current, current]);
            }, []);

            //Randomiz arrayen
            let randomizedArr = dupelicateElementArr.sort(() => Math.random() - 0.5);
            for (let item of randomizedArr) {
                let cardDiv = document.createElement('div');
                cardDiv.classList = 'card';
                let img = document.createElement('img');
                img.src = item;
                imgWrappers.appendChild(cardDiv);
                cardDiv.appendChild(img);

            }
            console.log(imageArray)
        })
        .catch((err) => console.log(err));
}

// Selectar button-elementet (start)
let startButton = document.querySelector('button');

// Tiden räknar ner från 60 sekunder när användaren klickar på start-knappen.
startButton.addEventListener('click',
    function(){
        let startMinute = 1;
        let time = startMinute * 60;

        let countDown = document.getElementById('time');
        setInterval(updateCountDown, 1000);

        function updateCountDown(){
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;

        countDown.innerHTML = `${minutes}: ${seconds}`;
        time--;

        if(time === -2){
            alert('Game over!');
        }

        }
        
 
    }
)


// För varje 'miss' läggs det till ett under Attempts.
let attempts = document.querySelector('#attempts');

// När användaren hittar ett par för hon 1 poäng.

let score = document.querySelector('#score');