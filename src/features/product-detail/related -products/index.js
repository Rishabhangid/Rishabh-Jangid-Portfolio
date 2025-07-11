import React, { useEffect, useState } from 'react'
import ProductDetailCard from '../../cards/product-detail-card';
import { GoArrowLeft, GoArrowRight, GoArrowUpRight } from 'react-icons/go';
import IMAGE from "../../../assets/images/banners/cover-banner-four.png"
import { fetchRelatedProductById } from '../../../api/services/productDetailPageService';


// export const RelatedCatagory = ({ detail, tag }) => {
export const RelatedCatagory = ({ id }) => {

    const related_id = id?.id
    // console.log(related_id, "---------------related product id.....---------------");
    const [realtedProducts, setRelatedProducts] = useState([])
    const [tag, setTags] = useState([])

    useEffect(() => {
        if (!related_id) return; // Prevent fetching if id is undefined

        const fetchRelatedProducts = async () => {
            try {
                console.log(related_id, "Fetching related products...");
                const fetch_related_product = await fetchRelatedProductById(related_id);
                console.log(fetch_related_product, "---------------fetch_related_product---------------");
                setRelatedProducts(fetch_related_product?.data || []);
                setTags(fetch_related_product[0].tags)
            } catch (error) {
                console.error("Error fetching related products:", error);
            }
        };

        fetchRelatedProducts();
    }, [related_id]); // Run only when related_id changes





    return (
        <div className='max-w-[1400px] m-auto '>
{/* 
            <div className=' mt-16 mb-6 mx-4 md:mx-2  dark:bg-[#d7c1a1] bg-[#FAF6F0] rounded-r-lg shadow-lg'>
                <h1 className=' p-4 font-subheading text-mainheading dark:text-white w-fit border-l-4 border-primary dark:border-mainbutton'>RELATED PRODUCTS</h1>
            </div> */}

            <div className='mt-16 mb-6 mx-4 md:mx-2 border-b-4 border-pinkmain'>
                <h1 className=' p-4 font-medium text-pinkmain  dark:text-white w-fit  dark:border-mainbutton '>RELATED PRODUCTS</h1>
            </div>

            <div className='flex flex-wrap  items-center max-w-[1400px] m-auto  mt-10 mb-10'>
                {
                    realtedProducts.length > 0 ? (
                        realtedProducts.map((item) => (
                            <ProductDetailCard trending={realtedProducts} tags={tag} />
                        ))
                    ) : (
                        <div className=''>
                            <h1 className='text-start pl-5'>No Related Products found</h1>
                        </div>
                    )
                }


            </div>
        </div>
    )
}
