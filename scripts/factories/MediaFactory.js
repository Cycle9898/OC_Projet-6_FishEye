//Media factory : template design pattern to create an object according to its type

class MediaFactory {
    constructor(medium, photographer) {
        this._id = medium.id;
        this._photographerId = medium.photographerId;
        this._photographerName = photographer.name;
        this._title = medium.title;
        this._likes = medium.likes;
        this._date = medium.date;
        this._price = medium.price;

        this.isLiked = false;
    }

    get photographerName() {
        return this._photographerName.split(" ").join("_");
    }

    get photographerId() {
        return this._photographerId;
    }

    get title() {
        return this._title;
    }

    get likes() {
        return this._likes;
    }

    get mediumId() {
        return this._id;
    }

    get date() {
        return this._date;
    }

    getMediaDOM() {
        //medium card on photographer's page
        const article = document.createElement('article');

        const imgDiv = document.createElement('div');
        imgDiv.classList.add("thumbnail-container");
        imgDiv.setAttribute("role", "button");
        imgDiv.setAttribute("tabindex", "0");
        imgDiv.setAttribute("aria-label", `Cliquez ou appuyez sur "Entrée" pour ${this.mediaReadLabel}`);
        //Mouse and keyboard event listener for light box opening
        imgDiv.addEventListener("click", () => launchLightBox(this.mediumId));
        imgDiv.addEventListener("keydown", event => {
            if (event.key === "Enter") {
                launchLightBox(this.mediumId);
            }
        });

        const img = document.createElement('img');
        img.setAttribute("src", this.thumbnailImage);
        img.setAttribute("alt", this.title);

        const titleDiv = document.createElement('div');
        titleDiv.classList.add("title-container");

        const h2 = document.createElement('h2');
        h2.setAttribute("lang", "en");
        h2.innerText = this.title;

        const pLikes = document.createElement('p');

        const span = document.createElement('span');
        span.classList.add('likes-number');
        span.innerText = this.likes;

        const heartIcon = document.createElement('span');
        heartIcon.classList.add('fa-regular');
        heartIcon.classList.add('fa-heart');
        heartIcon.setAttribute("role", "button");
        heartIcon.setAttribute("aria-label", "like");
        heartIcon.setAttribute("tabindex", "0");
        if (this.isLiked) {
            heartIcon.classList.add("liked");
        }

        //Update "likes" numbers and change heart button appearance when a medium is liked + event listeners

        const likesNumberHandling = () => {
            const totalLikesCounter = document.querySelector(".likes-number");

            if (heartIcon.classList.contains("liked")) {
                heartIcon.classList.remove("liked");
                this._likes -= 1;
                span.innerText = this.likes;
                this.isLiked = false;
                //Update total "likes" number on page
                totalLikesCounter.innerText = Number(totalLikesCounter.innerText) - 1;
            } else {
                heartIcon.classList.add("liked");
                this._likes += 1;
                span.innerText = this.likes;
                this.isLiked = true;
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

        return article;
    }
}

class ImageFactory extends MediaFactory {
    constructor(medium, photographer) {
        super(medium, photographer);
        this._image = medium.image;
    }

    get fullImage() {
        return `assets/media/${this.photographerName}_${this.photographerId}/${this._image}`;
    }

    get thumbnailImage() {
        let fileName = this._image.slice(0, this._image.lastIndexOf("."));
        fileName += "_thumbnail.jpg";
        return `assets/media/${this.photographerName}_${this.photographerId}/${fileName}`;
    }

    get mediaReadLabel() {
        return "agrandir l'image";
    }
}

class VideoFactory extends MediaFactory {
    constructor(medium, photographer) {
        super(medium, photographer);
        this._video = medium.video;
    }

    get fullVideo() {
        return `assets/media/${this.photographerName}_${this.photographerId}/${this._video}`;
    }

    get thumbnailImage() {
        let fileName = this._video.slice(0, this._video.lastIndexOf("."));
        fileName += "_thumbnail.jpg";
        return `assets/media/${this.photographerName}_${this.photographerId}/${fileName}`;
    }

    get mediaReadLabel() {
        return "lire la vidéo";
    }
}