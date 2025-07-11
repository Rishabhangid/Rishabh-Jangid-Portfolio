import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { addUserTicketMessageApi, fetchSingleSupportTicketService } from '../../api/services/userProfileService';
import Swal from "sweetalert2";
import USER from "../../assets/images/user.png"


export const ViewTicketInfoPage = () => {

    const location = useLocation();
    const { ticketStatus, ticketType, ticketSubject } = location.state || {};
    const [inputeData, setInputData] = useState("")
    const [chat, setChat] = useState([])
    // alert(ticketStatus, ticketType, ticketSubject)
    console.log(ticketStatus, ticketType, ticketSubject, "---------------ticketStatus, ticketType, ticketSubject---------------");
    const userToken = localStorage.getItem("userToken") || "";
    if (!userToken) {
        console.log("No user token found!");
    }

    const { id } = useParams()


    const handleFetchSingleTicket = async (id) => {

        console.log(id, "---------------id of ticket---------------");
        try {

            const fetch_ticket = await fetchSingleSupportTicketService(id, userToken)
            const ticketFetched = fetch_ticket?.data;
            // alert(id)
            console.log(ticketFetched, "---------------ticketFetched ******* from innnnnn---------------");
            setChat(ticketFetched)
            if (ticketFetched?.status === 200) {
                Swal.fire({
                    title: "Success",
                    text: "Login successful",
                    timer: 1000,
                    timerProgressBar: true,
                    icon: "success",
                    showConfirmButton: false,
                    confirmButtonColor: "#014308",
                });
                // setIsOpen(false)
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
    }

    const handleSubmitMessage = async (e) => {
        const userToken = localStorage.getItem("userToken") || "";
        if (!userToken) {
            console.log("No user token found!");
        }
        // alert(userToken)

        e.preventDefault();
        if (!inputeData) {
            Swal.fire({
                title: "Failure",
                text: "Enter Message",
                timer: 3000,
                timerProgressBar: true,
                icon: "error",
                showConfirmButton: false,
                confirmButtonColor: "#014308",
            });
        }
        try {
            // subject, type, description, priority
            const formData = {
                id: 1,
                message: inputeData
            }
            console.log(userToken, "---------------userToken from ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^---------------");
            const add_user_message = await addUserTicketMessageApi(userToken, formData,)
            const ticketAdd = add_user_message?.data;
            handleFetchSingleTicket(id)
            // if (ticketAdd?.success) {
            if (ticketAdd?.status === 200) {
                Swal.fire({
                    title: "Success",
                    text: "Message sent succesfully",
                    timer: 1000,
                    timerProgressBar: true,
                    icon: "success",
                    showConfirmButton: false,
                    confirmButtonColor: "#014308",
                });

                setInputData("")

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


    }
    useEffect(() => {



        handleFetchSingleTicket(id)
        console.log(chat, "---------------chat---------------");
    }, []);

    return (
        <div className='max-w-[1200px] m-auto'>
            <div className=' mt-16 pt-10 mb-10'>

                {/* heading */}
                <h1 className="text-2xl font-semibold text-mainbutton border-b-2 border-mainbutton pb-3 mb-2">
                    Order Details
                </h1>

                {/* convocation detail chat */}
                <div className='grid  grid-cols-[30%_68%] gap-6 font-subheading text-mainheading'>
                    {/* <div className='bg-[#baa560] flex flex-col items-start justify-center p-6 h-fit rounded-lg'> */}
                    <div className=' flex flex-col gap-4 h-fit justify-start   rounded-lg'>
                        <div className='shadow-lg'>
                            <p className='bg-[#D3C7B8] text-white w-full p-2 md:text-xl'>Topic</p>
                            <p className='text-gray-700 p-2'>Issue in Order</p>
                        </div>
                        <div className='shadow-lg'>
                            <p className='bg-[#D3C7B8] text-white w-full p-2 md:text-xl'>Type</p>
                            <p className='text-gray-700 p-2'>Urgent</p>
                        </div>
                        <div className='shadow-lg'>
                            <p className='bg-[#D3C7B8] text-white w-full p-2 md:text-xl'>Status</p>
                            <p className='text-gray-700 p-2'>Pending</p>
                        </div>

                        <button className='bg-mainbutton p-2 rounded-lg text-white'>Close Ticket</button>
                    </div>

                    {/* chat box */}
                    <div className='bg-white relative flex flex-col gap-3 h-[70vh]  overflow-y-auto  rounded-lg p-4'>

                        {chat.length > 0 ? (
                            chat.map((message, index) => (
                                message.admin_id ? (
                                    <div key={index} className='rounded-lg flex w-[300px] gap-2 p-2 bg-[#D3C7B8] text-white'>
                                        <img src={USER} alt="admin" className='w-10 h-10' />
                                        <div>
                                            <div>
                                                <p className='font-semibold text-secondprimary'>Admin</p>
                                                <p className='text-gray-600 text-xs'>21 March  2024</p> {/* Replace with dynamic date */}
                                            </div>
                                            <p className='text-gray-800 max-w-[600px]'>{message.admin_message}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div key={index} className='flex w-[300px] gap-2 p-2 self-end border-2 border-[#D3C7B8] rounded-lg'>
                                        <img src={USER} alt="customer" className='w-10 h-10' />
                                        <div>
                                            <div>
                                                <p className='font-semibold text-secondprimary'>Rishabh Jagid</p> {/* Replace with dynamic name */}
                                                <p className='text-gray-600 text-xs'>21 March  2024</p> {/* Replace with dynamic date */}
                                            </div>
                                            <p className='text-gray-800 max-w-[600px]'>{message.customer_message}</p>
                                        </div>
                                    </div>
                                )
                            ))
                        ) : (
                            <p>No Conversation</p>
                        )}



                        <form className='p-4 sticky bottom-0 left-0 w-[100%] mt-2 bg-white' onSubmit={handleSubmitMessage}>
                            <div className='grid grid-cols-[79%_20%] gap-2 w-full absolute bottom-0 left-0'>
                                <input type='text' placeholder='Enter Message' className='bg-white border-2 p-2 border-secondprimary' onChange={(e) => setInputData(e.target.value)} />
                                <input type='submit' className='bg-secondprimary p-2 text-white' value="Send" />
                            </div>
                        </form>
                    </div>

                </div>

            </div>
        </div >
    )
}
