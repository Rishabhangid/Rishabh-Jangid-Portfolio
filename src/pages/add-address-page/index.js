import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from "sweetalert2";
import CARTITEM from "../../assets/images/cart-bg-green.png"
import ADDRESS from "../../assets/images/cart-location.png"
import PAYMENT from "../../assets/images/cart-payment.png"
import ORDERPLACED from "../../assets/images/cart-success.png"

import { MainHeading, PrimaryButton, SubHeading } from '../../shared'

import { fetchUserAddressService } from '../../api/services/userProfileService';
import { postUserAddress } from '../../api/services/paymentService';
import { useSelector } from 'react-redux';
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import { IoMdAddCircle } from "react-icons/io";
import { motion } from "framer-motion";
import "../../index.css"



export const AddAdressPageScreen = () => {

    useEffect(() => {
        window.scrollTo(0, 0); // Scrolls to the top of the page
    }, []);

    const navigate = useNavigate()

    const { subtotal, gst, shipping, discount, total } = useSelector((state) => state.cartSummary);
    console.log(subtotal, gst, shipping, discount, total, "---------------subtotal, gst, shipping, discount, total from redux---------------");

    // usestates
    const [formData, setFormData] = useState({ name: "", phone: "", city: "", zipcode: "", country: "", address: "", addressType: "", billingType: "" });
    const [billingdata, setBillingData] = useState({ name: "", phone: "", city: "", zipcode: "", country: "", address: "", addressType: "", billingType: "" });
    const [orderNote, setOrderNote] = useState("")
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [selectedBillingAddress, setSelectedBillingAddress] = useState(null);
    const [selectedBilling, setSelectedBillling] = useState("");
    const [address, setUserAddress] = useState([])
    const [sameBilling, setSamBilling] = useState(false)

    const totalPrice = useSelector((state) => state.cart.cartTotal);
    const totalGst = useSelector((state) => state.cart.totalGst);
    const subTotal = useSelector((state) => state.cart.subTotal);
    const [loading, setLoading] = useState(false)




    // user token
    const userToken = localStorage.getItem("userToken") || "";
    if (!userToken) {
        console.log("No user token found!");
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);
        Swal.fire({
            title: "Success",
            text: "Address Added",
            timer: 1000,
            timerProgressBar: true,
            icon: "success",
            showConfirmButton: false,
            confirmButtonColor: "#014308",
        });
        // You can add API call or further processing here
    };


    const handleBillingChange = (e) => {
        const { name, value } = e.target;
        setBillingData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSameAddress = async (e) => {
        const newSameBilling = !sameBilling;
        setSamBilling(newSameBilling);

        console.log(newSameBilling, "---------------sameBilling---------------");

        if (newSameBilling) {
            console.log("hy");
            setBillingData({
                name: formData.name,
                phone: formData.phone,
                city: formData.city,
                zipcode: formData.zipcode,
                country: formData.country,
                address: formData.address,
                addressType: formData.addressType,
                billingType: formData.billingType
            });
        } else {
            setBillingData({});
        }

        console.log(formData, "---------------formData---------------");
        console.log(billingdata, "---------------billingdata---------------");
    };


    const handleShippingAddress = async (id) => {
        setSelectedAddress(id);
        // alert(id)

        const find_address = address.find((item) => item.id === id);
        console.log(find_address, "---------------shipping_address---------------");

        if (find_address) {
            setFormData({
                name: find_address.contact_person_name,
                phone: find_address.phone,
                city: find_address.city,
                zipcode: find_address.zip,
                country: find_address.country,
                address: find_address.address,
                addressType: find_address.address_type,
                billingType: find_address.address_type
            });

            console.log("Updated formData:", find_address);
        }
    };
    const handleBillingAddress = async (id) => {
        setSelectedBillingAddress(id)
        // alert(id)
        const find_address = address.find((item) => item.id === id)
        console.log(find_address, "---------------billing_address---------------");
        if (find_address) {
            setBillingData({ name: formData.name, phone: formData.phone, city: formData.city, zipcode: formData.zip, country: formData.country, address: formData.address, addressType: formData.address_type, billingType: formData.address_type })
        }
        console.log("Updated formData Billing:", find_address);
    }

    // Handle form submission
    const handleBillingSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted:", billingdata);
        Swal.fire({
            title: "Success",
            text: "Address Added",
            timer: 1000,
            timerProgressBar: true,
            icon: "success",
            showConfirmButton: false,
            confirmButtonColor: "#014308",
        });
        // You can add API call or further processing here
    };


    const handlePlaceOrder = async (e) => {

        if (!selectedAddress || !selectedBillingAddress) {
            Swal.fire({
                title: "Error",
                text: "Select Shiiping and Billing address",
                timer: 2000,
                timerProgressBar: true,
                icon: "error",
                showConfirmButton: false,
                confirmButtonColor: "#014308",
            });
            return
        }
        else {
            console.log(formData, "---------------formData---------------");
            console.log(billingdata, "---------------billingdata---------------");
            console.log(selectedBillingAddress, "---------------billingdata 1---------------");
            console.log(selectedAddress, "---------------billingdata 2---------------");
            console.log(orderNote, "---------------billingdata 3---------------");
            // navigate("/payment")
            navigate("/payment", { state: { selectedBillingAddress, selectedAddress, orderNote } });
        }

    };



    useEffect(() => {
        // Fetch product details
        const fetchUserAddress = async () => {
            try {
                setLoading(true)
                const fetch_user_address = await fetchUserAddressService(userToken);
                console.log(fetch_user_address, "---------------user address---------------");

                const userAddress = fetch_user_address?.data;
                console.log(userAddress, "---------------userAddress---------------");
                setUserAddress(userAddress);
                setLoading(false)
            } catch (error) {
                console.log(error, "---------------error---------------");
            }
        };
        fetchUserAddress();
    }, []);


    return (
        <motion.div className='bg-[#FFFFFF] dark:bg-[#121212]'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}>
            <div className='max-w-[1300px] m-auto  flex justify-center flex-col mt-16 pb-10 pt-10 md:px-3 '>






                <ul className="steps p-2 md:p-0">
                    <li className="step step-primary"><span className='font-bold font-subheading text-mainbutton'>Add to Cart</span></li>
                    <li className="step step-primary"><span className='font-bold font-subheading text-mainbutton'>Select Address</span></li>
                    <li className="step"><span className='font-bold font-subheading'>Payment</span></li>
                    <li className="step"><span className='font-bold font-subheading'>Order Placed</span></li>
                </ul>








                <div className="grid grid-cols-1 md:grid-cols-[56%_40%] gap-4 justify-between mt-14 p-4 md:p-0">
                    {/* Left Section: Addresses */}
                    <div className="flex flex-col gap-3 w-full">




                        {/* Shipping Address */}
                        <div>

                            <div className='p-3 md:p-0'>
                                <div className='flex justify-between items-center border-b-2 dark:border-mainbutton pb-2 font-subheading mb-3'>
                                    <h1 className='text-3xl text-mainheading dark:text-mainbutton font-bold'>Shipping Address</h1>
                                    <IoMdAddCircle size={30} className='text-mainheading dark:text-mainbutton hover:cursor-pointer' onClick={() => navigate("/userprofile")} />
                                </div>
                                {loading ? (
                                    <div className='flex flex-col gap-3'>
                                        {/* Skeleton Loader for Address List */}
                                        <div className="justify-center items-center flex border-2 rounded-lg">
                                            <div className="relative flex w-full flex-col md:flex-row animate-pulse gap-2 p-4">
                                                <div className="flex-1">
                                                    <div className="mb-1 h-6 w-full md:w-96 rounded-lg bg-slate-400 text-lg"></div>
                                                    <div className="h-6 w-48 md:w-56 rounded-lg bg-slate-400 text-sm"></div>
                                                </div>
                                                <div className="h-8 w-28 rounded-lg bg-slate-400"></div>
                                            </div>
                                        </div>
                                        <div className="justify-center items-center flex  border-2 rounded-lg">
                                            <div className="relative flex w-full flex-col md:flex-row animate-pulse gap-2 p-4">
                                                <div className="flex-1">
                                                    <div className="mb-1 h-6 w-full md:w-96 rounded-lg bg-slate-400 text-lg"></div>
                                                    <div className="h-6 w-48 md:w-56 rounded-lg bg-slate-400 text-sm"></div>
                                                </div>
                                                <div className="h-8 w-28 rounded-lg bg-slate-400"></div>
                                            </div>
                                        </div>

                                    </div>
                                ) : address.length > 0 ? (
                                    <div className="flex flex-col gap-4">


                                        {address.map((item) => (
                                            <div
                                                key={item.id}
                                                className={`border font-subheading border-gray-300 rounded-md bg-gray-100 dark:bg-black  dark:border-0 overflow-hidden flex flex-col md:flex-row justify-between items-start gap-2 md:gap-0 md:items-center hover:cursor-pointer shadow-sm transition-all hover:shadow-md p-4 ${selectedAddress === item.id ? "bg-mainbutton dark:bg-yellow-500" : ""
                                                    }`}
                                                onClick={() => handleShippingAddress(item.id)}
                                            >
                                                <div className="mt-2 text-gray-800 dark:text-white text-[14px] md:text-[16px]">
                                                    <p className="text-gray-700 dark:text-white">
                                                        {item.address}, {item.city}, {item.state}, {item.country}
                                                    </p>
                                                    <h1>
                                                        {item.contact_person_name}, {item.phone}
                                                    </h1>
                                                </div>

                                                <div className="flex justify-between h-fit items-center bg-yellow-100 rounded-lg ">
                                                    <h1
                                                        className={` text-gray-800 dark:text-white p-2 rounded-lg text-[14px] md:text-[16px] 
                        ${item.address_type === "permanent"
                                                                ? "bg-gray-300"
                                                                : item.address_type === "home"
                                                                    ? "bg-gray-300"
                                                                    : item.address_type === "office"
                                                                        ? "bg-gray-300"
                                                                        : "bg-gray-300"
                                                            }`}
                                                    >
                                                        {item.address_type}
                                                    </h1>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col justify-center items-center text-center gap-4 mt-6 rounded-lg shadow-sm">
                                        <p className="text-lg sm:text-xl font-medium text-gray-700 dark:text-white font-subheading">
                                            Oops! No address saved!
                                        </p>
                                    </div>
                                )}

                            </div>
                        </div>

                        {/* Billing Address */}
                        <div className="mt-6 p-3 md:p-0">
                            <div className='flex justify-between items-center border-b-2 dark:border-mainbutton pb-2 font-subheading mb-3'>
                                <h1 className='text-3xl text-mainheading dark:text-mainbutton font-bold'>Billing Address</h1>
                                <IoMdAddCircle size={30} className='text-mainheading dark:text-mainbutton hover:cursor-pointer' onClick={() => navigate("/userprofile")} />
                            </div>
                            <form className="font-subheading text-mainheading dark:text-white">
                                <input type="checkbox" onClick={() => handleSameAddress} /> Same as Shipping Address
                            </form>
                            <div className={`mt-3  ${sameBilling ? "hidden" : "block"}`}>
                                {loading ? (
                                    <div className='flex flex-col gap-3'>
                                        {/* Skeleton Loader for Address List */}
                                        <div className="justify-center items-center flex border-2 rounded-lg">
                                            <div className="relative flex w-full flex-col md:flex-row animate-pulse gap-2 p-4">
                                                <div className="flex-1">
                                                    <div className="mb-1 h-6 w-full md:w-96 rounded-lg bg-slate-400 text-lg"></div>
                                                    <div className="h-6 w-48 md:w-56 rounded-lg bg-slate-400 text-sm"></div>
                                                </div>
                                                <div className="h-8 w-28 rounded-lg bg-slate-400"></div>
                                            </div>
                                        </div>
                                        <div className="justify-center items-center flex  border-2 rounded-lg">
                                            <div className="relative flex w-full flex-col md:flex-row animate-pulse gap-2 p-4">
                                                <div className="flex-1">
                                                    <div className="mb-1 h-6 w-full md:w-96 rounded-lg bg-slate-400 text-lg"></div>
                                                    <div className="h-6 w-48 md:w-56 rounded-lg bg-slate-400 text-sm"></div>
                                                </div>
                                                <div className="h-8 w-28 rounded-lg bg-slate-400"></div>
                                            </div>
                                        </div>

                                    </div>
                                ) : address.length > 0 ? (
                                    <div className="flex flex-col gap-4">
                                        {address.map((item) => (
                                            <div
                                                key={item.id}
                                                className={`border hover:cursor-pointer font-subheading border-gray-300 dark:bg-black dark:border-0 rounded-md overflow-hidden flex flex-col md:flex-row bg-gray-100 justify-between items-start gap-2 md:gap-0 md:items-center shadow-sm transition-all hover:shadow-md p-4 ${selectedBillingAddress == item.id ? "bg-mainbutton dark:bg-yellow-500" : ""
                                                    }`}
                                                onClick={() => handleBillingAddress(item.id)}
                                            >
                                                <div className="mt-2 text-gray-800 dark:text-white text-[14px] md:text-[16px]">
                                                    <p className="text-gray-700  dark:text-white">
                                                        {item.address}, {item.city}, {item.state}, {item.country}
                                                    </p>
                                                    <h1>{item.contact_person_name}, {item.phone}</h1>
                                                </div>

                                                <div className="flex justify-between items-center">
                                                    <h1
                                                        className={` text-gray-800 dark:text-white p-2 rounded-lg text-[14px] md:text-[16px]
                            ${item.address_type === "permanent"
                                                                ? "bg-gray-300"
                                                                : item.address_type === "home"
                                                                    ? "bg-gray-300"
                                                                    : item.address_type === "office"
                                                                        ? "bg-gray-300"
                                                                        : "bg-gray-300"
                                                            }
                        `}
                                                    >
                                                        {item.address_type}
                                                    </h1>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col justify-center items-center text-center gap-4 mt-6 rounded-lg shadow-sm">
                                        <p className="text-lg sm:text-xl font-medium text-gray-700 font-subheading">
                                            Oops! No address saved!
                                        </p>
                                    </div>
                                )}

                            </div>
                        </div>


                    </div>

                    {/* Right Section: Cart Total */}
                    <div className=" px-4 py-2 font-subheading  bg-gray-50 dark:bg-[#242424] rounded-xl h-fit">

                        <h1 className='text-3xl text-mainheading dark:text-mainbutton font-bold border-b-2 dark:border-mainbutton pb-1'>Summary</h1>


                        {/* Cart Total : subtotal, gst, shipping, discount, total */}
                        <div className="flex flex-col gap-5 p-5   rounded-sm mt-3 ">
                            {/* <h1 className="font-subheading  text-[16px] md:text-xl text-mainbutton">Cart Total</h1> */}
                            <div className="flex justify-between items-center">
                                <h1 className="font-subheading text-mainheading dark:text-white">SubTotal</h1>
                                <h1 className="font-subheading text-mainbutton font-bold">₹{subTotal}/-</h1>
                            </div>
                            {/* <div className="border-b-2 border-gray-400 flex justify-between items-center"> */}
                            <div className="flex justify-between items-center">
                                <h1 className="font-subheading text-mainheading dark:text-white">GST</h1>
                                {/* <h1 className="font-subheading text-mainbutton font-bold">₹ {totalGst}/-</h1> */}
                                <h1 className="font-subheading text-mainbutton font-bold">₹ {gst}/-</h1>
                            </div>
                            <div className="flex justify-between items-center">
                                <h1 className="font-subheading text-mainheading dark:text-white">Shipping</h1>
                                <h1 className="font-subheading text-mainbutton font-bold">₹{shipping}</h1>
                            </div>
                            <div className="flex justify-between items-center">
                                <h1 className="font-subheading text-mainheading dark:text-white">Discount</h1>
                                <h1 className="font-subheading text-mainbutton font-bold">₹ {discount}</h1>
                            </div>

                            <div className="flex justify-between items-center">
                                <h1 className="font-subheading text-mainheading dark:text-white">Total</h1>
                                {/* <h1 className="font-subheading text-mainbutton font-bold">₹ {totalPrice}/-</h1> */}
                                <h1 className="font-subheading text-mainbutton font-bold">₹ {total}/-</h1>
                            </div>

                            <form>
                                <textarea className='border-2 w-full text-mainheading bg-white p-2 font-subheading rounded-md font-medium' onChange={(e) => setOrderNote(e.target.value)} placeholder='Enter order note (Optional)'></textarea>
                            </form>
                            {/* <PrimaryButton label="Pay" onClick={() => navigate("/payment")} /> */}
                            <PrimaryButton label="Pay" onClick={handlePlaceOrder} />
                        </div>
                    </div>





                </div>

            </div>
        </motion.div>
    )
}
