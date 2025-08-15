import React, { useState } from "react";

const AuthForm = () => {
  const [authMode, setAuthMode] = useState("login");
  return (
    <div className="w-full my-auto py-6 flex flex-col items-center">
      <h1 className="text-xl text-center font-medium">
        {authMode === "login" ? "Sign in to" : "Sign Up for"}{" "}
        <span className="font-bold text-primary">MedAlert AI</span>
      </h1>

      <form action="" className="mt-10">
        {authMode === "signup" && (
          <input type="text" placeholder="Full Name" className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-primary" />
        )}
        <input type="email" placeholder="Email" className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-primary" />
        <input type="password" placeholder="Password" className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-primary" />
        {authMode === "login" ? <button type="submit" className="w-full p-2 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors duration-300 cursor-pointer">
          Sign In
        </button> : <button type="submit" className="w-full p-2 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors duration-300 cursor-pointer">
          Sign Up
        </button>}
      </form>

      <div>
        {authMode === "login" ? (
          <p className="text-center mt-4 text-sm">Don't have an account? <span className="text-primary cursor-pointer font-medium" onClick={() => setAuthMode("signup")}>Sign Up</span></p>
        ) : (
          <p className="text-center mt-4 text-sm">Already have an account? <span className="text-primary cursor-pointer font-medium" onClick={() => setAuthMode("login")}>Sign In</span></p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
