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

        const link = document.createElement('a');
        link.setAttribute("href", `photographer.html?id=${this.photographerId}`);
        link.setAttribute("aria-label", `Lien vers la page de ${this.name}`);

        const img = document.createElement('img');
        img.setAttribute("src", this.portrait);
        img.setAttribute("alt", "");

        const h2 = document.createElement('h2');
        h2.textContent = this.name;

        const pLocation = document.createElement('p');
        pLocation.classList.add("location");
        pLocation.innerText = this.location;

        const pTagline = document.createElement('p');
        pTagline.classList.add("tagline");
        pTagline.innerText = this.tagline;

        const pPrice = document.createElement('p');
        pPrice.classList.add("price");
        pPrice.innerText = this.price;

        link.appendChild(img);
        link.appendChild(h2);
        article.appendChild(link);
        article.appendChild(pLocation);
        article.appendChild(pTagline);
        article.appendChild(pPrice);

        return (article);
    }

    get name() {
        return this._name;
    }

    get photographerId() {
        return this._id;
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

    get portrait() {
        return `assets/photographers/${this._portrait}`;
    }
}