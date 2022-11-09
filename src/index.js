import "./static/css/form.scss";

//region Constants
const allInputs = document.querySelectorAll("input, select"),
    passwordInput = document.querySelector("#userpassword"),
    usernameInput = document.querySelector("#username"),
    textInput = document.querySelector("#text"),
    form = document.querySelector(".form"),
    selectElement = document.querySelector("#select"),
    selectOptions = document.querySelector("#options"),
    allOptions = document.querySelectorAll(".form__option");
//endregion

//region Event Handlers
/***
 * Select events
 */
selectElement.addEventListener("click", (e) => {
    let display = selectOptions.style.display;

    if (display === "none"){
        selectOptions.style.display = "flex";
        selectElement.style.border = "2px solid #7A5CFA"
        selectElement.style.borderBottomLeftRadius = "0";
        selectElement.style.borderBottomRightRadius = "0";
    } else {
        selectOptions.style.display = "none";
        selectElement.style.border = "1px solid #CCCCCC"
        selectElement.style.borderBottomLeftRadius = "8px";
        selectElement.style.borderBottomRightRadius = "8px";
    }
});

/**
 * Option events
 */
allOptions.forEach((element) => {
    element.addEventListener("click", (e) => {
        selectElement.innerHTML = element.innerHTML;
        allOptions.forEach((option) => {
            option.classList.remove("selected");
        })
        element.classList.add("selected");
    })
})


/***
 * Password input events
 */
passwordInput.addEventListener("change", (e) => {
    passwordInput.classList.remove("form__errorInput");
    triggerPasswordError("");
})
passwordInput.addEventListener("blur", (e) => {
    if (passwordInput.value.length > 0){
        const passwordErrors = validatePassword(passwordInput.value);
        triggerPasswordError(passwordErrors);
    }
})

/***
 * Form submission event
 */
form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get text values
    const password = passwordInput.value,
        username = usernameInput.value,
        text = textInput.value;

    // Check if text values are provided
    const isComplete = !!password.length && !!username && !!text;
    if (isComplete) {
        // Check if password is of correct length
        const passwordErrors = validatePassword(password);
        if (passwordErrors){
            console.log(passwordErrors);
            return null;
        }

        // Get all values as js object ant parse it to json
        let values = {};
        allInputs.forEach((input) => values[input.name] = input.value);
        values.select = selectElement.innerHTML;

        // Console log values
        console.log(JSON.stringify(values));
    }else {
        console.log("Fields are empty");
    }
})
//endregion

//region Utility
const validatePassword = (password) => {
    if (password.length < 4 || password.length > 12){
        return "Wrong length";
    } else {
        return null
    }
}

const triggerPasswordError = (error) => {
    const errorElement = document.querySelector("#passworderror");
    const defaultMessage = "Your password is between 4 and 12 characters";

    if (error){
        // Change input class
        passwordInput.classList.add("form__errorInput");

        // Change message class
        errorElement.innerHTML = error;
        errorElement.classList.add("form__inputContextError");
    } else {
        // Change input class
        passwordInput.classList.remove("form__errorInput");

        // Change message class
        errorElement.innerHTML = defaultMessage;
        errorElement.classList.remove("form__inputContextError");
    }
}
//endregion