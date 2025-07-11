// import
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

// react-icons
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";

// components
import { InputFeilds, SecondaryButton } from '../../../../shared';

// api
import { regsiterUser, sendOTPEmail, verifyOTPEmail, verifyOTPNumber } from '../../../../api/services/authService';

// middlewares
import { validateRegisterData } from '../../../../shared/components/form/validate-user-registration';

// redux
import { login, setEmail, setotp } from '../../../../redux/slices/authentication/authSlice';
import { useDispatch } from 'react-redux';

// assests
import GREENBGLOGO from "../../../../assets/images/logo/logo-green-bg.png"




export const RegisterForm = () => {

    // declaration ***************************************************************
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // usestates ***************************************************************
    const [inputdata, setInputdata] = useState({ firstname: "", lastname: "", phone: "", email: "", password: "", agreeTerms: false })
    const [buttonLoading, setButtonLoading] = useState(false)
    const [showerror, setShowError] = useState({});
    const [showpassword, setShowpassword] = useState(false)

    //   handlers ***************************************************************

    // form change
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setInputdata((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value, // ✅ Handle checkbox
        }));
    };
    // handle phone number
    const handlePhoneChange = (value) => {
        setInputdata({ ...inputdata, phone: value });
    };

    // api calls ***************************************************************

    // regiter customer api
    const handleRegisterSubmit_with_verification = async (e) => {

        e.preventDefault()
        const newError = {};
        setButtonLoading(true)

        try {

            // validating input data for registration
            const errors = validateRegisterData(inputdata);
            setShowError(errors)
            if (Object.keys(errors).length > 0) {
                Swal.fire({
                    title: "Fill form correctly",
                    html: Object.values(errors).map(err => `<p>${err}</p>`).join(""),
                    icon: "warning",
                    confirmButtonColor: "#9A0056",
                });
                setButtonLoading(false);
                return;
            }

            // checking if user agreed term
            if (!inputdata.agreeTerms) {
                Swal.fire({
                    title: "Agree",
                    html: "Please agree terms and condition",
                    icon: "warning",
                    confirmButtonColor: "#019A00564308",
                });
                return;
            }
            else {
                const formData = {
                    email: inputdata.email,
                    password: inputdata.password,
                    f_name: inputdata.firstname,
                    l_name: inputdata.lastname,
                    phone: inputdata.phone
                }
                const register_user = await regsiterUser(formData)
                const registerData = register_user?.data;

                if (registerData?.success) {
                    localStorage.setItem('userToken', registerData?.token);
                    localStorage.setItem('temporary_token', registerData?.temporary_token);
                    dispatch(setEmail({ phoneNumber: inputdata.phone, emailAddress: inputdata.email }));

                    // for phone number
                    const formData1 = {
                        phone: inputdata.phone,
                        temporary_token: localStorage.getItem('temporary_token')
                    }
                    // for email address 
                    const formData2 = {
                        email: inputdata.email,
                        temporary_token: localStorage.getItem('temporary_token')
                    }
                    const verify_otp = await verifyOTPNumber(formData1)
                    const verifyUserOTPNumber = verify_otp?.data;
                    if (verifyUserOTPNumber?.success) {

                        dispatch(setotp({ phone_otp: verifyUserOTPNumber.otp })); // Updates only phone OTP

                        const verify_email_otp = await sendOTPEmail(formData2)
                        const verifyUserOTP = verify_email_otp?.data;
                        if (verifyUserOTP?.success) {
                            Swal.fire({
                                title: "Success",
                                text: "OTP has been to your mobile number and email",
                                timer: 3000,
                                timerProgressBar: true,
                                icon: "success",
                                showConfirmButton: false,
                                confirmButtonColor: "#014308",
                            });
                            dispatch(setotp({ email_otp: verifyUserOTP.otp })); // Updates only email OTP 
                            navigate("/verify-phone")
                        }
                    }
                }
            }

        }
        catch (error) {
            const errors = error?.errors || [{ message: "Something went wrong" }];
            const errorMessage = errors.map(err => err.message).join("\n");
            Swal.fire({
                title: "Error",
                text: errorMessage,
                icon: "error"
            });
        }
        finally {
            setButtonLoading(false)
        }
    }

    const handleRegisterSubmit = async (e) => {

        e.preventDefault()
        const newError = {};
        setButtonLoading(true)

        try {

            // validating input data for registration
            const errors = validateRegisterData(inputdata);
            setShowError(errors)
            if (Object.keys(errors).length > 0) {
                Swal.fire({
                    title: "Fill form correctly",
                    html: Object.values(errors).map(err => `<p>${err}</p>`).join(""),
                    icon: "warning",
                    confirmButtonColor: "#9A0056",
                });
                setButtonLoading(false);
                return;
            }

            // checking if user agreed term
            if (!inputdata.agreeTerms) {
                Swal.fire({
                    title: "Agree",
                    html: "Please agree terms and condition",
                    icon: "warning",
                    confirmButtonColor: "#019A00564308",
                });
                return;
            }
            else {
                const formData = {
                    email: inputdata.email,
                    password: inputdata.password,
                    f_name: inputdata.firstname,
                    l_name: inputdata.lastname,
                    phone: inputdata.phone
                }
                const register_user = await regsiterUser(formData)
                const registerData = register_user?.data;
                console.log(registerData, "---------------registerData---------------");

                if (registerData?.success) {
                    dispatch(login(registerData))
                    localStorage.setItem('userToken', registerData?.token);
                    localStorage.setItem('temporary_token', registerData?.temporary_token);
                    navigate("/")
                }
            }

        }
        catch (error) {
            const errors = error?.errors || [{ message: "Something went wrong" }];
            const errorMessage = errors.map(err => err.message).join("\n");
            Swal.fire({
                title: "Error",
                text: errorMessage,
                icon: "error"
            });
        }
        finally {
            setButtonLoading(false)
        }
    }

    return (

        <div className='bg-white flex flex-col gap-2 items-start pt-16 px-16'>

            {/* welcome text */}
            <div>
                <img src={GREENBGLOGO} alt="logo-green-bg" className='block m-auto md:hidden w-[150px] mb-3' />
                <h1 className="text-registerheading text-xl md:text-5xl text-center md:text-start">Welcome to <span className='text-primary'>Mukesh Gems & Jewellers </span></h1>
                <p className='text-registerheading text-[16px] md:text-xl text-center md:text-start'>Already have an ccount? <Link to="/login" className='text-pinkmain underline decoration-1 outline-2 underline-offset-2 focus:outline-primary'>Login</Link></p>
            </div>

            {/* registration form  */}
            <form className='flex flex-col gap-4' onSubmit={handleRegisterSubmit}>

                {/* username */}
                <div className='flex justify-end gap-2 md:gap-0 items-end'>
                    {/* firstname */}
                    <div className='flex flex-col gap-2 w-full'>
                        {/* <InputFeilds label="Email" type="email" value={inputdata.email} onChange={handleChange} placeholder="Enter your email" /> */}
                        <label className="font-medium">First Name</label>
                        <input
                            type="text"
                            name="firstname"
                            value={inputdata.firstname}
                            onChange={handleChange}
                            placeholder="Enter first name"
                            className="text-mainheading bg-white border-2 rounded-lg p-2 w-full sm:w-[300px] md:w-[280px] lg:w-[280px] xl:w-[280px] 
               max-w-[90vw] focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    {/* lastname */}
                    <div className='flex flex-col gap-2 w-full'>

                        <label className="font-medium">Last Name</label>
                        <input
                            type="text"
                            name="lastname"
                            value={inputdata.lastname}
                            onChange={handleChange}
                            placeholder="Enter last name"
                            className="text-mainheading bg-white border-2 rounded-lg p-2 w-full sm:w-[280px] md:w-[280px] lg:w-[280px] xl:w-[280px] 
               max-w-[90vw] focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                </div>

                {/* email */}
                <div className='flex flex-col gap-2 w-full'>

                    <label className="font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={inputdata.email}
                        onChange={handleChange}
                        placeholder="Enter email"
                        className="text-mainheading bg-white border-2 rounded-lg p-2 w-full sm:w-[300px] md:w-[400px] lg:w-[500px] xl:w-[600px] 
               max-w-[90vw] focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                {/* phone */}
                <div className='flex flex-col'>

                    <label className="font-medium">Mobile Number</label>
                    <PhoneInput
                        className=""
                        country={'in'}
                        value={inputdata.phone}
                        name="phone"
                        onChange={handlePhoneChange}
                        containerClass="w-full"
                        inputClass="form-control"
                        buttonClass="bg-gray-200 border-r-2 border-gray-300 rounded-l-lg"
                    />
                </div>


                {/* password */}
                <div className=''>
                    <div className='flex justify-between '>
                        <label className=''>Password</label>
                        <div className='flex justify-center items-center gap-2' onClick={() => setShowpassword(!showpassword)}>

                            {showpassword ? <IoMdEyeOff /> : <FaEye />}
                            <p>{showpassword ? "Hide" : "Show"}</p>
                        </div>
                    </div>
                    <input
                        // type={showpassword}
                        type={showpassword ? "text" : "password"}

                        name="password"
                        value={inputdata.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                        className="text-mainheading bg-white border-2 rounded-lg p-2 w-full sm:w-[300px] md:w-[400px] lg:w-[500px] xl:w-[600px] 
               max-w-[90vw] focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                {/* remember me */}
                <div className=' flex  gap-2'>
                    {/* <input type="checkbox" className='text-white' /> */}
                    <input type="checkbox" name="agreeTerms" checked={inputdata.agreeTerms} onChange={handleChange} />
                    <span className='text-[14px] md:text-[16px]'>I agree to Your <Link className='text-pinkmain'>Terms and conditions</Link></span>
                </div>


                {/* login button */}
                <SecondaryButton label="Register Now" />
                {/* <p className='text-registerheading'>Already have an ccount? <Link to="/login" className='text-primary mt-0 underline decoration-1 underline-offset-2'>Login</Link></p> */}

            </form>

        </div>

    )
}
