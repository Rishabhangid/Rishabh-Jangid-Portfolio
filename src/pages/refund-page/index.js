import React, { useEffect } from 'react'
import { fetchPaymentTypeApi } from '../../api/services/paymentService'
import { useState } from 'react'
import { MainHeading } from '../../shared'

export const RefundPage = () => {

  const [refund, setRefund] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchDeliveryType = async (e) => {

      try {
        setIsLoading(true)
        const payment_types = await fetchPaymentTypeApi()
        const ticketAdd = payment_types?.data;
        // if (ticketAdd?.success) {
        if (payment_types?.status === 200) {
          // alert("AA GYA")
          console.log(ticketAdd.refund_policy, "---------------refund_policy--------------");
          setRefund(ticketAdd.refund_policy.content);
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
    <div className='mt-16 py-10'>
      <MainHeading name="TERMS AND CONDITION" />
      {/* <SubHeading name="dddcdcc" /> */}
      {isLoading ? (
        // Skeleton Loader
        <div className="flex justify-center items-center h-32">
          <div className="flex flex-row gap-2">
            <div className="w-4 h-4 rounded-full bg-mainbutton animate-bounce [animation-delay:.7s]"></div>
            <div className="w-4 h-4 rounded-full bg-mainbutton animate-bounce [animation-delay:.3s]"></div>
            <div className="w-4 h-4 rounded-full bg-mainbutton animate-bounce [animation-delay:.7s]"></div>
          </div>
        </div>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: refund }} className='bg-gray-100 font-subheading max-w-[1000px] m-auto p-6 rounded-lg' />
      )}


    </div>
  )
}
