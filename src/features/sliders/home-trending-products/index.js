import { GoArrowUpRight } from "react-icons/go";
import CATAGORYIMAGE from "../../../assets/images/homepage/CoverImageOne.png";

import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';

export const TrendingProductsSlider = () => {
    return (
        <Swiper
            slidesPerView={3}
            spaceBetween={20} // Adjust space between slides
            pagination={{
                clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper w-full mx-auto" // Ensure Swiper container is responsive
            breakpoints={{
                320: {
                    slidesPerView: 1, // 1 slide per view for small screens
                    spaceBetween: 10, // Reduce space on smaller screens
                },
                640: {
                    slidesPerView: 2, // 2 slides per view for medium screens
                    spaceBetween: 20, // Moderate space between slides
                },
                768: {
                    slidesPerView: 2, // 2 slides per view for larger screens
                    spaceBetween: 20, // Moderate space between slides
                },
                1024: {
                    slidesPerView: 3, // 3 slides per view for even larger screens
                    spaceBetween: 30, // More space on larger screens
                },
            }}
        >
            {[...Array(6)].map((_, index) => (
                <SwiperSlide key={index}>
                    <div className="flex justify-center items-center p-6 sm:p-10">
                        <div className="flex flex-col gap-2">
                            <div>
                                <img 
                                    src={CATAGORYIMAGE} 
                                    className="w-full h-auto max-w-[350px] object-cover shadow-xl" 
                                    alt="category-image" 
                                />
                            </div>
                            <div className="flex flex-col items-start text-mainheading gap-2">
                                <div className="flex gap-2 items-center">
                                    <h1 className="font-heading font-medium text-sm sm:text-lg">Snake Chain Necklace 50cm/20'</h1>
                                    <GoArrowUpRight size={25} />
                                </div>
                                <div className="flex gap-3 justify-center items-center">
                                    <h1 className="w-[30px] h-[30px] bg-purple-300 rounded-full"></h1>
                                    <h1 className="w-[30px] h-[30px] bg-red-300 rounded-full"></h1>
                                    <p className="font-subheading text-[12px] sm:text-[14px]">18ct Gold Vermeil</p>
                                </div>
                                <div>
                                    <p className="text-primary text-xl sm:text-2xl font-medium">₹3054</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

