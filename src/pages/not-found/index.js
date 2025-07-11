import React from "react";
import { Link } from "react-router-dom";
import BOX from "../../assets/images/Search.svg"

export const PageNotFound = () => {
  return (
    <div  className="flex bg-gray-50 items-center justify-center h-screen font-subheading">

   
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-mainbutton">404</h1>
        <p className="text-5xl  mt-4">Oops! Page not found.</p>
        <p className=" mt-2 text-xl">The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="mt-6 inline-block px-6 py-3 bg-mainbutton text-white text-mainheading rounded-lg text-lg font-semibold  transition-colors">Go Home</Link>
      </div>
    </div>
   
  );
};

export default PageNotFound;
