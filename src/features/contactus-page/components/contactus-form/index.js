// import
import React, { useState } from 'react'
import Swal from "sweetalert2";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom'
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// middleware
import { validateContactData } from '../../../../shared/components/form/validate-contact'

// cpmponents
import { MainHeading, PrimaryButton, SecondaryButton } from '../../../../shared'

// api
import { sendContact } from '../../../../api/services/contactusService'

// assests
import INSTA from "../.././../../assets/images/logo/instagram.png"
import FB from "../.././../../assets/images/logo/facebook.png"
import X from "../.././../../assets/images/logo/twitter.png"
import WHATSAPP from "../.././../../assets/images/logo/whatsapp.png"
import COMPANYLOGO from "../../../../assets//images/logo/logo-green-bg.png"

import { FaPhoneVolume } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";


export const ContactUsFormSection = () => {

  // declaration ***************************************************
  const navigate = useNavigate()

  // states ********************************************************
  const [inputdata, setInputdata] = useState({ name: "", email: "", phone: "", message: "", subject: "" })

  // google map configrution ****************************************
  const containerStyle = {
    width: "100%",
    height: "400px",
  };
  const location = {
    lat: 24.599367, // Change this to your latitude
    lng: 73.690862, // Change this to your longitude
  };

  // handlers ************************************************

  // contact form handleer
  const handleChange = (e) => {
    console.log(inputdata, "---------------inputdata---------------");
    setInputdata({ ...inputdata, [e.target.name]: e.target.value })
  }

  // phone numbr handler
  const handlePhoneChange = (value) => {
    setInputdata({ ...inputdata, phone: value });
    console.log(inputdata, "---------------inputdata---------------");
  };


  // api *******************************************************

  // send message
  const handContactSubmit = async (e) => {
    e.preventDefault()
    console.log(inputdata, "---------------inputdata---------------");

    try {
      const errors = validateContactData(inputdata);
      console.log(errors, "---------------error ********---------------");

      if (Object.keys(errors).length > 0) {
        Swal.fire({
          title: "Fill form correctly",
          html: Object.values(errors).map(err => `<p>${err}</p>`).join(""), // Show errors in new lines
          icon: "warning",
          confirmButtonColor: "#014308",
        });
        // setButtonLoading(false);
        return;
      }



      const formData = {
        name: inputdata.name,
        email: inputdata.email,
        subject: inputdata.subject,
        mobile_number: inputdata.phone,
        message: inputdata.message
      }

      const post_message = await sendContact(formData)
      const sendMessage = post_message?.data;
      console.log(sendMessage.token, "---------------sendMessage Token---------------");
      console.log(sendMessage.temporary_token, "---------------sendMessage Temp TOk---------------");
      // if (sendMessage?.success) {
      if (post_message?.status === 200) {
        Swal.fire({
          title: "Success",
          text: "Message Sent",
          timer: 1000,
          timerProgressBar: true,
          icon: "success",
          showConfirmButton: false,
          confirmButtonColor: "#014308",
        });
        // dispatch(setUser(response?.data));
        console.log(sendMessage, "---------------loginData---------------");

        setInputdata({ name: "", email: "", phone: "", message: "", subject: "" });
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
      // setButtonLoading(false)
    }
  }


  return (

    <motion.div className=' dark:bg-[#121212]'
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}>


      {/* contact form and details */}
      <div className="grid grid-cols-1 md:grid-cols-[55%_45%] mb-10  justify-between items-center gap-6 px-4 lg:px-10 py-10 bg-gray-50 dark:bg-[#121212] ">

        {/* Left Section : contact details */}
        <div className="flex flex-col gap-6 items-center md:items-start ">

          <img src={COMPANYLOGO} alt="logo" className='w-40' />
          <h1 className="text-4xl md:text-5xl text-mainheading dark:text-white font-bold">Contact Us</h1>

          <div className="flex flex-col gap-2 items-center md:items-start">
            <p className="text-gray-600 dark:text-gray-300 max-w-lg font-light leading-relaxed  text-center md:text-start">
              Email, call, or complete the form to learn how we can solve your problem.
            </p>
            <p className="font-light flex justify-center items-center gap-2 leading-relaxed text-mainheading dark:text-gray-300">
              <IoMail  className='text-pinkmain'/>
              <span>info@mukeshgems.com</span>
            </p>
            <p className="font-light flex justify-center items-center gap-2 leading-relaxed text-mainheading dark:text-gray-300">
              <FaPhoneVolume className='text-pinkmain' />
              <span>+91 797659349455</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Customer Support",
                description: "Our support team is available around the clock to address any concerns or queries you may have.",
              },
              {
                title: "Feedback & Suggestions",
                description: "We value your feedback and continuously work to improve. Your input shapes our future.",
              },
              {
                title: "Media Inquiries",
                description: "For media-related questions or press inquiries, contact us at  info@mukeshgems.com.",
              },
            ].map((item, index) => (
              <div key={index} className="p-4 rounded-lg bg-white dark:bg-gray-800  transition-transform duration-300 hover:scale-105">
                <p className="font-bold text-secondprimary">{item.title}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section :contact form */}
        <div className="p-0 md:p-6 flex justify-center items-center ">
          <div className="border border-gray-200 dark:border-gray-700 w-full max-w-lg shadow-lg p-8 rounded-md bg-white dark:bg-gray-900">
            <h1 className="text-xl md:text-2xl font-semibold text-mainheading dark:text-white text-center md:text-start">Fill the Information Below</h1>

            <form className="mt-6 space-y-4" onSubmit={handContactSubmit}>
              {/* Name Field */}
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={inputdata.name}
                onChange={handleChange}
                className="p-3 border-b-2 focus:border-mainbutton w-full outline-none bg-transparent transition duration-300"
              />

              {/* Email Field */}
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={inputdata.email}
                onChange={handleChange}
                className="p-3 border-b-2 focus:border-mainbutton w-full outline-none bg-transparent transition duration-300"
              />

              {/* Phone Number */}
              <PhoneInput
                country={'in'}
                value={inputdata.phone}
                name="phone"
                onChange={handlePhoneChange}
                containerClass="w-full"
                inputClass="p-3 border-b-2 focus:border-mainbutton w-full outline-none bg-transparent transition duration-300 !border-none !shadow-none"
              />

              {/* subject */}
              <input
                type="email"
                placeholder="Subject"
                name="subject"
                value={inputdata.subject}
                onChange={handleChange}
                className="p-3 border-b-2 focus:border-mainbutton w-full outline-none bg-transparent transition duration-300"
              />

              {/* Message Field */}
              <textarea
                placeholder="Message"
                name="message"
                value={inputdata.message}
                onChange={handleChange}
                className="p-3 mt-3 border-b-2 focus:border-mainbutton w-full outline-none bg-transparent transition duration-300"
              />
              <input type="submit" value="Send" className='mt-6 bg-pinkmain text-white text-sm h-12 w-full rounded-md font-semibold shadow-md hover:bg-[#5f2445] transition duration-300' />
            </form>
          </div>
        </div>

      </div>

      {/* google map address */}
      <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center p-6 bg-gray-50 dark:bg-[#121212]"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.5 }}
      >


        {/* Google Map Section */}
        <div className="w-full h-[400px] ">
          <LoadScript googleMapsApiKey="AIzaSyCycVSePm_YVsDIG6L7IuXkh2Afwd1GUZc">
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "100%" }}
              center={location}
              zoom={15}
            >
              <Marker position={location} />
            </GoogleMap>
          </LoadScript>
        </div>

        {/* Left Section */}
        <div className="space-y-4 font-subheading px-4 md:px-0">
          <h1 className="text-xl md:text-3xl font-bold text-mainheading dark:text-white text-center md:text-start">
            Our Location
          </h1>
          <p className="text-gray-400 text-center md:text-start max-w-lg mx-auto md:mx-0">
            Shop No.6, Centrum Building, Sukhadia Circle, Behind Shivam Opticals, Udaipur, Rajasthan (313001), India
          </p>
        </div>



      </motion.div>

      {/* socail media */}
      <h1 className="text-xl md:text-3xl text-mainheading dark:text-white font-bold text-center mt-10 mb-6">Connect with ous</h1>
      <motion.div className='flex flex-wrap gap-4 justify-center p-3'
        initial={{ opacity: 0, y: 50 }}  // Start hidden and moved down
        whileInView={{ opacity: 1, y: 0 }}  // Animate when in view
        viewport={{ once: false, amount: 0.2 }}  // Animate every time it's visible, 20% visible triggers animation
        transition={{ duration: 0.5 }}  // Animation duration
      >

        {/* insta */}
        <div className="relative max-w-[23ch] border-4 text-center bg-gray-100  p-6 rounded-md overflow-hidden transition-transform duration-300 flex flex-col justify-center items-center gap-4 text-black hover:bg-pink-100">
          {/* Icon */}
          <div className="w-10 h-fit flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M11.984 16.815c2.596 0 4.706-2.111 4.706-4.707 0-1.409-.623-2.674-1.606-3.538-.346-.303-.735-.556-1.158-.748-.593-.27-1.249-.421-1.941-.421s-1.349.151-1.941.421c-.424.194-.814.447-1.158.749-.985.864-1.608 2.129-1.608 3.538 0 2.595 2.112 4.706 4.706 4.706zm.016-8.184c1.921 0 3.479 1.557 3.479 3.478 0 1.921-1.558 3.479-3.479 3.479s-3.479-1.557-3.479-3.479c0-1.921 1.558-3.478 3.479-3.478zm5.223.369h6.777v10.278c0 2.608-2.114 4.722-4.722 4.722h-14.493c-2.608 0-4.785-2.114-4.785-4.722v-10.278h6.747c-.544.913-.872 1.969-.872 3.109 0 3.374 2.735 6.109 6.109 6.109s6.109-2.735 6.109-6.109c.001-1.14-.327-2.196-.87-3.109zm2.055-9h-12.278v5h-1v-5h-1v5h-1v-4.923c-.346.057-.682.143-1 .27v4.653h-1v-4.102c-1.202.857-2 2.246-2 3.824v3.278h7.473c1.167-1.282 2.798-2 4.511-2 1.722 0 3.351.725 4.511 2h7.505v-3.278c0-2.608-2.114-4.722-4.722-4.722zm2.722 5.265c0 .406-.333.735-.745.735h-2.511c-.411 0-.744-.329-.744-.735v-2.53c0-.406.333-.735.744-.735h2.511c.412 0 .745.329.745.735v2.53z"
              ></path>
            </svg>
          </div>
          {/* Title */}
          <strong className="text-xl font-semibold">Instagram</strong>
          {/* Body */}
          <div className="text-gray-600 text-sm">Get UI elements that help you stand out.</div>
          {/* Hover Effect */}
          {/* <span className="absolute inset-0  flex justify-center items-center bg-pink-100 text-pink-600 font-bold rounded-md transition-all duration-300 top-full hover:top-0 hover:text-xl">
          Follow us
        </span> */}
        </div>

        {/* facebook */}
        <div className="relative max-w-[23ch] border-4 text-center bg-gray-100 p-6 rounded-md overflow-hidden transition-transform duration-300 flex flex-col justify-center items-center gap-4 text-black hover:bg-pink-100">
          {/* Icon */}
          <div className="w-10 h-fit flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M11.984 16.815c2.596 0 4.706-2.111 4.706-4.707 0-1.409-.623-2.674-1.606-3.538-.346-.303-.735-.556-1.158-.748-.593-.27-1.249-.421-1.941-.421s-1.349.151-1.941.421c-.424.194-.814.447-1.158.749-.985.864-1.608 2.129-1.608 3.538 0 2.595 2.112 4.706 4.706 4.706zm.016-8.184c1.921 0 3.479 1.557 3.479 3.478 0 1.921-1.558 3.479-3.479 3.479s-3.479-1.557-3.479-3.479c0-1.921 1.558-3.478 3.479-3.478zm5.223.369h6.777v10.278c0 2.608-2.114 4.722-4.722 4.722h-14.493c-2.608 0-4.785-2.114-4.785-4.722v-10.278h6.747c-.544.913-.872 1.969-.872 3.109 0 3.374 2.735 6.109 6.109 6.109s6.109-2.735 6.109-6.109c.001-1.14-.327-2.196-.87-3.109zm2.055-9h-12.278v5h-1v-5h-1v5h-1v-4.923c-.346.057-.682.143-1 .27v4.653h-1v-4.102c-1.202.857-2 2.246-2 3.824v3.278h7.473c1.167-1.282 2.798-2 4.511-2 1.722 0 3.351.725 4.511 2h7.505v-3.278c0-2.608-2.114-4.722-4.722-4.722zm2.722 5.265c0 .406-.333.735-.745.735h-2.511c-.411 0-.744-.329-.744-.735v-2.53c0-.406.333-.735.744-.735h2.511c.412 0 .745.329.745.735v2.53z"
              ></path>
            </svg>
          </div>
          {/* Title */}
          <strong className="text-xl font-semibold">Facebook</strong>
          {/* Body */}
          <div className="text-gray-600 text-sm">Get UI elements that help you stand out.</div>
          {/* Hover Effect */}
          {/* <span className="absolute inset-0  flex justify-center items-center bg-pink-100 text-pink-600 font-bold rounded-md transition-all duration-300 top-full hover:top-0 hover:text-xl">
          Follow us
        </span> */}
        </div>

        {/* facebook */}
        <div className="relative max-w-[23ch] border-4 text-center bg-gray-100 p-6 rounded-md overflow-hidden transition-transform duration-300 flex flex-col justify-center items-center gap-4 text-black hover:bg-pink-100">
          {/* Icon */}
          <div className="w-10 h-fit flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M11.984 16.815c2.596 0 4.706-2.111 4.706-4.707 0-1.409-.623-2.674-1.606-3.538-.346-.303-.735-.556-1.158-.748-.593-.27-1.249-.421-1.941-.421s-1.349.151-1.941.421c-.424.194-.814.447-1.158.749-.985.864-1.608 2.129-1.608 3.538 0 2.595 2.112 4.706 4.706 4.706zm.016-8.184c1.921 0 3.479 1.557 3.479 3.478 0 1.921-1.558 3.479-3.479 3.479s-3.479-1.557-3.479-3.479c0-1.921 1.558-3.478 3.479-3.478zm5.223.369h6.777v10.278c0 2.608-2.114 4.722-4.722 4.722h-14.493c-2.608 0-4.785-2.114-4.785-4.722v-10.278h6.747c-.544.913-.872 1.969-.872 3.109 0 3.374 2.735 6.109 6.109 6.109s6.109-2.735 6.109-6.109c.001-1.14-.327-2.196-.87-3.109zm2.055-9h-12.278v5h-1v-5h-1v5h-1v-4.923c-.346.057-.682.143-1 .27v4.653h-1v-4.102c-1.202.857-2 2.246-2 3.824v3.278h7.473c1.167-1.282 2.798-2 4.511-2 1.722 0 3.351.725 4.511 2h7.505v-3.278c0-2.608-2.114-4.722-4.722-4.722zm2.722 5.265c0 .406-.333.735-.745.735h-2.511c-.411 0-.744-.329-.744-.735v-2.53c0-.406.333-.735.744-.735h2.511c.412 0 .745.329.745.735v2.53z"
              ></path>
            </svg>
          </div>
          {/* Title */}
          <strong className="text-xl font-semibold">Mail</strong>
          {/* Body */}
          <div className="text-gray-600 text-sm">Get UI elements that help you stand out.</div>
          {/* Hover Effect */}
          {/* <span className="absolute inset-0  flex justify-center items-center bg-pink-100 text-pink-600 font-bold rounded-md transition-all duration-300 top-full hover:top-0 hover:text-xl">
          Follow us
        </span> */}
        </div>

      </motion.div>


    </motion.div >


  )
}
