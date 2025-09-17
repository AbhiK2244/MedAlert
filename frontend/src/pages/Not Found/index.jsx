import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="px-30 flex bg-[#F2F1F2] gap-20 items-center">
      <div className="flex flex-col justify-center min-h-screen text-left p-4">
        <div className="text-6xl font-bold text-primary mb-4">404</div>
        <h1 className="text-3xl font-semibold text-primary mb-2">
          Page Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          The page you are looking for is not available!
        </p>
        {/* <p className="text-gray-600 mb-1">
          Are you sure the website URL is correct?
        </p>
        <p className="text-gray-600 mb-6">Get in touch with the site owner.</p> */}
        <Link
          to="/"
          className="px-4 py-1 w-fit border border-primary text-primary rounded-full hover:bg-primary hover:text-white transition"
        >
          Go Back Home
        </Link>
      </div>
      <div className="hidden md:flex md:flex-col w-76 h-96 items-center gap-10">
        <img src="/images/pagenotfound.png" alt="pagenotfound" loading="lazy" />
        <p className="text-4xl font-semibold text-primary">Sorry!</p>
      </div>
    </div>
  );
};

export default NotFound;
