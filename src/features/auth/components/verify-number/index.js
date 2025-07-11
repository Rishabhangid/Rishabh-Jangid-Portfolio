// import React, { useState } from 'react'
// import { FaEye } from "react-icons/fa";
// import { InputFeilds, SecondaryButton } from '../../../../shared';
// import { Link, useNavigate } from 'react-router-dom';
// import GREENBGLOGO from "../../../../assets/images/logo/logo-green-bg.png"
// import { loginUser, verifyEmail, verifyNumber, verifyOTP, verifyOTPNumber } from '../../../../api/services/authService';
// import swal from 'sweetalert';
// import Swal from "sweetalert2";
// import { validateLoginData } from '../../../../shared/components/form/validate-user-login';
// import { validateEmail } from '../../../../shared/components/form/validate-email';
// import { validateNumber } from '../../../../shared/components/form/validate-number';
// import PhoneInput from 'react-phone-input-2'
// import 'react-phone-input-2/lib/style.css'







// export const VerifyPhoneNumber = () => {

//     const navigate = useNavigate();
//     const [inputdata, setInputdata] = useState({ phone: "", otp: "" })
//     const [buttonLoading, setButtonLoading] = useState(false)
//     const [showotpfeild, setOtpfeild] = useState(false)
//     const [showerror, setShowError] = useState({});

//     // handling input change
//     const handleChange = (e) => {
//         console.log(inputdata, "---------------inputdata---------------");
//         setInputdata({ ...inputdata, [e.target.name]: e.target.value })
//     }

//     const handlePhoneChange = (value) => {
//         setInputdata({ ...inputdata, phone: value });
//         console.log(inputdata, "---------------inputdata---------------");
//     };

//     // handling send otp
//     const sendOTP = async (e) => {
//         e.preventDefault()
//         setOtpfeild(true)
//         setButtonLoading(true)
//         try {

//             // validating email
//             // const errors = validateNumber(inputdata);
//             // console.log(errors, "---------------error ********---------------");
//             // setShowError(errors)
//             // console.log(showerror, "---------------%%%%%%error---------------");
//             // if (Object.keys(errors).length > 0) {
//             //     Swal.fire({
//             //         title: "Fill form correctly",
//             //         html: Object.values(errors).map(err => `<p>${err}</p>`).join(""), // Show errors in new lines
//             //         icon: "warning",
//             //         confirmButtonColor: "#014308",
//             //     });
//             //     setButtonLoading(false);
//             //     return;
//             // }


//             const userToken = localStorage.getItem('temporary_token');
//             console.log(userToken, "******************88");
//             const formData = {
//                 phone: inputdata.phone,
//                 temporary_token: userToken
//             }
//             const verify_email = await verifyNumber(formData)
//             const verifyData = verify_email?.data;
//             console.log(verifyData.otp, "---------------verifyData otpppppp---------------");
//             setInputdata({ otp: verifyData.otp })
//             if (verifyData?.success) {
//                 Swal.fire({
//                     title: "Success",
//                     text: "OTP Send",
//                     timer: 1000,
//                     timerProgressBar: true,
//                     icon: "success",
//                     showConfirmButton: false,
//                     confirmButtonColor: "#014308",
//                 });
//                 // localStorage.setItem('userToken', verifyData?.token);
//                 // navigate("/")
//             }
//         }
//         catch (error) {
//             console.log(error, "---------------error---------------");

//             // Extract validation errors
//             const errors = error?.errors || [{ message: "Something went wrong" }];

//             // Join all error messages into a single string
//             const errorMessage = errors.map(err => err.message).join("\n");

//             Swal.fire({
//                 title: "Error",
//                 text: errorMessage, // Show all errors in alert
//                 icon: "error"
//             });
//         }
//         finally {
//             setButtonLoading(false)
//         }
//     }

//     // handling verify otp
//     const handleVerifyOtp = async (e) => {
//         e.preventDefault()
//         setButtonLoading(true)
//         try {
//             const errors = validateNumber(inputdata);
//             console.log(errors, "---------------error ********---------------");
//             setShowError(errors)
//             console.log(showerror, "---------------%%%%%%error---------------");

//             // **If there are errors, stop execution & show alerts**
//             if (Object.keys(errors).length > 0) {
//                 Swal.fire({
//                     title: "Fill form correctly",
//                     html: Object.values(errors).map(err => `<p>${err}</p>`).join(""), // Show errors in new lines
//                     icon: "warning",
//                     confirmButtonColor: "#014308",
//                 });
//                 setButtonLoading(false);
//                 return;
//             }



//             const formData = {
//                 phone: inputdata.phone,
//                 otp: inputdata.otp,
//                 temporary_token: localStorage.getItem('temporary_token')
//             }
//             const verify_otp = await verifyOTPNumber(formData)
//             const verifyUserOTP = verify_otp?.data;
//             if (verifyUserOTP?.success) {
//                 Swal.fire({
//                     title: "Success",
//                     text: "OTP Verified",
//                     timer: 1000,
//                     timerProgressBar: true,
//                     icon: "success",
//                     showConfirmButton: false,
//                     confirmButtonColor: "#014308",
//                 });
//                 // dispatch(setUser(response?.data));
//                 setInputdata({ email: "", password: "" });
//                 navigate("/")
//             }
//         }
//         catch (error) {
//             console.log(error, "---------------error---------------");

//             // Extract validation errors
//             const errors = error?.errors || [{ message: "Something went wrong" }];

//             // Join all error messages into a single string
//             const errorMessage = errors.map(err => err.message).join("\n");

//             Swal.fire({
//                 title: "Error",
//                 text: errorMessage, // Show all errors in alert
//                 icon: "error"
//             });
//         }
//         finally {
//             setButtonLoading(false)
//         }
//     }





//     return (
//         <div className='bg-white flex flex-col gap-4 items-start pt-16 px-16 h-[100%]'>
//             {/* welcome text */}
//             <div className='flex flex-col gap-1'>
//                 <img src={GREENBGLOGO} alt="logo-green-bg" className='block m-auto md:hidden w-[150px]' />
//                 <h1 className="text-registerheading text-3xl md:text-5xl text-center md:text-start">Verify Phone Nummber</h1>
//                 <p className='text-registerheading text-[18px] md:text-xl text-center md:text-start'>An otp will be send to your registered mobile number</p>
//                 <p className='text-registerheading text-[18px]'>Having Issue ? <Link to="/register" className='text-primary underline decoration-1 underline-offset-2'>Contact Us</Link></p>
//             </div>

//             <form className='flex flex-col gap-6'>

//                 {/* phone number otp verification */}
//                 <div className='flex flex-col gap-2 w-full'>
//                     {/* <InputFeilds label="Email" type="email" placeholder="Enter your email" value={inputdata.email} onChange={handleChange} /> */}
//                     <label className="font-medium">Phone Number Verification</label>
//                     {/* <input
//                         type="type"
//                         placeholder="Enter phone number"
//                         name="phone"
//                         value={inputdata.email}
//                         onChange={handleChange}
//                         className="text-mainheading bg-white border-2 rounded-lg p-2 w-full sm:w-[300px] md:w-[400px] lg:w-[500px] xl:w-[600px] 
//                max-w-[90vw] focus:outline-none  focus:ring-2 focus:ring-primary"
//                     /> */}
//                     <PhoneInput
//                         className=""
//                         country={'in'}
//                         value={inputdata.phone}
//                         name="phone"
//                         onChange={handlePhoneChange}
//                         containerClass="w-full"
//                         inputClass="form-control"
//                         buttonClass="bg-gray-200 border-r-2 border-gray-300 rounded-l-lg"
//                     />
//                     <button onClick={sendOTP} className="font-subheading bg-primary text-xs px-5 py-3 max-w-[100px] text-white mt-3 rounded-full">Send OTP</button>
//                 </div>

//                 {/* email address otp verification */}
//                 <div className='flex flex-col gap-2 w-full'>
//                     {/* <InputFeilds label="Email" type="email" placeholder="Enter your email" value={inputdata.email} onChange={handleChange} /> */}
//                     <label className="font-medium">Verify Email Address</label>
//                     <input
//                         type="number"
//                         placeholder="Enter phone number"
//                         name="phone"
//                         value={inputdata.email}
//                         onChange={handleChange}
//                         className="text-mainheading bg-white border-2 rounded-lg p-2 w-full sm:w-[300px] md:w-[400px] lg:w-[500px] xl:w-[600px] 
//                max-w-[90vw] focus:outline-none  focus:ring-2 focus:ring-primary"
//                     />

//                     <button onClick={sendOTP} className="font-subheading bg-primary text-xs px-5 py-3 max-w-[100px] text-white mt-3 rounded-full">Send OTP</button>
//                 </div>

//                 {/* otp */}
//                 {showotpfeild && (
//                     <>
//                         <div className='flex flex-col gap-2 w-full'>
//                             <label className="font-medium">OTP</label>
//                             <input
//                                 type="number"
//                                 placeholder="Enter one-time password"
//                                 name="otp"
//                                 value={inputdata.otp}
//                                 onChange={handleChange}
//                                 className="text-mainheading bg-white border-2 rounded-lg p-2 w-full sm:w-[300px] md:w-[400px] lg:w-[500px] xl:w-[600px] 
//                            max-w-[90vw] focus:outline-none focus:ring-2 focus:ring-primary"
//                             />
//                         </div>

//                         <button
//                             className="font-subheading bg-primary px-12 py-3 max-w-[350px] text-white mt-3 rounded-full"
//                             onClick={handleVerifyOtp}
//                         >
//                             Verify
//                         </button>
//                     </>
//                 )}


//             </form>
//         </div>
//     )
// }


import React, { useEffect, useState } from 'react'
import { FaEye } from "react-icons/fa";
import { InputFeilds, SecondaryButton } from '../../../../shared';
import { Link, useNavigate } from 'react-router-dom';
import GREENBGLOGO from "../../../../assets/images/logo/logo-green-bg.png"
import { loginUser, verifyEmail, verifyNumber, verifyOTP, verifyOTPNumber } from '../../../../api/services/authService';
import swal from 'sweetalert';
import Swal from "sweetalert2";
import { validateLoginData } from '../../../../shared/components/form/validate-user-login';
import { validateEmail } from '../../../../shared/components/form/validate-email';
import { validateNumber } from '../../../../shared/components/form/validate-number';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useSelector } from 'react-redux';







export const VerifyPhoneNumber = () => {

    const emailOTP = useSelector((state) => state.auth.email_otp)
    const phoneOTP = useSelector((state) => state.auth.phone_otp)
    const phoneNumber = useSelector((state) => state.auth.phoneNumber)
    const emailAddress = useSelector((state) => state.auth.emailAddress)
    const navigate = useNavigate();
    const [inputdata, setInputdata] = useState({ phone: "", otp: "", phoneotp: "", emailotp: "" })
    useEffect(() => {
        setInputdata((prevState) => ({
            ...prevState,
            phoneotp: phoneOTP,
            emailotp: emailOTP
        }));
    }, [phoneOTP, emailOTP]);

    const [buttonLoading, setButtonLoading] = useState(false)
    const [showotpfeild, setOtpfeild] = useState(false)
    const [showerror, setShowError] = useState({});

    // handling input change
    const handleChange = (e) => {
        console.log(inputdata, "---------------inputdata---------------");
        setInputdata({ ...inputdata, [e.target.name]: e.target.value })
    }

    const handlePhoneChange = (value) => {
        setInputdata({ ...inputdata, phone: value });
        console.log(inputdata, "---------------inputdata---------------");
    };

    // handling send otp
    const sendOTP = async (e) => {
        e.preventDefault()
        setOtpfeild(true)
        setButtonLoading(true)
        try {

            // validating email
            // const errors = validateNumber(inputdata);
            // console.log(errors, "---------------error ********---------------");
            // setShowError(errors)
            // console.log(showerror, "---------------%%%%%%error---------------");
            // if (Object.keys(errors).length > 0) {
            //     Swal.fire({
            //         title: "Fill form correctly",
            //         html: Object.values(errors).map(err => `<p>${err}</p>`).join(""), // Show errors in new lines
            //         icon: "warning",
            //         confirmButtonColor: "#014308",
            //     });
            //     setButtonLoading(false);
            //     return;
            // }


            const userToken = localStorage.getItem('temporary_token');
            console.log(userToken, "******************88");
            const formData = {
                phone: inputdata.phone,
                temporary_token: userToken
            }
            const verify_email = await verifyNumber(formData)
            const verifyData = verify_email?.data;
            console.log(verifyData.otp, "---------------verifyData otpppppp---------------");
            setInputdata({ otp: verifyData.otp })
            if (verifyData?.success) {
                Swal.fire({
                    title: "Success",
                    text: "OTP Send",
                    timer: 1000,
                    timerProgressBar: true,
                    icon: "success",
                    showConfirmButton: false,
                    confirmButtonColor: "#014308",
                });
                // localStorage.setItem('userToken', verifyData?.token);
                // navigate("/")
            }
        }
        catch (error) {
            console.log(error, "---------------error---------------");

            // Extract validation errors
            const errors = error?.errors || [{ message: "Something went wrong" }];

            // Join all error messages into a single string
            const errorMessage = errors.map(err => err.message).join("\n");

            Swal.fire({
                title: "Error",
                text: errorMessage, // Show all errors in alert
                icon: "error"
            });
        }
        finally {
            setButtonLoading(false)
        }
    }

    // handling verify otp
    const handleVerifyOtp = async (e) => {
        e.preventDefault()
        setButtonLoading(true)
        try {

            // for phone number
            const formData1 = {
                phone: phoneNumber,
                otp: inputdata.phoneotp,
                temporary_token: localStorage.getItem('temporary_token')
            }
            // for email 
            const formData2 = {
                email: emailAddress,
                otp: inputdata.emailotp,
                temporary_token: localStorage.getItem('temporary_token')
            }
            const verify_otp = await verifyOTPNumber(formData1)
            const verifyUserOTP = verify_otp?.data;
            if (verifyUserOTP?.success) {

                const verify_email_otp = await verifyOTPNumber(formData1)
                const verifyUserOTP = verify_email_otp?.data;
                if (verifyUserOTP?.success) {
                    Swal.fire({
                        title: "Success",
                        text: "OTP Verified",
                        timer: 2000,
                        timerProgressBar: true,
                        icon: "success",
                        showConfirmButton: false,
                        confirmButtonColor: "#014308",
                    });
                    navigate("/")
                }

            }
        }
        catch (error) {
            console.log(error, "---------------error---------------");

            // Extract validation errors
            const errors = error?.errors || [{ message: "Something went wrong" }];

            // Join all error messages into a single string
            const errorMessage = errors.map(err => err.message).join("\n");

            Swal.fire({
                title: "Error",
                text: errorMessage, // Show all errors in alert
                icon: "error"
            });
        }
        finally {
            setButtonLoading(false)
        }
    }








    return (
        <div className='bg-white flex flex-col gap-4 items-start pt-16 px-16 h-[100%]'>
            {/* welcome text */}
            <div className='flex flex-col gap-1'>
                <img src={GREENBGLOGO} alt="logo-green-bg" className='block m-auto md:hidden w-[150px]' />
                <h1 className="text-registerheading text-3xl md:text-5xl text-center md:text-start">Verify Phone Nummber</h1>
                <p className='text-registerheading text-[18px] md:text-xl text-center md:text-start'>An otp will be send to your registered mobile number and email</p>
                <p className='text-registerheading text-[18px]'>Having Issue ? <Link to="/register" className='text-primary underline decoration-1 underline-offset-2'>Contact Us</Link></p>
            </div>

            <form className='flex flex-col gap-6'>



                {/* email address verification */}
                <div className='flex flex-col gap-2 w-full'>
                    <label className="font-medium">Email Address Verification</label>
                    <div>
                        <input
                            type="number"
                            placeholder="Enter one-time password"
                            name="emailotp"
                            value={inputdata.emailotp}
                            onChange={handleChange}
                            className="text-mainheading bg-white border-2 rounded-lg p-2 w-full sm:w-[300px] md:w-[400px] lg:w-[500px] xl:w-[600px] 
                           max-w-[90vw] focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                </div>
                {/* <button
                    className="font-subheading bg-primary px-5 py-3 max-w-[350px] text-white text-sm  rounded-full"
                    onClick={handleVerifyOtp}
                >
                    Verify Phone Number
                </button> */}

                {/* phone number verification */}
                <div className='flex flex-col gap-2 w-full'>
                    <label className="font-medium">Phone Number Verification <span className='bg-green-600 text-white rounded-lg p-1'>verified</span></label>
                    <input
                        type="number"
                        placeholder="Enter one-time password"
                        name="phoneotp"
                        value={inputdata.phoneotp}
                        onChange={handleChange}
                        className="text-mainheading bg-white border-2 rounded-lg p-2 w-full sm:w-[300px] md:w-[400px] lg:w-[500px] xl:w-[600px] 
                           max-w-[90vw] focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <button
                    className="font-subheading bg-primary px-5 py-3 max-w-[350px] text-white text-sm  rounded-full"
                    onClick={handleVerifyOtp}
                >
                    Verify Phone Number
                </button>




            </form>
        </div >
    )
}



