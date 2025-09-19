import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { userProfileSchema } from "./Schema/userProfile.js";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useCreateProfileMutation,
  useGetProfilesQuery,
  useUpdateProfileMutation,
} from "../../services/healthProfile.js";
import toast from "react-hot-toast";
import Spinner from "../../components/Spinner.jsx";
import { useNavigate, useSearchParams } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
  const [createProfile, { isLoading: isCreateProfileLoading }] =
    useCreateProfileMutation();

  const [updateProfile, { isLoading: isUpdateProfileLoading }] =
    useUpdateProfileMutation();
  const { data: healthProfiles } = useGetProfilesQuery();
  const [healthProfile] = healthProfiles?.data || [null];
  // extract the value. eg. ?newUser=true then query = true
  const [searchParams] = useSearchParams();
  const query = searchParams.get("mode");

  useEffect(() => {
    //if the user already have healthProfile then they do not need to access this page
    if (query !== "signUpUser" && query !== "edit") {
      if (healthProfiles?.data?.length > 0) navigate("/");

      // if the user is new having no healthProfile then only they will be allowed on this page. They can access this page through their account page only.
      if (healthProfiles?.data?.length === 0 && query !== "newUser")
        navigate("/");
    }
  }, [healthProfiles]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    unregister,
  } = useForm({
    resolver: yupResolver(userProfileSchema),
  });

  useEffect(() => {
    if (query === "edit" && healthProfile) {
      reset(healthProfile);
    }
  }, [query, healthProfile, reset]);

  const call = query === "edit" ? updateProfile : createProfile;

  const onSubmit = async (data) => {
    const formData = query === "edit" ? {...data, healthProfileId: healthProfile._id} : data;
    try {
      const res = await call(formData);
      if (res?.error) {
        toast.error(
          res?.error.data.message || "Create Profile failed. Please try again."
        );
      } else {
        toast.success(res?.data?.message || "Health Profile created successfully!");
        // Reset form after successful submission
        reset();
        navigate("/scan");
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 transition-all duration-300">
      <h1 className="text-3xl text-center font-bold mb-4 text-primary">
        {query === "edit" ? "Update Your Profile" :  "Complete Your Profile"}
      </h1>
      {query === "signUpUser" && (
        <div className="text-xs font-medium px-10 flex justify-end">
          <span
            onClick={() => navigate("/scan")}
            className="text-primary hover:text-primary-hover transition duration-300 cursor-pointer"
          >
            Skip
          </span>
        </div>
      )}
      <div className="w-full px-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
          {/* personal details */}
          <h2 className="text-xl font-semibold mb-2">Personal Details</h2>
          <div className="w-full bg-blue-50 px-4 pt-6 pb-8 rounded-lg">
            <div className="w-full px-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="fullName"
                >
                  Full Name
                </label>
                <input
                  {...register("fullName")}
                  className="w-full outline-none border border-neutral-400 focus:border-neutral-200 rounded-full px-4 py-1 focus:shadow-primary focus:shadow-xs transition-all duration-400 bg-neutral-50 focus:bg-white"
                  type="text"
                  id="fullName"
                />
                {errors?.fullName && (
                  <p className="text-xs text-red-500">
                    {errors?.fullName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="age">
                  Age
                </label>
                <input
                  {...register("age")}
                  className="w-full outline-none border border-neutral-400 focus:border-neutral-200 rounded-full px-4 py-1 focus:shadow-primary focus:shadow-xs transition-all duration-400 bg-neutral-50 focus:bg-white"
                  type="number"
                  id="age"
                />
                {errors?.age && (
                  <p className="text-xs text-red-500">{errors?.age.message}</p>
                )}
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="gender"
                >
                  Gender
                </label>
                <select
                  {...register("gender")}
                  className="w-full outline-none border border-neutral-400 focus:border-neutral-200 rounded-full px-4 py-1 focus:shadow-primary focus:shadow-xs transition-all duration-400 bg-neutral-50 focus:bg-white cursor-pointer"
                  id="gender"
                >
                  <option value="">Select your gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors?.gender && (
                  <p className="text-xs text-red-500">
                    {errors.gender.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="phone"
                >
                  Phone Number
                </label>
                <input
                  {...register("phone")}
                  className="w-full outline-none border border-neutral-400 focus:border-neutral-200 rounded-full px-4 py-1 focus:shadow-primary focus:shadow-xs transition-all duration-400 bg-neutral-50 focus:bg-white"
                  type="tel"
                  id="phone"
                />
                {errors?.phone && (
                  <p className="text-xs text-red-500">{errors.phone.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* current health status */}
          <h2 className="text-xl font-semibold mb-2">Current Health Status</h2>
          <div className="w-full bg-blue-50 px-4 pt-6 pb-8 rounded-lg">
            <div className="w-full px-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="weight"
                >
                  Weight <span className="italic font-light text-xs">(kg)</span>
                </label>
                <input
                  {...register("weight")}
                  className="w-full outline-none border border-neutral-400 focus:border-neutral-200 rounded-full px-4 py-1 focus:shadow-primary focus:shadow-xs transition-all duration-400 bg-neutral-50 focus:bg-white"
                  type="number"
                  step={0.1}
                  id="weight"
                />
                {errors?.weight && (
                  <p className="text-xs text-red-500">
                    {errors.weight.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="height"
                >
                  Height <span className="italic font-light text-xs">(cm)</span>
                </label>
                <input
                  {...register("height")}
                  className="w-full outline-none border border-neutral-400 focus:border-neutral-200 rounded-full px-4 py-1 focus:shadow-primary focus:shadow-xs transition-all duration-400 bg-neutral-50 focus:bg-white"
                  type="number"
                  step={0.1}
                  id="height"
                />
                {errors?.height && (
                  <p className="text-xs text-red-500">
                    {errors.height.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="bplevel"
                >
                  Blood Pressure Level
                </label>
                <select
                  {...register("bpLevel")}
                  className="w-full outline-none border border-neutral-400 focus:border-neutral-200 rounded-full px-4 py-1 focus:shadow-primary focus:shadow-xs transition-all duration-400 bg-neutral-50 focus:bg-white cursor-pointer"
                  id="bplevel"
                >
                  <option value="">Select your blood pressure level</option>
                  <option value="Normal">Normal</option>
                  <option value="High">High</option>
                  <option value="Low">Low</option>
                </select>
                {errors?.bpLevel && (
                  <p className="text-xs text-red-500">
                    {errors.bpLevel.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="sugarlevel"
                >
                  Sugar Level
                </label>
                <select
                  {...register("sugarLevel")}
                  className="w-full outline-none border border-neutral-400 focus:border-neutral-200 rounded-full px-4 py-1 focus:shadow-primary focus:shadow-xs transition-all duration-400 bg-neutral-50 focus:bg-white cursor-pointer"
                  id="sugarlevel"
                >
                  <option value="">Select your sugar level</option>
                  <option value="Normal">Normal</option>
                  <option value="High">High</option>
                  <option value="Low">Low</option>
                </select>
                {errors?.sugarLevel && (
                  <p className="text-xs text-red-500">
                    {errors.sugarLevel.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Allergies and Medical Conditions */}
          <h2 className="text-xl font-semibold mb-2">Other Details</h2>
          <div className="w-full bg-blue-50 px-4 pt-6 pb-8 rounded-lg">
            <div className="w-full px-2 flex flex-col gap-4">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="Allergies"
                >
                  Allergies{" "}
                  <span className="italic font-light text-xs">(if any)</span>
                </label>
                <input
                  {...register("allergies")}
                  className="w-full outline-none border border-neutral-400 focus:border-neutral-200 rounded-full px-4 py-1 focus:shadow-primary focus:shadow-xs transition-all duration-400 bg-neutral-50 focus:bg-white"
                  type="text"
                  id="Allergies"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="medications"
                >
                  Medications{" "}
                  <span className="italic font-light text-xs">(if any)</span>
                </label>
                <textarea
                  {...register("medications")}
                  className="w-full outline-none border border-neutral-400 focus:border-neutral-200 rounded-2xl px-4 py-1 focus:shadow-primary focus:shadow-sm transition-all duration-400 bg-neutral-50 focus:bg-white placeholder:italic placeholder:text-gray-400"
                  id="medications"
                  rows="3"
                  placeholder="Please mention the details of any medications you are taking."
                ></textarea>
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="additionalConditions"
                >
                  Additional Conditions{" "}
                  <span className="italic font-light text-xs">(if any)</span>
                </label>
                <textarea
                  {...register("additionalDetails")}
                  className="w-full outline-none border border-neutral-400 focus:border-neutral-200 rounded-2xl px-4 py-1 focus:shadow-primary focus:shadow-sm transition-all duration-400 bg-neutral-50 focus:bg-white placeholder:italic placeholder:text-gray-400"
                  id="additionalConditions"
                  rows="3"
                  placeholder="Please mention the details of any additional conditions you have."
                ></textarea>
              </div>
            </div>
          </div>

          <button
            disabled={isCreateProfileLoading || isUpdateProfileLoading}
            className={`mt-4 w-full flex justify-center items-center text-lg bg-primary text-white rounded px-4 py-2 hover:bg-primary-hover transition-all duration-300 cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-400 h-11
            ${
              !isCreateProfileLoading &&
              "bg-primary text-white hover:bg-primary-hover"
            }`}
          >
            {isCreateProfileLoading || isUpdateProfileLoading ? (
              <Spinner />
            ) : query === "edit" ? (
              "Update Profile"
            ) : (
              "Submit Profile"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
