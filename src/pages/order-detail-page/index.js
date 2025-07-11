import React, { useEffect, useState } from 'react'
import { cancelOrderApi, downloadInvoiceApi, fetchUserSingleOrdersService, trackOrderService } from '../../api/services/userProfileService';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { MdCancel } from "react-icons/md";
import { HiDocumentText } from "react-icons/hi2";
import { MdPayments } from "react-icons/md";
import { RiMapPinTimeFill } from "react-icons/ri";
import { FaRupeeSign } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { motion } from "framer-motion";







export const OrderDetailScreen = () => {


    // declaration ****************************************************
    const id = useParams()
    const location = useLocation();

    // fetching data from navigation **********************************
    const { date, shipping_address, billing_address, order_note } = location.state || {}

    // fetching login user token
    const userToken = localStorage.getItem("userToken") || "";
    if (!userToken) {
        console.log("No user token found!");
    }

    // states ********************************************************
    const [orderDetails, SetOrderDetails] = useState([])
    const [cartTotal, setCartTotal] = useState({ Subtotal: "", GST: "", Shipping: "", Discount: "", Total: "" })
    const [trackOrderDetail, setTrackOrderDetail] = useState([])
    const [opentracking, setOpenTracking] = useState(false)

    // api calls ******************************************************

    // download invoice
    const handleDownloadInvoice = async (e) => {
        try {
            const formData = {
                order_id: 1,
            }
            const download_invoice = await downloadInvoiceApi(formData, userToken)
            const download = download_invoice?.data;
            if (download_invoice.status === 200) {
                // Swal.fire({
                //     title: "Success",
                //     text: "Address added successfully",
                //     timer: 1000,
                //     timerProgressBar: true,
                //     icon: "success",
                //     showConfirmButton: false,
                //     confirmButtonColor: "#014308",
                // });
            }
        }
        catch (error) {
            console.log(error, "---------------error---------------");
            const errors = error?.errors || [{ message: "Something went wrong" }];
            const errorMessage = errors.map(err => err.message).join("\n");
            // Swal.fire({
            //     title: "Error",
            //     text: errorMessage, // Show all errors in alert
            //     icon: "error"
            // });
        }
    };

    // cancel order
    const handleCancelOrder = async (e) => {
        try {
            const formData = {
                order_id: id.id
            }
            const cancel_order = await cancelOrderApi(formData, userToken)
            const cancel = cancel_order?.data;
            console.log(cancel, "---------------cancel---------------");
            if (cancel_order.status === 200) {
                // Swal.fire({
                //     title: "Success",
                //     text: "Address added successfully",
                //     timer: 1000,
                //     timerProgressBar: true,
                //     icon: "success",
                //     showConfirmButton: false,
                //     confirmButtonColor: "#014308",
                // });
            }
        }
        catch (error) {
            console.log(error, "---------------error---------------");
            const errors = error?.errors || [{ message: "Something went wrong" }];
            const errorMessage = errors.map(err => err.message).join("\n");
            // Swal.fire({
            //     title: "Error",
            //     text: errorMessage, // Show all errors in alert
            //     icon: "error"
            // });
        }
    };

    // track order details
    const trackOrder = async () => {
        try {
            const formData = {
                order_id: id.id
            }
            const fetch_track_order = await trackOrderService(userToken, formData);
            console.log(fetch_track_order, "---------------fetch_track_order from order detail---------------");

            const trackOrder = fetch_track_order?.data;
            setTrackOrderDetail(trackOrder)
            console.log(trackOrder, "---------------trackOrder---------------");
        } catch (error) {
            console.log(error, "---------------error---------------");
        }
    };

    // use-effects ****************************************************
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const fetchSingleOrder = async () => {
            try {
                const formData = {
                    order_id: id
                }
                // alert(userToken)
                const fetch_single_order = await fetchUserSingleOrdersService(userToken, formData);
                console.log(fetch_single_order, "---------------fetch_single_order---------------");

                const order = fetch_single_order?.data;
                console.log(order, "---------------order ****************8---------------");
                SetOrderDetails(order)
                // let Sub_total= 0
                // let GST = 0
                // let shipping = 0
                // let Discount = 0
                // let Total = 0
                // for(const item of order){
                //     Sub_total += item.price * item.qty
                //     shipping += item.shipping_cost
                //     console.log(item.shipping_cost, "---------------item.shipping_cost---------------");
                //     setCartTotal({...cartTotal, Subtotal:Sub_total, Shipping:shipping})
                // }
                let Sub_total = 0
                let gst = 0
                let shipping = 0
                let discount = 0
                let total = 0
                for (const item of order) {
                    Sub_total += item.price * item.qty
                    gst += item.tax
                    discount += item.discount
                    shipping += item.product_details.shipping_cost
                    total += Sub_total + gst + shipping
                    console.log(Sub_total, gst, discount, shipping, "---------------item.shipping_cost---------------");
                    console.log(total, "---------------TOTAL---------------");
                    setCartTotal({ ...cartTotal, Subtotal: Sub_total, Shipping: shipping, GST: gst, Discount: discount, Total: total })
                }
                // alert(shipping)

                // setOrders(order || []); // Ensure it's always an array
            } catch (error) {
                console.log(error, "---------------error---------------");
            }
        };

        fetchSingleOrder();
        trackOrder()
        console.log(orderDetails, "---------------orderDetails---------------");
    }, []);


    return (
        <div className="mt-10 px-4 mb-0 bg-white dark:bg-[#1B1B1B] pt-6 pb-6 ">
            <div className="max-w-3xl mx-auto bg-white dark:bg-[#1B1B1B] shadow-lg rounded-lg p-6 sm:p-8 mt-6 dark:border-2 dark:border-mainbutton">

                {/* Order Title */}
                <h1 className="text-2xl font-semibold flex justify-between text-mainbutton border-b-2 border-mainbutton pb-3">
                    <span>Order Details</span>
                    <MdCancel className='text-red-500 hover:cursor-pointer' onClick={handleCancelOrder} />
                </h1>

                {/* Order Info */}
                <div className="flex flex-col sm:flex-row sm:justify-between items-center bg-gray-100 dark:bg-[#252525] p-3 rounded-lg mt-4">
                    <h1 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                        Order ID: <span className="font-bold">#{id.id}</span>
                    </h1>
                    <h1 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                        {/* Date: <span className="font-bold">{date}</span> */}
                        Date: <span className="font-bold">{new Date(date).toLocaleDateString("en-US", { year: "2-digit", month: "2-digit", day: "2-digit" })}             </span>
                    </h1>
                </div>

                {/* Order Items */}
                <div className="mt-6">
                    {orderDetails.length > 0 ? (
                        orderDetails.map((item) => (
                            <div key={item.id} className="flex flex-col sm:flex-row items-center gap-4 border-b py-4">
                                {/* Product Image */}
                                <img
                                    src={`https://mukeshgems.idea2reality.tech/storage/app/public/product/thumbnail/${item.product_details.thumbnail}`}
                                    alt="product"
                                    className="w-24 h-24 object-cover rounded-md shadow-md"
                                />
                                {/* Product Details */}
                                <div className="flex-1 text-center sm:text-left">
                                    <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">{item.product_details.name}</p>
                                    <p className="text-gray-600 dark:text-gray-400">₹{item.product_details.purchase_price}</p>
                                </div>
                                {/* Quantity & Price */}
                                <div className="text-center">
                                    <p className="text-lg font-semibold text-mainbutton">Qty: {item.qty}</p>
                                    <p className="text-gray-700 dark:text-gray-300">₹{item.product_details.purchase_price * item.qty}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No items in this order.</p>
                    )}
                </div>

                {/* Order Note */}
                {order_note && (
                    <div className="mt-6 bg-gray-100 dark:bg-[#252525] p-4 rounded-lg">
                        <p className="font-semibold text-mainbutton">Order Note:</p>
                        <p className="text-gray-700 dark:text-gray-300">{order_note}</p>
                    </div>
                )}

                {/* Shipping & Billing Address */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[#E5C663] text-white p-5 rounded-lg mt-6">
                    {/* Shipping Address */}
                    {
                        !shipping_address ?
                            <div>
                                <p className="text-xl font-semibold mb-2">Billing Address</p>
                                {
                                    billing_address === "" ?
                                        <p>No Billing address found.</p> :
                                        <>
                                            <p>{billing_address.contact_person_name ? billing_address.contact_person_name : ""}, {billing_address.phone}</p>
                                            <p>{billing_address.address}, {billing_address.city}, {billing_address.zip}</p>
                                        </>
                                }
                            </div>
                            :
                            <div>
                                <p className="text-xl font-semibold mb-2">Shipping Address</p>
                                <p>{shipping_address.contact_person_name ? shipping_address.contact_person_name : ""}, {shipping_address.phone ? shipping_address.phone : ""}</p>
                                <p>{shipping_address.address ? shipping_address.address : ""}, {shipping_address.city ? shipping_address.city : ""}, {shipping_address.zip ? shipping_address.zip : ""}</p>
                            </div>
                    }

                    {/* Billing Address */}
                    <div>
                        <p className="text-xl font-semibold mb-2">Billing Address</p>
                        {
                            billing_address === "" ?
                                <p>No Billing address found.</p> :
                                <>
                                    <p>{billing_address.contact_person_name ? billing_address.contact_person_name : ""}, {billing_address.phone}</p>
                                    <p>{billing_address.address}, {billing_address.city}, {billing_address.zip}</p>
                                </>
                        }
                    </div>
                </div>

                {/* Cart Summary & Actions */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3">
                        <button
                            className="bg-mainbutton text-white p-3 rounded-lg hover:opacity-80 transition"
                            onClick={handleDownloadInvoice}
                        >
                            Download Invoice
                        </button>
                        {/* <button className="bg-mainbutton text-white p-3 rounded-lg hover:opacity-80 transition" onClick={() => navigate(`/track-order/${id.id}`)}> */}
                        <button className="bg-mainbutton text-white p-3 rounded-lg hover:opacity-80 transition" onClick={() => setOpenTracking(true)}>
                            Track Order
                        </button>
                    </div>

                    {/* Cart Summary */}
                    <div className="bg-gray-100 dark:bg-[#252525] p-5 rounded-lg shadow-lg">
                        <h1 className="text-xl font-semibold text-mainbutton mb-4">Cart Total</h1>
                        <div className="border-b pb-2 flex justify-between">
                            <p className="text-gray-700 dark:text-gray-300">Subtotal</p>
                            <p className="text-mainbutton">₹{cartTotal.Subtotal}</p>
                        </div>
                        <div className="border-b py-2 flex justify-between">
                            <p className="text-gray-700 dark:text-gray-300">GST</p>
                            <p className="text-mainbutton">₹{cartTotal.GST}</p>
                        </div>
                        <div className="border-b py-2 flex justify-between">
                            <p className="text-gray-700 dark:text-gray-300">Shipping</p>
                            <p className="text-green-500 font-semibold">{cartTotal.Shipping}!</p>
                        </div>
                        <div className="border-b py-2 flex justify-between">
                            <p className="text-gray-700 dark:text-gray-300">Discount</p>
                            <p className="text-green-500 font-semibold">₹{cartTotal.Discount}</p>
                        </div>
                        <div className="flex justify-between font-bold text-lg pt-3">
                            <p className="text-gray-800 dark:text-gray-200">Total</p>
                            <p className="text-mainbutton">₹{cartTotal.Total}</p>
                        </div>
                    </div>
                </div>

                {/* track order : model open on clicking on track order */}
                {opentracking && (
                    <div className="fixed inset-0  bg-opacity-20 mt-6 bg-white flex justify-center items-center shadow-md rounded-lg p-4 md:p-6"

                    >
                        {/* <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-4 z-50"> */}
                        <motion.div className='bg-white dark:bg-[#1B1B1B] p-5 rounded-lg gap-4 flex flex-col shadow-xl'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className='flex justify-between text-mainheading dark:text-gray-200'>
                                <p className='font-bold text-[16px] md:text-lg'>Track Status</p>
                                <IoIosCloseCircle className='self-end text-[20px] md:text-[25px] hover:cursor-pointer' onClick={() => setOpenTracking(false)} />
                            </div>

                            <div className='flex justify-center items-center flex-wrap flex-row mt-5 gap-6'>
                                <p className="text-sm md:text-[16px] gap-2 items-center justify-center flex flex-col font-semibold text-gray-700 dark:text-white">
                                    <HiDocumentText className='text-secondprimary dark:text-mainbutton text-[25px]' />
                                    <p className='text-secondprimary dark:text-mainbutton font-bold'>Order ID:</p>
                                    <p className='font-semibold'>{trackOrderDetail.id}</p>
                                </p>
                                <p className="text-sm md:text-[16px] gap-2 items-center justify-center flex flex-col font-semibold text-gray-700 dark:text-white">
                                    <MdPayments className='text-secondprimary dark:text-mainbutton text-[25px]' />
                                    <p className='text-secondprimary dark:text-mainbutton font-bold'>Payment Method:</p>
                                    <p className='font-semibold'>{trackOrderDetail.payment_method}</p>
                                </p>
                                <p className="text-sm md:text-[16px] gap-2 items-center justify-center flex flex-col font-semibold text-gray-700 dark:text-white">
                                    <FaRupeeSign className='text-secondprimary dark:text-mainbutton text-[25px]' />
                                    <p className='text-secondprimary dark:text-mainbutton font-bold'>Order Amount:</p>
                                    <p className='font-semibold bg-green-400 p-1 rounded-lg'>₹{trackOrderDetail.order_amount}</p>
                                </p>
                                <p className="text-sm md:text-[16px] gap-2 items-center justify-center flex flex-col font-semibold text-gray-700 dark:text-white">
                                    <RiMapPinTimeFill className='text-secondprimary dark:text-mainbutton text-[25px]' />
                                    <p className='text-secondprimary dark:text-mainbutton font-bold'>Order Status:</p>
                                    <p className={`font-semibold p-1 rounded-lg ${trackOrderDetail.order_status === "pending" ? "bg-yellow-400" :
                                        trackOrderDetail.order_status === "Delivered" ? "bg-green-400" :
                                            trackOrderDetail.order_status === "In Transit" ? "bg-blue-400" :
                                                trackOrderDetail.order_status === "Canceled" ? "bg-red-400" : "bg-gray-400"
                                        }`}>
                                        {trackOrderDetail.order_status}
                                    </p>

                                </p>
                            </div>

                        </motion.div>
                    </div>
                )
                }

            </div>
        </div>

    )
}
