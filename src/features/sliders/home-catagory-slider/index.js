// import { GoArrowUpRight } from "react-icons/go";
// import CATAGORYIMAGE from "../../../assets/images/homepage/CoverImageOne.png"

// import React, { useRef, useState } from 'react';
// // Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react';

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/pagination';

// // import './styles.css';

// // import required modules
// import { Pagination } from 'swiper/modules';


// export const CatagorySlider = () => {
//     return (
//         <Swiper
//             slidesPerView={3}
//             spaceBetween={30}
//             pagination={{
//                 clickable: true,
//             }}
//             modules={[Pagination]}
//             className="mySwiper max-w-[1500px] m-auto"
//             breakpoints={{
//                 320: {
//                     slidesPerView: 1, // 1 slide per view for small screens
//                 },
//                 640: {
//                     slidesPerView: 2, // 2 slides per view for medium screens
//                 },
//                 768: {
//                     slidesPerView: 3, // 3 slides per view for larger screens
//                 },
//                 1024: {
//                     slidesPerView: 3, // 3 slides per view for even larger screens
//                 },
//             }}
//         >
//             <SwiperSlide>
//                 <div className=' flex justify-center items-center p-10'>
//                     <div className="flex flex-col gap-2">
//                         <div>
//                             <img src={CATAGORYIMAGE} className="w-[200px] h-[200px] md:w-[350px] md:h-[450px] object-cover shadow-xl" alt="catagory-image" />
//                         </div>
//                         <div className="flex text-mainheading gap-2">
//                             <h1 className="font-heading font-medium ">NECKLACE SET</h1>
//                             <p>(258)</p>
//                             <GoArrowUpRight size={25} />
//                         </div>
//                     </div>
//                 </div>
//             </SwiperSlide>
            
//             <SwiperSlide>
//                 <div className=' flex justify-center items-center p-10'>
//                     <div className="flex flex-col gap-2">
//                         <div>
//                             <img src={CATAGORYIMAGE} className="w-[200px] h-[200px] md:w-[350px] md:h-[450px] object-cover shadow-xl" alt="catagory-image" />
//                         </div>
//                         <div className="flex text-mainheading gap-2">
//                             <h1 className="font-heading font-medium ">NECKLACE SET</h1>
//                             <p>(258)</p>
//                             <GoArrowUpRight size={25} />
//                         </div>
//                     </div>
//                 </div>
//             </SwiperSlide>

//             <SwiperSlide>
//                 <div className=' flex justify-center items-center p-10'>
//                     <div className="flex flex-col gap-2">
//                         <div>
//                             <img src={CATAGORYIMAGE} className="w-[200px] h-[200px] md:w-[350px] md:h-[450px] object-cover shadow-xl" alt="catagory-image" />
//                         </div>
//                         <div className="flex text-mainheading gap-2">
//                             <h1 className="font-heading font-medium ">NECKLACE SET</h1>
//                             <p>(258)</p>
//                             <GoArrowUpRight size={25} />
//                         </div>
//                     </div>
//                 </div>
//             </SwiperSlide>

//             <SwiperSlide>
//                 <div className=' flex justify-center items-center p-10'>
//                     <div className="flex flex-col gap-2">
//                         <div>
//                             <img src={CATAGORYIMAGE} className="w-[200px] h-[200px] md:w-[350px] md:h-[450px] object-cover shadow-xl" alt="catagory-image" />
//                         </div>
//                         <div className="flex text-mainheading gap-2">
//                             <h1 className="font-heading font-medium ">NECKLACE SET</h1>
//                             <p>(258)</p>
//                             <GoArrowUpRight size={25} />
//                         </div>
//                     </div>
//                 </div>
//             </SwiperSlide>

//             <SwiperSlide>
//                 <div className='flex justify-center items-center p-10'>
//                     <div className="flex flex-col gap-2">
//                         <div>
//                             <img src={CATAGORYIMAGE} className="w-[200px] h-[200px] md:w-[350px] md:h-[450px] object-cover shadow-xl" alt="catagory-image" />
//                         </div>
//                         <div className="flex text-mainheading gap-2">
//                             <h1 className="font-heading font-medium ">NECKLACE SET</h1>
//                             <p>(258)</p>
//                             <GoArrowUpRight size={25} />
//                         </div>
//                     </div>
//                 </div>
//             </SwiperSlide>

//         </Swiper>
//     )
// }

import { GoArrowUpRight } from "react-icons/go";
import CATAGORYIMAGE from "../../../assets/images/homepage/CoverImageOne.png";
import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination } from "swiper/modules";

export const CatagorySlider = () => {
  return (
    <Swiper
      slidesPerView={3}
      spaceBetween={30}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className="mySwiper w-full m-auto"
      breakpoints={{
        320: {
          slidesPerView: 1, // 1 slide per view for small screens
        },
        640: {
          slidesPerView: 2, // 2 slides per view for medium screens
        },
        768: {
          slidesPerView: 3, // 3 slides per view for larger screens
        },
        1024: {
          slidesPerView: 3, // 3 slides per view for even larger screens
        },
      }}
    >
      <SwiperSlide>
        <div className="flex justify-center items-center p-10">
          <div className="flex flex-col gap-2">
            <div>
              <img
                src={CATAGORYIMAGE}
                className="w-[200px] h-[200px] md:w-[350px] md:h-[450px] object-cover shadow-xl"
                alt="catagory-image"
              />
            </div>
            <div className="flex text-mainheading gap-2">
              <h1 className="font-heading font-medium">NECKLACE SET</h1>
              <p>(258)</p>
              <GoArrowUpRight size={25} />
            </div>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="flex justify-center items-center p-10">
          <div className="flex flex-col gap-2">
            <div>
              <img
                src={CATAGORYIMAGE}
                className="w-[200px] h-[200px] md:w-[350px] md:h-[450px] object-cover shadow-xl"
                alt="catagory-image"
              />
            </div>
            <div className="flex text-mainheading gap-2">
              <h1 className="font-heading font-medium">NECKLACE SET</h1>
              <p>(258)</p>
              <GoArrowUpRight size={25} />
            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex justify-center items-center p-10">
          <div className="flex flex-col gap-2">
            <div>
              <img
                src={CATAGORYIMAGE}
                className="w-[200px] h-[200px] md:w-[350px] md:h-[450px] object-cover shadow-xl"
                alt="catagory-image"
              />
            </div>
            <div className="flex text-mainheading gap-2">
              <h1 className="font-heading font-medium">NECKLACE SET</h1>
              <p>(258)</p>
              <GoArrowUpRight size={25} />
            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex justify-center items-center p-10">
          <div className="flex flex-col gap-2">
            <div>
              <img
                src={CATAGORYIMAGE}
                className="w-[200px] h-[200px] md:w-[350px] md:h-[450px] object-cover shadow-xl"
                alt="catagory-image"
              />
            </div>
            <div className="flex text-mainheading gap-2">
              <h1 className="font-heading font-medium">NECKLACE SET</h1>
              <p>(258)</p>
              <GoArrowUpRight size={25} />
            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex justify-center items-center p-10">
          <div className="flex flex-col gap-2">
            <div>
              <img
                src={CATAGORYIMAGE}
                className="w-[200px] h-[200px] md:w-[350px] md:h-[450px] object-cover shadow-xl"
                alt="catagory-image"
              />
            </div>
            <div className="flex text-mainheading gap-2">
              <h1 className="font-heading font-medium">NECKLACE SET</h1>
              <p>(258)</p>
              <GoArrowUpRight size={25} />
            </div>
          </div>
        </div>
      </SwiperSlide>

      {/* Repeat the above block for more SwiperSlides */}

    </Swiper>
  );
};
