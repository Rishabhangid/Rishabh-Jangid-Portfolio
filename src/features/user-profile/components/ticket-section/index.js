import React, { useEffect, useState } from "react";
import { addUserTicketService, deleteUserTicketService, fetchSingleSupportTicketService, fetchUserSupportTicketService } from "../../../../api/services/userProfileService";
import { Link, useNavigate } from "react-router-dom";
import NOORDERGIF from "../../../../assets/images/ticket.png";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { motion } from "framer-motion";



export const TicketScreenSection = () => {


  const navigate = useNavigate()
  const [ticket, setTicket] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [inputdata, setInputdata] = useState({ subject: "", delivery_type: "", priority: "", message: "" })
  const [isLoading, setIsLoading] = useState(false)


  const [selectedOption, setSelectedOption] = useState("");
  // const handleChange = (event) => {
  //   setSelectedOption(event.target.value);
  // };

  const handleChange = (e) => {
    setInputdata((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const fetchUserSupportTicket = async () => {
    try {
      setIsLoading(true)
      // alert(isLoading)
      const fetch_ticket = await fetchUserSupportTicketService(userToken);
      console.log(fetch_ticket, "---------------fetch_ticket---------------");

      const all_ticket = fetch_ticket?.data;
      console.log(all_ticket, "---------------all_ticket---------------");

      setTicket(all_ticket || []);
      setIsLoading(false)
      // alert(isLoading)
    } catch (error) {
      console.log(error, "---------------error---------------");
    }
  };


  const userToken = localStorage.getItem("userToken") || "";
  if (!userToken) {
    console.log("No user token found!");
  }

  const handleAddTicket = async (e) => {
    e.preventDefault()
    console.log(inputdata, "---------------inputdata---------------");
    try {
      // subject, type, description, priority
      const formData = {
        subject: inputdata.subject,
        type: inputdata.delivery_type,
        description: inputdata.message,
        priority: inputdata.priority,
      }
      const add_ticket = await addUserTicketService(formData, userToken)
      const ticketAdd = add_ticket?.data;
      // if (ticketAdd?.success) {
      if (add_ticket?.status === 200) {
        Swal.fire({
          title: "Success",
          text: "Ticket added succesfully",
          timer: 1000,
          timerProgressBar: true,
          icon: "success",
          showConfirmButton: false,
          confirmButtonColor: "#014308",
        });
        setInputdata({ subject: "", delivery_type: "", priority: "", message: "" })
        fetchUserSupportTicket()
        setIsOpen(false)
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



  // delete ticket
  const handleDeleteTicket = async (id) => {

    try {
      const delete_ticket = await deleteUserTicketService(id, userToken)
      const deleteTicket = delete_ticket?.data;
      // if (deleteTicket?.success) {
      if (delete_ticket?.status === 200) {
        Swal.fire({
          title: "Success",
          text: "Ticket deleted",
          timer: 1000,
          timerProgressBar: true,
          icon: "success",
          showConfirmButton: false,
          confirmButtonColor: "#014308",
        });
        fetchUserSupportTicket()
        setIsOpen(false)
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

  // fetch single ticket info
  // delete ticket
  const handleFetchSingleTicket = async (id, subject, type, status) => {

    // navigate(`/ticket-detail/${id}`)
    navigate(`/ticket-detail/${id}`, { state: { ticketSubject: subject, ticketType: type, ticketStatus: status } });

    console.log(id, "---------------id of ticket---------------");

    // try {

    //   const fetch_ticket = await fetchSingleSupportTicketService(id, userToken)
    //   const ticketFetched = fetch_ticket?.data;
    //   console.log(ticketFetched, "---------------ticketFetched *******---------------");
    //   if (ticketFetched?.success) {
    //     Swal.fire({
    //       title: "Success",
    //       text: "Login successful",
    //       timer: 1000,
    //       timerProgressBar: true,
    //       icon: "success",
    //       showConfirmButton: false,
    //       confirmButtonColor: "#014308",
    //     });
    //     setIsOpen(false)
    //   }
    // }
    // catch (error) {
    //   console.log(error, "---------------error---------------");

    //   // Extract validation errors
    //   const errors = error?.errors || [{ message: "Something went wrong" }];

    //   // Join all error messages into a single string
    //   const errorMessage = errors.map(err => err.message).join("\n");

    //   Swal.fire({
    //     title: "Error",
    //     text: errorMessage, // Show all errors in alert
    //     icon: "error"
    //   });
    // }
  }

  useEffect(() => {


    fetchUserSupportTicket();
  }, [ticket]);

  return (

    <motion.div className="bg-white shadow-lg rounded-lg dark:bg-gradient-to-br from-[#1B1B1B] to-[#252525] mt-3 p-4  w-full max-w-screen-lg mx-auto"
      initial={{ y: -50, opacity: 0 }}  // Start position (above the screen)
      animate={{ y: 0, opacity: 1 }}    // End position (normal position)
      exit={{ y: -50, opacity: 0 }}     // Exit animation (moving back up)
      transition={{ type: "spring", stiffness: 120, damping: 14 }}  // Smooth spring effect
    >
      <div className='flex justify-between items-center border-b-2 dark:border-mainbutton pb-2  mb-4'>
        <h1 className='text-2xl text-mainheading dark:text-mainbutton font-bold'>Support Ticket</h1>
        <div className="flex justify-center items-center gap-2">
          <IoMdAddCircle className="text-mainheading text-[16px] md:text-[30px] dark:text-mainbutton" onClick={() => setIsOpen(true)} />
          {/* Modal */}
          {isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-4 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[90%] md:max-w-[800px] relative transform scale-95 transition-transform duration-300">
                <h2 className="text-lg md:text-xl font-bold">Add Ticket</h2>
                <p className="text-gray-600 mb-6 text-sm md:text-base">
                  Enter your ticket details here
                </p>

                <form onSubmit={handleAddTicket}>
                  <div className="flex flex-col md:flex-row justify-center gap-3">
                    <input
                      type="text"
                      placeholder="Subject"
                      name="subject"
                      value={inputdata.subject}
                      onChange={handleChange}
                      className="text-mainheading bg-white border-2 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                    <select
                      id="delivery"
                      name="delivery_type"
                      value={inputdata.delivery_type}
                      onChange={handleChange}
                      className="text-mainheading bg-white border-2 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="" disabled>
                        Choose Delivery Type
                      </option>
                      <option value="website_problem">Website Problem</option>
                      <option value="partner_request">Partner Request</option>
                      <option value="complain">Complain</option>
                      <option value="info_inquiry">Info Inquiry</option>
                    </select>

                    <select
                      id="priority"
                      name="priority"
                      value={inputdata.priority}
                      onChange={handleChange}
                      className="text-mainheading bg-white border-2 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="" disabled>
                        Priority
                      </option>
                      <option value="urgent">Urgent</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>

                  <div className="mt-3">
                    <textarea
                      placeholder="Describe your issue"
                      name="message"
                      value={inputdata.message}
                      onChange={handleChange}
                      className="text-mainheading bg-white border-2 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                    ></textarea>
                  </div>

                  <input
                    type="submit"
                    className="bg-primary text-white w-full py-2 rounded-lg mt-3 cursor-pointer"
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
          <form>
            <div className="relative flex items-center max-w-[190px]">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="absolute left-4 w-4 h-4 fill-[#000000] text-mainheading pointer-events-none"
              >
                <g>
                  <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
                </g>
              </svg>
              <input
                id="query"
                type="search"
                placeholder="Search"
                name="searchbar"
                className="w-full h-[45px] pl-10 text-mainheading bg-[#ffffff] rounded-xl border-0 outline-none shadow-[0_0_0_1.5px_#2b2c37,0_0_25px_-17px_#000] transition-all duration-300 ease-in-out cursor-text focus:shadow-[0_0_0_2.5px_#2f303d] hover:shadow-[0_0_0_2.5px_#2f303d,0px_0px_25px_-15px_#000] active:scale-95"
              />
            </div>
          </form>
        </div>
      </div>

      {ticket.length > 0 ? (
        <div className="w-full">
          {/* Ticket Heading */}
          <div className="hidden md:grid grid-cols-5 p-2 rounded-lg font-subheading bg-mainbutton text-white  border-b border-gray-300 dark:border-mainbutton pb-2 dark:text-white">
            <h1 className="text-center">TOPIC</h1>
            <h1 className="text-center">SUBMISSION DATE</h1>
            <h1 className="text-center">TYPE</h1>
            <h1 className="text-center">STATUS</h1>
            <h1 className="text-center">ACTION</h1>
          </div>

          <div className="text-mainheading font-semibold border-b pb-2 block md:hidden">
            <h1>Support Ticket</h1>
          </div>

          {/* Ticket Info */}
          {ticket.map((item) => (
            <div
              key={item.id}
              className="border-b border-gray-200  font-subheading hover:bg-gray-100 dark:hover:bg-[#252525] transition p-3 md:grid md:grid-cols-5 md:py-3 md:items-center"
            >
              {/* Mobile View (Stacked Layout) */}
              <div className="md:hidden flex justify-between">
                <div className="flex flex-col gap-2 text-sm text-gray-700 dark:text-white">
                  <h1 className="text-primary font-semibold">{item.subject}</h1>
                  <p><span className="font-semibold">Type:</span> {item.type}</p>
                  <p>
                    <span className="font-semibold">Created:</span> {new Date(item.created_at).toLocaleDateString()}
                  </p>
                  <p className={`font-semibold ${item.status === 'Resolved' ? 'text-green-500' : 'text-yellow-500'}`}>
                    Status: {item.status}
                  </p>
                </div>

                {/* Actions (Icons) */}
                <div className="flex gap-3 items-center">
                  <FaEye
                    className="text-[22px] text-mainbutton cursor-pointer"
                    onClick={() => handleFetchSingleTicket(item.id, item.subject, item.type, item.status)}
                  />
                  <MdDelete
                    className="text-[22px] text-red-500 cursor-pointer"
                    onClick={() => handleDeleteTicket(item.id)}
                  />
                </div>
              </div>

              {/* Desktop View (Grid Layout) */}
              <h1 className="hidden md:block text-center text-gray-600 dark:text-white">{item.subject}</h1>
              <h1 className="hidden md:block text-center text-gray-600 dark:text-white">{item.type}</h1>
              <h1 className="hidden md:block text-center text-gray-600 dark:text-white">
                {new Date(item.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </h1>
              <h1 className={`hidden md:block text-center font-medium p-2 rounded-lg w-fit m-auto text-sm md:text-base
              ${item.status === "close" ? "text-white bg-green-500" :
                  item.status === "pending" ? "text-white bg-orange-500" :
                    "text-yellow-500"
                }`}
              >
                {item.status}
              </h1>

              {/* Desktop Actions */}
              <div className="hidden md:flex gap-3 justify-center">
                <FaEye
                  className="text-[25px] text-mainbutton cursor-pointer"
                  onClick={() => handleFetchSingleTicket(item.id)}
                />
                <MdDelete
                  className="text-[25px] text-red-500 cursor-pointer"
                  onClick={() => handleDeleteTicket(item.id)}
                />
              </div>
            </div>

          ))}

          {/* Add Ticket Button */}
          {/* <button
            onClick={() => setIsOpen(true)}
            className="bg-mainbutton text-white px-4 py-2 rounded-lg block mt-6 mx-auto text-sm md:text-base"
          >
            Add Ticket
          </button> */}

          {/* Modal */}
          {isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-4 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[90%] md:max-w-[800px] relative transform scale-95 transition-transform duration-300">
                <h2 className="text-lg md:text-xl font-bold">Add Ticket</h2>
                <p className="text-gray-600 mb-6 text-sm md:text-base">
                  Enter your ticket details here
                </p>

                <form onSubmit={handleAddTicket}>
                  <div className="flex flex-col md:flex-row justify-center gap-3">
                    <input
                      type="text"
                      placeholder="Subject"
                      name="subject"
                      value={inputdata.subject}
                      onChange={handleChange}
                      className="text-mainheading bg-white border-2 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                    <select
                      id="delivery"
                      name="delivery_type"
                      value={inputdata.delivery_type}
                      onChange={handleChange}
                      className="text-mainheading bg-white border-2 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="" disabled>
                        Choose Delivery Type
                      </option>
                      <option value="website_problem">Website Problem</option>
                      <option value="partner_request">Partner Request</option>
                      <option value="complain">Complain</option>
                      <option value="info_inquiry">Info Inquiry</option>
                    </select>

                    <select
                      id="priority"
                      name="priority"
                      value={inputdata.priority}
                      onChange={handleChange}
                      className="text-mainheading bg-white border-2 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="" disabled>
                        Priority
                      </option>
                      <option value="urgent">Urgent</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>

                  <div className="mt-3">
                    <textarea
                      placeholder="Describe your issue"
                      name="message"
                      value={inputdata.message}
                      onChange={handleChange}
                      className="text-mainheading bg-white border-2 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                    ></textarea>
                  </div>

                  <input
                    type="submit"
                    className="bg-primary text-white w-full py-2 rounded-lg mt-3 cursor-pointer"
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
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center mt-6 w-full">
          {/* No Tickets Message */}
          <img src={NOORDERGIF} alt="No Tickets" className="w-14 h-14 md:w-30 md:h-30" />
          <p className="text-[16px] mt-2 text-center">No support tickets found</p>

        
        </div>
      )}
    </motion.div>
  );
};

