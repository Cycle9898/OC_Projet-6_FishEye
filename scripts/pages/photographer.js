//Fetch photographer's ID from URL

function getPhotographerId() {
    const urlParams = (new URL(document.location)).searchParams;
    return Number(urlParams.get('id'));
}

//Display photographer's data in .photograph-header, .photograph-stat and .modal

function displayPhotographerData(photographer) {
    //Update page's title
    document.title = `Fisheye - ${photographer.name}`;

    //DOM elements
    const photographerHeader = document.querySelector(".photograph-header");
    const photographerStat = document.querySelector(".photograph-stat");
    const contactModalHeader = document.querySelector("#modal-title");

    //Add photographer name in contact modal header
    const modalSpan = document.createElement('span');
    modalSpan.innerText = photographer.name;

    //Add data in .photograph-header
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

    //Add data in .photograph-stat (bottom right of the window)
    const spanPrice = document.createElement('span');
    spanPrice.classList.add("price");
    spanPrice.innerText = photographer.price;

    const pTotalLikes = document.createElement("p");
    pTotalLikes.classList.add("likes-total");

    const numberSpan = document.createElement("span");
    const heartSpan = document.createElement("span");

    numberSpan.classList.add("likes-number");

    heartSpan.classList.add("fa-solid");
    heartSpan.classList.add("fa-heart");
    heartSpan.setAttribute("aria-label", 'Nombres de "likes"');

    //All appendChild()
    div.appendChild(h1);
    div.appendChild(pLocation);
    div.appendChild(pTagline);
    photographerHeader.appendChild(div);
    photographerHeader.appendChild(img);
    pTotalLikes.appendChild(numberSpan);
    pTotalLikes.appendChild(heartSpan);
    photographerStat.appendChild(pTotalLikes);
    photographerStat.appendChild(spanPrice);
    contactModalHeader.appendChild(modalSpan);
}

//Array to store built media objects for further use (light box and total number of "likes")

const createdMediaObjects = [];

//Display photographer's media in .photograph-media

function displayPhotographerMedia(media, photographer) {
    const mediaContainer = document.querySelector(".media-grid");

    media.forEach((medium) => {
        if (medium.hasOwnProperty("image")) {
            const imageMedium = new ImageFactory(medium, photographer);
            const mediaDOM = imageMedium.getMediaDOM();
            mediaContainer.appendChild(mediaDOM);

            //store it in createdMediaObjects array
            createdMediaObjects.push(imageMedium);
        } else if (medium.hasOwnProperty("video")) {
            const videoMedium = new VideoFactory(medium, photographer);
            const mediaDOM = videoMedium.getMediaDOM();
            mediaContainer.appendChild(mediaDOM);

            //store it in createdMediaObjects array
            createdMediaObjects.push(videoMedium);
        } else {
            throw "Unknown medium";
        }
    });
}

//Update total "likes" number

function updateTotalLikesNumber() {
    const totalLikesCounter = document.querySelector(".likes-number");

    let totalLikes = 0;
    createdMediaObjects.forEach(createdMedium => {
        totalLikes += createdMedium.likes;
    })

    totalLikesCounter.innerText = totalLikes;
}

//Sort media by type (popularity ascending, ...)

function sortMedia(media, sortType) {
    switch (sortType) {
        case "popularity-asc":
            return media.sort((a, b) => a.likes - b.likes);

        case "popularity-desc":
            return media.sort((a, b) => b.likes - a.likes);

        case "date-asc":
            return media.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));

        case "date-desc":
            return media.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

        case "title":
            return media.sort((a, b) => {
                if (a.title < b.title) {
                    return -1;
                } else if (a.title > b.title) {
                    return 1;
                } else {
                    return 0;
                }
            });

        default:
            throw "Unknown sort type";
    }
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
    const currentPhotographerMedia = photographersData.media.filter((media) => {
        return media.photographerId === photographerId;
    });

    //Display current photographer's media, sorted by popularity - ascending, on his/her page
    displayPhotographerMedia(sortMedia(currentPhotographerMedia, "popularity-asc"), photographer);

    //Event listener for sorting media
    const selectOrder = document.getElementById("order-by");

    selectOrder.addEventListener("change", (event) => {
        const mediaContainer = document.querySelector(".media-grid");
        mediaContainer.innerHTML = "";

        displayPhotographerMedia(sortMedia(currentPhotographerMedia, event.target.value), photographer);
    });

    //Display total "likes" number
    updateTotalLikesNumber();
}

init();