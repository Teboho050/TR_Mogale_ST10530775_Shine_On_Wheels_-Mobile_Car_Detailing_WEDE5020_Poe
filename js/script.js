
// Step 1 - Check if JavaScript is connected

console.log("script.js is connected!");


// Step 2 - Create variables

const shopName = "Shine On Wheelz";
const itemCount = 8;

let visibleCount = 0;

visibleCount = visibleCount + 1;


// Step 3 - Simple function

function sayHello() {
    console.log("Hello!");
}

sayHello();


// Step 4 - If and else statement

if (itemCount === 0) {
    console.log("Nothing here");
} else {
    console.log("We have items");
}


// Step 5 - Display the current year in the footer

const yearSpan = document.getElementById("year");

if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}


// Step 6 - FAQ section

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(function(item) {

    const question = item.querySelector("h3");

    if (question) {

        // Hide the answers when the page opens
        item.classList.add("closed");

        question.setAttribute("tabindex", "0");
        question.setAttribute("role", "button");
        question.setAttribute("aria-expanded", "false");

        function toggleAnswer() {

            const isClosed = item.classList.toggle("closed");

            if (isClosed) {
                question.setAttribute("aria-expanded", "false");
            } else {
                question.setAttribute("aria-expanded", "true");
            }

        }

        // Open or close the answer when clicked
        question.addEventListener("click", toggleAnswer);

        // Allow keyboard users to open answers
        question.addEventListener("keydown", function(event) {

            if (event.key === "Enter" || event.key === " ") {

                event.preventDefault();
                toggleAnswer();

            }

        });

    }

});


// Step 7 - Product search

const searchInput = document.getElementById("product-search");
const productCards = document.querySelectorAll(".product-card");
const noResults = document.getElementById("no-results");

if (searchInput) {

    searchInput.addEventListener("input", function() {

        const searchText = searchInput.value.toLowerCase();

        let visibleCount = 0;

        productCards.forEach(function(card) {

            const name = card.querySelector("h3");
            const details = card.querySelector(".product-meta");

            let cardText = "";

            if (name) {
                cardText = cardText + name.textContent;
            }

            if (details) {
                cardText = cardText + " " + details.textContent;
            }

            cardText = cardText.toLowerCase();

            if (cardText.includes(searchText)) {

                card.classList.remove("is-hidden");
                visibleCount = visibleCount + 1;

            } else {

                card.classList.add("is-hidden");

            }

        });

        // Display a message if nothing is found
        if (noResults) {

            if (visibleCount === 0) {
                noResults.classList.remove("is-hidden");
            } else {
                noResults.classList.add("is-hidden");
            }

        }

    });

}


// Step 8 - Switch and case statement

const typeSelect = document.getElementById("enq-type");
const typeHint = document.getElementById("type-hint");

function showTypeHint() {

    if (!typeSelect || !typeHint) {
        return;
    }

    let message = "";

    switch (typeSelect.value) {

        case "Enquiry about a service":
            message = "Please tell us which service you are interested in.";
            break;

        case "Enquiry about a product":
            message = "Please tell us the product name and size.";
            break;

        case "I want to volunteer":
            message = "Wonderful! Tell us when you are available and what you enjoy doing.";
            break;

        default:
            message = "Tell us how we can help you today.";

    }

    typeHint.textContent = message;

}

if (typeSelect) {

    typeSelect.addEventListener("change", showTypeHint);

    showTypeHint();

}


// Step 9 - Check if an email address is valid

function isValidEmail(email) {

    const atPosition = email.indexOf("@");
    const lastDotPosition = email.lastIndexOf(".");

    return (
        atPosition > 0 &&
        lastDotPosition > atPosition + 1 &&
        lastDotPosition < email.length - 1 &&
        !email.includes(" ")
    );

}


// Step 10 - Display error messages

function showError(field, message) {

    field.classList.add("input-error");

    const error = document.createElement("span");

    error.className = "error-message";
    error.textContent = message;

    field.parentElement.appendChild(error);

}


// Step 11 - Clear old error messages

function clearErrors(form) {

    form.querySelectorAll(".error-message").forEach(function(error) {

        error.remove();

    });

    form.querySelectorAll(".input-error").forEach(function(field) {

        field.classList.remove("input-error");

    });

}


// Step 12 - Form validation

const forms = document.querySelectorAll("form");

forms.forEach(function(form) {

    const requiredFields = form.querySelectorAll("[required]");

    // Only check forms that have required fields
    if (requiredFields.length === 0) {
        return;
    }

    const successMessage = form.querySelector(".form-success");

    form.addEventListener("submit", function(event) {

        event.preventDefault();

        clearErrors(form);

        if (successMessage) {
            successMessage.classList.add("is-hidden");
        }

        let formIsValid = true;
        let firstBadField = null;

        requiredFields.forEach(function(field) {

            const value = field.value.trim();

            let labelText = field.labels && field.labels.length > 0
                ? field.labels[0].textContent
                : "This field";

            let problem = "";

            if (value === "") {

                problem = labelText + " is required.";

            } else if (field.type === "email" && !isValidEmail(value)) {

                problem = "Please enter a valid email address.";

            }

            if (problem !== "") {

                showError(field, problem);

                formIsValid = false;

                if (firstBadField === null) {
                    firstBadField = field;
                }

            }

        });


        // If all fields are correct
        if (formIsValid) {

            if (successMessage) {
                successMessage.classList.remove("is-hidden");
            }

            form.reset();

            showTypeHint();

        } else {

            // Focus on the first field with an error
            firstBadField.focus();

        }

    });

});


// Step 13 - End of JavaScript

console.log("All JavaScript features are ready!");
