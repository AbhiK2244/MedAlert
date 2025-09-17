import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema, signinSchema } from "./schema";
import { useLoginMutation, useSignupMutation } from "../../../../services/auth";
import { toast } from "react-hot-toast";
import Spinner from "../../../../components/Spinner";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login as loginDispatcher } from "../../../../redux/reducers/auth.reducer";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const AuthForm = () => {
  const [authMode, setAuthMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [signup, { isLoading: isSignupLoading }] = useSignupMutation();
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();

  const schema = authMode === "login" ? signinSchema : signupSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    unregister,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log("Form submitted:", data);
    try {
      if (authMode === "login") {
        const result = await login(data);
        console.log("Login:", result);
        if (result?.error) {
          toast.error(
            result?.error.data.message || "Login failed. Please try again."
          );
        } else {
          dispatch(loginDispatcher(result?.data?.data)); // Dispatch login action to Redux store
          toast.success("Login successful!");
          // Reset form after successful submission
          reset();
          // Redirect to the dashboard or home page after successful login
          navigate("/scan");
        }
      } else {
        const res = await signup(data);
        console.log("Signup:", res);
        if (res?.error) {
          toast.error(
            res?.error.data.message || "Signup failed. Please try again."
          );
        } else {
          dispatch(loginDispatcher(res?.data?.data)); // Dispatch login action to Redux store because user is logged in after signup
          toast.success("User created and logged in successfully.");
          // Reset form after successful submission
          reset();
          navigate("/signup/profile");
        }
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };

  const toggleAuthMode = () => {
    setAuthMode((prevMode) => (prevMode === "login" ? "signup" : "login"));

    // Reset the form values when toggling auth mode
    // This ensures that the form fields are cleared when switching between login and signup
    reset({}, { keepValues: true });
    // Unregister the name field when switching to login mode
    unregister("name");
  };

  return (
    <div className="w-full my-auto py-6 flex flex-col items-center">
      <h1 className="text-xl text-center font-medium">
        {authMode === "login" ? "Sign in to" : "Sign Up for"}{" "}
        <span className="font-bold text-primary">MedAlert AI</span>
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-10">
        {authMode === "signup" && (
          <div className="w-full mb-4">
            <input
              {...register("name")}
              type="text"
              placeholder="Full Name"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-primary"
            />
            {errors?.name && (
              <p className="text-red-500 text-xs">{errors?.name.message}</p>
            )}
          </div>
        )}

        <div className="w-full mb-4">
          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-primary"
          />
          {errors?.email && (
            <p className="text-red-500 text-xs">{errors?.email.message}</p>
          )}
        </div>

        <div className="w-full mb-4">
          <div className="relative">
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-primary"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors?.password && (
            <p className="text-red-500 text-xs">{errors?.password.message}</p>
          )}
        </div>

        {authMode === "login" ? (
          <button
            type="submit"
            disabled={isLoginLoading}
            className={`w-full h-10 p-2 transition-colors duration-300 cursor-pointer rounded-md flex items-center justify-center ${
              isLoginLoading
                ? "bg-neutral-400 cursor-not-allowed"
                : "bg-primary text-white hover:bg-primary-hover"
            }`}
          >
            {isLoginLoading ? <Spinner /> : "Sign In"}
          </button>
        ) : (
          <button
            type="submit"
            disabled={isSignupLoading}
            className={`w-full h-10 p-2 transition-colors duration-300 cursor-pointer rounded-md flex items-center justify-center disabled:bg-neutral-400 disabled:cursor-not-allowed ${
              !isSignupLoading && "bg-primary text-white hover:bg-primary-hover"
            }`}
          >
            {isSignupLoading ? <Spinner /> : "Sign Up"}
          </button>
        )}
      </form>

      <div>
        {authMode === "login" ? (
          <p className="text-center mt-4 text-sm">
            Don't have an account?{" "}
            <span
              className="text-primary cursor-pointer font-medium"
              onClick={toggleAuthMode}
            >
              Sign Up
            </span>
          </p>
        ) : (
          <p className="text-center mt-4 text-sm">
            Already have an account?{" "}
            <span
              className="text-primary cursor-pointer font-medium"
              onClick={toggleAuthMode}
            >
              Sign In
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
