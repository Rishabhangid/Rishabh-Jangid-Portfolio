import React, { useEffect, useState } from 'react'
import { fetchPaymentTypeApi } from '../../api/services/paymentService'
import { MainHeading } from '../../shared'

export const Privacy = () => {

  const [privacy, setPrivacy] = useState("")
  useEffect(() => {
    const fetchPrivacyPolicy = async (e) => {

      try {

        const payment_types = await fetchPaymentTypeApi()
        const ticketAdd = payment_types?.data;
        // if (ticketAdd?.success) {
        if (payment_types?.status === 200) {
          // alert("AA GYA")
          console.log(ticketAdd.privacy_policy, "---------------Privacy policy---------------");
          setPrivacy(ticketAdd.privacy_policy);
        }
      }
      catch (error) {
        console.log(error, "---------------error---------------");
        const errors = error?.errors || [{ message: "Something went wrong" }];
        const errorMessage = errors.map(err => err.message).join("\n");
      }
    }
    fetchPrivacyPolicy()
  }, [])
  return (
    <div className='mt-16 py-10'>
      <MainHeading name="PRIVACY POLICY" />
      {/* <SubHeading name="dddcdcc" /> */}

      <div dangerouslySetInnerHTML={{ __html: privacy }} className='bg-gray-100 font-subheading max-w-[1000px] m-auto p-6 rounded-lg' />
    </div>
  )
}
