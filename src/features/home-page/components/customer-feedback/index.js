import React from 'react'
import FEEDBACK from "../../../../assets/images/homepage/feedback-vector.png"
import { CustomerFeedbackSlider } from '../../../sliders'

export const CustomerFeedback = () => {
    return (
        // customer feedback section
        <div className='p-6 pt-16 border-2 border-yellow-400'>
            <div className='border-2 border-red-500 flex flex-col md:flex-row max-w-[1400px] m-auto justify-center items-center'>

                {/* heading */}
                <div className='border-2 p-4 w-[550px] h-[300px] border-red-900 flex flex-col  items-center gap-2 justify-center'>
                    <h1 className='font-subheading text-mainheading'>CUSTOMER</h1>
                    <h1 className='text-primary text-4xl '>Feeback</h1>
                    <img src={FEEDBACK} alt="cdcdc" />
                </div>

                {/* slider */}
                <CustomerFeedbackSlider/>



            </div>
        </div>
    )
}
