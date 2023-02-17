//Media factory : factory design pattern to create an object according to its type

class MediaFactory {
    constructor(medium, photographer) {
        if (medium.hasOwnProperty("image")) {
            return new ImageMedium(medium, photographer);
        } else if (medium.hasOwnProperty("video")) {
            return new VideoMedium(medium, photographer);
        } else {
            throw "Unknown medium";
        }
    }
}

class ImageMedium {
    constructor(medium, photographer) {
        this._id = medium.id;
        this._photographerId = medium.photographerId;
        this._photographerName = photographer.name;
        this._title = medium.title;
        this._likes = medium.likes;
        this._date = medium.date;
        this._price = medium.price;
        this._image = medium.image;

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

    get fullImage() {
        return `assets/media/${this.photographerName}_${this.photographerId}/${this._image}`;
    }

    get thumbnailImage() {
        const fileName = this._image.slice(0, this._image.lastIndexOf(".")) + "_thumbnail.jpg";
        return `assets/media/${this.photographerName}_${this.photographerId}/${fileName}`;
    }

    get mediaReadLabel() {
        return "agrandir l'image";
    }
}

class VideoMedium {
    constructor(medium, photographer) {
        this._id = medium.id;
        this._photographerId = medium.photographerId;
        this._photographerName = photographer.name;
        this._title = medium.title;
        this._likes = medium.likes;
        this._date = medium.date;
        this._price = medium.price;
        this._video = medium.video;

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

    get fullVideo() {
        return `assets/media/${this.photographerName}_${this.photographerId}/${this._video}`;
    }

    get thumbnailImage() {
        const fileName = this._video.slice(0, this._video.lastIndexOf(".")) + "_thumbnail.jpg";
        return `assets/media/${this.photographerName}_${this.photographerId}/${fileName}`;
    }

    get mediaReadLabel() {
        return "lire la vidéo";
    }
}