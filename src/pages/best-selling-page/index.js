// import
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// components
import { MainHeading, SubHeading } from "../../shared";
import ProductDetailCard from "../../features/cards/product-detail-card";

// api's
import { fetchAllBrands, fetchFeaturedProducts, filterService } from "../../api/services/productService";
import { fetchAllCatagories } from "../../api/services/homepageService";

// assests
import NORESULT from "../../assets/images/no-result.png";
import CROSS from "../../assets/images/cross.png"
import SEARCH from "../../assets/images/searchnew.png"
import PROMISE from "../../assets/images/promise.png"


import PROMISE1 from "../../assets/images/promises/Certified-Diamonds.png"
import PROMISE2 from "../../assets/images/promises/Complete-Transparency.png"
import PROMISE3 from "../../assets/images/promises/Your_Jewellery-is_Insured.png"
import PROMISE4 from "../../assets/images/promises/imgpsh_fullsize_anim.png"

// reacr icons
import { FaFilter } from "react-icons/fa";
import { FcGenericSortingDesc } from "react-icons/fc";
import { IoMdClose } from "react-icons/io"; // Close icon
import { AiFillGold } from "react-icons/ai";
import { IoSearchCircleSharp } from "react-icons/io5";
import { TiDelete } from "react-icons/ti";
import { PromiseSection } from "../../features/common/components/promise-section";




export const BestSellingScreen = () => {

  // declaration *************************************************
  const navigate = useNavigate();


  // use-states **************************************************
  const [filters, setFilters] = useState({
    sortBy: "",
    minPrice: "",
    maxPrice: "",
    brand: "",
    category: "",
  });
  const [brands, setBrands] = useState([]);
  const [dropdownCatagory, setDropdownCatagory] = useState([]);
  const [catagory, setCatagory] = useState([]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false); // modal state
  const [loading, setLoading] = useState(false)


  // handlers *******************************************************
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const clearSearch = async () => {
    setFilters({ sortBy: "", minPrice: "", maxPrice: "", brand: "", category: "" })
  };

  // api call **********************************************************
  const applyFilters = async () => {
    try {
      setLoading(true)
      const filterData = await filterService(filters);
      setCatagory(filterData.products);
      setLoading(false)
      setIsFilterModalOpen(false)
    } catch (error) {
      console.error(error.message);
    }
  };

  // use-effects *************************************************************
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchFeaturedItems = async () => {
      try {
        const fetch_featured_item = await fetchFeaturedProducts();
        console.log(fetch_featured_item.data.products, "---------------fetchFeaturedItems---------------");
        setCatagory(fetch_featured_item?.data?.products || []);
      } catch (error) {
        console.error(error);
      }
    };

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
    fetchFeaturedItems();
    fetchBrands();
  }, []);

  return (

    <motion.div className="bg-[#FFFFFF] dark:bg-[#121212]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* <div className="max-w-[1400px] m-auto mt-16 pt-10 pb-10 flex flex-col items-center"> */}
      <div className="max-w-[1400px] m-auto pb-10  pt-6 flex flex-col items-center">
        <MainHeading name="Best Selling" />
        {/* <SubHeading name="Discover Our Most Loved & Timeless Pieces" /> */}

        {/* Buttons for Small Screens */}
        <div className="flex gap-5 mt-6 lg:hidden">
          <button
            className="rounded-lg bg-mainbutton text-white flex gap-2 justify-center items-center p-2"
            onClick={() => setIsFilterModalOpen(true)}
          >
            <FaFilter className="text-white" />
            <p>Filter</p>
          </button>
        </div>

        {/* Filter Bar for Large Screens */}
        {/* <form className="hidden lg:flex fixed z-10 bottom-10 p-6 mt-6 shadow-2xl rounded gap-4 items-center bg-gradient-to-r from-[#014308] to-[#02660B] font-subheading"> */}
        <form className="hidden lg:flex  z-10  p-2 mt-6 border-b-2 dark:border-gray-400  gap-4 items-center">
          {/* Sorting */}
          <select
            name="sortBy"
            onChange={handleFilterChange}
            className="w-fit   p-2   bg-white dark:bg-gray-900"
          >
            <option value="" disabled>
              Sort By
            </option>
            <option value="most-favorite">Best-selling</option>
            <option value="latest">Latest</option>
            <option value="featured_deal">Featured Deal</option>
            <option value="top-rated">Top Rated</option>
            <option value="price_high_low">Most Favorite</option>
          </select>

          {/* Brand */}
          <select
            name="brand"
            onChange={handleFilterChange}
            className="w-[200px] border-l dark:border-gray-900  p-2 rounded bg-white dark:bg-gray-900"
          >
            <option value="" disabled>By Brand</option>
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
            className="w-[200px] border-l dark:border-gray-900  p-2 rounded bg-white dark:bg-gray-900"
          >
            <option value="" disabled>By Category</option>
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
              className="w-[150px] border-l  dark:border-gray-900  p-2 rounded bg-white dark:bg-gray-900"
            />
            {/* <span className="self-center">to</span> */}
            <input
              type="number"
              name="maxPrice"
              onChange={handleFilterChange}
              placeholder="Max Price"
              className="w-[150px] border-l dark:border-gray-900  p-2 rounded bg-white dark:bg-gray-900"
            />
          </div>

          {/* Apply */}
          <div className="flex justify-center items-center gap-2">
            {/* <IoSearchCircleSharp className="text-[50px] text-mainbutton hover:cursor-pointer" onClick={applyFilters} /> */}
            {/* <TiDelete className="text-[50px] text-mainbutton hover:cursor-pointer" onClick={clearSearch} /> */}
            <img src={SEARCH} alt="cancel" className="w-8 h-8 hover:cursor-pointer" onClick={applyFilters} />
            <img src={CROSS} alt="cancel" className="w-9 h-9 hover:cursor-pointer" onClick={clearSearch} />
          </div>
          {/* <button
            type="button"
            onClick={applyFilters}
            className="bg-gold-gradient hover:bg-[#B58E2F] text-white w-[200px] py-2 rounded"
          >
            Apply Filters
          </button> */}
        </form>

        {/* Filter Modal for Small Screens */}
        {isFilterModalOpen && (
          <div className="fixed inset-x-0 bottom-0 bg-white dark:bg-[#0D1F1A] p-6 shadow-2xl rounded-t-lg flex flex-col items-center gap-4 z-50">
            <div className="flex justify-between w-full">
              <h3 className="text-lg font-bold">Filter</h3>
              <button onClick={() => setIsFilterModalOpen(false)}>
                <IoMdClose className="text-2xl" />
              </button>
            </div>

            {/* Filters inside modal */}
            <select name="sortBy" onChange={handleFilterChange} className="w-full border p-2 rounded bg-white">
              <option value="" disabled>Sort By</option>
              <option value="most_favorite">Best-selling</option>
              <option value="latest">Latest</option>
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

        <div className='flex z-4 flex-wrap gap-3 justify-center hover:cursor-pointer  max-w-[1400px] m-auto mt-10 z-6'>
          {
            loading ? (
              <div className="flex flex-col gap-4 items-center justify-center">

                <div class="loader border-t-2 rounded-full border-yellow-500 bg-yellow-300 animate-spin
                            aspect-square w-16 flex justify-center items-center text-yellow-700">
                  <AiFillGold className="text-[25px]" />

                </div>
              </div>
            ) : catagory.length > 0 ? (
              catagory.map((item, index) => (
                <>
                  <div key={item.slug} onClick={() => navigate(`/detail/${item.slug}`)}>
                    <ProductDetailCard trending={item} tags={item?.tags || []} />
                  </div>

                  {/* Show  div after every 8 items */}
                  {(index + 1) % 8 === 0 &&
                    <PromiseSection />}
                </>
              ))
            ) : (
              <div className="flex flex-col gap-4 items-center justify-center">
                <img src={NORESULT} alt="no result" className="w-[100px]" />
                <p className="text-xl">No products found</p>
              </div>
            )
          }

        </div>
      </div>
    </motion.div>
  );
};
