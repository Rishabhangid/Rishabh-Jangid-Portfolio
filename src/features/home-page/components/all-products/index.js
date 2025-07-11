import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { MainHeading, PrimaryButton, SubHeading } from '../../../../shared';
import ProductDetailCard from '../../../cards/product-detail-card';

import { GoArrowUpRight } from 'react-icons/go';
import { fetchLatestProducts } from '../../../../api/services/homepageService';
import { EffectButton } from '../../../../shared/components/effectButton';
import { motion } from "framer-motion";



export const AllProducts = () => {

    const navigate = useNavigate()

    const [trendingProducts, setTrendingProducts] = useState([])
    const [tags, setTags] = useState([])

    // fetching all trending/latest products
    useEffect(() => {
        const fetchAllLatestProduct = async () => {
            try {

                const fetch_trending_products = await fetchLatestProducts();
                const allTrending = fetch_trending_products?.data || [];
                setTrendingProducts(allTrending.products)
                // setTags(allTrending.products[0].tags)
                setTags(allTrending.products)
                // console.log(allTrending.products, "---------------allTrending.products[0].tags---------------");
                console.log(allTrending.products[3].rating[0].average, "---------------allTrending.products[3].tags---------------");
                // console.log(allTrending.products.rating?.average, "---------------allTrending.products[0].tags---------------");

            } catch (error) {
                console.log(error, "---------------error---------------");
            }
        };
        fetchAllLatestProduct()
    }, [])


    return (

        <motion.div className='bg-gray-100 dark:bg-[#121212] pt-10'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >

            <MainHeading name="Discover All Products" />
            <SubHeading name="Explore Our Premium Collection" />

            <div className='flex flex-wrap gap-3 justify-center hover:cursor-pointer  max-w-[1400px] m-auto mt-6 md:mt-10'>
                {trendingProducts.map((trending) => (
                    // <div onClick={() => navigate(`/detail/${trending.slug}`)} className='bg-[#E3F3E5] dark:bg-[#0D1F1A] rounded-lg shadow-md'>
                    <div onClick={() => navigate(`/detail/${trending.slug}`)} className=' rounded-2xl'>
                        {/* {console.log("@@@@@@@@@@@@@@@@", trending.tags)} */}
                        <ProductDetailCard trending={trending} tags={trending.tags} />
                    </div>
                ))}


            </div>

            <div className='pb-10'>
                {/* <div onClick={()=>navigate("/catagory/3")} className="flex flex-row m-auto mt-10 justify-center items-center gap-2 w-[300px] md:w-[350px] bg-primary text-white  hover:bg-white hover:text-primary  transition-all duration-300 hover:cursor-pointer"> */}
                <div onClick={() => navigate("/catagory/3")} className="flex flex-row m-auto mt-4 justify-center items-center">

                    {/* <GoArrowUpRight className="w-8 h-4 md:h-12 " />
<h1 className="font-heading font-light text-2xl md:text-2xl" onClick={() => navigate(`/catagory/2`)}>SEE ALL</h1> */}

                    {/* <EffectButton /> */}
                    <PrimaryButton label="View All"/>
                </div>
            </div>

        </motion.div>

    )
}
