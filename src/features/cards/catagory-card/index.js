// import
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Slider from "react-slick";

// react icons
import { IoIosArrowForward } from "react-icons/io";

// api service
import { fetchAllCatagories } from '../../../api/services/homepageService'


export const CatagoryCard = () => {

    // corosoul setting
    const settings = {
        dots: false, // Set true if you want navigation dots
        infinite: true,
        speed: 500,
        slidesToShow: 8, // Default: Show 5 items
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        centerMode: true, // Enable center mode to control spacing
        centerPadding: "10px", // Reduce padding between slides (adjust as needed)
        responsive: [
            {
                breakpoint: 1200, // For large screens
                settings: {
                    slidesToShow: 7,
                },
            },
            {
                breakpoint: 992, // For medium screens
                settings: {
                    slidesToShow: 5,
                },
            },
            {
                breakpoint: 768, // For tablets
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 480, // For mobile screens
                settings: {
                    slidesToShow: 2,
                },
            },
        ],
    };

    // Apply styles inline
    const sliderStyle = {
        '.slick-slide': { margin: '0 5px' }, // Adjust spacing between slides
        '.slick-list': { margin: '0 -5px' }  // Compensate for spacing
    };

    // declaration *************************************************************************
    const navigate = useNavigate()

    // states *************************************************************************
    const [catagory, setCatagory] = useState([])
    const [catagoryLoading, setCatagoryLoading] = useState(false)


    // use-effects *************************************************************************

    // fetching all products catagory
    useEffect(() => {
        const fetchAllProductCatagory = async () => {

            setCatagoryLoading(true)
            try {
                const fetch_all_catagory = await fetchAllCatagories();
                const allCatagory = fetch_all_catagory?.data || [];

                setCatagory(allCatagory)
                setCatagoryLoading(false)

            } catch (error) {
                console.log(error, "---------------error---------------");
            }
        };
        fetchAllProductCatagory()
    }, [])

    return (

        // old vali : no corosoul {flex-col}
        // <div className="flex gap-6 flex-wrap p-6 max-w-[1500px] m-auto justify-center ">

        //     {
        //         catagoryLoading ? (

        //             // skeleton
        //             <div className='flex gap-6 flex-wrap justify-center items-center'>

        //                 <div class="flex flex-col bg-neutral-300 w-56 h-64 animate-pulse rounded-xl p-4 gap-4"                      >
        //                     <div class="bg-neutral-400/50 w-full h-32 animate-pulse rounded-md"></div>
        //                     <div class="flex flex-col gap-2">
        //                         <div class="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
        //                         <div class="bg-neutral-400/50 w-4/5 h-4 animate-pulse rounded-md"></div>
        //                         <div class="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
        //                         <div class="bg-neutral-400/50 w-2/4 h-4 animate-pulse rounded-md"></div>
        //                     </div>
        //                 </div>
        //                 <div class="flex flex-col bg-neutral-300 w-56 h-64 animate-pulse rounded-xl p-4 gap-4"                      >
        //                     <div class="bg-neutral-400/50 w-full h-32 animate-pulse rounded-md"></div>
        //                     <div class="flex flex-col gap-2">
        //                         <div class="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
        //                         <div class="bg-neutral-400/50 w-4/5 h-4 animate-pulse rounded-md"></div>
        //                         <div class="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
        //                         <div class="bg-neutral-400/50 w-2/4 h-4 animate-pulse rounded-md"></div>
        //                     </div>
        //                 </div>
        //                 <div class="flex flex-col bg-neutral-300 w-56 h-64 animate-pulse rounded-xl p-4 gap-4"                      >
        //                     <div class="bg-neutral-400/50 w-full h-32 animate-pulse rounded-md"></div>
        //                     <div class="flex flex-col gap-2">
        //                         <div class="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
        //                         <div class="bg-neutral-400/50 w-4/5 h-4 animate-pulse rounded-md"></div>
        //                         <div class="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
        //                         <div class="bg-neutral-400/50 w-2/4 h-4 animate-pulse rounded-md"></div>
        //                     </div>
        //                 </div>
        //                 <div class="flex flex-col bg-neutral-300 w-56 h-64 animate-pulse rounded-xl p-4 gap-4"                      >
        //                     <div class="bg-neutral-400/50 w-full h-32 animate-pulse rounded-md"></div>
        //                     <div class="flex flex-col gap-2">
        //                         <div class="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
        //                         <div class="bg-neutral-400/50 w-4/5 h-4 animate-pulse rounded-md"></div>
        //                         <div class="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
        //                         <div class="bg-neutral-400/50 w-2/4 h-4 animate-pulse rounded-md"></div>
        //                     </div>
        //                 </div>
        //                 <div class="flex flex-col bg-neutral-300 w-56 h-64 animate-pulse rounded-xl p-4 gap-4"                      >
        //                     <div class="bg-neutral-400/50 w-full h-32 animate-pulse rounded-md"></div>
        //                     <div class="flex flex-col gap-2">
        //                         <div class="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
        //                         <div class="bg-neutral-400/50 w-4/5 h-4 animate-pulse rounded-md"></div>
        //                         <div class="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
        //                         <div class="bg-neutral-400/50 w-2/4 h-4 animate-pulse rounded-md"></div>
        //                     </div>
        //                 </div>

        //             </div>
        //         ) : (

        //             catagory.map((product, index) => (
        //                 // <div key={product.index} className=" bg-[#E3F3E5] dark:bg-[#76a77c] dark:shadow-lg w-[130px] h-[170px] md:w-[200px] md:h-[200px] shadow-md hover:shadow-xl flex flex-col justify-between  transition-all duration-300 rounded-sm rounded-t-full  hover:cursor-pointer" onClick={() => navigate(`/catagory/${product.id}`)}>
        //                 <div key={product.index} className=" bg-[#FAF6F0] dark:bg-[#ebdbc5] dark:shadow-lg w-[110px] h-[170px] md:w-[200px] md:h-[200px] shadow-md hover:shadow-xl flex flex-col justify-between  transition-all duration-300 rounded-sm rounded-t-full  hover:cursor-pointer" onClick={() => navigate(`/catagory/${product.id}`)}>

        //                     <img src={`https://mukeshgems.idea2reality.tech/storage/app/public/category/${product.icon}`} loading='lazy' alt={product.name} className="w-full h-3/5 rounded-t-full" />

        //                     <div className="flex flex-col items-center justify-center gap-1 p-2 ">

        //                         <h1 className="font-heading  text-xs md:text-[16px]  font-medium text-primary dark:text-mainbutton">{product.name}</h1>
        //                         <Link to={`/detail/${product.id}`} className="text-primary dark:text-gray-600 flex items-center gap-2 hover:gap-6 justify-center transition-all duration-300" >
        //                             <p>Explore</p>
        //                             <IoIosArrowForward />
        //                         </Link>

        //                     </div>

        //                 </div>
        //             ))

        //         )
        //     }




        // </div>

        // new ( corosoul vale )
        <div className=" max-w-[1500px] m-auto justify-center ">

            {
                catagoryLoading ? (

                    // skeleton
                    <div className='flex gap-6 flex-wrap justify-center items-center'>

                        <div class="flex flex-col items-center justify-center  w-56 h-64 animate-pulse rounded-xl p-4 gap-4"                      >
                            <div class="bg-neutral-400/50 w-32 h-32 rounded-full animate-pulse "></div>
                            <div class="bg-neutral-400/50 w-2/4 h-4 animate-pulse rounded-md"></div>
                        </div>
                        <div class="flex flex-col items-center justify-center  w-56 h-64 animate-pulse rounded-xl p-4 gap-4"                      >
                            <div class="bg-neutral-400/50 w-32 h-32 rounded-full animate-pulse "></div>
                            <div class="bg-neutral-400/50 w-2/4 h-4 animate-pulse rounded-md"></div>
                        </div>
                        <div class="flex flex-col items-center justify-center  w-56 h-64 animate-pulse rounded-xl p-4 gap-4"                      >
                            <div class="bg-neutral-400/50 w-32 h-32 rounded-full animate-pulse "></div>
                            <div class="bg-neutral-400/50 w-2/4 h-4 animate-pulse rounded-md"></div>
                        </div>
                        <div class="flex flex-col items-center justify-center  w-56 h-64 animate-pulse rounded-xl p-4 gap-4"                      >
                            <div class="bg-neutral-400/50 w-32 h-32 rounded-full animate-pulse "></div>
                            <div class="bg-neutral-400/50 w-2/4 h-4 animate-pulse rounded-md"></div>
                        </div>
                        <div class="flex flex-col items-center justify-center  w-56 h-64 animate-pulse rounded-xl p-4 gap-4"                      >
                            <div class="bg-neutral-400/50 w-32 h-32 rounded-full animate-pulse "></div>
                            <div class="bg-neutral-400/50 w-2/4 h-4 animate-pulse rounded-md"></div>
                        </div>



                    </div>
                ) : (

                    <div className='py-6 slider-container'>
                        <Slider {...settings}>
                            {catagory.map((product, index) => (
                                <div
                                    key={index}
                                    className="dark:shadow-lg gap-3 flex flex-col  items-center justify-center transition-all duration-300 hover:cursor-pointer"
                                    onClick={() => navigate(`/catagory/${product.id}`)}
                                >
                                    <img
                                        src={`https://mukeshgems.idea2reality.tech/storage/app/public/category/${product.icon}`}
                                        loading="lazy"
                                        alt={product.name}
                                        className="w-[100px] md:w-[120px] h-[100px] md:h-[120px] object-cover m-auto rounded-full border-2 border-[#9A0056] p-1"
                                    />

                                    <h1 className="font-heading text-xs md:text-[16px] mt-2 font-medium text-mainheading dark:text-mainbutton">
                                        {product.name}
                                    </h1>
                                </div>


                            ))}
                        </Slider>
                    </div>




                )
            }




        </div>

        // nye vala flex col vala
        // <div className=" max-w-[1500px] m-auto justify-center ">

        //     {
        //         catagoryLoading ? (

        //             // skeleton
        //             <div className='flex gap-6 flex-wrap justify-center items-center'>

        //                 <div class="flex flex-col items-center justify-center  w-56 h-64 animate-pulse rounded-xl p-4 gap-4"                      >
        //                     <div class="bg-neutral-400/50 w-32 h-32 rounded-full animate-pulse "></div>
        //                     <div class="bg-neutral-400/50 w-2/4 h-4 animate-pulse rounded-md"></div>
        //                 </div>
        //                 <div class="flex flex-col items-center justify-center  w-56 h-64 animate-pulse rounded-xl p-4 gap-4"                      >
        //                     <div class="bg-neutral-400/50 w-32 h-32 rounded-full animate-pulse "></div>
        //                     <div class="bg-neutral-400/50 w-2/4 h-4 animate-pulse rounded-md"></div>
        //                 </div>
        //                 <div class="flex flex-col items-center justify-center  w-56 h-64 animate-pulse rounded-xl p-4 gap-4"                      >
        //                     <div class="bg-neutral-400/50 w-32 h-32 rounded-full animate-pulse "></div>
        //                     <div class="bg-neutral-400/50 w-2/4 h-4 animate-pulse rounded-md"></div>
        //                 </div>
        //                 <div class="flex flex-col items-center justify-center  w-56 h-64 animate-pulse rounded-xl p-4 gap-4"                      >
        //                     <div class="bg-neutral-400/50 w-32 h-32 rounded-full animate-pulse "></div>
        //                     <div class="bg-neutral-400/50 w-2/4 h-4 animate-pulse rounded-md"></div>
        //                 </div>
        //                 <div class="flex flex-col items-center justify-center  w-56 h-64 animate-pulse rounded-xl p-4 gap-4"                      >
        //                     <div class="bg-neutral-400/50 w-32 h-32 rounded-full animate-pulse "></div>
        //                     <div class="bg-neutral-400/50 w-2/4 h-4 animate-pulse rounded-md"></div>
        //                 </div>



        //             </div>
        //         ) : (

        //             <div className='py-6 flex flex-wrap gap-3 items-center justify-center'>
        //                 {catagory.map((product, index) => (
        //                     <div
        //                         key={index}
        //                         className="dark:shadow-lg gap-3 flex flex-col  items-center justify-center transition-all duration-300 hover:cursor-pointer"
        //                         onClick={() => navigate(`/catagory/${product.id}`)}
        //                     >
        //                         <img
        //                             src={`https://mukeshgems.idea2reality.tech/storage/app/public/category/${product.icon}`}
        //                             loading="lazy"
        //                             alt={product.name}
        //                             className="w-[80px] md:w-[90px] h-[80px] md:h-[90px] object-cover m-auto rounded-full border-2 border-[#9A0056] p-1"
        //                         />

        //                         <h1 className="font-heading text-xs md:text-[16px] mt-2 font-medium text-mainheading dark:text-mainbutton">
        //                             {product.name}
        //                         </h1>
        //                     </div>


        //                 ))}
        //             </div>




        //         )
        //     }




        // </div>
    )
}
