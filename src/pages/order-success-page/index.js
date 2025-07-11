import React from 'react'
// import SUCCESS from "../../assets/gifs/verified.gif"
import SUCCESS from "../../assets/images/package-delivery.png"
import PLACED from "../../assets/gifs/Packaging For Delivery.gif"
import { useNavigate } from 'react-router-dom'

export const OrderSummeryPage = () => {
  const navigate = useNavigate()
  return (
    <div className='flex flex-col gap-6 justify-center items-center mt-10 mb-10 py-16 px-4'>
        <img src={PLACED} alt="vv" className='w-[180px]'/>
        
        <div className='text-center'>
        <p className='text-xl md:text-3xl text-secondprimary font-subheading'>Order placed succesfully</p>
        <p className='text-[14px] md:text-[16px] text-gray-500 font-subheading'>You order has been confirmed and will be shipped according to the method you selected!</p>
        {/* <p className='text-xl text-gray-500'>Order ID : <span className=''>4533494</span></p> */}
        </div>
        <div className='flex gap-4'>
            <button className=' bg-mainbutton text-white px-4 py-2 rounded-lg' onClick={()=>navigate("/")}>Shop More</button>
            <button className='border-2 border-mainbutton bg-white text-primary px-4 py-2 rounded-lg' onClick={()=>navigate("/userprofile")}>Order Details</button>
        </div>
    </div>
  )
}
