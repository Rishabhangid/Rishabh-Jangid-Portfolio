import React, { useEffect, useState } from 'react'
import { IoOpenOutline } from "react-icons/io5";
import { fetchUserWishlist } from '../../../../api/services/userProfileService';
import { Link } from 'react-router-dom';
import NOORDERGIF from "../../../../assets/gifs/earrings.gif";
import { motion } from "framer-motion";



export const WIshlistScreenSection = () => {

  const [wishlist, setWishlist] = useState([])

  const userToken = localStorage.getItem("userToken") || "";
  if (!userToken) {
    console.log("No user token found!");
  }


  useEffect(() => {
    const fetchUserAllWishlist = async () => {
      try {
        const fetch_wishlist = await fetchUserWishlist(userToken);
        // console.log(fetch_wishlist, "---------------fetch_wishlist---------------");

        const all_wishlist = fetch_wishlist?.data;
        console.log(all_wishlist, "---------------all_wishlist---------------");

        setWishlist(all_wishlist || []);
      } catch (error) {
        console.log(error, "---------------error---------------");
      }
    };

    fetchUserAllWishlist();
  }, []);



  return (



    <motion.div className='bg-white dark:bg-gradient-to-br from-[#1B1B1B] to-[#252525] mt-3 p-4 font-subheading'
      initial={{ y: -50, opacity: 0 }}  // Start position (above the screen)
      animate={{ y: 0, opacity: 1 }}    // End position (normal position)
      exit={{ y: -50, opacity: 0 }}     // Exit animation (moving back up)
      transition={{ type: "spring", stiffness: 120, damping: 14 }}  // Smooth spring effects
    >

      <div className="text-mainheading  font-semibold border-b pb-2 block md:hidden">
        <h1>Wishlist</h1>
      </div>


      <div className='bg-yellow-200 mt-3 p-4 flex flex-wrap justify-center font-subheading'>
        {
          wishlist.length > 0 ? (

            wishlist.map((item) => (
              <div className=" flex flex-col  h-[500px] justify-between items-start p-4">

                {/* Image */}
                <div className="relative group">
                  <img
                    src="https://mukeshgems.idea2reality.tech/storage/app/public/category/2023-10-06-65201c0874ff4.png"
                    // src={`https://mukeshgems.idea2reality.tech/storage/app/public/product/${item.product.}`}
                    className="h-[300px] w-[300px] object-cover shadow-xl hover:scale-105 transition-all duration-300"
                    alt="trending-image"
                  />
                  <div className="absolute flex justify-center items-center top-0 left-0 bg-primary w-[100%] h-[100%] z-9 opacity-0 group-hover:opacity-70 transition-opacity duration-300">
                    <IoOpenOutline size={50} className="text-white" />
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-col w-full gap-4 mt-4 items-start text-mainheading">
                  <div className="flex gap-2 items-center">
                    {/* <h1 className="font-heading font-medium text-start text-sm sm:text-[16px]">{trending.name}</h1> */}
                    <h1 className="font-heading font-medium text-start text-sm sm:text-[16px]">
                      Product Name
                    </h1>
                    {/* <GoArrowUpRight size={30} /> */}
                  </div>
                  <div className="flex w-full  gap-3 justify-between items-start ">

                    {/* <h1 key={trending.id} className="w-[30px] h-[30px] rounded-full"></h1> */}
                    <div className='flex gap-3'>

                      <p className="font-subheading text-[12px] sm:text-[14px] bg-primary text-white p-1 rounded-sm">vintage</p>
                      <p className="font-subheading text-[12px] sm:text-[14px] bg-primary text-white p-1 rounded-sm">old</p>

                    </div>

                    <div className='flex flex-col   justify-center items-end'>
                      <p className="text-primary text-2xl sm:text-2xl font-semibold">₹4590</p>
                      <p className="text-black text-lg font-medium line-through">₹456900</p>
                    </div>






                  </div>
                  <div>
                    {/* <p className="text-primary text-xl sm:text-2xl font-medium">{trending.purchase_price}</p> */}
                  </div>
                  {/* <button className='bg-primary'>Remove</button> */}
                </div>



              </div>
            ))

          ) : (

            <div className='flex flex-col justify-center gap-4 items-center mt-6 w-full'>
              <img src={NOORDERGIF} alt="No Wishlist" className="w-40 h-40" />
              <p className='text-2xl'>Oops! No items in wishlist!</p>
              <Link to="/" className="bg-mainbutton p-2 rounded-lg text-white">
                Shop Now
              </Link>
            </div>

          )
        }
      </div>



    </motion.div>


  )
}


// <div className=" flex flex-col h-[500px] justify-between items-start  p-4">

// {/* Image */}
// <div className=" relative group">
//   <img
//     src="https://mukeshgems.idea2reality.tech/storage/app/public/category/2023-10-06-65201c0874ff4.png"
//     className=" z-2 h-[300px] w-[300px] object-cover shadow-xl hover:scale-105 transition-all duration-300"
//     alt="trending-image"
//   />
//   <div className="absolute flex justify-center items-center top-0 left-0 bg-primary w-[100%] h-[100%] z-9 opacity-0 group-hover:opacity-70 transition-opacity duration-300">
//     <IoOpenOutline size={50} className="text-white" />
//   </div>
// </div>

// {/* Details */}
// <div className="flex flex-col w-full gap-4 mt-4 items-start text-mainheading">
//   <div className="flex gap-2 items-center">
//     {/* <h1 className="font-heading font-medium text-start text-sm sm:text-[16px]">{trending.name}</h1> */}
//     <h1 className="font-heading font-medium text-start text-sm sm:text-[16px]">
//       Product Name
//     </h1>
//     {/* <GoArrowUpRight size={30} /> */}
//   </div>
//   <div className="flex w-full  gap-3 justify-between items-start ">

//     {/* <h1 key={trending.id} className="w-[30px] h-[30px] rounded-full"></h1> */}
//     <div className='flex gap-3'>

//       <p className="font-subheading text-[12px] sm:text-[14px] bg-primary text-white p-1 rounded-sm">vintage</p>
//       <p className="font-subheading text-[12px] sm:text-[14px] bg-primary text-white p-1 rounded-sm">old</p>

//     </div>

//     <div className='flex flex-col   justify-center items-end'>
//       <p className="text-primary text-2xl sm:text-2xl font-semibold">₹4590</p>
//       <p className="text-black text-lg font-medium line-through">₹456900</p>
//     </div>






//   </div>
//   <div>
//     {/* <p className="text-primary text-xl sm:text-2xl font-medium">{trending.purchase_price}</p> */}
//   </div>
//   {/* <button className='bg-primary'>Remove</button> */}
// </div>



// </div>