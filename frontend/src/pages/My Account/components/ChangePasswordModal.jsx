import React, { useEffect, useState } from "react";
import Spinner from "../../../components/Spinner";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { changePasswordSchema } from "./schema";
import toast from "react-hot-toast";
import { useChangePasswordMutation } from "../../../services/auth";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

const ChangePasswordModal = ({ isOpen, onClose, onChangePassword }) => {
  const [changePassword, { isLoading: loading }] = useChangePasswordMutation();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    unregister,
  } = useForm({
    resolver: yupResolver(changePasswordSchema),
  });

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const result = await changePassword(data);
      console.log("change password:", result);
      if (result?.error) {
        toast.error(
          result?.error?.data?.message ||
            "Password change failed. Please try again."
        );
      } else {
        toast.success("Password change successful!");
        // Reset form after successful submission
        reset();
        onClose();
      }
    } catch (err) {
      console.error("Error during password change:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal
      role="dialog"
    >
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      <div
        className="relative w-full max-w-md mx-4 bg-white rounded-lg shadow-lg p-6 z-10"
        onClick={(e) => e.stopPropagation()} // prevent overlay click
      >
        <header className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-800">
            Change Password
          </h3>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="text-slate-500 hover:text-slate-700"
          >
            ✕
          </button>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <div>
            <label className="text-xs text-neutral-600 font-medium">
              Current password
              <input
                {...register("currentPassword")}
                type={showPassword ? "text" : "password"}
                className="mt-1 w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none text-sm focus:ring-1 focus:ring-primary"
              />
            </label>
            {errors?.currentPassword && (
              <div className="text-xs text-red-600">
                {errors?.currentPassword?.message}
              </div>
            )}
          </div>

          <div>
            <label className="text-xs text-neutral-600 font-medium">
              New password
              <div className="relative mt-1 w-full border border-neutral-200 rounded-md">
              <input
                {...register("newPassword")}
                type={showPassword ? "text" : "password"}
                className="w-full py-2 pl-3 pr-7 rounded-md focus:outline-none focus:ring-1 text-sm focus:ring-primary"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-lg">{showPassword ? <FaEyeSlash /> : <FaEye />}</button>
                </div>
            </label>
            {errors?.newPassword && (
              <div className="text-xs text-red-600">
                {errors?.newPassword?.message}
              </div>
            )}
          </div>

          <div className="mt-2 flex items-center gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 w-1/2 rounded-md border border-neutral-200 text-neutral-800 hover:bg-primary hover:text-white transition duration-300 cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 w-1/2 rounded-md bg-primary text-white hover:bg-primary-hover disabled:bg-neutral-300 disabled:cursor-not-allowed cursor-pointer flex justify-center items-center transition duration-300 h-10"
            >
              {loading ? <Spinner /> : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
