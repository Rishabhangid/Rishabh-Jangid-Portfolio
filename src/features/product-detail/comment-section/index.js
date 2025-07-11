import React, { useState } from 'react'
import Swal from "sweetalert2";
import { addCommentApi } from '../../../api/services/productDetailPageService';
import USER from "../../../assets/images/user.png"
import { RatingComponent } from '../../common/components/rating-compo';

export const ProductCommentSection = ({ comment }) => {

    console.log(comment, "---------------comment from innnnnnnnnn---------------");


    const [isOpen, setIsOpen] = useState(false);


    const [formData, setFormData] = useState({
        rating: "",
        message: "",
        image: null,
    });

    const userToken = localStorage.getItem("userToken") || "";
    if (!userToken) {
        console.log("No user token found!");
    }

    // Handle Change Function
    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "file" ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
        if (!userToken) {
            Swal.fire({
                title: "Failure",
                text: "Login First",
                timer: 1000,
                timerProgressBar: true,
                icon: "success",
                showConfirmButton: false,
                confirmButtonColor: "#014308",
            });
            return;
        }
        try {
            const add_comment = await addCommentApi(formData, userToken)
            console.log(formData, "---------------formdat %%%%%%%%%%%%%%%%%%%%%%%%%%%%5---------------");
            console.log(userToken, "---------------userToken %%%%%%%%%%%%%%%%%%%%5---------------");
            const addComment = add_comment?.data;
            console.log(addComment, "---------------addComment Token---------------");
            // if (addComment?.success) {


            if (add_comment?.status === 200) {
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

    };








    return (
        // <div className='max-w-[1400px] m-auto  bg-[#FAF6F0] dark:bg-[#d7c1a1] rounded-lg shadow-lg'>
        // <div className='max-w-[1400px] m-auto  bg-[#f0ecec] dark:bg-[#d7c1a1] rounded-lg shadow-lg'>
        <div className='max-w-[1400px] m-auto border  border-pinkmain dark:bg-[#d7c1a1] rounded-lg shadow-lg'>

            <div className='mt-2 md:mt-4 mb-6 mx-4 flex justify-center md:mx-3 '>
                <h1 className=' p-4 pb-2 font-semibold text-center dark:border-mainbutton text-pinkmain dark:text-white w-fit'>CUSTOMER REVIEWS</h1>

            </div>

            {/* comment section */}
            <div className="px-4 md:px-8">


                {/* Review Section */}
                <div className="flex flex-col gap-4">
                    {/* Review Form */}


                    {/* Reviews */}
                    {
                        comment.length > 0 ?
                            comment.map((item, index) => (
                                // <div key={index} className="p-2 bg-[#ffffff] rounded-lg shadow-lg flex flex-col gap-2">
                                <div key={index} className="p-2 bg-pinkbox rounded-lg shadow-lg flex flex-col gap-2">

                                    <div className='flex flex-col items-center'>
                                        <p className="mt-2 text-lg text-center text-gray-700 pl-3 font-serif">
                                            "{item.comment}"
                                        </p>
                                        {/* <RatingComponent rating={item.rating} /> */}
                                    </div>

                                    <div className='flex gap-2 items-center justify-center'>
                                        <img src={USER} alt="customer image" className='w-8' />
                                        <div className='flex flex-col'>
                                            <p className="text-[16px] font-bold text-mainheading">{item.customer.f_name}</p>
                                            <RatingComponent rating={item.rating} />
                                        </div>
                                    </div>


                                </div>
                            ))
                            :
                            <p className='text-center dark:text-white'>No comment found</p>
                    }
                </div>

                {/* Rating Breakdown */}
                <div className="p-6 text-primary rounded-lg  max-w-md mx-auto w-full">


                    <button className='bg-mainbutton w-full p-2 rounded-lg text-white' onClick={() => setIsOpen(true)}>Add Review</button>
                    {/* Model */}
                    {isOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-4 z-50">
                            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[90%] md:max-w-[500px] relative transform scale-95 transition-transform duration-300">
                                <h2 className="text-lg md:text-xl font-bold">Add Review</h2>
                                <p className="text-gray-600 mb-6 text-sm md:text-base">
                                    Enter your review on product
                                </p>

                                <form onSubmit={handleSubmit}>
                                    <div className="grid gap-3 mt-3">
                                        <select
                                            id="delivery"
                                            name="rating"
                                            value={formData.rating}
                                            onChange={handleChange}
                                            className="text-mainheading bg-white border-2 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                                        >
                                            <option value="" disabled>Select Rating</option>
                                            <option value="0">0</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                    </div>

                                    <div className="mt-3">
                                        <textarea
                                            placeholder="Write your review"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="text-mainheading bg-white border-2 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                                        ></textarea>
                                    </div>

                                    <div className="flex flex-col md:flex-row justify-center gap-3">
                                        <input
                                            type="file"
                                            name="image"
                                            onChange={handleChange}
                                            className="text-mainheading bg-white border-2 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                                        />
                                    </div>

                                    <input
                                        type="submit"
                                        className="bg-mainbutton text-white w-full py-2 rounded-lg mt-3 cursor-pointer"
                                        value="Add Ticket"
                                    />
                                </form>

                                {/* Close Button */}
                                <button
                                    className="absolute top-2 right-2 text-gray-600 hover:text-black text-lg"
                                    onClick={() => setIsOpen(false)}
                                >
                                    ✖
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="text-center mb-0 md:mb-4 mt-4 flex flex-col items-center justify-center">
                        <h1 className="text-2xl font-bold flex items-center justify-center gap-2">
                            <span className="text-3xl text-mainheading">4.2</span>
                            <span className="text-yellow-400">⭐⭐⭐⭐</span>
                        </h1>
                        <p className="text-lg text-mainheading">{comment.length} Responses</p>
                    </div>

                    {/* Rating Breakdown */}
                    {/* <div className="space-y-2 hidden md:block">
                        {[5, 4, 3, 2, 1, 0].map((rating, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <p className="text-sm font-bold w-5">{rating}</p>
                                <p className="text-sm">
                                    ⭐ <span className="font-medium">{[15, 19, 4, 2, 0, 1][index]}</span>
                                </p>
                                <div className="w-full h-3  bg-gray-300 rounded-lg overflow-hidden">
                                    <div
                                        className="h-full bg-yellow-400 rounded-lg"
                                        style={{ width: `${([15, 19, 4, 2, 0, 1][index] / 23) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div> */}
                </div>




            </div>


        </div>
    )
}
