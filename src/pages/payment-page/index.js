import React, { useEffect, useState } from 'react'
import { MainHeading, PrimaryButton, SubHeading } from '../../shared'
import CASH from "../../assets/images/cod.png"
import RAZOR from "../../assets/images/razorpay-icon.png"
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import Swal from "sweetalert2";

import CARTITEM from "../../assets/images/cart-bg-green.png"
import ADDRESS from "../../assets/images/cart-location.png"
import PAYMENT from "../../assets/images/cart-payment.png"
import ORDERPLACED from "../../assets/images/cart-success.png"
import { fetchPaymentTypeApi, generateOrderIdApi, placeOrderApi } from '../../api/services/paymentService'
import axios from 'axios'
import "../../index.css"
import IMAge from "../../assets/images/banners/catagory-3.png"
import { fetchUserCartService } from '../../api/services/productDetailPageService'
import { MdEditSquare } from "react-icons/md";
import { motion } from "framer-motion";

import PLACED from "../../assets/gifs/Packaging For Delivery.gif"





// Static Image Mapping (Frontend)
const paymentImages = {
  paypal: "../../assets/images/razorpay-icon.png",
  // razor_pay: "../../assets/images/razorpay-icon.png",
  razor_pay: RAZOR,
  paytm: "../../assets/images/razorpay-icon.png",
  paystack: "/assets/images/paystack.png",
  stripe: "../../assets/images/razorpay-icon.png ",
  liqpay: "/assets/images/liqpay.png",
  mercadopago: "/assets/images/mercadopago.png",
  flutterwave: "/assets/images/flutterwave.png",
  fawry_pay: "/assets/images/fawry.png",
  paymob_accept: "/assets/images/paymob.png",
  paytabs: "/assets/images/paytabs.png",
  bkash: "/assets/images/bkash.png",
  senang_pay: "/assets/images/senangpay.png",
};

export const PaymentPage = () => {

  const { subtotal, gst, shipping, discount, total } = useSelector((state) => state.cartSummary);
  console.log(total, "---------------total---------------");

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page
  }, []);
  // const totalPrice = useSelector((state) => state.cart.cartTotal);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [disablePayment, setDisablepayment] = useState(false)
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState([]);
  const [userCart, setUserCart] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [cod, setCod] = useState("");

  const { selectedBillingAddress, selectedAddress, orderNote } = location.state || {};

  console.log(selectedBillingAddress, "Received billingdata 1");
  console.log(selectedAddress, "Received billingdata 2");
  console.log(orderNote, "Received billingdata 3");

  const totalPrice = useSelector((state) => state.cart.cartTotal);
  const totalGst = useSelector((state) => state.cart.totalGst);
  const subTotal = useSelector((state) => state.cart.subTotal);

  const userToken = localStorage.getItem("userToken") || "";
  if (!userToken) {
    console.log("No user token found!");
  }

  // fetch user cart
  const fetchUserCart = async () => {
    try {
      setIsLoading(true)
      const fetch_user_cart = await fetchUserCartService(userToken);
      console.log(fetch_user_cart, "---------------fetch_user_cart---------------");

      const fetchCart = fetch_user_cart?.data;
      console.log(fetchCart, "---------------fetchCart User from payment ---------------");
      // alert("aa gya")
      setUserCart(fetchCart)
      setIsLoading(false)
      // setCartItem(fetchCart);

      // let Sub_total = 0
      // let GST = 0
      // let shipping = 0
      // let Discount = 0
      // let Total = 0
      // for (const item of fetchCart) {
      //   Sub_total += item.price * item.quantity
      //   GST += item.tax
      //   Discount += item.discount
      //   shipping += item.shipping_cost
      //   Total += Sub_total + GST + shipping
      //   console.log(Sub_total, GST, Discount, shipping, "---------------item.shipping_cost---------------");
      //   console.log(Total, "---------------TOTAL---------------");
      //   setCartTotal({ ...cartTotal, Subtotal: Sub_total, Shipping: shipping, GST: GST, Discount: Discount, Total: Total })
      // }

      // setIsLoading(false)
    } catch (error) {
      console.log(error, "---------------error---------------");
    }
  };

  // const handleCashOnDelivery = async (e) => {

  //   e.preventDefault()
  //   const userToken = localStorage.getItem("userToken") || "";
  //   if (!userToken) {
  //     console.log("No user token found!");
  //   }
  //   try {
  //     // subject, type, description, priority
  //     const formData = {
  //       billing_address_id: selectedBillingAddress,
  //       shipping_address_id: selectedAddress,
  //       order_note: orderNote,
  //     }


  //     const place_order = await placeOrderApi(formData, userToken)
  //     const ticketAdd = place_order?.data;
  //     // if (ticketAdd?.success) {
  //     if (place_order?.status === 200) {
  //       Swal.fire({
  //         title: "Success",
  //         text: "Order placed succesfully.",
  //         timer: 1000,
  //         timerProgressBar: true,
  //         icon: "success",
  //         showConfirmButton: false,
  //         confirmButtonColor: "#014308",
  //       });
  //       navigate("/summery")
  //       // setInputdata({ subject: "", delivery_type: "", priority: "", message: "" })
  //       // fetchUserSupportTicket()
  //       // setIsOpen(false)
  //     }
  //   }
  //   catch (error) {
  //     console.log(error, "---------------error---------------");

  //     // Extract validation errors
  //     const errors = error?.errors || [{ message: "Something went wrong" }];

  //     // Join all error messages into a single string
  //     const errorMessage = errors.map(err => err.message).join("\n");

  //     Swal.fire({
  //       title: "Error",
  //       text: errorMessage, // Show all errors in alert
  //       icon: "error"
  //     });
  //   }

  // }

  // fetch user cart

  const handleCashOnDelivery = async (e) => {
    setPlacingOrder(true)
    setDisablepayment(true)
    e.preventDefault();
    const userToken = localStorage.getItem("userToken") || "";
    if (!userToken) {
      console.log("No user token found!");
      return;
    }

    try {
      const formData = {
        billing_address_id: selectedBillingAddress,
        shipping_address_id: selectedAddress,
        order_note: orderNote,
      };

      const place_order = await placeOrderApi(formData, userToken);

      if (place_order?.status === 200) {
        setPlacingOrder(false)
        setDisablepayment(false)
        setIsModalOpen(true); // Open modal after successful order
      }
    } catch (error) {
      console.log(error, "---------------error---------------");

      const errors = error?.errors || [{ message: "Something went wrong" }];
      const errorMessage = errors.map((err) => err.message).join("\n");
      setDisablepayment(false)
      Swal.fire({
        title: "Error",
        text: errorMessage,
        icon: "error",
      });
    }
  };
  useEffect(() => {
    fetchUserCart()
  }, [])

  useEffect(() => {
    const fetchDeliveryType = async (e) => {

      try {

        const payment_types = await fetchPaymentTypeApi()
        const ticketAdd = payment_types?.data;
        // if (ticketAdd?.success) {
        if (payment_types?.status === 200) {
          console.log(ticketAdd.payment_key, "---------------ticketAdd---------------");
          // setPaymentData(ticketAdd.payment_key || []);
          setCod(ticketAdd.cash_on_delivery)
          // console.log(ticketAdd.cash_on_delivery)

          const parsedPayments = Object.entries(ticketAdd.payment_key)
            .map(([key, value]) => ({
              name: key,
              details: JSON.parse(value),
            }))
            .filter((payment) => payment.details.status === "1");

          setPaymentData(parsedPayments);
        }
      }
      catch (error) {
        console.log(error, "---------------error---------------");
        const errors = error?.errors || [{ message: "Something went wrong" }];
        const errorMessage = errors.map(err => err.message).join("\n");
        Swal.fire({
          title: "Error",
          text: errorMessage,
          icon: "error"
        });
      }

    }
    fetchDeliveryType()
    console.log(paymentData, "---------------paymentData---------------");
  }, [])


  const handleBuyNow = async () => {

    // generate order id
    try {
      // const generate_order_id = await generateOrderIdApi()
      // const ticketAdd = generate_order_id?.data;
      // // if (ticketAdd?.success) {
      // if (generate_order_id?.status === 200) {

      console.log(totalPrice, "---------------totalPrice---------------");

      const options = {
        key: "rzp_test_JcKga75DjRr7N2",
        key_secret: "9PSlPKSn6Qupmw0F7xkbiy2u",
        // amount: 4000 * 100,
        amount: total* 100,
        currency: "INR",
        name: "Mukesh Gems & Jewellers",
        description: "Pay Now",
        // order_id: "dsjkcjkdshcjk",
        callback_url: 'http://localhost:3000/contact',
        handler: async (response) => {
          console.log(response, "---------------response---------------");
          alert(response, "---------------response---------------");
          // const verify = await axios.post("http://localhost:5000/verify-payment", response);
          // if (verify.data.success) {
          //   alert("Payment Successful!");
          // } else {
          //   alert("Payment Verification Failed!");
          // }
          alert("Payment Successful!");
        },
        prefill: {
          name: "John Doe",
          email: "john@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();


      // }




    }
    catch (error) {

    }






  }

  return (

    <motion.div className='bg-[#ffffff] dark:bg-[#121212]'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}>
      <div className="max-w-[1300px] mx-auto flex flex-col justify-center   mt-16 py-10 px-4">


        {/* progress steps */}
        <ul className="steps p-2 md:p-0 z-499">
          <li className="step step-primary"><span className='font-bold font-subheading text-mainbutton'>Add to Cart</span></li>
          <li className="step step-primary"><span className='font-bold font-subheading text-mainbutton'>Select Address</span></li>
          <li className="step step-primary"><span className='font-bold font-subheading text-mainbutton'>Payment</span></li>
          <li className="step"><span className='font-bold font-subheading'>Order Placed</span></li>
        </ul>

        {/* Payment method and order summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 self-center gap-6 justify-center  mt-10 ">

          {/* Payment method */}
          <div className="order-2 md:order-1 flex flex-col gap-3 max-w-[600px] rounded-lg   p-3">

            {/* heading */}
            <div className='flex justify-between items-center border-b-2 dark:border-mainbutton pb-2 font-subheading mb-3'>
              <h1 className='text-3xl text-mainheading dark:text-mainbutton font-bold'>Make Payment</h1>
            </div>

            <div>

              {/* mapping all payment methods */}
              <div className="flex justify-evenly gap-3  items-center flex-wrap ">

                {cod === true ? (
                  <div className="rounded-lg">
                    {disablePayment ? (
                      <div
                        class="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"
                      ></div>
                      // Show loading text when disabled
                    ) : (
                      <img
                        className="w-[80px] md:w-[150px] hover:scale-105 transition-all duration-150"
                        src={CASH}
                        alt="Cash Payment"
                        onClick={handleCashOnDelivery}
                      />
                    )}
                  </div>
                ) : null}

                {/* Success Modal */}
                {isModalOpen && (
                  <div className="fixed inset-0 flex z-50 items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white max-w-[500px] m-6 flex flex-col items-center dark:bg-[#1E1E1E] p-6 rounded-lg shadow-lg">
                      <img src={PLACED} alt="vv" className='w-[80px]' />
                      <h2 className="text-[14px] md:text-xl text-center font-semibold text-gray-800 dark:text-white">
                        Order Placed Successfully!
                      </h2>
                      <p className="text-gray-600 text-[14px] text-center md:text-[16px] dark:text-gray-300 mt-2">
                        You order has been confirmed and will be shipped according to the method you selected!
                      </p>

                      {/* buttons */}
                      <div className=' flex flex-col md:flex-row gap-0 md:gap-3'>
                        {/* <button
                        className="mt-4 px-4 py-2 bg-mainbutton text-white rounded"
                        onClick={() => {
                          setIsModalOpen(false);
                          // navigate("/summery"); // Redirect after closing modal
                        }}
                      >
                        Go to Summary
                      </button> */}

                        <button
                          className="mt-4 px-4 py-2 bg-mainbutton text-[14px] md:text-[16px] text-white rounded"
                          onClick={() => {
                            setIsModalOpen(false);
                            navigate("/"); // Redirect after closing modal
                          }}
                        >
                          Shop More
                        </button>

                        <button
                          className="mt-4 px-4 py-2 bg-mainbutton text-[14px] md:text-[16px] text-white rounded"
                          onClick={() => {
                            setIsModalOpen(false);
                            navigate("/userprofile"); // Redirect after closing modal
                          }}
                        >
                          Order Details
                        </button>
                      </div>

                    </div>


                  </div>
                )}
                {paymentData.map((payment) => (
                  <div key={payment.name} className="rounded-lg p-3" onClick={() => handleBuyNow("12")}>
                    <img
                      className="w-[100px] md:w-[150px] hover:scale-105 transition-all duration-150"
                      src={paymentImages[payment.name] || CASH} // Fallback to a default image
                      alt={`${payment.name} Payment`}
                    />
                    <p>{cod}</p>
                  </div>
                ))}
              </div>

              {/* static delivery instrucstions */}
              <div className='flex gap-2 justify-evenly items-center border-t-2 dark:border-mainbutton pt-4'>
                <div className='flex flex-col items-center justify-center'>
                  <img className='w-10' src="https://mukeshgems.idea2reality.tech/public/assets/front-end/png/delivery.png" alt="safe ddelivery" />
                  <p className='text-[12px] text-center md:text-[14px]'>3 Days free delivery </p>
                </div>

                <div className='flex flex-col items-center justify-center'>
                  <img className='w-10' src="https://mukeshgems.idea2reality.tech/public/assets/front-end/png/money.png" alt="safe ddelivery" />
                  <p className='text-[12px] text-center md:text-[14px]'>Money back guarantee</p>
                </div>

                <div className='flex flex-col items-center justify-center'>
                  <img className='w-10' src="https://mukeshgems.idea2reality.tech/public/assets/front-end/png/Genuine.png" alt="safe ddelivery" />
                  <p className='text-[12px] text-center md:text-[14px]'>100% Genuine Product</p>
                </div>

                <div className='flex flex-col items-center justify-center'>
                  <img className='w-10' src="https://mukeshgems.idea2reality.tech/public/assets/front-end/png/Payment.png" alt="safe ddelivery" />
                  <p className='text-[12px] text-center md:text-[14px]'>Authentic payment</p>
                </div>

              </div>

            </div>
          </div>

          {/* order summary */}
          <div className="order-1 md:order-2 px-4 py-2 font-subheading  bg-gray-50 dark:bg-[#242424] rounded-xl h-fit">

            <h1 className='text-3xl text-mainheading dark:text-mainbutton font-bold border-b-2 dark:border-mainbutton pb-1'>Summary</h1>

            {/* cart items */}
            <div className="flex flex-col gap-5 p-5   rounded-sm mt-3 ">
              {
                isLoading ? (
                  // skeleton
                  <div className='flex flex-col gap-3'>
                    <div className="justify-center items-center flex rounded-lg">
                      <div className="relative flex w-full flex-row animate-pulse gap-3 p-4">
                        <div className="h-14 w-14 md:h-20 md:w-20 rounded-full bg-slate-400"></div>
                        <div className="flex-1">
                          <div className="mb-1 h-6 w-full md:w-96 rounded-lg bg-slate-400 text-lg"></div>
                          <div className="h-6  w-full md:w-56 rounded-lg bg-slate-400 text-sm"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : userCart.length > 0 ? (
                  <>
                    {/* user cart items */}
                    {userCart.map((item) => (
                      <div key={item.id} className='flex gap-3'>
                        <img src={IMAge} alt="cc" className='w-20 h-20 rounded-full' />
                        <div>
                          <p className='text-mainheading dark:text-white font-medium text-[14px] md:text-[16px]'>{item.product.name}</p>
                          <p className='bg-mainbutton w-fit text-[12px] md:text-[14px] text-white px-2 py-1 rounded-lg'>
                            Quantity: {item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}

                    {/* edit cart button */}
                    <p
                      className='p-2 rounded-lg m-auto text-mainheading dark:text-mainbutton hover:underline hover:cursor-pointer transition-all duration-300 flex gap-1 items-center'
                      onClick={() => navigate("/cart")}
                    >
                      <MdEditSquare />
                      <span>Edit Cart</span>
                    </p>
                  </>
                ) : (
                  <p className='bg-mainbutton p-2 rounded-lg text-center'>Empty Cart</p>
                )
              }
            </div>
          </div>

        </div>
      </div>
    </motion.div>

  )
}
