//DOM elements

//mainHeader, mainTag and body DOM elements are declared in contactForm.js
const lightBox = document.getElementById("light-box-modal");

const lightBoxCloseBtn = document.querySelector("#close-light-box");
const lightBoxNextBtn = document.querySelector("#next-light-box");
const lightBoxPreviousBtn = document.querySelector("#previous-light-box");

//Launch light box modal with the selected medium

function launchLightBox(currentMediumId) {
    displayInLightBox(createdMediaObjects, currentMediumId);
    lightBox.style.display = "block";
    lightBox.setAttribute("aria-hidden", "false");
    mainHeader.setAttribute("aria-hidden", "true");
    mainTag.setAttribute("aria-hidden", "true");
    body.style.overflow = "hidden";
    lightBoxCloseBtn.focus();
}

//Close light box modal and reset default style

function closeLightBox() {
    lightBox.style.display = "none";
    lightBox.setAttribute("aria-hidden", "true");
    mainHeader.removeAttribute("aria-hidden");
    mainTag.removeAttribute("aria-hidden");
    body.removeAttribute("style");
    mainHeader.querySelector(".logo").focus();
    lightBox.querySelector(".light-box-view").innerHTML = "";
}

//Close light box when "Escape" key is pressed or "Enter" key on close button

lightBox.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeLightBox();
    }
});

lightBoxCloseBtn.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        closeLightBox();
    }
});

//Keyboard focus management on light box

lightBox.addEventListener("keydown", event => {
    if (!(event.key === 'Tab')) {
        return;
    }

    if (event.shiftKey) {  //when shift + tab is pressed
        if (document.activeElement === lightBoxCloseBtn) {
            lightBoxPreviousBtn.focus();
            event.preventDefault();
        }
    } else {  //when tab is pressed
        if (document.activeElement === lightBoxPreviousBtn) {
            lightBoxCloseBtn.focus();
            event.preventDefault();
        }
    }
});

//Function that load all media into the light box and display the selected one 

function displayInLightBox(media, currentMediumId) {
    media.forEach(medium => {
        const lightBoxView = document.querySelector("#light-box-modal .light-box-view");

        const li = document.createElement("li");
        li.classList.add("built-medium-container");
        if (medium.mediumId === currentMediumId) {
            li.style.display = "block";
        } else {
            li.style.display = "none";
        }

        if (medium instanceof VideoFactory) {
            const videoTag = document.createElement("video");
            videoTag.setAttribute("controls", "");
            videoTag.setAttribute("src", `${medium.fullVideo}`);
            videoTag.setAttribute("tabindex", "2");

            li.appendChild(videoTag);

        } else {
            const imageTag = document.createElement("img");
            imageTag.setAttribute("src", `${medium.fullImage}`);
            imageTag.setAttribute("alt", `${medium.title}`);

            li.appendChild(imageTag);
        }

        const h1 = document.createElement("h1");
        h1.innerText = medium.title;

        li.appendChild(h1);
        lightBoxView.appendChild(li);
    });
}

//Function to display previous or next medium

function changeLightBoxMedium(direction) {
    const mediaArray = Array.from(lightBox.querySelectorAll(".built-medium-container"));
    const arrayMaxIndex = mediaArray.length - 1;

    for (builtMedium of mediaArray) {
        if (builtMedium.style.display === "block") {
            builtMedium.style.display = "none";

            const currentIndex = mediaArray.indexOf(builtMedium);
            switch (direction) {
                case "previous":
                    if (currentIndex === 0) {
                        mediaArray[arrayMaxIndex].style.display = "block";
                    } else {
                        mediaArray[currentIndex - 1].style.display = "block";
                    }
                    break;

                case "next":
                    if (currentIndex === arrayMaxIndex) {
                        mediaArray[0].style.display = "block";
                    } else {
                        mediaArray[currentIndex + 1].style.display = "block";
                    }
                    break;

                default:
                    throw "Unknown direction";
            }
            break;
        }
    }
}

//Display previous or next medium when an arrow key is pressed or "Enter" key on arrow buttons

lightBox.addEventListener("keydown", event => {
    if (event.key === "ArrowLeft") {
        changeLightBoxMedium("previous");
    }
});

lightBoxPreviousBtn.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        changeLightBoxMedium("previous");
    }
});

lightBox.addEventListener("keydown", event => {
    if (event.key === "ArrowRight") {
        changeLightBoxMedium("next");
    }
});

lightBoxNextBtn.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        changeLightBoxMedium("next");
    }
});