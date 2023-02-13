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
    document.querySelector("form").reset();
    formInputs.forEach(formInput => formInput.removeAttribute("style"));
    formInputs.forEach(formInput => formInput.removeAttribute("aria-invalid"));
    errorMessages.forEach(errorMessage => errorMessage.removeAttribute("style"));
    ["style", "aria-hidden"].forEach(attribute => modalHeaderH1.removeAttribute(attribute));
    ["style", "aria-hidden"].forEach(attribute => modalForm.removeAttribute(attribute));
    ["style", "aria-hidden"].forEach(attribute => confirmationMessage.removeAttribute(attribute));
    modal.setAttribute("aria-hidden", "true");
    mainHeader.removeAttribute("aria-hidden");
    mainTag.removeAttribute("aria-hidden");
    body.removeAttribute("style");
    mainHeader.querySelector(".logo").focus();
}

//Call closeModal() when "Escape" key is pressed or "Enter" key on close button

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

//Check if an input is valid according to its "type" attribute

function checkForm(input) {
    switch (input["type"]) {
        case "email":
            const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,6}$/; //RegExp of valid email

            if (emailPattern.test(input.value)) {
                input.style.borderColor = "transparent";
                input.setAttribute("aria-invalid", "false");
                document.getElementById("error-email").style.display = "none";
            } else {
                input.style.borderColor = "#720000";
                input.setAttribute("aria-invalid", "true");
                document.getElementById("error-email").style.display = "block";
            }

            break;

        case "text":

        default:
            if (input.value.length >= 2) {
                input.style.borderColor = "transparent";
                input.setAttribute("aria-invalid", "false");
                input.parentNode.querySelector(".error-message").style.display = "none";
            } else {
                input.style.borderColor = "#720000";
                input.setAttribute("aria-invalid", "true");
                input.parentNode.querySelector(".error-message").style.display = "block";
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
}

//Function warps and event listeners on inputs for dynamic checks

function checkFirstName() { checkForm(formInputs[0]); }
formInputs[0].addEventListener("input", checkFirstName);

function checkLastName() { checkForm(formInputs[1]); }
formInputs[1].addEventListener("input", checkLastName);

function checkEmail() { checkForm(formInputs[2]); }
formInputs[2].addEventListener("input", checkEmail);

function checkMessage() { checkForm(formInputs[3]); }
formInputs[3].addEventListener("input", checkMessage);

//Check all inputs and simulate sending data 

function sendForm(event) {
    event.preventDefault();

    formInputs.forEach(formInput => checkForm(formInput));

    //if form is valid, "send" data to the server and display confirmation message
    const allDisplayAttributes = [];
    errorMessages.forEach((errorMessage) => allDisplayAttributes.push(errorMessage.style.display));

    if (allDisplayAttributes.every((displayAttribute) => displayAttribute === "none")) {
        formInputs.forEach(input => console.log(input.parentNode.querySelector("label").innerText + ": " + input.value));
        displayConfirmationMessage();
    }
}
