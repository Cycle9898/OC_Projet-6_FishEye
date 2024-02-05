//Create photographer object

export class PhotographerFactory {
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
		//Photograph card on homepage
		const article = document.createElement("article");

		const link = document.createElement("a");
		link.setAttribute(
			"href",
			`photographer.html?id=${this.photographerId}`
		);
		link.setAttribute("aria-label", `Lien vers la page de ${this.name}`);

		const imgPhotographer = document.createElement("img");
		imgPhotographer.setAttribute("src", this.portrait);
		imgPhotographer.setAttribute("alt", `Photo de profil de ${this.name}`);

		const h2Name = document.createElement("h2");
		h2Name.textContent = this.name;

		const pLocation = document.createElement("p");
		pLocation.classList.add("location");
		pLocation.setAttribute("lang", "en");
		pLocation.innerText = this.location;

		const pTagline = document.createElement("p");
		pTagline.classList.add("tagline");
		pTagline.innerText = this.tagline;

		const pPrice = document.createElement("p");
		pPrice.classList.add("price");
		pPrice.innerText = this.price;

		//All appendChild()
		link.appendChild(imgPhotographer);
		link.appendChild(h2Name);
		article.appendChild(link);
		article.appendChild(pLocation);
		article.appendChild(pTagline);
		article.appendChild(pPrice);

		return article;
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
		return `${this._price}€ / jour`;
	}

	get portrait() {
		return `assets/photographers/${this._portrait}`;
	}
}
