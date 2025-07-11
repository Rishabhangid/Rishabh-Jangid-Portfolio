// import
import { React, useEffect, useState } from 'react'
import { motion } from "framer-motion";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// redux
import { logout } from '../../redux/slices/authentication/authSlice'

// icons
import { FaUserAlt } from "react-icons/fa";
import { MdFavorite, MdSupportAgent } from "react-icons/md";
import { BsBagCheckFill } from "react-icons/bs";

// components
import { ProfilePageSection } from '../../features/user-profile/components/profile-section'
import { OrderPageSection } from '../../features/user-profile/components/orders-section'
import { WIshlistScreenSection } from '../../features/user-profile/components/wishlist-section'
import { TicketScreenSection } from '../../features/user-profile/components/ticket-section'


export const UserProfilePage = () => {

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page
  }, []);

  // declaration
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // fetcing user login status
  const is_loggedin = useSelector((state) => state.auth.isAuthenticated)

  // states
  const [activeTab, setActiveTab] = useState("Profile")

  // prfile tabs
  const tabs = [
    { name: "Profile", icon: <FaUserAlt /> },
    { name: "My Orders", icon: <BsBagCheckFill /> },
    { name: "Wishlist", icon: <MdFavorite /> },
    { name: "Support Ticket", icon: <MdSupportAgent /> },
  ];

  return (

    <motion.div className='bg-[#FFFFFF] dark:bg-[#121212]'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className='p-3 max-w-[1300px] m-auto flex  flex-col justify-center items-center  pb-10 '>

        {/* profile navigation bar */}
        <div className="sticky z-30  top-20 max-w-[1000px]  gap-2 md:gap-5 grid grid-cols-4 justify-between items-center mt-5  shadow-inner rounded-full">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              className={`p-3 md:p-5 flex  items-center justify-center gap-2 rounded-full  transition-all duration-300 ease-in-out ${activeTab === tab.name ? "bg-[#baa560] text-white shadow-lg scale-105" : "bg-[#d8d2d2]  text-gray-700 hover:bg-white hover:text-primary"
                }`}
              onClick={() => setActiveTab(tab.name)}
            >
              <> {tab.icon} </>
              <span className='hidden md:block'> {tab.name} </span>
            </button>
          ))}
        </div>


        {/* section */}
        <div className="rounded-lg pt-6 w-full z-40">
          {activeTab === "Profile" && <ProfilePageSection />}
          {activeTab === "My Orders" && <OrderPageSection />}
          {activeTab === "Wishlist" && <WIshlistScreenSection />}
          {activeTab === "Support Ticket" && <TicketScreenSection />}

        </div>
      </div>
    </motion.div>
  )
}
