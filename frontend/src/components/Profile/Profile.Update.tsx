import React, { useState } from "react";
import { useGetProfileData, useProfileAction } from "@/hooks/useProfileAction";
import { ProfileFormInput } from "@/types/profile.types";
import { profileValidationSchema } from "../../validations/profile.validation";
import Modal from "../Modal/Modal";
import Edit from "../../assets/edit.png";
import ProfileForm from "./Profile.Form";

const EditProfile: React.FC = () => {
  const { handleEditProfile, message, successful, loading } =
    useProfileAction();
  const { userProfile } = useGetProfileData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const initialValues: ProfileFormInput = {
    username: userProfile?.username || "",
    description: userProfile?.description || "",
    country_of_residence: userProfile?.country_of_residence || "",
    birth_day: userProfile?.birth_day || "",
    birth_month: userProfile?.birth_month || "",
    birth_year: userProfile?.birth_year || "",
    mobile_phone_number: userProfile?.mobile_phone_number || "",
    mobile_phone_number_prefix: userProfile?.mobile_phone_number_prefix || "",
  };

  return (
    <>
      <button onClick={openModal} className="w-[40px] h-[40px]">
        <img src={Edit} alt="" />
      </button>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <ProfileForm
            title="Edit"
            loading={loading}
            successful={successful}
            message={message}
            onSubmit={handleEditProfile}
            validationSchema={profileValidationSchema}
            initialValues={initialValues}
          />
        </Modal>
      )}
    </>
  );
};

export default EditProfile;
