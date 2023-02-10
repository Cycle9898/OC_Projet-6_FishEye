//Function to fetch photographer's ID from URL

function getPhotographerId() {
    const urlParams = (new URL(document.location)).searchParams;
    return Number(urlParams.get('id'));
}

//Function to display photographer's data in .photograph-header, .photograph-stat and .modal

function displayPhotographerData(photographer) {
    document.title = `Fisheye - ${photographer.name}`;

    const photographerHeader = document.querySelector(".photograph-header");
    const photographerStat = document.querySelector(".photograph-stat");
    const contactModalHeader = document.querySelector("#modal-title");

    const modalSpan = document.createElement('span');
    modalSpan.innerText = photographer.name;

    const div = document.createElement('div');

    const h1 = document.createElement('h1');
    h1.innerText = photographer.name;

    const pLocation = document.createElement('p');
    pLocation.classList.add("location");
    pLocation.setAttribute("lang", "en");
    pLocation.innerText = photographer.location;

    const pTagline = document.createElement('p');
    pTagline.classList.add("tagline");
    pTagline.innerText = photographer.tagline;

    const img = document.createElement('img');
    img.setAttribute("src", photographer.portrait);
    img.setAttribute("alt", `Photo de profil de ${photographer.name}`);

    const spanPrice = document.createElement('span');
    spanPrice.classList.add("price");
    spanPrice.innerText = photographer.price;

    div.appendChild(h1);
    div.appendChild(pLocation);
    div.appendChild(pTagline);
    photographerHeader.appendChild(div);
    photographerHeader.appendChild(img);
    photographerStat.appendChild(spanPrice);
    contactModalHeader.appendChild(modalSpan);
}

//Array to store media objects

const createdMediaObjects = [];

//Function to display photographer's media in .photograph-media

function displayPhotographerMedia(media, photographer) {
    const mediaContainer = document.querySelector(".media-grid");

    media.forEach((medium) => {
        if (medium.hasOwnProperty("image")) {
            const imageMedium = new ImageFactory(medium, photographer);
            const mediaDOM = imageMedium.getMediaDOM()
            mediaContainer.appendChild(mediaDOM);

            //store it in createdMediaObjects array for further use
            createdMediaObjects.push(imageMedium);
        } else if (medium.hasOwnProperty("video")) {
            const videoMedium = new VideoFactory(medium, photographer);
            const mediaDOM = videoMedium.getMediaDOM()
            mediaContainer.appendChild(mediaDOM);

            //store it in createdMediaObjects array for further use
            createdMediaObjects.push(videoMedium);
        } else {
            throw "Unknown medium";
        }
    });
}


//Main function to build photographer's page

async function init() {
    //Retrieve photographers' data and current photographer's ID
    const photographersData = await getPhotographersData();
    const photographerId = getPhotographerId();

    //Get current photographer's data and display it on his/her page
    const photographerData = photographersData.photographers.find((photographers) => {
        return photographers.id === photographerId;
    });
    const photographer = new PhotographerFactory(photographerData);
    displayPhotographerData(photographer);

    //Get current photographer's media
    const CurrentPhotographerMedia = photographersData.media.filter((media) => {
        return media.photographerId === photographerId;
    });
    //Display current photographer 's media on his/her page
    displayPhotographerMedia(CurrentPhotographerMedia, photographer);
}

init();