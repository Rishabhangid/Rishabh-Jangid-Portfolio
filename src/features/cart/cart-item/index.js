import { MdDelete } from "react-icons/md";
import { decreaseQuantity, increaseQuantity, removeFromCart } from "../../../redux/slices/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { MdCancel } from "react-icons/md";
import { removeProductFromCartApi, setVarientPrice } from "../../../api/services/productDetailPageService";




export const CardItem = ({ product_id, image, name, price, quantity, total, setCartItem }) => {

    const dispatch = useDispatch()
    const cartItems = useSelector((state) => state.cart.cartItems);
    // console.log(cartItems, "---------------cartItems---------------");


    console.log(name, "---------------product_id from innnnn---------------");

    const userToken = localStorage.getItem("userToken") || "";
    if (!userToken) {
        console.log("No user token found!");
    }

    const handleRemoveFromCart = async (product_id) => {
        console.log(product_id, "---------------product_id---------------");

        // delete from api
        try {
            const remove_product = await removeProductFromCartApi(userToken, product_id);
            console.log(remove_product, "---------------remove_product---------------");

            const removedProduct = remove_product?.data;
            console.log(removedProduct, "---------------removedProduct User---------------");
            setCartItem(removedProduct);

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



    const handleIncrease = async (productId) => {

        // updating in redux
        dispatch(increaseQuantity(productId));

        const fetch_varient = cartItems.find(item => item.id === productId);
        console.log(fetch_varient, "---------------Selected Cart Item from redux---------------");

        try {
            const formData = {
                key: product_id,
                quantity: quantity
            }
            console.log(formData, "---------------formData from varient  888888888888888---------------");

            const product_varient = await setVarientPrice(userToken, product_id, quantity);
            console.log(product_varient, "---------------product_varient---------------");

            const varient = product_varient?.data;
            console.log(varient, "---------------varient User---------------");
            setCartItem(varient);
        } catch (error) {
            console.log(error, "---------------error---------------");
        }




    };

    const handleDecrease = async (productId) => {

        dispatch(decreaseQuantity(productId));

        const fetch_varient = cartItems.find(item => item.id === productId);
        console.log(fetch_varient, "---------------Selected Cart Item from redux---------------");

        try {
            const formData = {
                key: product_id,
                quantity: quantity
            }

            console.log(formData, "---------------formData from varient  888888888888888---------------");

            const product_varient = await setVarientPrice(userToken, product_id, quantity);
            console.log(product_varient, "---------------product_varient---------------");

            const varient = product_varient?.data;
            console.log(varient, "---------------varient User---------------");
            setCartItem(varient);
        } catch (error) {
            console.log(error, "---------------error---------------");
        }
    };

    const setProductVarient = async () => {
        try {
            const formData = {
                token: userToken,
                id: product_id,
                quantity: quantity
            }
            const product_varient = await setVarientPrice(formData, userToken);
            console.log(product_varient, "---------------product_varient---------------");

            const varient = product_varient?.data;
            console.log(varient, "---------------varient User---------------");
            setCartItem(varient);
        } catch (error) {
            console.log(error, "---------------error---------------");
        }
    };



    return (
        // <div className="grid grid-cols-[70%_30%] border-l-4 border-primary pl-2 justify-between shadow-xl items-start text-mainheading font-subheading mt-4 mb-2">

        //     <div className="relative text-center flex items-start gap-6">


        //         <MdCancel
        //             size={30}
        //             className="text-white cursor-pointer absolute top-2 left-2"
        //             onClick={() => handleRemoveFromCart(product_id)} // Handle delete action
        //         />
        //         <img src={`https://mukeshgems.idea2reality.tech/storage/app/public/product/thumbnail/${image}`} alt={name} className="w-[150px] h-[150px] shadow-md" />
        //         <div className="flex flex-col items-start ">
        //             {/* {name?.split(" ")?.length > 4
        //                 ? name.split(" ").slice(0, 4).join(" ") + "..."
        //                 : name} */}
        //             <span className="text-xl font-medium text-start">
        //                 {name?.split(" ")?.length > 4
        //                     ? name.split(" ").slice(0, 8).join(" ").toUpperCase() + "..."
        //                     : name.toUpperCase()}
        //             </span>


        //             <p className="font-bold text-mainbutton text-xl">₹{price}/-</p>
        //             <div className="text-center w-fit text-xl text-mainbutton  py-3 rounded-md flex gap-3 justify-center items-center">
        //                 <p className="bg-mainbutton text-white px-2 py-1" onClick={() => handleIncrease(product_id)}>+</p>
        //                 <span className="bg-white px-2 py-1 shadow-lg"> {quantity}</span>
        //                 <p className="bg-mainbutton text-white px-2 py-1" onClick={() => handleDecrease(product_id)}>-</p>
        //             </div>
        //         </div>
        //     </div>
        //     {/* 
        //     <div className="text-center">
        //         <p>{price}/-</p>
        //     </div>

        //     <div className="text-center w-fit m-auto bg-primary text-white px-5 py-3 rounded-md flex gap-3 justify-center items-center">
        //         <p onClick={() => handleIncrease(product_id)}>+</p>
        //         {quantity}
        //         <p onClick={() => handleDecrease(product_id)}>-</p>
        //     </div> */}

        //     <div className="text-center text-xl text-mainbutton font-bold">₹{total}/-</div>

        //     {/* <div className="text-center m-auto">
        //         <MdDelete
        //             size={25}
        //             className="text-red-700 cursor-pointer"
        //             onClick={() => handleRemoveFromCart(product_id)} // Handle delete action
        //         />
        //     </div> */}

        // </div>

        <div className="grid grid-cols-1 md:grid-cols-[70%_30%] border-b-4 md:border-l-4 border-primary bg-[#E3F3E5] dark:bg-[#0D1F1A] pl-2 shadow-xl items-start text-mainheading font-subheading mt-4 mb-2">
            <div className="relative flex flex-col sm:flex-row items-center gap-4 p-2">
                {/* Delete Icon */}
                <MdCancel
                    size={24}
                    className="text-mainbutton cursor-pointer absolute top-2 left-2 sm:top-4 sm:left-4"
                    onClick={() => handleRemoveFromCart(product_id)}
                />

                {/* Product Image */}
                <img src={`https://mukeshgems.idea2reality.tech/storage/app/public/product/thumbnail/${image}`} alt={name} className="w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] shadow-md" />
                {/* <img src={`https://mukeshgems.idea2reality.tech/storage/app/public/product/thumbnail/${image}`} alt={name} className="w-full md:w-[100px] object-cover h-[100px] sm:w-[150px] sm:h-[150px] shadow-md" /> */}

                {/* Product Details */}
                <div className="flex flex-col items-center sm:items-start">
                    <span className="text-[14px] md:text-lg dark:text-white font-medium text-center sm:text-start">
                        {name?.split(" ")?.length > 4 ? name.split(" ").slice(0, 8).join(" ").toUpperCase() + "..." : name.toUpperCase()}
                    </span>
                    <p className="font-bold text-mainbutton text-lg md:text-xl">₹{price}/-</p>

                    {/* Quantity Control */}
                    <div className="flex items-center gap-2 text-xl text-mainbutton">
                        <button className="bg-mainbutton text-white px-2 py-1" onClick={() => handleIncrease(product_id)}>+</button>
                        <span className="bg-white px-2 py-1 shadow-lg">{quantity}</span>
                        <button className="bg-mainbutton text-white px-2 py-1" onClick={() => handleDecrease(product_id)}>-</button>
                    </div>
                </div>
            </div>

            {/* Total Price */}
            <div className="text-center text-lg sm:text-xl text-mainbutton font-bold hidden md:block">₹{total}/-</div>
            <div className="text-center text-lg sm:text-xl text-mainbutton font-bold block md:hidden">Total: ₹{total}/-</div>
        </div>

    );
};
