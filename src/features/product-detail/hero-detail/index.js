import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// slider
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './style.css';

// react icons
import { FaRegHeart } from "react-icons/fa6";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { MdDeliveryDining } from "react-icons/md";
import { SiFsecure } from "react-icons/si";
import { LuCopyCheck } from "react-icons/lu";
import { LuCopy } from "react-icons/lu";
import { FcLike } from "react-icons/fc";
import { RiWhatsappFill } from "react-icons/ri";
import { FaPhoneVolume } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";



import IMG from "../../../assets/images/logo/CoverImageOne.png"



// import ImageMagnify from "react-image-magnify";

// alert box
import Swal from "sweetalert2";

// social media share icons
import { WhatsappShareButton, LinkedinShareButton, WhatsappIcon, LinkedinIcon, EmailShareButton, EmailIcon, } from "react-share";

// importing components
import { Rating } from '../rating';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../redux/slices/cart/cartSlice';
import { addProductToWishlistService, addToCartService, fetchUserWishlistApi, productAddToCartApi, removeFromWishlistService } from '../../../api/services/productDetailPageService';



export const HeroDetail = ({ detail, total }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cartItems = useSelector((state) => state.cart.cartItems);


    const [copied, setCopied] = useState(false);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [disableButton, setDisableButton] = useState(false)

    useEffect(() => {
        const handleResize = () => setIsSmallScreen(window.innerWidth < 768);
        handleResize(); // Set initial state
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const fetchUserWishlist = async () => {


        try {

            const uset_wishlist = await fetchUserWishlistApi(userToken)
            const UserAllWishlist = uset_wishlist?.data;



            const is_Wishlisted = UserAllWishlist.some((item) => item.product_id === detail.id);


            setIsWishlisted(is_Wishlisted);

        }
        catch (error) {
            console.log(error, "---------------error---------------");

            // Extract validation errors
            const errors = error?.errors || [{ message: "Something went wrong" }];

            // Join all error messages into a single string
            const errorMessage = errors.map(err => err.message).join("\n");

            // Swal.fire({
            //     title: "Error",
            //     text: errorMessage, // Show all errors in alert
            //     icon: "error"
            // });
        }
        finally {
            // setButtonLoading(false)
        }
    }

    const shareUrl = "https://www.npmjs.com/package/react-share";
    const title = "Check out this amazing website!";

    const userToken = localStorage.getItem("userToken") || "";
    if (!userToken) {
        console.log("No user token found!", userToken);
    }

    //  copy link functionality 
    const copyToClipboard = () => {
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    };


    const handleAddToCart = async () => {
        setDisableButton(true)
        // alert(userToken)
        // if (userToken.length < 0) {
        if (!userToken) {
            alert("User Token not found")
            setDisableButton(false)
            return
        }

        if (detail.current_stock <= 0) {
            alert("Out of stock");
            return;
        }

        const product = {
            id: detail.id,
            name: detail.name,
            thumbnail: detail.thumbnail,
            unit_price: detail.unit_price,
            quantity: 1,
            stock: detail.current_stock,
            discount: detail.discount,
            // seller_id: detail.seller?.id,  // Store only seller ID, not full object
            tax: detail.tax,
            slug: detail.slug
        };

        try {
            const formData = {
                token: userToken,
                id: product.id,
                quantity: product.quantity
            }
            const add_to_cart = await productAddToCartApi(formData, userToken)
            const addToCart = add_to_cart?.data;
            console.log(addToCart.token, "---------------addToCart Token---------------");
            console.log(addToCart.temporary_token, "---------------addToCart Temp TOk---------------");

            if (addToCart?.success) {
                setDisableButton(false)
                Swal.fire({
                    title: "Success",
                    text: "Login successful",
                    timer: 1000,
                    timerProgressBar: true,
                    icon: "success",
                    showConfirmButton: false,
                    confirmButtonColor: "#014308",
                });


            }

            const fetch_varient = cartItems.find(item => item.id === product.id);
            if (fetch_varient) {
                setDisableButton(false)
                Swal.fire({
                    title: "Success",
                    text: "Already In Cart",
                    timer: 1000,
                    timerProgressBar: true,
                    icon: "success",
                    showConfirmButton: false,
                    confirmButtonColor: "#014308",
                });
                return
            }
            console.log(fetch_varient, "---------------Selected Cart Item from redux---------------");

            dispatch(addToCart(product));
        }
        catch (error) {
            setDisableButton(false)
            console.log(error, "---------------error---------------");
            Swal.fire({
                title: "Error",
                text: error, // Show all errors in alert
                icon: "error"
            });

        }
        Swal.fire({
            title: "Success",
            text: "Added to cart!",
            timer: 1000,
            timerProgressBar: true,
            icon: "success",
            showConfirmButton: false,
            confirmButtonColor: "#014308",
        });
        setDisableButton(false)

        console.log(addToCart, "---------------addToCart---------------");

    }

    const handleAddToCartss = async () => {
        setDisableButton(true);

        if (detail.current_stock <= 0) {
            alert("Out of stock");
            setDisableButton(false);
            return;
        }

        const product = {
            id: detail.id,
            name: detail.name,
            thumbnail: detail.thumbnail,
            unit_price: detail.unit_price,
            quantity: 1,
            stock: detail.current_stock,
            discount: detail.discount,
            tax: detail.tax,
            slug: detail.slug
        };

        // 🔐 If user is logged in
        if (userToken) {
            try {
                const formData = {
                    token: userToken,
                    id: product.id,
                    quantity: product.quantity
                };
                const response = await productAddToCartApi(formData, userToken);
                const addToCart = response?.data;

                if (addToCart?.success) {
                    Swal.fire({
                        title: "Success",
                        text: "Added to cart!",
                        timer: 1000,
                        timerProgressBar: true,
                        icon: "success",
                        showConfirmButton: false,
                        confirmButtonColor: "#014308",
                    });
                }

            } catch (error) {
                console.log(error, "Error while adding to cart (logged-in)");
                Swal.fire({
                    title: "Error",
                    text: "Something went wrong",
                    icon: "error"
                });
            }

        } else {
            // 👤 Guest user
            try {

                const product = {
                    id: detail.id,
                    name: detail.name,
                    thumbnail: detail.thumbnail,
                    unit_price: detail.unit_price,
                    quantity: 1
                    // stock: detail.current_stock,
                    // discount: detail.discount,
                    // tax: detail.tax,
                    // slug: detail.slug
                };
                // Retrieve existing cart or create new one
                const existingCart = JSON.parse(localStorage.getItem("guest_cart")) || [];

                const existingItem = existingCart.find(item => item.id === product.id);

                if (existingItem) {
                    Swal.fire({
                        title: "Info",
                        text: "Already in cart",
                        timer: 1000,
                        timerProgressBar: true,
                        icon: "info",
                        showConfirmButton: false
                    });
                    setDisableButton(false);
                    return;
                }

                // Add new item
                const updatedCart = [...existingCart, product];
                localStorage.setItem("guest_cart", JSON.stringify(updatedCart));

                Swal.fire({
                    title: "Success",
                    text: "Added to cart!",
                    timer: 1000,
                    timerProgressBar: true,
                    icon: "success",
                    showConfirmButton: false
                });

            } catch (error) {
                console.log(error, "Error while adding to guest cart");
                Swal.fire({
                    title: "Error",
                    text: "Something went wrong",
                    icon: "error"
                });
            }
        }

        setDisableButton(false);
    };


    // add to wishlist function
    const handleAddToWishlist = async (id) => {
        console.log(id, "---------------id llllllllllll---------------");
        console.log(userToken, "---------------userToken &&*&*&*&*&*&&*&---------------");

        if (!userToken) {
            Swal.fire({
                title: "Error",
                text: "Login First",
                timer: 2000,
                timerProgressBar: true,
                icon: "error",
                showConfirmButton: false,
                confirmButtonColor: "#014308",
            });
            return
        }
        else {
            try {
                const formData = {
                    product_id: id
                }
                const add_to_wishlist = await addProductToWishlistService(formData, userToken)
                const addToWishlist = add_to_wishlist?.data;
                console.log(addToWishlist.token, "---------------addToWishlist Token---------------");
                console.log(addToWishlist.temporary_token, "---------------addToWishlist Temp TOk---------------");
                // if (addToWishlist?.success) {

                if (add_to_wishlist?.status === 409) {
                    Swal.fire({
                        title: "Error",
                        text: "Login First",
                        timer: 1000,
                        timerProgressBar: true,
                        icon: "success",
                        showConfirmButton: false,
                        confirmButtonColor: "#014308",
                    });

                }


                if (add_to_wishlist?.status === 200) {
                    fetchUserWishlist()
                    Swal.fire({
                        title: "Success",
                        text: "Added to Wishlist",
                        timer: 1000,
                        timerProgressBar: true,
                        icon: "success",
                        showConfirmButton: false,
                        confirmButtonColor: "#014308",
                    });
                }


            }
            catch (error) {
                console.log(error, "---------------error---------------");

                // Extract validation errors
                const errors = error?.errors || [{ message: "Something went wrong" }];

                // Join all error messages into a single string
                const errorMessage = errors.map(err => err.message).join("\n");

                Swal.fire({
                    title: "Error",
                    text: errorMessage, // Show all errors in alert
                    icon: "error"
                });
            }
            finally {
                // setButtonLoading(false)
            }
        }





    }

    // remove from wishlist
    const handleRemoveFromWishlist = async (id) => {
        try {
            const formData = {
                product_id: id
            }
            const remove_from_wishlist = await removeFromWishlistService(formData, userToken)
            console.log(remove_from_wishlist, "---------------remove_from_wishlist---------------");
            const removeWishedProducts = remove_from_wishlist?.data;
            console.log(removeWishedProducts, "---------------removeWishedProducts Token---------------");

            if (remove_from_wishlist?.status === 200) {
                Swal.fire({
                    title: "Success",
                    text: "Removed to Wishlist",
                    timer: 1000,
                    timerProgressBar: true,
                    icon: "success",
                    showConfirmButton: false,
                    confirmButtonColor: "#014308",
                });
                fetchUserWishlist()

            }


        }
        catch (error) {
            console.log(error, "---------------error---------------");

            // Extract validation errors
            const errors = error?.errors || [{ message: "Something went wrong" }];

            // Join all error messages into a single string
            const errorMessage = errors.map(err => err.message).join("\n");

            Swal.fire({
                title: "Error",
                text: errorMessage, // Show all errors in alert
                icon: "error"
            });
        }
        finally {
            // setButtonLoading(false)
        }




    }


    useEffect(() => {
        const handleResize = () => setIsSmallScreen(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        fetchUserWishlist();
    }, []);



    return (
        <div className='max-w-[1400px] m-auto  grid grid-cols-1 md:grid-cols-2 p-6 '>

            {/* images */}
            <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-4 p-3">
                {/* Main Image Swiper */}
                <Swiper
                    style={{
                        "--swiper-navigation-color": "#fff",
                        "--swiper-pagination-color": "#fff",
                    }}
                    spaceBetween={10}
                    navigation={true}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper2 w-full max-w-[400px] md:max-w-[450px] h-[350px] sm:h-[400px] md:h-[450px] order-1 md:order-2 shadow-2xl"
                >
                    {detail.images.map((item, index) => (
                        <SwiperSlide key={index} className="flex items-center justify-center h-full">
                            <div className="w-full h-full overflow-hidden group">
                                <img
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 shadow-2xl rounded-lg"
                                    src={`https://mukeshgems.idea2reality.tech/storage/app/public/product/${item}`}
                                    alt={`image-${index}`}
                                    loading='lazy'
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>


                {/* Thumbnail Swiper */}
                <Swiper
                    direction={isSmallScreen ? "horizontal" : "vertical"}
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10}
                    slidesPerView={isSmallScreen ? 3 : 4} // Adjusts slides based on screen size
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className={`mySwiper order-2 md:order-1 w-full ${isSmallScreen ? "max-w-full" : "max-w-[100px]"} h-[80px] sm:h-[100px] md:h-[450px]`}
                >
                    {detail.images.map((item, index) => (
                        <SwiperSlide key={index}>
                            <img
                                className="w-[70px] sm:w-[80px] md:w-full h-[70px] sm:h-[80px] md:h-full object-cover cursor-pointer shadow-xl rounded-lg"
                                src={`https://mukeshgems.idea2reality.tech/storage/app/public/product/${item}`}
                                alt={`thumb-${index}`}
                                loading='lazy'
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>


            {/* detail */}
            <div className=' flex gap-4 md:gap-4 flex-col px-6'>

                {/* name */}
                <h1 className='text-[#3C3C3C] text-2xl md:text-3xl dark:text-[#B0B0B0]'>{detail.name}</h1>

                {/* price and add to wishlist */}
                <div className='flex justify-between items-center'>
                    <p className='text-primary text-xl md:text-2xl font-subheading font-semibold dark:text-mainbutton'>₹{detail.purchase_price} <span className='text-mainbutton dark:text-white font-normal  line-through text-[16px]'> ₹{detail.unit_price}</span></p>
                    <div className='flex justify-center items-center gap-2 font-subheading text-mainheading hover:cursor-pointer'>
                        {
                            isWishlisted === true ? (
                                <FcLike className='hover:cursor-pointer text-[25px] hover:text-[30px] transition-all duration-100' onClick={() => handleRemoveFromWishlist(detail.id)} />

                            ) : (
                                <div onClick={() => handleAddToWishlist(detail.id)} className='flex justify-center items-center gap-1'>
                                    <FaRegHeart />
                                    <p className='hidden md:block'>Add to wishlist</p>
                                </div>
                            )
                        }

                    </div>
                </div>

                {/* detail */}
                <p dangerouslySetInnerHTML={{ __html: detail.details }} className='font-light text-[#868686] text-justify text-[15px] md:text-[16px]'></p>
                <p className='text-justify font-light text-[#868686]'>Step into a realm of unparalleled off-duty style with these grey acid wash joggers that effortlessly marry fashion with comfort. Crafted for those committed to style even on their days off, these joggers feature a chic drawstring waist and a wide leg cut.</p>
                <p className=' font-light text-[#868686] flex gap-6'> <span>Total Orders: {total.wishlist_count}</span> <span>Total Wishlist: {total.order_count}</span></p>


                {/* rating */}
                <Rating />

                {/* button */}
                <div className='flex flex-col md:flex-row justify-center md:justify-start items-center gap-3 md:items-end '>
                    <button
                        onClick={handleAddToCart}
                        className={`w-full font-subheading flex justify-center items-center gap-3 p-4 md:p-4 text-white text-[12px] md:text-[16px] mt-3 
    ${disableButton ? 'bg-gray-400 cursor-not-allowed' : 'bg-pinkmain hover:bg-[#5f2445]'}`}
                        disabled={disableButton}
                    >
                        <AiOutlineShoppingCart size={25} />
                        <p className='text-[18px]'>Add to Cart</p>
                        <p className='text-[18px]'>{disableButton}</p>
                    </button>

                    <div className=' flex gap-3 justify-center  items-center '>

                        <LinkedinShareButton url={shareUrl}>
                            <LinkedinIcon size={35} round />
                        </LinkedinShareButton>


                        <WhatsappShareButton url={shareUrl} title={title} separator=":: ">
                            <WhatsappIcon size={35} round />
                        </WhatsappShareButton>



                        {/* Mail Share */}
                        <EmailShareButton url={shareUrl} subject={title} body="Check this out!">
                            <EmailIcon size={35} round />
                        </EmailShareButton>

                        {/* Copy to Clipboard Button */}
                        <button
                            onClick={copyToClipboard}
                            className="w-[42px] h-[42px] flex justify-center items-center bg-blue-500 rounded-full text-white"
                        >
                            {copied ? <LuCopyCheck /> : <LuCopy />
                            }
                        </button>
                    </div>
                </div>

                <hr />

                {/* contact detail seller */}
                <div className='flex flex-col gap-2'>
                    {/* problem */}
                    <div className='flex flex-col '>
                        <p className='text-mainheading font-semibold'>Any Questions ? Please contact us at</p>
                        <div className='flex flex-col md:flex-row items-start justify-start gap-0 md:gap-6 mt-2'>
                            <div className='flex items-center gap-1 text-gray-700 dark:text-gray-400 font-medium self-start md:self-end '>
                                <FaPhoneVolume className='text-pinkmain' />
                                <p>+91 7073109971</p>
                            </div>
                            <div className='flex items-center gap-1 text-gray-700  dark:text-gray-400 font-medium self-start md:self-end '>
                                <RiWhatsappFill className='text-pinkmain' />
                                <p>+91 694594934933</p>
                            </div>
                            <div className='flex items-center gap-1 text-gray-700  dark:text-gray-400 font-medium self-start md:self-end'>
                                <IoMail className='text-pinkmain' />
                                <p>email@gmail.com</p>
                            </div>
                        </div>
                    </div>

                    {/* seller detail */}
                    <div className=''>
                        <p className='font-semibold text-mainheading'>Seller  Detail</p>
                        <div className='flex gap-3 mt-2'>
                            <img src={IMG} className='w-10 h-10 rounded-full' alt={detail.seller.shop.image} />
                            <div className=''>
                                <p className='text-pinkmain font-semibold'>{detail.seller.shop.name}</p>
                                <div className='flex flex-col md:flex-row gap-2 items-start md:items-center'>
                                    <div className='flex gap-2 items-center'>
                                        <FaLocationDot className='text-pinkmain' />

                                        <p className='text-mainheading'>{detail.seller.shop.address}</p>
                                    </div>
                                    <div className='flex gap-2 items-center'>
                                        <FaPhoneVolume className='text-pinkmain' />
                                        <p className='text-mainheading'>{detail.seller.shop.contact}</p>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>

                <hr />

                {/* return policy */}
                <div className='flex gap-2 flex-col md:flex-row justify-start text-mainheading font-subheading'>
                    <p className='flex text-center flex-col   bg-[#f0ecec] text-[14px]  justify-center items-center gap-2 p-2 rounded-lg'> <AiFillSafetyCertificate /> <span>Safe Payment</span> </p>
                    <p className='flex text-center flex-col bg-[#f0ecec] text-[14px] justify-center items-center gap-2 p-2 rounded-lg'> <MdDeliveryDining /> <span>7 Days Return Policy</span></p>
                    <p className='flex text-center flex-col bg-[#f0ecec] text-[14px] justify-center items-center gap-2 p-2 rounded-lg'> <SiFsecure /> <span>100% Authentic Products</span></p>
                </div>





            </div>

        </div>
    )
}
