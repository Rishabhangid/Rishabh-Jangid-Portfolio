// import
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";


// slider
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// button import
import { PrimaryButton } from '../../../shared/components/primaryButton';
import ShinyText from '../../../reactBits/ShinyText/ShinyText';


export const HomeSlider = ({ mainbanner }) => {

    // declaration *************************************************************************
    const navigate = useNavigate()

    return (

        <motion.div className="z-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}>

            {/* overlay text */}
            <div className="text-white text-center absolute flex flex-col gap-0 md:gap-4 md:text-start top-[35%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] md:top-[30%] md:left-[4%] md:transform-none lg:top-[35%] lg:left-[4%] lg:transform-none z-20">

                <h1 className=" font-normal text-[14px] md:text-xl lg:text-3xl text-white tracking-wider leading-5 md:leading-10">
                    UNIQUE <br /> AND AUTHENTIC <br /> <span className='text-mainbutton'>VINTAGE DESIGNER </span><br /> JEWELLERY
                </h1>
                <p className="font-subheading font-medium text-[14px] md:text-sm mt-3">
                    NOW AVAILABLE AT THE <span className='text-mainbutton'>MUKESH GEMS & JEWELLERS</span>
                </p>
                {/* <ShinyText text="Just some shiny text!" disabled={false} speed={3} className='text-9xl' /> */}
                <PrimaryButton label="DISCOVER THE COLLECTION" />

            </div>

            {/* image slider */}
            <Swiper
                direction={'vertical'}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                modules={[Autoplay, Pagination]}
                className="mySwiper  h-[300px] md:h-[400px] lg:h-[600px] z-5" >

                {/* maapping main banners */}
                {
                    mainbanner && mainbanner.length > 0 ?
                        (
                            mainbanner.map((banner, index) => (

                                <SwiperSlide className="h-[400px] relative shadow-lg z-6" key={index} onClick={() => navigate(`/catagory/3`)}>
                                    <img className="object-cover z-3 h-full w-full" src={`https://mukeshgems.idea2reality.tech/storage/app/public/banner/${banner.photo}`} alt="slider_image" />

                                    {/* Background overlay with opacity */}
                                    <div className="absolute inset-0 bg-black opacity-40  z-10 "></div>

                                </SwiperSlide>
                            ))
                        )
                        : (
                            <h1 className='text-center'>NO Banners found</h1>
                        )
                }
            </Swiper>

        </motion.div >
    )
}
