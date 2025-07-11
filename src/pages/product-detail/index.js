import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// components
import { HeroDetail, ProductDetailSection, RelatedCatagory } from '../../features/product-detail';

// api service
import { fetchProductAllDetail, fetchProductOrdersApi, fetchProductReviewsApi } from '../../api/services/productDetailPageService';
import { ProductCommentSection } from '../../features/product-detail/comment-section';
import { useDispatch } from 'react-redux';
import { disableLoading, enableLoading } from '../../redux/slices/loading/loadingSlice';
import { PromiseSection } from '../../features/common/components/promise-section';

export const ProductDetail = () => {
  const dispatch = useDispatch()

  const { id } = useParams();
  // console.log(id, "---------------id product ki---------------");
  const [productdetail, setProductdetail] = useState(null);
  const [totalOrders, setTotalOrders] = useState({ order_count: "", wishlist_count: "" });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);



  // fetch product details
  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        // dispatch( enableLoading() )
        const fetch_product_detail = await fetchProductAllDetail(id);

        // console.log(fetch_product_detail, "---------------fetch_product_detail ((((((((((((((((((9---------------");

        const product_detail = fetch_product_detail?.data;
        console.log(product_detail, "---------------product_detail }}}}}}}}}}}]]---------------");

        setProductdetail(product_detail);
      } catch (error) {
        console.log(error, "---------------error---------------");
      }
      finally {
        // dispatch(disableLoading())
      }
    };

    const fetchProductOrders = async () => {
      try {
        // console.log(productdetail.id, "---------------productdetail.id---------------");
        const fetch_product_orders = await fetchProductOrdersApi(productdetail.id);

        // console.log(fetch_product_orders, "---------------fetch_product_orders ((((((((((((((((((9---------------");

        const product_totalorders = fetch_product_orders?.data;
        console.log(product_totalorders, "---------------total orders and wishlist +++++++++++++++++++++++++++++++++---------------");
        setTotalOrders({ order_count: product_totalorders.order_count, wishlist_count: product_totalorders.wishlist_count })
      } catch (error) {
        console.log(error, "---------------error---------------");
      }
    };

    const fetchProductReviews = async () => {
      try {
        // console.log(productdetail.id, "---------------productdetail.id from innnnnn -ooooooooooo--------------");
        const fetch_product_review = await fetchProductReviewsApi(productdetail.id);

        console.log(fetch_product_review, "---------------fetch_product_review ((((((((((((((((((9---------------");

        const product_reviews = fetch_product_review?.data;
        alert("bbb")
        console.log(product_reviews, "---------------product revies +++++++++++++++++++++++++++++++++---------------");
        //   setTotalOrders(product_reviews)
      } catch (error) {
        console.log(error, "---------------error---------------");
      }
    };



    fetchProductDetail();
    fetchProductOrders();
    fetchProductReviews();

  }, []);


  return (
    <div className=' bg-[#ffffff] dark:bg-[#121212]  '>

      {productdetail ? (
        <div className=''>
          <HeroDetail detail={productdetail} total={totalOrders} />

          <div className='grid grid-cols-1 mt-6 md:grid-cols-[60%_40%] gap-2 md:gap-8 max-w-[1400px] m-auto'>
            <div className=''>
              <ProductDetailSection detail={productdetail} />
              <RelatedCatagory id={productdetail} />
            </div>
            <div className='mx-4 md:m-0'>
              <ProductCommentSection comment={productdetail.reviews} />
            </div>



          </div>

          <div className='flex justify-center px-6 mt-6'>
            <PromiseSection />
          </div>



        </div>
      ) : (
        <div>

          <div
            className="w-[80%] mt-16 pt-10 m-auto grid-cols-1 grid md:grid-cols-2  gap-6 rounded   animate-pulse md:p-6 "
          >
            <div
              className="flex items-center justify-center h-48 md:h-96 mb-4 bg-gray-300 rounded dark:bg-gray-400"
            >
              <svg
                viewBox="0 0 16 20"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="w-10 h-10 text-gray-200 dark:text-gray-600"
              >
                <path
                  d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"
                ></path>
                <path
                  d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"
                ></path>
              </svg>
            </div>

            <div className='flex flex-col justify-between'>
              <div className="h-8 bg-gray-200 rounded-lg dark:bg-gray-400 mb-4"></div>
              <div className="h-7 w-40 bg-gray-200 rounded-lg dark:bg-gray-400 mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-400 mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-400 mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-400 mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-400 mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-400 mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-400 mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-400 mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-400"></div>
            </div>

          </div>

          <div className="flex justify-center items-center h-32 w-[100%]">
            <div className="flex flex-row gap-2">
              <div className="w-4 h-4 rounded-full bg-mainbutton animate-bounce [animation-delay:.7s]"></div>
              <div className="w-4 h-4 rounded-full bg-mainbutton animate-bounce [animation-delay:.3s]"></div>
              <div className="w-4 h-4 rounded-full bg-mainbutton animate-bounce [animation-delay:.7s]"></div>
            </div>
          </div>
        </div>
      )}


    </div>

  );
};
