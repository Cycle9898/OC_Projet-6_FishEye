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
    div.classList.add("photographer-data-container");

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
    const pPrice = document.createElement('p');
    pPrice.classList.add("price");
    pPrice.innerText = photographer.price;

    const pTotalLikes = document.createElement("p");
    pTotalLikes.classList.add("likes-total");

    const numberSpan = document.createElement("span");
    const heartSpan = document.createElement("span");

    numberSpan.classList.add("likes-number");

    heartSpan.classList.add("fa-solid");
    heartSpan.classList.add("fa-heart");
    heartSpan.setAttribute("role", "img");
    heartSpan.setAttribute("aria-label", '"likes" au total');

    //All appendChild()
    div.appendChild(h1);
    div.appendChild(pLocation);
    div.appendChild(pTagline);
    photographerHeader.appendChild(div);
    photographerHeader.appendChild(img);
    pTotalLikes.appendChild(numberSpan);
    pTotalLikes.appendChild(heartSpan);
    photographerStat.appendChild(pTotalLikes);
    photographerStat.appendChild(pPrice);
    contactModalHeader.appendChild(modalSpan);
}

//Display photographer's media in .photograph-media and load light box media

function displayPhotographerMedia(media) {
    //medium cards on photographer's page
    media.forEach((medium) => {
        const mediaContainer = document.querySelector(".media-grid");

        const article = document.createElement('article');

        const imgDiv = document.createElement('div');
        imgDiv.classList.add("thumbnail-container");
        imgDiv.setAttribute("tabindex", "0");
        imgDiv.setAttribute("role", "button");
        imgDiv.setAttribute("aria-label", `Cliquez ou appuyez sur "Entrée" pour ${medium.mediaReadLabel}`);
        //Mouse and keyboard event listener for light box opening
        imgDiv.addEventListener("click", () => launchLightBox(medium.mediumId));
        imgDiv.addEventListener("keydown", event => {
            if (event.key === "Enter") {
                launchLightBox(medium.mediumId);
            }
        });

        const img = document.createElement('img');
        img.setAttribute("src", medium.thumbnailImage);
        img.setAttribute("alt", medium.title);

        const titleDiv = document.createElement('div');
        titleDiv.classList.add("title-container");

        const h2 = document.createElement('h2');
        h2.setAttribute("lang", "en");
        h2.innerText = medium.title;

        const pLikes = document.createElement('p');

        const span = document.createElement('span');
        span.classList.add('likes-number');
        span.innerText = medium.likes;

        const heartIcon = document.createElement('span');
        heartIcon.classList.add('fa-regular');
        heartIcon.classList.add('fa-heart');
        heartIcon.setAttribute("role", "button");
        heartIcon.setAttribute("aria-label", "like");
        heartIcon.setAttribute("tabindex", "0");
        if (medium.isLiked) {
            heartIcon.classList.add("liked");
        }

        //Update "likes" numbers and change heart button appearance when a medium is liked + event listeners

        const likesNumberHandling = () => {
            const totalLikesCounter = document.querySelector(".likes-number");

            if (heartIcon.classList.contains("liked")) {
                heartIcon.classList.remove("liked");
                medium._likes -= 1;
                span.innerText = medium.likes;
                medium.isLiked = false;
                //Update total "likes" number on page
                totalLikesCounter.innerText = Number(totalLikesCounter.innerText) - 1;
            } else {
                heartIcon.classList.add("liked");
                medium._likes += 1;
                span.innerText = medium.likes;
                medium.isLiked = true;
                //Update total "likes" number on page
                totalLikesCounter.innerText = Number(totalLikesCounter.innerText) + 1;
            }
        }

        heartIcon.addEventListener("click", likesNumberHandling);

        heartIcon.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                likesNumberHandling();
            }
        });

        //All appendChild()
        imgDiv.appendChild(img);
        titleDiv.appendChild(h2);
        pLikes.appendChild(span);
        pLikes.appendChild(heartIcon);
        titleDiv.appendChild(pLikes);
        article.appendChild(imgDiv);
        article.appendChild(titleDiv);
        mediaContainer.appendChild(article);
    });

    //Load in light box
    loadLightBox(media);
}

//Display total "likes" number

function displayTotalLikesNumber(media) {
    const totalLikesCounter = document.querySelector(".likes-number");

    totalLikesCounter.innerText = media.map(medium => medium.likes)
        .reduce((totalLikesNumber, currentLikesNumber) => totalLikesNumber + currentLikesNumber);
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
    const photographerData = photographersData.photographers
        .find(photographers => photographers.id === photographerId);
    const photographer = new PhotographerFactory(photographerData);
    displayPhotographerData(photographer);

    //Get current photographer's media
    const currentPhotographerMedia = photographersData.media
        .filter(media => media.photographerId === photographerId);

    //Use MediaFactory to create medium objects with currentPhotographerMedia
    const builtMedia = currentPhotographerMedia.map(medium => new MediaFactory(medium, photographer));

    //Display current photographer's media, sorted by popularity - ascending, on his/her page and load light box media
    displayPhotographerMedia(sortMedia(builtMedia, "popularity-asc"));

    //Event listener for sorting media
    const selectOrder = document.getElementById("order-by");

    selectOrder.addEventListener("change", (event) => {
        //Emptying .media-grid and .light-box-view before sorting and regenerating media
        document.querySelector(".media-grid").innerHTML = "";
        document.querySelector("#light-box-modal .light-box-view").innerHTML = "";

        displayPhotographerMedia(sortMedia(builtMedia, event.target.value));
    });

    //Display total "likes" number
    displayTotalLikesNumber(builtMedia);
}

init();