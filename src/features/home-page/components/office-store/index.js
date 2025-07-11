import React, { useEffect } from 'react'
import { MainHeading, SubHeading } from '../../../../shared'
import IMG from "../../../../assets/images/logo/logo_nobg.png"
import SIDEIMAGE from "../../../../assets/images/authpage/auth-cover.jpg"

import { IoMail } from "react-icons/io5";
import { FaSquareInstagram } from "react-icons/fa6";


export const OfficeLocation = () => {

    useEffect(() => {
        const current_theme = localStorage.getItem("theme")
        console.log("*************************", current_theme)
    }, [])

    return (
        <div className='py-6'>
            <MainHeading name="About Our Store" />
            {/* <SubHeading name="Contact us for jewelry" /> */}
            <SubHeading name="Get in touch with us for a complete jewellery shopping experience!" />
            <div className='grid-cols-1 p-2 md:p-0 md:grid md:grid-cols-2 max-w-[1400px] gap-4 m-auto mt-6'>
                <div
                    className="rounded-lg bg-cover bg-center h-[200px] md:h-[400px] flex justify-center items-center "
                    style={{ backgroundImage: `url(${SIDEIMAGE})` }}
                >
                    <img src={IMG} alt="office location" className='rounded-lg w-[400px]' />
                </div>
                <div className='grid grid-cols-1  gap-4 '>
                    <div className='flex flex-col items-center justify-center bg-[#F9F5F0] p-4 rounded-lg dark:bg-gray-900'>
                        <p className='font-medium md:font-bold text-[14px] md:text-xl text-[#9A0056] '>+91 9166629191</p>
                        <p className='text-[14px] md:text-xl font-extralight text-gray-700 dark:text-gray-400'>For store queries and schemes</p>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div className='flex flex-col items-center justify-center bg-[#F9F5F0] rounded-lg p-4 dark:bg-gray-900'>
                            <p className='font-medium md:font-bold text-[12px] text-center md:text-[14px] text-[#9A0056] break-all'>
                                mukeshgemsandjewellers@gmail.com
                            </p>                            <p className='text-[14px] md:text-xl font-extralight text-gray-700 dark:text-gray-400'>Mail Us</p>
                        </div>
                        <div className='flex flex-col items-center justify-center bg-[#F9F5F0] rounded-lg p-4 dark:bg-gray-900'>
                            <div className='flex gap-2 '>
                                <a href="mailto:Mukeshgemsandjewellers@gmail.com" className="flex items-center gap-2 text-[#9A0056]">
                                    <IoMail className="text-[30px]"/>
                                </a>

                                {/* <FaSquareInstagram className='text-[30px] text-[#9A0056]' /> */}
                                <a href="https://www.instagram.com/mukesh_gems_and_jewellers/?hl=en" target='_blank' className="flex items-center gap-2 text-[#9A0056]">
                                    <FaSquareInstagram className="text-[30px]" />
                                </a>

                            </div>
                            <p className='text-[14px] md:text-xl font-extralight text-gray-700 dark:text-gray-400'>Connect with ous</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
