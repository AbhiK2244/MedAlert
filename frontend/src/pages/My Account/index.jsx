import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetProfilesQuery } from "../../services/healthProfile";
import Field from "./components/Field";
import PersonalInformation from "./components/PersonalInformation";
import HealthInformation from "./components/HealthInformation";
import ProfileSetting from "./components/ProfileSetting";

const MyAccount = () => {
  const user = useSelector((state) => state?.auth?.user);
  const { data: healthProfiles, isFetching, isError } = useGetProfilesQuery();
  console.log("user: ", user);
  console.log("healthProfiles", healthProfiles?.data);
  const [healthData] = healthProfiles?.data || [null];
  return (
    <div className="min-h-screen md:p-6 px-4 py-6 bg-neutral-100 transition-all duration-300">
      <h2 className="md:ml-3 ml-9 font-medium text-xl lg:text-3xl">My Account</h2>
      <ProfileSetting user={user} healthData={healthData} />
      <PersonalInformation user={user} healthData={healthData} />
      <HealthInformation healthData={healthData} />
    </div>
  );
};

export default MyAccount;
