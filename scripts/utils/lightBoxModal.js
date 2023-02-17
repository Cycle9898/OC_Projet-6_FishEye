//DOM elements

//mainHeader, mainTag and body DOM elements are declared in contactForm.js
const lightBox = document.getElementById("light-box-modal");

const lightBoxCloseBtn = document.querySelector("#close-light-box");
const lightBoxNextBtn = document.querySelector("#next-light-box");
const lightBoxPreviousBtn = document.querySelector("#previous-light-box");

//Launch light box modal with the selected medium

function launchLightBox(currentMediumId) {
    lightBox.style.display = "block";
    displayInLightBox(currentMediumId);
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
    const lightBoxViewItems = Array.from(document.querySelectorAll(".light-box-view .built-medium-container"));
    lightBoxViewItems.filter(item => item.style.display === "block")
        .forEach(item => item.style.display = "none");

    mainHeader.removeAttribute("aria-hidden");
    mainTag.removeAttribute("aria-hidden");
    body.removeAttribute("style");
    mainHeader.querySelector(".logo").focus();
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

//Load all media into the light box

function loadLightBox(media) {
    media.forEach(medium => {
        //DOM element
        const lightBoxView = document.querySelector("#light-box-modal .light-box-view");

        //Build light box view
        const li = document.createElement("li");
        li.classList.add("built-medium-container");
        li.style.display = "none";
        li.setAttribute("data-id", medium.mediumId);

        if (medium instanceof VideoMedium) {
            const videoTag = document.createElement("video");
            videoTag.setAttribute("controls", "");
            videoTag.setAttribute("tabindex", "2");

            const videoSource = document.createElement("source");
            videoSource.setAttribute("src", `${medium.fullVideo}`);
            videoSource.setAttribute("type", "video/mp4");

            const altP = document.createElement("p");
            altP.setAttribute("lang", "en");
            altP.innerText = `${medium.title}`;

            //AppendChild()
            videoTag.appendChild(videoSource);
            videoTag.appendChild(altP);
            li.appendChild(videoTag);

        } else {
            const imageTag = document.createElement("img");
            imageTag.setAttribute("src", `${medium.fullImage}`);
            imageTag.setAttribute("alt", `${medium.title}`);

            //AppendChild()
            li.appendChild(imageTag);
        }

        const h1 = document.createElement("h1");
        h1.setAttribute("lang", "en");
        h1.innerText = medium.title;

        //AppendChild()
        li.appendChild(h1);
        lightBoxView.appendChild(li);
    });
}

//Display the selected medium in the light box

function displayInLightBox(mediumId) {
    //DOM elements array
    const lightBoxViewItems = Array.from(document.querySelectorAll(".light-box-view .built-medium-container"));

    lightBoxViewItems.find(item => item.getAttribute("data-id") == mediumId).style.display = "block";
}

//Display previous or next medium

function changeLightBoxMedium(direction) {
    //Make an array with .light-box-view nodes list
    const lightBoxViewItems = Array.from(lightBox.querySelectorAll(".light-box-view .built-medium-container"));
    const arrayMaxIndex = lightBoxViewItems.length - 1;

    //Find current displayed item then hide it and display another one
    const currentDisplayedItem = lightBoxViewItems.find(item => item.style.display === "block");
    const currentIndex = lightBoxViewItems.indexOf(currentDisplayedItem);

    currentDisplayedItem.style.display = "none";

    switch (direction) {
        case "previous":
            if (currentIndex === 0) {
                lightBoxViewItems[arrayMaxIndex].style.display = "block";
            } else {
                lightBoxViewItems[currentIndex - 1].style.display = "block";
            }
            break;

        case "next":
            if (currentIndex === arrayMaxIndex) {
                lightBoxViewItems[0].style.display = "block";
            } else {
                lightBoxViewItems[currentIndex + 1].style.display = "block";
            }
            break;

        default:
            throw "Unknown direction";
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