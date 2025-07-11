import React from 'react'
import PROMISE from "../../../../assets/images/promise.png"


import PROMISE1 from "../../../../assets/images/promises/Certified-Diamonds.png"
import PROMISE2 from "../../../../assets/images/promises/Complete-Transparency.png"
import PROMISE3 from "../../../../assets/images/promises/Your_Jewellery-is_Insured.png"
import PROMISE4 from "../../../../assets/images/promises/imgpsh_fullsize_anim.png"

export const PromiseSection = () => {
    return (
        <div className="flex flex-col gap-6 items-center my-4 bg-pinkbox dark:bg-gray-900 w-[100%] p-6 mx-3 shadow-md rounded-lg">

            <img src={PROMISE} alt="promise" className="w-40 md:w-52" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 w-full gap-3">
            {/* <div className="flex justify-evenly  items-center flex-wrap w-full gap-3"> */}
                <div className="gap-2 text-mainheading font-medium text-[14px] flex flex-col items-center justify-center">
                    <img className="p-2 md:p-4 bg-white rounded-md w-[60px] md:w-[100px]" src={PROMISE1} alt="vdv" />
                    <p className="w-24 text-center dark:text-gray-400">Certified Diamonds</p>
                </div>
                <div className="gap-2 text-mainheading font-medium text-[14px] flex flex-col items-center justify-center">
                    <img className="p-2 md:p-4 bg-white rounded-md w-[60px] md:w-[100px]" src={PROMISE2} alt="vdv" />
                    <p className="w-24 text-center dark:text-gray-400">Complete Transparency</p>
                </div>
                <div className="gap-2 text-mainheading font-medium text-[14px] flex flex-col items-center justify-center">
                    <img className="p-2 md:p-4 bg-white rounded-md w-[60px] md:w-[100px]" src={PROMISE3} alt="vdv" />
                    <p className="w-28 text-center dark:text-gray-400">Your Jewellery is Insured</p>
                </div>
                <div className="gap-2 text-mainheading font-medium text-[14px] flex flex-col items-center justify-center">
                    <img className="p-2 md:p-4 bg-white rounded-md w-[60px] md:w-[100px]" src={PROMISE4} alt="vdv" />
                    <p className="w-24 text-center dark:text-gray-400">Easy Exchange</p>
                </div>
                <div className="gap-2 text-mainheading font-medium text-[14px] flex flex-col items-center justify-center">
                    <img className="p-2 md:p-4 bg-white rounded-md w-[60px] md:w-[100px]" src={PROMISE4} alt="vdv" />
                    <p className="w-24 text-center dark:text-gray-400">Easy Exchange</p>
                </div>
            </div>
        </div>
    )
}
