import React, { useEffect, useState } from "react";
import { GoArrowUpRight } from "react-icons/go";
import { IoOpenOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { Rating } from "../../product-detail";
import { RatingComponent } from "../../common/components/rating-compo";


const ProductDetailCard = ({ trending, tags }) => {






    // console.log(tags, "--------------- ^^^^^^^^^^^^^^^^^^^^^^************&&&&&&&&&&&&&7lvly---------------");
    // console.log(trending?.images[0], "--------------- ^^^^^^^^^^^^^^^^^^^^^^************&&&&&&&&&&&&&7lvly---------------");
    return (

        <div key={trending?.id || 0} className=" flex flex-col  h-fit   items-start  p-4  ">

            {/* Image */}
            <div className=" relative group ">

                <img

                    src={`https://mukeshgems.idea2reality.tech/storage/app/public/product/thumbnail/${trending?.thumbnail}`}
                    // src={`https://mukeshgems.idea2reality.tech/storage/app/public/product/thumbnail/${currentImage}`}
                    className=" z-2 h-[300px] w-[300px] object-cover shadow-xl rounded-xl hover:scale-105 transition-all duration-300"
                    alt="trending-image"
                    loading='lazy'
                />
                <div className="absolute flex justify-center items-center rounded-xl top-0 left-0 bg-[#d881b2] w-[100%] h-[100%] z-9 opacity-0 group-hover:opacity-70 transition-opacity duration-300">
                    <IoOpenOutline size={50} className="text-white" />
                </div>
            </div>

            {/* Details */}
            <div className="flex flex-col w-full gap-1 mt-4 items-start text-mainheading ">
                <div className="w-full text-center">
                    <h1 className="font-heading font-medium text-center text-[14px] md:text-[16px] dark:text-gray-300 sm:text-[16px] dark:text-white">
                        {trending?.name?.split(" ")?.length > 4
                            ? trending?.name.split(" ").slice(0, 4).join(" ") + "..."
                            : trending?.name}
                    </h1>
                </div>


                <div className=" w-full flex flex-col justify-center items-center ">

                    {/* <h1 key={trending.id} className="w-[30px] h-[30px] rounded-full"></h1> */}
                    <div className='flex gap-3 '>
                        {/* {
                            tags?.length ? (
                                tags?.map((item) => (

                                    <p className="font-subheading text-[12px] sm:text-[14px]  bg-gold-gradient text-white p-1 rounded-sm">{item?.tag}</p>
                                ))
                            ) : (
                                <p className="text-mainheading text-xs">No Tags found</p>
                            )

                        } */}

                        {/* if error */}





                        {/* {tags?.length > 0 ? (
                            tags.map((item, index) => (
                                <p key={index} className="font-subheading text-[12px] sm:text-[14px] bg-gold-gradient text-white p-1 rounded-sm">
                                    {item?.tag}
                                </p>
                            ))
                        ) : (
                            <p className="text-mainheading text-xs">No Tags found</p>
                        )} */}







                        {/* {tags.tags?.length > 0 ? (
                            tags.tags.map((item, index) => (
                                <p key={index} className="font-subheading text-[12px] sm:text-[14px] bg-gold-gradient text-white p-1 rounded-sm">
                                    {item?.tag}
                                </p>
                            ))
                        ) : (
                            <p className="text-mainheading text-xs">No Tags found</p>
                        )} */}

                    </div>

                    <div className='flex justify-center items-end gap-2'>
                        <p className="text-mainheadin dark:text-white text-[14px] md:text-lg  font-semibold">₹{trending?.purchase_price}</p>
                        <p className="text-[#9A0056] text-[14px] md:text-lg font-medium line-through">₹{trending?.unit_price}</p>
                    </div>

                    {/* allTrending.products[3].rating[0].average */}
                    {/* <div>
                        {
                            trending.rating.length > 0 ?
                                trending.rating.map((item) => (
                                    <>
                                        <RatingComponent rating={item.average} />
                                    </>
                                ))
                                : <RatingComponent rating={0} />
                        }

                    </div> */}




                </div>
                <div>
                    {/* <p className="text-primary text-xl sm:text-2xl font-medium">{trending.purchase_price}</p> */}
                </div>
            </div>



        </div>

    );
};

export default ProductDetailCard;
