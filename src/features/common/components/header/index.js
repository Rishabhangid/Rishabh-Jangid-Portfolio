// import
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// assets
// import LOGO from "../../../../assets/images/logo/logo_nobg.png"
import LOGO from "../../../../assets/images/logo/logo_nobg.png"
import IMAGE from "../../../../assets/images/homepage/CoverImageOne.png"

// react icons
import { IoSearch } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";

// redux
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../../../redux/slices/authentication/authSlice";

// api's
import { fetchAllCatagories, fetchSearchProducts, searchProducts } from "../../../../api/services/homepageService";
import { fetchFeaturedProducts } from "../../../../api/services/productService";

export const Header = () => {

    // declaration *******************************************************************
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const searchRef = useRef(null);
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });
    const totalItem = useSelector((state) => state.cartSummary.totalItem);
    console.log(totalItem, "---------------totalItem **---------------");


    // fetching authenticate **********************************************************
    const is_user_authenticated = useSelector((state) => state.auth.isAuthenticated)

    // use-states ********************************************************************* 
    const [catagory, setCatagory] = useState([])
    const [featuredProducts, setFeaturedProducts] = useState([])
    const [inputData, SetInputData] = useState({ search: "", products: [] })
    const [isOpen, setIsOpen] = useState(false);
    const [openSearch, setOpensearch] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    // const [catagory, setCatagory] = useState([])


    // handlers **************************************************************************
    const handleInputChange = async (e) => {
        const value = e.target.value;
        console.log(value.length, "---------------value ****---------------");
        // Update search text in state
        SetInputData((prevData) => ({
            ...prevData,
            search: value,
        }));

        // If input is empty, clear the products list

        console.log(inputData, "---------------inputData---------------");
        try {
            const fetch_all_search = await searchProducts(value);
            const all = fetch_all_search?.data || [];
            console.log(all.products, "--------------- ALL SEARCH---------------");

            SetInputData((prevData) => ({
                ...prevData,
                products: all.products,
            }));

        } catch (error) {
            console.log(error, "---------------error---------------");
        }
    };

    const handleLogout = async (e) => {
        try {
            dispatch(logout())
            navigate("/login")
        }
        catch (error) {
            alert(error)
        }
    }

    const handleNavigate = (item) => {
        navigate(`/catagory/${item}`)
        setOpensearch(false)
    }

    const handleNavigation = (path) => {
        navigate(path);
        setMobileMenuOpen(false); // Close menu when an item is clicked
    };



    // use-effect ************************************************************************ 
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    useEffect(() => {
        // fetching all products catagory
        const fetchAllProductCatagory = async () => {
            try {
                const fetch_all_catagory = await fetchAllCatagories();
                const allCatagory = fetch_all_catagory?.data || [];
                console.log(allCatagory, "--------------- all Catagory fetched successfully RRRRRR from navbar---------------");
                setCatagory(allCatagory)

            } catch (error) {
                console.log(error, "---------------error---------------");
            }
        };
        fetchAllProductCatagory()
        console.log(catagory, "---------------catagory---------------");
    }, [])

    useEffect(() => {
        // fetching all products catagory
        const fetchFeaturedItems = async () => {
            try {
                const fetch_featured_item = await fetchFeaturedProducts();
                const allProducts = fetch_featured_item?.data || [];
                console.log(allProducts.products, "--------------- all featured products fetched successfully--------------");
                setFeaturedProducts(allProducts.products)

            } catch (error) {
                console.log(error, "---------------error---------------");
            }
        };
        fetchFeaturedItems()
        console.log(featuredProducts, "---------------catagory---------------");
    }, [])

    useEffect(() => {
        function handleClickOutside(event) {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setOpensearch(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);


    return (
        // <div className="w-full fixed top-0 left-0 bg-[#796853] shadow-lg text-white z-50 dark:bg-[#45392D]">



        // <div className="w-full bg-[#796853] shadow-lg text-white z-50 dark:bg-[#45392D]">
        <div className="w-full bg-[#9A0056] shadow-lg text-white z-50 dark:bg-[#9A0056]">

            {/* <div className="navbar max-w-[1400px]  px-3 md:px-3 lg:px-2 m-auto"> */}
            <div className="navbar max-w-[1400px] px-3 md:px-3 lg:px-2 m-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        {/* Hamburger Icon */}
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost lg:hidden"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </div>

                        {/* Mobile Hamburger Menu */}
                        {mobileMenuOpen && (
                            <ul
                                tabIndex={0}
                                // className="menu menu-sm dropdown-content bg-secondprimary rounded-box z-[1] mt-3 w-52 p-2 shadow text-white"
                                className="menu menu-sm dropdown-content bg-[#9A0056] rounded-box z-30 mt-3 w-52 p-2 shadow text-white"
                            >
                                <li onClick={() => handleNavigation("/")}>
                                    <a className="text-[14px]">Home</a>
                                </li>
                                <li>
                                    <a className="text-[14px]">Shop by category</a>
                                    <ul className="p-2 rounded-none bg-pinkmain">
                                        {catagory.map((item) => (
                                            <li key={item.id} onClick={() => handleNavigation(`/catagory/${item.id}`)}>
                                                <a className="text-[14px]">{item.name}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                                <li onClick={() => handleNavigation("/bestselling")}>
                                    <a className="text-[14px]">Best Selling</a>
                                </li>
                                <li onClick={() => handleNavigation("/contact")}>
                                    <a className="text-[14px]">Contact Us</a>
                                </li>
                            </ul>
                        )}
                    </div>
                    <img src={LOGO} alt="logo" className="w-[100px] md:w-[150px]" onClick={() => navigate("/")} />

                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu text-menu-text menu-horizontal px-1">
                        <li onClick={() => navigate("/")} className=""><a className="text-[14px]">Home</a></li>
                        <li className="relative group z-20">
                            <div className="cursor-pointer text-[14px]">Shop by Category</div>

                            {/* Dropdown Menu */}
                            {/* <ul className="absolute left-0 top-full hidden group-hover:block bg-secondprimary p-2 rounded-none shadow-lg w-48"> */}
                            <ul className="absolute left-0 top-full hidden group-hover:block bg-[#9A0056] p-2 rounded-none shadow-lg w-48">
                                {catagory.map((item) => (
                                    <li key={item.id} onClick={() => navigate(`/catagory/${item.id}`)} className="hover:bg-mainbutton hover:tracking-wide hover:text-white px-4 py-2 cursor-pointer transition-all duration-100 text-[14px]">
                                        {item.name}
                                    </li>
                                ))}
                            </ul>
                        </li>

                        <li onClick={() => navigate("/bestselling")}><a className="text-[14px]">Best selling</a></li>
                        <li onClick={() => navigate("/contact")}><a className="text-[14px]">Contact Us</a></li>

                    </ul>
                    {/* <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="p-2 rounded-md fixed right-20 bottom-20 bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
                    >
                        {darkMode ? "☀️" : "🌙"}
                    </button> */}
                </div>
                {
                    is_user_authenticated ? (
                        <div className="navbar-end flex gap-3 z-56">
                            {
                                openSearch ? (

                                    <motion.div ref={searchRef} className="relative  flex justify-center items-center gap-2 z-56 "
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.1 }}
                                    >
                                        {/* phle w-[105] tha */}
                                        <input type="text" name="search" value={inputData.search} placeholder="Search Product" onChange={handleInputChange} className="bg-white px-3 py-1 text-[14px] rounded-lg text-mainheading w-[260px] md:w-[200px] " />
                                        <p onClick={() => setOpensearch(false)}><IoIosCloseCircle size={30} /></p>

                                        <div className="absolute top-10 right-0 md:right-10 bg-[#F5F5F5] dark:bg-[#121212]  rounded-lg  w-[300px] md:w-[600px] max-h-[500px] z-20 overflow-y-auto">
                                            {/* recommended products */}
                                            <div className=" p-4">

                                                {/* <h1 className="text-xl text-primary">Searched Products</h1> */}

                                                <div className="mt-1 md:mt-3 flex flex-col gap-2 mb-2 md:mb-4 p-0 md:p-3">
                                                    {inputData.products?.length > 0 ? (
                                                        inputData.products.map((item) => (
                                                            <div
                                                                key={item.id}
                                                                onClick={() => {
                                                                    navigate(`/detail/${item.slug}`)
                                                                    setOpensearch(false)
                                                                }}

                                                                className="flex items-center gap-4 p-1 md:p-3 bg-gray-100 dark:bg-black  hover:bg-gray-200 rounded-md transition-all duration-300 cursor-pointer"
                                                            >
                                                                {/* Image */}
                                                                <img
                                                                    src={IMAGE}
                                                                    alt={item.name}
                                                                    className="w-[50px] h-[50px] object-cover rounded-full border border-gray-300 shadow-sm"
                                                                />

                                                                {/* Product Name */}
                                                                <p className="text-xs md:text-lg font-semibold text-gray-800 dark:text-white">{item.name}</p>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <div className="flex justify-center items-center gap-3 text-mainheading">
                                                            <p className="text-[14px] dark:text-white md:text-[16px] font-medium">No product found</p>
                                                        </div>
                                                    )}

                                                </div>



                                                <h1 className="text-[14px] md:text-lg text-white px-4 py-2 bg-mainbutton rounded-t-lg font-semibold">Explore Catagories</h1>
                                                <hr className="border-t-[2px] border-mainbutton opacity-50" />
                                                <div className="mt-5 flex gap-2 justify-evenly p-3">
                                                    {
                                                        catagory.length > 0 ? (
                                                            catagory.slice(0, 5).map((item) => (
                                                                <div className=" flex flex-col items-center gap-3 text-mainheading hover:cursor-pointer hover:scale-105 overflow-hidden transition-all duration-300 p-1 md:p-0" onClick={() => handleNavigate(item.id)}>
                                                                    <img src={`https://mukeshgems.idea2reality.tech/storage/app/public/category/${item.icon}`} alt="imagee" className="object-center rounded-full" />

                                                                    <p className="text-xs dark:text-white md:text-[14px] font-medium  text-center">{item.name}</p>
                                                                </div>
                                                            ))

                                                        ) : (
                                                            <h1>No catagory found</h1>
                                                        )
                                                    }

                                                </div>
                                            </div>
                                        </div>

                                    </motion.div>




                                ) : (
                                    <IoSearch onClick={() => setOpensearch(true)} className="text-[20px] md:text-[25px] hover:cursor-pointer z-56 hover:text-mainbutton transition-all duration-200 hover:rotate-12" />
                                )
                            }

                            <li className="relative group z-50 list-none">
                                <div className="cursor-pointer"><CgProfile className="text-[20px] md:text-[25px] hover:cursor-pointer hover:text-mainbutton transition-all duration-200" /></div>

                                {/* Dropdown Menu */}
                                {/* <ul className="absolute z-200 list-none right-0 top-full hidden group-hover:block bg-secondprimary p-2 rounded-none shadow-lg w-48"> */}
                                <ul className="absolute z-50 list-none right-0 top-full hidden group-hover:block bg-[#9A0056] p-2 rounded-none shadow-lg w-48">
                                    <li onClick={() => navigate("/userprofile")} className="hover:bg-mainbutton z-150 text-[14px] hover:tracking-wide hover:text-white px-4 py-2 cursor-pointer transition-all duration-100">
                                        Account
                                    </li>
                                    <li onClick={handleLogout} className="hover:bg-mainbutton hover:tracking-wide text-[14px] hover:text-white px-4 py-2 cursor-pointer transition-all duration-100">
                                        Logout
                                    </li>
                                    {/* <li onClick={() => navigate("/cart")} className="hover:bg-mainbutton hover:tracking-wide hover:text-white px-4 py-2 cursor-pointer transition-all duration-100">
                                        Cart
                                    </li> */}
                                    {/* <MdOutlineShoppingCart onClick={() => navigate("/cart")} className="text-[20px] md:text-[25px] hover:cursor-pointer hover:text-mainbutton transition-all duration-200" /> */}


                                </ul>
                            </li>




                            {/* <CgProfile onClick={() => navigate("/userprofile")} className="text-[20px] md:text-[25px] hover:cursor-pointer hover:text-mainbutton transition-all duration-200" /> */}
                            <button
                                onClick={() => setDarkMode(!darkMode)}
                                className="p-2 rounded-md fixed right-10 bottom-10 bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
                            >
                                {darkMode ? "☀️" : "🌙"}
                            </button>
                            {
                                totalItem > 0 ?
                                    <div className="relative animate-pulse mr-1">
                                        <MdOutlineShoppingCart onClick={() => navigate("/cart")} className="text-[20px] md:text-[25px] hover:cursor-pointer hover:text-mainbutton transition-all duration-200" />
                                        <span className="absolute -top-3 -right-3 bg-yellow-400 rounded-full w-6 h-6 text-center">{totalItem}</span>
                                    </div>
                                    :
                                    <MdOutlineShoppingCart onClick={() => navigate("/cart")} className="text-[20px] md:text-[25px] hover:cursor-pointer hover:text-mainbutton transition-all duration-200" />

                            }
                        </div>
                    ) : (
                        <div className="navbar-end flex gap-3">
                            {/* search button */}
                            {
                                openSearch ? (

                                    <motion.div ref={searchRef} className="relative  flex justify-center items-center gap-2 z-56 "
                                        whileInView={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.1 }}
                                    >
                                        {/* phle w-[105] tha */}
                                        <input type="text" name="search" value={inputData.search} placeholder="Search Product" onChange={handleInputChange} className="bg-white px-3 py-1 text-[14px] rounded-lg text-mainheading w-[200px] md:w-[200px] " />
                                        <p onClick={() => setOpensearch(false)}><IoIosCloseCircle size={30} /></p>

                                        <div className="absolute top-10 right-[-60px] md:right-10 bg-[#F5F5F5] dark:dark:bg-[#0D1F1A]  rounded-lg  w-[300px] md:w-[600px] max-h-[500px] z-20 overflow-y-auto">
                                            {/* recommended products */}
                                            <div className=" p-4">

                                                {/* <h1 className="text-xl text-primary">Searched Products</h1> */}

                                                <div className="mt-1 md:mt-3 flex flex-col gap-2 mb-2 md:mb-4 p-0 md:p-3">
                                                    {inputData.products?.length > 0 ? (
                                                        inputData.products.map((item) => (
                                                            <div
                                                                key={item.id}
                                                                onClick={() => navigate(`/detail/${item.slug}`)}
                                                                className="flex items-center gap-4 p-1 md:p-3 bg-gray-100 hover:bg-gray-200 rounded-md transition-all duration-300 cursor-pointer"
                                                            >
                                                                {/* Image */}
                                                                <img
                                                                    src={IMAGE}
                                                                    alt={item.name}
                                                                    className="w-[50px] h-[50px] object-cover rounded-full border border-gray-300 shadow-sm"
                                                                />

                                                                {/* Product Name */}
                                                                <p className="text-xs md:text-lg font-semibold text-gray-800">{item.name}</p>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <div className="flex justify-center items-center gap-3 text-mainheading">
                                                            <p className="text-[14px] dark:text-white md:text-[16px] font-medium">No product found</p>
                                                        </div>
                                                    )}

                                                </div>



                                                <h1 className="text-lg text-white px-4 py-2 bg-mainbutton rounded-t-lg font-semibold">Explore Catagories</h1>
                                                <hr className="border-t-[2px] border-mainbutton opacity-50" />
                                                <div className="mt-5 flex gap-2 justify-evenly p-3">
                                                    {
                                                        catagory.length > 0 ? (
                                                            catagory.slice(0, 5).map((item) => (
                                                                <div className=" flex flex-col  items-center gap-3 text-mainheading hover:cursor-pointer hover:scale-105 overflow-hidden transition-all duration-300" onClick={() => handleNavigate(item.id)}>
                                                                    <img src={`https://mukeshgems.idea2reality.tech/storage/app/public/category/${item.icon}`} alt="imagee" className="object-center rounded-full" />

                                                                    <p className="text-xs dark:text-white md:text-[14px] font-medium  text-center">{item.name}</p>
                                                                </div>
                                                            ))

                                                        ) : (
                                                            <h1>No catagory found</h1>
                                                        )
                                                    }

                                                </div>
                                            </div>
                                        </div>

                                    </motion.div>




                                ) : (
                                    <IoSearch onClick={() => setOpensearch(true)} className="text-[20px] md:text-[25px] hover:cursor-pointer z-56 hover:text-mainbutton transition-all duration-200 hover:rotate-12" />
                                )
                            }

                            {/* <MdOutlineShoppingCart size={25} onClick={() => navigate("/cart")} className="hover:cursor-pointer" /> */}
                            {
                                totalItem.length > 0 ?
                                    <div>
                                        <span>{totalItem} ujihnui</span>
                                        <MdOutlineShoppingCart onClick={() => navigate("/cart")} className="text-[20px] md:text-[25px] hover:cursor-pointer hover:text-mainbutton transition-all duration-200" />
                                    </div>
                                    :
                                    <MdOutlineShoppingCart onClick={() => navigate("/cart")} className="text-[20px] md:text-[25px] hover:cursor-pointer hover:text-mainbutton transition-all duration-200" />

                            }
                            <Link to="/login" className=" bg-[#D4AF37] text-[#1C1C1C] px-5 py-2 rounded-md shadow-md border border-[#D4AF37] hover:bg-[#B99630] hover:text-white transition-all duration-300">Login</Link>
                            <button
                                onClick={() => setDarkMode(!darkMode)}
                                className="p-2 rounded-md fixed right-10 bottom-10 bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
                            >
                                {darkMode ? "☀️" : "🌙"}
                            </button>
                            {/* <Link to="/register" className=" border-2 border-[#D4AF37] text-[#D4AF37] px-5 py-2 rounded-md shadow-md hover:bg-[#D4AF37] hover:text-[#1C1C1C] transition-all duration-300">Register</Link> */}
                        </div>
                    )
                }

            </div>

            {/* catagory fixed */}
            <div
                className={`bg-gray-100 dark:bg-gray-900 text-mainheading transition-all duration-300 ${isSticky ? "fixed top-0 left-0 w-full shadow-md z-50" : ""
                    }`}
            >
                <div className="max-w-[1400px] mx-auto flex justify-start gap-2 overflow-y-auto scrollbar-hide" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                    {
                        catagory.length > 0 ?
                            catagory.map((item) => (
                                <div className="p-2 border-b-4 dark:text-white border-gray-100 dark:border-gray-900 hover:border-b-4 hover:border-[#9A0056] transition-all duration-400" onClick={() => navigate(`/catagory/${item.id}`)}>
                                    <p
                                        className="hover:cursor-pointer text-center text-[12px] md:text-[14px] w-full whitespace-nowrap overflow-hidden text-ellipsis"
                                        key={item.id}
                                    >
                                        {item.name}
                                    </p>
                                </div>
                            ))
                            : ""
                    }


                </div>
            </div>



        </div>
    )
}
