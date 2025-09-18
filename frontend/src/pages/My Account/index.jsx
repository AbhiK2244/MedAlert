import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetProfilesQuery } from "../../services/healthProfile";
import Field from "./components/Field";
import PersonalInformation from "./components/PersonalInformation";
import HealthInformation from "./components/HealthInformation";
import ProfileSetting from "./components/ProfileSetting";
import ChangePasswordModal from "./components/ChangePasswordModal";

const MyAccount = () => {
  const user = useSelector((state) => state?.auth?.user);
  const {
    data: healthProfiles,
    isFetching,
    isError,
    refetch,
  } = useGetProfilesQuery();
  const [open, setOpen] = useState(false);
  const [healthData] = healthProfiles?.data || [null];
  const handleChangePassword = async ({ oldPassword, newPassword }) => {
    console.log("handle change password");
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="min-h-screen md:p-6 px-4 py-6 bg-neutral-100 transition-all duration-300">
      <h2 className="md:ml-3 ml-9 font-medium text-xl lg:text-3xl">
        My Account
      </h2>
      <ChangePasswordModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onChangePassword={handleChangePassword}
      />
      <ProfileSetting setOpen={setOpen} user={user} healthData={healthData} />
      <PersonalInformation user={user} healthData={healthData} />
      <HealthInformation healthData={healthData} />
    </div>
  );
};

export default MyAccount;
