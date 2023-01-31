//Function to fetch photographers' data

async function getPhotographers() {
    return await fetch("/data/photographers.json").then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw "Network error: " + response.status;
        }
    })
        .then(json => {
            return json.photographers;
        })
        .catch(error => console.error(error));
}

//Display collected data

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    await photographers.forEach((photographer) => {
        const photographerModel = new PhotographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

//Main function to build homepage

async function init() {
    //Retrieve photographers' data and display it on homepage
    const photographers = await getPhotographers();
    displayData(photographers);
};

init();