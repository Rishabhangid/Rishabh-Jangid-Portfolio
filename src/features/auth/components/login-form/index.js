// import
import React, { useState } from 'react'
import Swal from "sweetalert2";
import { Link, useNavigate } from 'react-router-dom';

// assets
import GREENBGLOGO from "../../../../assets/images/logo/logo-green-bg.png"

// api
import { loginUser } from '../../../../api/services/authService';

// middleware
import { validateLoginData } from '../../../../shared/components/form/validate-user-login';

// redux
import { useDispatch } from 'react-redux';
import { login, logout } from '../../../../redux/slices/authentication/authSlice';

// react-icons
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";

// components
import { InputFeilds, SecondaryButton } from '../../../../shared';


export const LoginForm = () => {

    // declaration ***************************************************************
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // states ***************************************************************
    const [inputdata, setInputdata] = useState({ email: "", password: "" })
    const [rememberMe, setRememberMe] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false)
    const [showerror, setShowError] = useState({});
    const [showpassword, setShowpassword] = useState(false)


    // handlers ***************************************************************
    // form data 
    const handleChange = (e) => {
        console.log(inputdata, "---------------inputdata---------------");
        setInputdata({ ...inputdata, [e.target.name]: e.target.value })
    }

    // hanlde remember me
    const handleCheckboxChange = (e) => {
        setRememberMe(e.target.checked);
    };

    // api ***************************************************************

    // login api
    const handleLoginSubmit = async (e) => {
        e.preventDefault()
        setButtonLoading(true)

        try {
            const errors = validateLoginData(inputdata);
            console.log(errors, "---------------error ********---------------");
            setShowError(errors)
            console.log(showerror, "---------------%%%%%%error---------------");

            // **If there are errors, stop execution & show alerts**
            if (Object.keys(errors).length > 0) {
                Swal.fire({
                    title: "Fill form correctly",
                    html: Object.values(errors).map(err => `<p>${err}</p>`).join(""), // Show errors in new lines
                    icon: "warning",
                    confirmButtonColor: "#9A0056",
                });
                setButtonLoading(false);
                return;
            }



            const formData = {
                email: inputdata.email,
                password: inputdata.password
            }
            const login_user = await loginUser(formData)
            console.log(login_user, "---------------login_user---------------");
            const loginData = login_user?.data;
            console.log(loginData, "---------------loginData Token bbbbbbbbbbbbbbbbbbb---------------");
            console.log(loginData.temporary_token, "---------------loginData Temp TOk---------------");
            if (loginData?.success) {
                // if (login_user?.status === 200) {
                console.log("---------------login ho gya---------------");
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
                console.log(loginData, "---------------loginData---------------");
                if (rememberMe) {
                    localStorage.setItem("userdata", JSON.stringify(loginData));  // Save user to localStorage
                }
                dispatch(login(loginData))
                // dispatch( logout() )
                setInputdata({ email: "", password: "" });
                localStorage.setItem('userToken', loginData?.token);
                localStorage.setItem('temporary_token', loginData?.temporary_token);
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


    return (
        <div className='bg-white flex flex-col justify-center items-start pt-2 md:pt-16 px-16 h-[100%]'>

            {/* welcome text */}
            <div className='m-auto md:m-0'>
                <img src={GREENBGLOGO} alt="logo-green-bg" className='block m-auto md:hidden w-[150px]' />
                <h1 className="text-registerheading text-3xl md:text-5xl text-center md:text-start">Welcome</h1>
                <p className='text-registerheading text-[16px] md:text-xl text-center md:text-start flex  flex-col md:flex-row'>
                    <span>Do not have account ?</span>
                    <Link to="/register" className='text-pinkmain underline decoration-1 outline-2 underline-offset-2 focus:outline-primary'>Register Now</Link></p>
            </div>

            {/* login form */}
            <form className='flex flex-col gap-4 md:gap-6 ' onSubmit={handleLoginSubmit}>
                {/* email */}
                <div className='flex flex-col gap-0 md:gap-2 w-full '>
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
                </div>

                {/* password */}
                <div className=''>
                    <div className='flex justify-between flex-wrap'>
                        <label className=''>Password</label>
                        <div className='flex justify-center items-center gap-2' onClick={() => setShowpassword(!showpassword)}>
                            {showpassword ? <IoMdEyeOff /> : <FaEye />}
                            <p>{showpassword ? "Hide" : "Show"}</p>
                        </div>
                    </div>
                    {/* <input type="password" placeholder="**********" className='bg-white border-2 rounded-lg p-2 w-[45vw]' /> */}
                    <input type={showpassword ? "text" : "password"} name="password" value={inputdata.password} onChange={handleChange} placeholder="**********" className='text-mainheading bg-white border-2 rounded-lg p-2 w-full sm:w-[300px] md:w-[400px] lg:w-[500px] xl:w-[600px] 
               max-w-[90vw] focus:outline-none focus:ring-2 focus:ring-primary' />
                </div>



                {/* remember me */}
                <div className='flex  gap-2 justify-between'>
                    <div>
                        <input type="checkbox" name="rememberMe" className="text-white" checked={rememberMe} onChange={handleCheckboxChange} />

                        <span className='text-[14px] md:text-[16px]'>Remember Me</span>
                    </div>
                    <Link to="/forgotpassword" className='underline text-[14px] md:text-[16px]'>Forgot Password</Link>
                </div>

                {/* login button */}
                <SecondaryButton label="Login" disabled="false" />
                <p className='text-registerheading flex flex-col md:flex-row justify-center  items-center'>
                    <span>Do not have account ?</span>
                    <Link to="/register" className='text-pinkmain underline decoration-1 underline-offset-2'>Register Now</Link></p>

            </form>
        </div>
    )
}

