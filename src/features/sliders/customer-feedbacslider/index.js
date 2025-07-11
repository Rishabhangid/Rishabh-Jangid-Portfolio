// import { GoArrowUpRight } from "react-icons/go";
// import CATAGORYIMAGE from "../../../assets/images/homepage/CoverImageOne.png"
// import NEW from "../../../assets/images/homepage/CoverImageOne.png"

// import React, { useRef, useState } from 'react';
// // Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react';

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/pagination';

// // import './styles.css';

// // import required modules
// import { Pagination } from 'swiper/modules';


// export const CustomerFeedbackSlider = () => {
//     return (
//         <Swiper
//             slidesPerView={3}
//             spaceBetween={30}
//             // pagination={{
//             //     clickable: true,
//             // }}
//             modules={[Pagination]}
//             className="mySwiper  max-w-[1500px] m-auto"
//         >
//             <SwiperSlide>
//                 <div className="relative group w-[250px] h-[300px]">
//                     <img src={NEW} alt="ddcdc" className="w-full h-full object-cover" />
//                     <div className="bg-primary opacity-0 absolute inset-0 flex flex-col items-center justify-center z-10
//                                     transition-opacity duration-300 ease-in-out group-hover:opacity-80">
//                         <h1 className="text-white font-subheading transition-transform duration-300 ease-in-out group-hover:translate-y-0 translate-y-5">SUMIT SHARMA</h1>
//                         <p className="text-white text-center font-light transition-transform duration-300 ease-in-out group-hover:translate-y-0 translate-y-5">
//                             “Step into a realm of unparalleled off-duty style with these grey“
//                         </p>
//                     </div>
//                 </div>
//             </SwiperSlide>
//             <SwiperSlide>
//                 <div className="relative group w-[250px] h-[300px]">
//                     <img src={NEW} alt="ddcdc" className="w-full h-full object-cover" />
//                     <div className="bg-primary opacity-0 absolute inset-0 flex flex-col items-center justify-center z-10
//                                     transition-opacity duration-300 ease-in-out group-hover:opacity-80">
//                         <h1 className="text-white font-subheading transition-transform duration-300 ease-in-out group-hover:translate-y-0 translate-y-5">SUMIT SHARMA</h1>
//                         <p className="text-white text-center font-light transition-transform duration-300 ease-in-out group-hover:translate-y-0 translate-y-5">
//                             “Step into a realm of unparalleled off-duty style with these grey“
//                         </p>
//                     </div>
//                 </div>
//             </SwiperSlide>
//             <SwiperSlide>
//                 <div className="relative group w-[250px] h-[300px]">
//                     <img src={NEW} alt="ddcdc" className="w-full h-full object-cover" />
//                     <div className="bg-primary opacity-0 absolute inset-0 flex flex-col items-center justify-center z-10
//                                     transition-opacity duration-300 ease-in-out group-hover:opacity-80">
//                         <h1 className="text-white font-subheading transition-transform duration-300 ease-in-out group-hover:translate-y-0 translate-y-5">SUMIT SHARMA</h1>
//                         <p className="text-white text-center font-light transition-transform duration-300 ease-in-out group-hover:translate-y-0 translate-y-5">
//                             “Step into a realm of unparalleled off-duty style with these grey“
//                         </p>
//                     </div>
//                 </div>
//             </SwiperSlide>
//             <SwiperSlide>
//                 <div className="relative group w-[250px] h-[300px]">
//                     <img src={NEW} alt="ddcdc" className="w-full h-full object-cover" />
//                     <div className="bg-primary opacity-0 absolute inset-0 flex flex-col items-center justify-center z-10
//                                     transition-opacity duration-300 ease-in-out group-hover:opacity-80">
//                         <h1 className="text-white font-subheading transition-transform duration-300 ease-in-out group-hover:translate-y-0 translate-y-5">SUMIT SHARMA</h1>
//                         <p className="text-white text-center font-light transition-transform duration-300 ease-in-out group-hover:translate-y-0 translate-y-5">
//                             “Step into a realm of unparalleled off-duty style with these grey“
//                         </p>
//                     </div>
//                 </div>
//             </SwiperSlide>
//             <SwiperSlide>
//                 <div className="relative group w-[250px] h-[300px]">
//                     <img src={NEW} alt="ddcdc" className="w-full h-full object-cover" />
//                     <div className="bg-primary opacity-0 absolute inset-0 flex flex-col items-center justify-center z-10
//                                     transition-opacity duration-300 ease-in-out group-hover:opacity-80">
//                         <h1 className="text-white font-subheading transition-transform duration-300 ease-in-out group-hover:translate-y-0 translate-y-5">SUMIT SHARMA</h1>
//                         <p className="text-white text-center font-light transition-transform duration-300 ease-in-out group-hover:translate-y-0 translate-y-5">
//                             “Step into a realm of unparalleled off-duty style with these grey“
//                         </p>
//                     </div>
//                 </div>
//             </SwiperSlide>
//             <SwiperSlide>
//                 <div className="relative group w-[250px] h-[300px]">
//                     <img src={NEW} alt="ddcdc" className="w-full h-full object-cover" />
//                     <div className="bg-primary opacity-0 absolute inset-0 flex flex-col items-center justify-center z-10
//                                     transition-opacity duration-300 ease-in-out group-hover:opacity-80">
//                         <h1 className="text-white font-subheading transition-transform duration-300 ease-in-out group-hover:translate-y-0 translate-y-5">SUMIT SHARMA</h1>
//                         <p className="text-white text-center font-light transition-transform duration-300 ease-in-out group-hover:translate-y-0 translate-y-5">
//                             “Step into a realm of unparalleled off-duty style with these grey“
//                         </p>
//                     </div>
//                 </div>
//             </SwiperSlide>





//         </Swiper>
//     )
// }

import { GoArrowUpRight } from "react-icons/go";
import NEW from "../../../assets/images/homepage/CoverImageOne.png";
import React from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// Import required modules
import { Pagination } from 'swiper/modules';

export const CustomerFeedbackSlider = () => {
    return (
        <Swiper
            slidesPerView={3}
            spaceBetween={30}
            breakpoints={{
                640: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            }}
            modules={[Pagination]}
            className="mySwiper w-full m-auto border-2 border-yellow-700"
        >
            {Array.from({ length: 6 }).map((_, index) => (
                <SwiperSlide key={index}>
                    <div className="relative group w-full max-w-[250px] mx-auto">
                        <img src={NEW} alt="customer feedback" className="w-full h-[300px] object-cover" />
                        <div className="bg-primary opacity-0 absolute inset-0 flex flex-col items-center justify-center z-10 transition-opacity duration-300 ease-in-out group-hover:opacity-80">
                            <h1 className="text-white font-subheading transition-transform duration-300 ease-in-out group-hover:translate-y-0 translate-y-5">SUMIT SHARMA</h1>
                            <p className="text-white text-center font-light transition-transform duration-300 ease-in-out group-hover:translate-y-0 translate-y-5">
                                “Step into a realm of unparalleled off-duty style with these grey“
                            </p>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};


