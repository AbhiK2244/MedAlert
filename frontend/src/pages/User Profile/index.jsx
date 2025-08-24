import React from "react";

const UserProfile = () => {
  return (
    <div className="container mx-auto p-4 transition-all duration-300">
      <h1 className="text-3xl font-bold mb-4 text-primary">
        Complete Your Profile
      </h1>
      <div className="w-full px-6">
        <form className="space-y-6 w-full">
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
                  className="w-full outline-none border border-neutral-400 focus:border-neutral-200 rounded-full px-4 py-1 focus:shadow-primary focus:shadow-xs transition-all duration-400 bg-neutral-50 focus:bg-white"
                  type="text"
                  id="fullName"
                />
                {/* <p className="text-xs text-gray-500">
                  Please enter your full name.
                </p> */}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="age">
                  Age
                </label>
                <input
                  className="w-full outline-none border border-neutral-400 focus:border-neutral-200 rounded-full px-4 py-1 focus:shadow-primary focus:shadow-xs transition-all duration-400 bg-neutral-50 focus:bg-white"
                  type="number"
                  id="age"
                />
                {/* <p className="text-xs text-gray-500">Please enter your age.</p> */}
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="gender"
                >
                  Gender
                </label>
                <select
                  className="w-full outline-none border border-neutral-400 focus:border-neutral-200 rounded-full px-4 py-1 focus:shadow-primary focus:shadow-xs transition-all duration-400 bg-neutral-50 focus:bg-white cursor-pointer"
                  id="gender"
                >
                  <option value="">Select your gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {/* <p className="text-xs text-gray-500">
                  Please select your gender.
                </p> */}
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="phone"
                >
                  Phone Number
                </label>
                <input
                  className="w-full outline-none border border-neutral-400 focus:border-neutral-200 rounded-full px-4 py-1 focus:shadow-primary focus:shadow-xs transition-all duration-400 bg-neutral-50 focus:bg-white"
                  type="tel"
                  id="phone"
                />
                {/* <p className="text-xs text-gray-500">
                  Please enter your phone number.
                </p> */}
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
                  className="w-full outline-none border border-neutral-400 focus:border-neutral-200 rounded-full px-4 py-1 focus:shadow-primary focus:shadow-xs transition-all duration-400 bg-neutral-50 focus:bg-white"
                  type="number"
                  step={0.1}
                  id="weight"
                />
                {/* <p className="text-xs text-gray-500">
                  Please enter your weight.
                </p> */}
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="height"
                >
                  Height <span className="italic font-light text-xs">(cm)</span>
                </label>
                <input
                  className="w-full outline-none border border-neutral-400 focus:border-neutral-200 rounded-full px-4 py-1 focus:shadow-primary focus:shadow-xs transition-all duration-400 bg-neutral-50 focus:bg-white"
                  type="number"
                  step={0.1}
                  id="height"
                />
                {/* <p className="text-xs text-gray-500">
                  Please enter your height.
                </p> */}
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="bplevel"
                >
                  Blood Pressure Level
                </label>
                <select
                  className="w-full outline-none border border-neutral-400 focus:border-neutral-200 rounded-full px-4 py-1 focus:shadow-primary focus:shadow-xs transition-all duration-400 bg-neutral-50 focus:bg-white cursor-pointer"
                  id="bplevel"
                >
                  <option value="">Select your blood pressure level</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                  <option value="low">Low</option>
                </select>
                {/* <p className="text-xs text-gray-500">
                  Please select your blood pressure level.
                </p> */}
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="sugarlevel"
                >
                  Sugar Level
                </label>
                <select
                  className="w-full outline-none border border-neutral-400 focus:border-neutral-200 rounded-full px-4 py-1 focus:shadow-primary focus:shadow-xs transition-all duration-400 bg-neutral-50 focus:bg-white cursor-pointer"
                  id="sugarlevel"
                >
                  <option value="">Select your sugar level</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                  <option value="low">Low</option>
                </select>
                {/* <p className="text-xs text-gray-500">
                  Please select your blood sugar level.
                </p> */}
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
                  Allergies <span className="italic font-light text-xs">(if any)</span>
                </label>
                <input
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
                  Medications <span className="italic font-light text-xs">(if any)</span>
                </label>
                <textarea
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
                  Additional Conditions <span className="italic font-light text-xs">(if any)</span>
                </label>
                <textarea
                  className="w-full outline-none border border-neutral-400 focus:border-neutral-200 rounded-2xl px-4 py-1 focus:shadow-primary focus:shadow-sm transition-all duration-400 bg-neutral-50 focus:bg-white placeholder:italic placeholder:text-gray-400"
                  id="additionalConditions"
                  rows="3"
                  placeholder="Please mention the details of any additional conditions you have."
                ></textarea>
              </div>
            </div>
          </div>

          <button className="mt-4 w-full text-lg bg-primary text-white rounded px-4 py-2 hover:bg-primary-hover transition-all duration-300 cursor-pointer">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
