//Create photographer card on homepage

class PhotographerFactory {
    constructor(data) {
        this._name = data.name;
        this._portrait = data.portrait;

        this._picture = `assets/photographers/${this._portrait}`;
    }

    getUserCardDOM() {
        const article = document.createElement('article');
        const img = document.createElement('img');
        img.setAttribute("src", this.picture)
        const h2 = document.createElement('h2');
        h2.textContent = this.name;
        article.appendChild(img);
        article.appendChild(h2);
        return (article);
    }

    get name() {
        return this._name;
    }

    get picture() {
        return this._picture;
    }
}