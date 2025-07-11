export const validateRegisterData = (inputdata) => {
    const newError = {}; // Object to store validation errors

    // **FirstName Validation**
    if (!inputdata.firstname) {
        newError.firstname = "Enter first name";
    } else if (inputdata.firstname.length < 3 || inputdata.firstname.length > 15) {
        newError.firstname = "firstname should be between 3 and 15 characters";
    }

    // **LastName Validation**
    if (!inputdata.lastname) {
        newError.lastname = "Enter last name";
    } else if (inputdata.lastname.length < 3 || inputdata.lastname.length > 15) {
        newError.lastname = "lastname should be between 3 and 15 characters";
    }

    // **Email Validation**
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!inputdata.email) {
        newError.email = "Enter an email";
    } else if (!emailRegex.test(inputdata.email)) {
        newError.email = "Enter a valid email address";
    }

    // // **Phone Number Validation**
    // if (!inputdata.phone) {
    //     newError.phone = "Enter a phone number";
    // } else if (!/^\d{11}$/.test(inputdata.phone)) {
    //     newError.phone = "Enter a valid 10-digit phone number";
    // }
    // **Phone Number Validation**
    if (!inputdata.phone) {
        newError.phone = "Enter a phone number";
    } else if (!/^\d{11,12}$/.test(inputdata.phone)) {
        newError.phone = "Enter a valid 11 or 12-digit phone number";
    }


    // **Password Validation**
    if (!inputdata.password) {
        newError.password = "Enter a password";
    } else if (inputdata.password.length < 3 || inputdata.password.length > 25) {
        newError.password = "Password length should be between 3 and 25 characters";
    }

    // **Confirm Password Validation**
    // if (!inputdata.confirmpass) {
    //     newError.confirmpass = "Please confirm your password";
    // } else if (inputdata.password !== inputdata.confirmpass) {
    //     newError.confirmpass = "Passwords do not match";
    // }
    console.log(newError, "---------------newError---------------");

    return newError; // Return the errors object
};
