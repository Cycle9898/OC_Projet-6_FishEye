import { PhotographerFactory } from "../factories/PhotographerFactory.js";
import { getPhotographersData } from "../utils/globalFunctions.js";

//Display collected data

function displayData(photographers) {
	const photographersSection = document.querySelector(
		".photographer-section"
	);

	photographers.forEach(photographer => {
		const photographerModel = new PhotographerFactory(photographer);
		const userCardDOM = photographerModel.getUserCardDOM();
		photographersSection.appendChild(userCardDOM);
	});
}

//Main function to build homepage

async function init() {
	//Retrieve photographers' data and display it on homepage
	const photographersData = await getPhotographersData();
	displayData(photographersData.photographers);
}

init();
