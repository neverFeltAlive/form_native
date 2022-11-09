/**
 * Map for all validation functions ( [inputName]:function )
 * Each validating function takes a value as an argument and returns null if 0 errors (an error string otherwise)
 * @type {{}}
 */
export const validators = {
    username: (value) => {
        if (value.length > 0) {
            return null
        }

        return "Username is required"
    },
    pwd: (value) => {
        if (value.length > 0) {
            if (value.length < 4) {
                return "Password is too short"
            } else if (value.length > 12) {
                return "Password is too long"
            }

            return null;
        } else {
            return "Password is required";
        }

        return null;
    },
    text: (value) => {
        if (value.length > 0) {
            return null
        }

        return "Text is required"
    }
}

/**
 * Class used to represent forms and its values
 */
export default class Form {
    /**
     * Constructor of Form class
     * @param form - form node
     * @param validatorsMap - map for validating functions
     */
    constructor(form, validatorsMap = validators) {
        //region Initialize fields
        /**
         * Simple map for all form values ( [inputName]:[inputObject] ).
         * Each inputOpject contains input's value and a boolean isValid field
         * as well as a validator function and an error message
         * @type {{}}
         */
        this.inputs = {};
        this.validators = validatorsMap;
        this.isValid = false;
        //endregion


        //region Process form elements
        const TAG_FILTER = ["INPUT", "SELECT"];
        for (let element of form.elements) {
            if (TAG_FILTER.includes(element.tagName)) {         // check if element is an input or a select
                const currentInput = this.inputs[element.name] = {};

                // Store inputs
                currentInput.value = element.value;
                currentInput.error = null;

                // Set validator
                const hasValidator = this.validators.hasOwnProperty(element.name)
                if (hasValidator) {
                    currentInput.validator = this.validators[element.name];
                    currentInput.error = currentInput.validator(currentInput.value);
                }

                // Add event listner
                element.addEventListener("change", (e) => {
                    // Update value
                    currentInput.value = e.target.value;

                    if (hasValidator){
                        // Use validator and set error message is needed
                        const error = currentInput.validator(currentInput.value);
                        if (error) {
                            currentInput.error = error;
                        } else {
                            currentInput.error = null;
                        }
                    }
                })
            }
        }
        //endregion
    }

    /**
     * Validates all values of the form
     */
    validate() {
        // Check if all inputs are valid
        let isFormValid = true;
        for (let input in this.inputs) {
            if (this.inputs[input].error !== null) {
                isFormValid = false;
            }
        }

        // Change object field and return the result
        return this.isValid = isFormValid;
    }

    /**
     * Returns an object of values ( {[inputName]:[inputValue] }
     */
    getValues() {
        let values = {};
        for (let input in this.inputs) {
            let inputObject = this.inputs[input];
            values[input] = inputObject.value;
        }

        return values;
    }
}