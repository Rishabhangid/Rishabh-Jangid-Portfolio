export const validateLoginData = (inputdata) => {
    const newError = {}; // Object to store validation errors

    // **Email Validation**
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!inputdata.email) {
        newError.email = "Enter email";
    } else if (!emailRegex.test(inputdata.email)) {
        newError.email = "Enter a valid email address";
    }

    // **Password Validation**
    if (!inputdata.password) {
        newError.password = "Enter password";
    } else if (inputdata.password.length < 3 || inputdata.password.length > 25) {
        newError.password = "Password length should be between 3 and 25 characters";
    }

    console.log(newError, "---------------newError---------------");

    return newError; // Return the errors object
};
