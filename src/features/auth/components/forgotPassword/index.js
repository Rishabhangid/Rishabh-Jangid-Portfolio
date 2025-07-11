import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { InputFeilds, SecondaryButton } from '../../../../shared';
import { Link, useNavigate } from 'react-router-dom';
import GREENBGLOGO from "../../../../assets/images/logo/logo-green-bg.png"
import { loginUser, verifyEmail, verifyOTP } from '../../../../api/services/authService';
import swal from 'sweetalert';
import Swal from "sweetalert2";
import { validateLoginData } from '../../../../shared/components/form/validate-user-login';
import { validateEmail } from '../../../../shared/components/form/validate-email';







export const ForgotPasswordForm = () => {

    const navigate = useNavigate();
    const [inputdata, setInputdata] = useState({ email: "", otp: "" })
    const [buttonLoading, setButtonLoading] = useState(false)
    const [showotpfeild, setOtpfeild] = useState(false)
    const [showerror, setShowError] = useState({});

    // handling input change
    const handleChange = (e) => {
        console.log(inputdata, "---------------inputdata---------------");
        setInputdata({ ...inputdata, [e.target.name]: e.target.value })
    }

    // handling send otp
    const sendOTP = async (e) => {
        e.preventDefault()
        setOtpfeild(true)
        setButtonLoading(true)
        try {

            // validating email
            const errors = validateEmail(inputdata);
            console.log(errors, "---------------error ********---------------");
            setShowError(errors)
            console.log(showerror, "---------------%%%%%%error---------------");
            if (Object.keys(errors).length > 0) {
                Swal.fire({
                    title: "Fill form correctly",
                    html: Object.values(errors).map(err => `<p>${err}</p>`).join(""), // Show errors in new lines
                    icon: "warning",
                    confirmButtonColor: "#014308",
                });
                setButtonLoading(false);
                return;
            }


            const formData = {
                identity: inputdata.email,
            }
            const verify_email = await verifyEmail(formData)
            const verifyData = verify_email?.data;
            console.log(verifyData.token, "---------------verifyData---------------");
            if (verifyData?.success) {
                Swal.fire({
                    title: "Success",
                    text: "Login successful",
                    timer: 1000,
                    timerProgressBar: true,
                    icon: "success",
                    showConfirmButton: false,
                    confirmButtonColor: "#014308",
                });
                // dispatch(setUser(response?.data));
                setInputdata({ email: "", password: "" });
                localStorage.setItem('userToken', verifyData?.token);
                navigate("/")
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
            const errors = validateEmail(inputdata);
            console.log(errors, "---------------error ********---------------");
            setShowError(errors)
            console.log(showerror, "---------------%%%%%%error---------------");

            // **If there are errors, stop execution & show alerts**
            if (Object.keys(errors).length > 0) {
                Swal.fire({
                    title: "Fill form correctly",
                    html: Object.values(errors).map(err => `<p>${err}</p>`).join(""), // Show errors in new lines
                    icon: "warning",
                    confirmButtonColor: "#014308",
                });
                setButtonLoading(false);
                return;
            }



            const formData = {
                identity: inputdata.email,
                otp: inputdata.otp
            }
            const verify_otp = await verifyOTP(formData)
            const verifyUserOTP = verify_otp?.data;
            if (verifyUserOTP?.success) {
                Swal.fire({
                    title: "Success",
                    text: "OTP Verified",
                    timer: 1000,
                    timerProgressBar: true,
                    icon: "success",
                    showConfirmButton: false,
                    confirmButtonColor: "#014308",
                });
                // dispatch(setUser(response?.data));
                setInputdata({ email: "", password: "" });
                navigate("/newpassword")
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
            <div>
                <img src={GREENBGLOGO} alt="logo-green-bg" className='block m-auto md:hidden w-[150px]' />
                <h1 className="text-registerheading text-3xl md:text-5xl text-center md:text-start">Reset Password</h1>
                <p className='text-registerheading text-[18px] md:text-xl text-center md:text-start'>An otp will be send to your registered email address</p>
                <p className='text-registerheading text-[18px]'>Having Issue ? <Link to="/register" className='text-primary underline decoration-1 underline-offset-2'>Contact Us</Link></p>

            </div>

            <form className='flex flex-col gap-6'>
                {/* email */}
                <div className='flex flex-col gap-2 w-full'>
                    {/* <InputFeilds label="Email" type="email" placeholder="Enter your email" value={inputdata.email} onChange={handleChange} /> */}
                    <label className="font-medium">Email</label>
                    <input
                        type="type"
                        placeholder="Enter your email"
                        name="email"
                        value={inputdata.email}
                        onChange={handleChange}
                        className="text-mainheading bg-white border-2 rounded-lg p-2 w-full sm:w-[300px] md:w-[400px] lg:w-[500px] xl:w-[600px] 
               max-w-[90vw] focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button onClick={sendOTP} className="font-subheading bg-primary text-xs px-5 py-3 max-w-[100px] text-white mt-3 rounded-full">Send OTP</button>
                </div>

                {/* otp */}
                {showotpfeild && (
                    <>
                        <div className='flex flex-col gap-2 w-full'>
                            <label className="font-medium">OTP</label>
                            <input
                                type="number"
                                placeholder="Enter one-time password"
                                name="otp"
                                value={inputdata.otp}
                                onChange={handleChange}
                                className="text-mainheading bg-white border-2 rounded-lg p-2 w-full sm:w-[300px] md:w-[400px] lg:w-[500px] xl:w-[600px] 
                           max-w-[90vw] focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>

                        <button
                            className="font-subheading bg-primary px-12 py-3 max-w-[350px] text-white mt-3 rounded-full"
                            onClick={handleVerifyOtp}
                        >
                            Verify
                        </button>
                    </>
                )}


            </form>
        </div>
    )
}

