//Create photographer card on homepage

class PhotographerFactory {
    constructor(data) {
        this._name = data.name;
        this._id = data.id;
        this._city = data.city;
        this._country = data.country;
        this._tagline = data.tagline;
        this._price = data.price;
        this._portrait = data.portrait;
    }

    getUserCardDOM() {
        const article = document.createElement('article');
        const img = document.createElement('img');
        img.setAttribute("src", this.portrait)
        const h2 = document.createElement('h2');
        h2.textContent = this.name;
        article.appendChild(img);
        article.appendChild(h2);
        return (article);
    }

    get name() {
        return this._name;
    }

    get photographerId() {
        return this._id;
    }

    get portrait() {
        return `assets/photographers/${this._portrait}`;
    }

    get location() {
        return `${this._city}, ${this._country}`;
    }

    get tagline() {
        return this._tagline;
    }

    get price() {
        return `${this._price}€/jour`;
    }
}