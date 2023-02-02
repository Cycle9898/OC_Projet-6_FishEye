//Function to fetch photographers' data

async function getPhotographers(targetedData) {
    return await fetch("data/photographers.json").then(response => {
        if (response.ok) {
            return response.json();
        } else {
            console.error("Network error, code : " + response.status);

            const photographersSection = document.querySelector(".photographer_section");
            photographersSection.innerText = "Erreur réseau lors de la récupération des données";
            photographersSection.style.color = "red"
        }
    })
        .then(json => json[targetedData])
        .catch(error => {
            console.error(error)
        });
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
    const photographers = await getPhotographers("photographers");
    displayData(photographers);
};

init();