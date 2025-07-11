export const validateEmail = (inputdata) => {
    const newError = {}; // Object to store validation errors

    // **Email Validation**
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!inputdata.email) {
        newError.email = "Enter email";
    } else if (!emailRegex.test(inputdata.email)) {
        newError.email = "Enter a valid email address";
    }

  

    console.log(newError, "---------------newError---------------");

    return newError; 
};
