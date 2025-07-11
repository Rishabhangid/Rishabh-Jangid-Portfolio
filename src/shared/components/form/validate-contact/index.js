export const validateContactData = (inputdata) => {
    const newError = {}; // Object to store validation errors

    // **FirstName Validation**
    if (!inputdata.name) {
        newError.name = "Enter first name";
    } else if (inputdata.name.length < 3 || inputdata.name.length > 15) {
        newError.name = "name should be between 3 and 15 characters";
    }

    // **Email Validation**
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!inputdata.email) {
        newError.email = "Enter an email";
    } else if (!emailRegex.test(inputdata.email)) {
        newError.email = "Enter a valid email address";
    }

    if (!inputdata.phone) {
        newError.phone = "Enter a phone number";
    } else if (!/^\d{11,12}$/.test(inputdata.phone)) {
        newError.phone = "Enter a valid 11 or 12-digit phone number";
    }

    console.log(newError, "---------------newError---------------");

    return newError; // Return the errors object
};
