export const validateNumber = (inputdata) => {
    const newError = {}; // Object to store validation errors

    // **Phone Number Validation**
    if (!inputdata.phone) {
        newError.phone = "Enter a phone number";
    } else if (!/^\d{11}$/.test(inputdata.phone)) {
        newError.phone = "Enter a valid 10-digit phone number";
    }
    console.log(newError, "---------------newError---------------");

    return newError;
};
