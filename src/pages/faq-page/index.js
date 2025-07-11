import React, { useEffect, useState } from 'react'
import IMAGE from "../.././assets/images/logo/CoverImageOne.png"
import { fetchPaymentTypeApi } from '../../api/services/paymentService'

export const FAQScreen = () => {


    const [faq, setFaq] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
      setActiveIndex(activeIndex === index ? null : index);
    };
    useEffect(() => {
        const fetchDeliveryType = async (e) => {

            try {
                setIsLoading(true)
                const payment_types = await fetchPaymentTypeApi()
                const ticketAdd = payment_types?.data;
                // if (ticketAdd?.success) {
                if (payment_types?.status === 200) {
                    console.log(ticketAdd.faq, "---------------FAQ---------------");
                    setFaq(ticketAdd.faq);
                }
                setIsLoading(false)
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
        // <div className="mt-16 py-10 px-4">
        //     <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-[40%_60%] gap-8">
        //         {/* Left Section: FAQ Heading & Image */}
        //         <div className="text-center md:text-left">
        //             <p className="text-4xl font-bold text-mainbutton">FAQ</p>
        //             <p className="text-lg text-gray-600 mt-2">
        //                 Clearing Your Doubts, One Question at a Time!
        //             </p>
        //             <img
        //                 src={IMAGE}
        //                 alt="FAQ Illustration"
        //                 className="mt-5 w-full h-auto max-h-[300px] object-cover rounded-lg shadow-lg"
        //             />
        //         </div>

        //         {/* Right Section: FAQ Items */}
        //         <div className="flex flex-col gap-4">
        //             {faq.length > 0 ? (
        //                 faq.map((item, index) => (
        //                     <div
        //                         key={index}
        //                         className="border border-gray-300 rounded-lg shadow-md overflow-hidden"
        //                     >
        //                         <input
        //                             type="checkbox"
        //                             id={`faq-${index}`}
        //                             className="peer hidden"
        //                         />
        //                         <label
        //                             htmlFor={`faq-${index}`}
        //                             className="flex justify-between items-center p-4 cursor-pointer bg-gray-100 peer-checked:bg-mainbutton peer-checked:text-white transition-all duration-300"
        //                         >
        //                             <span className="font-semibold">{item.question}</span>
        //                             <svg
        //                                 className="w-5 h-5 transition-transform transform peer-checked:rotate-180"
        //                                 fill="none"
        //                                 stroke="currentColor"
        //                                 strokeWidth="2"
        //                                 viewBox="0 0 24 24"
        //                             >
        //                                 <path
        //                                     strokeLinecap="round"
        //                                     strokeLinejoin="round"
        //                                     d="M19 9l-7 7-7-7"
        //                                 />
        //                             </svg>
        //                         </label>
        //                         <div className="p-4 hidden peer-checked:block bg-white transition-all duration-300">
        //                             {item.answer}
        //                         </div>
        //                     </div>
        //                 ))
        //             ) : (
        //                 <p className="text-gray-500 text-center">No FAQs found</p>
        //             )}
        //         </div>
        //     </div>
        // </div>
        <div className="mt-16 py-10 px-4">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-[40%_60%] gap-8">
        {/* Left Section: FAQ Heading & Image */}
        <div className="text-center md:text-left">
          <p className="text-4xl font-bold text-mainbutton">FAQ</p>
          <p className="text-lg text-gray-600 mt-2">
            Clearing Your Doubts, One Question at a Time!
          </p>
          <img
            src={IMAGE}
            alt="FAQ Illustration"
            className="mt-5 w-full h-auto max-h-[300px] object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Right Section: FAQ Items */}
        <div className="flex flex-col gap-4">
          {faq.length > 0 ? (
            faq.map((item, index) => (
              <div
                key={index}
                className="border border-gray-300 rounded-lg shadow-md overflow-hidden"
              >
                <button
                  className={`w-full flex justify-between items-center p-4 cursor-pointer ${
                    activeIndex === index
                      ? "bg-mainbutton text-white"
                      : "bg-gray-100"
                  } transition-all duration-300`}
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="font-semibold">{item.question}</span>
                  <svg
                    className={`w-5 h-5 transition-transform ${
                      activeIndex === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {activeIndex === index && (
                  <div className="p-4 bg-white">{item.answer}</div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No FAQs found</p>
          )}
        </div>
      </div>
    </div>
    )
}
