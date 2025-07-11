import React, { useEffect, useState } from 'react'
import { MainHeading, SubHeading } from '../../shared'
import { useNavigate, useParams } from 'react-router-dom';
import { fetchAllBrands, fetchProductById, filterService } from '../../api/services/productService';
import ProductDetailCard from '../../features/cards/product-detail-card';
import EMPTY from "../../assets/gifs/empty.gif"
import { ShopNowButton } from '../../shared/components/shopNow';
import { IoMdClose } from "react-icons/io"; // Close icon
import { useDispatch } from 'react-redux';
import { disableLoading, enableLoading } from '../../redux/slices/loading/loadingSlice';
import { motion } from "framer-motion";
import { fetchAllCatagories } from '../../api/services/homepageService';

import { AiFillGold } from "react-icons/ai";
import { FaFilter } from "react-icons/fa";
import CROSS from "../../assets/images/cross.png"
import SEARCH from "../../assets/images/searchnew.png"
import { PromiseSection } from '../../features/common/components/promise-section';



export const CatagoryPage = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate()
  const { id } = useParams()
  console.log(id, "---------------id ctgiii---------------");
  const page = 1

  const [products, setProducts] = useState([])
  const [tags, setTags] = useState([])
  const [filters, setFilters] = useState({ sortBy: "best-selling", priceMin: "", priceMax: "", brand: "" });
  const [dropdownCatagory, setDropdownCatagory] = useState([])
  const [brands, setBrands] = useState([])
  const [catagory, setCatagory] = useState([]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [loading, setLoading] = useState(false)



  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Applied Filters:", filters);
    // Apply the filter logic or API request here
  };

  const applyFilters = async () => {
    try {
      setLoading(true)
      console.log(filters, "---------------filters---------------");
      const filterData = await filterService(filters);
      // setCatagory(filterData.products);
      setProducts(filterData.products);
      setLoading(false)
      setIsFilterModalOpen(false)
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    // fetching products by catagory id
    const fetchProductByCatagoryId = async () => {
      try {
        const fetch_product_by_catagory_id = await fetchProductById(id, filters, page);
        const allProducts = fetch_product_by_catagory_id?.data || [];
        console.log(allProducts, "--------------- Products by catagory ID *******8---------------");
        setProducts(allProducts)


      } catch (error) {
        console.log(error, "---------------error---------------");
      }
    };
    fetchProductByCatagoryId()
  }, [id])

  const handleFilter = async (id) => {
    console.log("iiiddddd", id)
    try {

      const filter_data = await filterService(id)
      const filterData = filter_data?.data;
      console.log(filterData.token, "---------------filterData Token---------------");
      console.log(filterData.temporary_token, "---------------filterData Temp TOk---------------");
      if (filterData?.success) {

        // dispatch(setUser(response?.data));
        console.log(filterData, "---------------filterData---------------");


      }
    }
    catch (error) {
      console.log(error, "---------------error---------------");

      // Extract validation errors
      const errors = error?.errors || [{ message: "Something went wrong" }];

      // Join all error messages into a single string
      const errorMessage = errors.map(err => err.message).join("\n");


    }

  }


  useEffect(() => {

    const fetchBrands = async () => {
      try {
        const fetch_all_brands = await fetchAllBrands();
        setBrands(fetch_all_brands?.data || []);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchAllProductCatagory = async () => {
      try {
        const fetch_all_catagory = await fetchAllCatagories();
        setDropdownCatagory(fetch_all_catagory?.data || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllProductCatagory();
    fetchBrands();

  }, [])

  const clearSearch = async () => {
    setFilters({ sortBy: "", minPrice: "", maxPrice: "", brand: "", category: "" })
  };



  return (

    <motion.div className='bg-[#FFFFFF] dark:bg-[#121212]'
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className='max-w-[1400px] m-auto  pb-10 pt-6  flex flex-col items-center'>

        {/* heading */}
        <MainHeading name="Catagory" />
        {/* <SubHeading name="Discover Timeless Elegance & Stunning Designs" />  */}

        {/* Buttons for Small Screens */}
        <div className="flex justify-center gap-5 mt-6 lg:hidden">
          <button
            className="rounded-lg bg-mainbutton text-white flex gap-2 justify-center items-center p-2"
            onClick={() => setIsFilterModalOpen(true)}
          >
            <FaFilter className="text-white" />
            <p>Filter</p>
          </button>
        </div>

        {/* Filter Bar for Large Screens */}
        {/* <form className="hidden lg:flex sticky z-10 top-20 p-6 mt-6 shadow-2xl rounded gap-4 items-center bg-gradient-to-r from-[#4F3D2A] to-[#796853] font-subheading"> */}
        <form className="hidden lg:flex  z-10  p-2 mt-6 border-b-2 dark:border-gray-400 gap-4 items-center">
          {/* Sorting */}
          <select
            name="sortBy"
            onChange={handleFilterChange}
            className="wdark:border-gray-900-fit   p-2   bg-white dark:bg-gray-900"
          >
            <option value="" disabled>
              Sort By
            </option>
            <option value="most_favorite">Best-selling</option>
            <option value="latest">Latest</option>
            <option value="price_low_high">Featured Deal</option>
            <option value="price_high_low">Most Favorite</option>
          </select>

          {/* Brand */}
          <select
            name="brand"
            onChange={handleFilterChange}
            className="w-[200px] border-l dark:border-gray-900 p-2 rounded bg-white dark:bg-gray-900"
          >
            <option value="">By Brand</option>
            {brands.length > 0
              ? brands.map((item, index) => (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              ))
              : null}
          </select>

          {/* Category */}
          <select
            name="category"
            onChange={handleFilterChange}
            className="w-[200px] border-l dark:border-gray-900 p-2 rounded bg-white dark:bg-gray-900"
          >
            <option value="">By Category</option>
            {dropdownCatagory.length > 0
              ? dropdownCatagory.map((item, index) => (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              ))
              : null}
          </select>

          {/* Price */}
          <div className="flex gap-2">
            <input
              type="number"
              name="minPrice"
              onChange={handleFilterChange}
              placeholder="Min Price"
              className="w-[200px] border-l dark:border-gray-900 p-2 rounded bg-white dark:bg-gray-900"
            />
            {/* <span className="self-center">to</span> */}
            <input
              type="number"
              name="maxPrice"
              onChange={handleFilterChange}
              placeholder="Max Price"
              className="w-[200px] border-l dark:border-gray-900 p-2 rounded bg-white dark:bg-gray-900"
            />
          </div>

          {/* Apply */}
          <div className="flex justify-center items-center gap-2">
            {/* <IoSearchCircleSharp className="text-[50px] text-mainbutton hover:cursor-pointer" onClick={applyFilters} /> */}
            {/* <TiDelete className="text-[50px] text-mainbutton hover:cursor-pointer" onClick={clearSearch} /> */}
            <img src={SEARCH} alt="cancel" className="w-8 h-8 hover:cursor-pointer" onClick={applyFilters} />
            <img src={CROSS} alt="cancel" className="w-9 h-9 hover:cursor-pointer" onClick={clearSearch} />
          </div>

        </form>

        {/* Filter Modal for Small Screens */}
        {isFilterModalOpen && (
          <div className="fixed flex md:hidden inset-x-0 bottom-0 bg-white dark:bg-[#0D1F1A] p-6 shadow-2xl rounded-t-lg  flex-col items-center gap-4 z-50">
            <div className="flex justify-between w-full">
              <h3 className="text-lg font-bold">Filter</h3>
              <button onClick={() => setIsFilterModalOpen(false)}>
                <IoMdClose className="text-2xl" />
              </button>
            </div>

            {/* Filters inside modal */}
            <select name="sortBy" onChange={handleFilterChange} className="w-full border p-2  rounded bg-white">
              <option value="" disabled>Sort By</option>
              <option value="most_favorite">Best-selling</option>
              <option value="latest" className=''>Latest</option>
            </select>

            <select name="brand" onChange={handleFilterChange} className="w-full border p-2 rounded bg-white">
              <option value="">By Brand</option>
              {brands.map((item, index) => (
                <option key={index} value={item.name}>{item.name}</option>
              ))}
            </select>

            <select name="category" onChange={handleFilterChange} className="w-full border p-2 rounded bg-white">
              <option value="">By Category</option>
              {dropdownCatagory.map((item, index) => (
                <option key={index} value={item.name}>{item.name}</option>
              ))}
            </select>

            <button
              type="button"
              onClick={applyFilters}
              className="bg-pinkmain text-white w-full py-2 rounded"
            >
              Apply Filters
            </button>
          </div>
        )}


        {/* products */}
        <div className='flex flex-wrap justify-center hover:cursor-pointer  max-w-[1400px] m-auto mt-10'>

          {
            loading ? (
              <div className="flex flex-col gap-4 items-center justify-center">

                <div class="loader border-t-2 rounded-full border-yellow-500 bg-yellow-300 animate-spin
                                          aspect-square w-16 flex justify-center items-center text-yellow-700">
                  <AiFillGold className="text-[25px]" />

                </div>
              </div>
            ) :
              products.length > 0 ? (
                products.map((item, index) => (
                  <div className='flex flex-wrap  justify-center hover:cursor-pointer' onClick={() => navigate(`/detail/${item.slug}`)}>
                    <ProductDetailCard trending={item} tags={item} />
                    {/* Show  div after every 8 items */}
                    {(index + 1) % 8 === 0 &&
                      <PromiseSection />}
                  </div>
                ))
              ) : (
                <div className='flex justify-center flex-col gap-1 items-center w-full'>
                  <img src={EMPTY} alt="dfdg" className='w-[80px]' />
                  <h1 className='text-[14px]'>No Products Found</h1>
                  <ShopNowButton />
                </div>
              )
          }

        </div>




      </div>
    </motion.div>
  )
}
