let apiKey = '0133bc1fb6266761784237b4007a7c13';
let getDataBtn = document.querySelector('#searchdiv');
let inputVal = document.querySelector('#searchterm');
let imgWrappers = document.querySelector('.game-container');

getDataBtn.addEventListener('submit', getCards);


function getCards(event) {

    event.preventDefault();

    let fetchedURL = "https://www.flickr.com/services/rest/?method=flickr.photos.search";
    fetchedURL += "&api_key=" + apiKey;
    fetchedURL += "&tags=" + inputVal.value;
    fetchedURL += "&per_page=12"
    fetchedURL += "&format=json";
    fetchedURL += "&nojsoncallback=1";

    let imageArray = []



    fetch(fetchedURL)
        .then(response => response.json())
        .then(data => {

            for (let i = 0; i < data.photos.photo.length; i++) {

                let image = `http://live.staticflickr.com/${data.photos.photo[i].server}/${data.photos.photo[i].id}_${data.photos.photo[i].secret}_q.jpg`;

                imageArray.push(image);

            }
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



        })
        .catch((err) => console.log(err));

}