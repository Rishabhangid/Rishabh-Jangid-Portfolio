// import
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// assests
import NOORDERGIF from "../../../../assets/gifs/ring-box.gif";

// api
import { fetchUserAllOrdersService, userOrderSearchApi } from "../../../../api/services/userProfileService";


export const OrderPageSection = () => {

  // declaration
  const navigate = useNavigate();
  const userToken = localStorage.getItem("userToken") || "";
  if (!userToken) {
    console.log("No user token found!");
  }

  // states
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [search, setSearch] = useState("")

  // api
  const handleSearch = async (e) => {
    try {
      setSearch(e.target.value)
      console.log(search, "---------------search---------------");

      if (!userToken) {
        console.log("No user token found!");
        return;
      }

      const formData = {
        billing_address_id: "rose",
      };

      const place_order = await userOrderSearchApi(formData, userToken);
      if (place_order?.status === 200) {
        setOrders("rose")
      }

    }
    catch (error) {
      console.log(error, "---------------error---------------");
    }
  }


  // use-effects
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchUserAllAddress = async () => {
      try {
        setIsLoading(true)
        const fetch_orders = await fetchUserAllOrdersService(userToken);
        console.log(fetch_orders, "---------------fetch_orders---------------");

        const all_orders = fetch_orders?.data;
        console.log(all_orders, "---------------all_orders---------------");

        setOrders(all_orders || []); // Ensure it's always an array
        setIsLoading(false)
      } catch (error) {
        console.log(error, "---------------error---------------");
      }
    };

    fetchUserAllAddress();
  }, []);

  return (

    <motion.div className="dark:bg-[#1B1B1B] bg-white p-5 rounded-lg  shadow-lg"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 14 }}
    >
      {/* heading : All Orders */}
      {/* font-subheading */}
      <div className='flex justify-between items-center border-b-2 dark:border-mainbutton pb-2  mb-4'>
        <h1 className='text-2xl text-mainheading dark:text-mainbutton font-bold'>All Orders</h1>
        <form>
          <div className="relative flex items-center max-w-[190px]">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="absolute left-4 w-4 h-4 fill-[#160a0a] text-mainheading pointer-events-none"
            >
              <g>
                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
              </g>
            </svg>
            <input
              id="query"
              type="search"
              placeholder="Search"
              name="search"
              onChange={handleSearch}
              className="w-full h-[45px] pl-10 text-mainheading bg-[#ffffff] rounded-xl border-0 outline-none shadow-[0_0_0_1.5px_#2b2c37,0_0_25px_-17px_#000] transition-all duration-300 ease-in-out cursor-text focus:shadow-[0_0_0_2.5px_#2f303d] hover:shadow-[0_0_0_2.5px_#2f303d,0px_0px_25px_-15px_#000] active:scale-95"
            />
          </div>
        </form>
      </div>

      {/* mapping all orders */}
      <div className=" p-6 rounded-lg">

        {isLoading ? (

          // loading skeleton
          <div className="flex justify-center items-center h-32">
            <div className="flex flex-row gap-2">
              <div className="w-4 h-4 rounded-full bg-mainbutton animate-bounce [animation-delay:.7s]"></div>
              <div className="w-4 h-4 rounded-full bg-mainbutton animate-bounce [animation-delay:.3s]"></div>
              <div className="w-4 h-4 rounded-full bg-mainbutton animate-bounce [animation-delay:.7s]"></div>
            </div>
          </div>

        ) : orders.length > 0 ? (

          <div>

            {/* Order Heading - Hidden on Small Screens */}
            <div className="hidden md:grid grid-cols-5 text-lg text-white p-2 rounded-lg bg-mainbutton  dark:text-white  border-b border-gray-300 dark:border-0 pb-2">
              <h1 className="text-center">ORDER ID</h1>
              <h1 className="text-center">PRODUCT</h1>
              <h1 className="text-center">AMOUNT</h1>
              <h1 className="text-center">DATE</h1>
              <h1 className="text-center">STATUS</h1>
            </div>

            {/* Mapping Orders List */}
            {orders.map((item) => (
              <div
                key={item.id}
                onClick={() =>
                  navigate(`/order-details/${item.id}`, {
                    state: { //sending required data to next page
                      date: item.created_at,
                      shipping_address: item.shipping_address_data,
                      billing_address: item.billing_address_data ? item.billing_address_data : "",
                      order_note: item.order_note,
                    },
                  })
                }
                className="border-b border-gray-200 font-subheading hover:bg-gray-100 hover:cursor-pointer dark:hover:bg-[#252525] transition p-3 md:grid md:grid-cols-5 md:py-3 md:items-center"
              >

                {/* Mobile View (Stacked Cards) */}
                <div className="md:hidden font-subheading dark:text-white flex flex-col gap-2 text-sm">
                  <p>
                    <span className="font-semibold">Order ID:</span> {item.id}
                  </p>
                  <p>
                    <span className="font-semibold">Product:</span> {item.payment_method}
                  </p>
                  <p>
                    <span className="font-semibold">Amount:</span> {item.order_amount}
                  </p>
                  <p>
                    <span className="font-semibold">Date:</span> {item.created_at}
                  </p>
                  <p className={`font-semibold ${item.status === "Delivered" ? "text-green-500" : "text-yellow-500"}`}>
                    Status: {item.order_status}
                  </p>
                </div>

                {/* Desktop View (Grid Layout) */}
                <p className="hidden md:block text-center text-gray-600 dark:text-white">{item.id}</p>
                <p className="hidden md:block text-center text-gray-600 dark:text-white">{item.payment_method}</p>
                <p className="hidden md:block text-center text-gray-600 dark:text-white">{item.order_amount}</p>
                <p className="hidden md:block text-center text-gray-600 dark:text-white">
                  {new Date(item.created_at).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <p
                  className={`hidden md:block text-center rounded-lg w-fit m-auto p-2 text-gray-600 font-medium text-sm md:text-base 
                              ${item.order_status === "canceled" ? "text-white bg-red-500" :
                      item.order_status === "pending" ? "text-white bg-orange-500" :
                        item.order_status === "delivered" ? "text-white bg-green-500" :
                          item.order_status === "out_for_delivery" ? "text-white bg-blue-500" :
                            item.order_status === "confirmed" ? "text-white bg-purple-500" :
                              "text-yellow-500"
                    }`}
                >
                  {item.order_status}
                </p>
              </div>

            ))}

          </div>

        ) : (

          // if no order found 
          <div className="flex flex-col justify-center items-center text-center mt-6">

            <img src={NOORDERGIF} alt="No Orders Found" className="w-20 md:w-40 mb-4" />
            <p className="text-lg text-gray-600 dark:text-gray-300">Oops! No orders yet – time to treat yourself!</p>
            <Link
              to="/"
              className="mt-4 bg-[#D4AF37] px-6 py-2 rounded-lg text-white text-lg hover:opacity-80 transition"
            >
              Shop Now
            </Link>

          </div>
        )}

      </div>

    </motion.div>
  );
};

