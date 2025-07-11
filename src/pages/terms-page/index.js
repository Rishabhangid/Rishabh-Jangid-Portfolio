import React, { useEffect, useState } from 'react'
import { MainHeading, SubHeading } from '../../shared'
import "./termsCss.css"
import { fetchPaymentTypeApi } from '../../api/services/paymentService'

export const TermsPage = () => {

  const [ toc, setToc] = useState("")

  useEffect(() => {
    const fetchDeliveryType = async (e) => {

      try {

        const payment_types = await fetchPaymentTypeApi()
        const ticketAdd = payment_types?.data;
        // if (ticketAdd?.success) {
        if (payment_types?.status === 200) {
          // alert("AA GYA")
          console.log(ticketAdd["terms_&_conditions"], "---------------TERM AND CONDITION---------------");
          setToc(ticketAdd["terms_&_conditions"]);
        }
      }
      catch (error) {
        console.log(error, "---------------error---------------");
        const errors = error?.errors || [{ message: "Something went wrong" }];
        const errorMessage = errors.map(err => err.message).join("\n");
      }

    }
    fetchDeliveryType()
  }, [])
  return (
    // <div className="flex flex-col min-h-screen bg-gray-100 mt-16">
    //   {/* Header Section */}
    //   <div className="bg-golden-gradient p-6 text-white text-center h-[200px] flex justify-center  ">
    //     <h1 className="text-2xl font-bold">GEORGE SAMUEL</h1>
    //   </div>

    //   {/* Main Content with Overlapping Effect */}
    //   <div className="relative">
    //     <div className="absolute inset-x-0 top-0 flex justify-center ">
    //       <div className="bg-[#E3F3E5] shadow-lg rounded-xl p-8 max-w-3xl -mt-16">
    //         <h2 className="text-3xl font-bold text-gray-900 text-center">
    //           TERMS OF SERVICEx
    //         </h2>
    //         <p className="text-sm text-gray-500 text-center mt-2">
    //           Updated May 25, 2018
    //         </p>

    //         {/* Content */}
    //         <div className="mt-6 text-gray-700 space-y-4 h-[300px] overflow-y-auto border-2">
    //           <p>
    //             This Terms of Service (the "Terms") describes the rights and
    //             responsibilities that apply to your use of Dribbble’s websites,
    //             services, and mobile app...
    //           </p>
    //           <p>
    //             Please read the Terms carefully before using the Service. If you
    //             don’t agree to the Terms, as well as Dribbble’s Privacy Policy...
    //           </p>
    //           <p>
    //             1- Your Dribbble Account. If you create an account on the
    //             Service (your “Account”), you are responsible for maintaining
    //             the security...
    //           </p>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Extra spacing to prevent cutoff */}
    //   <div className="h-64"></div>
    // </div>
    <div className='mt-16 py-10'>
      <MainHeading name="TERMS AND CONDITION" />
      {/* <SubHeading name="dddcdcc" /> */}
      
      <div dangerouslySetInnerHTML={{ __html: toc }}  className='bg-gray-100 font-subheading max-w-[1000px] m-auto p-6 rounded-lg'/>
    </div>
  )
}
