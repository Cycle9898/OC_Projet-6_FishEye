//Display fetched data for testing purpose

function getPhotographerId() {
    const urlParams = (new URL(document.location)).searchParams;
    const photographerId = urlParams.get('id');

    console.log(photographerId);
}

getPhotographerId();