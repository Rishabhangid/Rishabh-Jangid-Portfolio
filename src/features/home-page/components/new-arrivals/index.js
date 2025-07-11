import NEW from "../../../../assets/images//banners/new-arrival.png"
import { PrimaryButton } from "../../../../shared"
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";





export const NewArrivals = ({ sectionbanner }) => {

    const navigate = useNavigate()

    // slider setting
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear"
    };

    return (
        <motion.div className="flex  justify-center p-6 pt-10 md:pt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}>

            {
                sectionbanner && sectionbanner.length > 0 ?
                    (
                        sectionbanner.map((banner, index) => (
                            <div className="relative rounded-md" onClick={() => navigate("/bestselling")}>
                                <img src={`https://mukeshgems.idea2reality.tech/storage/app/public/banner/${banner.photo}`} loading='lazy' alt="new" className="w-[1300px] h-[500px] object-cover rounded-md" />
                                <div className="absolute left-[8%] top-[30%] md:top-[45%] text-white backdrop-blur-[12px] shadow-inner shadow-white/40 bg-gradient-to-br from-[#ffffff73] via-[#f0f0f092] to-[#f0f0f092] p-5 rounded-md">
                                    <h1 className="text-3xl md:text-7xl text-gray-800 dark:text-gray-800">NEW ARRIVAL</h1>
                                    <p className="font-subheading text-sm md:text-xl text-mainheading font-medium">NOW AVAILABLE</p>
                                    <PrimaryButton label="DISCOVER NEW ARRIVAL" />
                                </div>
                            </div>
                        ))
                    )

                    : (
                        <h1>NO Banners found</h1>
                    )
            }

        </motion.div>
    )
}
