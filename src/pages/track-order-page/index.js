// import
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";

// api
import { trackOrderService } from '../../api/services/userProfileService';

// assets
import CARTITEM from "../../assets/images/cart-bg-green.png"
import ADDRESS from "../../assets/images/cart-location.png"
import PAYMENT from "../../assets/images/cart-payment.png"
import ORDERPLACED from "../../assets/images/cart-success.png"
import CHECK from "../../assets/images/check.png"
import CROSS from "../../assets/images/cross-circle.png"

export const TrackOrderScreen = () => {

    // declaration ***********************************************************
    const id = useParams()
    const navigate = useNavigate()

    const userToken = localStorage.getItem("userToken") || "";
    if (!userToken) {
        console.log("No user token found!");
    }

    // use-states ************************************************************
    const [trackOrderDetail, setTrackOrderDetail] = useState([])

    // use-effects ******************************************************

    // fetching order tracking details
    useEffect(() => {
        const trackOrder = async () => {
            try {
                const formData = {
                    order_id: id.id
                }
                const fetch_track_order = await trackOrderService(userToken, formData);
                console.log(fetch_track_order, "---------------fetch_track_order---------------");

                const trackOrder = fetch_track_order?.data;
                setTrackOrderDetail(trackOrder)
                console.log(trackOrder, "---------------trackOrder---------------");
            } catch (error) {
                console.log(error, "---------------error---------------");
            }
        };

        trackOrder();
        // console.log(orderDetails, "---------------orderDetails---------------");
    }, []);


    return (

        <div className="mt-16 py-10 max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto px-4">
            {/* Order Tracking Header */}
            <p className="text-mainbutton text-xl md:text-2xl font-semibold border-b-2 border-mainbutton pb-2 text-center">
                Track Order #{trackOrderDetail.id}
            </p>

            {/* Order Details */}
            <div className="mt-6 bg-white shadow-md rounded-lg p-4 md:p-6">
                <p className="text-sm md:text-lg font-semibold text-gray-700">
                    <span className="text-gray-900">Order ID:</span> {trackOrderDetail.id}
                </p>
                <p className="text-sm md:text-lg font-semibold text-gray-700">
                    <span className="text-gray-900">Payment Method:</span> {trackOrderDetail.payment_method}
                </p>
                <p className="text-sm md:text-lg font-semibold text-gray-700">
                    <span className="text-gray-900">Order Amount:</span> ₹{trackOrderDetail.order_amount}
                </p>
                <p className="text-sm md:text-lg font-semibold text-gray-700">
                    <span className="text-gray-900">Order Status:</span> {trackOrderDetail.order_status}
                </p>
            </div>

          

            {/* Support Section */}
            <div className="mt-5 text-center">
                <p>
                    Having an issue?{" "}
                    <button
                        className="text-mainbutton font-medium underline"
                        onClick={() => navigate("/contact")}
                    >
                        Contact Us
                    </button>
                </p>
            </div>
        </div>


    )
}
