import "./static/css/form.scss";
import Form from "@scripts/Form";

//region Constants
const COLORS = {
    red: "#EB5757",
    gray: "#666666",
};

const form = document.querySelector(".form"),
    toggle = document.querySelector("#toggle"),
    selectElement = document.querySelector("#select"),
    selectInput = selectElement.parentNode.querySelector("input"),
    allOptions = document.querySelector("#options").querySelectorAll("span"),
    textInputs = document.querySelectorAll(".form__input");

const formObject = new Form(form);
//endregion

//region Event Handlers
// Toggle event
(function () {
    let isOn = toggle.parentNode.querySelector("label").innerText === "On" ? true : false;

    toggle.addEventListener("change", (e) => {
        isOn = !isOn;
        toggle.parentNode.querySelector("label").innerText = isOn ? "On" : "Off";
    })
})();

// Select
(function () {
    const selectOptions = document.querySelector("#options");

    //region Utility
    const setOptionsVisible = () => {
        selectOptions.style.display = "flex";
        selectElement.style.border = "2px solid #7A5CFA"
        selectElement.style.borderBottomLeftRadius = "0";
        selectElement.style.borderBottomRightRadius = "0";
    }

    const setOptionsInvisible = () => {
        selectOptions.style.display = "none";
        selectElement.style.border = "1px solid #CCCCCC"
        selectElement.style.borderBottomLeftRadius = "8px";
        selectElement.style.borderBottomRightRadius = "8px";
    }
    //endregion

    // Open selects
    selectElement.addEventListener("click", (e) => {
        let display = selectOptions.style.display;

        if (display === "none") {
            setOptionsVisible();
        } else {
            setOptionsInvisible();
        }
    });

    // Select an option
    allOptions.forEach((element) => {
        element.addEventListener("click", (e) => {
            selectElement.innerHTML = element.innerHTML;
            selectInput.value = element.innerHTML;

            allOptions.forEach((option) => {
                option.classList.remove("selected");
            })
            element.classList.add("selected");

            setOptionsInvisible();
        })
    })
})();

// Display errors in text inputs if needed
textInputs.forEach((input) => {
    const inputObject = formObject.inputs[input.name];
    const errorNode = input.parentNode.parentNode.querySelector("span");

    if (errorNode) {
        const defaultMessage = errorNode.innerHTML;

        //region Utility
        /**
         * Sets error message and appropriate styles
         */
        const setError = () => {
            errorNode.innerText = inputObject.error;
            errorNode.style.color = COLORS.red;
        }

        /**
         * Sets default message and appropriate styles
         */
        const resetError = () => {
            errorNode.innerText = defaultMessage;
            errorNode.style.color = COLORS.gray;
        }
        //endregion

        //region Event Handlers
        input.addEventListener("blur", (e) => {
            if (input.value.length > 0) {
                if (!inputObject.isValid) {
                    setError();
                } else {
                    resetError();
                }
            }
        })

        input.addEventListener("change", (e) => {
            resetError();
        })
        //endregion
    }
})

// Handle form submission
form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Check if form is valid
    formObject.validate();
    if (formObject.isValid) {
        console.log("form is valid");
    }
})
//endregion