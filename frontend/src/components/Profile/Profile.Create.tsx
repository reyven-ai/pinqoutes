import React from "react";
import { useProfileAction } from "@/hooks/useProfileAction";
import { ProfileFormInput } from "@/types/profile.types";
import { profileValidationSchema } from "../../validations/profile.validation";
import ProfileForm from "./Profile.Form";

const ProfileCreate: React.FC = () => {
  const { handleCreateProfile, message, successful, loading } =
    useProfileAction();
  const initialValues: ProfileFormInput = {
    username: "",
    description: "",
    country_of_residence: "",
    birth_day: "",
    birth_month: "",
    birth_year: "",
    mobile_phone_number: "",
    mobile_phone_number_prefix: "",
  };

  return (
    <ProfileForm
      title="Would you like to create your profile?"
      loading={loading}
      successful={successful}
      message={message}
      onSubmit={handleCreateProfile}
      validationSchema={profileValidationSchema}
      initialValues={initialValues}
    />
  );
};

export default ProfileCreate;
