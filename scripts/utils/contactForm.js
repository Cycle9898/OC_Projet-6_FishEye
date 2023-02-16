//DOM elements

const modal = document.getElementById("contact-modal");

const mainHeader = document.querySelector("#header");
const mainTag = document.querySelector("main");
const body = document.querySelector("body");

const formInputs = document.querySelectorAll("form input, form textarea");
const errorMessages = document.querySelectorAll("form .error-message");

const confirmationMessage = document.getElementById("confirmation-message");
const modalHeaderH1 = document.querySelector(".modal header h1");
const modalForm = document.querySelector(".modal form");

const firstFocusOnModal = document.querySelector(".modal header img");
const lastFocusOnModal = document.querySelector(".modal form button");

//Launch contact modal

function displayModal() {
    modal.style.display = "block";
    modal.setAttribute("aria-hidden", "false");
    mainHeader.setAttribute("aria-hidden", "true");
    mainTag.setAttribute("aria-hidden", "true");
    body.style.overflow = "hidden";
    firstFocusOnModal.focus();
}

//Close contact modal and reset default style

function closeModal() {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    mainHeader.removeAttribute("aria-hidden");
    mainTag.removeAttribute("aria-hidden");
    body.removeAttribute("style");
    mainHeader.querySelector(".logo").focus();
    document.querySelector("form").reset();
    formInputs.forEach(input => input.removeAttribute("style"));
    formInputs.forEach(input => input.removeAttribute("aria-invalid"));
    formInputs.forEach(input => input.removeAttribute("data-error-visible"));
    errorMessages.forEach(errorMessage => errorMessage.removeAttribute("style"));
    [modalHeaderH1, modalForm, confirmationMessage].forEach(element => {
        element.removeAttribute("style");
        element.removeAttribute("aria-hidden");
    });
}

//Close modal event listener when "Enter" key on close button or "Escape" key is pressed or a click out of the form

modal.addEventListener("click", event => {
    if (event.target == event.currentTarget) {
        closeModal();
    }
});

modal.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeModal();
    }
});

firstFocusOnModal.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        closeModal();
    }
});

//Keyboard focus management on modal

modal.addEventListener("keydown", event => {
    if (!(event.key === 'Tab')) {
        return;
    }

    if (event.shiftKey) {  //when shift + tab is pressed
        if (document.activeElement === firstFocusOnModal) {
            lastFocusOnModal.focus();
            event.preventDefault();
        }
    } else {  //when tab is pressed
        if (document.activeElement === lastFocusOnModal) {
            firstFocusOnModal.focus();
            event.preventDefault();
        }
    }
});

//Check if an input is valid according to its "type" attribute and display or not error message

function checkForm(input) {
    const hideErrorMessage = () => {
        input.style.borderColor = "transparent";
        input.setAttribute("aria-invalid", "false");
        input.setAttribute("data-error-visible", "false");
        input.parentNode.querySelector(".error-message").style.display = "none";
    }
    const displayErrorMessage = () => {
        input.style.borderColor = "#720000";
        input.setAttribute("aria-invalid", "true");
        input.setAttribute("data-error-visible", "true");
        input.parentNode.querySelector(".error-message").style.display = "block";
    }

    switch (input["type"]) {
        case "email":
            const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,6}$/; //RegExp of valid email

            if (emailPattern.test(input.value)) {
                hideErrorMessage();
            } else {
                displayErrorMessage();
            }

            break;

        case "text":
            if (input.value.length >= 2) {
                hideErrorMessage();
            } else {
                displayErrorMessage();
            }
            break;

        default:
            if (input.value.length >= 10) {
                hideErrorMessage();
            } else {
                displayErrorMessage();
            }
    }

}

//Hide all modal elements and display form confirmation message

function displayConfirmationMessage() {
    modalHeaderH1.style.visibility = "hidden";
    modalHeaderH1.setAttribute("aria-hidden", "true");
    modalForm.style.visibility = "hidden";
    modalForm.setAttribute("aria-hidden", "true");

    confirmationMessage.style.display = "block";
    confirmationMessage.setAttribute("aria-hidden", "false");
    firstFocusOnModal.focus();
}

//Event listeners on all inputs for dynamic checks

formInputs.forEach(formInput => formInput.addEventListener("input", () => checkForm(formInput)));

//Check all inputs and simulate sending data 

function sendForm(event) {
    event.preventDefault();

    formInputs.forEach(formInput => checkForm(formInput));

    //check if error messages are hidden to validate the form
    const allDDataErrorVisibleAttributes = [];
    formInputs.forEach((input) => allDDataErrorVisibleAttributes.push(input.getAttribute("data-error-visible")));

    if (allDDataErrorVisibleAttributes.every((attribute) => attribute === "false")) {
        //simule data sending to the server and display confirmation message
        formInputs.forEach(input => console.log(input.parentNode.querySelector("label").innerText + ": " + input.value));
        displayConfirmationMessage();
    }
}
