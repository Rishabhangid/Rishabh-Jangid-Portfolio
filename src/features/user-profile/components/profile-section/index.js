import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../../redux/slices/authentication/authSlice'
import { MdEditSquare } from "react-icons/md";
import { addUserAddressService, deleteUserAddressService, fetchUserAddressService, fetchUserInfoService, updateUserAddressService, updateUserInfomation } from '../../../../api/services/userProfileService'
import { MdDelete } from "react-icons/md";
import LOCATION from "../../../../assets/images/location-pin.png"
import Swal from "sweetalert2";
import USERIMAGE from "../../../../assets/images/authpage/auth-cover.jpg"
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { motion } from "framer-motion";


import { IoMdAddCircle } from "react-icons/io";

export const ProfilePageSection = () => {

    // declaration **************************************************************
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let idOfAddress = null

    const userToken = localStorage.getItem("userToken") || "";
    if (!userToken) {
        console.log("No user token found!");
    }


    // states *******************************************************************
    const [address, setAddress] = useState([])
    const [user, setUser] = useState([])
    const [isOpen, setIsOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [openEditUser, setOpenEditUser] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [inputdata, setInputdata] = useState({ id: "", name: "", phone: "", city: "", country: "", address: "", zipcode: "", billing: "", address_type: "", longitude: "", latitude: "" })
    const [userUpdatedata, setUserUpdate] = useState({ f_name: "", l_name: "", phone: "" })
    const [selectedAddress, setSelectedAddress] = useState("");
    const [selectedBilling, setSelectedBillling] = useState("");



    // api calls *****************************************************************



    // phone number
    const handlePhoneChange = (value) => {
        setUserUpdate({ ...inputdata, phone: value });
        console.log(inputdata, "---------------inputdata---------------");
    };

    // logout user
    const handleLogout = async (e) => {
        try {
            dispatch(logout())
            navigate("/login")
        }
        catch (error) {
            alert(error)
        }
    }

    const handleUserChange = async (e) => {
        setUserUpdate({
            ...userUpdatedata,
            [e.target.name]: e.target.value
        });
    };

    const handleChangse = async (e) => {
        setInputdata({
            ...inputdata,
            [e.target.name]: e.target.value
        });
    };
    const handleChange = (e) => {
        setInputdata({
            ...inputdata,
            [e.target.name]: e.target.value
        });
    };


    const handleAddressType = async (type) => {
        setSelectedAddress(type);
        setInputdata((prev) => ({
            ...prev,
            address_type: type
        }));
        console.log(inputdata, "---------------inputdata---------------");
    };

    const handleBilling = async (type) => {
        setSelectedBillling(type);
        setInputdata((prev) => ({
            ...prev,
            billing: type
        }));
        console.log(inputdata, "---------------inputdata---------------");
    };

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setInputdata((prev) => ({
                        ...prev,
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }));
                },
                (err) => {
                    // setError(err.message);
                    console.log(err, "---------------err---------------");
                }
            );
        } else {
            console.log('Geolocation is not supported by this browser.');
        }
    };

    const fetchUserAddress = async () => {
        try {
            const fetch_address = await fetchUserAddressService(userToken);
            console.log(fetch_address, "---------------fetch_address---------------");

            const all_address = fetch_address?.data;
            console.log(all_address, "---------------all_address---------------");

            setAddress(all_address || []);
        } catch (error) {
            console.log(error, "---------------error---------------");
        }
    };

    const fetchUserInfo = async () => {
        try {
            const fetch_user = await fetchUserInfoService(userToken);
            console.log(fetch_user, "---------------fetch_user hhhhhh---------------");

            const fetchUser = fetch_user?.data;
            console.log(fetchUser, "---------------fetchUser---------------");

            setUser(fetchUser || []);
        } catch (error) {
            console.log(error, "---------------error---------------");
        }
    };


    const handleSubmitAddress = async (e) => {
        e.preventDefault();
        getLocation();
        // contact_person_name, address_type, address, city, zip, country, phone, latitude, longitude,is_billing
        try {
            const formData = {
                contact_person_name: inputdata.name,
                address_type: inputdata.address_type,
                address: inputdata.address,
                city: inputdata.city,
                country: inputdata.country,
                phone: inputdata.phone,
                latitude: inputdata.latitude,
                longitude: inputdata.longitude,
                is_billing: inputdata.billing,
                zip: inputdata.zipcode
            }
            const add_address = await addUserAddressService(formData, userToken)
            const addressAdd = add_address?.data;
            // if (addressAdd?.success) {
            if (add_address.status === 200) {
                Swal.fire({
                    title: "Success",
                    text: "Address added successfully",
                    timer: 1000,
                    timerProgressBar: true,
                    icon: "success",
                    showConfirmButton: false,
                    confirmButtonColor: "#014308",
                });
                setInputdata({ name: "", phone: "", city: "", country: "", address: "", zipcode: "", billing: "", address_type: "", longitude: "", latitude: "" })
                fetchUserAddress();
                setIsOpen(false)
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
        // finally {
        //     setButtonLoading(false)
        // }
    };

    const handleUpdateAddress = async (e) => {

        alert(inputdata.id)
        e.preventDefault();
        getLocation();
        // contact_person_name, address_type, address, city, zip, country, phone, latitude, longitude,is_billing
        try {
            const formData = {
                id: inputdata.id,
                contact_person_name: inputdata.name,
                address_type: inputdata.address_type,
                address: inputdata.address,
                city: inputdata.city,
                country: inputdata.country,
                phone: inputdata.phone,
                latitude: inputdata.latitude,
                longitude: inputdata.longitude,
                is_billing: inputdata.billing,
                zip: inputdata.zipcode
            }
            const add_address = await updateUserAddressService(formData, userToken)
            const addressAdd = add_address?.data;
            // if (addressAdd?.success) {
            if (add_address.status === 200) {
                Swal.fire({
                    title: "Success",
                    text: "Address updated successfully",
                    timer: 1000,
                    timerProgressBar: true,
                    icon: "success",
                    showConfirmButton: false,
                    confirmButtonColor: "#014308",
                });
                setInputdata({ name: "", phone: "", city: "", country: "", address: "", zipcode: "", billing: "", address_type: "", longitude: "", latitude: "" })
                fetchUserAddress();
                setIsEditOpen(false)
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
        // finally {
        //     setButtonLoading(false)
        // }
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        try {
            const formData = {
                ...userUpdatedata
            }
            const update_user = await updateUserInfomation(formData, userToken)
            const updateUser = update_user?.data;
            if (updateUser?.success) {
                Swal.fire({
                    title: "Success",
                    text: "UserUpdated successfully",
                    timer: 1000,
                    timerProgressBar: true,
                    icon: "success",
                    showConfirmButton: false,
                    confirmButtonColor: "#014308",
                });
                setUserUpdate(false)
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
        // finally {
        //     setButtonLoading(false)
        // }
    };

    const handleDeleteAddress = async (id) => {
        console.log(id, "---------------id of address to delete---------------");
        try {
            const formData = {
                address_id: id
            }
            console.log(userToken, "---------------userToken---------------");
            const delete_address = await deleteUserAddressService(formData, userToken)
            const deletedAddress = delete_address?.data;
            if (deletedAddress.status === 200) {
                Swal.fire({
                    title: "Success",
                    text: "Address deleted succesfully.",
                    timer: 1000,
                    timerProgressBar: true,
                    icon: "success",
                    showConfirmButton: false,
                    confirmButtonColor: "#014308",
                });
                // fetchUserAddress()
                setIsOpen(false)
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
        // finally {
        //     setButtonLoading(false)
        // }
    };

    const handleEditAddress = (id, address_type, contact_person_name, phone, city, state, country, address, zipcode, billing) => {
        setInputdata({ id: id, name: contact_person_name, phone: phone, city: city, country: country, address: address, zipcode: zipcode, billing: billing, address_type: address_type, longitude: "", latitude: "" })
        idOfAddress = id
        alert(id, "---------------idOfAddress---------------");
        setIsEditOpen(true)
    }

    useEffect(() => {
        fetchUserInfo();
    }, []);

    useEffect(() => {
        fetchUserAddress();
        fetchUserInfo();
    }, [address]);





    return (
        <motion.div className='grid grid-cols-1 md:grid-cols-[35%_65%] gap-3 '
            initial={{ y: -50, opacity: 0 }}  // Start position (above the screen)
            animate={{ y: 0, opacity: 1 }}    // End position (normal position)
            exit={{ y: -50, opacity: 0 }}     // Exit animation (moving back up)
            transition={{ type: "spring", stiffness: 120, damping: 14 }}  // Smooth spring effect
        >


            {/* <div className="bg-[#baa560] p-6 rounded-2xl shadow-xl text-white flex flex-col gap-5 w-full max-w-md mx-auto"> */}
            <div className="bg-[#f4e6d5] p-6 rounded-2xl shadow-xl text-white flex flex-col gap-5 w-full max-w-md mx-auto">
                {/* <div className="bg-gradient-to-r from-[#D4AF37] via-[#E5C663] to-[#B9972F] p-6 rounded-2xl shadow-xl text-white flex flex-col gap-5 w-full max-w-md mx-auto"> */}
                {/* Profile Image */}
                <div className="relative w-full">
                    <img
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Profile"
                        className="w-full h-30 md:h-64 object-cover rounded-xl shadow-lg"
                    />
                    <button className="absolute top-3 right-3 bg-black/40 px-3 py-1 text-sm rounded-md" onClick={() => setOpenEditUser(true)}>
                        ✏️ Edit
                    </button>
                    {openEditUser && (
                        <div className="fixed inset-0  bg-black bg-opacity-50 flex justify-center items-center px-4 z-5">
                            {/* Modal Box */}
                            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[500px] relative transform scale-95 transition-transform duration-300">
                                <h2 className="text-xl font-bold ">Edit User</h2>
                                <p className="text-gray-600 mb-8">Update your information details here</p>

                                <form>
                                    <div className='flex flex-col justify-center gap-3'>
                                        <img src={USERIMAGE} alt="c" className='w-[120px] h-[120px] rounded-full m-auto' />
                                        {/* <input
                                 type="file"
                                 placeholder="First Name"
                                 name="name"
                                 value={inputdata.name}
                                 onChange={handleChange}
                                 className="text-mainheading bg-white border-2 rounded-lg p-2 w-[100%] focus:outline-none focus:ring-2 focus:ring-primary"
                             /> */}
                                        <input
                                            type="type"
                                            placeholder="First Name"
                                            name="f_name"
                                            value={userUpdatedata.f_name}
                                            onChange={handleUserChange}
                                            className="text-mainheading bg-white border-2 rounded-lg p-2 w-[100%] focus:outline-none focus:ring-2 focus:ring-primary"
                                        />
                                        <input
                                            type="type"
                                            placeholder="Last Name"
                                            name="l_name"
                                            value={userUpdatedata.l_name}
                                            onChange={handleUserChange}
                                            className="text-mainheading bg-white border-2 rounded-lg p-2 w-[100%] focus:outline-none focus:ring-2 focus:ring-primary"
                                        />
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


                                    <input type='submit' className='bg-primary text-white w-full p-2 rounded-lg mt-3' value="Update" onClick={handleUpdateUser} />
                                </form>

                                {/* Close Button */}
                                <button
                                    className="absolute top-2 right-2 text-gray-600 hover:text-black"
                                    onClick={() => setOpenEditUser(false)}
                                >
                                    ✖
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* User Info */}
                <div className="flex flex-col items-center text-center text-mainheading">
                    <h1 className="text-2xl font-bold text-pinkmain">{user.f_name} {user.l_name}</h1>
                    <p className="text-sm opacity-90">{user.email}</p>
                    <p className="text-sm opacity-90">{user.phone}</p>
                </div>

                {/* Order Stats */}
                <div className="flex justify-between text-center py-4 border-y border-white/20 text-mainheading">
                    <div className="flex flex-col">
                        <p className="text-xs md:text-sm opacity-80 ">Total Orders</p>
                        <p className="text-lg font-bold ">34</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-xs md:text-sm opacity-80">Pending Orders</p>
                        <p className="text-lg font-bold ">12</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-xs md:text-sm opacity-80">Completed Orders</p>
                        <p className="text-lg font-bold ">22</p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3">
                    <button className="bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-200 transition">
                        🔑 Change Password
                    </button>
                    <button
                        className="bg-red-600 text-white font-semibold py-2 rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-2"
                        onClick={handleLogout}
                    >
                        🚪 Logout
                    </button>
                </div>
            </div>


            <div className="p-6 bg-white dark:bg-gradient-to-br from-[#1B1B1B] to-[#252525]   rounded-xl shadow-md">
                {/* Section Title */}
                <div className='flex justify-between items-center border-b-2 dark:border-mainbutton pb-2 font-subheading mb-4'>
                    <h1 className='text-2xl text-mainheading font-bold dark:text-mainbutton'>Address</h1>
                    {/* <span className='text-[16px] underline cursor-pointer hidden md:block text-mainheading dark:text-mainbutton' onClick={() => setIsOpen(true)}>Add Address</span> */}
                    <IoMdAddCircle onClick={() => setIsOpen(true)} className="text-mainheading text-[16px] md:text-[30px] dark:text-mainbutton" />
                    {isOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-4">
                            {/* Modal Box */}
                            <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-[90%] z-50 md:max-w-[600px] relative transform scale-95 transition-transform duration-300">
                                {/* Modal Header */}
                                <div className="flex justify-between items-center">
                                    <h2 className="font-semibold text-sm md:text-base text-mainheading">Add Address</h2>
                                    <button
                                        className="text-gray-600 hover:text-black text-lg"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        ✖
                                    </button>
                                </div>
                                <p className="text-gray-600 text-xs md:text-sm mb-5">Enter your address details here</p>

                                {/* Form */}
                                <form>
                                    {/* Name & Mobile */}
                                    <div className="flex flex-wrap gap-3">
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            name="name"
                                            value={inputdata.name}
                                            onChange={handleChange}
                                            className="bg-white border-2 font-normal text-mainheading text-sm md:text-base rounded-lg p-2 w-full md:w-[48%] focus:outline-none focus:ring-2 focus:ring-primary"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Mobile Number"
                                            name="phone"
                                            value={inputdata.phone}
                                            onChange={handleChange}
                                            className="bg-white border-2 font-normal text-mainheading text-sm md:text-base rounded-lg p-2 w-full md:w-[48%] focus:outline-none focus:ring-2 focus:ring-primary"
                                        />
                                    </div>

                                    {/* City & Zip Code */}
                                    <div className="flex flex-wrap gap-3 mt-3">
                                        <input
                                            type="text"
                                            placeholder="City"
                                            name="city"
                                            value={inputdata.city}
                                            onChange={handleChange}
                                            className="bg-white border-2 font-normal text-mainheading text-sm md:text-base rounded-lg p-2 w-full md:w-[48%] focus:outline-none focus:ring-2 focus:ring-primary"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Zip Code"
                                            name="zipcode"
                                            value={inputdata.zipcode}
                                            onChange={handleChange}
                                            className="bg-white border-2 font-normal text-mainheading text-sm md:text-base rounded-lg p-2 w-full md:w-[48%] focus:outline-none focus:ring-2 focus:ring-primary"
                                        />
                                    </div>

                                    {/* Country */}
                                    <div className="mt-3">
                                        <input
                                            type="text"
                                            placeholder="Country"
                                            name="country"
                                            value={inputdata.country}
                                            onChange={handleChange}
                                            className="bg-white border-2 font-normal text-mainheading text-sm md:text-base rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                                        />
                                    </div>

                                    {/* Address */}
                                    <div className="mt-3">
                                        <textarea
                                            placeholder="Full Address"
                                            name="address"
                                            value={inputdata.address}
                                            onChange={handleChange}
                                            className="bg-white border-2 text-sm md:text-base text-mainheading font-normal rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                                        ></textarea>
                                    </div>

                                    {/* Address Type - Dropdown */}
                                    <div className="">
                                        <label className="text-gray-700 text-xs md:text-sm font-semibold">Address Type:</label>
                                        <select
                                            name="address_type"
                                            value={inputdata.address_type}
                                            onChange={handleChange}
                                            className="bg-white text-mainheading border-2 text-sm md:text-base font-normal rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                                        >
                                            <option value="" disabled>Select Address Type</option>
                                            <option value="Permanent">Permanent</option>
                                            <option value="Home">Home</option>
                                            <option value="Office">Office</option>
                                        </select>
                                    </div>

                                    {/* Billing Type - Dropdown */}
                                    <div className="">
                                        <label className="text-gray-700 text-xs md:text-sm font-semibold">Billing:</label>
                                        <select
                                            name="billing"
                                            value={inputdata.billing}
                                            onChange={handleChange}
                                            className="bg-white text-mainheading border-2 text-sm md:text-base font-normal rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                                        >
                                            <option value="" disabled>Select Billing Type</option>
                                            <option value="Shipping">Shipping</option>
                                            <option value="Billing">Billing</option>
                                        </select>
                                    </div>

                                    {/* Submit Button */}
                                    <input
                                        type="submit"
                                        className="bg-[#D4AF37] text-white w-full p-2 rounded-lg mt-4 text-xs md:text-sm cursor-pointer"
                                        value="Add Address"
                                        onClick={handleSubmitAddress}
                                    />
                                </form>

                            </div>
                        </div>

                    )}
                </div>



                {/* Address List */}
                {address.length > 0 ? (
                    <div className="flex flex-col gap-4">
                        {address.map((item) => (
                            <div
                                key={item.id}
                                className="border border-gray-300 dark:border-mainbutton rounded-xl overflow-hidden shadow-sm transition-all hover:shadow-md  p-4"
                            >
                                {/* Address Type & Action Buttons */}


                                {/* Address Details */}
                                <div className="mt-2 flex justify-between items-start text-gray-800 dark:text-white">
                                    <div>
                                        <p className="text-gray-700 dark:text-white ">{item.address}, {item.city}, {item.state}, {item.country}</p>
                                        {/* <p className="text-gray-600 dark:text-white">{item.city}, {item.state}, {item.country}</p> */}
                                        <h1 className="">{item.contact_person_name}, {item.phone}</h1>
                                    </div>

                                    <div className="flex gap-3">
                                        <button
                                            // onClick={() => setIsOpen(true)}
                                            onClick={() => handleEditAddress(item.id, item.address_type, item.contact_person_name, item.phone, item.city, item.state, item.country, item.address, item.billing)}
                                            className="text-gray-600 hover:text-yellow-500 transition"
                                        >
                                            <MdEditSquare size={20} />
                                        </button>

                                        {/* Edit Model */}
                                        {isEditOpen && (
                                            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-4 z-90">
                                                {/* Modal Box */}
                                                <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-[90%] md:max-w-[600px] relative transform scale-95 transition-transform duration-300">
                                                    {/* Modal Header */}
                                                    <div className="flex justify-between items-center">
                                                        <h2 className="font-semibold text-sm md:text-base text-mainheading">Add Address</h2>
                                                        <button
                                                            className="text-gray-600 hover:text-black text-lg"
                                                            onClick={() => setIsEditOpen(false)}
                                                        >
                                                            ✖
                                                        </button>
                                                    </div>
                                                    <p className="text-gray-600 text-xs md:text-sm mb-5">Enter your address details here</p>

                                                    {/* Form */}
                                                    <form>
                                                        {/* Name & Mobile */}
                                                        <div className="flex flex-wrap gap-3">
                                                            <input
                                                                type="text"
                                                                placeholder="Name"
                                                                name="name"
                                                                value={inputdata.name}
                                                                onChange={handleChange}
                                                                className="bg-white border-2 font-normal text-sm md:text-base rounded-lg p-2 w-full md:w-[48%] focus:outline-none focus:ring-2 focus:ring-primary"
                                                            />
                                                            <input
                                                                type="text"
                                                                placeholder="Mobile Number"
                                                                name="phone"
                                                                value={inputdata.phone}
                                                                onChange={handleChange}
                                                                className="bg-white border-2 font-normal text-sm md:text-base rounded-lg p-2 w-full md:w-[48%] focus:outline-none focus:ring-2 focus:ring-primary"
                                                            />
                                                        </div>

                                                        {/* City & Zip Code */}
                                                        <div className="flex flex-wrap gap-3 mt-3">
                                                            <input
                                                                type="text"
                                                                placeholder="City"
                                                                name="city"
                                                                value={inputdata.city}
                                                                onChange={handleChange}
                                                                className="bg-white border-2 font-normal text-sm md:text-base rounded-lg p-2 w-full md:w-[48%] focus:outline-none focus:ring-2 focus:ring-primary"
                                                            />
                                                            <input
                                                                type="text"
                                                                placeholder="Zip Code"
                                                                name="zipcode"
                                                                value={inputdata.zipcode}
                                                                onChange={handleChange}
                                                                className="bg-white border-2 font-normal text-sm md:text-base rounded-lg p-2 w-full md:w-[48%] focus:outline-none focus:ring-2 focus:ring-primary"
                                                            />
                                                        </div>

                                                        {/* Country */}
                                                        <div className="mt-3">
                                                            <input
                                                                type="text"
                                                                placeholder="Country"
                                                                name="country"
                                                                value={inputdata.country}
                                                                onChange={handleChange}
                                                                className="bg-white border-2 font-normal text-sm md:text-base rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                                                            />
                                                        </div>

                                                        {/* Address */}
                                                        <div className="mt-3">
                                                            <textarea
                                                                placeholder="Full Address"
                                                                name="address"
                                                                value={inputdata.address}
                                                                onChange={handleChange}
                                                                className="bg-white border-2 text-sm md:text-base font-normal rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                                                            ></textarea>
                                                        </div>

                                                        {/* Address Type - Dropdown */}
                                                        <div className="">
                                                            <label className="text-gray-700 text-xs md:text-sm font-semibold">Address Type:</label>
                                                            <select
                                                                name="address_type"
                                                                value={inputdata.address_type}
                                                                onChange={handleChange}
                                                                className="bg-white text-mainheading border-2 text-sm md:text-base font-normal rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                                                            >
                                                                <option value="" disabled>Select Address Type</option>
                                                                <option value="Permanent">Permanent</option>
                                                                <option value="Home">Home</option>
                                                                <option value="Office">Office</option>
                                                            </select>
                                                        </div>

                                                        {/* Billing Type - Dropdown */}
                                                        <div className="">
                                                            <label className="text-gray-700 text-xs md:text-sm font-semibold">Billing:</label>
                                                            <select
                                                                name="billing"
                                                                value={inputdata.billing}
                                                                onChange={handleChange}
                                                                className="bg-white text-mainheading border-2 text-sm md:text-base font-normal rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                                                            >
                                                                <option value="" disabled>Select Billing Type</option>
                                                                <option value="Shipping">Shipping</option>
                                                                <option value="Billing">Billing</option>
                                                            </select>
                                                        </div>

                                                        {/* Submit Button */}
                                                        <input
                                                            type="submit"
                                                            className="bg-primary text-white w-full p-2 rounded-lg mt-4 text-xs md:text-sm cursor-pointer"
                                                            value="Update Address"
                                                            onClick={handleUpdateAddress}
                                                        />
                                                    </form>

                                                </div>
                                            </div>

                                        )}


                                        <button
                                            onClick={() => handleDeleteAddress(item.id)}
                                            className="text-gray-600 hover:text-red-500 transition"
                                        >
                                            <MdDelete size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    // Empty State
                    <div className="flex flex-col justify-center items-center text-center gap-4 mt-6 p-6 rounded-lg shadow-sm">
                        <img src={LOCATION} alt="No Address" className="w-20 h-20" />
                        <p className="text-[14px] font-medium text-gray-700 dark:text-white">Oops! No address saved!</p>
                        {/* <Link to="/" className="bg-primary px-5 py-2 rounded-lg text-white  hover:bg-green-700 transition" onClick={() => setIsOpen(true)}> */}
                        <Link className="bg-mainbutton px-5 py-2 rounded-lg text-white  hover:bg-[#BE9B2A] transition" onClick={() => setIsOpen(true)}>
                            ➕ Add Address
                        </Link>

                    </div>
                )}
            </div>





        </motion.div>
    )
}