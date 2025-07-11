import React, { useEffect, useState } from 'react'
import { MainHeading, PrimaryButton, SubHeading } from '../../shared'
import { CardItem } from '../../features/cart'
import { useDispatch, useSelector } from 'react-redux';
import DELIVERY from "../../assets/images/logo/delivery.png";
import MONEY from "../../assets/images/logo/money.png";
import GENUIE from "../../assets/images/logo/Genuine.png";
import AUTHENTICATE from "../../assets/images/logo/Payment.png";
import AA from "../../assets/images/banners/catagory-3.png";
import { fetchDeliveryTypeService } from '../../api/services/paymentService';
import { useNavigate } from 'react-router-dom';
import { clearCompleteCartApi, fetchUserCartService, removeProductFromCartApi, setVarientPrice } from '../../api/services/productDetailPageService';
import Swal from "sweetalert2";
import { decreaseQuantity, increaseQuantity, removeFromCart } from '../../redux/slices/cart/cartSlice';
import { MdCancel } from "react-icons/md";
import EMPTYCART from "../../assets/images/empty-cart.png"
import { motion } from "framer-motion";
import { MdDelete } from "react-icons/md";
import { calculateSummary, clearSummary } from '../../redux/slices/cartSummary/cartSummarySlice';
import { disableLoading, enableLoading } from '../../redux/slices/loading/loadingSlice';
import { calculateTotalItem } from '../../redux/slices/cartSummary/cartSummarySlice';







export const CartPage = () => {
    // const dispatch = useDispatch()
    const isLoadingg = useSelector((state) => state.loading.isLoading);
    console.log(isLoadingg, "11")

    useEffect(() => {
        window.scrollTo(0, 0); // Scrolls to the top of the page
    }, []);

    const { subtotal, gst, shipping, discount, total } = useSelector((state) => state.cartSummary);
    console.log(subtotal, gst, shipping, discount, total, "---------------subtotal, gst, shipping, discount, total from redux---------------");
    // from cart compo
    const dispatch = useDispatch()


    const [deliveryType, setDeliveryType] = useState([])
    const [cartItem, setCartItem] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const cartItems = useSelector((state) => state.cart.cartItems);
    const totalPrice = useSelector((state) => state.cart.cartTotal);
    const totalGst = useSelector((state) => state.cart.totalGst);
    const subTotal = useSelector((state) => state.cart.subTotal);
    console.log(cartItem[0], "---------------cartItems ********************---------------");


    const [selectedOption, setSelectedOption] = useState("");
    const [cartTotal, setCartTotal] = useState({ Subtotal: "", GST: "", Shipping: "", Discount: "", Total: "" })
    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const userToken = localStorage.getItem("userToken") || "";
    if (!userToken) {
        console.log("No user token found!");
    }

    const fetchUserCarts = async () => {
        try {
            setIsLoading(true)
            const fetch_user_cart = await fetchUserCartService(userToken);
            console.log(fetch_user_cart, "---------------fetch_user_cart---------------");

            const fetchCart = fetch_user_cart?.data;
            console.log(fetchCart, "---------------fetchCart User from innnnn---------------");
            setCartItem(fetchCart);
            dispatch(calculateSummary(fetchCart));

            let Sub_total = 0
            let GST = 0
            let shipping = 0
            let Discount = 0
            let Total = 0
            for (const item of fetchCart) {
                Sub_total += item.price * item.quantity
                GST += item.tax
                Discount += item.discount
                shipping += item.shipping_cost
                Total += Sub_total + GST + shipping
                // console.log(Sub_total, GST, Discount, shipping, "---------------item.shipping_cost---------------");
                // console.log(Total, "---------------TOTAL---------------");
                setCartTotal({ ...cartTotal, Subtotal: Sub_total, Shipping: shipping, GST: GST, Discount: Discount, Total: Total })
            }

            setIsLoading(false)
        } catch (error) {
            console.log(error, "---------------error---------------");
        }
    };

    const fetchUserCart = async () => {

        if (!userToken) {
            // add in local storage
        }
        else {
            // add in user card pi 
        }
        try {
            setIsLoading(true)
            // dispatch(enableLoading())
            const fetch_user_cart = await fetchUserCartService(userToken);
            console.log(fetch_user_cart, "---------------fetch_user_cart---------------");

            const fetchCart = fetch_user_cart?.data;
            console.log(fetchCart.length, "---------------fetchCart User from innnnn---------------");
            dispatch(calculateTotalItem(fetchCart.length));
            setCartItem(fetchCart);
            dispatch(calculateSummary(fetchCart));
            // dispatch(disableLoading())

            let Sub_total = 0
            let GST = 0
            let shipping = 0
            let Discount = 0
            let Total = 0
            for (const item of fetchCart) {
                Sub_total += item.price * item.quantity
                GST += item.tax
                Discount += item.discount
                shipping += item.shipping_cost
                Total += Sub_total + GST + shipping
                // console.log(Sub_total, GST, Discount, shipping, "---------------item.shipping_cost---------------");
                // console.log(Total, "---------------TOTAL---------------");
                setCartTotal({ ...cartTotal, Subtotal: Sub_total, Shipping: shipping, GST: GST, Discount: Discount, Total: Total })
            }

            

            setIsLoading(false)
        } catch (error) {
            console.log(error, "---------------error---------------");
        }
    };

    // fetching payment type and user cart
    useEffect(() => {
        // Fetch product details
        const fetchDeliveryType = async () => {
            try {
                const fetch_delivery_type = await fetchDeliveryTypeService();
                console.log(fetch_delivery_type, "---------------fetch_delivery_type---------------");

                const deliveryType = fetch_delivery_type?.data;
                console.log(deliveryType, "---------------deliveryType---------------");
                setDeliveryType(deliveryType);
            } catch (error) {
                console.log(error, "---------------error---------------");
            }
        };



        // Ensure id is available before making API call
        fetchDeliveryType();
        fetchUserCart();

    }, []);






    const handleRemoveFromCart = async (product_id) => {
        console.log(product_id, "---------------product_id---------------");

        // delete from api
        try {
            const remove_product = await removeProductFromCartApi(userToken, product_id);
            console.log(remove_product, "---------------remove_product---------------");

            const removedProduct = remove_product?.data;
            console.log(removedProduct, "---------------removedProduct User---------------");
            fetchUserCart();
            // setCartItem(removedProduct);

            // redux
            dispatch(removeFromCart(product_id));
            Swal.fire({
                title: "Success",
                text: "Product Deleted",
                timer: 1000,
                timerProgressBar: true,
                icon: "success",
                showConfirmButton: false,
                confirmButtonColor: "#014308",
            });
        } catch (error) {
            console.log(error, "---------------error---------------");
        }


    };



    const handleIncrease = async (productId, quantity) => {
        console.log(productId, "---------------productId---------------");
        try {
            const formData = {
                key: productId,
                quantity: quantity + 1
            }
            console.log(formData, "---------------formData from varient  888888888888888---------------");

            const product_varient = await setVarientPrice(userToken, formData);
            console.log(product_varient, "---------------product_varient---------------");

            const varient = product_varient?.data;
            console.log(varient, "---------------varient User---------------");
            // setCartItem(varient);
            fetchUserCart()

            // updating in redux
            dispatch(increaseQuantity(productId));

            const fetch_varient = cartItems.find(item => item.id === productId);
            console.log(fetch_varient, "---------------Selected Cart Item from redux---------------");
        } catch (error) {
            console.log(error, "---------------error---------------");
        }




    };

    const handleDecrease = async (productId, quantity) => {
        // alert(quantity)

        if (quantity === 1) {
            alert("already minimum quantity")
            return
        }

        try {
            const formData = {
                key: productId,
                quantity: quantity - 1
            }

            console.log(formData, "---------------formData from varient  888888888888888---------------");

            const product_varient = await setVarientPrice(userToken, formData);
            console.log(product_varient, "---------------product_varient---------------");

            const varient = product_varient?.data;
            console.log(varient, "---------------varient User---------------");
            fetchUserCart()
            // setCartItem(varient);
            dispatch(decreaseQuantity(productId));

            const fetch_varient = cartItems.find(item => item.id === productId);
            console.log(fetch_varient, "---------------Selected Cart Item from redux---------------");
        } catch (error) {
            console.log(error, "---------------error---------------");
        }
    };

    const clearALLCart = async (id) => {
        try {
            console.log(id, "---------------id---------------");
            const clear_cart = await clearCompleteCartApi(userToken, id);
            console.log(clear_cart, "---------------clear_cart---------------");

            const varient = clear_cart?.data;
            console.log(varient, "---------------varient User---------------");
            if (clear_cart.status === 200) {
                Swal.fire({
                    title: "Success",
                    text: "Cart Cleared",
                    timer: 2000,
                    timerProgressBar: true,
                    icon: "success",
                    showConfirmButton: false,
                    confirmButtonColor: "#014308",
                });
                dispatch(clearSummary())
            }
            // setCartItem(varient);
            fetchUserCart()


        } catch (error) {
            console.log(error, "---------------error---------------");
        }
    };

    // checkout
    const redirectToCheackout = () => {
        console.log(cartItem.length, "---------------cartItem.length---------------");
        if (cartItem.length === 0) {
            Swal.fire({
                title: "Failure",
                text: "Empty Cart , Add Products",
                timer: 2000,
                timerProgressBar: true,
                icon: "error",
                showConfirmButton: false,
                confirmButtonColor: "#014308",
            });
        }
        else {
            navigate("/add-address")
        }
    }


    return (

        <motion.div className='bg-[#FFFFFF] dark:bg-[#121212]  md:pb-6'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}>
            <div className='max-w-[1300px] m-auto'>
                {/* <p>{subtotal}</p> */}



                {/* cart code **************** */}
                <div className="grid grid-cols-1 md:grid-cols-[65%_34%] gap-6 pt-10 px-4">


                    {/* Left Section - Cart Items */}
                    <div>

                        <div className='flex justify-between items-center border-b-2 dark:border-mainbutton pb-2 font-subheading'>
                            <h1 className='text-3xl text-mainheading dark:text-mainbutton font-bold'>Shopping Cart</h1>
                            <h1 className='dark:text-mainbutton'>{cartItem.length} items</h1>
                        </div>


                        {/* Items List */}
                        <div className="grid ">
                            {isLoading ? (
                                <div>
                                    <div className='justify-center items-center  flex'>
                                        <div class="relative flex w-full animate-pulse gap-2 p-4">
                                            <div class="h-28 w-28 rounded-lg bg-slate-400"></div>
                                            <div class="flex-1">
                                                <div class="mb-1 h-14 w-full rounded-lg bg-slate-400 text-lg"></div>
                                                <div class="h-14 w-[100%] rounded-lg bg-slate-400 text-sm"></div>
                                            </div>
                                            {/* <div class="absolute bottom-5 right-0 h-4 w-4 rounded-full bg-slate-400"></div> */}
                                        </div>
                                    </div>
                                    <div className='justify-center items-center  flex'>
                                        <div class="relative flex w-full animate-pulse gap-2 p-4">
                                            <div class="h-28 w-28 rounded-lg bg-slate-400"></div>
                                            <div class="flex-1">
                                                <div class="mb-1 h-14 w-full rounded-lg bg-slate-400 text-lg"></div>
                                                <div class="h-14 w-[100%] rounded-lg bg-slate-400 text-sm"></div>
                                            </div>
                                            {/* <div class="absolute bottom-5 right-0 h-4 w-4 rounded-full bg-slate-400"></div> */}
                                        </div>
                                    </div>

                                </div>
                            ) : cartItem.length === 0 ? (
                                <div className='flex justify-center flex-col gap-2 items-center p-6 text-xl'>
                                    <img src={EMPTYCART} alt='empty cart' className='w-16' />
                                    <p className='text-[14px]'>No products in cart</p>
                                    <button className='bg-mainbutton p-2 rounded-lg text-white' onClick={() => navigate("/")}>Shop Now</button>
                                </div>
                            ) : (
                                cartItem.map((item) => ( // Condition 1: Map and display items if data exists
                                    <div className="grid grid-cols-1 md:grid-cols-[5%_75%_20%] border-b-2    pb-2  dark:bg-[#121212] pl-2  items-start text-mainheading font-subheading mt-4 mb-2">

                                        {/* Cancle Button */}
                                        <MdCancel
                                            size={24}
                                            className="text-black dark:text-white cursor-pointer self-center"
                                            onClick={() => handleRemoveFromCart(item.id)}
                                        />

                                        <div className="relative flex flex-col sm:flex-row items-center gap-4 p-2">


                                            {/* Product Image */}
                                            <img src={`https://mukeshgems.idea2reality.tech/storage/app/public/product/thumbnail/${item.thumbnail}`} alt={item.name} className="w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] shadow-md" />
                                            {/* <img src={`https://mukeshgems.idea2reality.tech/storage/app/public/product/thumbnail/${image}`} alt={name} className="w-full md:w-[100px] object-cover h-[100px] sm:w-[150px] sm:h-[150px] shadow-md" /> */}

                                            {/* Product Details */}
                                            <div className="flex flex-col items-center sm:items-start">
                                                <span className="text-[14px] md:text-lg dark:text-white font-medium text-center sm:text-start">
                                                    {item.name?.split(" ")?.length > 4 ? item.name.split(" ").slice(0, 8).join(" ").toUpperCase() + "..." : item.name.toUpperCase()}
                                                </span>
                                                <p className="font-bold text-mainbutton text-lg md:text-xl">₹{item.price}/-</p>

                                                {/* Quantity Control */}
                                                <div className="flex items-center gap-2 text-xl text-mainbutton">
                                                    <button className="bg-mainbutton text-white px-2 py-1" onClick={() => handleIncrease(item.id, item.quantity)}>+</button>
                                                    <span className="bg-white px-2 py-1 shadow-lg">{item.quantity}</span>
                                                    <button className="bg-mainbutton text-white px-2 py-1" onClick={() => handleDecrease(item.id, item.quantity)}>-</button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Total Price */}
                                        <div className="text-center self-start pt-6 text-lg sm:text-xl text-mainbutton dark:text-white font-bold hidden md:block">₹{item.price * item.quantity}/-</div>
                                        <div className="text-center text-lg sm:text-xl text-mainbutton dark:text-white font-bold block md:hidden">Total: ₹{item.price * item.quantity}/-</div>



                                    </div>
                                ))
                            )}

                            <div className='flex justify-between  text-[14px] md:text-[16px]'>
                                <p className='text-mainheading dark:text-mainbutton font-subheading hover:cursor-pointer' onClick={() => navigate("/")}>←  Back to Shopping</p>
                                <p className='text-mainheading dark:text-mainbutton font-subheading hover:cursor-pointer flex justify-center items-center gap-1' onClick={() => clearALLCart(cartItem)}>
                                    <MdDelete />
                                    <span> Clear Cart</span>
                                </p>
                            </div>


                        </div>
                    </div>

                    {/* Right Section - Cart Summary */}
                    {/* <div className="flex flex-col justify-between px-4 py-2 h-fit font-subheading  bg-gray-50 dark:bg-[#242424]  rounded-xl"> */}
                    <div className="flex flex-col justify-between px-4 py-2 h-fit   bg-gray-50 dark:bg-gray-900 rounded-xl">

                        <h1 className='text-3xl text-mainheading dark:text-mainbutton font-bold border-b-2 dark:border-mainbutton pb-1'>Summary</h1>
                        {/* Shipping Method */}
                        <div className="flex flex-col gap-5 px-5 pt-3 justify-center rounded-sm text-mainheading ">

                            <select
                                id="delivery"
                                value={selectedOption}
                                onChange={handleChange}
                                className="select w-full bg-white dark:bg-gray-300"
                            >
                                <option value="" disabled>Choose Delivery Type</option>
                                {deliveryType.length > 0 ? (
                                    deliveryType.map((item) => (
                                        <option key={item.id} value={item.title} className='w-full'>
                                            {item.title} ({item.duration}) (₹{item.cost})
                                        </option>
                                    ))
                                ) : (
                                    <option value="" disabled>No Delivery Options Available</option>
                                )}
                            </select>


                        </div>

                        {/* Cart Total : subtotal, gst, shipping, discount, total */}
                        <div className="flex flex-col gap-5 p-5  rounded-sm mt-3 ">
                            {/* <h1 className="font-subheading  text-[16px] md:text-xl text-mainbutton">Cart Total</h1> */}
                            <div className="flex justify-between items-center">
                                <h1 className=" text-mainheading dark:text-white">SubTotal</h1>
                                {/* <h1 className=" text-mainbutton font-bold">₹ {cartTotal.Subtotal ? cartTotal.Subtotal : 0}/-</h1> */}
                                <h1 className=" text-mainbutton font-bold">₹ {subtotal}/-</h1>
                            </div>
                            {/* <div className="border-b-2 border-gray-400 flex justify-between items-center"> */}
                            <div className="flex justify-between items-center">
                                <h1 className=" text-mainheading dark:text-white">GST</h1>
                                {/* <h1 className=" text-mainbutton font-bold">₹ {cartTotal.GST ? cartTotal.GST : 0}/-</h1> */}
                                <h1 className=" text-mainbutton font-bold">₹ {gst}/-</h1>
                            </div>
                            <div className="flex justify-between items-center">
                                <h1 className=" text-mainheading dark:text-white">Shipping</h1>
                                {/* <h1 className=" text-mainbutton font-bold">₹ {cartTotal.Shipping ? cartTotal.Shipping : 0}/-</h1> */}
                                <h1 className=" text-mainbutton font-bold">₹ {shipping}/-</h1>
                            </div>
                            <div className="flex justify-between items-center">
                                <h1 className=" text-mainheading dark:text-white">Discount</h1>
                                {/* <h1 className=" text-mainbutton font-bold">₹ {cartTotal.Discount ? cartTotal.Discount : 0}/-</h1> */}
                                <h1 className=" text-mainbutton font-bold">₹ {discount}/-</h1>
                            </div>
                            <div className="grid grid-cols-[75%_22%] gap-3 items-center">
                                <input
                                    type="text"
                                    placeholder="Apply Coupon Code"
                                    className="text-mainheading bg-white dark:bg-gray-300  rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
                                />
                                <button className="bg-mainbutton p-2 rounded-md text-white">Apply</button>
                            </div>
                            <div className="flex justify-between items-center">
                                <h1 className="font-subheading text-mainheading dark:text-white">Total</h1>
                                {/* <h1 className="font-subheading text-mainbutton font-bold">₹ {cartTotal.Total ? cartTotal.Total : 0}/-</h1> */}
                                <h1 className="font-subheading text-mainbutton font-bold">₹ {total}/-</h1>
                            </div>
                            <PrimaryButton label="Checkout" onClick={redirectToCheackout} />
                        </div>
                    </div>
                </div>




                {/* ******************** */}








            </div>
        </motion.div>
    )
}
